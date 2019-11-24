import path from 'path';
import yaml from 'js-yaml';

import { promises as fs } from 'fs';
import { findWeaverConfig } from '../project';
import { Workflow } from './workflow';

const defaultWorkflowName = 'ci-workflow.yml';

const initialWorkflow: Workflow = {
    name: 'Build',
    on: '[push]',
    jobs: {

    },
};

export async function initializeGithubDir(dirPath: string) {
    await fs.mkdir(path.join(dirPath, '.github'));
    await fs.mkdir(path.join(dirPath, '.github', 'workflows'));
}

export function createBuildWorkflow(
    githubDirPath: string,
    workflowName = defaultWorkflowName
) {
    return fs.writeFile(
        path.join(githubDirPath, 'workflows', workflowName),
        yaml.safeDump(initialWorkflow)
    );
}

export async function addBuildJob(
    githubDirPath: string,
    workflowName = defaultWorkflowName
) {
    const file = (await fs.readFile(path.join(githubDirPath, workflowName)))
        .toString();
    yaml.safeLoad(file);
}
