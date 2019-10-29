import {User} from "../../Entities/User";
import LogInCommand from "../../../Infraestructure/Commands/UserCommands/LogInCommand";
import {inject, injectable} from "inversify";
import PasswordHashService from "../../../Infraestructure/Services/PasswordHashService";
import TYPES from "../../../types";

@injectable()
export default class LogInHandler {
    private passwordHashService: PasswordHashService;

    constructor(
        @inject(TYPES.PasswordHashService) passwordHashService: PasswordHashService
    ) {
        this.passwordHashService = passwordHashService;
    }

    public execute = async (command: LogInCommand) => {
        const {email, password} = command;
        const user = await User.findOne({where: {email}});

        const result = await this.passwordHashService.comparePassword(password, user.password);
        if (!result) {
            throw Error("Invalid credentials.");
        }

        return user;
    }
}
