import fs from 'fs';
import request from 'request';
import { sha256 } from './sha256';

export default function download(url: string){
    let originalFileName;
    let mimeType;
    let relativePath;
    let size;
    let fileName;
    request.head(url, (err, res, body) => {
        originalFileName = url.substring(url.lastIndexOf('/') + 1);
        const extensionDotIndex = originalFileName.lastIndexOf('.' + 1);
        mimeType = url.substring(extensionDotIndex + 1);
        const extension = originalFileName.substring(extensionDotIndex);
        fileName = sha256(originalFileName.substring(0, extensionDotIndex)) + extension;
        relativePath = `./public/uploads/${fileName}`;
        request(url).pipe(fs.createWriteStream(relativePath)).on('close', () => 0);
        const stats = fs.statSync(relativePath);
        size = stats.size;
    });

    return {
        originalFileName,
        mimeType,
        relativePath,
        size,
        fileName
    }
}