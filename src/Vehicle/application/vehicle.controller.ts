import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  ParseIntPipe, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { VehiclesService } from '../interface/vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Get()
  async findAll() {
    return await this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.vehiclesService.findOne(id);
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.vehiclesService.remove(id);
  }

  @Post('validate-numbers/:id')
  async validateMotorAndChasis(@Param('id') id: number, @Body() body: { motor: string; chasis: string }) {
    const { motor, chasis } = body;
    const validationResult = await this.vehiclesService.isMotorOrChasisInUse(motor, chasis, id);
    return validationResult;
  }

  @Post('validate-plate/:id')
  async validatePlate(@Param('id') id: number, @Body() body: { plate: string }) {
    const { plate } = body;
    const validationResult = await this.vehiclesService.findOneByLicensePlate(plate, id);
    return validationResult;

  }
}
