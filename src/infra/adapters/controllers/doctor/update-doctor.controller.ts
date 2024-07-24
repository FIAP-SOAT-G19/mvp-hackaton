import { IController, IUpdateDoctorUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class UpdateDoctorController implements IController {
  constructor(private readonly updateDoctorUseCase: IUpdateDoctorUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const doctorId = await this.updateDoctorUseCase.execute({ ...input.body, ...input.params })
      return success(200, { doctorId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}

