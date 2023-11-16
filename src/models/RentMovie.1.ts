import {  Entity,  PrimaryGeneratedColumn,  Column,  ManyToOne,  RelationId,  Collection, CreateDateColumn,} from "typeorm";
import { Movie } from "./Movie.1";
@Entity()

export class RentMovie
{
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie)
  movie: Movie;

  @RelationId((rentmovie: RentMovie) => rentmovie.movie)
  movie_id: number;
  
  @Column()
  id_costumer: number

  @Column()
  @CreateDateColumn()
  loan_date: Date

  @Column()
  devolution_date: Date

  @Column()
  price: number

  @Column({default: true})
  state: boolean


}