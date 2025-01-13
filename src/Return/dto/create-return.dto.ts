import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReturnDto {
  @IsInt()
  @IsNotEmpty()
  rentalId: number;

  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsDateString()
  @IsNotEmpty()
  returnDate: string;

  @IsString()
  @IsNotEmpty()
  returnTime: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNumber()
  @IsOptional()
  costPerDamages?: number;

  @IsNumber()
  @IsOptional()
  costDayDelay?: number;

  @IsNumber()
  @IsOptional()
  fuelCost?: number;

  @IsNumber()
  @IsOptional()
  finalMileage?: number;

  @IsString()
  @IsNotEmpty()
  rentalStatus: string;

  @IsNumber()
  @IsOptional()
  finalFuelLevel?: number;

  @IsString()
  @IsNotEmpty()
  vehicleStatus: string;

  //vehicle status

  @IsBoolean()
  @IsOptional()
  scratches?: boolean;

  @IsBoolean()
  @IsOptional()
  dents?: boolean;

  @IsBoolean()
  @IsOptional()
  lights?: boolean;

  @IsBoolean()
  @IsOptional()
  tires?: boolean;

  @IsBoolean()
  @IsOptional()
  windshield?: boolean;

  @IsBoolean()
  @IsOptional()
  mirrors?: boolean;

  @IsBoolean()
  @IsOptional()
  foreign_fluids?: boolean;

  @IsBoolean()
  @IsOptional()
  brakes?: boolean;

  @IsBoolean()
  @IsOptional()
  documents?: boolean;
  
}

