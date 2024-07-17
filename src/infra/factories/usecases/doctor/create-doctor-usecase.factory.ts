import { CreateDoctorUseCase } from '@/application/usecases/doctor/create-doctor.usecase'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { DoctorRepository } from '@/infra/database/repositories/doctor.repository'

export const makeCreateDoctorUseCase = (): CreateDoctorUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const repository = new DoctorRepository()
  const encrypt = new BcryptAdapter()

  return new CreateDoctorUseCase(schemaValidator, uuidGenerator, repository, encrypt)
}
