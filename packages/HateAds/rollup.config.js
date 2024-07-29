import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import importResolver from "rollup-plugin-import-resolver";

export default {
    // any <script type="module"> inside will be bundled by rollup
    input: './index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife', // Suitable for <script> tags in browsers
    },
    plugins: [
        json(),
        importResolver({
            extensions: ['.js', '.ts'],
            indexFile: 'index',
            modulesDir: '../../node_modules',
        }),
        typescript({ tsconfig: './tsconfig.json' }),
        copy({
            targets: [
                { src: './src/**/*.{html,css}', dest: 'dist' },
                { src: './src/assets/**/*.{png,jpg,jpeg,gif,svg}', dest: 'dist' },
                { src: './src/manifest.json', dest: 'dist' },
            ],
            verbose: true,
            flatten: false
        }),
        nodeResolve({
            extensions: ['.ts'],
        }),
        commonjs()
    ]
};