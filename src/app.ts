import express, {Application} from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interfaces'
import ErrorMiddleWare from '@/middleware/error.middleware';
import helmet from 'helmet';

class App {
    public express:Application;
    public port:number;

    constructor(constroller:Controller[],port:number) {
        this.express = express();
        this.port= port

        this.initiliseDataBaseConnections();
        this.initialiseMiddleware();
        this.initialiseController(constroller);
        this.initialiseErrorHandling();
    }

    private initiliseDataBaseConnections() :void {
        const {MONGO_USER,MONGO_PASSWORD,MONGO_PATH} = process.env;
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
    }

    private initialiseMiddleware():void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(compression());
    }

    private initialiseController(constroller:Controller[]):void {
        constroller.forEach((constroller:Controller)=>{
            this.express.use('/api',constroller.router);
        })
    }

    private initialiseErrorHandling():void {
        this.express.use(ErrorMiddleWare);
    }

    public listen():void {
        this.express.listen(this.port,()=>{
            console.log(`App listening on the port ${this.port}`)
        })
    }
}
export default App;