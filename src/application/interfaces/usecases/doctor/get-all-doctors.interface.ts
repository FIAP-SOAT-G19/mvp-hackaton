export interface IGetAllDoctorssUseCase {
  execute: () => Promise<IGetAllDoctorssUseCase.Output[] | null>
}

export namespace IGetAllDoctorssUseCase {
  export type Output = {
    id: string
    name: string
    crm: string
  }
}
