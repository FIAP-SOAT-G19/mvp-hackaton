import { IUpdateDoctorUseCase } from '@/application/interfaces'
import { UpdateDoctorUseCase } from '@/application/usecases/doctor/update-doctor.usecase'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { DoctorRepository } from '@/infra/database/repositories/doctor.repository'

export const makeUpdateDoctorUseCase = (): IUpdateDoctorUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const repository = new DoctorRepository()

  return new UpdateDoctorUseCase(schemaValidator, repository)
}

