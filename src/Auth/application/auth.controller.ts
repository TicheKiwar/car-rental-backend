import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Users } from 'src/entity/Users.entity';
import { AuthService } from '../domain/auth.service';
import { User } from 'src/common/decorators/user.decorator';
import { RecoverPasswordService } from '../domain/recover-password.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly recoverPasswordService: RecoverPasswordService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: Users) {
    const data = this.authService.login(user);
    return { message: 'Login exitoso', data };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() { }

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  async recoverPassword(@Body('email') email: string): Promise<{ message: string }> {
    try {
      await this.recoverPasswordService.recoverPasswordEmail(email);
      return { message: 'Correo de recuperación enviado con éxito.' };
    } catch (error) {
      throw error;
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ message: string }> {
    await this.recoverPasswordService.resetPassword(token, newPassword);
    return { message: 'Contraseña restablecida correctamente' };
  }
}