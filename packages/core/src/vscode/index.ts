import path from 'path';
import { promises as fs, constants as fsConstants } from 'fs';
import { CodeWorkspace } from './code-workspace';

const workspaceExt = '.code-workspace';

export async function initializeWorkspace(dirPath: string, projectName: string) {
    return await Promise.all([
        async () => {
            const tasksPath = path.join(dirPath, '.vscode', 'tasks.json');
            await fs.mkdir(path.join(dirPath, '.vscode'));
            try {
                await fs.access(tasksPath, fsConstants.F_OK);
            } catch {
                return await fs.writeFile(path.join(dirPath, '.vscode', 'tasks.json'), '{}');
            }
        },
        async () => {
            const workspacePath = path.join(dirPath, projectName + workspaceExt);
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
        },

    ]);
}
