import { ISchemaValidator } from '@/application/interfaces'
import { IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { ICreateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/create-doctor-schedule.interface'
import { IGetDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-doctor-schedule.interface'

import { InvalidParamError, MissingParamError, ScheduleNotFoundError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class GetDoctorScheduleUseCase implements IGetDoctorScheduleUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly doctorScheduleRepository: IDoctorScheduleRepository

  ) { }

  async execute(input: IGetDoctorScheduleUseCase.Input): Promise<IGetDoctorScheduleUseCase.Output> {
    // await this.validateSchema(input)
    await this.validateScheduleId(input)

    const schedule = await this.doctorScheduleRepository.getById(input)
    if (!schedule) {
      throw new ScheduleNotFoundError()
    }
    return schedule
  }

  private async validateSchema(input: ICreateDoctorScheduleUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({ schema: constants.SCHEMAS.GET_DOCTOR_SCHEDULE, data: input })
    if (validation.error) {
      throw new InvalidParamError(validation.error as string)
    }
  }

  private async validateScheduleId(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('schedule id')
    }
  }
}
