import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";

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

    @Column()
    public token: string;
}
