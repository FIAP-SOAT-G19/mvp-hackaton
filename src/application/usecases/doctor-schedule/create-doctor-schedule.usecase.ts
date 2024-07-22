import { ISchemaValidator, IUUIDGenerator, IDoctorRepository, Doctor } from '@/application/interfaces'
import { IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { ICreateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/create-doctor-schedule.interface'

import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class CreateDoctorScheduleUseCase implements ICreateDoctorScheduleUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorScheduleRepository: IDoctorScheduleRepository

  ) { }

  async execute(input: ICreateDoctorScheduleUseCase.Input): Promise<ICreateDoctorScheduleUseCase.Output> {
    // await this.validateSchema(input)
    const startDateString = input.startDate
    const startDate = new Date(startDateString)
    startDate.setHours(startDate.getHours() + 3)

    const doctor = await this.validateCrm(input.doctorCrm)
    await this.validateDate(startDate)
    startDate.setHours(startDate.getHours() - 3)
    await this.checkScheduleAvailability(input.doctorCrm, startDate)
    const endDate = this.defineEndDate(startDate)

    return this.doctorScheduleRepository.save({
      ...input,
      id: this.uuidGenerator.generate(),
      startDate,
      endDate,
      doctorId: doctor.id,
      doctorName: doctor.name,
      createdAt: new Date()
    })
  }

  private async validateSchema(input: ICreateDoctorScheduleUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({ schema: constants.SCHEMAS.DOCTOR_SCHEDULE, data: input })
    if (validation.error) {
      throw new InvalidParamError(validation.error as string)
    }
  }

  private async validateCrm(doctorCrm: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.getByCrm(doctorCrm)
    if (!doctor) {
      throw new InvalidParamError('crm')
    }
    return doctor
  }

  private async validateDate(startDate: Date): Promise<void> {
    const now = new Date()

    const minimumStartDate = new Date(now.getTime() + 2 * 60 * 60 * 1000) // Current hour + 2 hours
    if (startDate.getTime() <= minimumStartDate.getTime()) {
      throw new InvalidParamError('startDate must be at least 2 hours after the current time')
    }
    const hour = startDate.getHours()
    const minutes = startDate.getMinutes()

    if (hour < 8 || hour >= 18) {
      throw new InvalidParamError('startDate must be between 8 AM and 6 PM')
    }

    if (minutes !== 0) {
      throw new InvalidParamError('startDate must be the hour without the minutes')
    }
  }

  private async checkScheduleAvailability(crm: string, startDate: Date): Promise<void> {
    const schedules = await this.doctorScheduleRepository.getByCrm(crm)

    const isUnavailable = schedules?.some(schedule => schedule.startDate.getTime() === startDate.getTime())

    if (isUnavailable) {
      throw new InvalidParamError('startDate already exists')
    }
  }

  private defineEndDate(startDate: Date): Date {
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + 50)
    return endDate
  }
}
