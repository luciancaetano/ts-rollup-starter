import path from 'path';
import { readYmalFile, s } from './utils';

s(async () => {
    const dnsConf = await readYmalFile(path.join(process.cwd(), 'buildconf.yaml'));

    console.log(JSON.stringify(dnsConf, null, '\t'));
});
