import { createConfig, makePackagesDir } from './project';
import { promises as fs, constants as fsConstants } from 'fs';

export function initialize(path = process.cwd()) {
    fs.access(path, fsConstants.F_OK)
        .catch(() => fs.mkdir(path, { recursive: true }));    
    process.chdir(path);
    Promise.all([
        createConfig(path),
        makePackagesDir(path),

    ])
    return createConfig(path);
}

export function createMicroservice() {
    // 
}

