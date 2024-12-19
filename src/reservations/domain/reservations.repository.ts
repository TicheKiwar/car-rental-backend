import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";

export interface ReservationRepository{
    getAll()
    getAllByUser(userID:number)
    createReservation(userID:number,createreservationDto:CreateReservationDto):Promise<boolean>
    deleteReservation(reservationId:number):Promise<boolean>
    editReservation(reservationId:number,updateReservationDto:UpdateReservationDto):Promise<boolean>
}