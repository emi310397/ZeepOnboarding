export default class NewUserCommand {
    private _username;
    private _email;
    private _password;
    private _roleName;

    constructor(username, email, password, roleName) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._roleName = roleName;
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
}