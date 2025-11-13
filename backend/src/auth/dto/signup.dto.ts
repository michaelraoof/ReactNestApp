import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'michael@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ example: 'Michael Raoof', minLength: 3 })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @ApiProperty({
    example: '123456a@',
    minLength: 8,
    description: 'Must include letters and numbers and a special character ',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[^a-zA-Z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
