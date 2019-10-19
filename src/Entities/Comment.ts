import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(type => User, User => Post)
    user: User;

    @ManyToOne(type => Post, Post => Comment)
    post: Post;
}
