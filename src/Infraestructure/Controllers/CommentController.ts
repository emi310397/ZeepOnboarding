import {Request, Response} from 'express';
import {User} from "../../Domain/Entities/User";
import {Comment} from "../../Domain/Entities/Comment";
import {Post} from "../../Domain/Entities/Post";
import {injectable} from "inversify";

@injectable()
export class CommentController {

    public async getComment(req: Request, res: Response) {
        const {id} = req.params;

        const comment = await Comment.findOne(id);

        if (!comment) {
            res.status(401).json("The comment doesn't exist.");
        }

        res.status(200).json({comment});
    }

    public async newComment(req: Request, res: Response) {
        const {userId, postId, content} = req.body;

        const user = await User.findOne({id: userId});

        if (!user) {
            res.status(401).json("The user doesn't exist.");
        }

        const post = await Post.findOne({id: postId});

        if (!post) {
            res.status(401).json("The post doesn't exist.");
        }

        let comment = new Comment();
        comment.content = content;
        comment.user = user;
        comment.post = post;

        try {
            await comment.save();
            res.status(200).json({message: "comment created.", comment});
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteComment(req: Request, res: Response) {
        const {id} = req.params;

        const comment = await Comment.findOne(id);

        if (!comment) {
            res.status(401).json("The comment doesn't exist.");
        }

        await comment.remove();

        res.status(200).json("Comment deleted");
    }

    public async updateComment(req: Request, res: Response) {
        const {id} = req.params;
        const content = req.body;

        const comment = await Comment.findOne(id);

        if (!comment) {
            res.status(401).json("The comment doesn't exist.");
        }

        comment.content = content;

        try {
            await comment.save();
            res.status(200).json({message: "Comment updated.", comment});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
