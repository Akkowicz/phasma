import app from './app';
import * as https from 'https';
import * as fs from 'fs';
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});