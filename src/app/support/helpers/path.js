import path from 'path'
import url from 'url'
import fs from 'fs'

export const SRC_DIR_PATH = path.join(path.dirname(url.fileURLToPath(import.meta.url)),'../../..');

export function app_path(...subpath){
    return path.join(SRC_DIR_PATH, ...subpath)
}

export function view(filepath){
    return app_path('views',filepath)
}


export async function getFilesFrom(...subpath){
    const _dir = app_path(...subpath);

    return await new Promise((resolve, reject)=>{
        fs.readdir(_dir, (err, files) => {
            if(err) reject(err);
            resolve(files);
        });
    });
}