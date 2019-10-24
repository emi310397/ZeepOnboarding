export default class NewUserCommand {
    private readonly _username;
    private readonly _email;
    private readonly _password;
    private readonly _roleName;
    private readonly _token;

    constructor(username, email, password, roleName, token) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._roleName = roleName;
        this._token = token;
    }

    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get roleName() {
        return this._roleName;
    }

    get token() {
        return this._token;
    }
}