import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/index.spec.ts'], // solo ejecuta este
    coverage: {
      reporter: ['text', 'lcov'],
      all: true,
      include: ['src/**/*.ts'],
    },
  },
});
