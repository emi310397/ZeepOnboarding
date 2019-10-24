import {User} from "../../Entities/User";
import NewUserCommand from "../../../Infraestructure/Commands/UserCommands/NewUserCommand";

export default class NewUserHandler {
    public static execute = async (command: NewUserCommand) => {
        try {
            const {username, email, password, roleName} = command;
            const user = new User(username, email, roleName, password);
            await user.save();

            return user;
        } catch (error) {
            throw error;
        }
    }
}