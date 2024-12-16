import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TRole } from 'src/common/types/role.type';
import { UserService } from 'src/user/interface/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<TRole>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    // Obtén el usuario con su rol
    const userWithRole = await this.authService.findById(user.userId);

    if (!userWithRole.role || userWithRole.role.roleName !== requiredRole) {
      throw new ForbiddenException(`User does not have the required role: ${requiredRole}`);
    }

    return true;
  }
}
