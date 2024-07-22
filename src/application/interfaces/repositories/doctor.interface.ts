export type Doctor = {
  id: string
  name: string
  crm: string
  password: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type DoctorOutput = {
  id: string
  name: string
  crm: string
}

export type SaveDoctorInput = Pick<Doctor, 'id' | 'name' | 'crm' | 'password' | 'createdAt'>
export type UpdateDoctorInput = Pick<Doctor, 'id' | 'name' | 'crm' | 'updatedAt'>


export interface IDoctorRepository {
  getById: (doctorId: string) => Promise<Doctor | null>
  getByCrm: (crm: string) => Promise<Doctor | null>
  getAll: () => Promise<DoctorOutput[] | null>
  save: (input: SaveDoctorInput) => Promise<string>
  update: (input: UpdateDoctorInput) => Promise<string>
  delete: (doctorId: string) => Promise<void>
}
