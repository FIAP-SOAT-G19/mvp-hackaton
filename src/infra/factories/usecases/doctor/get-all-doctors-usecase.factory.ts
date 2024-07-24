import { IGetAllDoctorsUseCase } from '@/application/interfaces'
import { GetAllDoctorsUseCase } from '@/application/usecases/doctor/get-all-doctors.usecase'
import { DoctorRepository } from '@/infra/database/repositories/doctor.repository'

export const makeGetAllDoctorsUseCase = (): IGetAllDoctorsUseCase => {
  const repository = new DoctorRepository()
  return new GetAllDoctorsUseCase(repository)
}

