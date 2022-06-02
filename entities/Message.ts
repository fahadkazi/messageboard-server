import { ObjectType, Field } from 'type-graphql'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number

  @Field()
  @Column()
  text!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
