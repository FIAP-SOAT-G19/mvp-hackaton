import { IUpdateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/update-doctor-schedule.interface'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { UpdateDoctorScheduleController } from './update-doctor-schedule.controller'

const updateDoctorScheduleUseCase = mock<IUpdateDoctorScheduleUseCase>()

describe('UpdateDoctorScheduleController', () => {
  let sut: UpdateDoctorScheduleController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateDoctorScheduleController(updateDoctorScheduleUseCase)
    input = {
      body: {
        startDate: '2024-07-20T09:00:00'
      },
      params: {
        scheduleId: 'anyScheduleId'
      }
    }
  })

  test('should call UpdateDoctorScheduleUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(updateDoctorScheduleUseCase.execute).toHaveBeenCalledWith({ ...input.body, ...input.params })
    expect(updateDoctorScheduleUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a scheduleId on success', async () => {
    updateDoctorScheduleUseCase.execute.mockResolvedValueOnce('anyScheduleId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 201, body: { scheduleId: 'anyScheduleId' } })
  })

  test('should return an error if UpdateDoctorScheduleUseCase throws', async () => {
    const error = new Error('Internal server error')
    updateDoctorScheduleUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
