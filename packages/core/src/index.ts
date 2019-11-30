import { createConfig, makePackagesDir } from './project';
import { promises as fs } from 'fs';

export async function initialize(path: string) {    
    await fs.access(path)
        .catch(() => fs.mkdir(path, { recursive: true }));

    return await Promise.all([
        createConfig(path),
        makePackagesDir(path),

    ]);
}

export function createMicroservice() {
    // 
}

