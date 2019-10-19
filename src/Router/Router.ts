import {UserController} from '../Controllers/UserController';
import {PostController} from "../Controllers/PostController";
import path from 'path';
import exphbs from 'express-handlebars';
const auth = require('../Middlewares/auth');
const bodyParser = require('body-parser');

class Router {

    private express;

    constructor(express){
        this.express = express;
    }

    public up(){
        this.setInitialConfig();
        this.userRoutes();
        this.postRotes();
    }

    private setInitialConfig(){
        this.setBodyParer();
        this.setViewEngine();
    }

    private setBodyParer(){
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(bodyParser.json());
    }

    private setViewEngine(){
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

    private userRoutes(){
        //-------------Home-------------
        this.express.get('/', (req, res) => {
            res.send("Home page");
        });

        //-------------User-------------
        this.express.get('/user/signup', UserController.showSignUp);
        this.express.post('/user/signup', UserController.signUp);

        this.express.post('/user/logIn', UserController.logIn);
        this.express.get('/user/:id', auth, UserController.getUser);

        this.express.post('/user/logout/:id', auth, UserController.logout);
    }

    private postRotes(){
        this.express.get('/post/:id', auth, PostController.getPost);
        this.express.post('/post/', auth, PostController.newPost);
        this.express.post('/post/delete/:id', auth, PostController.deletePost);
        this.express.post('/post/update/:id', auth, PostController.updatePost);
    }
}

export default Router;