import { ISchemaValidator, IUUIDGenerator, Doctor, IDoctorRepository } from '@/application/interfaces'
import { ICreateDoctorUseCase } from '@/application/interfaces/usecases/doctor/create-doctor.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { CreateDoctorUseCase } from './create-doctor.usecase'
import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const encrypt = mock<IEncrypt>()
const doctorRepository = mock<IDoctorRepository>()

describe('CreateDoctorUseCase', () => {
  let sut: ICreateDoctorUseCase
  let input: ICreateDoctorUseCase.Input
  let doctorRepositoryOutput: Doctor

  beforeEach(() => {
    sut = new CreateDoctorUseCase(schemaValidator, uuidGenerator, doctorRepository, encrypt)
    input = {
      name: 'anyDoctorName',
      crm: 'anyDoctorCrm',
      password: 'anyDoctorPassword',
      repeatPassword: 'anyDoctorRepeatPassword'
    }

    doctorRepositoryOutput = {
      id: 'anyDoctorId',
      name: 'anyDoctorName',
      crm: 'anyDoctorCrm',
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
    await sut.execute(input)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'doctorSchema', data: input })
    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  })

  test('should throws if name is empty', async () => {
    input.name = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if crm is empty', async () => {
    input.crm = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if password is empty', async () => {
    input.password = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if repeatPassword is empty', async () => {
    input.repeatPassword = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if password and repeatPassword are different ', async () => {
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if crm already exists', async () => {
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('crm'))
  })

  test('should call encrypt once with correct values', async () => {
    await sut.execute(input)
    expect(encrypt.encrypt).toHaveBeenCalledWith(input.password)
    expect(encrypt.encrypt).toHaveBeenCalledTimes(1)
  })

  test('should call uuidGenerator once with correct values', async () => {
    await sut.execute(input)
    expect(uuidGenerator.generate).toHaveBeenCalledWith()
    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call doctorRepository.save with correct values', async () => {
    uuidGenerator.generate.mockReturnValueOnce('anyUuid')
    encrypt.encrypt.mockReturnValueOnce('anyEncrypt')
    await sut.execute(input)
    expect(doctorRepository.save).toHaveBeenCalledWith({
      ...input,
      id: 'anyUuid',
      password: 'anyEncrypt',
      createdAt: new Date()
    })
    expect(doctorRepository.save).toHaveBeenCalledTimes(1)
  })
})
