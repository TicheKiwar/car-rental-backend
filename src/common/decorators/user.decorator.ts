import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/entity/Users.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);