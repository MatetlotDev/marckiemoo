Drop real images here.

Until product photos exist, the site renders branded gradient placeholders, so
nothing looks broken. To switch to real images:

1. Add your files, e.g.:
     /public/images/products/1v1-30.jpg
     /public/images/og.jpg            (1200x630 social share image)
2. Set the matching `image` path on each product in config/products.ts.
3. In config/site.ts set:  FEATURE.useProductImages = true
   The site will then use next/image (optimized + lazy) instead of placeholders.

Recommended product image ratio: 4:3 (e.g. 1200x900).
