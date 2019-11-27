import { initialize } from '@weaver/core';
import { tmpdir } from 'os';
import { join } from 'path';

export async function init() {
    return await initialize(join(tmpdir(), 'weavertest'));
}

init()
    .catch(console.error);
