# Stack Quirks

Platform and tool gotchas discovered through experience. Add entries as you find them.
One-liners preferred — link to the spec or commit where it was hit.


## CSS

(none yet)

## JavaScript

(none yet)

## Cloudflare

(none yet)

## Image Optimization

**Tool:** Python Pillow (`from PIL import Image`).

**Why Pillow, not ImageMagick/cwebp/jpegoptim/mozjpeg?** SPEC-002 architecture review listed those four as preferred options, but none were installed on the build system. Pillow is a reasonable fifth option: it's pre-installed with Python, produces equivalent output quality for JPEG-only workflows, and keeps the no-build-tools constraint intact (no package.json or CI dependency introduced). If future specs need WebP or more advanced transforms, revisit with one of the originally-listed tools.

**Recipe used in SPEC-002** (strips EXIF, progressive JPEG, ≤100KB budget per file):

```python
from PIL import Image

src = "images/source/RobParkerHeadshot.png"
img = Image.open(src).convert("RGB")  # convert() drops EXIF and alpha channel

# 1x output — 400×400 @ quality 82, progressive
img.resize((400, 400), Image.LANCZOS).save(
    "images/rob-parker-headshot.jpg",
    "JPEG", quality=82, progressive=True, optimize=True
)

# 2x output — 800×800 @ quality 80, progressive
img.resize((800, 800), Image.LANCZOS).save(
    "images/rob-parker-headshot@2x.jpg",
    "JPEG", quality=80, progressive=True, optimize=True
)
```

**Results:** 1x = 21.7KB, 2x = 61.8KB (both well under 100KB budget).

**Notes:**
- `convert("RGB")` is the EXIF-strip mechanism — PIL does not carry EXIF through a mode conversion.
- Source PNG lives in `images/source/` (gitignored). Only optimized outputs are committed.
- Serving via `srcset` means mobile gets 1x (21.7KB), retina gets 2x (61.8KB) — budget applies per-request.
