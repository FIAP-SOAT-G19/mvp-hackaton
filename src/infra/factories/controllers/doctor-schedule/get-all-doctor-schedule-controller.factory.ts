import { GetAllDoctorScheduleController } from '@/infra/adapters/controllers/doctor-schedule/get-all-doctor-schedule.controller'
import { makeGetAllDoctorScheduleUseCase } from '../../usecases/doctor-schedule/get-all-doctor-schedule-usecase.factory'

export const makeGetAllDoctorScheduleController = (): GetAllDoctorScheduleController => {
  return new GetAllDoctorScheduleController(makeGetAllDoctorScheduleUseCase())
}
