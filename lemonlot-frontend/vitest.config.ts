import path from "path"
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // Enables global functions like describe, it, etc.
    environment: 'jsdom',  // Set the test environment to jsdom
    setupFiles: './src/setupTests.ts',  // Path to the setup file
    coverage: {
      reporter: ['text', 'json-summary', 'json'], // Include the desired reporters
      // Other coverage options can be configured here
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
