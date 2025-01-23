import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'role'
export const Role = (...roles: string[]) => SetMetadata('roles', roles);
