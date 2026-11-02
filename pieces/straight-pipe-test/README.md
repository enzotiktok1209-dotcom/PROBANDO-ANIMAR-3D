# Prueba 5 s — "straight pipe" (estilo 3D tipo juguete)

Primeros 5 s del formato analizado en `docs/analisis-viral-straight-pipe.md`:
plano 1 contrapicado bajo el coche (sierra corta el silenciador, cae), plano 2 en 3/4 trasero
(humo + anillos de sonido + petardeo + rayos X al final). Subtítulos palabra a palabra.

- `index.html` — escena three.js determinista: `window.renderFrame(t)`.
- `render.mjs all frames` — renderiza 150 fotogramas 1080×1920 con Playwright.
- `sfx.py` — efectos de sonido sintetizados (sierra, golpe metálico, whoosh, arranque, rumble, petardeos).
- Montaje: `ffmpeg -framerate 30 -i frames/f%04d.png -i sfx.wav -af loudnorm=I=-16 ... prueba_5s.mp4`

Requisitos: `npm i` (three, @expo-google-fonts/montserrat), Playwright con Chromium, ffmpeg, numpy.
Sin voz: falta la locución (ElevenLabs o grabación propia).
