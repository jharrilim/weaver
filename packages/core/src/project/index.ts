import path from 'path';
import yaml from 'js-yaml';

import { WeaverConfig } from './config';
import { promises as fs } from 'fs';
const { readFile } = fs;

function pathPop(p: string): string {
    p = path.parse(p).dir;
    const pArr = p.split(path.sep);
    pArr.pop();
    return pArr.join(path.sep);
}

export async function findWeaverConfig(p: string): Promise<{ path: string, type: 'yml' | 'json' }> {
    let parsedPath = path.parse(p);
    // Check first if the path is a file path to a weaver config
    if (parsedPath.name === 'weaver' && parsedPath.ext !== '') {
        const type = parsedPath.ext.split('.')[1]; // split .txt => [1] ['', 'txt'] => 'txt' 
        if (type === 'yaml' || type === 'yml' || type === 'json') {
            return { path: parsedPath.dir + parsedPath.base, type: type === 'yaml' ? 'yml' : type };
        }
    }

    // if path is dir, check the files in the dir for a weaver config
    while (p !== '') {
        const dir = await fs.readdir(parsedPath.dir);
        for (let file of dir) {
            const fp = path.parse(path.join(parsedPath.dir, file));
            if (fp.name === 'weaver' && fp.ext !== '') {
                const type = parsedPath.ext.split('.')[1]; // split .txt => [1] ['', 'txt'] => 'txt' 
                if (type === 'yaml' || type === 'yml' || type === 'json') {
                    return { path: parsedPath.dir + parsedPath.base, type: type === 'yaml' ? 'yml' : type };
                }
            }
        }
        p = pathPop(p);
        parsedPath = path.parse(p);
    }

    throw 'Could not find any Weaver configuration file.';
}

export async function readConfig(): Promise<WeaverConfig> {
    const p = await findWeaverConfig(process.cwd());
    const file = (await readFile(p.path)).toString();
    switch (p.type) {
        case 'yml':
            return yaml.safeLoad(file) as WeaverConfig;
        case 'json':
        default:
            return JSON.parse(file) as WeaverConfig;
    }
}

export async function makePackagesDir(dirPath: string) {
    const packagesPath = path.join(dirPath, 'packages');
    try {
        await fs.access(packagesPath);
    } catch {
        return fs.mkdir(packagesPath);
    }
}

export async function createConfig(dirPath: string, opts = {}) {
    return fs.writeFile(path.join(dirPath, 'weaver.json'), JSON.stringify(opts, null, 2));
}
