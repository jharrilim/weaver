import path from 'path';
import https from '../https';

import { promises as fs } from 'fs';


// TODO: Can add more later
type DevcontainerKind = 'typescript-node-12' | 'javascript-node-12';

export async function initializeDevcontainer(dirPath: string, kind: DevcontainerKind) {
    const devcontainerUrl =
        `https://raw.githubusercontent.com/microsoft/vscode-dev-containers` + 
        `/master/containers/${kind}/.devcontainer`;

        const devcontainerPath = path.join(dirPath, '.devcontainer');

    await fs.mkdir(devcontainerPath, { recursive: true });

    return await Promise.all([
        https.getRaw(devcontainerUrl + '/Dockerfile')
            .then(({ data: dockerfile }) => 
                fs.writeFile(path.join(devcontainerPath, 'Dockerfile'), dockerfile)),
        https.getRaw(devcontainerUrl + '/devcontainer.json')
            .then(({ data: devcontainerJson}) => 
                fs.writeFile(path.join(devcontainerPath, 'devcontainer.json'), devcontainerJson)),
    ]);
}
