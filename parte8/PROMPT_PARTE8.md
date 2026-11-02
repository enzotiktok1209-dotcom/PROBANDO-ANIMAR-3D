# PROMPT — "Die letzte Frau" · Parte 8: «Unter dem Schnee»

> Prompt de producción completo para animar la parte 8 de la serie.
> Úsalo con la skill `/animate` de este repositorio (o pégalo tal cual en otra herramienta de animación).
> Todo lo que aparece **en pantalla** va en **alemán**. Las indicaciones de producción están en español.

---

## 0. ARCHIVOS DE ESTA CARPETA

| Archivo | Qué es |
|---|---|
| `voz_parte8_sin_silencios.mp3` | Voz en off de ElevenLabs con los silencios recortados (122,0 s → **107,6 s**). Pausas internas de ~0,1 s. **Es la pista maestra: toda la imagen se cuadra a ella.** |
| `subtitulos_parte8.srt` | 83 subtítulos con tiempos sobre el audio recortado (precisión aprox. ±0,2 s; re-cuadrar con detección de palabras si está disponible). |
| `referencias/flucht_*.jpg` | Fotogramas del vídeo "Flucht" (la parte 7). **Este es el estilo a calcar.** |
| `referencias/viral_*.jpg` | Fotogramas del vídeo viral (parte 1). Referencia de HUD, globo, cabaña, radio y puerta. |

---

## 1. ESPECIFICACIONES GENERALES

- **Formato:** vertical 9:16, **1080×1920**, **30 fps**, duración = audio (107,6 s) + 0,6 s de cola en negro.
- **Ritmo:** **un corte o cambio de plano como máximo cada 2 s** (media objetivo 1,3 s). Ningún plano estático: siempre hay algo moviéndose (cámara, partículas, personaje o HUD).
- **Sonido:** **como mínimo un efecto de sonido cada 1,5 s**, sin repetir el mismo efecto dos veces seguidas. Cada transición lleva su propio efecto.
- **Cámara:** zoom de entrada, zoom de salida, *push-in* lentos en frases clave, temblor en impactos, giros en la escena de desorientación. **Cada zoom rápido lleva su "whoosh".**
- **Color:** la paleta de "Flucht" con **+15–20 % de saturación**: rojos de sangre y luces de sirena muy vivos, azules nocturnos profundos, blancos de nieve limpios. Viñeta oscura en los bordes en todos los planos (como en "Flucht").
- **Composición (OBLIGATORIO):**
  - El **sujeto principal siempre en el centro**: dentro del rectángulo **x 12–88 %, y 18–60 %** del encuadre.
  - Los **subtítulos** van en **y 63–71 %**. **Ningún personaje, cara u objeto clave puede quedar debajo o detrás de los subtítulos.**
  - **HUD** en la franja superior (y 0–12 %).
  - El **20 % inferior** y el **12 % derecho** quedan sin información importante (ahí va la interfaz de TikTok). Solo fondo.
- **Fondos:** variados y **detallados** en cada escena: capas de profundidad (primer plano, medio y fondo), partículas de nieve en 3 tamaños con paralaje, niebla baja, montañas y abetos en silueta, luna con halo, cielo con estrellas. Nunca un fondo plano de un solo color, salvo las tarjetas de regla y el negro de "Dunkel".

---

## 2. BIBLIA DE ESTILO (calcar "Flucht")

**Técnica:** animación 2D vectorial plana, **sin contornos negros**. Volumen con sombras planas de un tono más oscuro y algún degradado suave. Cabezas grandes en primeros planos y cuerpos esbeltos en planos generales. Mira `referencias/flucht_greta_primer_plano.jpg`, `flucht_klaus_enfadado.jpg` y `flucht_padre_primer_plano.jpg`.

### 2.1 Personajes (calcar tal cual)

**GRETA** (protagonista, "tú"). Referencias: `flucht_greta_primer_plano.jpg`, `flucht_greta_cuerpo_entero.jpg`, `flucht_greta_llorando.jpg`, `flucht_greta_brazos_cara.jpg`.
- Pelo **rubio dorado, media melena a la altura de la barbilla**, flequillo ladeado y mechones con líneas de un tono más oscuro.
- Cara redonda color melocotón, **ojos grandes redondos** con pupila negra y un brillo blanco, cejas finas oscuras, **colorete rosa ovalado** en las mejillas, nariz de una línea y boca pequeña.
- **Abrigo largo marrón claro** hasta la rodilla, con botonera vertical más oscura y cuello marrón oscuro. Pantalón azul marino y botas oscuras.
- **3 heridas**: manchas de sangre rojas (blob con núcleo rojo oscuro) en el abrigo. Son continuidad de "Flucht" y no desaparecen.
- **Expresiones obligatorias:** pánico (ojos muy abiertos, pupilas pequeñas, boca abierta, cejas arriba), dolor (ojos apretados, dientes visibles, lágrima), alivio (ojos cerrados y sonrisa leve), shock final (boca abierta en "O", pupilas temblando).

**KLAUS** (el cazarrecompensas). Referencias: `flucht_klaus_enfadado.jpg`, `flucht_klaus_cicatriz_marcador.jpg`, `flucht_klaus_gritando.jpg`, `flucht_klaus_conduciendo_velocimetro.jpg`.
- **Sudadera gris oscuro con capucha puesta** (forma redondeada con "orejas" arriba) y cordones blancos.
- Piel tostada, **barba marrón** que cubre mandíbula y bigote, **cejas gruesas en V** (siempre tenso) y colorete rosa.
- **Cicatriz diagonal** marrón que cruza el ojo izquierdo de la frente a la mejilla.
- Gestos: mandíbula apretada, ojos entornados, movimientos secos y decididos. Casi no habla.

**EL PADRE**. Referencias: `flucht_padre_primer_plano.jpg`, `flucht_padre_camisa_sangre.jpg`.
- Pelo **gris** corto con entradas y **barba gris** de varios días.
- Arrugas en la frente, **corte rojo en la frente** con gota, **ojo morado** (moratón violeta/negro).
- **Camisa blanca** con manchas de sangre que **crecen lentamente** (animar la expansión).
- Ojos entrecerrados y respiración débil (el pecho sube poco).

