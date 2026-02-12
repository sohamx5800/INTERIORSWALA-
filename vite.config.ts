import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file from directory based on `mode`
  // The third parameter '' loads all env vars regardless of prefix
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Map the environment variable to process.env for compatibility with the GenAI SDK usage
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    },
    server: {
      port: 5173,
      strictPort: true,
    }
  };
});