import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'social_accounts',
})
@Index(['provider', 'social_id', 'user_id'])
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 12 })
  provider!: string;

  @Column({ length: 255 })
  social_id!: string;

  @Column('int', { primary: true, name: 'user_id' })
  user_id: number;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
