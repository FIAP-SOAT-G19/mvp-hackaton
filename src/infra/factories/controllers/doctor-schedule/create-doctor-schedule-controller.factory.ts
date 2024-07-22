import { CreateDoctorScheduleController } from '@/infra/adapters/controllers/doctor-schedule/create-doctor-schedule.controller'
import { makeCreateDoctorScheduleUseCase } from '../../usecases/doctor-schedule/create-doctor-schedule-usecase.factory'

export const makeCreateDoctorScheduleController = (): CreateDoctorScheduleController => {
  return new CreateDoctorScheduleController(makeCreateDoctorScheduleUseCase())
}
