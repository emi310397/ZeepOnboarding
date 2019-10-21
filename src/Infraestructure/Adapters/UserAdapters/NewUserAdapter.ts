import {Request} from "express";
import NewUserCommand from "../../Commands/UserCommands/NewUserCommand";

export default class NewUserAdapter {
    public static adpat = async (req: Request) => {
        //Todo



        return new NewUserCommand(username, email, password, roleName);
    }
}