import { initialize } from '@weaver/core';
import { tmpdir } from 'os';
import { join } from 'path';

export async function init() {
    const path = join(tmpdir(), 'weavertest');
    return await initialize(path);
}

if(__filename == process.mainModule!.filename)
    init()
        .catch(console.error);
