import { describe, expect, it } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { AreaGrid, AreaSlot } from "../src/AreaGrid";

describe("AreaGrid", () => {
  it("renders a scoped grid wrapper and style tag", () => {
    const { container } = render(
      <AreaGrid
        areas={{
          base: `
            "a"
            "b"
          `,
        }}
        columns={{ base: "1fr" }}
      >
        <AreaSlot name="a">A</AreaSlot>
        <AreaSlot name="b">B</AreaSlot>
      </AreaGrid>
    );

    const styleEl = container.querySelector("style");
    expect(styleEl).toBeTruthy();

    const gridEl = container.querySelector("[data-area-grid]");
    expect(gridEl).toBeTruthy();
  });

  it("includes breakpoint CSS vars in media queries when provided", () => {
    const { container } = render(
      <AreaGrid
        areas={{
          base: `"a"`,
          lg: `"a a"`,
          "2xl": `"a a a"`,
        }}
        columns={{
          base: "1fr",
          lg: "1fr 1fr",
          "2xl": "1fr 1fr 1fr",
        }}
      >
        <AreaSlot name="a">A</AreaSlot>
      </AreaGrid>
    );

    const css = container.querySelector("style")?.textContent ?? "";
    expect(css).toContain("@media (min-width: var(--breakpoint-lg))");
    expect(css).toContain("@media (min-width: var(--breakpoint-2xl))");
    expect(css).toContain("grid-template-areas");
    expect(css).toContain("grid-template-columns");
  });

  it("does not add unused breakpoint blocks", () => {
    const { container } = render(
      <AreaGrid
        areas={{
          base: `"a"`,
        }}
      >
        <AreaSlot name="a">A</AreaSlot>
      </AreaGrid>
    );

    const css = container.querySelector("style")?.textContent ?? "";
    expect(css).not.toContain("var(--breakpoint-sm)");
    expect(css).not.toContain("var(--breakpoint-md)");
    expect(css).not.toContain("var(--breakpoint-lg)");
    expect(css).not.toContain("var(--breakpoint-xl)");
    expect(css).not.toContain("var(--breakpoint-2xl)");
  });
});
