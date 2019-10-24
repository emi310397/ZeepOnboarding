import {User} from "../../Domain/Entities/User";
import {Session} from "../../Domain/Entities/Session";
import {injectable} from 'inversify';

const jwt = require("jsonwebtoken");
const config = require("config");

@injectable()
export default class AuthorizationService {

    public static generateAuthToken = async (user: User) => {
        return jwt.sign({id: user._id, role: user.role}, config.get('myprivatekey'));
    };

    public static compareAuthToken = async (token: string) => {
        return jwt.verify(token, config.get("myprivatekey"));
    };

    public static destroyAuthToken = async (user: User) => {
        try {
            const session = await Session.findOne({user});
            session.token = "";
            await session.save();
        } catch (error) {
            return error;
        }
    };
}