import { CreateEmployeeDto } from "../interface/dtos/create-employee"

export interface IEmployeeRepository {
    getEmployeeById(id: number)
    getAllEmployees()
    createEmployee(dto: CreateEmployeeDto)
}