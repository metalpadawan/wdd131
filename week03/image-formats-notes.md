# W03 Learning Activity: Image File Formats

## WebP

- Source image: Pexels photo 158316.
- JPG file: `images/landscape.jpg`
- JPG dimensions: 3956 x 2633
- JPG size: 4,504,496 bytes, about 4,398.9 KB
- Full-size WebP file: `images/landscape-full.webp`
- Full-size WebP size: 2,044,250 bytes, about 1,996.3 KB
- Optimized WebP file: `images/landscape.webp`
- Optimized WebP size: 48,818 bytes, about 47.7 KB

Actions that reduce the file size below 75 KB include resizing the image to a smaller display width, lowering the WebP quality setting, removing metadata, and cropping unnecessary image area.

## SVG

- Original SVG file: `images/arrow-original.svg`
- Original SVG size: 433 bytes, about 0.4 KB
- Edited SVG file: `images/arrow.svg`
- Edited SVG size: 435 bytes, about 0.4 KB

When opened in a text editor, an SVG looks like XML/HTML-style code made of tags and attributes.

The three shapes referenced in the arrow icon are `circle`, `polyline`, and `line`.

The `viewBox` attribute defines the SVG canvas coordinate system and controls how the graphic scales.

The `fill` attribute defines the inside color of a shape. The value `fill="none"` means the shape is not filled.

The `stroke` attribute defines the color of the shape's line.

The `stroke-width` attribute defines the thickness of the line.

The `stroke-linecap` attribute defines the shape of the line endings. The value `round` gives the line rounded ends.

The vertical line's `stroke` value was changed from `#555` to `#ff0000`, so it displays as red in the browser.
