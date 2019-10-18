import {Request, Response} from 'express';
import {User} from '../Entities/User';
import {Role} from "../Entities/Role";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import config from "config";

export class UserController {

    public static signUp = async (req: Request, res: Response) => {
        let user;

        //find an existing user
        user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send("User already registered.");

        const {username, email, password, roleName} = req.body;

        let role = await Role.findOne({where: {name: roleName}});

        if (!role) {
            role = await Role.findOne({where: {name: 'invited'}});
        }

        //create the user
        user = new User();
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.role = role;

        try {
            //create the token
            const token = await UserController.generateAuthToken(user);
            res.header("x-auth-token", token);

            user.token = token;
            await user.save();

            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            });

        } catch (error) {
            res.status(500).json(error);
        }
    };

    public static async showSignUp(req: Request, res: Response) {
        res.render('layouts/main', {body: this.getSignUpPage()});
        // res.render('auth/signup');
    }

    private static getSignUpPage() {
        return "<p>Something</p>";
    }

    public static async signIn(req: Request, res: Response) {
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

    public static async show(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne(id);
        res.status(200).json({user});
    }

    public static async logout(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne(id);

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

    public static validateUser = user => {
        const schema = {
            username: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(3).max(255).required(),
        };
        return Joi.validate(user, schema);
    };

}
