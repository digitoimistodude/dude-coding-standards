# Defining font families

First we define the main fonts and then the context where we are using the font families.

```scss
:root {
  // Brand fonts
  --typography-family-whatever: Whatever;
  
  // Contexts
  --typography-paragraph: var(--typography-family-whatever);
  --typography-heading: var(--typography-family-whatever);
  --typography-upper-headings: var(--typography-family-whatever2);
}
```
