import {injectable} from 'inversify';
import bcrypt from 'bcrypt';

@injectable()
export default class PasswordHashService {
    private readonly salt = 10;

    public async hashPassword(password: String) {
        return bcrypt.hash(password, this.salt);
    }

    public async comparePassword(password: String, savedPassword: String) {
        return bcrypt.compare(password, savedPassword)
    }
}
