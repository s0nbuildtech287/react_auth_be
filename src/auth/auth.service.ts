import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async verifyToken(idToken: string) {
    const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
    return { uid: decodedToken.uid, email: decodedToken.email };
  }

  async registerUser(userData: {
    uid: string;
    email: string;
    username: string;
    phone: string;
    age: number;
    address: string;
    createdAt: Date;
  }) {
    const user = this.userRepository.create({
      uid: userData.uid,
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      age: userData.age,
      address: userData.address,
      created_at: userData.createdAt,
    });
    await this.userRepository.save(user);
    return { message: 'Đã lưu vào MySQL' };
  }
}
