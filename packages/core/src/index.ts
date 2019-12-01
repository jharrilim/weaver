import { createConfig, makePackagesDir } from './project';
import { promises as fs } from 'fs';
import { initializeWorkspace } from './vscode';
import { parse } from 'path';
import { initializeDevcontainer } from './vscode/devcontainer';
import { initializeActions } from './ci/github-actions';

export async function initialize(projectPath: string) {    
    await fs.access(projectPath)
        .catch(() => fs.mkdir(projectPath, { recursive: true }));
    const { name } = parse(projectPath);
    return await Promise.all([
        createConfig(projectPath),
        makePackagesDir(projectPath),
        initializeWorkspace(projectPath, name),
        initializeDevcontainer(projectPath, 'typescript-node-12'),
        initializeActions(projectPath),
    ]);
}

export function createMicroservice() {
    // 
}

