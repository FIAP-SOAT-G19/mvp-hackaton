import { GetDoctorScheduleUseCase } from '@/application/usecases/doctor-schedule/get-doctor-schedule.usecase'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { DoctorScheduleRepository } from '@/infra/database/repositories/doctor-schedule.repository'

export const makeGetDoctorScheduleUseCase = (): GetDoctorScheduleUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const doctorScheduleRepository = new DoctorScheduleRepository()

  return new GetDoctorScheduleUseCase(schemaValidator, doctorScheduleRepository)
}
