import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { VERSION } from '../constants';

@ApiTags('auth')
@Controller({ path: 'auth', version: VERSION })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'user created successfully ' })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiOperation({ summary: 'sign in by email and password' })
  @ApiOkResponse({ description: 'user signed in successfully' })
  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
