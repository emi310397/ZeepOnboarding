import {Request, Response} from 'express';
import {User} from "../../Domain/Entities/User";
import {Category} from "../../Domain/Entities/Category";
import {Post} from "../../Domain/Entities/Post";

export class PostController {

    public static async getPost(req: Request, res: Response) {
        const {id} = req.params;

        const post = await Post.findOne(id);

        if (!post) {
            res.status(401).json("The post doesn't exist.");
        }

        res.status(200).json({post});
    }

    public static async newPost(req: Request, res: Response) {
        const {userId, title, content, categoryName} = req.body;

        const user = await User.findOne({id: userId});

        if (!user) {
            res.status(401).json("The user doesn't exist.");
        }

        let category = await Category.findOne({name: categoryName});
        if (!category) {
            category = new Category();
            category.name = categoryName;
            try {
                await category.save();
            } catch (error) {
                res.status(500).json(error);
            }
        }

        let post = new Post();
        post.title = title;
        post.content = content;
        post.user = user;
        post.category = category;

        try {
            await post.save();
            res.status(200).json({message: "Post created.", post});
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async deletePost(req: Request, res: Response) {
        const {id} = req.params;

        const post = await Post.findOne(id);

        if (!post) {
            res.status(401).json("The post doesn't exist.");
        }

        await post.remove();

        res.status(200).json("Post deleted");
    }

    public static async updatePost(req: Request, res: Response) {
        const {id} = req.params;
        const {title, content, categoryName} = req.body;

        const post = await Post.findOne(id);

        if (!post) {
            res.status(401).json("The post doesn't exist.");
        }

        let category = await Category.findOne({name: categoryName});
        if (!category) {
            category = new Category();
            category.name = categoryName;
            try {
                await category.save();
            } catch (error) {
                res.status(500).json(error);
            }
        }

        post.title = title;
        post.content = content;
        post.category = category;

        try {
            await post.save();
            res.status(200).json({message: "Post updated.", post});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
