import { DeleteDoctorScheduleController } from '@/infra/adapters/controllers/doctor-schedule/delete-doctor-schedule.controller'
import { makeDeleteDoctorScheduleUseCase } from '../../usecases/doctor-schedule/delete-doctor-schedule-usecase.factory'

export const makeDeleteDoctorScheduleController = (): DeleteDoctorScheduleController => {
  return new DeleteDoctorScheduleController(makeDeleteDoctorScheduleUseCase())
}
