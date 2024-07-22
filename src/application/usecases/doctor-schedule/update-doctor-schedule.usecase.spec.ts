import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { DoctorSchedule, GetDoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IUpdateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/update-doctor-schedule.interface'
import { UpdateDoctorScheduleUseCase } from './update-doctor-schedule.usecase'

const doctorScheduleRepository = mock<IDoctorScheduleRepository>()

describe('UpdateDoctorScheduleUseCase', () => {
  let sut: IUpdateDoctorScheduleUseCase
  let input: IUpdateDoctorScheduleUseCase.Input
  let doctorScheduleRepositoryOutput: DoctorSchedule
  let getDoctorScheduleRepositoryOutput: GetDoctorSchedule[]

  beforeEach(() => {
    sut = new UpdateDoctorScheduleUseCase(doctorScheduleRepository)
    MockDate.set(new Date('2024-07-20T09:00:00'))

    input = {
      scheduleId: 'anyScheduleId',
      startDate: '2024-07-21T10:00:00'
    }

    doctorScheduleRepositoryOutput = {
      id: 'anyScheduleId',
      startDate: new Date(input.startDate),
      endDate: new Date('2024-07-21T10:50:00'),
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      doctorCrm: 'anyDoctorCrm',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    getDoctorScheduleRepositoryOutput = [{
      id: 'anyScheduleId',
      startDate: new Date(input.startDate),
      endDate: new Date('2024-07-21T10:50:00'),
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      doctorCrm: 'anyDoctorCrm'
    }]
  })

  afterEach(() => {
    MockDate.reset()
  })

  test('should throws if schedule id does not exist', async () => {
    doctorScheduleRepository.getById.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id'))
  })

  test('should throws if startDate is not at least 2 hours after the current time', async () => {
    const startDate = '2024-07-20T03:00:00'
    input.startDate = startDate
    doctorScheduleRepository.getById.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate must be at least 2 hours after the current time'))
  })

  test('should throw if startDate hour is not between 8am and 6pm', async () => {
    const startDate = '2024-07-21T01:00:00'
    input.startDate = startDate
    doctorScheduleRepository.getById.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate must be between 8 AM and 6 PM'))
  })

  test('should throw if startDate is not a closed hour', async () => {
    const startDate = '2024-07-21T08:10:00'
    input.startDate = startDate
    doctorScheduleRepository.getById.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate must be the hour without the minutes'))
  })

  test('should throw if startDate already exists', async () => {
    getDoctorScheduleRepositoryOutput = [{
      id: 'anyScheduleId',
      startDate: new Date('2024-07-21T07:00:00'), // +3 hours
      endDate: new Date('2024-07-21T07:50:00'), // +3 hours
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      doctorCrm: 'anyDoctorCrm'
    }]
    doctorScheduleRepository.getById.mockResolvedValueOnce(doctorScheduleRepositoryOutput)
    doctorScheduleRepository.getByCrm.mockResolvedValueOnce(getDoctorScheduleRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate already exists'))
  })

  test('should call doctorScheduleRepository.update with correct values', async () => {
    const startDate = '2024-07-21T14:00:00'
    input.startDate = startDate
    doctorScheduleRepository.getById.mockResolvedValueOnce(doctorScheduleRepositoryOutput)
    doctorScheduleRepository.getByCrm.mockResolvedValueOnce(getDoctorScheduleRepositoryOutput)

    await sut.execute(input)
    expect(doctorScheduleRepository.getById).toHaveBeenCalledWith('anyScheduleId')
    expect(doctorScheduleRepository.getById).toHaveBeenCalledTimes(1)
    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledWith('anyDoctorCrm')
    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledTimes(1)
    expect(doctorScheduleRepository.update).toHaveBeenCalledWith({
      id: 'anyScheduleId',
      startDate: new Date('2024-07-21T11:00:00'),
      endDate: new Date('2024-07-21T11:50:00'),
      updatedAt: new Date()
    })
    expect(doctorScheduleRepository.update).toHaveBeenCalledTimes(1)
  })
})
