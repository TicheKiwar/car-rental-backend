import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/entity/Clientes';
import { Empleados } from 'src/entity/Empleados';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Clientes)
        private readonly clientsRepository: Repository<Clientes>,
        @InjectRepository(Empleados)
        private readonly employeesRepository: Repository<Empleados>,
    ) { }
}
