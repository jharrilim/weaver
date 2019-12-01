import https from 'https';

export async function getRaw(url: string) {
    return new Promise<{ data: string, status: number }>((resolve, reject) => {
        https.get(url, res => {
            if (!res.statusCode) {
                return reject(Error('Did not receive a status code.'));
            }
            if (res.statusCode >= 300) {
                return reject(Error(`Unable to get:\n${url}\nStatus Code: ${res.statusCode}`));
            }
            res.setEncoding('utf-8');
            let rawData = '';
            res.on('data', chunk => { rawData += chunk; });
            res.on('end', () => {
                resolve({ data: rawData, status: res.statusCode! });
            });
            res.on('error', reject);
        });
    });
}

export default { getRaw };