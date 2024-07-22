import { IDeleteDoctorUseCase } from '@/application/interfaces'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { DeleteDoctorController } from './delete-doctor.controller'

const deleteDoctorUseCase = mock<IDeleteDoctorUseCase>()

describe('DeleteDoctorController', () => {
  let sut: DeleteDoctorController
  let input: HttpRequest

  beforeEach(() => {
    sut = new DeleteDoctorController(deleteDoctorUseCase)
    input = {
      params: {
        id: 'anyDoctorId'
      }
    }
  })

  test('should call deleteDoctorUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(deleteDoctorUseCase.execute).toHaveBeenCalledWith(input.params)
    expect(deleteDoctorUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a clientId on success', async () => {
    deleteDoctorUseCase.execute.mockResolvedValueOnce()
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: {} })
  })

  test('should return an error if deleteDoctorUseCase throws', async () => {
    const error = new Error('Internal server error')
    deleteDoctorUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
