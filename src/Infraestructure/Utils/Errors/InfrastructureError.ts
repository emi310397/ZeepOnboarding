import {BaseError} from "./BaseError";

export class InfrastructureError extends BaseError {
    protected statusCode: number;

    constructor(message: string | Object) {
        super(message);
    }

    public getStatusCode(): number {
        return this.statusCode
    }
}
