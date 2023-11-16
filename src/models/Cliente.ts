import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm'

@Entity()
export class Cliente{
@PrimaryGeneratedColumn()
id:number

@Column()
name:string

@Column()
lastName:string

@Column()
phone:string

@Column()
age:string

@Column({default:true})
state:boolean

}