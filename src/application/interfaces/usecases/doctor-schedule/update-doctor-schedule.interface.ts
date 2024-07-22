export interface IUpdateDoctorScheduleUseCase {
  execute: (input: IUpdateDoctorScheduleUseCase.Input) => Promise<IUpdateDoctorScheduleUseCase.Output>
}

export namespace IUpdateDoctorScheduleUseCase {
  export type Input = {
    scheduleId: string
    startDate: string
  }
  export type Output = string
}
