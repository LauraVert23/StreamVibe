import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    {
      name: "custom-middleware",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader("Accept-CH", "Viewport-Width");
          if (req.url?.startsWith("/.well-known")) {
            res.statusCode = 404; 
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
});
