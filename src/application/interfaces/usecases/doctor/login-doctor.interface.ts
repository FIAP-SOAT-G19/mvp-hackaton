export interface ILoginDoctorUseCase {
  execute: (input: ILoginDoctorUseCase.Input) => Promise<ILoginDoctorUseCase.Output>
}

export namespace ILoginDoctorUseCase {
  export type Input = {
    crm: string
    password: string
  }

  export type Output = {
    name: string
    crm: string
    token: string
  }
}
