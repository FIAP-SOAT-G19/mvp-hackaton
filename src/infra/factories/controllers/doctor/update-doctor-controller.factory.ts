import { UpdateDoctorController } from "@/infra/adapters/controllers/doctor/update-doctor.controller"
import { makeUpdateDoctorUseCase } from "../../usecases/doctor/update-client-usecase.factory"

export const makeUpdateDoctorController = (): UpdateDoctorController => {
  return new UpdateDoctorController(makeUpdateDoctorUseCase())
}

