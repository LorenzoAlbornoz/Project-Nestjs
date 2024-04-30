import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Patient } from "src/patients/entities/patient.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne(() => Patient, pacient => pacient.posts)
    author: Patient;
}
