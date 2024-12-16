import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { EmployeeService } from "../interface/employee.service";
import { CreateEmployeeDto } from "../interface/dtos/create-employee";
import { UpdateEmployeeDto } from "../interface/dtos/update-employee.dto";

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

    @Put(':id')
    async updateClient(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateEmployeeDto,
    ) {
        return await this.employeeService.updateEmployee(id, dto);
    }

    @Delete(':id')
    async deleteClient(@Param('id', ParseIntPipe) id: number) {
        return await this.employeeService.deleteEmployee(id);
    }
}
