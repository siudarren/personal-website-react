Run `python3 scripts/optimize_images.py` with Pillow installed and WebP support enabled to regenerate the checked-in optimized images. The normal website build does not require Python or Pillow. Originals remain in `public` for regeneration and browser fallback.

The portrait has three responsive widths; the existing CSS still controls its circular crop and displayed dimensions. Blog photographs retain their original pixel dimensions. Diagrams and the height-table image retain their original formats to keep text and line work intact. Article image dimensions and aspect ratios reserve space before lazy-loaded images arrive.

Run `npm test` to check content loading and scroll restoration, and `npm run build` to verify the production build.
