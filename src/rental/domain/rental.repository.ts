import { CheckCar } from "./dto/CheckCar.dto"

export interface ReservationRepository{
    getAll()
    checkCar(rentalID:number,checkCar:CheckCar)
}