**SOLDADOS**. Referencias: `flucht_soldado_primer_plano.jpg`, `flucht_soldados_noche_linternas.jpg`, `flucht_sperre_patrullas.jpg`.
- **Casco verde oliva** con ala, **pasamontañas negro**, uniforme oliva de formas rectas y fusil oliva oscuro.
- De noche, los **ojos brillan en rojo**. De día o en primer plano, gafas blancas redondas.
- **El soldado joven** (nuevo, sale en las escenas 6–7): igual que los demás, pero **sin pasamontañas** después de la avalancha. Cara joven y delgada, pelo castaño corto, **tirita en la mejilla** y ojos humanos y asustados. Tiene que reconocerse cuando reaparece.

**PERRO**: pastor alemán marrón y negro, del mismo estilo plano. Orejas que se mueven, hocico que olfatea y dientes al gruñir.

### 2.2 Vehículos y objetos
- **Coche de Klaus:** todoterreno oscuro (gris antracita) con faros blancos cálidos. Interior: volante, velocímetro analógico (ver `flucht_klaus_conduciendo_velocimetro.jpg`), salpicadero con luces verdes.
- **Patrullas:** como en `flucht_sperre_patrullas.jpg`, con sirenas rojas y azules que parpadean de verdad y proyectan luz de color sobre la nieve.
- **Avalancha:** nubes de nieve gris-blancas y abultadas, con trazos en espiral (`flucht_coche_avalancha.jpg`). Debe **crecer y rodar**: las capas giran, se desprenden bloques y hay una sombra que avanza delante.
- **Radio:** la misma radio de madera del viral (rejilla redonda y dial amarillo).
- **Puerta de la cabaña:** la misma puerta marrón del viral (`viral_puerta.jpg`), con luz por debajo.

### 2.3 HUD (identidad de la serie)
- **Etiqueta de escena** arriba en el centro: caja pequeña con texto monoespaciado en mayúsculas y borde de color. Valores: `LAWINE` (borde rojo), `UNTER DEM SCHNEE` (blanco), `WALD` (verde), `JAGDHÜTTE` (ámbar), `TAG 10 · 06:12` (blanco).
- **Lista de reglas** arriba a la izquierda (como en "Flucht"). Empieza vacía y se va llenando:
  `1. MOTOR AUS ✓` · `2. FINDE OBEN ✓` · `3. STIRB FÜR DIE WELT ✓`. Cada ✓ entra con un "pop" y su sonido.
- **Contador arriba a la derecha**, con barra de progreso (como `LAWINE 40 M`): `LAWINE 300 M → 50 M`, `SPERRE 20 M`, `PULS 160`, etc.
- **Contador de la serie:** `FRAUEN AUF DER ERDE: 1`, con el diseño del viral (caja con borde rosa y número grande). Aparece en los momentos marcados.

