import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinTable, OneToMany} from "typeorm";
import {Role} from "./Role";
import {Post} from "./Post";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @ManyToOne(type => Role, Role => Role.name)
    public role: string;

    @Column()
    public password: string;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @Column()
    public token: string;
}
