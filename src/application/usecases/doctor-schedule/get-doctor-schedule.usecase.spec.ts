import { ISchemaValidator } from '@/application/interfaces'
import { InvalidParamError, MissingParamError, ScheduleNotFoundError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { DoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IGetDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-doctor-schedule.interface'
import { GetDoctorScheduleUseCase } from './get-doctor-schedule.usecase'

const schemaValidator = mock<ISchemaValidator>()
const doctorScheduleRepository = mock<IDoctorScheduleRepository>()

describe('GetDoctorScheduleUseCase', () => {
  let sut: IGetDoctorScheduleUseCase
  let input: IGetDoctorScheduleUseCase.Input
  let doctorScheduleRepositoryOutput: DoctorSchedule

  beforeEach(() => {
    sut = new GetDoctorScheduleUseCase(schemaValidator, doctorScheduleRepository)
    MockDate.set(new Date('2024-07-20T09:00:00'))

    input = 'anyScheduleId'

    doctorScheduleRepositoryOutput = {
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
  })

  afterEach(() => {
    MockDate.reset()
  })

  test.skip('should throws if anyScheduleId is empty', async () => {
    input = ''
    schemaValidator.validate.mockReturnValue({
      value: input as any,
      error: 'error'
    })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if anyScheduleId is empty', async () => {
    input = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new MissingParamError('schedule id'))
  })

  test('should throws if schedule does not exist', async () => {
    doctorScheduleRepository.getById.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new ScheduleNotFoundError())
  })

  test('should call doctorScheduleRepository.getById with correct values', async () => {
    doctorScheduleRepository.getById.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    const output = await sut.execute(input)

    expect(doctorScheduleRepository.getById).toHaveBeenCalledWith('anyScheduleId')
    expect(doctorScheduleRepository.getById).toHaveBeenCalledTimes(1)
    expect(output).toEqual({
      id: 'anyScheduleId',
      startDate: new Date('2024-07-21T10:00:00'),
      endDate: new Date('2024-07-21T10:50:00'),
      doctorId: 'anyDoctorId',
      doctorName: 'anyDoctorName',
      doctorCrm: 'anyDoctorCrm',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    })
  })
})
