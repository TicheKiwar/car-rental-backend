import { IsInt, IsNotEmpty, IsString, IsOptional, IsDecimal, IsDateString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsInt()
  @IsNotEmpty()
  modelId: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  transmission?: string;

  @IsOptional()
  @IsDecimal()
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
  @IsDateString()
  lastRevisionDate?: string;

  @IsOptional()
  @IsDateString()
  registrationDate?: string;

  @IsOptional()
  @IsDecimal()
  costDayDelay?: string;

  @IsOptional()
  deletedAt?: Date;
}
