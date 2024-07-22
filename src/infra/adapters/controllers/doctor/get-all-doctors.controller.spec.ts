import { IGetAllDoctorsUseCase } from '@/application/interfaces'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { GetAllDoctorsController } from './get-all-doctors.controller'

const getAllDoctorsUseCase = mock<IGetAllDoctorsUseCase>()

describe('GetClientByIdController', () => {
  let sut: GetAllDoctorsController
  let input: HttpRequest
  let getAllDoctorsUseCaseOutput: IGetAllDoctorsUseCase.Output[]

  beforeEach(() => {
    sut = new GetAllDoctorsController(getAllDoctorsUseCase)
    getAllDoctorsUseCaseOutput = [{
      id: 'anyClientId',
      name: 'anyClientName',
      crm: 'anyClientEmail',
    }]
  })

  test('Should call getAllDoctorsUseCase once and with correct values', async () => {
    await sut.execute()
    expect(getAllDoctorsUseCase.execute).toHaveBeenCalledWith()
    expect(getAllDoctorsUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('Should return client on sucsess', async () => {
    getAllDoctorsUseCase.execute.mockResolvedValueOnce(getAllDoctorsUseCaseOutput)
    const output = await sut.execute()
    expect(output).toEqual({ statusCode: 200, body: getAllDoctorsUseCaseOutput })
  })

  test('should return an error if getAllDoctorsUseCase throws', async () => {
    const error = new Error('Internal server error')
    getAllDoctorsUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute()
    expect(output).toEqual(serverError(error))
  })
})
