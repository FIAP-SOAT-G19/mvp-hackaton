import { CreateDoctorController } from './create-doctor.controller'
import { ICreateDoctorUseCase } from '@/application/interfaces'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

const createDoctorUseCase = mock<ICreateDoctorUseCase>()

describe('CreateDoctorController', () => {
  let sut: CreateDoctorController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateDoctorController(createDoctorUseCase)
    input = {
      body: {
        name: 'anyDoctorName',
        crm: 'anyDoctorCrm',
        password: 'anyDoctorPassword',
        repeatPassword: 'anyDoctorRepeatPassword'
      }
    }
  })

  test('should call CreateDoctorUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(createDoctorUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(createDoctorUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a doctorId on success', async () => {
    createDoctorUseCase.execute.mockResolvedValueOnce('anyDoctorId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 201, body: { doctorId: 'anyDoctorId' } })
  })

  test('should return an error if CreateDoctorUseCase throws', async () => {
    const error = new Error('Internal server error')
    createDoctorUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
