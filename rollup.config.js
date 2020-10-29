import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import tsc from 'typescript';
import run from '@rollup/plugin-run';
import pkg from './package.json';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
    input: 'src/index.ts', // our source file
    output: {
        format: 'cjs',
        file: 'dist/index.js',
        sourcemap: true,
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'child_process',
        'fs',
    ],
    plugins: [
        typescript({
            typescript: tsc,
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext',
                },
            },
        }),
        json(),
        terser(), // minifies generated bundles
        dev && run({
            execArgv: ['-r', 'source-map-support/register'],
        }),
    ],
};
