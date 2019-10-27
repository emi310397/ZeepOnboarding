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
        this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            const errorHandler: ErrorHandler = container.get(ErrorHandler);
            errorHandler.handle(err, res);
        });
        this.setBodyParser();
        this.setViewEngine();
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
        //-------------Home-------------
        this.express.get('/', (req, res) => {
            res.send("Home page");
        });

        //-------------User-------------
        this.express.get('/user/signup', UserController.showSignUp);
        this.express.post('/user/signup', UserController.signUp);
        this.express.get('/user/:id', auth, UserController.getUser);
        this.express.post('/user/logIn', UserController.logIn);
        this.express.post('/user/logout/:id', auth, UserController.logout);
    }

    private postRoutes() {
        this.express.get('/post/:id', auth, PostController.getPost);
        this.express.post('/post/', auth, PostController.newPost);
        this.express.post('/post/delete/:id', auth, PostController.deletePost);
        this.express.post('/post/update/:id', auth, PostController.updatePost);
    }

    private commentRoutes() {
        this.express.get('/post/comment/:id', auth, CommentController.getComment);
        this.express.post('/post/comment/', auth, CommentController.newComment);
        this.express.post('/post/comment/delete/:id', auth, CommentController.deleteComment);
        this.express.post('/post/comment/update/:id', auth, CommentController.updateComment);
    }
}

export default Router;