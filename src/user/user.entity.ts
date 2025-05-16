import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  uid: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  created_at: Date;
}
