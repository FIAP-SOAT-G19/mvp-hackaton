import { GetAllDoctorsController } from "@/infra/adapters/controllers/doctor/get-all-doctors.controller"
import { makeGetAllDoctorsUseCase } from "../../usecases/doctor/get-all-doctors-usecase.factory"

export const makeGetAllDoctorsController = (): GetAllDoctorsController => {
  return new GetAllDoctorsController(makeGetAllDoctorsUseCase())
}

