import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.test.ts', 'tests/integration/**/*.test.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
        }
    },
});
