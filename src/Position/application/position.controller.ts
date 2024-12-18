import { Controller, Get, Param } from '@nestjs/common';
import { PositionService } from '../interface/position.service';

@Controller('positions')
export class PositionController {
    constructor(
        private readonly positionService: PositionService
    ) { }

    @Get(':id')
    async getPosition(@Param('id') id: number) {
        return this.positionService.findPosition(id);
    }

    @Get()
    async getAllPositions() {
        return this.positionService.findAllPositions();
    }
}
