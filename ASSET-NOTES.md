# Ring asset provenance

## Active added photographs

Seven real photographs replace the previously generated concept images. `source-assets/sources.json` records the source page, photographer, license, original filename and deployed cutout for each. The originals are retained in `source-assets/`. Public attribution and license links are in `dist/credits.html`. Prices are illustrative, not product quotations.

Background extraction uses the built-in imagegen tool. It is AI-assisted editing and may alter fine details; it is not a pixel-exact masking guarantee. Keep the original photographs for comparison. The modified photographs retain their respective original licenses, including ShareAlike where applicable.

Shared prompt: "Use case: background-extraction. Edit target: this REAL photograph. Remove ONLY background, surface, support rod if any, and background visible inside ring holes to genuine transparent alpha. Preserve EXACT photographed ring geometry, texture, photographic imperfections, reflections, lighting and original camera angle. No redraw, beautification, invention, rotation, repositioning or change to design. Keep full original framing and ring size. If two rings are present preserve both. No text. Faithful photographic cutout, not a new product render."

Diamond refinement prompt: "Fix only the alpha mask of this photo cutout: REMOVE the entire gray/brown fog halo around the ring and the opaque gray inside the ring hole. All non-jewelry pixels must have alpha zero. Retain ONLY the physical metal and diamonds, crisp original photographed details, existing framing and exact geometry. No glow, shadow, floor, new reflections, redraw or new jewelry. True transparent background."

## Original video assets

The eight `ring-*-transparent.png` assets are cutouts of the user-supplied reference video’s WebP frames. These existing assets are unchanged.
