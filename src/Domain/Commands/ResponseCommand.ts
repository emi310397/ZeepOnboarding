export default class ResponseCommand {
    private _status;
    private _object;

    constructor(status, object) {
        this._status = status;
        this._object = object;
    }

    set status(value) {
        this._status = value;
    }

    set object(value) {
        this._object = value;
    }
}