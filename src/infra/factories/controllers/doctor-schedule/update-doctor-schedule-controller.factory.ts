import { UpdateDoctorScheduleController } from '@/infra/adapters/controllers/doctor-schedule/update-doctor-schedule.controller'
import { makeUpdateDoctorScheduleUseCase } from '../../usecases/doctor-schedule/update-doctor-schedule-usecase.factory'

export const makeUpdateDoctorScheduleController = (): UpdateDoctorScheduleController => {
  return new UpdateDoctorScheduleController(makeUpdateDoctorScheduleUseCase())
}
