import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as admin from 'firebase-admin';

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {}

  @Post('verify-token')
  async verifyToken(@Body() body: { idToken: string }) {
    try {
      return await this.authService.verifyToken(body.idToken);
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
