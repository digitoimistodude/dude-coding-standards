---
description: How to create an accessible search form.
cover: ../../.gitbook/assets/search.php.png
coverY: 278.18181818181813
---

# Search form

### <mark style="color:red;">**Wrong**</mark>

#### Why it is wrong

In here we have a fully functional search form for visual people. However, labels contain text and inputs that are not accessible programmatically. Also in this example icon has been created by adding SVG inside label and hidden submit via styles. This means the user with keyboard or assistive devices can't use the form. Also for attribute is completely missing. Role is defined incorrectly for the form itself, that's wrong because form has role="form" explicitly built-in already.

```html
<form role="search" method="get" class="search-form" action="/?">
  <label class="search-bar">
    <span class="screen-reader-text"><?php ask_e( 'Search: Search' ); ?></span>
    <input type="search" class="search-field" placeholder="<?php ask_e( 'Search: Search' ); ?>" value="" name="s">
  </label>
  <label class="icon">
    <input type="submit" class="search-submit">
    <?php include get_theme_file_path( '/svg/search.svg' ); ?>
  </label>
</form>
```

### <mark style="color:green;">**Right**</mark>

#### Why it is right

This example has the proper form according to [a11ymatters.com example](https://www.a11ymatters.com/pattern/accessible-search/). The search bar label is hidden visually with screen-reader-text class because in the layout it's not visible and normally seeing people still see the actual placeholder. The assistive devices will still read the label.

```html
<form method="get" class="search-form" action="/?">
  <div role="search">

    <label class="search-bar screen-reader-text" for="search-field">
       <?php ask_e( 'Search: Search' ); ?>
    </label>

    <input id="search-field" type="search" class="search-field" placeholder="<?php ask_e( 'Search: Search' ); ?>" value="" name="s">

    <button class="search-submit">
      <?php include get_theme_file_path( '/svg/search.svg' ); ?>
    </button>
  </div>
</form>
```
