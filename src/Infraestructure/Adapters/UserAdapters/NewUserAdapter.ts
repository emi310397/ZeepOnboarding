import {Request} from "express";
import bcrypt from 'bcrypt';
import NewUserCommand from "../../Commands/UserCommands/NewUserCommand";
import AuthorizationService from "../../Services/AuthorizationService";
import UserSchema from "../Schemas/UserSchema";
import {User} from "../../../Domain/Entities/User";
import {Role} from "../../../Domain/Entities/Role";
import {Roles} from "../../../Domain/Enums/Roles";
import {Session} from "../../../Domain/Entities/Session";

export default class NewUserAdapter {
    public static adapt = async (req: Request) => {
        const {username, email, password, roleName} = req.body;

        let user = await User.findOne({email});
        if (user) {
            throw Error("User already registered.");
        }

        user = new User(username, email, roleName, password);

        const result = UserSchema.validate(user);
        if (result.error) {
            throw result.error;
        }

        let role = await Role.findOne({where: {name: roleName}});
        if (!role) {
            role = await Role.findOne({where: {name: Roles.VIEWER}});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = await AuthorizationService.generateAuthToken(user);

        const session = new Session(user, token);
        await session.save();

        return new NewUserCommand(username, email, hashedPassword, role, token);
    }
}