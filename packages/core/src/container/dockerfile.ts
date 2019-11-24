import path from 'path';
import { Liquid } from 'liquidjs';
import yaml from 'js-yaml';

import { promises as fs } from 'fs';


interface CreateDockerfileOpts {
    isTypescript: boolean
}

export async function createDockerfile(dirPath: string, { isTypescript = true }: CreateDockerfileOpts) {
    const f = (await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'Dockerfile.liquid'))).toString();
    const dockerfile = await new Liquid().parseAndRender(f, { isTypescript });
    return fs.writeFile(dirPath, dockerfile);
}
