Hola. Vamos a seguir haciendo mis vídeos de TikTok para Alemania. Antes de nada, ponte al día con esto:

## Repositorio y rama
- Repo: `enzotiktok2212-lab/enzo-animar-claude`, rama **`claude/trusting-newton-0hk9y9`**. Trabaja siempre ahí: haz commit y push de todo.
- Lee primero `CLAUDE.md` y `plugins/animate/skills/animate/styles/blocky-3d/PRODUCCION.md`.
- Los últimos vídeos son `pieces/gesichter/`, `pieces/woerter/` y `pieces/tuer/`. **Copia la estructura y los scripts de `pieces/tuer/`** (es la versión más pulida) para cada vídeo nuevo, y reutiliza `src/engine.js`, `props.js`, `gcast.js`, `gsets.js`, `wsets.js`, `tcast.js` y `tsets.js`.
- Los vídeos finales pesan más de 100 MB: no van al repo, me los mandas como archivo.

## Tipo de vídeo
- Storytimes en primera persona, **en alemán**, estilo muñecos de bloques tipo Roblox en 3D (motor three.js propio del repo), en vertical **1080×1920, 30 fps**, de 1:20 a 3:00.
- Gancho tipo "In dieser Stadt…". El primer plano lleva un **golpe de zoom en el fotograma 0** y un **swoosh**. Cuando se dice "In dieser Stadt" hay un plano propio y luego se cambia de plano.
- Yo hablo español: respóndeme siempre en español y dame las traducciones.

## Flujo de trabajo
1. **Análisis del vídeo de referencia que te mande:**
   - cortes, con la media de segundos por plano;
   - guion transcrito con Whisper;
   - por qué se hizo viral;
   - palabras clave, palabras de causalidad y mini-ganchos.
   Se guarda en `pieces/<nombre>/analisis.md` y la transcripción en `transcripcion_referencia.txt`. El vídeo de referencia NO se sube.
2. **Guion en alemán, natural:**
   - el gancho igual (solo traducido);
   - el resto parafraseado, con conectores y palabras de causalidad, quitando lo que resta retención;
   - nombres de personajes y aspecto distintos al original;
   - me das la traducción al español.
   Suelo pedir que se recorte más.
3. **Voz:** yo genero la voz en ElevenLabs y te la mando. Tú:
   - recortas los silencios con `prep_audio.py`;
   - sacas el tiempo de cada palabra. Whisper "small" sale de npm `@skillninja/shortmovie-telop-model-p0..p3`: se unen las partes de `model.bin`, faster-whisper con `pip install faster-whisper`. Hugging Face está bloqueado.
4. **Producción:**
   - personajes y escenarios en 3D, planos con `mids.mjs` para revisar;
   - render con `render.sh` (4 procesos, unas 2 h para 3 min);
   - audio con `cues.mjs` + `sfx.py` + `marca.py`;
   - montaje con `finish.sh`.
5. **Después:** descripción de TikTok en alemán (con traducción), comentario fijado **sin spoilers** y portada 1080×1920 (`cover.mjs`).

## Reglas de imagen
- **Un plano cada ~1,9 s o menos, cambiando de entorno**. Lo que se ve ilustra literalmente lo que se dice.
- **Siempre hay personajes haciendo una acción**, cada uno con ropa, pelo, color de piel y expresión distintos.
- **Movimientos reales:** articulaciones, físicas y caras con emoción.
- **Cámara siempre en movimiento**, como si alguien grabara: perspectivas que cambian despacio.
- **Transiciones variadas** entre planos.
- **Zooms de acercamiento y alejamiento** con su efecto de sonido. Los zooms lentos llevan riser y golpe en las revelaciones.
- **Entradas animadas** de objetos.
- **Nitidez, saturación y viñeta.**
- **Lo principal en el centro**, nunca debajo de los subtítulos.
- **Subtítulos:** palabra a palabra, amarillos (#E2FD07) con contorno negro. **Todo el texto en pantalla en alemán.**
- **Fondos variados y muy detallados.**
- **Revisar plano por plano** que:
  - nadie atraviese a nadie (deja ~2,8 de separación entre personas en fila o agarradas);
  - los personajes y monstruos se vean **enteros**;
  - la cámara no quede dentro de nada y nada tape lo principal (columnas de porche, buzones, árboles…);
  - los monstruos estén donde dice la historia (por ejemplo, frente a las puertas).
- **Monstruos:** que den miedo de verdad, nada infantil. En "Tür" eran negros, larguiruchos y encorvados, con ojos hundidos y brillantes y una sonrisa de dientes humanos.

## Reglas de sonido
- **Campanita** (`audio/campanita-recortada.wav`): en el **milisegundo 0** y luego **cada ~10 s**, al empezar una frase.
- **Música** (`audio/musica.mp3`, "TEMPOREX – Numbers"):
  - suena todo el vídeo sin parar;
  - se corta antes de que se apague (en el segundo 121,5) y se empalma en bucle;
  - va a −24 LUFS.
- **Efectos:** **solo de zoom y realistas** (pasos, puertas, radio, viento…), al menos uno cada ~1,5 s y sin tapar la voz. **Sin whooshes en las transiciones.**
- **Mezcla final:** ≈ −12,5 LUFS. Entrega solo la versión con música.

## Avisos
- Dime cuánto falta cuando te pregunte y avísame cuando esté.
- Antes de renderizar todo, prueba fotogramas sueltos de cada plano. Si pido cambios pequeños, re-renderiza solo esos tramos.
- Si no puedes escuchar el audio, dímelo para que yo lo compruebe.
