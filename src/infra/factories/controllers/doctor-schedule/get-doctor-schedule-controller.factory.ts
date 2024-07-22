import { GetDoctorScheduleController } from '@/infra/adapters/controllers/doctor-schedule/get-doctor-schedule.controller'
import { makeGetDoctorScheduleUseCase } from '../../usecases/doctor-schedule/get-doctor-schedule-usecase.factory'

export const makeGetDoctorScheduleController = (): GetDoctorScheduleController => {
  return new GetDoctorScheduleController(makeGetDoctorScheduleUseCase())
}
