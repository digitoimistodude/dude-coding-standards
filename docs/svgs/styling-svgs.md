# Styling SVGs

### Change SVG colors the easy way with `currentColor`&#x20;

If you need to change the color of the SVG with CSS, plug the `currentColor` value into the `stroke` and/or `fill` attributes. With `currentColor`, the color applied to the SVG will be the same `color` that’s already declared in the SVG’s parent element. You can also change the color to something else by adding a `color` declaration directly to an SVG ruleset.

```
svg.icon {
  color: var(--color-whisper);
}

svg {
  color: var(--color-east-side);
}

a svg {
  color: var(--color-purple-mountains-majesty);
}
```

### Gutenberg block SVGs (i.e., the icons in the WordPress dashboard)&#x20;

By default, the Gutenberg block icons in the WP dashboard will contain a black fill. Follow these steps to nuke that annoying fill:

1. Add a class name directly to the SVG. Ex: `class="gutenberg-icon"`
2. In the `_colors.scss` file, apply a color value (most likely, white) to the SVG, like so:

```
.gutenberg-icon {
  color: var(--color-white);
}
```

### Styling commonly used SVGs

#### The plus-sign inside of the circle used in sub-menu toggles. Specifically, the SVG containing the line path that disappears on toggle/click.

Here’s the SVG’s code:

```
<svg class="dropdown-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="11"/><path class="hide" d="M12 6v13"/><path d="M6 12h13"/></svg>
```

Add your new SVG file to the `nav-walker.php` file:

```
ob_start();

  require get_theme_file_path( 'svg/dropdown-plus.svg' );

  $icon = ob_get_clean();
  $output .= '<button class="dropdown-toggle" aria-expanded="false" aria-label="' . get_default_localization( 'Open child menu' ) . '">';
  $output .= $icon . '</button>';   
```

Now let’s hide that path. Add these rulesets and declarations to your theme’s nav files:

In `_nav-desktop.scss`

```
  .hover-intent > .dropdown-toggle svg {
    .hide {
      opacity: 0;
    }
  }
```

In `_nav-mobile.scss`

```
  .dropdown-toggle.toggled-on {
    .hide {
      opacity: 0;
    }
  }
```
