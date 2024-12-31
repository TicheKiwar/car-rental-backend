import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentDto {

    @IsNumber()
    @IsNotEmpty()
    rentalId: number;

    @IsString()
    @IsNotEmpty()
    paymentType: string; // 'DEPOSIT', 'RENTAL', 'DAMAGE', 'DELAY', 'FUEL'

    @IsNumber()
    @IsNotEmpty()
    paymentMethodId: number;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}