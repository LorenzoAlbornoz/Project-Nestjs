import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity({ name: "profile" })
export class Profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({nullable: true})
    age: number
}