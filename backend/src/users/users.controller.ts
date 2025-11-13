import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VERSION } from '../constants';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller({ path: 'users', version: VERSION })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get profile data' })
  @ApiOkResponse({ description: 'Profile returned' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @Get('profile')
  async getCurrentUser(@Request() req: AuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
