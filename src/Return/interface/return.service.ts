import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Returns } from '../../entity/Returns.entity';
import { Rentals } from '../../entity/Rentals.entity';
import { Employees } from '../../entity/Employees.entity';
import { IReturnsRepository } from '../domain/return.repository';
import { CreateReturnDto } from '../dto/create-return.dto';
import { Vehicles } from '../../entity/Vehicles.entity';
import { VehicleStatus } from 'src/entity/VehicleStatus.entity';

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
    @InjectRepository(VehicleStatus)
    private readonly vehicleStatusRepository: Repository<VehicleStatus>,
  ) { }

  async findAll() {
    // Consulta SQL personalizada
    const query = `
      SELECT 
        r.rental_id,
        r.rental_status,
        r.initial_fuel_level,
        r.rental_date,
        r.rental_days,
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
        v.motor_number,
        v.chasis_number,
        m.model_name,
        b.brand_name,
        vd.scratches,
        vd.dents,
        vd.lights,
        vd.tires,
        vd.windshield,
        vd.mirrors,
        vd.foreign_fluids,
        vd.brakes,
        vd.documents
      FROM 
        rentals r
      JOIN 
        clients c ON r.client_id = c.client_id
      JOIN 
        employees e ON r.employee_id = e.employee_id
      JOIN 
        vehicles v ON r.vehicle_id = v.vehicle_id
      JOIN
        vehicle_status vd ON r.vehicle_id = vd.vehicle_id
      JOIN 
        model m ON v.model_id = m.model_id
      JOIN 
        brand b ON m.brand_id = b.brand_id;
    `;

    // Ejecutar la consulta SQL utilizando el repositorio de Rentals
    return await this.rentalsRepository.query(query);
  }

  async findOne(id: number) {
    const query = `
      SELECT 
          ru.return_id,
          ru.cost_day_delay,
          ru.cost_per_damages,
          ru.return_date,
          ru.fuel_cost,
          ru.observations,
          r.rental_id,
          r.rental_status,
          v.vehicle_id,
          c.client_id,
          c.dni AS client_dni,
          c.first_name AS client_first_name,
          c.last_name AS client_last_name,
          c.phone AS client_phone,
          c.address AS client_address,
          v.mileage,
          v.motor_number,
          v.chasis_number,
          vd.scratches,
          vd.dents,
          vd.lights,
          vd.tires,
          vd.windshield,
          vd.mirrors,
          vd.foreign_fluids,
          vd.brakes,
          vd.documents
      FROM 
          returns ru
      JOIN
          rentals r ON ru.rental_id = r.rental_id
      JOIN 
          clients c ON r.client_id = c.client_id
      JOIN 
          vehicles v ON r.vehicle_id = v.vehicle_id
      JOIN
          vehicle_status vd ON r.vehicle_id = vd.vehicle_id  
      WHERE  
          r.rental_id = $1
    `;
  
    // Ejecutar la consulta
    const result = await this.returnsRepository.query(query, [id]);
  
    return result[0]; // Devolver el primer resultado (ya que findOne solo devuelve un resultado)
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
    rental.status = createReturnDto.rentalStatus;
    rental.finalFuelLevel = createReturnDto.finalFuelLevel ?? rental.finalFuelLevel;

    await this.rentalsRepository.save(rental);

    // **5. Actualizar el estado del vehículo**
    const vehicle = await this.vehiclesRepository.findOne({
      where: { vehicleId },
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    vehicle.status = vehicleStatus;
    vehicle.mileage = createReturnDto.finalMileage;
    await this.vehiclesRepository.save(vehicle);

     // Actualizar el estado del vehículo en vehicle_status
  const vehicleStatusRecord = await this.vehicleStatusRepository.findOne({
    where: { vehicleId },
  });

  if (!vehicleStatusRecord) {
    throw new Error('Vehicle status record not found');
  }

  // Solo actualizamos los campos que están presentes en el DTO
  vehicleStatusRecord.scratches = createReturnDto.scratches ?? vehicleStatusRecord.scratches;
  vehicleStatusRecord.dents = createReturnDto.dents ?? vehicleStatusRecord.dents;
  vehicleStatusRecord.lights = createReturnDto.lights ?? vehicleStatusRecord.lights;
  vehicleStatusRecord.tires = createReturnDto.tires ?? vehicleStatusRecord.tires;
  vehicleStatusRecord.windshield = createReturnDto.windshield ?? vehicleStatusRecord.windshield;
  vehicleStatusRecord.mirrors = createReturnDto.mirrors ?? vehicleStatusRecord.mirrors;
  vehicleStatusRecord.foreignFluids = createReturnDto.foreign_fluids ?? vehicleStatusRecord.foreignFluids;
  vehicleStatusRecord.brakes = createReturnDto.brakes ?? vehicleStatusRecord.brakes;
  vehicleStatusRecord.documents = createReturnDto.documents ?? vehicleStatusRecord.documents;

  // Guardar los cambios en vehicle_status
  await this.vehicleStatusRepository.save(vehicleStatusRecord);

    return { message: 'Return processed successfully' };
  }

}
