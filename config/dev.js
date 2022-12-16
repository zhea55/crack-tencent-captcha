#!/usr/bin/env node

import esbuildServe from 'esbuild-serve'

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['src/app.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/js/bundle.js',
    plugins: [],
    loader: {
      '.png': 'file',
      '.jpg': 'file',
    },
    sourcemap: true,
  },
  {
    // serve options (optional)
    port: 4000,
    root: './dist/',
  }
)
