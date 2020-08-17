import fs from 'fs';
import request from 'request';
import { sha256 } from './sha256';

export default function download(url: string){
    return request.head(url,(err, res, body) => {
        const originalFileName = url.substring(url.lastIndexOf('/') + 1);
        const extensionDotIndex = originalFileName.lastIndexOf('.');
        const extension = originalFileName.substring(extensionDotIndex);
        const fileName = sha256(originalFileName.substring(0, extensionDotIndex)) + extension;
        const relativePath = `./public/uploads/${fileName}`;
        request(url).pipe(fs.createWriteStream(relativePath)).on('close', () => 0);
    }).toJSON();
}