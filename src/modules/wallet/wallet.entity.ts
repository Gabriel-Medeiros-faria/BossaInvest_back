import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { InvestmentEntity } from '../investment/investment.entity';

@Entity({ name: 'wallet' })
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'user_id', type: 'integer', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.wallets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => InvestmentEntity, (investment) => investment.wallet)
  investments: InvestmentEntity[];
}
