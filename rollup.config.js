const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const json = require('rollup-plugin-json');
const tsc = require('typescript');
const run = require('@rollup/plugin-run');
const pkg = require('./package.json');

const dev = process.env.ROLLUP_WATCH === 'true';

module.exports = {
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
        }),
        json(),
        terser(), // minifies generated bundles
        dev && run({
            execArgv: ['-r', 'source-map-support/register'],
        }),
    ],
};
