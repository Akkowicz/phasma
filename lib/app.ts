import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/shortenerRoutes";
import * as mongoose from "mongoose";
import { config } from "dotenv";
import { resolve } from "path";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string;

    constructor() {
        this.app = express();
        this.config();        
        this.routePrv.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        config({ path: resolve(__dirname, "../.env") });
        this.mongoUrl = process.env.MONGOURL;
        this.app.set('view engine', 'pug');
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });        
    }

}

export default new App().app;