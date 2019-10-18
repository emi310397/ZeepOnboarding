import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Role extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}
