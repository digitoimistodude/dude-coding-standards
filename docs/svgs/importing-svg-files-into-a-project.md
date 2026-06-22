# Importing SVG files into a project

### <mark style="color:yellow;">Important steps for all Dev Dudes to follow when adding SVGs to a project:</mark>

1. Manually remove clipPaths from the file. This includes `<g>`, `<clipPath>`, and `<def>` tags, plus any additional child elements wrapped in `<def>` tags. Here’s a visual example where the tags to remove are commented out:

```html
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- <g clip-path="url(#clip0_6597_3671)"> -->
<path d="M2.25 0.75H22.75C22.75 0.75 23.75 0.75 23.75 1.75V22.25C23.75 22.25 23.75 23.25 22.75 23.25H2.25C2.25 23.25 1.25 23.25 1.25 22.25V1.75C1.25 1.75 1.25 0.75 2.25 0.75Z" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 6.5V5H10.5V6.5" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 10.75V5" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.75 5H20" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.75 9.5H20" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 14H20" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 18.5H20" stroke="#3A3A3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<!-- </g> -->
<!-- <defs> -->
<!-- <clipPath id="clip0_6597_3671"> -->
<!-- <rect width="24" height="24" fill="white" transform="translate(0.5)"/> -->
<!-- </clipPath> -->
<!-- </defs> -->
</svg>
```

2. <mark style="color:yellow;">Copy the</mark> <mark style="color:yellow;"></mark><mark style="color:yellow;">`viewBox`</mark> <mark style="color:yellow;"></mark><mark style="color:yellow;">attribute and its values.</mark>
3. Minimize the contents of the file with the [svgo extension](https://marketplace.visualstudio.com/items?itemName=1000ch.svgo) in VSCode.
4. <mark style="color:yellow;">Paste the</mark> <mark style="color:yellow;"></mark><mark style="color:yellow;">`viewBox`</mark> <mark style="color:yellow;"></mark><mark style="color:yellow;">attribute back into the file after the</mark> <mark style="color:yellow;"></mark><mark style="color:yellow;">`height`</mark> <mark style="color:yellow;"></mark><mark style="color:yellow;">attribute.</mark>
   * If the SVG is missing the `viewbox` attribute and its values, the SVG will be broken and the front-end Dude on the project will wonder why their pretty SVG styles aren’t showing up in the browser.
