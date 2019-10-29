import {User} from "../../Entities/User";
import {inject, injectable} from "inversify";
import PasswordHashService from "../../../Infraestructure/Services/PasswordHashService";
import TYPES from "../../../types";
import LogOutCommand from "../../../Infraestructure/Commands/UserCommands/LogOutCommand";

@injectable()
export default class LogOutHandler {
    private passwordHashService: PasswordHashService;

    constructor(
        @inject(TYPES.PasswordHashService) passwordHashService: PasswordHashService
    ) {
        this.passwordHashService = passwordHashService;
    }

    public execute = async (command: LogOutCommand) => {
        const {email, password} = command;
        const user = await User.findOne({where: {email}});

        return user;
    }
}
