import { CreateRentalDto } from "./dto/create-rental.dto"

export interface ReservationRepository{
    getAll()
    createRental(userID:number,createRentalDto:CreateRentalDto):Promise<boolean>
}