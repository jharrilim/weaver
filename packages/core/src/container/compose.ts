import yaml from 'js-yaml';
import path from 'path';

import { promises as fs, constants as fsConstants } from 'fs';

export async function initializeCompose(dirPath: string) {
    const composePath = path.join(dirPath, 'docker-compose.yml');
    try {
        await fs.access(composePath, fsConstants.F_OK);
    } catch {
        const compose = {
            version: '3.7',
            services: {

            }
        }
        await fs.writeFile(composePath, yaml.safeDump(compose));
    }
}
