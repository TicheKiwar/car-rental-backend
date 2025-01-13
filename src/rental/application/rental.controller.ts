import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RentalService } from '../interface/rental.service';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { CreateRentalEmployee } from '../domain/dto/create-rentalEmployee.dto';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/Auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/Auth/guards/role-auth.guard';
import { TRole } from 'src/common/types/role.type';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entity/Users.entity';
import { UpdateRentalEmployee } from '../domain/dto/update-rentalEmployee.dto';
import { UpdateRentalDto } from '../domain/dto/update-rental.dto';
import { verify } from '../domain/dto/verifi.dto';

@Controller('rental')
export class RentalController {
  constructor(
    private readonly rentalService: RentalService,
  ) { }

  @Post("client")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createRental(
    @User() user: Users,
    @Body() rental: CreateRentalDto
  ) {
    return await this.rentalService.createRental(user.clients.clientId, rental);
  }
  @Post("employee")
  @Role(TRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createRentalEmployee(
    @User() user: Users,
    @Body() rental: CreateRentalEmployee) {
    return await this.rentalService.createRentalEmployee(user.employees.employeeId, rental);
  }

  @Get("client")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAllByClient(
    @User() user: Users,) {
    return await this.rentalService.getAllByClient(user.clients.clientId);
  }

  @Get("employee")
  @Role(TRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAllByEmployee(
    @User() user: Users,
  ) {
    return await this.rentalService.getAllByEmployee(user.employees.employeeId);
  }

  @Get("")
  @Role(TRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAll() {
    return await this.rentalService.getAll();
  }

  @Delete("employee/:rentalID")
  @Role(TRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async cancelRentalEmployee(
    @Param("rentalID",ParseIntPipe ) rentalID: number
  ) {
    return await this.rentalService.deleteRentalEmployee(rentalID);
  }

  @Delete("client/:rentalID")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async cancelRental(
    @User() user: Users,
    @Param("rentalID",ParseIntPipe ) rentalID: number
  ) {
    return await this.rentalService.deleteRental(user.clients.clientId,rentalID);
  }

  @Patch("employee/:rentalID")
  @Role(TRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateRentalEmployee(
    @User() user: Users,
    @Param("rentalID",ParseIntPipe ) rentalID: number,
    @Body() rental: UpdateRentalEmployee
  ){
    return await this.rentalService.updateRentalEmployee(user.employees.employeeId,rentalID,rental);
  }

  @Patch("mark/:rentalID")
  @Role(TRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async markCar(
    @User() user: Users,
    @Param("rentalID",ParseIntPipe ) rentalID: number,
    @Body() rental: UpdateRentalEmployee
  ){
    console.log(user.employees.employeeId,rentalID,rental)
    return await this.rentalService.markCar(user.employees.employeeId,rentalID,rental);
  }

  @Patch("client/:rentalID")
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateRental(
    @User() user: Users,
    @Param("rentalID",ParseIntPipe ) rentalID: number,
    @Body() rental: UpdateRentalDto
  ){
    return await this.rentalService.updateRental(user.clients.clientId,rentalID,rental);
  }

  @Post("verify")
  async getVerify(
    @Body() date: verify
  ) {
    const verifyHour = await this.rentalService.canEditRental(date.createdAt);
    const verifyDate = await this.rentalService.canEditDate(date.rentalDate);
    const verifyMark = await this.rentalService.canMarkDate(date.rentalDate);
    return { verifyHour, verifyDate, verifyMark };
  }

}
