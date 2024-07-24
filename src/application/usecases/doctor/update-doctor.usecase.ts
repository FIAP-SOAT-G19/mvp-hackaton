import { IDoctorRepository, ISchemaValidator, IUpdateDoctorUseCase } from '@/application/interfaces'
import { MissingParamError, InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class UpdateDoctorUseCase implements IUpdateDoctorUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly doctorRepository: IDoctorRepository
  ) { }

  async execute(input: IUpdateDoctorUseCase.Input): Promise<string> {
    await this.validate(input)
    return await this.doctorRepository.update({ ...input, updatedAt: new Date() })
  }

  private async validate(input: IUpdateDoctorUseCase.Input): Promise<void> {
    if (!input.name && !input.crm) throw new MissingParamError('enter at least one parameter name or crm')
    const doctor = await this.doctorRepository.getById(input.id)
    if (!doctor) throw new InvalidParamError('id')

    if (input.crm) {
      const doctorCrm = await this.doctorRepository.getByCrm(input.crm)
      if (doctorCrm && doctorCrm.id !== input.id) throw new InvalidParamError('there is already a user with this crm')
    }

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.UPDATE_DOCTOR,
      data: { name: input.name, crm: input.crm }
    })
    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}

