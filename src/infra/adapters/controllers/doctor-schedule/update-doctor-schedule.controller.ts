import { IController } from '@/application/interfaces'
import { IUpdateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/update-doctor-schedule.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class UpdateDoctorScheduleController implements IController {
  constructor(private readonly updateDoctorScheduleUseCase: IUpdateDoctorScheduleUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const scheduleId = await this.updateDoctorScheduleUseCase.execute({ ...input.body, ...input.params })
      return success(201, { scheduleId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
