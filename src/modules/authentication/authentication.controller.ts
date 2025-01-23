import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { Public } from '../../resources/decorators/authentication.guard.decorator'
import SignInDto from './dtos/signIn.dto'

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('encoder')
  @Public()
  encode(@Body() signInDto: SignInDto) {
    return this.authService.encode(signInDto)
  }
}
