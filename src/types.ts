import AuthorizationService from "./Infraestructure/Services/AuthorizationService";

let TYPES = {
    // Controllers
    UserController: Symbol("UserController"),
    PostController: Symbol("PostController"),
    CommentController: Symbol("CommentController"),

    // Adapters
    NewUserAdapter: Symbol("NewUserAdapter"),
    LogInAdapter: Symbol("LogInAdapter"),
    LogOutAdapter: Symbol("LogOutAdapter"),

    // Sevices
    AuthorizationService: Symbol("AuthorizationService"),
    PasswordHashService: Symbol("PasswordHashService"),

    // Handlers
    NewUserHandler: Symbol("NewUserHandler"),
    NewSessionHandler: Symbol("NewSessionHandler"),
    LogInHandler: Symbol("LogInHandler"),
    LogOutHandler: Symbol("LogOutHandler")
};

export default TYPES;