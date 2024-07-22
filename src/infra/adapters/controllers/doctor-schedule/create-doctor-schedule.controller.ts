import { IController } from '@/application/interfaces'
import { ICreateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/create-doctor-schedule.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class CreateDoctorScheduleController implements IController {
  constructor(private readonly createDoctorScheduleUseCase: ICreateDoctorScheduleUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const scheduleId = await this.createDoctorScheduleUseCase.execute(input.body)
      return success(201, { scheduleId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
