import { ILoginDoctorUseCase } from '@/application/interfaces'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { LoginDoctorController } from './login-doctor.controller'

const loginDoctorUseCase = mock<ILoginDoctorUseCase>()

describe('LoginDoctorController', () => {
  let sut: LoginDoctorController
  let input: HttpRequest
  let loginDoctorUseCaseOutput: ILoginDoctorUseCase.Output

  beforeEach(() => {
    sut = new LoginDoctorController(loginDoctorUseCase)
    input = {
      body: {
        crm: 'anyDoctorCrm',
        password: 'anyClientPassword'
      }
    }
    loginDoctorUseCaseOutput = {
      name: 'anyClientName',
      crm: 'anyDoctorCrm',
      token: ''
    }
  })

  test('should call loginDoctorUseCase onde and with correct values', async () => {
    await sut.execute(input)
    expect(loginDoctorUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(loginDoctorUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a Client on success', async () => {
    loginDoctorUseCase.execute.mockResolvedValueOnce({ ...loginDoctorUseCaseOutput })
    const output = await sut.execute(input.body)
    expect(output).toEqual({ statusCode: 200, body: { ...loginDoctorUseCaseOutput } })
  })

  test('shoudl return an error if loginDoctorUseCase throws', async () => {
    const error = new Error('Internal server error')
    loginDoctorUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input.body)
    expect(output).toEqual(serverError(error))
  })
})
