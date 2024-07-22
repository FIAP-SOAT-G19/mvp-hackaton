export interface IGetDoctorScheduleUseCase {
  execute: (input: IGetDoctorScheduleUseCase.Input) => Promise<IGetDoctorScheduleUseCase.Output>
}

export namespace IGetDoctorScheduleUseCase {
  export type Input = string
  export type Output = {
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
}
