import {  Entity,  PrimaryGeneratedColumn,  Column,  ManyToOne,  RelationId,  Collection, CreateDateColumn,} from "typeorm";
import { Movie } from "./Movie.1";
import {Cliente} from "./Cliente"
@Entity()

export class RentMovie
{
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie)
  movie: Movie;
  @RelationId((rentmovie: RentMovie) => rentmovie.movie)
  id_movie: number;
  
  @ManyToOne(() => Cliente)
  cliente: Cliente;
  @RelationId((rentmovie: RentMovie) => rentmovie.cliente)
  id_costumer: number

  @Column()
  @CreateDateColumn()
  loan_date: Date

  @Column()
  devolution_date: Date

  @Column()
  amount: number

  @Column()
  price: number

 

  @Column({default:0})
  subTotal: number

  @Column({default:0})
  total: number

  

  @Column({default: true})
  state: boolean


}
