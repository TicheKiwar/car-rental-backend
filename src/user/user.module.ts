import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from 'src/entity/Clientes.entity';
import { Empleados } from 'src/entity/Empleados.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Clientes, Empleados]),],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
