
type OnTypes = 'push' | 'pull_request';

type On = {
    [key in OnTypes]?: {
        branches?: string[],
        tags?: string[],
        paths?: string[],
    }
};

export interface Workflow {
    name: string,
    on: On | '[push]',
    jobs: {
        [jobName: string]: {
            name: string,
            'runs-on': string,
            steps: {
                name: string,
                uses?: string,
                with?: { [name: string]: string },
                id?: string,
                run?: string,
            }[],
        }
    }
}
