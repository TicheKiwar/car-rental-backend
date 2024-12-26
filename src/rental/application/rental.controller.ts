import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalService } from '../interface/rental.service';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

}
