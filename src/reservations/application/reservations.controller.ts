import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { ReservationsService } from '../interface/reservations.service';
import { TRole } from 'src/common/types/role.type';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/Auth/guards/role-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entity/Users.entity';
import { JwtAuthGuard } from 'src/Auth/guards/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
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
    return await this.reservationsService.getAllByUser(user.userId)
  }

  @Get("Verify/:reservationID")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard,RoleGuard)
  async verifyReservation(@Param('reservationID', ParseIntPipe) reservationId: number) {
    return await this.reservationsService.verifyReservation(reservationId) 
  }

  @Post("Client")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard,RoleGuard)
  async createReservation(@User() user: Users,@Body()createreservationDto: CreateReservationDto,): Promise<boolean> {
    return this.reservationsService.createReservation(user.userId,createreservationDto)
  }

  @Delete(":reservationID")
  async deleteReservation( @Param('reservationID', ParseIntPipe) reservationId: number): Promise<boolean> {
    return await this.reservationsService.deleteReservation(reservationId)
  }

  @Patch(":reservationID")
  async editReservation(
   @Param('reservationID', ParseIntPipe) reservationId: number,
   @Body() updateReservationDto: UpdateReservationDto
  ): Promise<boolean> {
    return this.reservationsService.editReservation(reservationId,updateReservationDto)
  }
}
