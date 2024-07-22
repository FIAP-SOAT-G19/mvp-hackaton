import { DeleteDoctorScheduleUseCase } from '@/application/usecases/doctor-schedule/delete-doctor-schedule.usecase'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { DoctorScheduleRepository } from '@/infra/database/repositories/doctor-schedule.repository'

export const makeDeleteDoctorScheduleUseCase = (): DeleteDoctorScheduleUseCase => {
  const doctorScheduleRepository = new DoctorScheduleRepository()
  const schemaValidator = new JoiValidatorSchemaAdapter()

  return new DeleteDoctorScheduleUseCase(doctorScheduleRepository, schemaValidator)
}
