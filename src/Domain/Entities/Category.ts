import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    public readonly _id: number;

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
