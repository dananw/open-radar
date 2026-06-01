import { defineConfig } from "vitest/config";

// Dev-only test configuration for the site-redesign work.
// Uses the jsdom environment so DOM-dependent assertions (Testing Library,
// theme/script behavior) can run, while pure-logic and property tests
// (fast-check) run in the same suite. No runtime/bundle dependency is added.
export default defineConfig({
  test: {
    // jsdom provides a DOM for component/DOM-dependent assertions.
    environment: "jsdom",
    globals: true,
    // Property-based and example/integration tests live under test/.
    include: ["test/**/*.{test,spec}.{ts,tsx}"],
  },
});
