
type OnTypes = 'check_run'
    | 'check_suite'
    | 'create'
    | 'delete'
    | 'deployment'
    | 'deployment_status'
    | 'fork'
    | 'gollum'
    | 'issue_comment'
    | 'issues'
    | 'label'
    | 'member'
    | 'milestone'
    | 'page_build'
    | 'project'
    | 'project_card'
    | 'project_column'
    | 'public'
    | 'pull_request'
    | 'pull_request_review'
    | 'pull_request_review_comment'
    | 'push'
    | 'release'
    | 'status'
    | 'watch'
    | 'repository_dispatch';

type On = {
    [key in OnTypes]?: {
        branches?: string[],
        tags?: string[],
        paths?: string[],
    }
};

type RunsOn = '${{ matrix.os }}'
    | 'macos-latest'
    | 'self-hosted'
    | 'ubuntu-16.04'
    | 'ubuntu-18.04'
    | 'ubuntu-latest'
    | 'windows-latest';

export interface Job {
    name: string;
    'runs-on': RunsOn;
    steps: {
        name: string;
        uses?: string;
        with?: { [name: string]: string };
        id?: string;
        run?: string;
    }[];
}

export interface Workflow {
    name: string;
    on: On | OnTypes | OnTypes[];
    jobs: {
        [jobName: string]: Job;
    }
}
