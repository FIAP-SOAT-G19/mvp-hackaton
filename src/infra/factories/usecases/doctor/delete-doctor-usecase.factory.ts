import { IDeleteDoctorUseCase } from '@/application/interfaces'
import { DeleteDoctorUseCase } from '@/application/usecases/doctor/delete-doctor.usecase'
import { DoctorRepository } from '@/infra/database/repositories/doctor.repository'

export const makeDeleteDoctorUseCase = (): IDeleteDoctorUseCase => {
  const repository = new DoctorRepository()
  return new DeleteDoctorUseCase(repository)
}

