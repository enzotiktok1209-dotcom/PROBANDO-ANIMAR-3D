# Guía de la serie Kevin vs Jonas (TikTok, alemán)

## Lo que funciona (datos reales)
- GTA 6 + exclusividad ("als Einziger", "eine Woche früher") + cifra grande + historia con conflicto -> el de GTA 6 vs 40 Mio. hizo ~65.000 vistas con muy buena retención.
- Virales antiguos: "X Mio. sofort vs 1 €/1 Cent pro Sekunde, 1 Jahr" (349k-420k).
- Fracasos: dos pagos parecidos (6.000 €/Woche vs 1 Cent/s), condiciones en el gancho ("nur im Schlaf"), escenas abstractas (gráficos).
- cent50 (20 Mio. vs 50 Cent/s): retención muy mala, caída fuerte en el gancho y luego lenta. Era la historia de 40 Mio. parafraseada: el público lo nota. Además, vídeos con aspecto de plantilla probablemente pierden las recompensas adicionales (originalidad).

## Reglas del guion
- Gancho (primeros 10 s): lo más impactante + pregunta que se responde al final; tono de anuncio.
- Cada frase aporta algo nuevo; conectores (Also, Doch dann, währenddessen, sogar, schließlich); cero relleno.
- Trato/apuesta con algo caro (p. ej. Lamborghini), escena final en la que se juntan para echar cuentas.
- Final ajustado con cuenta fácil: se dice lo de uno, se pregunta lo del otro, pistas dichas antes.
- Que los dos aparezcan a lo largo de toda la historia; Jonas alegre, no siempre tranquilo.
- 70-75 s (más de 1 min para el RPM), público alemán, temas gaming/tecnología/dinero.
- Entrega: alemán + traducción al español + versión corrida con tags de ElevenLabs + descripción + comentario fijado con la solución.

## Anti-plantilla (desde million24)
- No repetir el formato "X sofort vs Y pro Sekunde" ni la estructura de 40 Mio. (gasta/gana/videollamada/puerta/portátil/pantalla partida).
- Gancho = una situación nueva ("Kevin hat 24 Stunden…"), algo que no se calcule en 2 s, una meta o cuenta atrás visible.
- Cada pieza cambia: ropa (otros colores, misma silueta), subtítulos, HUD, transiciones, música, escenarios, final y portada.
- Portada con composición propia (no los botones), título grande y un objeto/dato fuerte. TikTok la recorta a 3:4 en el perfil: todo lo importante dentro del centro (en 1440x2560, entre y=320 y y=2240). Entregar también la versión 3:4.
- Más de 1:30 si el usuario lo pide; escenas cortas que siguen la frase, datos que aparecen de golpe.

## Reglas del vídeo (prompt de producción del usuario)
- Recortar silencios; cortes cada <=2 s (más rápidos en enumeraciones); transiciones con sonido variado; un efecto cada ~1 s.
- Contenido importante centrado, nunca bajo los subtítulos; fondos variados y detallados (no repetir fondos de color planos).
- Textos en pantalla en alemán; billetes cuando se habla de dinero; zooms lentos con viñeta; zoom fuerte en el primer fotograma.
- Risers solo en 5-7 momentos clave; el resto golpes dramáticos.
- Final en pantalla partida: mitades iguales, los dos entran a la vez, subtítulos en la línea divisoria.
- Portada aparte: los dos en los botones con las dos opciones, sin subtítulos (tools/cover.mjs).
- Saturación +18 % y nitidez (unsharp) en el encode final.
- Para retoques: renderizar solo los tramos con export.mjs --from/--to --no-audio y volver a montar con renders/final-mix.wav.

## Pipeline técnico (pieces/frueher es la última pieza; copiarla como base)
1. trim_silence.py -> voice/vo.wav; voice/script.txt con el guion.
2. tools/align_text.py . 12 ; verificar con whisper-small (sherpa-onnx, modelo desde GitHub releases k2-fsa/sherpa-onnx; huggingface está bloqueado) y fijar voice/runs.txt ('-' = tos/risa sin palabras).
3. tools/make_data.py (CLS + SPEAK), src/shots.js, src/score.js (música, KEYS, acentos), piece.json/head.html/finish.sh (duración, frames, nombre).
4. build.mjs -> tools/sheet.mjs para revisar -> export.mjs --no-mux --workers 4 -> tools/finish.sh.
5. Borrar frames/ de piezas ya entregadas si falta disco.
