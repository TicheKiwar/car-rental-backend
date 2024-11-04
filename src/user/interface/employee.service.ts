import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { IEmployeeRepository } from "../domain/employee.repository";
import { Employees } from "src/entity/Employees.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEmployeeDto } from "./dtos/create-employee";
import { UserService } from "./user.service";

@Injectable()
export class EmployeeService implements IEmployeeRepository {
    constructor(
        @InjectRepository(Employees)
        private readonly employeeRepository: Repository<Employees>,
        private readonly userService: UserService,
    ) { }

    async getEmployeeById(id: number) {
        const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
        if (!employee) {
            throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
        }
        return employee;
    }

    async getAllEmployees() {
        return this.employeeRepository.find();
    }

    async createEmployee(dto: CreateEmployeeDto) {
        const { emailExists, dniExists } = await this.userService.isEmailOrDniTaken(dto.email, dto.dni, 0);

        if (emailExists || dniExists) {
            throw new NotImplementedException('Ya existe un usuario con la C.I. o el email asociado');
        }

        const newUser = await this.userService.createUser(dto, 2);

        const employee = this.employeeRepository.create({
            ...dto,
            position: { positionId: dto.position },
            user: newUser,
        });
        return this.employeeRepository.save(employee);
    }
}