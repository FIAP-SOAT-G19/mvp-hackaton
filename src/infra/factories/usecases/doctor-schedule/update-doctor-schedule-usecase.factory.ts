import { UpdateDoctorScheduleUseCase } from '@/application/usecases/doctor-schedule/update-doctor-schedule.usecase'
import { DoctorScheduleRepository } from '@/infra/database/repositories/doctor-schedule.repository'

export const makeUpdateDoctorScheduleUseCase = (): UpdateDoctorScheduleUseCase => {
  const doctorScheduleRepository = new DoctorScheduleRepository()

  return new UpdateDoctorScheduleUseCase(doctorScheduleRepository)
}
