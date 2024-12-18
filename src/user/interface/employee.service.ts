import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { IEmployeeRepository } from "../domain/employee.repository";
import { Employees } from "src/entity/Employees.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEmployeeDto } from "./dtos/create-employee";
import { UserService } from "./user.service";
import { PositionService } from "src/position/interface/position.service";
import { UpdateEmployeeDto } from "./dtos/update-employee.dto";

@Injectable()
export class EmployeeService implements IEmployeeRepository {
    constructor(
        @InjectRepository(Employees)
        private readonly employeeRepository: Repository<Employees>,
        private readonly positionService: PositionService,
        private readonly userService: UserService,
    ) { }

    async getEmployeeById(id: number) {
        const client = await this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.user', 'user')
            .leftJoinAndSelect('employee.position', 'position')
            .where('employee.employeeId = :id', { id })
            .andWhere('user.deleteDate IS NULL')
            .addSelect('user.password')
            .getOne();

        if (!client) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return client;
    }

    async getAllEmployees() {
        return await this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.user', 'user')
            .leftJoinAndSelect('employee.position', 'position')
            .where('user.deleteDate IS NULL')
            .addSelect('user.password')
            .orderBy("employee.employeeId")
            .getMany();
    }

    async createEmployee(dto: CreateEmployeeDto) {
        const { emailExists, dniExists } = await this.userService.isEmailOrDniTaken(dto.email, dto.dni, 0);

        if (emailExists || dniExists) {
            throw new NotImplementedException('Ya existe un usuario con la C.I. o el email asociado');
        }

        const newUser = await this.userService.createUser(dto, 2);

        const client = this.employeeRepository.create({
            ...dto,
            position: await this.positionService.findPosition(dto.position),
            user: newUser,
        });
        return this.employeeRepository.save(client);
    }

    async updateEmployee(id: number, dto: UpdateEmployeeDto) {
        const employee = await this.getEmployeeById(id);

        const { emailExists, dniExists } = await this.userService.isEmailOrDniTaken(dto.email, dto.dni, employee.userId);

        if (emailExists || dniExists) {
            throw new NotImplementedException('Ya existe un usuario con la C.I. o el email asociado');
        }

        Object.assign(employee, dto);

        if (dto.email) {
            employee.user.email = dto.email;
        }

        await this.employeeRepository.save(employee);
        return employee;
    }

    async deleteEmployee(id: number) {
        const employee = await this.getEmployeeById(id);

        employee.user.deleteDate = new Date();

        await this.employeeRepository.save(employee);
        return { message: `Empleado con ID ${id} eliminado correctamente` };
    }
}