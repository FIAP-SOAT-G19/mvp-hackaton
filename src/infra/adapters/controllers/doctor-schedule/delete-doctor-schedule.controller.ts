import { IController } from '@/application/interfaces'
import { IDeleteDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/delete-doctor-schedule.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class DeleteDoctorScheduleController implements IController {
  constructor(private readonly deleteDoctorScheduleUseCase: IDeleteDoctorScheduleUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const scheduleId = await this.deleteDoctorScheduleUseCase.execute(input.params)
      return success(200, { scheduleId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
