import React, { PropsWithChildren, useId, useMemo } from "react";

const rootStyle: React.CSSProperties = {
  display: 'grid',
  width: '100%',
  minWidth: 0,
};

const slotStyle: React.CSSProperties = { minWidth: 0 };

type BreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

type Responsive<T> = Partial<Record<BreakpointKey, T>>;

export type AreaGridProps = PropsWithChildren<{
  areas: Responsive<string>;
  columns?: Responsive<string>;
  rows?: Responsive<string>;
  gap?: string;
  alignItems?: React.CSSProperties["alignItems"];
  justifyItems?: React.CSSProperties["justifyItems"];
  className?: string;
  breakpoints?: Partial<Record<Exclude<BreakpointKey, "base">, string>>;
}>;

const DEFAULT_BREAKPOINTS: Record<Exclude<BreakpointKey, "base">, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
};

function cssEscapeAttr(value: string): string {
  // Minimal escaping for attribute selector usage.
  return value.replace(/"/g, '\\"');
}

function ruleBlock(selector: string, decls: Record<string, string | undefined>) {
  const body = Object.entries(decls)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: ${v};`)
    .join("\n");

  return body ? `${selector} {\n${body}\n}\n` : "";
}

export function AreaGrid({
  areas,
  columns,
  rows,
  gap = "1rem",
  alignItems,
  justifyItems,
  className,
  breakpoints,
  children,
}: AreaGridProps) {
  const reactId = useId();
  const scope = useMemo(() => `ag-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [reactId]);
  const sel = `[data-area-grid="${cssEscapeAttr(scope)}"]`;

  const css = useMemo(() => {
    const bp = { ...DEFAULT_BREAKPOINTS, ...breakpoints };

    const base = ruleBlock(sel, {
      "grid-template-areas": areas.base,
      "grid-template-columns": columns?.base,
      "grid-template-rows": rows?.base,
      gap,
      "align-items": alignItems,
      "justify-items": justifyItems,
    });

    const sm =
      areas.sm || columns?.sm || rows?.sm
        ? `@media (min-width: ${bp.sm}) {\n${ruleBlock(sel, {
            "grid-template-areas": areas.sm,
            "grid-template-columns": columns?.sm,
            "grid-template-rows": rows?.sm,
          })}}\n`
        : "";

    const md =
      areas.md || columns?.md || rows?.md
        ? `@media (min-width: ${bp.md}) {\n${ruleBlock(sel, {
            "grid-template-areas": areas.md,
            "grid-template-columns": columns?.md,
            "grid-template-rows": rows?.md,
          })}}\n`
        : "";

    const lg =
      areas.lg || columns?.lg || rows?.lg
        ? `@media (min-width: ${bp.lg}) {\n${ruleBlock(sel, {
            "grid-template-areas": areas.lg,
            "grid-template-columns": columns?.lg,
            "grid-template-rows": rows?.lg,
          })}}\n`
        : "";

    const xl =
      areas.xl || columns?.xl || rows?.xl
        ? `@media (min-width: ${bp.xl}) {\n${ruleBlock(sel, {
            "grid-template-areas": areas.xl,
            "grid-template-columns": columns?.xl,
            "grid-template-rows": rows?.xl,
          })}}\n`
        : "";

    const xxl =
      areas["2xl"] || columns?.["2xl"] || rows?.["2xl"]
        ? `@media (min-width: ${bp["2xl"]}) {\n${ruleBlock(sel, {
            "grid-template-areas": areas["2xl"],
            "grid-template-columns": columns?.["2xl"],
            "grid-template-rows": rows?.["2xl"],
          })}}\n`
        : "";

    return `${base}${sm}${md}${lg}${xl}${xxl}`;
  }, [sel, areas, columns, rows, gap, alignItems, justifyItems, breakpoints]);

  return (
    <>
      <style>{css}</style>
      <div data-area-grid={scope} className={className} style={rootStyle}>
        {children}
      </div>
    </>
  );
}

export function AreaSlot({ name, children }: PropsWithChildren<{ name: string }>) {
  return (
    <div style={{ ...slotStyle, gridArea: name }}>
      {children}
    </div>
  );
}
