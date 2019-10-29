import path from 'path';
import exphbs from 'express-handlebars';
import {inject} from 'inversify';
import {Express, NextFunction, Request, Response} from "express";
import container from "../../inversify.config";
import {UserController} from '../Controllers/UserController';
import {PostController} from "../Controllers/PostController";
import {CommentController} from "../Controllers/CommentController";
import {ErrorHandler} from "../Utils/ErrorHandler";

const auth = require('../Infraestructure/Middlewares/auth');
const bodyParser = require('body-parser');

class Router {
    private express: Express;
    private userController: UserController;
    private postController: PostController;
    private commentController: CommentController;

    constructor(
        express,
        @inject(UserController) userController,
        @inject(PostController) postController,
        @inject(CommentController) commentController
    ) {
        this.express = express;
        this.userController = userController;
        this.postController = postController;
        this.commentController = commentController;
    }

    public up() {
        this.setInitialConfig();
        this.userRoutes();
        this.postRoutes();
        this.commentRoutes();
    }

    private setInitialConfig() {
        this.setErrorHandler();
        this.setBodyParser();
        this.setViewEngine();
    }

    private setErrorHandler() {
        this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            const errorHandler: ErrorHandler = container.get(ErrorHandler);
            errorHandler.handle(err, res);
        });
    }

    private setBodyParser() {
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(bodyParser.json());
    }

    private setViewEngine() {
        this.express.set('views', path.join(__dirname, '..', 'views'));
        this.express.engine('html', exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.express.get('views'), 'layouts'),
            partialsDir: path.join(this.express.get('views'), 'partials'),
            extname: '.html',
        }));
        this.express.set('view engine', 'html');
        /*this.express.set('views', path.join(__dirname, '..', 'views'));
        this.express.engine('hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.express.get('views'), 'layouts'),
            partialsDir: path.join(this.express.get('views'), 'partials'),
            extname: '.hbs',
            helpers: require('../Lib/handlebars')
        }));
        this.express.set('view engine', 'hbs');*/
    }

    private userRoutes() {
        this.express.post('/user/signUp', this.userController.signUp);
        this.express.get('/user/:id', auth, this.userController.getUser);
        this.express.post('/user/logIn', this.userController.logIn);
        this.express.post('/user/logout/:id', auth, this.userController.logout);
    }

    private postRoutes() {
        this.express.get('/post/:id', auth, this.postController.getPost);
        this.express.post('/post/', auth, this.postController.newPost);
        this.express.post('/post/delete/:id', auth, this.postController.deletePost);
        this.express.post('/post/update/:id', auth, this.postController.updatePost);
    }

    private commentRoutes() {
        this.express.get('/post/comment/:id', auth, this.commentController.getComment);
        this.express.post('/post/comment/', auth, this.commentController.newComment);
        this.express.post('/post/comment/delete/:id', auth, this.commentController.deleteComment);
        this.express.post('/post/comment/update/:id', auth, this.commentController.updateComment);
    }
}

export default Router;