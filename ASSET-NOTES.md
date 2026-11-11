# Ring asset provenance

## Active front-facing photographs

Built-in imagegen background-extraction prompt for all seven active cutouts: Use case: background-extraction. This is a real front-on photograph of a SINGLE ring with an already circular band. Remove ONLY the white/gray backdrop and any floor shadow, including background inside the ring hole, to actual transparent alpha. CRITICAL: preserve the EXACT original pixels' photographic appearance, ring silhouette, circular geometry, existing original camera angle, scratches, reflections, colors and all detail. Do not re-render, smooth, beautify, redraw, rotate, stretch or invent any part. Keep original full framing and original subject size. Ring must stay a perfect-looking circle just as photographed. Genuine transparent background, no glow, no reflections below ring, no shadows, no extra objects.

Seven single-ring, front-on product photographs were selected for a circular band silhouette. Originals are in `source-assets/front/`; sources, credit and rights status are in `source-assets/front-sources.json`. No open reuse license has been verified for these commercial photographs; they are retained for local design review only. No deployment or hosting changes were made. Prices are illustrative and do not represent source products.

Only background extraction uses imagegen. No camera-angle synthesis is requested. AI-assisted masking may still alter fine details; compare against the originals. Browser framing uses only uniform scale and translation. `dist/ring-frames.js` records measured band centers and diameters.

## Previous revision

# Ring asset provenance

## Active added photographs

Seven real photographs replace the previously generated concept images. `source-assets/sources.json` records the source page, photographer, license, original filename and deployed cutout for each. The originals are retained in `source-assets/`. Public attribution and license links are in `dist/credits.html`. Prices are illustrative, not product quotations.

Background extraction uses the built-in imagegen tool. It is AI-assisted editing and may alter fine details; it is not a pixel-exact masking guarantee. Keep the original photographs for comparison. The modified photographs retain their respective original licenses, including ShareAlike where applicable.

Shared prompt: "Use case: background-extraction. Edit target: this REAL photograph. Remove ONLY background, surface, support rod if any, and background visible inside ring holes to genuine transparent alpha. Preserve EXACT photographed ring geometry, texture, photographic imperfections, reflections, lighting and original camera angle. No redraw, beautification, invention, rotation, repositioning or change to design. Keep full original framing and ring size. If two rings are present preserve both. No text. Faithful photographic cutout, not a new product render."

Diamond refinement prompt: "Fix only the alpha mask of this photo cutout: REMOVE the entire gray/brown fog halo around the ring and the opaque gray inside the ring hole. All non-jewelry pixels must have alpha zero. Retain ONLY the physical metal and diamonds, crisp original photographed details, existing framing and exact geometry. No glow, shadow, floor, new reflections, redraw or new jewelry. True transparent background."

## Original video assets

The eight `ring-*-transparent.png` assets are cutouts of the user-supplied reference video’s WebP frames. These existing assets are unchanged.
