export interface IGetAllDoctorsUseCase {
  execute: () => Promise<IGetAllDoctorsUseCase.Output[] | null>
}

export namespace IGetAllDoctorsUseCase {
  export type Output = {
    id: string
    name: string
    crm: string
  }
}
