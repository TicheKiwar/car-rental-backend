// src/auth/domain/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/Users.entity';
import { LoginDto } from '../application/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<Users | null> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    // Verifica si el usuario existe y si la contraseña es correcta
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null; // Retorna null si el usuario no es válido
  }
}
