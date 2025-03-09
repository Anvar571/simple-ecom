import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AppAuthGuard } from '../guard/auth.guard';
import { RoleGuard } from '../guard/role.guard';

export function Roles(role: string) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(AppAuthGuard, new RoleGuard(role)),
  );
}
