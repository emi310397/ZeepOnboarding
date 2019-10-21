import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @OneToOne(type => User)
    public readonly user: string;

    private _token: string;

    constructor(user: string, token: string) {
        super();
        this.user = user;
        this._token = token;
    }

    @Column()
    get token(): string {
        return this._token;
    }
    set token(value: string) {
        this._token = value;
    }
}
