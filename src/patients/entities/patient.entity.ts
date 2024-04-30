import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/entities/post.entity";

@Entity({ name: "patients" })
export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username:string

    @Column()
    password: string

    @Column({type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}

    