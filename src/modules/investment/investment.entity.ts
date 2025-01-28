import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WalletEntity } from '../wallet/wallet.entity';
import { AvailableInvestmentEntity } from '../investment-available/investmentAvailable.entity';

@Entity({ name: 'investment' })
export class InvestmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount', type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;  

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;


  @Column({ name: 'wallet_id', type: 'integer', nullable: false })
  walletId: number;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.investments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'wallet_id' })
  wallet: WalletEntity;

  @Column({ name: 'available_investment_id', type: 'integer', nullable: false })
  availableInvestmentId: number;

  @ManyToOne(() => AvailableInvestmentEntity)
  @JoinColumn({ name: 'available_investment_id' })
  availableInvestment: AvailableInvestmentEntity;
}
