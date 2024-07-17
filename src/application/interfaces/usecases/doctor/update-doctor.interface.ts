export interface IUpdateDoctorUseCase {
  execute: (input: IUpdateDoctorUseCase.Input) => Promise<IUpdateDoctorUseCase.Output>
}

export namespace IUpdateDoctorUseCase {
  export type Input = {
    id: string
    name: string
    crm: string
  }

  export type Output = string
}
