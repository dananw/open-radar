import { describe, it, expect } from "vitest";

// Temporary sanity check confirming the Vitest + jsdom toolchain runs.
// Safe to remove once real tests are added by later tasks.
describe("test tooling sanity", () => {
  it("runs the test runner", () => {
    expect(1 + 1).toBe(2);
  });

  it("provides a jsdom DOM environment", () => {
    const el = document.createElement("div");
    el.textContent = "ok";
    document.body.appendChild(el);
    expect(document.querySelector("div")?.textContent).toBe("ok");
  });
});
