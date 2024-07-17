export interface IDeleteDoctorUseCase {
  execute: (input: IDeleteDoctorUseCase.Input) => Promise<void>
}

export namespace IDeleteDoctorUseCase {
  export type Input = { id: string }
}
