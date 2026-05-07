import { defineConfig } from "vite";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
          name: "unit",
          environment: "node",
        },
      },
      {
        test: {
          include: [
            "src/ch6-async/7-events/click-listener/*.browser-{test,spec}.{js,jsx,ts,tsx}",
          ],
          name: "browser",
          browser: {
            provider: playwright(),
            enabled: true,
            // headless: true,
            instances: [{ browser: "chromium" }],
            testerHtmlPath: "src/ch6-async/7-events/click-listener/index.html",
          },
        },
      },
    ],
  },
});
