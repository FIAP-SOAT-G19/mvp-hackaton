import { LoginDoctorController } from '@/infra/adapters/controllers/doctor/login-doctor.controller'
import { makeLoginDoctorUseCase } from '@/infra/factories/usecases/doctor/login-doctor-usecase.factory'

export const makeLoginDoctorController = (): LoginDoctorController => {
  return new LoginDoctorController(makeLoginDoctorUseCase())
}

