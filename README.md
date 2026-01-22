# AreaGrid

A tiny, dependency-free CSS Grid `grid-template-areas` wrapper for React.

## Install

```bash
yarn add areagrid
```

## Usage

### 1. Component Usage

```tsx
import { AreaGrid, AreaSlot } from "areagrid";

export function Dashboard() {
  return (
    <AreaGrid
      areas={{
        base: `
          "hero"
          "main"
          "side"
          "footer"
        `,
        lg: `
          "hero hero"
          "main side"
          "footer footer"
        `,
      }}
      columns={{
        base: "1fr",
        lg: "2fr 1fr",
      }}
      gap="1rem"
    >
      <AreaSlot name="hero">
        <header>Hero</header>
      </AreaSlot>
      <AreaSlot name="main">
        <main>Main Content</main>
      </AreaSlot>
      <AreaSlot name="side">
        <aside>Sidebar</aside>
      </AreaSlot>
      <AreaSlot name="footer">
        <footer>Footer</footer>
      </AreaSlot>
    </AreaGrid>
  );
}
```

### 2. Breakpoints

`AreaGrid` uses Tailwind-compatible `rem` values for breakpoints by default.

| Breakpoint | Minimum width |
| ---------- | ------------- |
| `sm`       | 40rem (640px) |
| `md`       | 48rem (768px) |
| `lg`       | 64rem (1024px) |
| `xl`       | 80rem (1280px) |
| `2xl`      | 96rem (1536px) |


You can override the default breakpoints using the `breakpoints` prop:

```tsx
<AreaGrid
  breakpoints={{
    md: "500px",
    lg: "800px"
  }}
  areas={{
    base: `"a"`,
    md: `"a a"`,
    lg: `"a a a"`
  }}
>
  <AreaSlot name="a">Content</AreaSlot>
</AreaGrid>
```

## Tests

```bash
yarn test
```
