# AreaGrid

A tiny, dependency-free CSS Grid `grid-template-areas` wrapper for React.

## Install

```bash
yarn add areagrid
```

## Usage

### 1. Configure Breakpoints

`AreaGrid` uses CSS variables for breakpoints. By default, it looks for variables like `--breakpoint-md`. 

You can either import the provided Tailwind-compatible CSS file:

```tsx
import "areagrid/breakpoints.css";
```

Or define them manually in your global CSS:

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### 2. Component Usage

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

## Tests

```bash
yarn test
```
