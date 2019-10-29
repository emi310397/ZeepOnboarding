import {Request} from "express";
import AuthorizationService from "../../Services/AuthorizationService";
import {User} from "../../../Domain/Entities/User";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import LogOutCommand from "../../Commands/UserCommands/LogOutCommand";

@injectable()
export default class LogOutAdapter {
    private authorizationService: AuthorizationService;

    constructor(
        @inject(TYPES.AuthorizationService) authorizationService: AuthorizationService
    ) {
        this.authorizationService = authorizationService;
    }

    public adapt = async (req: Request) => {
        const {id} = req.params;

        const user = await User.findOne(id);
        if (!user) {
            throw Error("User not found.");
        }

        await this.authorizationService.destroyAuthToken(user);

        return new LogOutCommand(user.email, user.password);
    }
}
