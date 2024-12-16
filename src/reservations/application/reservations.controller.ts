import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { ReservationsService } from '../interface/reservations.service';
import { TRole } from 'src/common/types/role.type';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/Auth/guards/role-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entity/Users.entity';
import { UserService } from 'src/user/interface/user.service';
import { JwtAuthGuard } from 'src/Auth/guards/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly userService: UserService
  ) {}

  @Get("Employee")
  @Role(TRole.EMPLOYEE)
  @UseGuards(UseGuards,RoleGuard)
  async getAll(){
    return await this.reservationsService.getAll()
  }

  @Get("Client")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard,RoleGuard)
  async getAllByUser(@User() user: Users ) {
    return this.reservationsService.getAllByUser(user.userId)

     
  }
  @Post("")
  async createReservation(@Body()createreservationDto: CreateReservationDto): Promise<boolean> {
    return this.reservationsService.createReservation(createreservationDto)
  }
  @Delete(":id")
  async deleteReservation( @Param('id', ParseIntPipe) reservationId: number): Promise<boolean> {
    return this.reservationsService.deleteReservation(reservationId)
  }
  @Patch(":id")
  async editReservation(
   @Param('id', ParseIntPipe) reservationId: number,
   @Body() updateReservationDto: UpdateReservationDto
  ): Promise<boolean> {
    return this.editReservation(reservationId,updateReservationDto)
  }
}
