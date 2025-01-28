import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { WalletEntity } from '../wallet/wallet.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'role_id', type: 'integer', nullable: false })
  roleId: number;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;


  @OneToMany(() => WalletEntity, (wallet) => wallet.user)
  wallets: WalletEntity[];
}
