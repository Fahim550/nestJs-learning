import { User } from 'src/users/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
  })
  name: string;
  @Column({
    type: 'varchar',
    unique: true,
    default: null,
    nullable: true,
  })
  phone: string | null;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  gender?: string;
  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth?: Date;
  @Column()
  age: number;
  @Column()
  isMarried: boolean;
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
