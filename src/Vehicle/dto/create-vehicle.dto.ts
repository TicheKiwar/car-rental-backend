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

  @IsString()
  color?: string;

  @IsString()
  transmission?: string;

  @IsDecimal()
  dailyRate?: string;

  @IsInt()
  capacity?: number;

  @IsInt()
  maxSpeed?: number;

  @IsInt()
  doorCount?: number;

  @IsString()
  fuelType?: string;

  @IsInt()
  mileage?: number;

  @IsDateString()
  lastRevisionDate?: string;

  @IsDecimal()
  costDayDelay?: string;
  
  @IsOptional()
  deletedAt?: Date;

  @IsOptional()
  @IsString()
  image?: string;
}
