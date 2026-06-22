# Custom properties and variables

### Variable naming conventions

Defined format:

```css
 --category-element-property-state: value;
```

#### Examples for the root variable partials

```css
--color-goldenrod: #fdcb68;
--spacing-container-inline-padding: 2rem;
--typography-weight-regular: 400;
--typography-size-15: 15px;
--typography-line-height: 1.5;
```

#### Examples of how variables in block/component and other files could be named

```css
--color-menu-item-background: var(—color-white);
--color-menu-item-background-hover: var(--color-light-grey);
--color-menu-item-text: var(--color-black);
--color-menu-item-text-current: var(--color-navy);
--color-menu-item-text-hover: var(--color-teal);
--spacing-menu-item-link-padding: 2rem;
```

We don't need separate breakpoint-specific variables.&#x20;

We can just redefine the values of each original custom property within the scope of each media/container query. Which would work well if the nav mobile and desktop partials are ever consolidated in the future.
