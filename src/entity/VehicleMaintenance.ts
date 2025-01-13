import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { VehicleStatus } from './VehicleStatus.entity';

@Entity('vehicle_maintenance')
export class VehicleMaintenance {
    @PrimaryGeneratedColumn({ name: 'maintenanceid' })
    maintenanceId: number;

    @Column({ name: 'vehicleid' })
    vehicleId: number;

    @Column({ name: 'description', type: 'text', nullable: true })
    description: string;

    @Column({ name: 'status', type: 'varchar', length: 15, default: 'Pendiente' })
    status: string;

    @CreateDateColumn({ name: 'createdate' })
    createDate: Date;

    @UpdateDateColumn({ name: 'updatedate', nullable: true })
    updateDate: Date;

    @ManyToOne(() => VehicleStatus, (vehicle) => vehicle.maintenances)
    @JoinColumn({ name: 'vehicleid', referencedColumnName: "vehicleId" })
    vehicle: VehicleStatus;
}
