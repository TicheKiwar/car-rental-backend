import { UpdateMaintenanceDto } from "./dtos/updateMaintenance.dto";

export interface IMaintenanceRepository {
    getMaintenances();
    getMaintenanceById(id: number);
    createMaintenance(vehicleId: number);
    updateMaintenance(
        maintenanceId: number,
        dto: UpdateMaintenanceDto,
    )
}  