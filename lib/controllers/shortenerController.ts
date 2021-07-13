import * as mongoose from 'mongoose';
import { UrlSchema, UserDoc } from '../models/urlModel';
import { Request, Response } from 'express';
import * as sha256 from 'sha256';
import * as isUrl from 'is-url';

const Url = mongoose.model<UserDoc>('Url', UrlSchema);

export class UrlController {

    public getPanel(req: Request, res: Response) {
        res.render('panel');
    }

    public shortenUrl(req: Request, res: Response) {
        if (!isUrl(req.body.url)) {
            res.send('Incorrect URL!');
        }
        const dbEntry = new Url();
        dbEntry.shortUrl = String(sha256(`${req.body.url}${Date.now()}`)).slice(0,12);
        dbEntry.originalUrl = req.body.url;
        dbEntry.save((err, url) => {
            if (err) {
                res.send(err);
            }
            res.send(`${req.protocol}://${req.get('host')}/link/${dbEntry.shortUrl}`);
        });
    }

    public getOriginalUrl(req: Request, res: Response) {
        Url.findOne({ shortUrl: req.params.shortUrl }, (err, dbEntry) => {
            if (err) {
                res.send(err);
            }
            res.redirect(dbEntry.originalUrl);
        });
    }
}