const path = require('path');
// const url = require('url');
const fs = require('fs');

// export const SRC_DIR_PATH = path.join(path.dirname(url.fileURLToPath(import.meta.url)),'../../..');
const SRC_DIR_PATH = path.join(__dirname,'../../..');

function app_path(...subpath){
    return path.join(SRC_DIR_PATH, ...subpath)
}

function view(filepath){
    return app_path('views',filepath)
}


async function getFilesFrom(...subpath){
    const _dir = app_path(...subpath);

    return await new Promise((resolve, reject)=>{
        fs.readdir(_dir, (err, files) => {
            if(err) reject(err);
            resolve(files);
        });
    });
}

module.exports = {
    SRC_DIR_PATH, app_path, view, getFilesFrom
}