import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentalService } from '../interface/rental.service';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { CreateRentalEmployee } from '../domain/dto/create-rentalEmployee.dto';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/Auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/Auth/guards/role-auth.guard';
import { TRole } from 'src/common/types/role.type';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entity/Users.entity';
import { UserService } from 'src/user/interface/user.service';

@Controller('rental')
export class RentalController {
  constructor(
    private readonly rentalService: RentalService,
    private readonly userService: UserService
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
  @Role(TRole.Client)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAll() {
    return await this.rentalService.getAll();
  }
}
