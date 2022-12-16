#!/usr/bin/env node

import esbuild from 'esbuild'


esbuild
  .build({
    logLevel: 'info',
    entryPoints: ['src/findMostSimilarRect.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/js/bundle.js',
    plugins: [],
    minify: true
  })
  .catch(() => process.exit(1))
