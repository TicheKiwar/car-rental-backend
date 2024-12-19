import { Module } from '@nestjs/common';
import { UserService } from './interface/user.service';
import { UserController } from './application/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from 'src/entity/Employees.entity';
import { Clients } from 'src/entity/Clients.entity';
import { Users } from 'src/entity/Users.entity';
import { ClientService } from './interface/client.service';
import { EmployeeService } from './interface/employee.service';
import { ClientController } from './application/client.controller';
import { EmployeeController } from './application/employee.controller';
import { MailerService } from './interface/mailer.service';
import { PositionModule } from 'src/Position/position.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Clients, Employees]), PositionModule],
  providers: [UserService, ClientService, EmployeeService, MailerService],
  controllers: [UserController, ClientController, EmployeeController],
  exports: [UserService, MailerService]
})
export class UserModule { }
