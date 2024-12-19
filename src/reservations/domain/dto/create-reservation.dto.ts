import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  reservationDate: string;
  @IsInt()
  @IsNotEmpty()
  reservationDays: number;

  @IsString()
  @IsNotEmpty()
  totalCost: string;
  @IsInt()
  @IsNotEmpty()
  vehicleId: number;
}
