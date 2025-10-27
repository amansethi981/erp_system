import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res) {
    try {
      const { email, password } = body;
      const details = await this.authService.login(email, password);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'User Login successfully',
        data: details,
      });
    } catch (error) {
       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to login user',
        error: error.message,
      });
    }
  }
}
