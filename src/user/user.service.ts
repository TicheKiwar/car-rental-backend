import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/entity/Clientes';
import { Empleados } from 'src/entity/Empleados';
import { Repository } from 'typeorm';

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
}
