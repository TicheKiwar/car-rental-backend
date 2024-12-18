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
  
    @IsDateString()
    @IsNotEmpty()
    returnDate: string;
  
    @IsString()
    @IsNotEmpty()
    returnTime: string;
  
    @IsNumber()
    @IsOptional()
    fuelLevel?: number;
  
    @IsString()
    @IsNotEmpty()
    vehicleCondition: string;
  
    @IsString()
    @IsOptional()
    additionalDamages?: string;
  
    @IsInt()
    @IsOptional()
    delayDays?: number;
  
    @IsNumber()
    @IsOptional()
    delayCost?: number;
  
    @IsString()
    @IsOptional()
    observations?: string;
  }
  