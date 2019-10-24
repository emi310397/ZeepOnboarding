import App from "./App";
import express, {Express} from 'express';
import Router from "./Infraestructure/Router/Router";
import container from "./inversify.config";
import TYPES from "./types";

import("reflect-metadata");

const server: Express = express();
const router = new Router(
    server,
    container.get(TYPES.UserController),
    container.get(TYPES.PostController),
    container.get(TYPES.CommentController)
);

const app = new App(server, router);
app.run();