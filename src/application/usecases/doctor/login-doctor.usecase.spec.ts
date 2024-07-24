import { Doctor, IDoctorRepository, ILoginDoctorUseCase } from '@/application/interfaces'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { LoginDoctorUseCase } from './login-doctor.usecase'

const doctorRepository = mock<IDoctorRepository>()
const encrypt = mock<IEncrypt>()

describe('LoginDoctorUseCase', () => {
  let sut: ILoginDoctorUseCase
  let input: ILoginDoctorUseCase.Input
  let doctorRepositoryOutput: Doctor

  beforeEach(() => {
    sut = new LoginDoctorUseCase(doctorRepository, encrypt)
    input = {
      crm: 'anyDoctorCrm',
      password: 'anyDoctorPassword'
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

  test('should call doctorRepository onde with correct values', async () => {
    encrypt.compare.mockResolvedValueOnce(true)
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)
    await sut.execute(input)
    expect(doctorRepository.getByCrm).toHaveBeenCalledWith(input.crm)
    expect(doctorRepository.getByCrm).toHaveBeenCalledTimes(1)
  })

  test('should throws if crm is invalid', async () => {
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('crm or password is incorrect'))
  })

  test('should throws if password is invalid', async () => {
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('crm or password is incorrect'))
  })

  test('should return Client with correct values', async () => {
    encrypt.compare.mockResolvedValueOnce(true)
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)
    const client = await sut.execute(input)
    expect(client).toEqual({ name: doctorRepositoryOutput.name, crm: doctorRepositoryOutput.crm, token: '' })
  })
})
