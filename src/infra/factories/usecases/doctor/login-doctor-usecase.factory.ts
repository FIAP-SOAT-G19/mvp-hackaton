import { ILoginDoctorUseCase } from '@/application/interfaces'
import { LoginDoctorUseCase } from '@/application/usecases/doctor/login-doctor.usecase'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { DoctorRepository } from '@/infra/database/repositories/doctor.repository'

export const makeLoginDoctorUseCase = (): ILoginDoctorUseCase => {
  const repository = new DoctorRepository()
  const encrypt = new BcryptAdapter()
  return new LoginDoctorUseCase(repository, encrypt)
}
