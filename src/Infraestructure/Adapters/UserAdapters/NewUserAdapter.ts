import {Request} from "express";
import NewUserCommand from "../../Commands/UserCommands/NewUserCommand";
import AuthorizationService from "../../Services/AuthorizationService";
import UserSchema from "../Schemas/UserSchema";
import {User} from "../../../Domain/Entities/User";
import {Role} from "../../../Domain/Entities/Role";
import {Roles} from "../../../Domain/Enums/Roles";
import PasswordHashService from "../../Services/PasswordHashService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import NewSessionHandler from "../../../Domain/Handlers/UserHandler/NewSessionHandler";
import NewSessionCommand from "../../Commands/UserCommands/NewSessionCommand";

@injectable()
export default class NewUserAdapter {
    private authorizationService: AuthorizationService;
    private passwordHashService: PasswordHashService;
    private newSessionHandler: NewSessionHandler;

    constructor(
        @inject(TYPES.AuthorizationService) authorizationService: AuthorizationService,
        @inject(TYPES.PasswordHashService) passwordHashService: PasswordHashService,
        @inject(TYPES.NewSessionHandler) newSessionHandler: NewSessionHandler
    ) {
        this.authorizationService = authorizationService;
        this.passwordHashService = passwordHashService;
        this.newSessionHandler = newSessionHandler;
    }

    public adapt = async (req: Request) => {
        const {username, email, password, roleName} = req.body;
        const user = new User(username, email, roleName, password);

        const result = UserSchema.validate(user);
        if (result.error) {
            throw result.error;
        }

        let role = await Role.findOne({where: {name: roleName}});
        if (!role) {
            role = await Role.findOne({where: {name: Roles.VIEWER}});
        }

        const hashedPassword = await this.passwordHashService.hashPassword(password);

        const token = await this.authorizationService.generateAuthToken(user);

        await this.newSessionHandler.execute(new NewSessionCommand(user, token));

        return new NewUserCommand(username, email, hashedPassword, role, token);
    }
}
