import path from 'path';
import { promises as fs } from 'fs';
import { NodeServiceConfig } from './config';
import childProcess from 'child_process';
import { promisify } from 'util';
const exec = promisify(childProcess.exec);

function safeAddScripts(packageJson: any, config: NodeServiceConfig) {
    if (!packageJson.scripts)
        packageJson.scripts = {};
    if (config.isTypescript) {
        if (!packageJson.scripts['start'])
            packageJson.scripts['start'] = 'tsc && node dist';
        if (!packageJson.scripts['build'])
            packageJson.scripts['build'] = 'tsc';
        if (!packageJson.scripts['build:prod'])
            packageJson.scripts['build:prod'] = 'tsc -p tsconfig.production.json';
    }
    return packageJson;
}

export async function initializePackageJson(
    dirPath: string,
    config: NodeServiceConfig
) {
    const fh = await fs.open(
        path.join(dirPath, 'package.json'),
        'a+' /* read/append, create if doesn't exist */
    );
    try {
        const f = (await fh.readFile()).toString();
        const packageJson = JSON.parse(f.toString());
        await fh.writeFile(
            JSON.stringify(safeAddScripts(packageJson, config), null, 2)
        );
    } catch (e) {
        if (!(e instanceof SyntaxError)) {
            throw e;
        }
        await fh.writeFile(
            JSON.stringify(safeAddScripts({}, config), null, 2)
        );
    } finally {
        await fh.close();
    }

}

export async function writeGitignore(dirPath: string, config: NodeServiceConfig) {
    const gitignore = (await fs.readFile(path.join(__dirname, 'node.gitignore'))).toString();
    const gitignorePath = path.join(dirPath, '.gitignore');
    if (config.isTypescript) {
        return await fs.writeFile(gitignorePath, gitignore + '\nlib\n');
    }
    return await fs.writeFile(gitignorePath, gitignore);
}

export async function initializeProjectStructure(
    dirPath: string,
    config: NodeServiceConfig
) {
    if (config.isTypescript) {
        return await Promise.all([
            fs.mkdir(path.join(dirPath, 'src')),
            exec(`cd ${dirPath} && tsc --init`)
        ]);
    }
    return await Promise.all([
        fs.mkdir(path.join(dirPath, 'lib')),
    ]);
}
