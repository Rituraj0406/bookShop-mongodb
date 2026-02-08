import { unlink } from 'fs';

const deletedFile = (filePath) => {
    if (!filePath) {
        return;
    }
    // Don't try to unlink remote URLs
    if (typeof filePath === 'string' && (filePath.startsWith('http://') || filePath.startsWith('https://'))) {
        return;
    }
    unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to delete file:', filePath, err);
        }
    });
}

const _deletedFile = deletedFile;
export { _deletedFile as deletedFile };