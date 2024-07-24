
import { Doctor, IDoctorRepository, ISchemaValidator, IUpdateDoctorUseCase } from '@/application/interfaces'
import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { UpdateDoctorUseCase } from './update-doctor.usecase'

const schemaValidator = mock<ISchemaValidator>()
const doctorRepository = mock<IDoctorRepository>()

describe('UpdateDoctorUseCase', () => {
  let sut: IUpdateDoctorUseCase
  let input: IUpdateDoctorUseCase.Input
  let doctorRepositoryOutput: Doctor

  beforeEach(() => {
    sut = new UpdateDoctorUseCase(schemaValidator, doctorRepository)
    input = {
      id: 'anyDoctorId',
      name: 'anyDoctorName',
      crm: 'anyDoctorCpf'
    }
    doctorRepositoryOutput = {
      id: 'otherAnyDoctorId',
      name: 'anyDoctorName',
      crm: 'anyDoctorEmail',
      password: 'anyDoctorPassword',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call schemaValidator once with correct values', async () => {
    doctorRepository.getById.mockResolvedValueOnce(doctorRepositoryOutput)
    await sut.execute(input)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'updateDoctorSchema', data: { name: input.name, crm: input.crm } })
    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  })

  test('should throws if id is empty', async () => {
    input.id = ''
    doctorRepository.getById.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id'))
  })

  test('should throws if crm is empty', async () => {
    doctorRepository.getById.mockResolvedValueOnce(doctorRepositoryOutput)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    input.crm = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if schemaValidator returns error', async () => {
    doctorRepository.getById.mockResolvedValueOnce(doctorRepositoryOutput)
    doctorRepository.getByCrm.mockResolvedValueOnce(null)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should call doctorRepository.update with correct values', async () => {
    doctorRepository.getById.mockResolvedValueOnce(doctorRepositoryOutput)
    doctorRepository.getByCrm.mockResolvedValueOnce(null)
    await sut.execute(input)
    expect(doctorRepository.update).toHaveBeenCalledWith({ ...input, updatedAt: new Date() })
    expect(doctorRepository.update).toHaveBeenCalledTimes(1)
  })
})
