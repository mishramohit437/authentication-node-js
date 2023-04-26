import { Request,Response,NextFunction } from "express"
import {verifyToken} from '@/utils/token';
import userModel from "@/resources/user/user.model";
import Token from "@/utils/interfaces/token.interface";
import HttpException from "@/utils/exceptions/http.exceptions";
import Jwt,{verify} from "jsonwebtoken";

async function authenticatedMiddleware(req:Request,res:Response,next:NextFunction):Promise<Response|void> {
    const bearer = req.headers.authorization;

    if(!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({error:'Unauthorised'});
    }

    const accessToken = bearer.split('Bearer ')[1].trim();

    try {
        const payload:Token|Jwt.JsonWebTokenError = await verifyToken(accessToken);

        if(payload instanceof Jwt.JsonWebTokenError) {
            return next( new HttpException(401,'Unauthorised'));
        }

        const user = await userModel.findById(payload.id).select('-password').exec();

        if(!user) {
            return next( new HttpException(401,'Unauthorised'));
        }
        req.user = user;

        return next();
    } catch (error) {
        return next( new HttpException(401,'Unauthorised'));
    }
}

export default authenticatedMiddleware