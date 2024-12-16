import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { IClientRepository } from "../domain/client.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "src/entity/Clients.entity";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dtos/create-client.dto";
import { UserService } from "./user.service";
import { UpdateClientDto } from "./dtos/update-client.dto";

@Injectable()
export class ClientService implements IClientRepository {
    constructor(
        @InjectRepository(Clients)
        private readonly clientRepository: Repository<Clients>,
        private readonly userService: UserService,
    ) { }

    async getClientById(id: number) {
        const client = await this.clientRepository
            .createQueryBuilder('client')
            .leftJoinAndSelect('client.user', 'user')
            .where('client.clientId = :id', { id })
            .andWhere('user.deleteDate IS NULL')
            .addSelect('user.password')
            .getOne();

        if (!client) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return client;
    }

    async getAllClients() {
        return await this.clientRepository
            .createQueryBuilder('client')
            .leftJoinAndSelect('client.user', 'user')
            .where('user.deleteDate IS NULL')
            .addSelect('user.password')
            .orderBy("client.clientId")
            .getMany();
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

    async updateClient(id: number, dto: UpdateClientDto) {
        const client = await this.getClientById(id);

        const { emailExists, dniExists } = await this.userService.isEmailOrDniTaken(dto.email, dto.dni, client.userId);

        if (emailExists || dniExists) {
            throw new NotImplementedException('Ya existe un usuario con la C.I. o el email asociado');
        }

        Object.assign(client, dto);

        if (dto.email) {
            client.user.email = dto.email;
            this.userService.saveUser(client.user)
        }

        await this.clientRepository.save(client);
        return client;
    }

    async deleteClient(id: number) {
        const client = await this.getClientById(id);

        client.user.deleteDate = new Date();
        this.userService.saveUser(client.user)
        return { message: `Cliente con ID ${id} eliminado correctamente` };
    }
}