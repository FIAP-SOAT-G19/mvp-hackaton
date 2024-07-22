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

export type GetDoctorSchedule = {
  id: string
  startDate: Date
  endDate: Date
  doctorId: string
  doctorName: string
  doctorCrm: string
}

export type SaveDoctorScheduleInput = Pick<DoctorSchedule, 'id' | 'startDate' | 'endDate' | 'doctorId' | 'doctorName' | 'doctorCrm' | 'createdAt'>
export type UpdateDoctorScheduleInput = Pick<DoctorSchedule, 'id' | 'startDate' | 'endDate' | 'updatedAt'>

export interface IDoctorScheduleRepository {
  getByCrm: (doctorCrm: string) => Promise<GetDoctorSchedule[] | null>
  getById: (scheduleId: string) => Promise<DoctorSchedule | null>
  getByIdNotDeleted: (scheduleId: string) => Promise<DoctorSchedule | null>
  getAll: () => Promise<GetDoctorSchedule[] | null>
  save: (input: SaveDoctorScheduleInput) => Promise<string>
  update: (input: UpdateDoctorScheduleInput) => Promise<string>
  delete: (scheduleId: string) => Promise<void>
}
