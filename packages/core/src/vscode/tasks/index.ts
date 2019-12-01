
import { promises as fs } from 'fs';
import { TaskDescription, TaskConfiguration } from './tasks-schema';

export async function readTasks(tasksPath: string): Promise<TaskConfiguration> {
    const tasks = (await fs.readFile(tasksPath)).toString();
    return JSON.parse(tasks) as TaskConfiguration;
}

export async function addTask(tasksPath: string, taskSchema: TaskDescription) {
    const taskConfig = await readTasks(tasksPath);
    if (!taskConfig.tasks) {
        taskConfig.tasks = [];
    }
    taskConfig.tasks.push(taskSchema);
    return await fs.writeFile(tasksPath, JSON.stringify(taskConfig, null, 4));
}