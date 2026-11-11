/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/4.1.4/",
  plugins: [react(), svgr()],
});
