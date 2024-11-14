import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/interface/user.service';
import { Users } from 'src/entity/Users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);

    if (user && (await compare(password, user.password))) return user;
    return null;
  }

  login(user: Users) {
    const { userId, ...rest } = user;
    const payload = { sub: userId };

    const response = {
      user,
      accessToken: this.jwtService.sign(payload),
    };

    return response;
  }
}