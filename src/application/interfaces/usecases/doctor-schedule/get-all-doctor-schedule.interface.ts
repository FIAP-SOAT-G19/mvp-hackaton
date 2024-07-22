export interface IGetAllDoctorScheduleUseCase {
  execute: (input: IGetAllDoctorScheduleUseCase.Input) => Promise<IGetAllDoctorScheduleUseCase.Output[] | null>
}

export namespace IGetAllDoctorScheduleUseCase {
  export type Input = {
    crm?: string
  }

  export type Output = {
    id: string
    startDate: Date
    endDate: Date
    doctorId: string
    doctorName: string
    doctorCrm: string
  }
}
