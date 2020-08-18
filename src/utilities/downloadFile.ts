import fs from 'fs';
import request from 'request';
import sjcl from 'sjcl';

export default function download(url: string){
    return request.head(url,(err, res, body) => {
        const originalFileName = url.substring(url.lastIndexOf('/') + 1);
        const extensionDotIndex = originalFileName.lastIndexOf('.');
        const extension = originalFileName.substring(extensionDotIndex);
        const bitArray = sjcl.hash.sha256.hash(originalFileName.substring(0, extensionDotIndex));
        const hash = sjcl.codec.hex.fromBits(bitArray);
        const fileName = hash + extension;
        const relativePath = `./public/uploads/${fileName}`;
        request(url).pipe(fs.createWriteStream(relativePath)).on('close', () => 0);
    }).toJSON();
}