export default class LogOutCommand {
    private readonly _email;
    private readonly _password;

    constructor(email, password) {
        this._email = email;
        this._password = password;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }
}
