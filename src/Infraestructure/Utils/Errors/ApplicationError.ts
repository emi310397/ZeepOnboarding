import {BaseError} from "./BaseError";

export class ApplicationError extends BaseError {
    protected description: string;

    constructor(message: string | Object, description: string) {
        super(message);
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }
}
