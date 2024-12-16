import { SetMetadata } from '@nestjs/common';
import { TRole } from '../types/role.type';

export const ROLE_KEY = 'roles';
export const Role = (role: TRole) => SetMetadata(ROLE_KEY, role);