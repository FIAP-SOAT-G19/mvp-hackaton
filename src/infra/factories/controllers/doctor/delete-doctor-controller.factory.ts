import { DeleteDoctorController } from '@/infra/adapters/controllers/doctor/delete-doctor.controller'
import { makeDeleteDoctorUseCase } from '../../usecases/doctor/delete-doctor-usecase.factory'

export const makeDeleteDoctorController = (): DeleteDoctorController => {
  return new DeleteDoctorController(makeDeleteDoctorUseCase())
}

