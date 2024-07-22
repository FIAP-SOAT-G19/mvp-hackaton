import { IController } from '@/application/interfaces'
import { ILoginDoctorUseCase } from '@/application/interfaces/usecases/doctor/login-doctor.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class LoginDoctorController implements IController {
  constructor(private readonly loginDoctorUseCase: ILoginDoctorUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const doctor = await this.loginDoctorUseCase.execute({ ...input.body })
      return success(200, { ...doctor })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}

