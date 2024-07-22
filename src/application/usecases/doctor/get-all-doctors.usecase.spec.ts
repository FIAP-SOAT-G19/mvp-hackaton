import { IDoctorRepository, IGetAllDoctorsUseCase, DoctorOutput } from '@/application/interfaces'
import { GetAllDoctorsUseCase } from './get-all-doctors.usecase'
import { DoctorNotFoundError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

const doctorRepository = mock<IDoctorRepository>()

describe('GetAllDoctorssByParamsUseCase', () => {
  let sut: IGetAllDoctorsUseCase
  let getAllDoctorsOutput: DoctorOutput[]

  beforeEach(() => {
    sut = new GetAllDoctorsUseCase(doctorRepository)
    getAllDoctorsOutput = [{
      id: 'anyDoctorId',
      name: 'anyDoctorName',
      crm: 'anyDoctorCrm'
    }]
  })

  test('should call clientRepository with correct values', async () => {
    doctorRepository.getAll.mockResolvedValueOnce(getAllDoctorsOutput)
    await sut.execute()
    expect(doctorRepository.getAll).toHaveBeenCalledWith()
    expect(doctorRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository with correct values', async () => {
    doctorRepository.getAll.mockResolvedValueOnce(getAllDoctorsOutput)
    await sut.execute()
    expect(doctorRepository.getAll).toHaveBeenCalledWith()
    expect(doctorRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository with correct values', async () => {
    doctorRepository.getAll.mockResolvedValueOnce(getAllDoctorsOutput)
    await sut.execute()
    expect(doctorRepository.getAll).toHaveBeenCalledWith()
    expect(doctorRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository returns correct values', async () => {
    doctorRepository.getAll.mockResolvedValueOnce(getAllDoctorsOutput)
    const output = await sut.execute()
    expect(output).toMatchObject(getAllDoctorsOutput)
  })

  test('should throws if clientId not exists', async () => {
    const output = sut.execute()
    await expect(output).rejects.toThrow(new DoctorNotFoundError())
  })
})
