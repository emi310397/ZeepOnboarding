import {createConnection} from "typeorm";
import {User} from '../Entities/User';
import {Role} from "../Entities/Role";
import {Post} from "../Entities/Post";
import {Category} from "../Entities/Category";


export default async function createConnectionDB(){
    
    await createConnection({
        type: "mysql",
        host: process.env.host_DB,
        port: 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.database_DB,
        synchronize: true,
        logging: true,
        entities: [User, Role, Post, Category]
    });
};