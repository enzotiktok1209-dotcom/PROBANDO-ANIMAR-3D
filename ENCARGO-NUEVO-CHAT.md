# Encargo para un chat nuevo — storytimes «In dieser Stadt» (alemán, 3D tipo Roblox)

Repo: enzotiktok2212-lab/enzo-animar-claude. Trabaja, haz commit y push siempre en la rama `claude/trusting-newton-0hk9y9` (antes de cada push: `git fetch` + `git rebase`, porque otras sesiones también suben ahí).
Háblame siempre en español y dame traducción de todo lo que esté en alemán.

## Antes de empezar
1. Lee `CLAUDE.md`, `plugins/animate/skills/animate/styles/blocky-3d/PRODUCCION.md`, `STYLE.md` y `REFERENCIA.md`.
2. Usa como plantilla la carpeta **`pieces/gaense/`** (el último vídeo terminado): copia su estructura y scripts (`index.html`, `render.sh`, `render2.mjs`, `mids.mjs`, `sheet.py`, `cues.mjs`, `sfx.py`, `mezclar.sh`, `marca.py`, `finish.sh`, `cover.mjs`, `prep_audio.py`) y reutiliza el motor de `src/` (engine.js, vivo.js, props.js, gvolk.js, gort.js, gans.js…). Cambia duración, puerto y nombres.
3. Los vídeos finales (>100 MB) NO van al repo: me los mandas como archivo. El vídeo de referencia y sus fotogramas nunca se suben.

## Flujo de trabajo
1. Te mando un vídeo de referencia → análisis (cortes, duración media de plano, transcripción con Whisper, por qué se hizo viral, palabras clave, palabras de causalidad, mini-ganchos) en `analisis.md`.
2. Guion en alemán: el gancho (primeros ~10 s) traducido igual; el resto parafraseado, con datos mejores, palabras de causalidad y conectores, y sin frases que no aporten. Siempre con traducción al español. Personajes y nombres inventados.
3. Te mando la voz de ElevenLabs → recortar silencios con `prep_audio.py` y tiempos de palabra con Whisper small (`plugins/animate/skills/animate/tools/transcribir.py`).
4. Producción: planos en `src/main.js`, revisión de un fotograma de CADA plano (al 12 % y al 60 %) con `mids.mjs` + `sheet.py` antes del render completo; corrige todo lo que falle.
5. Audio: `cues.mjs` → `sfx.py` → `mezclar.sh` → `marca.py`. Render con `render.sh` (4 procesos, idempotente) → `finish.sh`.
6. Entrega: el mp4, descripción de TikTok en alemán que empiece por «In dieser Stadt…» y no destripe el final (con traducción), comentario fijado sin spoilers, y 2 portadas 1080×1920 con el sujeto centrado, más nitidez, colores vivos y algo de viñeta.

## Imagen
- 1080×1920, 30 fps, 1:20–3:00. Cambio de plano cada ~1,8 s con cambio de entorno; lo que se ve ilustra literalmente lo que se dice.
- **El gancho tiene que ser muy llamativo**: el primer plano («In dieser Stadt») es una escena propia con el protagonista y la regla absurda ya visible (p. ej. él seguido por una marea de gansos), golpe de zoom + swoosh en el fotograma 0. El segundo plano también con mucha vida, nunca vacío.
- Cámara siempre en movimiento (acercamientos, alejamientos, grúas, travellings); zooms lentos con riser + golpe en las revelaciones; transiciones variadas.
- Personajes distintos en cara, ropa y pelo, siempre haciendo una acción, movimientos fluidos, ojos normales (no saltones) que cambian con la emoción. Piel que no se confunda con el fondo; todo nítido, saturado, con viñeta.
- Lo principal centrado (25–62 % de la altura) y nunca debajo de los subtítulos (74 %). Subtítulos palabra a palabra en #E2FD07 con contorno negro. Todo el texto en pantalla en alemán. Cada número dicho aparece en pantalla.
- Revisa cada plano: nadie atraviesa a nadie, personajes enteros en cuadro, la cámara nunca dentro de un objeto, nada tapando al sujeto. Ojo: el encuadre vertical es muy estrecho (el sujeto tiene que estar casi en el eje de la cámara).

## Sonido
- Campanita (`audio/campanita-recortada.wav`) en el 0 y cada ~10 s al empezar una frase.
- Música `audio/musica.mp3` todo el vídeo (corte en 121,5 s y bucle si hace falta), a −24 LUFS. Solo la versión con música.
- Efectos realistas y variados, ≥1 cada ~1,5 s, nunca tapan la voz; sin whooshes en las transiciones. Mezcla final ≈ −12,5 LUFS. Dime siempre que lo escuche yo, porque tú no puedes oír el audio.

## Tiempos (importante)
- Render rápido: sin MSAA + SMAA, bloom a media resolución, bandadas con InstancedMesh (así va a ~39 fotogramas/min).
- Mide la velocidad real a los 10 min de render y dame un tiempo con margen; avísame si se desvía. No hagas otras tareas pesadas a la vez.
- Para correcciones pequeñas re-renderiza SOLO los planos que cambian (borra esos fotogramas y vuelve a lanzar `render.sh`).
- Dime cuánto falta cuando te lo pregunte y avísame cuando esté listo.

## Canal
Se llama «In dieser Stadt». La foto de perfil está en `pieces/gaense/src/avatar.js` (mascota propia con sudadera amarillo-lima en la plaza del pueblo).
