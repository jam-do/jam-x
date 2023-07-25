# &lt;jam-x&gt;

## Low-code approach fully compatible with the mature development practices

> This site is built with jam-x

Simple and powerful extension set for the native HTML.

We believe that web development should be accessible for higher range of specialists, not for the experienced developers only.
We trying to extend the most simple parts of the web platform to make it able to solve more tasks.

**HTML as the low-code platform** - is the main idea of &lt;jam-x&gt; library.

## Quick start

The easiest way to try &lt;jam-x&gt; is to create a simple `html` file in your text editor and connect the &lt;jam-x&gt; base class from web:

## Browser support

&lt;jam-x&gt; is supported and tested in all major modern desktop and mobile browsers:

* Chrome
* Firefox
* Safari
* Edge
* Opera
* etc.

**If you have questions or proposals - welcome to [jam-x Discussions](https://github.com/jam-do/jam-x/discussions)!** ❤️

## X-IMPORT

```html
<x-import 
  src="./document.html" 
  data-src="./data.json">
</x-import>
```

## X-MD

```html
<x-md
  src="./doc.md" 
  data-src="./data.json">
</x-md>
```

## X-DWA

```html
<x-dwa 
  src="./document.html.js" 
  data-src="./data.json">
</x-dwa>
```

## X-REPEAT

```html
<x-repeat data-src="./data.json">
    <template>
      <ul>
        <li>{{item1}}</li>
        <li>{{item2}}</li>
        <li>{{item3}}</li>
      </ul>
    </template>
</x-repeat>
```

OR:

```html
<template id="item-tpl">
  <ul>
    <li>{{item1}}</li>
    <li>{{item2}}</li>
    <li>{{item3}}</li>
  </ul>
</template>

<x-repeat data-src="./data.json" template-id="item-tpl"></x-repeat>
```

## X-ROOT-STYLES

```html
<x-repeat src="./styles.css.js"></x-repeat>
```
