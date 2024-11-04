import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/user.repository';
import { Users } from 'src/entity/Users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Clients } from 'src/entity/Clients.entity';
import { Employees } from 'src/entity/Employees.entity';

@Injectable()
export class UserService implements IUserRepository {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Clients)
        private readonly clientRepository: Repository<Clients>,
        @InjectRepository(Employees)
        private readonly employeeRepository: Repository<Employees>,

    ) { }

    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: ['clients', 'employees'],
        });
        return users;
    }

    async findUser(email: string) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where({ email: email })
            .andWhere({ deleteDate: null })
            .addSelect('user.password')
            .getOne();
    }

    async isEmailOrDniTaken(email: string, dni: string, id: number): Promise<{ emailExists: boolean; dniExists: boolean }> {
        const [emailUser, clientDniUser, employeeDniUser] = await Promise.all([
            // Verifica si el email existe en la tabla users
            this.userRepository.createQueryBuilder('user')
                .where('user.email = :email', { email })
                .andWhere('user.deleteDate IS NULL')
                .andWhere('user.userId != :id', { id })
                .getOne(),

            this.clientRepository.createQueryBuilder('client')
                .where('client.dni = :dni', { dni })
                .getOne(),

            this.employeeRepository.createQueryBuilder('employee')
                .where('employee.dni = :dni', { dni })
                .getOne(),
        ]);

        return {
            emailExists: !!emailUser,
            dniExists: !!clientDniUser || !!employeeDniUser,
        };
    }


    async createUser(dto: CreateUserDto, role: number): Promise<Users> {
        const user = this.userRepository.create({
            email: dto.email,
            password: dto.password,
            role: { roleId: role },
        });

        return await this.userRepository.save(user);
    }
}
