import { BadRequestException, Injectable } from '@nestjs/common'
import { RoleQueryInputDto } from './dtos/role-query-input.dto'
import { RoleDto } from './dtos/role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './role.entity'
import { DeleteResult, Repository } from 'typeorm'
import { AddRoleInputDto } from './dtos/add-role-input.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async roles(filter?: RoleQueryInputDto): Promise<RoleDto[]> {
    const filters: { where: RoleQueryInputDto } = { where: {} }

    if (filter?.id) {
      filters.where.id = filter.id
    }

    if (filter?.key) {
      filters.where.key = filter.key
    }

    return (await this.roleRepository.find(filters)).map((role) => role as unknown as RoleDto)
  }

  async addRole(newRole: AddRoleInputDto): Promise<RoleDto> {
    const userExists = (await this.roles({ key: newRole.key }))[0]

    if (userExists) {
      throw new BadRequestException(`You cannot add this role. Please try again later.`)
    }

    const role = new RoleEntity()

    role.name = newRole.name
    role.key = newRole.key

    return await this.roleRepository.save(role)
  }

  /* async deleteRole(): Promise<DeleteResult> {
    const userExists = (await this.roles({ key: newRole.key }))[0]

    if (userExists) {
      throw new BadRequestException(`You cannot add this role. Please try again later.`)
    }

    const role = new RoleEntity()

    role.name = newRole.name
    role.key = newRole.key

    return await this.roleRepository.delete({id:4})
  } */
}
