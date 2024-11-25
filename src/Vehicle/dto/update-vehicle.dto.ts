import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;

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
}
