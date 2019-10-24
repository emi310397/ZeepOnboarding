import {Express} from 'express';
import * as dotenv from "dotenv";
import createConnectionDB from "./Infraestructure/DataBase/Configuration";
import Router from "./Infraestructure/Router/Router";
import config from "config";

class App {
    private express: Express;
    private router: Router;

    constructor(express: Express, router: Router) {
        if (!config.get("myprivatekey")) {
            console.error("FATAL ERROR: myprivatekey is not defined.");
            process.exit(1);
        }
        dotenv.config();
        createConnectionDB();
        this.express = express;
        this.router = router;
    }

    public run() {
        this.upServer();
        this.router.up();
    }

    private upServer() {
        this.express.listen(process.env.PORT, function () {
            console.log('Server is run in port', process.env.PORT);
        });
    }
}

export default App;