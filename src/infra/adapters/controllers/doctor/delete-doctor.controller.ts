import { IController, IDeleteDoctorUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class DeleteDoctorController implements IController {
  constructor(private readonly deleteDoctorUseCase: IDeleteDoctorUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteDoctorUseCase.execute(input.params)
      return success(200, {})
    } catch (error) {
      return handleError(error as Error)
    }
  }
}

