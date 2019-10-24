import {Request, Response} from 'express';
import {User} from '../../Domain/Entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "config";
import NewUserAdapter from "../Adapters/UserAdapters/NewUserAdapter";
import NewUserHandler from "../../Domain/Handlers/UserHandler/NewUserHandler";
import {inject, injectable} from 'inversify';
import TYPES from "../../types";

@injectable()
export class UserController {

    private newUserAdapter: NewUserAdapter;
    private newUserHandler: NewUserHandler;

    constructor(
        @inject(TYPES.NewUserAdapter) newUserAdapter: NewUserAdapter,
        @inject(TYPES.NewUserHandler) newUserHandler: NewUserHandler
    ) {
        this.newUserAdapter = newUserAdapter;
        this.newUserHandler = newUserHandler;
    }

    public static signUp = async (req: Request, res: Response) => {
        try {
            const command = await NewUserAdapter.adapt(req);
            const user = await NewUserHandler.execute(command);
            res.header("x-auth-token", command.token).status(200).json({message: "User registered", user});
        } catch (error) {
            res.status(500).json(error);
        }
    };

    public static async showSignUp(req: Request, res: Response) {
        res.render('auth/signup');
    }

    public static async logIn(req: Request, res: Response) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (await bcrypt.compare(password, user.password)) {
            //create the token
            const token = await UserController.generateAuthToken(user);

            res.header("x-auth-token", token).send({
                id: user.id,
                username: user.username,
                email: user.email
            });

            user.token = token;
            await user.save();

            res.status(200).json({user});
        } else {
            res.status(401).json("Access denied. Invalid credentials.");
        }
    }

    public static async getUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne(id);
        res.status(200).json({user});
    }

    public static async logout(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne(id);

        if (!user) {
            res.status(401).json("The user doesn't exist.");
        }

        await UserController.destroyAuthToken(user);
        res.status(200).json("Logged out");
    }

    public static generateAuthToken = async user => {
        const token = await jwt.sign({id: user.id, role: user.role}, config.get('myprivatekey'));
        return token;
    };

    public static destroyAuthToken = async user => {
        try {
            user.token = "";
            await user.save();
        } catch (error) {
            return error;
        }
    };
}
