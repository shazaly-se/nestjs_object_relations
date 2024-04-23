import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_posts')
export class Post{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column()
    description:string
    @ManyToOne(() => User , (user) =>user.posts)
    user:User
}