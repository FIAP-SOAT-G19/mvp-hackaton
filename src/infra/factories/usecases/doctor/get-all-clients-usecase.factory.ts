/* import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/doctor/get-all-clients.interface'
import { GetAllClientsUseCase } from '@/application/usecases/doctor/get-all-clients.usecase'
import { GetAllClientsByParamsGateway } from '@/infra/adapters/gateways/client/get-all-clientes-gateway'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeGetAllClientsUseCase = (): IGetAllClientsUseCase => {
  const gateway = new GetAllClientsByParamsGateway(new ClientRepository())
  return new GetAllClientsUseCase(gateway)
}
 */
