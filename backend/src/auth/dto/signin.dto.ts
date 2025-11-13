import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ example: 'mcihael@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address...' })
  email: string;

  @ApiProperty({ example: '123456a@' })
  @IsString()
  password: string;
}
