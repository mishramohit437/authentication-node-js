import { Request,Response,NextFunction } from "express";
import HttpException from '@/utils/exceptions/http.exceptions'

function ErrorMiddleWare(
    error:HttpException,
    req:Request,
    res:Response,
    next:NextFunction
):void {
    const status = error.status || 500;
    const message = error.message || 'something went wrong'

    res.status(status).send({
        status,
        message
    })
}

export default ErrorMiddleWare