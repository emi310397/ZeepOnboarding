import {User} from "../../../Domain/Entities/User";

export default class NewSessionCommand {
    private readonly _user: User;
    private readonly _token: string;

    constructor(user, token) {
        this._user = user;
        this._token = token;
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }
}
