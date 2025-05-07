// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    sequence: {
      concurrent: false // fuerza ejecución en serie entre archivo
    }
  }
});

