import { Injectable, NotFoundException } from '@nestjs/common';
import { IPositionRepository } from '../domain/position.repository';
import { Repository } from 'typeorm';
import { Positions } from 'src/entity/Positions.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PositionService implements IPositionRepository {
    constructor(
        @InjectRepository(Positions)
        private readonly positionRepository: Repository<Positions>
    ) {

    }

    async findPosition(id: number) {
        const position = await this.positionRepository.findOne({ where: { positionId: id } });
        if (!position) {
            throw new NotFoundException(`El cargo no existe`);
        }
        return position;
    }

    async findAllPositions() {
        return this.positionRepository.find()
    }
}
