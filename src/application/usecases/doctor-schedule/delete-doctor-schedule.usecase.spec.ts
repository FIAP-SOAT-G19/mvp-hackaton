import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { DoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IDeleteDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/delete-doctor-schedule.interface'
import { ISchemaValidator } from '@/application/interfaces'
import { DeleteDoctorScheduleUseCase } from './delete-doctor-schedule.usecase'

const doctorScheduleRepository = mock<IDoctorScheduleRepository>()
const schemaValidator = mock<ISchemaValidator>()

describe('DeleteDoctorScheduleUseCase', () => {
  let sut: IDeleteDoctorScheduleUseCase
  let input: IDeleteDoctorScheduleUseCase.Input
  let doctorScheduleRepositoryOutput: DoctorSchedule

  beforeEach(() => {
    sut = new DeleteDoctorScheduleUseCase(doctorScheduleRepository, schemaValidator)
    MockDate.set(new Date('2024-07-20T09:00:00'))

    input = {
      scheduleId: 'anyScheduleId'

    }

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

  test.skip('should throws if schedule is empty', async () => {
    input.scheduleId = ''
    schemaValidator.validate.mockReturnValueOnce({ value: { input }, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if schedule id does not exist', async () => {
    schemaValidator.validate.mockReturnValue({
      value: { input }
    })
    doctorScheduleRepository.getByIdNotDeleted.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id already deleted'))
  })

  test('should call doctorScheduleRepository.delete with correct values', async () => {
    schemaValidator.validate.mockReturnValue({
      value: { input }
    })
    doctorScheduleRepository.getByIdNotDeleted.mockResolvedValueOnce(doctorScheduleRepositoryOutput)

    await sut.execute(input)
    expect(doctorScheduleRepository.getByIdNotDeleted).toHaveBeenCalledWith('anyScheduleId')
    expect(doctorScheduleRepository.getByIdNotDeleted).toHaveBeenCalledTimes(1)
    expect(doctorScheduleRepository.delete).toHaveBeenCalledWith('anyScheduleId')
    expect(doctorScheduleRepository.delete).toHaveBeenCalledTimes(1)
  })
})
