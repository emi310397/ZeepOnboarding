import {injectable} from "inversify";
import NewSessionCommand from "../../../Infraestructure/Commands/UserCommands/NewSessionCommand";
import {Session} from "../../Entities/Session";

@injectable()
export default class NewSessionHandler {
    public execute = async (command: NewSessionCommand) => {
        try {
            const {user, token} = command;

            const session = new Session(user, token);
            await session.save();

            return session;
        } catch (error) {
            throw error;
        }
    }
}
