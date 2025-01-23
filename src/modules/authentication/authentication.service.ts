import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as CryptoJS from 'crypto-js'
import { JwtService } from '@nestjs/jwt'
import SignInDto from './dtos/signIn.dto'
import { UserPasswordDto } from '../user/dtos/user-password.dto'

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = (await this.usersService.users({ email }))[0] as UserPasswordDto

    if (user?.password !== CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)) {
      throw new UnauthorizedException()
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async encode({ password }: SignInDto): Promise<string> {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
  }
}
