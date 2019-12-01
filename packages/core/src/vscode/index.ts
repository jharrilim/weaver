import path from 'path';
import { promises as fs, constants as fsConstants } from 'fs';
import { CodeWorkspace } from './code-workspace';

const workspaceExt = '.code-workspace';

async function initializeVscodeDirectory(dotVscodeDirPath: string) {
    const tasksPath = path.join(dotVscodeDirPath, 'tasks.json');
    await fs.mkdir(dotVscodeDirPath, { recursive: true });
    try {
        await fs.access(tasksPath, fsConstants.F_OK);
    } catch {
        return await fs.writeFile(tasksPath, '{}');
    }
}

async function initializeVscodeWorkspace(workspacePath: string) {
    try {
        await fs.access(workspacePath, fsConstants.F_OK);
    } catch {
        const workspace: CodeWorkspace = {
            folders: [
                { path: '.' }
            ],
            settings: {}
        };
        return await fs.writeFile(workspacePath, JSON.stringify(workspace, null, 4));
    }
}

export async function initializeWorkspace(dirPath: string, projectName: string) {
    const vscodePath = path.join(dirPath, '.vscode');
    const workspacePath = path.join(dirPath, projectName + workspaceExt);

    return await Promise.all([
        initializeVscodeDirectory(vscodePath),
        initializeVscodeWorkspace(workspacePath)
    ]);
}
