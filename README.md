# Charlie Borchers — Portfolio

Plain HTML/CSS/JS. No build step.

## Files
- `index.html`: page structure and text (hero, experience, about, contact)
- `projects.js`: **all project content** (titles, bullets, tags, images). Edit this file to add or change projects.
- `styles.css`: design (colors are at the top under `:root`)
- `script.js`: renders the projects inline, plus the image zoom and mobile menu
- `images/projects/`: web-optimized photos (about 1600 px max, JPEG)
- `resume.pdf`: linked from the nav and contact sections

## Adding a project
1. Put the images in `images/projects/`. Keep them about 1600 px on the long side.
2. Copy an existing block in `projects.js` and edit it. The first image is shown largest.
3. Optional: trim blank margins off CAD screenshots with `powershell -ExecutionPolicy Bypass -File tools\trim.ps1 images\projects\your-file.jpg`.
4. Run `powershell -ExecutionPolicy Bypass -File tools\sizes.ps1`. This records image sizes so they display uncropped. If you skip it, the new images are assumed to be 4:3.

## Hosting
- Live site: https://charlieb4.github.io (GitHub Pages, deployed from the `main` branch)
- Repo: https://github.com/CharlieB4/CharlieB4.github.io

To update the site, commit and push to `main`. GitHub Pages rebuilds automatically in about a minute.

## Local preview
Run `powershell -ExecutionPolicy Bypass -File tools\serve.ps1 -root . -port 8080`, then open http://localhost:8080.
