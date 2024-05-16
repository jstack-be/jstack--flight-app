import * as crypto from 'crypto';

export default function createMD5Hash(inputString: string): string {
    const hash = crypto.createHash('md5');
    hash.update(inputString);
    return hash.digest('hex');
}