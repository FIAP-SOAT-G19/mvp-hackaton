import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { DeleteDoctorScheduleController } from './delete-doctor-schedule.controller'
import { IDeleteDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/delete-doctor-schedule.interface'

const deleteDoctorScheduleUseCase = mock<IDeleteDoctorScheduleUseCase>()

describe('DeleteDoctorScheduleController', () => {
  let sut: DeleteDoctorScheduleController
  let input: HttpRequest

  beforeEach(() => {
    sut = new DeleteDoctorScheduleController(deleteDoctorScheduleUseCase)
    input = {
      params: {
        scheduleId: 'anyScheduleId'
      }
    }
  })

  test('should call DeleteDoctorScheduleUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(deleteDoctorScheduleUseCase.execute).toHaveBeenCalledWith(input.params)
    expect(deleteDoctorScheduleUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a scheduleId on success', async () => {
    deleteDoctorScheduleUseCase.execute.mockResolvedValueOnce('anyScheduleId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: { scheduleId: 'anyScheduleId' } })
  })

  test('should return an error if DeleteDoctorScheduleUseCase throws', async () => {
    const error = new Error('Internal server error')
    deleteDoctorScheduleUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
