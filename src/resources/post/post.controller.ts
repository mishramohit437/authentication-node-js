import { Router,Request,Response,NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interfaces";
import HttpException from "@/utils/exceptions/http.exceptions";
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.intialseRouter();
    }

    private intialseRouter():void{
        this.router.post(
            `${this.path}`,validationMiddleware(validate.create),
            this.create
        )
    }

    private create =async (req:Request,res:Response,next:NextFunction):Promise<Response|void> => {
        console.log(req.body);
        try {
            const {title,body} = req.body;
            const post = await this.PostService.create(title,body);
            res.status(201).json({post});
        } catch (error) {
            console.log(error);
            next( new HttpException(400,'Cannot create post'));
        }
    }
}

export default PostController;