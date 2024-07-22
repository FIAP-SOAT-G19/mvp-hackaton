import { DoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IUpdateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/update-doctor-schedule.interface'

import { InvalidParamError, MissingParamError } from '@/infra/shared'

export class UpdateDoctorScheduleUseCase implements IUpdateDoctorScheduleUseCase {
  constructor(
    private readonly doctorScheduleRepository: IDoctorScheduleRepository

  ) { }

  async execute(input: IUpdateDoctorScheduleUseCase.Input): Promise<IUpdateDoctorScheduleUseCase.Output> {
    if (!input.startDate) throw new MissingParamError('enter the start date')
    const startDateString = input.startDate
    const startDate = new Date(startDateString)
    const schedule = await this.validateScheduleId(input.scheduleId)
    await this.validateDate(startDate)
    startDate.setHours(startDate.getHours() - 3)
    await this.checkScheduleAvailability(schedule.doctorCrm, startDate)
    const endDate = this.defineEndDate(startDate)

    return this.doctorScheduleRepository.update({
      id: input.scheduleId,
      startDate,
      endDate,
      updatedAt: new Date()
    })
  }

  private async validateScheduleId(id: string): Promise<DoctorSchedule> {
    const schedule = await this.doctorScheduleRepository.getById(id)
    if (!schedule) {
      throw new InvalidParamError('id')
    }
    return schedule
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
