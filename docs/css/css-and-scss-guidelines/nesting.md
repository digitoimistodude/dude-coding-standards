# Nesting

Always check out your `.stylelintrc` for the latest rules. Aim for readable CSS. Use the "inception rule", **do not go too deep**.

### <mark style="color:red;">**Wrong**</mark>

#### Why it is wrong

Too much speficity. Hard to maintain.

```scss
.block-example {
  > div.block-related-element {
    .element-that-should-be-global {
      a.something-specific {
        background: var(--color-background-block-example);
        color: var(--color-brand);
        font-size: var(--font-size-large);
      }
    }
  }
}
```

### <mark style="color:green;">**Right**</mark>

#### Why it is right

We are just styling the link here so no need for extra nesting and specificity. Just cut to the chase and define with class.

```scss
.block-example .something-specific {
  background: var(--color-background-block-example);
  color: var(--color-brand);
  font-size: var(--font-size-large);
}
```

If it's going to be a global style, you can even simplify it and add it outside the scope. Remember to choose classes wisely.

```scss
.something-specific {

}
```

