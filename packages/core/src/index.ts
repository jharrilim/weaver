import { createConfig, makePackagesDir } from './project';

export function initialize(path = process.cwd()) {
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

