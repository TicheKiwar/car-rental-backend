import { Module } from '@nestjs/common';
import { PositionController } from './application/position.controller';
import { PositionService } from './interface/position.service';
import { Positions } from 'src/entity/Positions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Positions]),],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService]
})
export class PositionModule { }
