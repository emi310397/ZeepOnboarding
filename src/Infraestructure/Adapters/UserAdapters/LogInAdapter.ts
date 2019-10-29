import {Request} from "express";
import AuthorizationService from "../../Services/AuthorizationService";
import {User} from "../../../Domain/Entities/User";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import LogInCommand from "../../Commands/UserCommands/LogInCommand";
import NewSessionHandler from "../../../Domain/Handlers/UserHandler/NewSessionHandler";
import NewSessionCommand from "../../Commands/UserCommands/NewSessionCommand";

@injectable()
export default class LogInAdapter {
    private authorizationService: AuthorizationService;
    private newSessionHandler: NewSessionHandler;

    constructor(
        @inject(TYPES.AuthorizationService) authorizationService: AuthorizationService,
        @inject(TYPES.NewSessionHandler) newSessionHandler: NewSessionHandler
    ) {
        this.authorizationService = authorizationService;
        this.newSessionHandler = newSessionHandler;
    }

    public adapt = async (req: Request) => {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw Error("User not found.");
        }

        const token = await this.authorizationService.generateAuthToken(user);

        await this.newSessionHandler.execute(new NewSessionCommand(user, token));

        return new LogInCommand(email, password, token);
    }
}
