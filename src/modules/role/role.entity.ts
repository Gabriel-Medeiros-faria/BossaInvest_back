import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string

  @Column({ name: 'key', type: 'varchar', nullable: false })
  key: string

  @OneToMany(() => UserEntity, (user) => user.role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  users: UserEntity[]
}
