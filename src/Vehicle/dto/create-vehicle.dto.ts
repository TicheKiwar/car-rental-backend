import { IsInt, IsNotEmpty, IsString, IsOptional, IsDecimal, IsDateString, length, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 8, { message: 'La placa del vehículo debe seguir el formato "ABC-1234"' })
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsNotEmpty()
  modelId: number;


  @IsString()
  @IsNotEmpty()
  color?: string;

  @IsString()
  @IsNotEmpty()
  transmission?: string;

  @IsDecimal()
  @IsNotEmpty()
  dailyRate?: string;

  @IsInt()
  @IsNotEmpty()
  capacity?: number;

  @IsInt()
  @IsNotEmpty()
  maxSpeed?: number;

  @IsInt()
  @IsNotEmpty()
  doorCount?: number;

  @IsString()
  @IsNotEmpty()
  fuelType?: string;

  @IsInt()
  @IsNotEmpty()
  mileage?: number;

  @IsDateString()
  @IsNotEmpty()
  lastRevisionDate?: string;

  @IsDecimal()
  @IsNotEmpty()
  costDayDelay?: string;

  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20, { message: 'El número de motor debe tener entre 1 y 20 caracteres' })
  motorNumber?: string;

  @IsString()
  @IsNotEmpty()
  @Length(17, 17, { message: 'El número de chasis debe contener 17 caracteres' })
  chasisNumber?: string;
}
