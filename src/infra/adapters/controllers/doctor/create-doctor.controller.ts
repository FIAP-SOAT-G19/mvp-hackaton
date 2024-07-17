import { IController, ICreateDoctorUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class CreateDoctorController implements IController {
  constructor(private readonly createDoctorUseCase: ICreateDoctorUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const doctorId = await this.createDoctorUseCase.execute(input.body)
      return success(201, { doctorId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
