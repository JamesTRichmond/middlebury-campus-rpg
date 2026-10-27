import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const version = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
export default defineConfig({
  define: { __BUILD_VERSION__: JSON.stringify(version) },
  server: { host: "127.0.0.1", port: 4173, strictPort: true },
  preview: { host: "127.0.0.1", port: 4173, strictPort: true },
  build: {
    rollupOptions: { input: {
      game: fileURLToPath(new URL("./index.html", import.meta.url)),
      feedback: fileURLToPath(new URL("./feedback/index.html", import.meta.url)),
    } },
  },
});
