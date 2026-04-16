export type BreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl";
export type Responsive<T> = Partial<Record<BreakpointKey, T>>;
