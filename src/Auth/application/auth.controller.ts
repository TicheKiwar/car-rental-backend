import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (this.authService.isAdmin(user)) {
      return { message: 'Login successful', role: 'Administrador' };
    } else if (this.authService.isEmployee(user)) {
      return { message: 'Login successful', role: 'Empleado' };
    } else {
      throw new HttpException('User role not recognized', HttpStatus.FORBIDDEN);
    }
  }
}
