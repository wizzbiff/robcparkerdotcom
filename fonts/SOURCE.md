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

## License Notice

Both fonts are redistributed under the SIL Open Font License 1.1. The OFL permits bundling and redistribution with applications and websites provided the OFL file is included with the font files if distributed separately. Since these files are served as part of the website and not distributed as standalone font packages, the per-font OFL.txt files are not required to be bundled. The OFL text is retrievable from the upstream repositories:

- Inter: https://github.com/rsms/inter/blob/master/LICENSE.txt
- Fraunces: https://github.com/undercasetype/Fraunces/blob/main/OFL.txt
