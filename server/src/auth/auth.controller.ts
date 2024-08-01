import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new BadRequestException('Registration failed');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    if (!result) {
      throw new BadRequestException('Invalid credentials');
    }

    const { token, user } = result;
    return { token, user };
  }
}
