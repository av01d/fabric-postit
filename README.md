# fabric-postit
A Fabric.js post-it note extension.

![Fabric Post-it](postit.png)


## Installation

Include the `postit.js` script file **after** `fabric.js`:

```html
...
<script src="js/fabric.js"></script>
<script src="js/postit.js"></script>
```

## Initialization

A note can be initialized with its initial text content and other arguments:

```js
new fabric.Postit('hello world', {
  width: 200,
  height: 200,
  top: 200,
  left: 200
})
```

## Properties

The following custom properties can be read and changed:

- `text` → text to display
- `textPadding` → padding around text
- `fontSize` → text font size
- `fontFamily` → text font family
- `textColor` → color of text
- `noteColor` → sticky note fill color
- `boxShadow` → box shadow css rule
- `radius` → sticky note border radius
- `stripHeight` → height of 'sticky strip'
- `stripColor` → color of 'sticky strip'

## Sub-elements

The Postit is actually a group consisting of three elements, which can be accessed as properties:

- `Postit.tbox` → fabric.Textbox
- `Postit.note` → fabric.Rect
- `Postit.strip` → fabric.Rect
