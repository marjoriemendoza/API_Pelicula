import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
import bcrypt from "bcrypt"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


    @Column()
    email: string

    @Column()
    password: string

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    @Column({default: true})
    state: boolean
}