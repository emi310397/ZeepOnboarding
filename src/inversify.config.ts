import {Container} from "inversify";
import TYPES from "./types";
import {UserController} from "./Infraestructure/Controllers/UserController";
import {PostController} from "./Infraestructure/Controllers/PostController";
import {CommentController} from "./Infraestructure/Controllers/CommentController";
import NewUserHandler from "./Domain/Handlers/UserHandler/NewUserHandler";
import NewUserAdapter from "./Infraestructure/Adapters/UserAdapters/NewUserAdapter";

var container = new Container();

// Controllers
container.bind<UserController>(TYPES.UserController).toSelf();
container.bind<PostController>(TYPES.PostController).toSelf();
container.bind<CommentController>(TYPES.CommentController).toSelf();

// Adapters
container.bind<NewUserAdapter>(TYPES.NewUserAdapter).toSelf();

// Services
container.bind<NewUserHandler>(TYPES.NewUserHandler).toSelf();

export default container;