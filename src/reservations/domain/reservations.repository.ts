import { Reservations } from "src/entity/Reservations.entity";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";

export interface ReservationRepository{
    getAll(userID:number):Promise<[Reservations]>
    createReservation(createreservationDto:CreateReservationDto):Promise<boolean>
    deleteReservation(reservationId:number):Promise<boolean>
    editReservation(updateReservationDto:UpdateReservationDto):Promise<boolean>
}