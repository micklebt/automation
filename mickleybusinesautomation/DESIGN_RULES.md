# Design Consistency Rules

## Image Styling

### Border Radius
- All images should use a consistent 10px border-radius
- This applies to:
  - Content images
  - Animated images
  - Profile photos
  - Workflow diagrams

### Shadow Effects
```css
/* Standard shadow for all images */
box-shadow: 0 8px 20px rgba(0,0,0,0.1);  /* var(--shadow) */
```

### Hover Effects
All interactive images should have consistent hover animations:
```css
/* Base transition */
transition: transform 0.3s ease, box-shadow 0.3s ease;

/* Hover effect */
transform: scale(1.05);
box-shadow: 0 12px 25px rgba(0,0,0,0.15);
```

### Special Cases
- Gear animation adds rotation:
  ```css
  transform: rotate(360deg) scale(1.05);
  ```

## Card Styling

### Border Radius
- Cards and containers: 15px
- Inner elements: 10px

### Shadow Effects
- Same as images
- Enhanced shadow on hover

## Color Palette
```css
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --accent-color: #FFE66D;
  --text-color: #2C3E50;
  --light-bg: #F7F9FC;
  --white: #ffffff;
}
```

## Typography

### Font Family
```css
font-family: 'Quicksand', sans-serif;
```

### Font Sizes
- H1: 3.5rem
- H2: 2.5rem
- H3: 1.6rem
- Body: 1rem
- Small: 0.9rem

## Spacing

### Margins
- Section margins: 4rem 0
- Component margins: 2rem 0
- Inner element margins: 1rem 0

### Padding
- Section padding: 4rem 1rem
- Card padding: 2rem
- Button padding: 1rem 2rem

## Animation Timing

### Transitions
- Standard: 0.3s ease
- Extended (for gear): 2s ease

## Responsive Breakpoints
```css
@media (max-width: 768px) {
  /* Mobile adjustments */
}
```

## Accessibility

### Focus States
- All interactive elements must have visible focus states
- Use outline or box-shadow for focus indicators

### Screen Reader Text
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Component Rules

### Buttons
- Border-radius: 25px
- Padding: 1rem 2rem
- Hover effect: scale and shadow

### Cards
- Border-radius: 15px
- Shadow on hover
- Consistent padding

### Icons
- Size consistency within sections
- Color matches section theme
- Spacing around icons: 1rem

## Implementation Checklist

When adding new elements:
- [ ] Check border-radius consistency
- [ ] Verify shadow effects
- [ ] Test hover animations
- [ ] Confirm color scheme adherence
- [ ] Validate spacing rules
- [ ] Test responsive behavior
- [ ] Verify accessibility features
