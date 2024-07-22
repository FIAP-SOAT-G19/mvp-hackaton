import { IController } from '@/application/interfaces'
import { IGetAllDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-all-doctor-schedule.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class GetAllDoctorScheduleController implements IController {
  constructor(private readonly getAllDoctorScheduleUseCase: IGetAllDoctorScheduleUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const schedules = await this.getAllDoctorScheduleUseCase.execute(input.query)
      return success(200, schedules)
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
