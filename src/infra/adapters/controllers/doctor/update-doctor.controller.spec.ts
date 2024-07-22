import { IUpdateDoctorUseCase } from '@/application/interfaces'
import { UpdateDoctorController } from './update-doctor.controller'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

const updateDoctorUseCase = mock<IUpdateDoctorUseCase>()

describe('UpdateDoctorController', () => {
  let sut: UpdateDoctorController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateDoctorController(updateDoctorUseCase)
    input = {
      body: {
        id: 'anyDoctorId',
        name: 'anyDoctorName',
        crm: 'anyDoctorEmail',
        password: 'anyDoctorPassword',
        repeatPassword: 'anyDoctorRepeatPassword'
      }
    }
  })

  test('should call UpdateDoctorUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(updateDoctorUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(updateDoctorUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a doctorId on success', async () => {
    updateDoctorUseCase.execute.mockResolvedValueOnce('anyDoctorId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: { doctorId: 'anyDoctorId' } })
  })

  test('should return an error if updateDoctorUseCase throws', async () => {
    const error = new Error('Internal server error')
    updateDoctorUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
