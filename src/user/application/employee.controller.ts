import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EmployeeService } from "../interface/employee.service";
import { CreateEmployeeDto } from "../interface/dtos/create-employee";

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    async createEmployee(@Body() createEmpleadoDto: CreateEmployeeDto) {
        return this.employeeService.createEmployee(createEmpleadoDto);
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: number) {
        return this.employeeService.getEmployeeById(id);
    }

    @Get()
    async getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }
}
