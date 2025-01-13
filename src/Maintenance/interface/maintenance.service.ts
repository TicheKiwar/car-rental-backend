import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleStatus } from 'src/entity/VehicleStatus.entity';
import { Repository } from 'typeorm';
import { IMaintenanceRepository } from '../domain/maintenance.repository';
import { VehicleMaintenance } from 'src/entity/VehicleMaintenance';
import { UpdateMaintenanceDto } from '../domain/dtos/updateMaintenance.dto';
import { Vehicles } from 'src/entity/Vehicles.entity';

@Injectable()
export class MaintenanceService implements IMaintenanceRepository {
    constructor(
        @InjectRepository(VehicleMaintenance)
        private readonly maintenanceRepository: Repository<VehicleMaintenance>,
        @InjectRepository(VehicleStatus)
        private readonly vehicleStatusRepository: Repository<VehicleStatus>,
        @InjectRepository(Vehicles)
        private readonly vehicleRepository: Repository<Vehicles>
    ) { }

    async getMaintenances() {
        return await this.maintenanceRepository.find({
            relations: ['vehicle', 'vehicle.vehicle', 'vehicle.vehicle.model', "vehicle.vehicle.model.brand"],
            order: { createDate: 'ASC' }
        });
    }

    async getMaintenanceById(id: number) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: { maintenanceId: id },
            relations: ['vehicle', 'vehicle.vehicle', 'vehicle.vehicle.model', "vehicle.vehicle.model.brand"],
        });
        if (!maintenance) {
            throw new NotFoundException(`No se ha podido encontrar el mantenimiento`);
        }
        return maintenance;
    }

    async createMaintenance(vehicleId: number): Promise<string> {
        const vehicleStatus = await this.vehicleStatusRepository.findOne({ where: { vehicleId } });

        if (!vehicleStatus) {
            throw new NotFoundException(`No se encontró el vehiculo`);
        }

        const issues = [];
        Object.keys(vehicleStatus).forEach((key) => {
            if (key !== 'vehicleId' && vehicleStatus[key] === false) {
                issues.push(key);
            }
        });

        if (issues.length > 0) {
            const newMaintenance = this.maintenanceRepository.create({
                vehicleId,
                createDate: new Date(),
            });

            await this.maintenanceRepository.save(newMaintenance);
            return `Se creó un mantenimiento para el vehículo con los siguientes problemas: ${issues.join(', ')}`;
        }

        return 'El vehículo está en buen estado. No se necesita mantenimiento.';
    }


    async updateMaintenance(
        maintenanceId: number,
        dto: UpdateMaintenanceDto,
    ): Promise<string> {
        const maintenance = await this.getMaintenanceById(maintenanceId);

        if (!maintenance) {
            throw new NotFoundException(`No se encontró el mantenimiento`);
        }

        maintenance.description = maintenance.description
            ? `${maintenance.description}\n${dto.description}`
            : dto.description;
        maintenance.updateDate = new Date();

        const vehicleStatus = await this.vehicleStatusRepository.findOne({ where: { vehicleId: maintenance.vehicleId } });

        if (!vehicleStatus) {
            throw new NotFoundException(`No se encontró el vehículo`);
        }

        const updatedFields: string[] = [];
        Object.keys(dto).forEach((key) => {
            if (key !== 'vehicleId' && key in vehicleStatus && vehicleStatus[key] === false && dto[key] === true) {
                vehicleStatus[key] = true;
                updatedFields.push(key);
            }
        });

        await this.vehicleStatusRepository.save(vehicleStatus);

        const allFieldsTrue = Object.keys(vehicleStatus).every(
            (key) => key === 'vehicleId' || vehicleStatus[key] === true,
        );

        if (allFieldsTrue) {
            maintenance.status = 'Completado';
            const reparedVehicle = await this.vehicleRepository.findOne({ where: { vehicleId: maintenance.vehicleId } })
            reparedVehicle.status = "Disponible"
            await this.vehicleRepository.save(reparedVehicle)
        } else {
            maintenance.status = 'En Progreso'
        }

        await this.maintenanceRepository.save(maintenance);
        return `Mantenimiento actualizado con éxito`;
    }

}
