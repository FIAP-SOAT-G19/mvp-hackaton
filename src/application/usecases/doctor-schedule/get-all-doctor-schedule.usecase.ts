import { GetDoctorSchedule, IDoctorScheduleRepository } from '@/application/interfaces/repositories/doctor-schedule.interface'
import { IGetAllDoctorScheduleUseCase } from '@/application/interfaces/usecases/doctor-schedule/get-all-doctor-schedule.interface'

export class GetAllDoctorScheduleUseCase implements IGetAllDoctorScheduleUseCase {
  constructor(
    private readonly doctorScheduleRepository: IDoctorScheduleRepository

  ) { }

  async execute(input: IGetAllDoctorScheduleUseCase.Input): Promise<IGetAllDoctorScheduleUseCase.Output[]> {
    const queryOptions = this.makeQueryOptions(input)
    let schedules: GetDoctorSchedule[] = []

    schedules = queryOptions.crm
      ? await this.doctorScheduleRepository.getByCrm(queryOptions.crm) ?? []
      : await this.doctorScheduleRepository.getAll() ?? []

    return await this.filterSchedules(schedules)
  }

  private makeQueryOptions(input: IGetAllDoctorScheduleUseCase.Input): { crm?: string } {
    const options: { crm?: string } = {}

    if (input.crm) {
      options.crm = input.crm
    }

    return options
  }

  private async filterSchedules(schedules: GetDoctorSchedule[]): Promise<IGetAllDoctorScheduleUseCase.Output[]> {
    const today = new Date()
    return schedules.filter(schedule => new Date(schedule.startDate) >= today)
  }
}
