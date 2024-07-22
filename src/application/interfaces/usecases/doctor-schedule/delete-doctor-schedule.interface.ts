export interface IDeleteDoctorScheduleUseCase {
  execute: (input: IDeleteDoctorScheduleUseCase.Input) => Promise<IDeleteDoctorScheduleUseCase.Output>
}

export namespace IDeleteDoctorScheduleUseCase {
  export type Input = {
    scheduleId: string
  }
  export type Output = string
}
