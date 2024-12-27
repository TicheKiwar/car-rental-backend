import { CreateRentalDto } from "./dto/create-rental.dto"

export interface RentalRepository{
    getAll()
    getAllByClient(clientID:number)
    getAllByEmployee(employeeID:number)
    createRental(clientID:number,rental:CreateRentalDto)
    createRentalEmployee(employeeID:number,rental:CreateRentalDto)
}