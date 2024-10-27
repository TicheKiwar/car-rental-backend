import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/entity/Clientes';
import { Empleados } from 'src/entity/Empleados';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dtos/create-client.dto';
import { CreateEmployeeDto } from './dtos/create-employee';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Clientes)
        private readonly clientsRepository: Repository<Clientes>,
        @InjectRepository(Empleados)
        private readonly employeesRepository: Repository<Empleados>,
    ) { }

    async getAllUsers() {
        const clients = await this.getAllClients();
        const employees = await this.getAllEmployees();
        return { clients, employees };
    }

    async getClientById(id: number) {
        const client = await this.clientsRepository.findOne({ where: { idCliente: id } });
        if (!client) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return client;
    }

    async getEmployeeById(id: number) {
        const employee = await this.employeesRepository.findOne({ where: { idEmpleado: id } });
        if (!employee) {
            throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
        }
        return employee;
    }

    async getAllClients() {
        return this.clientsRepository.find();
    }

    async getAllEmployees() {
        return this.employeesRepository.find();
    }

    async emailExists(email: string): Promise<boolean> {
        const existingClient = await this.clientsRepository.findOne({
            where: { correo: email },
        });

        const existingEmployee = await this.employeesRepository.findOne({
            where: { correo: email },
        });

        return !!existingClient || !!existingEmployee;
    }

    async createClient(dto: CreateClientDto) {
        const emailExists = await this.emailExists(dto.correo);
        if (emailExists) {
            throw new ConflictException('Ya existe un cliente o empleado con este correo electrónico.');
        }

        const client = this.clientsRepository.create(dto);
        return this.clientsRepository.save(client);
    }

    async createEmployee(dto: CreateEmployeeDto) {
        const emailExists = await this.emailExists(dto.correo);
        if (emailExists) {
            throw new ConflictException('Ya existe un cliente o empleado con este correo electrónico.');
        }

        const employee = this.employeesRepository.create(dto);
        return this.employeesRepository.save(employee);
    }
}
