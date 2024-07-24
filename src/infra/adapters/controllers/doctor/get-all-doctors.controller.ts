import { IController, IGetAllDoctorsUseCase, } from '@/application/interfaces'
import { HttpResponse, success, handleError } from '@/infra/shared'

export class GetAllDoctorsController implements IController {
  constructor(private readonly getAllDoctorsUseCase: IGetAllDoctorsUseCase) { }

  async execute(): Promise<HttpResponse> {
    try {
      const doctors = await this.getAllDoctorsUseCase.execute()
      return success(200, doctors)
    } catch (error) {
      return handleError(error as Error)
    }
  }
}

