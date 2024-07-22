import { ISchemaValidator, IUUIDGenerator, Doctor, IDoctorRepository } from '@/application/interfaces'
import { CreateDoctorScheduleUseCase } from './create-doctor-schedule.usecase'
import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { DoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { ICreateDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/create-doctor-schedule.interface'

const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const doctorRepository = mock<IDoctorRepository>()
const doctorScheduleRepository = mock<IDoctorScheduleRepository>()

describe('CreateDoctorScheduleUseCase', () => {
  let sut: ICreateDoctorScheduleUseCase
  let input: ICreateDoctorScheduleUseCase.Input
  let doctorRepositoryOutput: Doctor
  let doctorScheduleRepositoryOutput: DoctorSchedule[]

  beforeEach(() => {
    sut = new CreateDoctorScheduleUseCase(schemaValidator, uuidGenerator, doctorRepository, doctorScheduleRepository)
    MockDate.set(new Date('2024-07-20T09:00:00'))

    input = {
      startDate: '2024-07-21T10:00:00',
      doctorCrm: 'anyDoctorCrm'
    }

    doctorRepositoryOutput = {
      id: 'anyDoctorId',
      name: 'anyDoctorName',
      crm: 'anyDoctorCrm',
      password: 'anyDoctorPassword',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    doctorScheduleRepositoryOutput = [{
      id: 'anyScheduleId',
      startDate: new Date(input.startDate),
      endDate: new Date('2024-07-21T10:50:00'),
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      doctorCrm: 'anyDoctorCrm',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    },
    {
      id: 'anyScheduleId2',
      startDate: new Date('2024-07-22T14:00:00'),
      endDate: new Date('2024-07-22T14:50:00'),
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      doctorCrm: 'anyDoctorCrm',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    ]
  })

  afterEach(() => {
    MockDate.reset()
  })

  test.skip('should throws if startDate is empty', async () => {
    input.startDate = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test.skip('should throws if crm is empty', async () => {
    input.doctorCrm = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if crm does not exist', async () => {
    doctorRepository.getByCrm.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('crm'))
  })

  test('should throws if startDate is not at least 2 hours after the current time', async () => {
    const startDate = '2024-07-20T03:00:00'
    input.startDate = startDate
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate must be at least 2 hours after the current time'))
  })

  test('should throw if startDate hour is not between 8am and 6pm', async () => {
    const startDate = '2024-07-21T01:00:00'
    input.startDate = startDate

    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate must be between 8 AM and 6 PM'))
  })

  test('should throw if startDate is not a closed hour', async () => {
    const startDate = '2024-07-21T08:10:00'
    input.startDate = startDate

    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate must be the hour without the minutes'))
  })

  test('should throw if startDate already exists', async () => {
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)
    doctorScheduleRepository.getByCrm.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('startDate already exists'))
  })

  test('should call doctorScheduleRepository.save with correct values', async () => {
    const startDate = '2024-07-21T14:00:00'
    input.startDate = startDate
    doctorRepository.getByCrm.mockResolvedValueOnce(doctorRepositoryOutput)
    doctorScheduleRepository.getByCrm.mockResolvedValueOnce(doctorScheduleRepositoryOutput)
    uuidGenerator.generate.mockReturnValueOnce('anyUuid')

    await sut.execute(input)
    // expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'doctorScheduleSchema', data: input })
    // expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
    expect(doctorRepository.getByCrm).toHaveBeenCalledWith('anyDoctorCrm')
    expect(doctorRepository.getByCrm).toHaveBeenCalledTimes(1)
    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledWith('anyDoctorCrm')
    expect(doctorScheduleRepository.getByCrm).toHaveBeenCalledTimes(1)
    expect(doctorScheduleRepository.save).toHaveBeenCalledWith({
      ...input,
      id: 'anyUuid',
      startDate: new Date('2024-07-21T14:00:00'),
      endDate: new Date('2024-07-21T14:50:00'),
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      createdAt: new Date()
    })
    expect(doctorScheduleRepository.save).toHaveBeenCalledTimes(1)
  })
})
