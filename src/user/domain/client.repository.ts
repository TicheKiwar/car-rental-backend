import { CreateClientDto } from "../interface/dtos/create-client.dto"

export interface IClientRepository {
    getClientById(id: number)
    getAllClients()
    createClient(dto: CreateClientDto)
}