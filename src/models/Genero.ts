import {Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn,} from 'typeorm'
import {Movie} from './Movie.1'
@Entity()
export class Genero{

@PrimaryGeneratedColumn()
id:number

@Column()
type:string;

@Column({default:true})
state:boolean;


}

