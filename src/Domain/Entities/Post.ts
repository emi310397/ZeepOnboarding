import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    public readonly _id: number;

    private _title: string;
    private _content: string;
    private _user: User;
    private _category: Category;

    constructor(title: string, content: string, user: User, category: Category) {
        super();
        this._title = title;
        this._content = content;
        this._user = user;
        this._category = category;
    }

    @Column()
    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }

    @Column()
    get content(): string {
        return this._content;
    }
    set content(value: string) {
        this._content = value;
    }

    @ManyToOne(type => User, User => Post)
    get user(): User {
        return this._user;
    }
    set user(value: User) {
        this._user = value;
    }

    @ManyToOne(type => Category)
    get category(): Category {
        return this._category;
    }
    set category(value: Category) {
        this._category = value;
    }
}
