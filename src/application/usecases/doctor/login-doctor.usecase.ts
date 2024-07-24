import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { IDoctorRepository, ILoginDoctorUseCase } from '@/application/interfaces'
import { InvalidParamError } from '@/infra/shared'

export class LoginDoctorUseCase implements ILoginDoctorUseCase {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly encrypt: IEncrypt
  ) { }

  async execute(input: ILoginDoctorUseCase.Input): Promise<ILoginDoctorUseCase.Output> {
    const doctor = await this.doctorRepository.getByCrm(input.crm)
    if (!doctor) {
      throw new InvalidParamError('crm or password is incorrect')
    }
    const passwordCompare = await this.encrypt.compare(input.password, doctor.password)
    if (!passwordCompare) {
      throw new InvalidParamError('crm or password is incorrect')
    }

    return { name: doctor.name, crm: doctor.crm, token: '' }
  }
}

