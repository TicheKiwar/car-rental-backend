import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entity/Users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  isAdmin(user: Users): boolean {
    return user.role.roleName === 'admin';
  }

  isEmployee(user: Users): boolean {
    return user.role.roleName === 'employe';
  }
}
