export interface ICreateDoctorScheduleUseCase {
  execute: (input: ICreateDoctorScheduleUseCase.Input) => Promise<ICreateDoctorScheduleUseCase.Output>
}

export namespace ICreateDoctorScheduleUseCase {
  export type Input = {
    startDate: string
    doctorCrm: string
  }
  export type Output = string
}
