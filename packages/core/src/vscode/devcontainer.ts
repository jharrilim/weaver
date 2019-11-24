import http from 'http';
import path from 'path';

import { promises as fs } from 'fs';


// TODO: Can add more later
type DevcontainerKind = 'typescript-node-12' | 'javascript-node-12';

export async function initializeDevcontainer(dirPath: string, kind: DevcontainerKind) {
    const request = new Promise<string>((resolve, reject) => {
        const url =
            `https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/containers/${kind}/.devcontainer`;
        http.get(`${url}/Dockerfile`, res => {
            if (res.statusCode !== 200) {
                reject(new Error(`Unable to get Dockerfile at:\n${url}/Dockerfile.\nStatus Code: ${res.statusCode}`));
            }
            res.setEncoding('utf-8');
            let rawData = '';
            res.on('data', chunk => { rawData += chunk; });
            res.on('end', () => {
                resolve(rawData);
            });
            res.on('error', reject);
        });
    });

    const devcontainerPath = path.join(dirPath, '.devcontainer');
    const [response] = await Promise.all([
        request,
        fs.mkdir(devcontainerPath)
    ]);

    return await fs.writeFile(path.join(dirPath, '.devcontainer'), response);
}
