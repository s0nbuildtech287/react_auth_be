import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {}

  async verifyToken(idToken: string) {
    const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
    return { uid: decodedToken.uid, email: decodedToken.email };
  }
}
