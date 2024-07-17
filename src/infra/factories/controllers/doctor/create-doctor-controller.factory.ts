import { CreateDoctorController } from '@/infra/adapters/controllers/doctor/create-doctor.controller'
import { makeCreateDoctorUseCase } from '../../usecases/doctor/create-doctor-usecase.factory'


export const makeCreateDoctorController = (): CreateDoctorController => {
  return new CreateDoctorController(makeCreateDoctorUseCase())
}
