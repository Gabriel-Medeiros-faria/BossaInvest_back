import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { RoleService } from './role.service'
import { AddRoleInputDto } from './dtos/add-role-input.dto'
import { Public } from '../../resources/decorators/authentication.guard.decorator'

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @Public()
  async addRole(@Body() role: AddRoleInputDto) {
    return await this.roleService.addRole(role)
  }

  @Get()
  @Public()
  async getRole(){
    return await this.roleService.roles()
  }
}
