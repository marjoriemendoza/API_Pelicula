import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  RelationId,
  Collection,
} from "typeorm";
import { Genero } from "./Genero";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  director: string;

  @Column()
  language: string;

  @Column()
  image: string;

  @Column()
  ranking: number;

  @Column({ default: true })
  state: boolean;

  @RelationId((movie: Movie) => movie.genero)
  @ManyToOne(() => Genero)
  genero: Genero;

}
