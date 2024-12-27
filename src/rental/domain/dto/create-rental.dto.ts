import { IsDateString, IsNotEmpty, IsNumber,} from "class-validator";

export class CreateRentalDto {
    @IsNumber()
    @IsNotEmpty()
    vehicleId: number;

    @IsDateString()
    @IsNotEmpty()
    rentalDate: Date;

    @IsNumber()
    @IsNotEmpty()
    rentalDays: number;

}
