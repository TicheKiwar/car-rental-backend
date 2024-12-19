import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Returns } from '../../entity/Returns.entity';
import { Rentals } from '../../entity/Rentals.entity';
import { Employees } from '../../entity/Employees.entity';
import { IReturnsRepository } from '../domain/return.repository';
import { CreateReturnDto } from '../dto/create-return.dto';
import { Vehicles } from '../../entity/Vehicles.entity';

@Injectable()
export class ReturnsService implements IReturnsRepository {
  constructor(
    @InjectRepository(Returns)
    private readonly returnsRepository: Repository<Returns>,
    @InjectRepository(Rentals)
    private readonly rentalsRepository: Repository<Rentals>,
    @InjectRepository(Employees)
    private readonly employeesRepository: Repository<Employees>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
  ) { }

  async findAll() {
    // Consulta SQL personalizada
    const query = `
      SELECT 
        r.rental_id,
        r.rental_status,
        r.inital_fuel_level,
        res.reservation_id,
        res.reservation_date,
        res.reservation_days,
        v.vehicle_id,
        c.client_id,
        c.dni AS client_dni,
        c.first_name AS client_first_name,
        c.last_name AS client_last_name,
        c.phone AS client_phone,
        c.address AS client_address,
        e.employee_id AS employe_rental_id,
        e.dni AS employee_dni,
        e.first_name AS employee_first_name,
        e.last_name AS employee_last_name,
        e.phone AS employee_phone,
        v.model_id,
        v.license_plate,
        v.daily_rate,
        v.color,
        v.status,
        v.image,
        v.cost_day_delay,
        v.mileage,
        m.model_name,
        b.brand_name
      FROM 
        rentals r
      JOIN 
        reservations res ON r.reservation_id = res.reservation_id
      JOIN 
        clients c ON res.client_id = c.client_id
      JOIN 
        employees e ON r.employee_id = e.employee_id
      JOIN 
        vehicles v ON res.vehicle_id = v.vehicle_id
      JOIN 
        model m ON v.model_id = m.model_id
      JOIN 
        brand b ON m.brand_id = b.brand_id;
    `;

    // Ejecutar la consulta SQL utilizando el repositorio de Rentals
    return await this.rentalsRepository.query(query);
  }

  async findOne(id: number) {
    return await this.returnsRepository.findOne({
      where: { returnId: id },
      relations: ['rental', 'employee'],
    });
  }

  async create(createReturnDto: CreateReturnDto) {
    const { rentalId, employeeId, vehicleId, vehicleStatus, ...returnFields } = createReturnDto;

    const rental = await this.rentalsRepository.findOne({
      where: { rentalId },
    });
  
    if (!rental) {
      throw new Error('Rental not found');
    }
  
    // **2. Buscar la entidad `employee`**
    const employee = await this.employeesRepository.findOne({
      where: { employeeId },
    });
  
    if (!employee) {
      throw new Error('Employee not found');
    }
  
    // **3. Insertar en la tabla `returns`**
    const returnRecord = this.returnsRepository.create({
      ...returnFields,
      rental,
      employee,
    });
    await this.returnsRepository.save(returnRecord);
  
    // **4. Actualizar la tabla `rental`**
    rental.finalMileage = createReturnDto.finalMileage ?? rental.finalMileage;
    rental.totalDays = createReturnDto.totalDays ?? rental.totalDays;
    rental.status = createReturnDto.rentalStatus;
    rental.finalFuelLevel = createReturnDto.finalFuelLevel ?? rental.finalFuelLevel;
    rental.finalStatus = createReturnDto.finalStatus ?? rental.finalStatus;
    
    await this.rentalsRepository.save(rental);
  
    // **5. Actualizar el estado del vehículo**
    const vehicle = await this.vehiclesRepository.findOne({
      where: { vehicleId },
    });
  
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
  
    vehicle.status = vehicleStatus;
    await this.vehiclesRepository.save(vehicle);
  
    return { message: 'Return processed successfully' };
  }
  
}
