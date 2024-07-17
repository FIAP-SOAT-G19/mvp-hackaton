import { ISchemaValidator, IUUIDGenerator, ICreateDoctorUseCase, IDoctorRepository } from '@/application/interfaces'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class CreateDoctorUseCase implements ICreateDoctorUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly doctorRepository: IDoctorRepository,
    private readonly encrypt: IEncrypt
  ) { }

  async execute(input: ICreateDoctorUseCase.Input): Promise<ICreateDoctorUseCase.Output> {
    await this.validate(input)
    return this.doctorRepository.save({
      ...input,
      id: this.uuidGenerator.generate(),
      password: this.encrypt.encrypt(input.password),
      createdAt: new Date()
    })
  }

  private async validate(input: ICreateDoctorUseCase.Input): Promise<void> {
    const doctorCrm = await this.doctorRepository.getByCrm(input.crm)
    if (doctorCrm) throw new InvalidParamError('crm')

    const validation = this.schemaValidator.validate({ schema: constants.SCHEMAS.DOCTOR, data: input })
    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
