import yaml from 'yaml';
import { promises as fs } from 'fs';

export const readYmalFile = async (fileName: string, encoding: BufferEncoding = 'utf-8') => yaml.parse((await (await fs.readFile(fileName)).toString(encoding)));

export const s = async (fn: () => Promise<void>) => {
    await fn();
};
