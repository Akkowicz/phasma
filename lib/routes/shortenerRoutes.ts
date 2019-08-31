import {Request, Response, NextFunction} from "express";
import { UrlController } from "../controllers/shortenerController";

export class Routes { 
    
    public urlController: UrlController = new UrlController();
    
    public routes(app): void {   
        // Contact 
        app.route('/')
        .get(this.urlController.getPanel)
        .post(this.urlController.shortenUrl);

        app.route('/link/:shortUrl')
        .get(this.urlController.getOriginalUrl)
    }
}