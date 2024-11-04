import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { IClientRepository } from "../domain/client.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "src/entity/Clients.entity";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dtos/create-client.dto";
import { UserService } from "./user.service";

@Injectable()
export class ClientService implements IClientRepository {
    constructor(
        @InjectRepository(Clients)
        private readonly clientRepository: Repository<Clients>,
        private readonly userService: UserService,
    ) { }

    async getClientById(id: number) {
        const client = await this.clientRepository.findOne({ where: { clientId: id } });
        if (!client) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return client;
    }

    async getAllClients() {
        return this.clientRepository.find();
    }

    async createClient(dto: CreateClientDto) {
        const { emailExists, dniExists } = await this.userService.isEmailOrDniTaken(dto.email, dto.dni, 0);

        if (emailExists || dniExists) {
            throw new NotImplementedException('Ya existe un usuario con la C.I. o el email asociado');
        }

        const newUser = await this.userService.createUser(dto, 3);

        const client = this.clientRepository.create({
            ...dto,
            user: newUser,
        });
        return this.clientRepository.save(client);
    }
}