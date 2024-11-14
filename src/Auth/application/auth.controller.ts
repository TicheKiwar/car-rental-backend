import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Users } from 'src/entity/Users.entity';
import { AuthService } from '../domain/auth.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: Users) {
    const data = this.authService.login(user);
    return { message: 'Login exitoso', data };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() { }
}