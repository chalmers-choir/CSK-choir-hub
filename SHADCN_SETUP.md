# shadcn/ui Setup & Migration Guide

This document explains how shadcn/ui is set up in this project and how to use it alongside HeroUI for a gradual migration.

## Current Setup

shadcn/ui has been installed and configured with the following:

- **Style Preset**: base-vega (Lucide icons + Inter font)
- **Configuration**: `components.json` at project root
- **Components Location**: `client/components/ui/`
- **Utilities**: `client/lib/utils.ts` (includes `cn()` helper)
- **Theming**: CSS variables in `client/styles/globals.css`

## Installed Components

Currently available shadcn components:

- Button
- Card (with CardHeader, CardContent, CardFooter, CardTitle, CardDescription)
- Input
- Label

## Adding More Components

To add new shadcn components:

```bash
cd client
npx shadcn@latest add <component-name>
```

Examples:

```bash
npx shadcn@latest add select
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add table
```

Browse available components: https://ui.shadcn.com/

## Using shadcn Components

### Import Pattern

```tsx
// Individual imports (recommended during migration)
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// Or use the barrel export
import { Button, Card } from '@/components/ui';
```

### Example Usage

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This uses shadcn components</p>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Gradual Migration Strategy

### Phase 1: Coexistence (Current)

- Both HeroUI and shadcn are available
- Use alias imports to avoid conflicts:
  ```tsx
  import { Button as HeroButton } from '@heroui/react';

  import { Button as ShadcnButton } from '@/components/ui/button';
  ```

### Phase 2: New Features

- All new pages/features use shadcn components
- Existing features remain on HeroUI
- Gradually migrate high-traffic or frequently modified components

### Phase 3: Complete Migration

- Convert remaining HeroUI components to shadcn
- Remove HeroUI dependencies
- Clean up unused styles

## Demo Page

Visit `/demo` to see HeroUI and shadcn components side-by-side and compare:

- Styling differences
- Import patterns
- Component APIs
- Customization options

## Customization

### Theming

Edit CSS variables in `client/styles/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode variables */
}
```

### Component Source

shadcn components are copied into your project, so you can:

1. Direct edit in `components/ui/`
2. Customize variants in component files
3. Add new variants using `cva()` utility
4. Modify styles with Tailwind classes

Example - Adding a new button variant:

```tsx
// components/ui/button.tsx
const buttonVariants = cva('base-classes...', {
  variants: {
    variant: {
      default: '...',
      // Add your custom variant
      custom: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    },
  },
});
```

## Component Mapping

| HeroUI Component | shadcn Equivalent | Notes                                     |
| ---------------- | ----------------- | ----------------------------------------- |
| Button           | Button            | Similar API                               |
| Card             | Card              | shadcn has more subcomponents             |
| Input            | Input             | Similar, but shadcn uses Label separately |
| Form             | (multiple)        | shadcn uses react-hook-form integration   |
| Table            | Table             | API differences                           |
| Modal            | Dialog            | Different API                             |
| Dropdown         | DropdownMenu      | Different structure                       |
| Switch           | Switch            | Similar                                   |
| Checkbox         | Checkbox          | Similar                                   |
| Avatar           | Avatar            | Need to add                               |
| Navbar           | (custom)          | Build from primitives                     |

## Best Practices

1. **Namespace conflicts**: Use import aliases when both libraries are in the same file
2. **Consistent styling**: Stick to one library per feature/page when possible
3. **Documentation**: Comment which library is being used in complex components
4. **Team communication**: Agree on which new components to use for new features
5. **Testing**: Test components thoroughly when migrating from HeroUI to shadcn

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [shadcn/ui Examples](https://ui.shadcn.com/examples)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [CVA (Class Variance Authority)](https://cva.style/docs)

## Questions?

Refer to the demo page at `/demo` or check the shadcn documentation. The beauty of shadcn is that you own the code - feel free to modify components in `components/ui/` as needed!
