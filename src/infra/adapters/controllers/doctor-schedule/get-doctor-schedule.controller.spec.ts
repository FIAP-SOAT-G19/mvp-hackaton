import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { GetDoctorScheduleController } from './get-doctor-schedule.controller'
import { IGetDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-doctor-schedule.interface'
import { isEqual } from 'date-fns'

const getDoctorScheduleUseCase = mock<IGetDoctorScheduleUseCase>()

const getScheduleMock = {
  id: 'anyScheduleId',
  startDate: new Date('2024-07-21T10:00:00'),
  endDate: new Date('2024-07-21T10:50:00'),
  doctorId: 'anyDoctorId',
  doctorName: 'anyDoctorName',
  doctorCrm: 'anyDoctorCrm',
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null
}

describe('GetDoctorScheduleController', () => {
  let sut: GetDoctorScheduleController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetDoctorScheduleController(getDoctorScheduleUseCase)
    input = {
      params: {
        scheduleId: 'anyScheduleId'
      }
    }
  })

  test('should call GetDoctorScheduleUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(getDoctorScheduleUseCase.execute).toHaveBeenCalledWith(input.params.scheduleId)
    expect(getDoctorScheduleUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a schedule data on success', async () => {
    getDoctorScheduleUseCase.execute.mockResolvedValueOnce(getScheduleMock)
    const output = await sut.execute(input)
    expect(output.statusCode).toBe(200)
    expect(output.body.id).toBe('anyScheduleId')
    expect(output.body.doctorId).toBe('anyDoctorId')
    expect(output.body.doctorName).toBe('anyDoctorName')
    expect(output.body.doctorCrm).toBe('anyDoctorCrm')
    expect(output.body.updatedAt).toBe(null)
    expect(output.body.deletedAt).toBe(null)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body.createdAt).setMilliseconds(0), new Date().setMilliseconds(0))).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body.startDate).setMilliseconds(0), new Date('2024-07-21T10:00:00').setMilliseconds(0))).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body.endDate).setMilliseconds(0), new Date('2024-07-21T10:50:00').setMilliseconds(0))).toBe(true)
  })

  test('should return an error if GetDoctorScheduleUseCase throws', async () => {
    const error = new Error('Internal server error')
    getDoctorScheduleUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
