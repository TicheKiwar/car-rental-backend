import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/user.repository';
import { Users } from 'src/entity/Users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Clients } from 'src/entity/Clients.entity';
import { Employees } from 'src/entity/Employees.entity';
import { MailerService } from './mailer.service';

@Injectable()
export class UserService implements IUserRepository {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Clients)
        private readonly clientRepository: Repository<Clients>,
        @InjectRepository(Employees)
        private readonly employeeRepository: Repository<Employees>,
        private readonly emailService: MailerService
    ) { }

    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: ['clients', 'employees'],
        });
        return users;
    }

    async findById(userId: number) {
        const user = await this.userRepository.findOne({
            where: { userId: userId },
            relations: ['clients', 'employees', 'role'],
        });
        if (!user)
            throw new NotFoundException(
                'No se ha encontrado un usuario asociado',
            );
        return user;
    }

    async findUser(email: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.isEmailVerified = :value', { value: true })
            .andWhere('user.deleteDate IS NULL')
            .addSelect('user.password')
            .getOne();
        if (!user)
            throw new NotFoundException(
                'No se ha encontrado una cuenta asociada a este usuarioo',
            );
        return user;
    }

    async isEmailOrDniTaken(email: string, dni: string, id: number): Promise<{ emailExists: boolean; dniExists: boolean }> {
        const [emailUser, clientDniUser, employeeDniUser] = await Promise.all([
            this.userRepository.createQueryBuilder('user')
                .where('user.email = :email', { email })
                .andWhere('user.isEmailVerified = :value', { value: true })
                .andWhere('user.deleteDate IS NULL')
                .andWhere('user.userId != :id', { id })
                .getOne(),

            this.clientRepository.createQueryBuilder('client')
                .leftJoin('client.user', 'user')
                .where('client.dni = :dni', { dni })
                .andWhere('user.isEmailVerified = :value', { value: true })
                .andWhere('user.deleteDate IS NULL')
                .andWhere('user.userId != :id', { id })
                .getOne(),

            this.employeeRepository.createQueryBuilder('employee')
                .leftJoin('employee.user', 'user')
                .where('employee.dni = :dni', { dni })
                .andWhere('user.isEmailVerified = :value', { value: true })
                .andWhere('user.deleteDate IS NULL')
                .andWhere('user.userId != :id', { id })
                .getOne(),
        ]);

        return {
            emailExists: !!emailUser,
            dniExists: !!clientDniUser || !!employeeDniUser,
        };
    }

    async createUser(dto: CreateUserDto, role1: number): Promise<Users> {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (role1 === 3)
            this.emailService.sendVerificationEmail(dto.email, verificationCode)

        const user = this.userRepository.create({
            email: dto.email,
            password: dto.password,
            isEmailVerified: role1 !== 3,
            role: { roleId: role1 },
            verificationCode,
            verificationCodeExpires: new Date(Date.now() + 3600000),
        });

        return await this.userRepository.save(user);
    }

    async saveUser(user: Users): Promise<Users> {
        return await this.userRepository.save(user);
    }

    async savePasswordResetToken(userId: number, token: string): Promise<void> {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        user.passwordResetToken = token;
        user.passwordResetExpires = new Date(Date.now() + 3600000);

        await this.saveUser(user);
    }

    async verifyPasswordResetToken(token: string): Promise<Users> {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: token },
        });

        if (!user || user.passwordResetExpires < new Date()) {
            throw new NotFoundException('El enlace de recuperación de contraseña ha expirado');
        }

        return user;
    }

    async verifyEmail(email: string, code: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { email, verificationCode: code },
        });

        if (!user) {
            throw new NotFoundException('El código de verificación es incorrecto');
        }

        if (user.verificationCodeExpires < new Date()) {
            throw new NotFoundException('El código de verificación ha expirado');
        }

        user.isEmailVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;

        await this.saveUser(user);
    }
}
