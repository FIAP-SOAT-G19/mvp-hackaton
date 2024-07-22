import { GetAllDoctorScheduleUseCase } from '@/application/usecases/doctor-schedule/get-all-doctor-schedule.usecase'
import { DoctorScheduleRepository } from '@/infra/database/repositories/doctor-schedule.repository'

export const makeGetAllDoctorScheduleUseCase = (): GetAllDoctorScheduleUseCase => {
  const doctorScheduleRepository = new DoctorScheduleRepository()

  return new GetAllDoctorScheduleUseCase(doctorScheduleRepository)
}
