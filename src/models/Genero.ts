import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm'

@Entity()
export class Genero{
@PrimaryGeneratedColumn()

id:number

@Column()
type:string

@Column({default:true})
state:boolean

}