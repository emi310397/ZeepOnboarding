import {Container} from "inversify";
import TYPES from "./types";
import {UserController} from "./Infraestructure/Controllers/UserController";
import {PostController} from "./Infraestructure/Controllers/PostController";
import {CommentController} from "./Infraestructure/Controllers/CommentController";
import NewUserHandler from "./Domain/Handlers/UserHandler/NewUserHandler";
import NewUserAdapter from "./Infraestructure/Adapters/UserAdapters/NewUserAdapter";
import LogInAdapter from "./Infraestructure/Adapters/UserAdapters/LogInAdapter";
import NewSessionHandler from "./Domain/Handlers/UserHandler/NewSessionHandler";
import LogInHandler from "./Domain/Handlers/UserHandler/LogInHandler";
import AuthorizationService from "./Infraestructure/Services/AuthorizationService";
import PasswordHashService from "./Infraestructure/Services/PasswordHashService";
import LogOutAdapter from "./Infraestructure/Adapters/UserAdapters/LogOutAdapter";
import LogOutHandler from "./Domain/Handlers/UserHandler/LogOutHandler";

var container = new Container();

// Controllers
container.bind<UserController>(TYPES.UserController).toSelf();
container.bind<PostController>(TYPES.PostController).toSelf();
container.bind<CommentController>(TYPES.CommentController).toSelf();

// Adapters
container.bind<NewUserAdapter>(TYPES.NewUserAdapter).toSelf();
container.bind<LogInAdapter>(TYPES.LogInAdapter).toSelf();
container.bind<LogOutAdapter>(TYPES.LogOutAdapter).toSelf();

// Services
container.bind<AuthorizationService>(TYPES.AuthorizationService).toSelf();
container.bind<PasswordHashService>(TYPES.PasswordHashService).toSelf();

// Handlers
container.bind<NewUserHandler>(TYPES.NewUserHandler).toSelf();
container.bind<NewSessionHandler>(TYPES.NewSessionHandler).toSelf();
container.bind<LogInHandler>(TYPES.LogInHandler).toSelf();
container.bind<LogOutHandler>(TYPES.LogOutHandler).toSelf();

export default container;