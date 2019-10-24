import Router from "./Infraestructure/Router/Router";
import express from 'express';
import createConnectionDB from './Infraestructure/DataBase/Configuration';
import * as dotenv from 'dotenv';
import config from 'config';
import("reflect-metadata");

class App {

    private express;
    private router;

    constructor(){
        if (!config.get("myprivatekey")) {
            console.error("FATAL ERROR: myprivatekey is not defined.");
            process.exit(1);
        }
        dotenv.config();
        this.express = express();
        createConnectionDB();
        this.router = new Router(this.express);
    }

    public run(){
        this.upServer();
        this.router.up();
    }

    private upServer(){
        this.express.listen(process.env.PORT, function(){
            console.log('Server is run in port', process.env.PORT);
        });
    }

}

const app = new App();
app.run();