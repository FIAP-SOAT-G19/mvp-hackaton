import { IDeleteDoctorUseCase, IDoctorRepository } from '@/application/interfaces'
import { DoctorNotFoundError } from '@/infra/shared'

export class DeleteDoctorUseCase implements IDeleteDoctorUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) { }

  async execute(input: IDeleteDoctorUseCase.Input): Promise<void> {
    await this.validate(input)
    await this.doctorRepository.delete(input.id)
  }

  private async validate(input: IDeleteDoctorUseCase.Input): Promise<void> {
    const doctor = await this.doctorRepository.getById(input.id)
    if (!doctor) throw new DoctorNotFoundError()
  }
}
