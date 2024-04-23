import { Post } from "src/post/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User{
@PrimaryGeneratedColumn({type:'bigint'})
id:number
@Column({unique:true})
username:string
@Column()
password:string
@Column()
createdAt:Date
@OneToOne(() => Profile)
@JoinColumn()
profile:Profile

@OneToMany(() => Post, (post) => post.user)
posts: Post[]

}