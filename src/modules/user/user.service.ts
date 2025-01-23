import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { UserQueryInputDto } from './dtos/user-query-input.dto'
import { UserDto } from './dtos/user.dto'
import { UserPasswordDto } from './dtos/user-password.dto'
import { AddUserInputDto } from './dtos/add-user.dto'
import { UpdateUserInputDto } from './dtos/update-user.dto'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async users(
    filter?: UserQueryInputDto,
    withPassword = false,
  ): Promise<UserDto[] | UserPasswordDto[]> {
    const filters: { where: UserQueryInputDto; relations?: string[] } = { where: {} }

    if (filter?.id) {
      filters.where.id = filter.id
    }

    if (filter?.email) {
      filters.where.email = filter.email
    }
    if (filter?.roleId) {
      filters.where.roleId = filter.roleId
    }

    filters.relations = ['role']

    return (await this.userRepository.find(filters)).map((user) =>
      withPassword ? (user as unknown as UserPasswordDto) : (user as unknown as UserDto),
    )
  }

  async addUser(newUser: AddUserInputDto): Promise<UserDto> {
    const userExists = (await this.users({ email: newUser.email }))[0]

    if (userExists) {
      throw new BadRequestException(`You cannot add this user. Please try again later.`)
    }

    const user = new UserEntity()

    user.email = newUser.email
    user.name = newUser.name
    user.password = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex)
    user.roleId = newUser.roleId

    return await this.userRepository.save(user)
  }

  async updateUser(user: UpdateUserInputDto): Promise<UserDto> {
    const userExists = (await this.users({ id: user.id }, true))[0] as UserPasswordDto

    if (!userExists) {
      throw new NotFoundException(`User with this ID does not exist.`)
    }

    if (user.name) userExists.name = user.name
    if (user.password)
      userExists.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex)

    return await this.userRepository.save(userExists)
  }
}