### 2.4 Subtítulos
- Fuente **Poppins ExtraBold** (o Montserrat Black), unos 58 px a 1080 de ancho, máximo **2 líneas** y unas 22 letras por línea.
- **Karaoke palabra a palabra:** las palabras que aún no se han dicho van en gris (#8A8F9C) y las dichas en blanco, con una sombra suave negra al 60 %.
- **Una palabra clave por subtítulo en color**, con el código de la serie:
  - **ROJO #FF3B4E**: peligro y muerte.
  - **AMARILLO #FFD21F**: números, reglas y tiempo.
  - **AZUL #2FA8FF**: acción u objeto.
  - **VERDE #3BE37A**: vida, salvación y calma.
  - **ROSA #FF4FB4**: nombres de personajes.
- La palabra clave entra con un *pop* de escala (0,8 → 1,08 → 1) en 6 frames.

---

## 3. SONIDO

- **Voz:** `voz_parte8_sin_silencios.mp3` a −14 LUFS integrados, siempre por encima de todo.
- **Música de fondo:** un *drone* grave de tensión con pulsos sintetizados a ~100 BPM, a −28 dB y bajando 6 dB mientras habla la voz. Cambia por sección: persecución tensa → calma con pad cálido y piano en la cabaña → tensión al final.
- **Silencio antes del golpe:** en 31,07–32,75 ("letzter Atemzug") y en 104,0–106,3 ("Genau in diesem Moment…") **se corta toda la música**. Solo quedan la respiración o el silencio. Después viene el sonido **más fuerte** del vídeo (el impacto de la avalancha, y los 3 golpes en la puerta).
- **Paleta de transiciones (ir rotando y no repetir dos seguidas):** whoosh grave, whoosh agudo, *swipe*, *whip* (latigazo), glitch digital, flash con "fwoom" invertido, impacto con sub-bajo, riser corto, obturador de cámara, golpe de corazón, papel o tela, viento.
- **Sonidos de interfaz:** tic de contador, "ping" de check ✓, pitido de pulso, "clack" de máquina de escribir para la etiqueta de escena, "beep" de radar.
- **Foley realista** en todas las acciones: nieve crujiendo, cristal, metal deformándose, cinturón, llave, motor, perro, helicóptero, fuego, radio, puerta y madera.

---

## 4. GUION PLANO A PLANO (tiempos sobre el audio recortado)

Formato de cada plano:
**[Nº] tiempo — "texto en pantalla"** (en negrita la palabra clave en color)
- 🎬 Imagen (sujeto en el centro)
- 🎭 Acción y emoción
- 🎥 Cámara
- ✨ Entradas animadas
- 🔊 Efectos de sonido (con su segundo exacto)
- ↪️ Transición al siguiente plano y su sonido

---

### ESCENA 1 — DER HINTERHALT · etiqueta `LAWINE` (0,00–21,10)

**[01] 0,00–1,40 — "Stell dir vor:"**
- 🎬 Vista subjetiva desde el asiento del copiloto: el parabrisas ocupa el centro. Carretera nevada de montaña de noche y, al fondo, una línea de faros y sirenas.
- 🎭 Los limpiaparabrisas barren la nieve y el coche vibra.
- 🎥 *Push-in* rápido hacia el parabrisas (escala 1,0 → 1,12).
- ✨ La imagen aparece desde negro en 6 frames.
- 🔊 0,00 rugido de motor (bucle) · 0,30 chirrido de limpiaparabrisas · 0,9 viento.
- ↪️ Zoom a través del cristal → **whoosh grave**.

**[02] 1,40–2,80 — "Hundert **Gewehre** zielen auf dich."** (Gewehre en ROJO)
- 🎬 Contraplano: un **muro de soldados en 3 filas** que se pierden en la niebla (aparentan ser cien), con faros detrás que crean contraluz y ojos rojos.
- 🎭 Levantan los fusiles **en cascada**, de izquierda a derecha, con 2 frames de desfase entre cada uno. Los **láseres rojos** cortan la nieve que cae.
- 🎥 Zoom de salida rápido que revela la escala.
- ✨ El número "100" entra en rojo con *pop* y se desvanece.
- 🔊 1,45 cargas de fusil escalonadas ("chk-chk" ×5) · 2,10 zumbido láser · 2,5 viento.
- ↪️ Latigazo a la izquierda → **whip**.

**[03] 2,80–3,90 — "Und hinter dir rollt…"**
- 🎬 El **retrovisor** en el centro, grande. En el espejo, la avalancha crece.
- 🎭 El espejo tiembla por la vibración.
- 🎥 *Push-in* lento hacia el espejo.
- ✨ Entra el contador HUD `LAWINE 300 M` arriba a la derecha.
- 🔊 2,85 retumbo grave que va subiendo · 3,3 tic del contador.
- ↪️ Corte con temblor → **impacto sub-bajo**.

**[04] 3,90–5,08 — "…eine tödliche **Lawine**."** (Lawine en ROJO)
- 🎬 Plano general lateral: el coche pequeño en el centro corriendo por la carretera. Detrás, **la ola de nieve gigante** que ocupa media pantalla. Los abetos se parten y salen volando con física (rotación y caída).
- 🎭 Los faros del coche iluminan la nieve que cae.
- 🎥 Seguimiento lateral y temblor ligero que va en aumento.
- ✨ El contador baja de `300 M` a `250 M`.
- 🔊 3,95 crujido de árboles partiéndose ×2 · 4,5 retumbo de avalancha a todo volumen.
- ↪️ Flash blanco breve → **"fwoom" invertido**.

**[05] 5,08–6,67 — "Denn du bist **Greta**."** (Greta en ROSA)
- 🎬 **Primer plano de Greta** en el asiento del copiloto, con la cara en el centro. Luz roja y azul de las sirenas barriendo su cara y **puntos láser rojos** temblando en su mejilla.
- 🎭 Respiración rápida (hombros), ojos muy abiertos y una gota de sudor. El pelo vibra con el coche.
- 🎥 *Push-in* lento.
- ✨ La **ficha del viral** entra desde la derecha: `NAME: GRETA · ALTER: 23` (ver `viral_greta_cuerpo_entero.jpg`).
- 🔊 5,1 deslizamiento de ficha + "blip" de interfaz · 5,6 empieza un latido de corazón · 6,2 tic.
- ↪️ Zoom de salida al espacio → **whoosh agudo**.

**[06] 6,67–8,19 — "Die letzte **Frau** der Welt."** (Frau en AMARILLO)
- 🎬 **El globo terráqueo** del viral (`viral_globo_das_bist_du.jpg`), azul oscuro, con **un solo punto amarillo** que late.
- 🎭 El punto emite ondas.
- 🎥 Zoom de salida rápido desde el coche hasta la Tierra.
- ✨ Arriba cae el contador `FRAUEN AUF DER ERDE: 1`, con rebote.
- 🔊 6,7 whoosh de alejamiento · 7,1 golpe de sub-bajo · 7,5 "ping" de sonar.
- ↪️ Zoom de entrada de vuelta al coche → **whoosh inverso**.

**[07] 8,19–10,49 — "Neben dir: dein Vater. Er **verblutet**."** (verblutet en ROJO)
- 🎬 Asiento trasero: **el padre** desplomado en el centro, con la camisa blanca y la **sangre expandiéndose** en tiempo real. La mano de Greta presiona la herida (continuidad de "Flucht": "Drück auf die Wunde").
- 🎭 El padre aprieta los ojos de dolor y su pecho sube débil. La mano de Greta tiembla.
- 🎥 *Push-in* lento y tembloroso.
- ✨ HUD: `PULS 48` en rojo con un electrocardiograma lento.
- 🔊 8,3 traqueteo del coche por un bache · 9,0 gemido ahogado · 9,7 pitido lento del monitor · 10,2 tela mojada.
- ↪️ Barrido a la derecha → **swipe**.

**[08] 10,49–11,98 — "Und am Steuer: **Klaus**."** (Klaus en ROSA)
- 🎬 **Klaus de perfil** al volante, en el centro, con la capucha puesta y la cicatriz. Las dos manos **estrangulan el volante**.
- 🎭 Mandíbula apretada, ojos fijos en la carretera y nudillos marcados.
- 🎥 Zoom de entrada rápido a su ojo.
- ✨ La etiqueta rosa `KLAUS · DER KOPFGELDJÄGER` entra con un sello (como en "Flucht").
- 🔊 10,5 crujido de cuero del volante · 11,0 golpe de sello · 11,6 motor revolucionando.
- ↪️ Zoom a través de su ojo → **glitch**.

**[09] 11,98–13,69 — "Klaus reißt das **Lenkrad** herum."** (Lenkrad en AZUL)
- 🎬 Primer plano de **las manos girando el volante** de golpe, con estela de movimiento (motion blur en arco).
- 🎭 Todo el cuerpo de Klaus se inclina con el giro y Greta sale proyectada hacia un lado.
- 🎥 Rotación de cámara de 15° siguiendo el volante.
- 🔊 12,0 latigazo del volante · 12,3 **empieza el chirrido de neumáticos**.
- ↪️ Corte a cenital → **whoosh grave**.

**[10] 13,69–15,00 — "Der Wagen schleudert…"**
- 🎬 **Vista cenital** (dron): el coche en el centro **derrapando 90°**. Arcos de nieve salen despedidos (partículas con gravedad) y quedan marcas negras de frenada.
- 🎥 La cámara gira con el coche.
- 🔊 13,7 chirrido largo de neumáticos · 14,3 siseo de nieve pulverizada.
- ↪️ Corte a plano bajo → **impacto seco**.

**[11] 15,00–16,35 — "…und bleibt **quer** vor der Sperre stehen."** (quer en AMARILLO)
- 🎬 Plano a ras de suelo: el coche **cruzado** en el centro y, a 20 m, la barricada de patrullas.
- 🎭 **Rebote realista de la suspensión** (sobrepasa y amortigua) y la nieve cae y se asienta.
- ✨ El HUD cambia a `SPERRE 20 M`.
- 🔊 15,0 golpe sordo de frenada · 15,3 chirrido de suspensión · 15,8 **silencio relativo**: solo motor al ralentí y viento.
- ↪️ Corte limpio → **obturador de cámara**.

**[12] 16,35–17,90 — "Die Soldaten sehen **nicht** dich."** (nicht en ROJO)
- 🎬 **Primer plano de un soldado** en el centro. En sus gafas blancas se **refleja una masa blanca** que crece.
- 🎭 Los ojos (pupilas visibles en las gafas) se abren de golpe y el fusil baja un centímetro.
- 🎥 *Push-in* muy lento.
- 🔊 16,4 respiración a través del pasamontañas · 17,2 aullido de viento.
- ↪️ Giro de cámara de 180° → **whip**.

**[13] 17,90–19,66 — "Sie sehen, was **hinter** dir kommt."** (hinter en ROJO)
- 🎬 Desde detrás de los hombros de los soldados: el coche pequeño en el centro y **la avalancha alzándose detrás**, ocupando toda la mitad superior. Su sombra cubre el coche.
- 🎥 Zoom de salida lento que la hace aún más grande.
- 🔊 17,9 retumbo masivo que va subiendo · 18,6 golpe de metales graves · 19,2 temblor de tierra.
- ↪️ Temblor de pantalla → **impacto**.

**[14] 19,66–20,41 — "Einer **rennt**."** (rennt en AZUL)
- 🎬 Un soldado en el centro **suelta el fusil**: el arma cae dando vueltas y rebota en la nieve con física. El soldado corre.
- 🔊 19,7 golpe metálico del fusil · 20,0 pasos crujiendo en la nieve.
- ↪️ Corte duro → **swipe**.

**[15] 20,41–21,10 — "Dann **alle**."** (alle en AMARILLO)
- 🎬 Toda la línea se rompe: soldados huyendo en todas direcciones, linternas girando y puertas de patrulla abriéndose.
- 🔊 20,45 gritos apagados ("Lauf!") · 20,7 avalancha de pasos.
- ↪️ Corte a negro breve → **golpe de corazón**.

---

### ESCENA 2 — REGEL 1 · cuenta atrás (21,10–33,40)

**[16] 21,10–22,48 — "Du hast noch **fünf** Sekunden."** (fünf en AMARILLO)
- 🎬 Un **"5" gigante** cae en el centro con golpe y temblor, y detrás Greta desenfocada.
- ✨ HUD `LAWINE 50 M` en rojo, parpadeando.
- 🔊 21,15 tic de reloj grave · 21,5 riser que empieza y sube hasta [21].
- ↪️ Glitch → **glitch digital**.

**[17] 22,48–23,58 — "**Regel** Nummer eins:"** (Regel en AMARILLO)
- 🎬 Tarjeta **REGEL 1** igual que en el viral y en "Flucht" (`flucht_tarjeta_regel.jpg`): fondo azul noche, "REGEL" en blanco, "1" enorme en amarillo y línea amarilla debajo.
- ✨ El "1" entra con escala y rebote. En la lista de arriba a la izquierda aparece `1. ???`.
- 🔊 22,5 "clack" de máquina de escribir · 22,9 golpe de bajo.
- ↪️ Zoom a través del "1" → **whoosh agudo**.

**[18] 23,58–24,55 — "Motor **aus**."** (aus en AZUL)
- 🎬 Plano de detalle de **la llave girando** en el contacto. Las luces del salpicadero se apagan **una a una**.
- ✨ El número `4` entra pequeño en una esquina superior.
- 🔊 23,6 clic de llave · 23,8 **el motor se apaga** (bajada de revoluciones) · 24,2 pitidos del salpicadero apagándose.
- ↪️ Corte → **obturador**.

**[19] 24,55–26,30 — "Denn liegt der **Auspuff** unter dem Schnee,"** (Auspuff en AZUL)
- 🎬 Plano trasero del coche: el **tubo de escape** en el centro y la nieve que empieza a cubrirlo, con un recuadro tipo rayos X.
- 🎥 *Push-in* al tubo.
- 🔊 24,6 viento · 25,3 nieve cayendo pesada · 25,9 tic.
- ↪️ Corte de sección → **papel o tela**.

**[20] 26,30–28,99 — "…füllt sich der Wagen mit **giftigem** Gas."** (giftigem en ROJO)
- 🎬 **Corte transversal tipo esquema**: el coche bajo la nieve y **nubes de gas gris** entrando en la cabina. Una calavera y la etiqueta `CO` en rojo palpitando. Después todo se **tacha con una X roja**, porque el motor está apagado.
- ✨ El número `3` en la esquina.
- 🔊 26,4 siseo de gas · 27,2 alarma de aviso (dos pitidos) · 28,4 zumbido de "error" cuando aparece la X.
- ↪️ Barrido → **whoosh grave**.

**[21] 28,99–30,11 — "Gurt **fest**."** (fest en AZUL)
- 🎬 Primer plano del **cinturón**. Greta lo tensa sobre ella y **también sobre su padre**.
- 🎭 Movimiento rápido y decidido, con cara de concentración.
- ✨ El número `2`.
- 🔊 29,0 deslizamiento del cinturón · 29,4 **clic metálico** · 29,8 tic.
- ↪️ Corte → **swipe**.

**[22] 30,11–31,07 — "**Arme** vors Gesicht."** (Arme en AZUL, como en "Flucht")
- 🎬 Greta en el centro **cruzando los brazos delante de la cara** (calco de `flucht_greta_brazos_cara.jpg`). Un **círculo verde** marca la bolsa de aire.
- 🔊 30,15 roce de tela · 30,6 *chime* de interfaz.
- ↪️ Corte → **golpe de corazón**.

**[23] 31,07–32,75 — "Und ein letzter, tiefer **Atemzug**."** (Atemzug en VERDE)
- 🎬 Greta con los ojos cerrados y el pecho que **se hincha**. **La sombra de la avalancha cubre las ventanillas** de arriba abajo.
- 🎭 Mejillas infladas y lágrima. El padre a su lado, inmóvil.
- ✨ El número `1`.
- 🔊 **SILENCIO PREVIO AL GOLPE:** la música y el riser se cortan en 31,1. Solo se oye la **inspiración profunda** (31,3) y un pitido de oído muy suave.
- ↪️ → [24] sin transición: corte directo al blanco.

**[24] 32,75–33,40 — "Dann: **Weiß**."** (Weiß en blanco brillante con resplandor)
- 🎬 **Flash blanco total** y la silueta del coche dando vueltas dentro de la nieve.
- 🎥 **Temblor máximo** durante 8 frames.
- 🔊 32,75 **EL GOLPE MÁS FUERTE DEL VÍDEO**: impacto masivo con cristal reventando, metal aplastado y retumbo con sub-bajo de 1 s.
- ↪️ Funde a negro absoluto.

---

### ESCENA 3 — REGEL 2 · etiqueta `UNTER DEM SCHNEE` (33,40–47,69)

**[25] 33,40–34,52 — "Dunkel. **Stille**."** (Stille en AZUL)
- 🎬 **Negro casi total.** Solo el vaho de la respiración de Greta, iluminado por el brillo verde tenue del salpicadero, en el centro.
- 🔊 33,45 pitido de oído (tinnitus) · 34,0 **metal crujiendo por la presión**.
- ↪️ Glitch suave → **glitch**.

**[26] 34,52–35,59 — "**Regel** Nummer zwei:"**
- 🎬 Tarjeta **REGEL 2**. En la lista de arriba, `1. MOTOR AUS ✓`.
- 🔊 34,55 **ping del check ✓** · 35,0 golpe de bajo.
- ↪️ Zoom a través del "2" → **whoosh**.

**[27] 35,59–36,63 — "Finde **oben**."** (oben en AMARILLO)
- 🎬 Interior oscuro del coche con Greta en el centro, desorientada y mirando a todos lados.
- 🔊 35,6 latido de corazón amortiguado · 36,1 roce de nieve.
- ↪️ Rotación → **whoosh giratorio**.

**[28] 36,63–39,01 — "Unter dem Schnee weißt du nicht, wo **oben** ist."**
- 🎬 La **cámara gira 360° lentamente**: el interior del coche da vueltas y se pierde la referencia.
- 🎭 Greta intenta agarrarse y el pelo se mueve.
- 🔊 36,7 whoosh giratorio · 37,6 nieve crujiendo · 38,4 latido.
- ↪️ Corte → **tela**.

**[29] 39,01–39,94 — "Also **spuckst** du."** (spuckst en AZUL)
- 🎬 Primer plano de los labios de Greta y una **gota de saliva** que sale.
- 🔊 39,05 escupitajo sutil · 39,6 tic.
- ↪️ Corte macro → **swipe**.

**[30] 39,94–41,30 — "Die Spucke läuft nach **links**."** (links en AMARILLO)
- 🎬 Plano macro: la gota **resbala hacia la izquierda** por la mejilla con gravedad real (acelera). Una flecha del HUD sigue la dirección.
- 🔊 40,0 goteo · 40,6 *swipe* de la flecha de interfaz.
- ↪️ → **whoosh giratorio**.

**[31] 41,30–42,52 — "Oben ist **rechts**."** (rechts en AMARILLO)
- 🎬 **La cámara rota 90°** y revela que el coche está **tumbado de lado**. Etiqueta `OBEN →`.
- 🔊 41,35 whoosh de rotación · 41,9 "clic" de interfaz.
- ↪️ Corte → **golpe**.

**[32] 42,52–43,80 — "Du trittst das **Fenster** ein."** (Fenster en AZUL)
- 🎬 La bota de Greta pateando la ventanilla. **Dos patadas**, y en la segunda se forma la **telaraña de grietas** (como el parabrisas de "Flucht").
- 🎭 Cara de esfuerzo y dientes apretados.
- 🔊 42,6 golpe sordo · 43,1 golpe más grieta · 43,5 **cristal estallando**.
- ↪️ La nieve entra → **impacto suave**.

**[33] 43,80–44,66 — "Und **gräbst**."** (gräbst en AZUL)
- 🎬 La nieve cae dentro del coche y **las manos excavan hacia arriba** en el centro, con partículas cayendo.
- 🔊 43,85 nieve derrumbándose · 44,2 excavación crujiente (bucle).
- ↪️ Corte → **swipe**.

**[34] 44,66–45,87 — "Mit **blutigen** Händen."** (blutigen en ROJO)
- 🎬 Primer plano de **las manos** rasguñadas y rojas. Detrás, Greta con lágrimas y dientes apretados.
- 🔊 44,7 jadeo fuerte · 45,2 gruñido de esfuerzo · 45,6 nieve.
- ↪️ → **riser corto**.

**[35] 45,87–46,75 — "Bis über dir …"**
- 🎬 Vista subjetiva mirando **hacia arriba**: un túnel oscuro de nieve con una franja de luz azulada en el centro.
- 🔊 45,9 riser · 46,3 excavación amortiguada.
- ↪️ La mano atraviesa → **ráfaga de nieve**.

**[36] 46,75–47,69 — "**Sternenhimmel**."** (Sternenhimmel en VERDE)
- 🎬 **La mano rompe la superficie.** Plano general del **cielo estrellado** con la luna y su halo, el valle blanco en silencio y los abetos. Calma, frío y belleza.
- 🔊 46,8 nieve estallando · 47,0 aire libre y viento suave · 47,2 **pad coral suave** (alivio).
- ✨ En la lista, `2. FINDE OBEN ✓`.
- ↪️ → **ping del check**.

---

### ESCENA 4 — REGEL 3 · etiqueta `LAWINE` (47,69–63,16)

**[37] 47,69–48,76 — "**Regel** Nummer drei:"**
- 🎬 Tarjeta **REGEL 3**.
- 🔊 47,7 ping ✓ · 48,1 golpe de bajo.
- ↪️ → **whoosh grave**.

**[38] 48,76–50,06 — "Stirb für die **Welt**."** (Welt en ROJO)
- 🎬 Greta de pie y pequeña en el centro del campo blanco enorme. Sus huellas desaparecen detrás de ella mientras el viento las tapa.
- 🔊 48,8 **campana grave** (una sola) · 49,5 viento.
- ↪️ Zoom de entrada al hombro → **whoosh agudo**.

**[39] 50,06–52,57 — "Unter deiner Haut blinkt noch immer das **rote** Licht."** (rote en ROJO)
- 🎬 Primer plano de la herida en el hombro: **una luz roja que late bajo la piel** (como "Sie haben dich markiert" en "Flucht"). Al fondo, en el horizonte, **aparecen luces de helicóptero**.
- 🔊 50,1 pitido sincronizado con el latido de la luz (×3) · 51,5 rotor de helicóptero lejano.
- ↪️ Corte → **tela**.

**[40] 52,57–53,88 — "Klaus zieht sein **Messer**."** (Messer en AZUL)
- 🎬 **Klaus** (salió del coche, con nieve en la capucha y un corte nuevo en la ceja) en el centro, **sacando un cuchillo**. Un brillo metálico recorre la hoja.
- 🎭 Mirada seria y compasiva: "lo siento".
- 🔊 52,6 **sonido de hoja desenfundada** · 53,2 brillo ("ting").
- ↪️ Corte rápido → **golpe de corazón**.

**[41] 53,88–54,60 — "Ein **Schnitt**."** (Schnitt en ROJO)
- 🎬 Greta **muerde su guante**, con los ojos apretados y las lágrimas saliendo. **Destello rojo** de 3 frames a pantalla completa.
- 🔊 53,9 corte seco · 54,0 grito ahogado por el guante · 54,3 latido acelerado.
- ↪️ → **flash rojo**.

**[42] 54,60–55,90 — "Den **Sender** drückst du…"** (Sender en AZUL)
- 🎬 La **palma ensangrentada** de Greta con el **chip rojo parpadeando** en el centro.
- 🔊 54,65 pitido del chip · 55,2 roce de guante.
- ↪️ Corte → **swipe**.

**[43] 55,90–57,45 — "…in die Hand eines **begrabenen** Soldaten."** (begrabenen en ROJO)
- 🎬 **Una mano con guante oliva** sale de la nieve. Greta le pone el chip y **le cierra los dedos** uno a uno.
- 🔊 55,95 nieve crujiendo · 56,6 guante cerrándose · 57,1 pitido del chip, ya apagado y lejano.
- ✨ En la lista, `3. STIRB FÜR DIE WELT ✓`.
- ↪️ → **ping del check** + **sting** (golpe musical de tensión).

**[44] 57,45–58,57 — "Doch einer **lebt** noch."** (lebt en VERDE)
- 🎬 **El soldado joven**, medio enterrado y sin pasamontañas, en el centro. **Abre los ojos de golpe.**
- 🔊 57,5 **inspiración brusca** · 57,8 golpe de tensión.
- ↪️ Corte → **whoosh corto**.

**[45] 58,57–59,54 — "Er **starrt** dich an."** (starrt en ROJO)
- 🎬 Plano y contraplano rápidos: los ojos de él y los ojos de Greta.
- 🔊 58,6 drone de tensión · 59,1 latido.
- ↪️ → **corte seco**.

**[46] 59,54–60,28 — "Zu **lange**."** (lange en AMARILLO)
- 🎬 Los ojos de él, sin pestañear.
- 🎥 *Push-in* muy lento.
- 🔊 59,6 tic de reloj ralentizado · 60,0 latido.
- ↪️ → **riser corto**.

**[47] 60,28–61,97 — "Ganz langsam hebt er die **Hand** …"** (Hand en AZUL)
- 🎬 Su **mano temblorosa sale de la nieve** y la nieve resbala de la manga.
- 🎭 Greta se tensa y retrocede un paso.
- 🔊 60,3 nieve deslizándose · 61,0 tela · 61,5 respiración contenida.
- ↪️ → **latigazo**.

**[48] 61,97–63,16 — "und zeigt in den **Wald**."** (Wald en VERDE)
- 🎬 Su **dedo señala**, y la cámara hace un latigazo siguiendo la línea del dedo hasta un **bosque oscuro de abetos**.
- 🔊 62,0 whip · 62,4 viento entre árboles · 62,8 búho.
- ↪️ → **"clack" de máquina de escribir**.

---

### ESCENA 5 — DIE SUCHE · etiqueta `WALD` (63,16–80,06)

**[49] 63,16–64,17 — "Minuten **später**:"** (später en AMARILLO)
- 🎬 La etiqueta de escena se escribe a máquina: `WALD · 02:14`. De fondo, el valle de noche.
- 🔊 63,2 teclas de máquina de escribir · 63,8 "ding".
- ↪️ → **whoosh**.

**[50] 64,17–64,89 — "**Hubschrauber**."** (Hubschrauber en ROJO)
- 🎬 El **helicóptero** asoma por la cresta en el centro, con las aspas difuminadas.
- 🔊 64,2 **rotor fuerte con efecto Doppler**.
- ↪️ → **corte con rotor**.

**[51] 64,89–65,65 — "**Suchscheinwerfer**."** (en AMARILLO)
- 🎬 El **cono de luz** del foco barre la nieve en diagonal.
- 🔊 64,9 "clunk" del foco al encenderse · 65,3 zumbido eléctrico.
- ↪️ Corte duro.

**[52] 65,65–66,40 — "**Hunde**."** (Hunde en ROJO)
- 🎬 El **pastor alemán** ladrando y tirando de la correa, en el centro.
- 🔊 65,7 ladridos ×2 · 66,1 cadena de la correa.
- ↪️ → **swipe**.

**[53] 66,40–67,56 — "Sie finden den **Sender**."** (Sender en AZUL)
- 🎬 La pantalla del **escáner** de un soldado: un punto rojo que se fija y el texto `SIGNAL GEFUNDEN`.
- 🔊 66,45 pitido de radar · 67,0 **"bip-bip" de fijación del objetivo**.
- ↪️ → **whoosh**.

**[54] 67,56–69,39 — "Und **graben**. Die ganze Nacht."** (graben en AZUL)
- 🎬 **Time-lapse:** soldados con palas excavando en el punto del señuelo y **la luna recorriendo el cielo en arco**. El reloj del HUD avanza rápido.
- 🔊 67,6 palas raspando (bucle) · 68,3 whoosh de time-lapse · 68,8 tictac acelerado.
- ↪️ → **corte al bosque**.

**[55] 69,39–70,71 — "Ihr **kriecht** durch den Wald."** (kriecht en AZUL)
- 🎬 Greta, y **Klaus cargando al padre**, avanzan agachados bajo los abetos, con vaho en la respiración y luz de luna entre las ramas.
- 🔊 69,4 nieve crujiendo · 70,1 **rama que se rompe**.
- ↪️ → **silencio súbito**.

**[56] 70,71–71,77 — "Ein **Hund** bleibt stehen."** (Hund en ROJO)
- 🎬 El perro se **congela**: una oreja arriba y el hocico olfateando.
- 🔊 70,8 olfateo · 71,3 cadena.
- ↪️ → **golpe de corazón**.

**[57] 71,77–72,79 — "Direkt **neben** dir."** (neben en ROJO)
- 🎬 Greta escondida tras un tronco caído y **tapándose la boca con la mano**. El hocico del perro, a centímetros, en el centro.
- 🔊 71,8 olfateo muy cerca · 72,3 **latido fuerte**.
- ↪️ Corte.

**[58] 72,79–73,53 — "Er **knurrt**."** (knurrt en ROJO)
- 🎬 Primer plano del perro **enseñando los dientes**.
- 🔊 72,8 **gruñido grave**.
- ↪️ → **"clic" de linterna**.

**[59] 73,53–74,51 — "Dann eine **Stimme**:"** (Stimme en AMARILLO)
- 🎬 El haz de una linterna gira hacia el tronco.
- 🔊 73,55 "clic" de linterna · 74,0 pasos que se acercan.
- ↪️ → **swipe**.

**[60] 74,51–75,59 — "„Hier ist **nichts**!“"** (nichts en VERDE)
- 🎬 Un soldado gritando hacia un lado, con la mano en el walkie.
- 🔊 74,5 chasquido de radio (squelch) · 75,2 eco del grito.
- ↪️ Corte a su cara.

**[61] 75,59–77,03 — "Es ist der **Soldat** von vorhin."** (Soldat en ROSA)
- 🎬 Se ve su cara: **el soldado joven** con la tirita. Mira de reojo hacia el tronco y hace un **pequeño gesto con la cabeza**.
- 🔊 75,6 nota suave de piano (golpe emocional) · 76,4 viento.
- ↪️ → **silbido**.

**[62] 77,03–78,22 — "Er ruft den Hund **zurück**."** (zurück en VERDE)
- 🎬 Tira de la correa, el perro gime y se van.
- 🔊 77,05 **silbido** · 77,5 cadena de la correa · 77,9 gemido del perro.
- ↪️ → **latido**.

**[63] 78,22–80,06 — "Dein **Herz** schlägt bis zum Hals."** (Herz en ROJO, como en el viral)
- 🎬 Primer plano de Greta, como el plano del corazón del viral. HUD con electrocardiograma `PULS 160` en rojo.
- 🔊 78,3 **latidos fuertes ×3**, que luego se van ralentizando · 79,6 exhalación.
- ↪️ Funde lento a cálido → **viento suave** + "clack" de máquina de escribir.

---

### ESCENA 6 — DIE HÜTTE · etiqueta `JAGDHÜTTE` (80,06–93,21)

**[64] 80,06–80,87 — "Tag **neun**."** (neun en AMARILLO)
- 🎬 La etiqueta de escena se escribe a máquina: `TAG 9 · JAGDHÜTTE`. Exterior: una cabaña de madera en el bosque nevado al atardecer, con humo saliendo de la chimenea.
- 🔊 80,1 máquina de escribir · 80,5 viento suave.
- ↪️ → **madera crujiendo**.

**[65] 80,87–81,77 — "Eine **Jagdhütte**."** (Jagdhütte en AZUL)
- 🎬 Interior detallado: tablones, **cornamenta** en la pared, un farol, una mesa con la radio y una ventana con contraventanas.
- 🔊 80,9 madera crujiendo · 81,4 farol tintineando.
- ↪️ → **ignición**.

**[66] 81,77–82,48 — "Ein **Feuer**."** (Feuer en AMARILLO)
- 🎬 La chimenea **se enciende** y salen chispas.
- 🔊 81,8 "fwoosh" de ignición · 82,0 crepitar (bucle).
- ↪️ Corte suave.

**[67] 82,48–83,05 — "**Stille**."** (Stille en AZUL)
- 🎬 Plano general cálido: Greta envuelta en una manta frente al fuego.
- 🔊 Solo el crepitar. La música entra con un **pad cálido** y una nota de piano.
- ↪️ → **paneo suave**.

**[68] 83,05–84,00 — "Dein Vater atmet **ruhig**."** (ruhig en VERDE)
- 🎬 El padre dormido en un catre, vendado, con el pecho subiendo despacio. `PULS 62` en verde.
- 🔊 83,1 respiración tranquila · 83,6 pitido lento del monitor.
- ↪️ → **"clic" de radio**.

**[69] 84,00–84,52 — "Im **Radio**:"** (Radio en AMARILLO)
- 🎬 **La radio de madera del viral** sobre la mesa, con el dial que se ilumina.
- 🔊 84,0 clic + estática.
- ↪️ Zoom a la rejilla → **whoosh**.

**[70] 84,52–86,20 — "„Die letzte Frau ist bei einem **Lawinenunglück**…"** (Lawinenunglück en ROJO)
- 🎬 Primer plano de la **rejilla del altavoz** con ondas de sonido saliendo.
- 🔊 **La voz va con filtro de radio** (pasa banda de 300 Hz a 3 kHz) y estática de fondo.
- ↪️ → **glitch**.

**[71] 86,20–87,91 — "…**gestorben**.“"** (gestorben en ROJO)
- 🎬 Tarjeta de noticia **`EILMELDUNG · NEWS 24`** (estilo de `viral_*`): una foto borrosa de Greta con el sello rojo **`TOT`**. El contador `FRAUEN AUF DER ERDE` **pasa de 1 a 0**.
- 🔊 86,3 **golpe de sello** · 87,0 tic del contador · 87,5 nota grave.
- ↪️ → **"clic" del botón**.

**[72] 87,91–89,56 — "Klaus schaltet das Radio **aus**."** (aus en AZUL, guiño al viral)
- 🎬 La mano de Klaus gira el botón. Después mira a Greta y **casi sonríe** (la primera emoción suave de Klaus).
- 🔊 87,95 **clic de botón** · 88,0 la estática se corta · 88,5 silencio con fuego.
- ↪️ → **interfaz descendente**.

**[73] 89,56–91,58 — "Zum ersten Mal sucht dich **niemand** mehr."** (niemand en VERDE)
- 🎬 Mapa del HUD con las zonas de búsqueda: **los puntos rojos se apagan uno a uno**. Greta en la ventana, de espaldas, mirando la nieve.
- 🔊 89,6 "blips" de interfaz descendentes ×4 · 90,8 nota de piano.
- ↪️ Funde a oscuro.

**[74] 91,58–93,21 — "Und du schläfst **ruhig** ein."** (ruhig en VERDE)
- 🎬 Greta dormida en la cama, **calco del plano "schläft sie ruhig ein" del viral** (`viral_dormir.jpg`), con "Z z z" y `PULS 58`.
- 🔊 91,6 exhalación suave · 92,2 nota de caja de música.
- ↪️ Salto de tiempo → **"clack" de máquina de escribir**.

---

### ESCENA 7 — DIE SPUREN · etiqueta `TAG 10 · 06:12` (93,21–107,61)

**[75] 93,21–95,11 — "Am Morgen öffnest du den **Fensterladen**."** (Fensterladen en AZUL)
- 🎬 Las **contraventanas se abren** de golpe y entra luz de mañana en rayos con partículas de polvo. Greta en el centro, entrecerrando los ojos.
- 🔊 93,25 máquina de escribir (etiqueta) · 93,8 **crujido y golpe de contraventana** · 94,4 pájaros.
- ↪️ → **chime**.

**[76] 95,11–96,01 — "Frischer **Schnee**."** (Schnee en AZUL)
- 🎬 Un campo de nieve impecable que **brilla**.
- 🔊 95,15 *chime* de brillo · 95,6 viento suave.
- ↪️ Inclinación de cámara hacia abajo → **whoosh**.

**[77] 96,01–96,63 — "Und **darin**:"**
- 🎬 La cámara se inclina hacia el suelo.
- 🔊 96,0 whoosh de inclinación.
- ↪️ Corte.

**[78] 96,63–97,47 — "**Fußspuren**."** (Fußspuren en ROJO)
- 🎬 Una fila de **huellas** que van apareciendo **una a una**, como sellos.
- 🔊 96,65 crujidos de nieve rítmicos, uno por huella.
- ↪️ Zoom a una huella → **whoosh corto**.

**[79] 97,47–98,02 — "**Klein**."** (Klein en AMARILLO)
- 🎬 Plano macro de una huella con un corchete de medida del HUD: `36`.
- 🔊 97,5 "beep" de medida.
- ↪️ Corte.

**[80] 98,02–98,65 — "**Schmal**."** (Schmal en AMARILLO)
- 🎬 Corchete horizontal sobre el ancho de la huella.
- 🔊 98,05 "beep" más agudo.
- ↪️ → **sting**.

**[81] 98,65–100,03 — "Zu klein für einen **Mann**."** (Mann en ROJO)
- 🎬 Comparación: **la huella de la bota de Klaus**, enorme, junto a la huella pequeña.
- 🔊 98,7 sting grave · 99,4 bota pisando la nieve.
- ↪️ → **whoosh de seguimiento**.

**[82] 100,03–101,74 — "Sie führen direkt zu eurer **Tür**."** (Tür en ROJO)
- 🎬 Vista cenital siguiendo **la línea de huellas** a toda velocidad hasta la **puerta de la cabaña**.
- 🔊 100,05 whoosh de travelling · 100,6 pasos rápidos · 101,3 golpe al llegar.
- ↪️ → **glitch**.

**[83] 101,74–103,12 — "Die **letzte** Frau der Welt?"** (letzte en ROSA)
- 🎬 Greta en **shock**: ojos muy abiertos y boca en "O". El contador `FRAUEN AUF DER ERDE: 1` **parpadea con glitch entre 1 y 2**.
- 🔊 101,8 glitch · 102,2 riser de tensión.
- ↪️ → **zoom de salida**.

**[84] 103,12–104,02 — "Das bist doch **du**."** (du en AMARILLO, como "Bist DU" del viral)
- 🎬 **El globo del viral** con el punto amarillo… y **un segundo punto que se enciende un instante** justo al lado.
- 🔊 103,15 ping de sonar · 103,6 **segundo ping**, distinto.
- ↪️ Corte directo.

**[85] 104,02–106,30 — "Genau in diesem **Moment** …"** (Moment en AMARILLO)
- 🎬 **La puerta desde dentro** (calco de `viral_puerta.jpg`): luz por debajo y **la sombra de dos pies pequeños** que se colocan delante.
- 🔊 **SILENCIO TOTAL** (sin música ni ambiente). Solo una tabla del suelo que cruje en 105,3.
- ↪️ —

**[86] 106,30–107,61 — "Drei **leise** Schläge."** (Drei en AMARILLO y leise en ROJO, como en el viral)
- 🎬 La puerta **vibra con cada golpe** (×3): micro-temblor y polvo cayendo del marco. El texto brilla con resplandor.
- 🔊 106,35 / 106,75 / 107,15 **TRES GOLPES**, secos, cercanos y los más nítidos del final · 107,4 caída de sub-bajo.
- ↪️ **Corte a negro** y 0,6 s de cola en negro con el último ping del contador (`1 → 2`, apenas visible).

---

## 5. COMPROBACIÓN FINAL (antes de entregar)

- [ ] Ningún plano dura más de 2,0 s (excepto [20] y [85], que duran 2,3–2,7 s por guion).
- [ ] Hay un efecto de sonido al menos cada 1,5 s y ninguna transición repite el sonido de la anterior.
- [ ] El sujeto principal está siempre dentro de **x 12–88 %, y 18–60 %**, y nada importante queda bajo los subtítulos ni en la zona de la interfaz de TikTok.
- [ ] Greta, Klaus, el padre y los soldados coinciden con `referencias/flucht_*.jpg` (pelo, ropa, cicatriz, heridas y sangre).
- [ ] El soldado joven es reconocible en [44] y en [61].
- [ ] Silencios en [23] y [85], y los sonidos más fuertes justo después: [24] y [86].
- [ ] Los subtítulos están en alemán, en karaoke, con una sola palabra clave en color.
- [ ] La lista de reglas termina con los 3 ✓ y el contador de la serie aparece en [06], [71], [83] y en la cola final.
- [ ] Saturación +15–20 % y viñeta en todos los planos.
