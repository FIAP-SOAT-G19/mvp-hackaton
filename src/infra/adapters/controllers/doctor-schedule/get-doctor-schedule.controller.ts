import { IController } from '@/application/interfaces'
import { IGetDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-doctor-schedule.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class GetDoctorScheduleController implements IController {
  constructor(private readonly getDoctorScheduleUseCase: IGetDoctorScheduleUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const schedule = await this.getDoctorScheduleUseCase.execute(input.params.scheduleId)
      return success(200, schedule)
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
