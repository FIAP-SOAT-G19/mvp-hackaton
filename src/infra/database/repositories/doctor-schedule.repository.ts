import { DoctorSchedule, IDoctorScheduleRepository, SaveDoctorScheduleInput, UpdateDoctorScheduleInput } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { prismaClient } from '@/infra/database/prisma-client'

export class DoctorScheduleRepository implements IDoctorScheduleRepository {
  async getByCrm(doctorCrm: string): Promise<DoctorSchedule[] | null> {
    const doctorSchedule = await prismaClient.medicalSchedule.findMany({ where: { doctorCrm: doctorCrm ?? '', deletedAt: null } })
    return doctorSchedule ?? null
  }

  async getAll(): Promise<DoctorSchedule[] | null> {
    const doctorsSchedule = await prismaClient.medicalSchedule.findMany({ where: { deletedAt: null } })
    return doctorsSchedule ?? null
  }

  async getById(scheduleId: string): Promise<DoctorSchedule | null> {
    const schedule = await prismaClient.medicalSchedule.findUnique({
      where: {
        id: scheduleId
      }
    })
    if (!schedule) return null

    return {
      id: schedule.id,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      doctorId: schedule.doctorId,
      doctorName: schedule.doctorName,
      doctorCrm: schedule.doctorCrm,
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
      deletedAt: schedule.deletedAt
    }
  }

  async save(input: SaveDoctorScheduleInput): Promise<string> {
    const doctorSchedule = await prismaClient.medicalSchedule.create({
      data: {
        id: input.id,
        startDate: input.startDate,
        endDate: input.endDate,
        doctorId: input.doctorId,
        doctorName: input.doctorName,
        doctorCrm: input.doctorCrm,
        createdAt: input.createdAt
      }
    })
    return doctorSchedule.id
  }

  async update(input: UpdateDoctorScheduleInput): Promise<string> {
    const doctorSchedule = await prismaClient.medicalSchedule.update({
      data: {
        startDate: input.startDate,
        doctorCrm: input.doctorCrm,
        updatedAt: input.updatedAt
      },
      where: {
        id: input.id
      }
    })
    return doctorSchedule.id
  }

  async delete(scheduleId: string): Promise<void> {
    await prismaClient.medicalSchedule.update({
      data: { deletedAt: new Date() },
      where: { id: scheduleId }
    })
  }
}
