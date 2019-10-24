import {Container} from "inversify";
import {UserController} from "./Infraestructure/Controllers/UserController";
import {PostController} from "./Infraestructure/Controllers/PostController";
import {CommentController} from "./Infraestructure/Controllers/CommentController";
import TYPES from "./types";

var container = new Container();

// Controllers
container.bind<UserController>(TYPES.UserController).toSelf();
container.bind<PostController>(TYPES.PostController).toSelf();
container.bind<CommentController>(TYPES.CommentController).toSelf();

// Services


export default container;