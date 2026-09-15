"""Generate web images from retained originals. Requires Pillow with WebP support."""
from pathlib import Path
from PIL import Image, ImageOps

PUBLIC = Path(__file__).resolve().parents[1] / 'public'
OUTPUT = PUBLIC / 'images' / 'optimized'
OUTPUT.mkdir(exist_ok=True)

profile = ImageOps.exif_transpose(Image.open(PUBLIC / 'profile_pic.png')).convert('RGB')
for width in (480, 960, 1440):
    resized = profile.resize((width, round(profile.height * width / profile.width)), Image.Resampling.LANCZOS)
    resized.save(OUTPUT / f'profile-{width}.webp', 'WEBP', quality=88, method=6)

for name in ('Drinking_from_Tree.jpg', 'fantasmic_plushy.jpg', 'group_picture_at_disney_world.jpeg'):
    source = PUBLIC / 'images' / name
    # Keep the original dimensions: CSS uses these photos' intrinsic aspect ratios.
    photo = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    target = OUTPUT / f'{source.stem}.webp'
    photo.save(target, 'WEBP', quality=88, method=6)
    print(f'{name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes')
for target in sorted(OUTPUT.glob('profile-*.webp')):
    print(f'{target.name}: {target.stat().st_size:,} bytes')
