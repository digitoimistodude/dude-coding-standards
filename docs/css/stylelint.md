---
cover: ../.gitbook/assets/Screen-Shot-2022-05-06-11-36-34.84.png
coverY: 0
---

# Stylelint

### Disabling rules

If for some reason you need to use something in different manner than declared in `.stylelintrc` you should have good arguments in favor to it. You should comment the change accordingly:

```scss
// Force color for color themes not to change this to unreadable colors
// stylelint-disable-next-line declaration-no-important
```
