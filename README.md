# Ring — Priceless

A responsive recreation of the supplied example.mp4. Open dist/index.html directly or run `python -m http.server 4173 --directory dist` from this directory.

Drag the ruler, tap its position, or focus it and use arrow keys. Home selects the diamond; End selects Priceless. Sixteen stages update the artwork, description and price. The last stage fades to a dark background and a CSS light ring. Reduced-motion preferences are respected.

The eight original images are cropped from the user's reference video. Some product descriptions are approximations where the recording is unclear. Original-stage prices reproduce the reference and are not current retail quotations.

Seven additional front-facing product photographs bridge the price stages. Each image is selected for a circular, single-ring silhouette. Background extraction uses imagegen without changing the photographed angle; display alignment uses uniform scale and translation, never perspective warping or unequal axis scaling. Active photo sources are in `source-assets/front-sources.json`; no open reuse license has been verified for these commercial images. This revision is for local design review and has not been deployed. Previous Wikimedia photographs and license records remain in `source-assets/sources.json`.

All prices are narrative values, not retail quotations. Run `node tests/verify-ring.cjs` from this directory to check stage transitions and assets.
