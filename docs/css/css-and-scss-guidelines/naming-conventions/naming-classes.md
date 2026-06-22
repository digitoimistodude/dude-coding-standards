# Naming classes

### Blocks

Our custom blocks are named:

```css
.block
```

Items inside block:

```css
.block-header
```

```css
.block-content
```

```css
.block-footer
```

{% hint style="info" %}
**Please note**: If there is no need for these items, they don't need to be added. For example if there is other items, you don't need an extra div inside container.
{% endhint %}

### Items

These can be columns, upsells, grids, masonries, social media walls, logowalls, etc.

#### Parent

```css
.items {
}
```

#### Children

```css
.item.item-something {
}
```

### Wrappers

Site-header and site-footer follow the WordPress guidelines:

```css
.site-header {
}
```

```css
.site-footer {
}
```

Content width container is always:

```css
.container {
}
```

Something "smaller" like text:

```css
.content {
}
```

Other general wrappers:

```css
.wrapper-something {
}
```

### Headings

We use `heading` instead of `title`.

```css
.heading-something {
}
```

### Icons

```css
.wrapper-icons {
}
```

### Buttons and links

Defined in \_button.scss component.

```css
.wrapper-button,
.wrapper-link {
}
```
