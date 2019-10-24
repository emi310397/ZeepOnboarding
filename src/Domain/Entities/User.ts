import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    public readonly _id: number;

    private _username: string;
    private _email: string;
    private _role: string;
    private _password: string;
    private _isBlocked: boolean;

    constructor(username: string, email: string, role: string, password: string) {
        super();
        this._username = username;
        this._email = email;
        this._role = role;
        this._password = password;
        this._isBlocked = false;
    }

    @Column()
    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }

    @Column()
    get email(): string {
        return this._email;
    }
    set email(value: string) {
        this._email = value;
    }

    @ManyToOne(type => Role, Role => Role.name)
    get role(): string {
        return this._role;
    }
    set role(value: string) {
        this._role = value;
    }

    @Column()
    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }

    @Column()
    get isBlocked(): boolean {
        return this._isBlocked;
    }
    set isBlocked(value: boolean) {
        this._isBlocked = value;
    }
}
