import { PartialType } from "@nestjs/mapped-types";
import { CreateRentalEmployee } from "./create-rentalEmployee.dto";

export class UpdateRentalEmployee extends PartialType(CreateRentalEmployee){}


