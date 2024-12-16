import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ClientService } from "../interface/client.service";
import { CreateClientDto } from "../interface/dtos/create-client.dto";
import { UpdateClientDto } from "../interface/dtos/update-client.dto";

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

    @Put(':id')
    async updateClient(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateClientDto,
    ) {
        return await this.clientService.updateClient(id, dto);
    }

    @Delete(':id')
    async deleteClient(@Param('id', ParseIntPipe) id: number) {
        return await this.clientService.deleteClient(id);
    }
}
