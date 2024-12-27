import { IsDateString, IsNotEmpty, IsNumber,} from "class-validator";

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

}
