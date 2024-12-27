import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRentalDto {
    @IsNumber()
    @IsNotEmpty()
    vehicleId: number;

    @IsDateString()
    @IsNotEmpty()
    rentalDate: string;

    @IsNumber()
    @IsNotEmpty()
    rentalDays: number;

    @IsString()
    @IsOptional()
    rentalTime?: string;

    @IsNumber()
    @IsNotEmpty()
    initialFuelLevel: number;

}
