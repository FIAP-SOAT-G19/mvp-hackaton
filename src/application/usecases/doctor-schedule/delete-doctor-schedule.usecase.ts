import { ISchemaValidator } from '@/application/interfaces'
import { IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IDeleteDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/delete-doctor-schedule.interface'

import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class DeleteDoctorScheduleUseCase implements IDeleteDoctorScheduleUseCase {
  constructor(
    private readonly doctorScheduleRepository: IDoctorScheduleRepository,
    private readonly schemaValidator: ISchemaValidator

  ) { }

  async execute(input: IDeleteDoctorScheduleUseCase.Input): Promise<IDeleteDoctorScheduleUseCase.Output> {
    // await this.validateSchema(input)
    await this.validateScheduleId(input.scheduleId)
    await this.doctorScheduleRepository.delete(input.scheduleId)

    return input.scheduleId
  }

  private async validateSchema(
    input: IDeleteDoctorScheduleUseCase.Input
  ): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.DELETE_SCHEDULE,
      data: input
    })
    if (validation.error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new InvalidParamError(validation.error)
    }
  }

  private async validateScheduleId(scheduleId: string): Promise<void> {
    const schedule = await this.doctorScheduleRepository.getByIdNotDeleted(scheduleId)
    if (!schedule) {
      throw new InvalidParamError('id already deleted')
    }
  }
}
