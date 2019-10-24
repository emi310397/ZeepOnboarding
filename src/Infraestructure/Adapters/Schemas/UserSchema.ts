import Joi from 'joi';

export default class UserSchema {
    public static validate = user => {
        const schema = {
            username: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(3).max(255).required(),
        };
        return Joi.validate(user, schema);
    };
}
