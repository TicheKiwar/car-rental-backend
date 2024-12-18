import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ReturnsService } from '../interface/return.service';
  import { CreateReturnDto } from '../dto/create-return.dto';
  
  @Controller('returns')
  export class ReturnsController {
    constructor(private readonly returnsService: ReturnsService) {}
  
    @Get()
    async findAll() {
      return await this.returnsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.returnsService.findOne(id);
    }
  
    @Post()
    async create(@Body() createReturnDto: CreateReturnDto) {
      return await this.returnsService.create(createReturnDto);
    }
  }
  