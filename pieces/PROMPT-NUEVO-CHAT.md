Hola. Trabajamos en el repo enzotiktok2212-lab/ENZO-ANIMAR-CLAUDE, rama claude/lee-guia-kevin-jonas-60l6un (haz fetch de esa rama y trabaja sobre ella; commit y push al terminar). Háblame siempre en español; los vídeos son en alemán.

Lee primero pieces/GUIA-KEVIN-JONAS.md y pieces/tokenrennen/GUION.md (la pieza más reciente). Abajo están todas las reglas.

## LA SERIE
- Vídeos de TikTok en alemán (público alemán), animación 2D hecha en código: Kevin y Jonas, temas de dinero / cosas caras / gaming (Fortnite, GTA 6...).
- Lo que funcionó: GTA 6 + exclusividad + cifra grande + conflicto (~65.000 vistas). Fracasos: cent50 (copiaba la historia de 40 Mio. parafraseada) y million24 (empezaba narrando, el conflicto llegaba tarde, 1:42 de duración). Conclusión: nada de plantilla, gancho fuerte en el primer segundo.

## GUIONES (cuando te pida ideas o un guion)
- Gancho en los primeros 2-3 s: pregunta directa o frase en segunda persona ("Wenn du den Piraten-Token findest, bekommst du eine Million Euro"), con un tema caliente; nada que se calcule en 2 s.
- Cada frase aporta algo nuevo; conectores (Also, Doch, Währenddessen, Dann...); giros (trampa, sabotaje, estafa).
- Final abierto que pida continuación SIN decir "Teil 2" ni "comenta para la segunda parte", y una pregunta directa al espectador (p. ej. "Und du? Wie viele Truhen hast du schon geöffnet?").
- 70-80 s (unas 200-230 palabras).
- Entrega SIEMPRE: alemán + traducción al español (yo no entiendo alemán, los ganchos e ideas también en español) + versión con tags de ElevenLabs v3 bien colocadas (tono, diálogos, risas, suspiros, gasps, sarcasmo, susurros) + descripción con hashtags + comentario fijado + idea de portada.
- Si uso un tema real (p. ej. el token pirata de Fortnite), búscalo en la web antes; dibujarlo a nuestro estilo, sin copiar skins, logos ni el aspecto del juego.

## PIPELINE (cuando te mande el audio de ElevenLabs)
1. Crea pieces/<nombre>/ copiando de pieces/tokenrennen: src, tools, piece.json, .gitignore. voice/script.txt = el texto (sin tags). Copia el mp3 a voice/elevenlabs_original.mp3.
2. Recorta silencios: ffmpeg -i voice/elevenlabs_original.mp3 -ac 1 -ar 44100 voice/raw.wav ; python3 tools/trim_silence.py voice/raw.wav voice/vo.wav
3. Alinea: python3 tools/align_text.py . 12 (añade en SPOKEN cómo se pronuncian números y palabras raras). Verifica CADA tramo con whisper-small (pip install sherpa-onnx; modelo en https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2 — huggingface está bloqueado). Escribe voice/runs.txt (una línea por tramo; '-' en risas, toses, suspiros, gasps).
   OJO: el audio puede no coincidir con el guion (ya pasó: el gancho era el antiguo, faltaba "Jonas lacht"). Los subtítulos siguen lo que se OYE; avísame de las diferencias. Si algo del audio no me gusta, se puede cortar con un fundido suave (ya lo hicimos con "selbst suchen").
4. tools/make_data.py (CLS de colores de palabras + SPEAK de quién habla), piece.json (name, title, duration, frames, build con todos los props), src/head.html (title, DURATION), tools/finish.sh (atrim, -frames:v, nombre del mp4).
5. src/shots.js nuevo: S(t0, {tr, cam, punch, shake, raise, lift, capY, hud, noCap, draw, ui, sfx}). Transiciones: cut whipL whipR whipU zoomIn zoomOut flash glitch spin slide iris slash blinds push ink rgb. Helpers: fact(), stampMark(), info(), popText(), chestCounter(), pirateToken(), lootChest(), setJonasDen(), setTeamRoom(), deskFG(), streamerWall(), etc. (props17-20.js).
6. src/score.js: secciones de música (groove/trap/drone/pad), KEYS = risers + golpe dramático en los momentos clave, acentos (dun/bassDrop), sfx nuevos si hacen falta.
7. Build: node plugins/animate/skills/animate/tools/build.mjs pieces/<nombre>
8. REVISA CADA ESCENA (inicio y final de cada plano) con tools/sheet.mjs <tiempos> y mira las imágenes: nada cortado, nada tapado por los subtítulos (zona ~1400-1560), nada demasiado abajo o pequeño, todo lo importante centrado, nada solapado, objetos que giran (token/monedas) que no se vean de canto. Corrige y vuelve a mirar.
9. Export: node plugins/animate/skills/animate/tools/export.mjs pieces/<nombre> --no-mux --workers 4 ; luego bash tools/finish.sh (saturación +18 %, nitidez, -14 LUFS).
10. Portada: tools/cover.mjs (composición propia, no un fotograma). TikTok la recorta a 3:4 en el perfil: todo lo importante dentro del centro (en 1440x2560, entre y=320 y y=2240). Entrega también la versión 3:4 (crop=1440:1920:0:320) para comprobarla.
11. Si falta disco, borra pieces/*/frames de piezas ya entregadas.
12. Commit + push.

## REGLAS DE IMAGEN Y SONIDO
- Cambios de escena cada 1,2-1,8 s, siguiendo lo que se dice; transiciones variadas, zooms, golpes de cámara (punch), sacudidas.
- Textos/datos que aparecen de golpe (precios, cifras, sellos) en alemán; billetes cuando se habla de dinero.
- Efectos de sonido distintos y casi en cada acción (no siempre el mismo); risers seguidos de golpe dramático en los momentos importantes y en el gancho.
- Primer fotograma: el gancho escrito en grande (para quien lo ve sin sonido) + zoom fuerte.
- Contenido importante centrado, nunca bajo los subtítulos.
- Fondos con mucho detalle (luces LED, pósters, ventanas con ciudad, estanterías, plantas, objetos en primer plano para dar profundidad) y personajes con detalle (cascos gamer, gestos y emociones claras).
- Anti-plantilla: cambia en cada pieza la ropa (Kevin: sudadera + gorro negro; Jonas: sudadera + gafas; colores distintos cada vez), el estilo de subtítulos, el HUD, la música, los escenarios, el final y la portada. Nada de plató con botones ni pantalla partida fija.

## ENTREGA (siempre todo en el mismo mensaje)
Vídeo final 1440p + portada 9:16 + portada 3:4 + descripción + comentario fijado. Nada de copias ligeras salvo que las pida. Dime con honestidad qué revisaste y qué no.
