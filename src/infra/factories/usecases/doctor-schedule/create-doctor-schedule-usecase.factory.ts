import { CreateDoctorScheduleUseCase } from '@/application/usecases/doctor-schedule/create-doctor-schedule.usecase'

import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { DoctorScheduleRepository } from '@/infra/database/repositories/doctor-schedule.repository'
import { DoctorRepository } from '@/infra/database/repositories/doctor.repository'

export const makeCreateDoctorScheduleUseCase = (): CreateDoctorScheduleUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const doctorScheduleRepository = new DoctorScheduleRepository()
  const doctorRepository = new DoctorRepository()

  return new CreateDoctorScheduleUseCase(schemaValidator, uuidGenerator, doctorRepository, doctorScheduleRepository)
}
