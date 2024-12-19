import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  modelId?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  transmission?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  dailyRate?: string;

  @IsOptional()
  @IsInt()
  capacity?: number;

  @IsOptional()
  @IsInt()
  maxSpeed?: number;

  @IsOptional()
  @IsInt()
  doorCount?: number;

  @IsOptional()
  @IsString()
  fuelType?: string;

  @IsOptional()
  @IsInt()
  mileage?: number;

  @IsOptional()
  @IsString()
  lastRevisionDate?: string;

  @IsOptional()
  @IsString()
  costDayDelay?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20, { message: 'El número de motor debe tener entre 1 y 20 caracteres' })
  motorNumber?: string;

  @IsOptional()
  @IsString()
  @Length(17, 17, { message: 'El número de chasis debe contener 17 caracteres' })
  chasisNumber?: string;
}
