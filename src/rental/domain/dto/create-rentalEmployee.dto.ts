import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateRentalDto } from "./create-rental.dto";

export class CreateRentalEmployee extends CreateRentalDto {
    @IsNumber()
    @IsNotEmpty()
    ClientID?: number;
    
    @IsNumber()
    @IsNotEmpty()
    initialFuelLevel: number;
}