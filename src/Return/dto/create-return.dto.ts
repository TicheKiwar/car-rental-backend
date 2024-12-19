import {
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

  @IsNumber()
  @IsOptional()
  totalDays?: number;

  @IsString()
  @IsNotEmpty()
  rentalStatus: string;

  @IsNumber()
  @IsOptional()
  finalFuelLevel?: number;

  @IsString()
  @IsOptional()
  finalStatus?: string;

  @IsString()
  @IsNotEmpty()
  vehicleStatus: string;
}
