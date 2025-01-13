import { Controller, Get, Param, Post, Patch, Body } from '@nestjs/common';
import { UpdateMaintenanceDto } from '../domain/dtos/updateMaintenance.dto';
import { MaintenanceService } from '../interface/maintenance.service';

@Controller('maintenances')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) { }

    @Get()
    async getAllMaintenances() {
        return this.maintenanceService.getMaintenances();
    }

    @Post(':vehicleId')
    async createMaintenance(@Param('vehicleId') vehicleId: number) {
        return this.maintenanceService.createMaintenance(vehicleId);
    }

    @Patch(':id')
    async updateMaintenance(
        @Param('id') maintenanceId: number,
        @Body() updateMaintenanceDto: UpdateMaintenanceDto,
    ) {
        return this.maintenanceService.updateMaintenance(maintenanceId, updateMaintenanceDto);
    }
}
