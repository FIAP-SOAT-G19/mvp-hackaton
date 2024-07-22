import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { GetDoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IGetAllDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-all-doctor-schedule.interface'
import { GetAllDoctorScheduleUseCase } from './get-all-doctor-schedule.usecase'

const doctorScheduleRepository = mock<IDoctorScheduleRepository>()

describe('GetAllDoctorScheduleUseCase', () => {
  let sut: IGetAllDoctorScheduleUseCase
  let input: IGetAllDoctorScheduleUseCase.Input
  let doctorScheduleRepositoryOutput: GetDoctorSchedule[]

  beforeEach(() => {
    sut = new GetAllDoctorScheduleUseCase(doctorScheduleRepository)
    MockDate.set(new Date('2024-07-20T09:00:00'))

    input = {
      crm: ''
    }

    doctorScheduleRepositoryOutput = [{
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
    },
    {
      id: 'anyScheduleId3',
      startDate: new Date('2024-07-23T10:00:00'),
      endDate: new Date('2024-07-23T10:50:00'),
      doctorId: 'anyDoctorId3',
      doctorName: 'anyDoctorName3',
      doctorCrm: 'anyDoctorCrm3'
    }
    ]
  })

  afterEach(() => {
    MockDate.reset()
  })

  test('should call get all doctors schedules with correct values', async () => {
    doctorScheduleRepository.getAll.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = await sut.execute(input)

    expect(doctorScheduleRepository.getAll).toHaveBeenCalled()
    expect(doctorScheduleRepository.getAll).toHaveBeenCalledTimes(1)
    expect(output).toEqual([{
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
    },
    {
      id: 'anyScheduleId3',
      startDate: new Date('2024-07-23T10:00:00'),
      endDate: new Date('2024-07-23T10:50:00'),
      doctorId: 'anyDoctorId3',
      doctorName: 'anyDoctorName3',
      doctorCrm: 'anyDoctorCrm3'
    }])
  })

  test('should call get all doctors schedules by crm with correct values', async () => {
    doctorScheduleRepositoryOutput = [
      {
        id: 'anyScheduleId3',
        startDate: new Date('2024-07-23T10:00:00'),
        endDate: new Date('2024-07-23T10:50:00'),
        doctorId: 'anyDoctorId3',
        doctorName: 'anyDoctorName3',
        doctorCrm: 'anyDoctorCrm3'
      }
    ]
    input.crm = 'anyDoctorCrm3'
    doctorScheduleRepository.getByCrm.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = await sut.execute(input)

    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledWith('anyDoctorCrm3')
    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledTimes(1)

    expect(output).toEqual([
      {
        id: 'anyScheduleId3',
        startDate: new Date('2024-07-23T10:00:00'),
        endDate: new Date('2024-07-23T10:50:00'),
        doctorId: 'anyDoctorId3',
        doctorName: 'anyDoctorName3',
        doctorCrm: 'anyDoctorCrm3'
      }])
  })

  test('should not return schedules if is an old date', async () => {
    MockDate.set(new Date('2024-07-25T09:00:00'))
    doctorScheduleRepositoryOutput = [
      {
        id: 'anyScheduleId3',
        startDate: new Date('2024-07-23T10:00:00'),
        endDate: new Date('2024-07-23T10:50:00'),
        doctorId: 'anyDoctorId3',
        doctorName: 'anyDoctorName3',
        doctorCrm: 'anyDoctorCrm3'
      }
    ]
    input.crm = 'anyDoctorCrm3'
    doctorScheduleRepository.getByCrm.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = await sut.execute(input)

    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledWith('anyDoctorCrm3')
    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledTimes(1)

    expect(output).toEqual([])
  })
})
