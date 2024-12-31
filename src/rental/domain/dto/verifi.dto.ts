import { IsDateString } from "class-validator";

export class verify{
    @IsDateString()
    createdAt: Date;
    @IsDateString()
    rentalDate: Date;
}