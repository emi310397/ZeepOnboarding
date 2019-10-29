export default class LogInCommand {
    private readonly _email;
    private readonly _password;
    private readonly _token;

    constructor(email, password, token) {
        this._email = email;
        this._password = password;
        this._token = token;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get token() {
        return this._token;
    }
}
