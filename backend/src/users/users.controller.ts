import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
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
