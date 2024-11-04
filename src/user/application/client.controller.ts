import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ClientService } from "../interface/client.service";
import { CreateClientDto } from "../interface/dtos/create-client.dto";

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    async createClient(@Body() createClienteDto: CreateClientDto) {
        return this.clientService.createClient(createClienteDto);
    }

    @Get(':id')
    async getClientById(@Param('id') id: number) {
        return this.clientService.getClientById(id);
    }

    @Get()
    async getAllClients() {
        return this.clientService.getAllClients();
    }
}
