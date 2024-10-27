import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { CreateEmployeeDto } from './dtos/create-employee';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post('clients')
    async createCliente(@Body() createClienteDto: CreateClientDto) {
        return this.usersService.createClient(createClienteDto);
    }

    @Post('employees')
    async createEmpleado(@Body() createEmpleadoDto: CreateEmployeeDto) {
        return this.usersService.createEmployee(createEmpleadoDto);
    }

    @Get('clients/:id')
    async getClienteById(@Param('id') id: number) {
        return this.usersService.getClientById(id);
    }

    @Get('employees/:id')
    async getEmpleadoById(@Param('id') id: number) {
        return this.usersService.getEmployeeById(id);
    }

    @Get('clients')
    async getAllClientes() {
        return this.usersService.getAllClients();
    }

    @Get('employees')
    async getAllEmpleados() {
        return this.usersService.getAllEmployees();
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
