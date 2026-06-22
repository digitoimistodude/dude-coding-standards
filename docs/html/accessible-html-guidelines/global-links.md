---
cover: ../../.gitbook/assets/global-link.php.png
coverY: 212.72727272727272
---

# Global links

### <mark style="color:red;">**Wrong**</mark>

#### Why it is wrong

In this example we have an empty hyperlink element that is still readable with screen reader devices. It tells the blind nothing so it's a huge accessibility issue. And that's not all, the element is also not browsable via keyboard because its styles fill up the whole column.

```html
<div class="col">
  <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="global-link"></a>
  <h2>Title</h2>
  <p>Descriptive text.</p>
</div>
```

### <mark style="color:green;">**Right**</mark>

#### Why it is right

This example ignores the global link from screen readers and keyboards so that it serves only for seeing users. For assistive devices we use a normal link in title

```html
<div class="col">
  <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="global-link" aria-hidden="true" tabindex="-1"></a>
  <h2>
    <a href="<?php echo esc_url( get_the_permalink() ); ?>">
      Title
    </a>
  </h2>
  <p>Descriptive text.</p>
</div>
```
