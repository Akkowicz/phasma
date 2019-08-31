import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UrlSchema = new Schema({
    shortUrl: {
        type: String            
    },
    originalUrl: {
        type: String            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});