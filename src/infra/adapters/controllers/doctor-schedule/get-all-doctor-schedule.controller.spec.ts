import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import { isEqual } from 'date-fns'
import { IGetAllDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-all-doctor-schedule.interface'
import { GetAllDoctorScheduleController } from './get-all-doctor-schedule.controller'

const getAllDoctorScheduleUseCase = mock<IGetAllDoctorScheduleUseCase>()

const getAllScheduleMock = [{
  id: 'anyScheduleId',
  startDate: new Date('2024-07-21T10:00:00'),
  endDate: new Date('2024-07-21T10:50:00'),
  doctorId: 'anyDoctorId',
  doctorName: 'anyDoctorName',
  doctorCrm: 'anyDoctorCrm'
},
{
  id: 'anyScheduleId2',
  startDate: new Date('2024-07-22T10:00:00'),
  endDate: new Date('2024-07-22T10:50:00'),
  doctorId: 'anyDoctorId',
  doctorName: 'anyDoctorName',
  doctorCrm: 'anyDoctorCrm'
}]

describe('GetAllDoctorScheduleController', () => {
  let sut: GetAllDoctorScheduleController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetAllDoctorScheduleController(getAllDoctorScheduleUseCase)
    input = {
      query: {
        crm: 'anyDoctorCrm'
      }
    }
  })

  test('should call GetAllDoctorScheduleUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(getAllDoctorScheduleUseCase.execute).toHaveBeenCalledWith(input.query)
    expect(getAllDoctorScheduleUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return schedules data on success', async () => {
    getAllDoctorScheduleUseCase.execute.mockResolvedValueOnce(getAllScheduleMock)
    const output = await sut.execute(input)
    expect(output.statusCode).toBe(200)
    expect(output.body[0].id).toBe('anyScheduleId')
    expect(output.body[0].doctorId).toBe('anyDoctorId')
    expect(output.body[0].doctorName).toBe('anyDoctorName')
    expect(output.body[0].doctorCrm).toBe('anyDoctorCrm')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body[0].startDate).setMilliseconds(0), new Date('2024-07-21T10:00:00').setMilliseconds(0))).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body[0].endDate).setMilliseconds(0), new Date('2024-07-21T10:50:00').setMilliseconds(0))).toBe(true)

    expect(output.body[1].id).toBe('anyScheduleId2')
    expect(output.body[1].doctorId).toBe('anyDoctorId')
    expect(output.body[1].doctorName).toBe('anyDoctorName')
    expect(output.body[1].doctorCrm).toBe('anyDoctorCrm')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body[1].startDate).setMilliseconds(0), new Date('2024-07-22T10:00:00').setMilliseconds(0))).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(isEqual(new Date(output.body[1].endDate).setMilliseconds(0), new Date('2024-07-22T10:50:00').setMilliseconds(0))).toBe(true)
  })

  test('should return an error if GetAllDoctorScheduleUseCase throws', async () => {
    const error = new Error('Internal server error')
    getAllDoctorScheduleUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
