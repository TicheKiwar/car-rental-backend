import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @IsNotEmpty()
    rentalTime?: string;

    @IsNumber()
    @IsNotEmpty()
    initialFuelLevel: number;

}
