export type DoctorSchedule = {
  id: string
  startDate: Date
  endDate: Date
  doctorId: string
  doctorName: string
  doctorCrm: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type SaveDoctorScheduleInput = Pick<DoctorSchedule, 'id' | 'startDate' | 'endDate' | 'doctorId' | 'doctorName' | 'doctorCrm' | 'createdAt'>
export type UpdateDoctorScheduleInput = Pick<DoctorSchedule, 'id' | 'startDate' | 'doctorCrm' | 'updatedAt'>

export interface IDoctorScheduleRepository {
  getByCrm: (doctorCrm: string) => Promise<DoctorSchedule[] | null>
  getById: (scheduleId: string) => Promise<DoctorSchedule | null>
  getAll: () => Promise<DoctorSchedule[] | null>
  save: (input: SaveDoctorScheduleInput) => Promise<string>
  update: (input: UpdateDoctorScheduleInput) => Promise<string>
  delete: (scheduleId: string) => Promise<void>
}
