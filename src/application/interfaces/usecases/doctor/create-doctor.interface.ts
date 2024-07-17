export interface ICreateDoctorUseCase {
  execute: (input: ICreateDoctorUseCase.Input) => Promise<ICreateDoctorUseCase.Output>
}

export namespace ICreateDoctorUseCase {
  export type Input = {
    name: string
    crm: string
    password: string
    repeatPassword: string
  }
  export type Output = string
}
