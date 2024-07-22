import { CreateDoctorScheduleController } from './create-doctor-schedule.controller'
import { ICreateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/create-doctor-schedule.interface'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

const createDoctorScheduleUseCase = mock<ICreateDoctorScheduleUseCase>()

describe('CreateDoctorScheduleController', () => {
  let sut: CreateDoctorScheduleController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateDoctorScheduleController(createDoctorScheduleUseCase)
    input = {
      body: {
        startDate: '2024-07-20T09:00:00',
        crm: 'anyDoctorCrm'
      }
    }
  })

  test('should call CreateDoctorScheduleUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(createDoctorScheduleUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(createDoctorScheduleUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a scheduleId on success', async () => {
    createDoctorScheduleUseCase.execute.mockResolvedValueOnce('anyScheduleId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 201, body: { scheduleId: 'anyScheduleId' } })
  })

  test('should return an error if CreateDoctorScheduleUseCase throws', async () => {
    const error = new Error('Internal server error')
    createDoctorScheduleUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
