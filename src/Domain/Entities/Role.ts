import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    public readonly id: number;

    private _name: string;

    constructor(name: string) {
        super();
        this._name = name;
    }

    @Column()
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
}
