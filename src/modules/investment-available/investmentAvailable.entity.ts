import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'investment_available' })
export class AvailableInvestmentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'company_name', type: 'varchar', nullable: false })
  companyName: string

  @Column({ name: 'sector', type: 'varchar', nullable: false })
  sector: string // Setor de atuação da empresa (opcional)

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string // Descrição da empresa (opcional)

  @Column({ name: 'minimum_investment', type: 'decimal', precision: 15, scale: 2, nullable: false })
  minimumInvestment: number // Valor mínimo de investimento

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
