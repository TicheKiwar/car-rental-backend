import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { UpdateRentalDto } from '../domain/dto/update-rental.dto';

@Injectable()
export class RentalService {
  create(createRentalDto: CreateRentalDto) {
    return 'This action adds a new rental2';
  }

  findAll() {
    return `This action returns all rental2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental2`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental2`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental2`;
  }
}
