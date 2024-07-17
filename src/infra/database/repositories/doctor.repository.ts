
import { Doctor, IDoctorRepository, SaveDoctorInput, UpdateDoctorInput } from '@/application/interfaces'
import { prismaClient } from '@/infra/database/prisma-client'

export class DoctorRepository implements IDoctorRepository {
  async getById(doctorId: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({ where: { id: doctorId, deletedAt: null } })
    return doctor ?? null
  }

  async getByCrm(crm: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findFirst({ where: { crm: crm ?? '', deletedAt: null } })
    return doctor ?? null
  }

  async getAll(): Promise<Doctor[] | null> {
    const doctors = await prismaClient.doctor.findMany({ where: { deletedAt: null } })
    return doctors ?? null
  }

  async save(input: SaveDoctorInput): Promise<string> {
    const doctor = await prismaClient.doctor.create({
      data: {
        id: input.id,
        crm: input.crm,
        name: input.name,
        password: input.password,
        createdAt: input.createdAt
      }
    })
    return doctor.id
  }

  async update(input: UpdateDoctorInput): Promise<string> {
    const doctor = await prismaClient.doctor.update({
      data: {
        name: input.name,
        crm: input.crm,
        updatedAt: input.updatedAt
      },
      where: {
        id: input.id
      }
    })
    return doctor.id
  }

  async delete(doctorId: string): Promise<void> {
    await prismaClient.doctor.update({
      data: { deletedAt: new Date() },
      where: { id: doctorId }
    })
  }
}
