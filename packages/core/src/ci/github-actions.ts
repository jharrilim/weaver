import path from 'path';
import yaml from 'js-yaml';

import { promises as fs } from 'fs';
import { findWeaverConfig } from '../project';
import { Workflow, Job } from './workflow';

const defaultWorkflowName = 'ci-workflow.yml';

const exampleJob: Job = {
    name: 'Example Job',
    'runs-on': 'ubuntu-latest',
    steps: [
        {
            name: 'Job Step 1',
            run: 'echo "Your workflow has been created!"'
        }
    ]
};

const initialWorkflow: Workflow = {
    name: 'Build',
    on: ['push'],
    jobs: {
        example: exampleJob
    },
};

export async function initializeGithubDir(projectDirPath: string) {
    return await fs.mkdir(
        path.join(projectDirPath, '.github', 'workflows'),
        { recursive: true }
    );
}

export function createBuildWorkflow(
    projectDirPath: string,
    workflowName = defaultWorkflowName
) {
    return fs.writeFile(
        path.join(projectDirPath, '.github', 'workflows', workflowName),
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

export async function initializeActions(projectDirPath: string) {
    await initializeGithubDir(projectDirPath);
    await createBuildWorkflow(projectDirPath);
} 