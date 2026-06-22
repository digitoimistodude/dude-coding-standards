---
description: Or prefix. Whatever you like to call them.
cover: ../../.gitbook/assets/prefix.php.png
coverY: 188.3201581027668
---

# Upper title/Prefix

### <mark style="color:red;">**Wrong**</mark>

#### Why it is wrong

Assistive tools and keyboards see this as: paragraph, title. They are not linked to each other. For seeing users this is no problem as we have styled the small paragraph but for others it causes confusion.

```html
<p>Smaller prefix title</p>
<h1>The main title</h1>
```

### <mark style="color:green;">**Right**</mark>

#### Why it is right

This markup actually links the smaller prefix title to the main title. Remember to always use unique id for this in both `aria-describedby` and `id` attribute values. This can be easily achieved with WordPress's [`sanitize_title()`](https://developer.wordpress.org/reference/functions/sanitize\_title/) function.

```html
<p aria-describedby="unique-sanitized-title-id">
    Smaller prefix title
</p>

<h1 id="unique-sanitized-title-id">
    The main title
</h1>
```
