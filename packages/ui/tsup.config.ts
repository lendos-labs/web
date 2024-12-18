import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
  // entry: ['src/index.ts'],
  // format: ['esm', 'cjs'],
  // dts: true,
  // external: ['react', 'react-dom', '@mui/material', /^@emotion/],
  // splitting: false,
  // minify: true,
  // clean: true,
  // tsconfig: 'tsconfig.prod.json',
  entry: ['src/index.ts'], // Adjust entry points as needed
  format: ['esm', 'cjs'], // Specify desired output formats
  splitting: false, // Optional: Disable code splitting if needed
  clean: true, // Clean output directory before build
  dts: true, // Generate TypeScript declaration files
  esbuildOptions(options) {
    // Ensure 'use client' directives are preserved
    options.banner = {
      js: '"use client";',
    };
  },
  tsconfig: 'tsconfig.prod.json',
});

// eslint-disable-next-line import/no-default-export
export default tsupConfig;
