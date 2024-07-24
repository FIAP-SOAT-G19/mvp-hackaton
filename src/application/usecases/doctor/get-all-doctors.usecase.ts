import { IDoctorRepository, IGetAllDoctorsUseCase } from '@/application/interfaces'
import { DoctorNotFoundError } from '@/infra/shared'

export class GetAllDoctorsUseCase implements IGetAllDoctorsUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) { }

  async execute(): Promise<IGetAllDoctorsUseCase.Output[]> {
    const doctors = await this.doctorRepository.getAll()
    if (!doctors || doctors.length === 0) throw new DoctorNotFoundError()
    return doctors
  }
}

