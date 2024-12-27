import { CreateRentalDto } from "./dto/create-rental.dto"
import { CreateRentalEmployee } from "./dto/create-rentalEmployee.dto"
import { UpdateRentalDto } from "./dto/update-rental.dto"
import { UpdateRentalEmployee } from "./dto/update-rentalEmployee.dto"

export interface RentalRepository{
    getAll()
    getAllByClient(clientID:number)
    getAllByEmployee(employeeID:number)
    createRental(clientID:number,rental:CreateRentalDto)
    createRentalEmployee(employeeID:number,rental:CreateRentalEmployee)
    deleteRental(clientID:number,rentalID:number)
    deleteRentalEmployee(rentalID:number)
    updateRental(clientID:number,rentalID:number,rental:UpdateRentalDto)
    updateRentalEmployee(clientID:number,rentalID:number,rental:UpdateRentalEmployee)
}