import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    public readonly _id: number;

    private _content: string;
    private _user: User;
    private _post: Post;

    constructor(content: string, user: User, post: Post) {
        super();
        this._content = content;
        this._user = user;
        this._post = post;
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

    @ManyToOne(type => Post, Post => Comment)
    get post(): Post {
        return this._post;
    }
    set post(value: Post) {
        this._post = value;
    }
}
