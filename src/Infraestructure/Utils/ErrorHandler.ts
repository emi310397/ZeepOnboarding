import {injectable} from "inversify";
import {Response} from "express";
import {InfrastructureError} from "./Errors/InfrastructureError";

@injectable()
export class ErrorHandler {
    public handle(err: Error, res: Response) {
        if (err instanceof InfrastructureError) {
            res.status(err.getStatusCode()).send(err.message);
        } else {
            res.status(500).send("Internal server error")
        }
    }
}
