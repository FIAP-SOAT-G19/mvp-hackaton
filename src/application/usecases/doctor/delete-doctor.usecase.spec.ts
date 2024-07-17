import { Doctor, IDeleteDoctorUseCase, IDoctorRepository } from '@/application/interfaces'
import { DoctorNotFoundError } from '@/infra/shared'
import { DeleteDoctorUseCase } from './delete-doctor.usecase'
import { mock } from 'jest-mock-extended'

const repository = mock<IDoctorRepository>()

describe('DeleteDoctorUseCase', () => {
  let sut: IDeleteDoctorUseCase
  let input: IDeleteDoctorUseCase.Input
  let doctorRepositoryOutput: Doctor

  beforeEach(() => {
    sut = new DeleteDoctorUseCase(repository)
    input = {
      id: 'anyDoctorId'
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
  })

  test('should throws if id is empty', async () => {
    input.id = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new DoctorNotFoundError())
  })

  test('should call doctorRepository.delete with correct values', async () => {
    repository.getById.mockResolvedValueOnce(doctorRepositoryOutput)
    await sut.execute(input)
    expect(repository.delete).toHaveBeenCalledWith(input.id)
    expect(repository.delete).toHaveBeenCalledTimes(1)
  })

  test('should rethrows if throws', async () => {
    repository.getById.mockResolvedValueOnce(doctorRepositoryOutput)
    repository.delete.mockRejectedValueOnce(new Error())
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new Error())
  })
})
