import {  IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateReservationDto {
    @IsString()
    @IsOptional()
    reservationDate: string;
    @IsOptional()
    @IsNumber()
    reservationDays?: number;
    @IsString()
    @IsOptional()
    totalCost?: string;
  }
  