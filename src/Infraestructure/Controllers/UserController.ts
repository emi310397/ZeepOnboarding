import {Request, Response} from 'express';
import {User} from '../../Domain/Entities/User';
import NewUserAdapter from "../Adapters/UserAdapters/NewUserAdapter";
import NewUserHandler from "../../Domain/Handlers/UserHandler/NewUserHandler";
import {inject, injectable} from 'inversify';
import TYPES from "../../types";
import LogInAdapter from "../Adapters/UserAdapters/LogInAdapter";
import LogInHandler from "../../Domain/Handlers/UserHandler/LogInHandler";

@injectable()
export class UserController {

    private newUserAdapter: NewUserAdapter;
    private logInAdapter: LogInAdapter;
    private newUserHandler: NewUserHandler;
    private logInHandler: LogInHandler;

    constructor(
        @inject(TYPES.NewUserAdapter) newUserAdapter: NewUserAdapter,
        @inject(TYPES.LogInAdapter) logInAdapter: LogInAdapter,
        @inject(TYPES.LogInHandler) logInHandler: LogInHandler,
        @inject(TYPES.NewUserHandler) newUserHandler: NewUserHandler
    ) {
        this.newUserAdapter = newUserAdapter;
        this.logInAdapter = logInAdapter;
        this.newUserHandler = newUserHandler;
        this.logInHandler = logInHandler;
    }

    public signUp = async (req: Request, res: Response) => {
        try {
            const command = await this.newUserAdapter.adapt(req);
            const user = await this.newUserHandler.execute(command);
            res.header("x-auth-token", command.token).status(200).json({message: "User registered.", user});
        } catch (error) {
            res.status(500).json(error);
        }
    };

    public logIn = async (req: Request, res: Response) => {
        try {
            const command = await this.logInAdapter.adapt(req);
            const user = await this.logInHandler.execute(command);
            res.header("x-auth-token", command.token).status(200).json({message: "User logged in.", user});
        } catch (error) {
            res.status(500).json(error);
        }
    };

    public async logout(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne(id);

        if (!user) {
            res.status(401).json("The user doesn't exist.");
        }

        await UserController.destroyAuthToken(user);
        res.status(200).json("Logged out");
    }

    public async getUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne(id);
        res.status(200).json({user});
    }
}
