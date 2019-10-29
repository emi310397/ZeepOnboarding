import {User} from "../../Entities/User";
import NewUserCommand from "../../../Infraestructure/Commands/UserCommands/NewUserCommand";
import {injectable} from "inversify";

@injectable()
export default class NewUserHandler {
    public execute = async (command: NewUserCommand) => {
        const {username, email, password, roleName} = command;

        let user = await User.findOne({email});
        if (user) {
            throw Error("User already registered.");
        }

        user = new User(username, email, roleName, password);
        await user.save();

        return user;
    }
}
