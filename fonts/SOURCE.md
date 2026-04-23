# Font Files — Source and Reproducibility

Self-hosted fonts per SPEC-008 (A-5). No Google Fonts runtime dependency.

## Files

| File | Family | Weight axis | Source URL | Subset | License |
|------|--------|-------------|-----------|--------|---------|
| `inter-variable.woff2` | Inter | 100–900 (variable) | fonts.gstatic.com via Google Fonts API | Latin (U+0000-00FF + misc) | SIL OFL 1.1 |
| `fraunces-variable.woff2` | Fraunces | 100–900 (variable), opsz 9–144 | fonts.gstatic.com via Google Fonts API | Latin (U+0000-00FF + misc) | SIL OFL 1.1 |

## Reproduction

To regenerate these files (e.g., for updates, different subsets, or format refresh):

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Fetch CSS, extract the latin-subset woff2 URL, download
INTER_CSS=$(curl -s -H "User-Agent: $UA" "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap")
INTER_URL=$(echo "$INTER_CSS" | awk '/\/\* latin \*\//{f=1;next} f && /src:/{match($0, /https:\/\/[^)]+/); print substr($0, RSTART, RLENGTH); exit}')
curl -sL -o fonts/inter-variable.woff2 "$INTER_URL"

FRAUNCES_CSS=$(curl -s -H "User-Agent: $UA" "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap")
FRAUNCES_URL=$(echo "$FRAUNCES_CSS" | awk '/\/\* latin \*\//{f=1;next} f && /src:/{match($0, /https:\/\/[^)]+/); print substr($0, RSTART, RLENGTH); exit}')
curl -sL -o fonts/fraunces-variable.woff2 "$FRAUNCES_URL"
```

The Google Fonts API serves `woff2` when the `User-Agent` identifies as a modern browser. The `latin` subset corresponds to `unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`.

Other subsets (cyrillic, greek, vietnamese, latin-ext) are not included — the site's content is English-only and these subsets would add ~200KB without benefit.

## Byte Budget

**Actual file sizes (as committed):**

| File | Size |
|------|------|
| `inter-variable.woff2` | 48 KB |
| `fraunces-variable.woff2` | 67 KB |
| Combined | 115 KB |

**Budget ceiling:** SPEC-008 R2 sets a combined hard target of 120 KB. The actual payload of 115 KB meets this ceiling with 5 KB of headroom.

**Pre-implementation estimates vs. actuals:** SPEC-008 Arch Gate AG-5 cited approximate per-font targets of ~40 KB (Inter) and ~80 KB (Fraunces), derived from Google Fonts latin-subset size estimates at review time. These were planning approximations, not enforced sub-budgets. Inter came in at 48 KB (8 KB over estimate); Fraunces at 67 KB (13 KB under). The combined ceiling governs, and it is met.

**Decision: no subsetting tooling introduced** (SPEC-009 R5, 2026-04-22). Three reasons:

1. **Ceiling met.** The combined 120 KB NFR is satisfied. There is no compliance gap that tooling needs to close.
2. **Dependency and glyph-coverage risk.** Introducing `pyftsubset` (or equivalent) adds a build-time dependency to a zero-dependency stack, requires ongoing maintenance, and creates glyph-coverage risk if the subset drifts from actual content needs.
3. **CDN layer does not benefit from further woff2 reduction.** Cloudflare Pages serves woff2 with brotli/gzip at the edge. Since woff2 is internally brotli-compressed, CDN-layer compression yields negligible additional savings.

Revisit if a combined payload ceiling is tightened in a future spec, or if font family additions push the total above 120 KB.

## License Notice

Both fonts are redistributed under the SIL Open Font License 1.1. The OFL permits bundling and redistribution with applications and websites provided the OFL file is included with the font files if distributed separately. Since these files are served as part of the website and not distributed as standalone font packages, the per-font OFL.txt files are not required to be bundled. The OFL text is retrievable from the upstream repositories:

- Inter: https://github.com/rsms/inter/blob/master/LICENSE.txt
- Fraunces: https://github.com/undercasetype/Fraunces/blob/main/OFL.txt
