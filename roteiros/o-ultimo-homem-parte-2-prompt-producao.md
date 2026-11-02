# PROMPT DE PRODUCCIÓN — "O Último Homem" · Parte 2

**Audio maestro:** `roteiros/audio/narracao-parte-2-cortada.mp3` (78,72 s, voz ElevenLabs "Will", portugués). Ya no tiene silencios ni la frase de la votación ("E a maioria de vocês votou: vai. Então Rafael foi.").
**Todos los tiempos de este documento son sobre ese audio.** El video dura exactamente 78,72 s más 0,5 s de cola en el contador final.

---

## 0. Instrucción general (copiar tal cual al inicio de cualquier prompt)

> Crea un video vertical animado de 78,7 s, **1080×1920, 30 fps**, en el MISMO estilo visual del video de referencia "O Último Homem – Parte 1" (Rafael). Calca exactamente al protagonista Rafael: proporciones, colores, ojos y ropa. Es una ilustración vectorial plana, oscura y cinematográfica, con iluminación de noche, brillos de neón y una saturación alta pero controlada.
> **Todo el texto que aparece en pantalla está en ALEMÁN**: subtítulos, HUD, carteles, etiquetas y tarjetas. La voz sigue en portugués.
> Hay un corte de plano cada 1,5 a 2,3 s. Cada corte lleva una transición con su propio efecto de sonido, y ningún efecto se repite dos veces seguidas. Debe sonar algún efecto como mínimo cada 1,5 s.
> Los personajes se mueven con física real: peso, anticipación, inercia, rebote y ropa que reacciona. Las expresiones faciales cambian según la emoción de cada frase.
> **Lo importante va SIEMPRE en el centro del cuadro**, por encima de los subtítulos, nunca tapado por ellos.

---

## 1. Biblia de estilo (calcada del video de referencia)

### 1.1 Look general
- **Técnica:** vector plano 2D sin contornos negros. Las formas son geométricas con esquinas redondeadas. La sombra es una sola capa más oscura (multiply al 25 %) y la luz es una capa de borde (rim light) del color de la fuente de luz.
- **Paleta base nocturna:** fondos azul marino/índigo `#141a3a` a `#1f2556`, edificios `#2a3170`, ventanas encendidas amarillo cálido `#f5c75a`.
- **Acentos:** rojo sirena `#ff3b4a`, azul sirena `#2f7bff`, verde Brasil `#1fae4b`, amarillo `#ffd23f`, magenta UI `#ff3fa4`.
- **Saturación:** +15 % sobre la referencia en luces y acentos (sirenas, neones, faroles). Las sombras se quedan profundas, sin negro puro (mínimo `#0b0f24`).
- **Atmósfera en cada plano:** grano fino animado (opacidad 4 %), viñeta suave (25 %), partículas en el aire (polvo, llovizna o humedad del puerto) y bloom suave en todas las luces.
- **Profundidad:** mínimo 3 capas de parallax (fondo lejano, plano medio y primer plano desenfocado). En los planos con cámara en movimiento, el primer plano se mueve 1,6× más rápido que el fondo.
- **Fondos variados y MUY detallados:** cada escena tiene un fondo distinto, con objetos brasileños pequeños como cuerdas, carteles, grafitis, cables de luz, ropa tendida, banderitas, matrícula Mercosur, señales y basura en el piso. Nunca dejes un fondo plano vacío.

### 1.2 Zona segura y composición (OBLIGATORIO)
Cuadro de 1080×1920:
- **0–260 px (arriba):** HUD (cápsula de capítulo y contador `MÄNNER: 1`).
- **260–1180 px: ZONA PRINCIPAL.** Aquí van la cara, la acción y el objeto clave. El sujeto principal se centra en x = 540 y su punto de interés (cara o mano) entre y = 600 y y = 950.
- **1180–1420 px:** banda de subtítulos. Aquí solo puede haber fondo o piso, nunca la cara ni la acción.
- **1420–1920 px:** piso, sombras y elementos secundarios. La interfaz de TikTok tapa la derecha y la parte de abajo, así que ahí no va nada importante.
- Los personajes de cuerpo entero se escalan para que la cabeza quede en y ≈ 650 a 750 y los pies arriba de y ≈ 1180. Si no caben, el plano se hace de cintura para arriba.

### 1.3 Personaje principal — RAFAEL (calcar de la referencia)
- 23 años, brasileño. Piel morena media `#a8683f` con sombra `#8a5230`.
- **Cabeza:** grande y redonda (≈ 1/3 de la altura del cuerpo). Cabello negro `#1a1412` corto, con flequillo de lado en forma de casquete.
- **Ojos:** dos círculos blancos grandes con pupila negra redonda y un brillo blanco pequeño. Cejas finas negras que expresan la emoción. Mejillas rosadas suaves y una nariz pequeña de una sola línea.
- **Sin barba en esta parte**, porque se afeitó en la Regra 2.
- **Ropa de esta parte:** buzo con capucha gris carbón `#3a3c44`, con cordones blancos, bolsillo canguro y la capucha bajada (la sube al esconderse). Jeans azul marino `#232a4a`. Zapatillas oscuras con suela blanca.
- **Brazos y piernas:** finos y tubulares, con manos redondas de color piel. Al caminar o correr se doblan en arco (rubber-hose controlado).
- **Expresiones requeridas** (hacer una hoja de expresiones antes de animar): neutral-alerta, esperanza (cejas arriba y sonrisa leve), shock (pupilas chicas y boca en O), miedo (cejas en V invertida, labio tembloroso, sudor), aguantar la respiración (mejillas infladas, ojos apretados), agotamiento (boca abierta jadeando y cabeza baja), desconfianza (un ojo entrecerrado).

### 1.4 Personajes secundarios
- **Las 11 "homens" del barco son policías mujeres con barba falsa.** Mismo diseño de las mujeres de la referencia: pelo voluminoso castaño o rubio con forma de casco, ojos semicerrados, mejillas rosadas. Primero llevan chaqueta de pescador amarilla y gorro, con una barba falsa negra que se nota mal pegada. Al revelarse, debajo tienen chaleco táctico negro con la palabra **"POLIZEI"** en blanco.
- **La comandante:** igual que las demás, más alta, con pelo recogido en coleta. Tiene una cicatriz pequeña en la ceja y gesto frío. Sostiene el celular de la mamá de Rafael.
- **La mujer de la Kombi:** unos 40 años, piel oscura, pelo afro corto con mechas plateadas y aros dorados. Viste una chaqueta de jean gastada. Su expresión es seria, urgente y sin miedo. Nunca se ha visto antes en la serie.
- **El perro callejero:** un caramelo (vira-lata) flaco, con oreja doblada.

### 1.5 Subtítulos (mismo estilo que la referencia, pero en ALEMÁN)
- **Fuente:** sans condensada extra-bold (tipo *Anton*, *Bebas Neue Pro Bold* o *Montserrat ExtraBold* condensada). Todo en MAYÚSCULAS. Cuerpo de 92 px, blanco `#ffffff`, con sombra paralela negra al 70 % (desplazamiento de 0 y 6 px, desenfoque de 0) y contorno de 4 px `#0b0f24`.
- **Posición:** centrados en x = 540, línea base en y ≈ 1300. Máximo 2 líneas y de 1 a 3 palabras por línea.
- **Palabra clave resaltada en color** (una por frase): amarillo `#ffd23f` (nombres y tiempo), rojo `#ff3b4a` (peligro), verde `#1fae4b` (lugares y objetos de Brasil), azul `#4aa8ff` (policía), rosa `#ff5fb0` (familia y emociones).
- **Animación de entrada por palabra:** escala de 70 % a 108 % y luego a 100 % en 6 frames, más un leve desplazamiento hacia arriba de 12 px. Las palabras que aún no se dijeron se muestran en gris `#8a90b0` al 60 % y se vuelven blancas al pronunciarse (estilo karaoke de la referencia).

### 1.6 HUD (calco de la referencia, traducido)
- **Cápsula de capítulo arriba y al centro:** texto monoespaciado (*JetBrains Mono* o *IBM Plex Mono*) de 30 px, amarillo `#f5c75a`, borde fino de 2 px amarillo y fondo `#0b0f24` al 80 %. Formato: `TAG 7 · ORT · HH:MM`.
- **Contador arriba a la izquierda:** cápsula azul con borde `#2f7bff` que dice `MÄNNER: 1`, con parpadeo sutil cada 4 s.
- **Etiquetas de alerta:** píldora roja `#ff3b4a` con texto blanco monoespaciado de 26 px que entra con un "pop" de escala 0 → 115 % → 100 %.
- **Reloj del HUD:** avanza en tiempo real dentro de cada escena (por ejemplo, de 23:58 a 00:00).

---

## 2. Reglas de movimiento y física

1. **Anticipación → acción → follow-through:** todo salto, golpe o giro tiene antes un contra-movimiento de 3 a 4 frames y después un asentamiento de 4 a 6 frames con rebote del 5 %.
2. **Peso:** al aterrizar, el cuerpo se aplasta un 8 % en vertical y se estira un 4 % en horizontal durante 2 frames. La capucha y los cordones siguen el movimiento con 2 a 3 frames de retraso.
3. **Ciclo de carrera:** 8 frames, con brazos opuestos a las piernas, torso inclinado 15° hacia delante y el pie que levanta polvo o salpica agua en cada contacto.
4. **Respiración:** en planos quietos, el pecho sube y baja (2 % de escala cada 1,2 s). Cuando está agitado, el ciclo baja a 0,5 s.
5. **Parpadeo:** cada 2 a 4 s, en 3 frames. Excepción: cuando está aterrorizado no parpadea.
6. **Ojos:** las pupilas miran SIEMPRE hacia la fuente de peligro o el objeto del que se habla, y se adelantan 2 frames al giro de la cabeza.
7. **Manos:** cuando toca algo (contenedor, muro, baranda), los dedos se apoyan y el objeto reacciona: polvo, vibración o un leve hundimiento.
8. **Física del entorno:** las luces de sirena barren y proyectan su color sobre las paredes y la cara de los personajes. El agua del puerto tiene oleaje con reflejos. Las linternas son conos volumétricos con polvo flotando dentro. La ropa tendida se mueve con el viento.
9. **Cámara:** siempre "respira", con un deriva de ±6 px en 3 s. Hay *camera shake* en los impactos (de 6 a 12 frames, amplitud de 8 a 18 px que decae).
10. **Entradas animadas de objetos:** pop-in con rebote, deslizamientos con desenfoque de movimiento, aparición por máscara (wipe) o caída con rebote. Cada escena tiene al menos UN objeto que entra animado.

## 3. Diseño de sonido (reglas)

- **Densidad:** mínimo 1 efecto cada 1,5 s, más un ambiente continuo por locación. En la persecución, de 2 a 3 efectos por segundo.
- **Capas por escena:** (a) ambiente de fondo, (b) foley de la acción (pasos, ropa, golpes, respiración), (c) UI y HUD (bips, clics, glitch), (d) transición (whoosh, swish, impacto, riser, tape-stop) y (e) un hit cinematográfico en los momentos clave.
- **Variedad:** no repetir el mismo archivo de efecto en dos transiciones seguidas. Hay que usar al menos 8 transiciones distintas en todo el video.
- **Zoom in** = whoosh que sube de tono más un "swell" corto. **Zoom out** = whoosh inverso (reverse) o "air pull". **Impacto de cámara** = boom grave más un clank metálico.
- **Mezcla:** la voz siempre arriba, entre −6 y −3 dBFS de pico. Los efectos van entre −14 y −10 dB y los ambientes entre −24 y −20 dB. Se aplica *ducking* de 4 dB a todo menos la voz mientras ella habla, y el master se limita a −1 dBTP.
- **Música:** una cama tensa de pulso grave (sintetizador oscuro de unos 100 BPM) que entra en el segundo 13,3 y se intensifica en 47,6. Se apaga de golpe en 58,9 (callejón sin salida) y vuelve con un riser hasta 64,6. En 71,8 hay silencio musical total, y en el CTA entra un tic-tac de reloj.

---

## 4. Plano por plano

Formato de cada escena: **tiempo · narración (PT) · subtítulo DE (palabra en color)** · plano/cámara · acción y emoción · fondo · texto en pantalla (DE) · efectos de sonido · transición de salida.

### BLOQUE 1 — GANCHO

**E01 · 0,00–2,04** · "Todos os homens da Terra sumiram." · Sub: `ALLE MÄNNER DER ERDE SIND` **`VERSCHWUNDEN.`** (rojo)
- **Plano:** el globo terrestre centrado (y ≈ 760), de noche, con puntitos de luz que representan a los hombres. La cámara empieza alejada y hace un zoom in lento del 100 % al 115 %.
- **Acción:** los puntitos se apagan en oleadas desde los bordes hacia el centro, y cada apagado deja un pequeño destello.
- **Fondo:** espacio azul marino con estrellas y un anillo HUD que gira alrededor del globo.
- **Texto:** contador arriba al centro, `MÄNNER AUF DER ERDE`, con números que bajan de `3.968.514.002` a `1` (dígitos que giran como un odómetro).
- **Efectos:** 0,00 golpe de bajo profundo (sub-drop) · 0,30 tic-tac digital rápido del contador · 1,20 cascada de "blips" que se apagan · 1,90 "ding" agudo cuando llega a 1.
- **Transición:** *zoom-through* hacia el único punto que queda encendido (en Brasil), con un whoosh que sube de tono.

**E02 · 2,04–3,51** · "Menos você, Rafael." · Sub: `AUSSER DIR,` **`RAFAEL.`** (amarillo)
- **Plano:** Rafael de cuerpo entero, centrado, dentro de corchetes de escaneo amarillos. El zoom in pasa de plano general a plano medio.
- **Acción:** levanta la cabeza de golpe, sorprendido, con las pupilas que se achican. Una línea de escaneo azul le recorre la cara y él se lleva la mano al pecho.
- **Fondo:** fondo HUD azul con cuadrícula y la bandera de Brasil desenfocada al fondo.
- **Texto:** ficha a la derecha que entra deslizándose: `NAME: RAFAEL · ID: BR`.
- **Efectos:** 2,10 bip de escaneo · 2,60 zumbido del escáner que recorre · 3,10 "lock" de un clic metálico.
- **Transición:** corte con *glitch RGB* de 4 frames y un chasquido digital.

**E03 · 3,51–4,70** · "Vinte e três anos." · Sub: **`DREIUNDZWANZIG`** (amarillo) `JAHRE ALT.`
- **Plano:** primer plano de la cara de Rafael, centrado y respirando nervioso. Hay un *push-in* lento.
- **Acción:** traga saliva (se ve la garganta moverse), parpadea y aparece una gota de sudor.
- **Fondo:** la cuadrícula HUD desenfocada, con luz azul sobre un lado de la cara.
- **Texto:** el número `23` entra con un pop y rebote junto a su cabeza, más la etiqueta `ALTER`.
- **Efectos:** 3,55 "thump" suave del número · 4,00 trago de saliva (foley) · 4,40 tick de UI.
- **Transición:** *swipe* lateral rápido con un swish de tela.

**E04 · 4,70–6,23** · "O último homem vivo." · Sub: `DER` **`LETZTE`** (rojo) `LEBENDE MANN.`
- **Plano:** cartel de "BUSCADO" pegado en una pared de ladrillo, centrado y con la foto de Rafael. Hay un zoom out leve.
- **Acción:** un sello rojo cae desde arriba y golpea el cartel; el papel vibra y se levanta un poco de polvo.
- **Fondo:** pared de ladrillo de São Paulo con grafitis, carteles de "Disque Denúncia 181" a medio arrancar y un farol amarillo.
- **Texto:** `GESUCHT` (en el cartel) · sello rojo `LETZTER MANN` · `BELOHNUNG: R$ 50.000.000`.
- **Efectos:** 4,75 swish del sello que baja · 5,10 golpe seco del sello · 5,40 crujido de papel · 5,90 contador de dinero (máquina de billetes rápida).
- **Transición:** corte duro con un boom grave.

**E05 · 6,22–8,25** · "E o planeta inteiro tá te caçando." · Sub: `UND DER GANZE PLANET` **`JAGT DICH.`** (rojo)
- **Plano:** un mosaico de pantallas (Times Square, Tokio, París y la Avenida Paulista) que se multiplican de 1 a 9. La cámara empieza alejada y hace zoom in hacia la pantalla central.
- **Acción:** en cada pantalla aparece la cara de Rafael. En la pantalla central, una multitud de mujeres levanta la vista hacia él al mismo tiempo, con cara seria.
- **Fondo:** ciudades de noche, cada una con su propio color.
- **Texto:** en las pantallas `WO IST ER?` · `WHERE IS HE?` · `CADÊ ELE?` · `OÙ EST-IL?`, entrando una tras otra.
- **Efectos:** 6,25 encendido de TV · 6,60, 6,90 y 7,20 tres "pops" de pantallas encendiéndose con tonos distintos · 7,60 murmullo de multitud · 8,10 riser corto.
- **Transición:** *flash blanco* de 3 frames con un impacto cinematográfico.

### BLOQUE 2 — RESUMEN

**E06 · 8,25–10,02** · "Um bilhete na varanda prometia:" · Sub: `EIN ZETTEL AUF DER` **`VERANDA`** (verde) `VERSPRACH:`
- **Plano:** la galería de madera del sítio de la Mantiqueira al amanecer. El papel está sobre la baranda, centrado, y la cámara hace un *push-in* hacia él.
- **Acción:** el viento levanta una esquina del papel y la mano de Rafael entra en cuadro y lo atrapa. Sus dedos lo aprietan.
- **Fondo:** la sierra con niebla, araucarias, un farol apagado, una bota de goma y un mate en la baranda.
- **Texto:** `TAG 7 · MANTIQUEIRA · 06:12` (HUD).
- **Efectos:** 8,30 viento con pájaros · 8,90 aleteo de papel · 9,40 tela del buzo · 9,80 papel apretado.
- **Transición:** *zoom-in* dentro del papel con un whoosh que sube.

**E07 · 10,03–11,78** · "somos onze. Porto do Rio." · Sub: **`WIR SIND ELF.`** (amarillo) `HAFEN VON` **`RIO.`** (verde)
- **Plano:** inserto del billete en letra manuscrita. Las letras se escriben solas, como tinta apareciendo.
- **Texto en el billete (DE, manuscrito):** `Du bist nicht der Einzige. Wir sind elf. Rio de Janeiro. Der Hafen.`
- **Efectos:** 10,05 garabateo de lápiz · 10,60 subrayado rápido · 11,20 grito de gaviota lejana (anticipa el puerto).
- **Transición:** *match cut*: el papel se dobla y se convierte en un mapa de Rio, con un swish de papel.

**E08 · 11,79–13,26** · "Sábado. Meia-noite." · Sub: **`SAMSTAG.`** (amarillo) **`MITTERNACHT.`** (rojo)
- **Plano:** un reloj de pared analógico grande, centrado, cuyas agujas giran rápido hasta las 12. Hace un zoom out y se ve que el reloj está en el Píer Mauá, con el Museu do Amanhã iluminado al fondo.
- **Acción:** las agujas se detienen con un rebote y la luz de las farolas parpadea.
- **Fondo:** el puerto de Rio de noche, con la Ponte Rio-Niterói a lo lejos, agua con reflejos y llovizna.
- **Texto:** `SAMSTAG` (tarjeta que entra arriba) · HUD `PIER MAUÁ · 23:59`.
- **Efectos:** 11,80 tic-tac rápido · 12,45 campanada grave de medianoche · 12,90 olas contra el muelle.
- **Transición:** *whip pan* hacia abajo con un swoosh de aire.

### BLOQUE 3 — EL GIRO

**E09 · 13,27–15,29** · "Um barco de pesca, todo apagado." · Sub: `EIN` **`FISCHERBOOT,`** (verde) `VÖLLIG` **`DUNKEL.`** (rojo)
- **Plano:** un barco pesquero de madera centrado, pintado de azul y blanco con el nombre `DONA CIDA` en el casco. Todas sus luces están apagadas y se balancea con el oleaje. Plano general con un dolly lento hacia delante.
- **Acción:** Rafael entra de espaldas por la izquierda, a contraluz, y se detiene. Su silueta respira y la capucha se mueve con el viento.
- **Fondo:** contenedores apilados, grúas portuarias con luces rojas parpadeantes y agua negra con brillos.
- **Texto:** HUD `PIER MAUÁ · 00:00`.
- **Efectos:** 13,30 entra la música (pulso grave) · 13,40 crujido de madera del barco · 14,20 sogas tensándose · 14,90 un paso de zapatilla sobre concreto mojado.
- **Transición:** *dip to black* de 4 frames con un golpe sordo.

**E10 · 15,29–16,80** · "Onze homens no convés." · Sub: **`ELF MÄNNER`** (amarillo) `AN DECK.`
- **Plano:** contrapicado del barco y sus 11 siluetas en fila, centradas, con capas de pescador y gorros. Hay un zoom in escalonado en 3 saltos.
- **Acción:** las siluetas se giran en sincronía hacia Rafael con un leve desfase entre cada una.
- **Texto:** se cuenta `1…11` con pequeños números que hacen pop sobre cada silueta.
- **Efectos:** 15,35, 15,80 y 16,25 tres "thumps" de zoom · 15,50 a 16,60 tick por cada número · 16,60 tela de impermeable.
- **Transición:** corte con *blur de movimiento horizontal* y un swish.

**E11 · 16,79–18,51** · "Um deles grita: RAFINHA!" · Sub: `EINER VON IHNEN RUFT:` **`„RAFINHA!"`** (rosa)
- **Plano:** primer plano de una de las siluetas, con la barba falsa iluminada de lado. Sigue un plano rápido de la reacción de Rafael.
- **Acción:** la figura se pone las manos en la boca para gritar. El globo de diálogo `RAFINHA!!!` entra con un pop y tiembla. Corte a Rafael: los ojos muy abiertos, la boca entreabierta y las cejas arriba, en una esperanza que le duele.
- **Efectos:** 16,85 golpe de olas · 17,80 un grito con eco sobre el agua (reverb de muelle) · 18,10 un "stinger" de cuerdas agudo · 18,40 la respiración entrecortada de Rafael.
- **Transición:** *zoom-in* rápido a los ojos de Rafael con un whoosh que sube.

**E12 · 18,51–20,48** · "Só a mãe dele chamava ele assim." · Sub: `NUR SEINE` **`MUTTER`** (rosa) `NANNTE IHN SO.`
- **Plano:** un recuerdo cálido con filtro sepia y grano: una polaroid centrada. La mamá abraza a Rafael de niño en una laje, con una pipa (cometa) en el cielo.
- **Acción:** la polaroid cae y gira hasta posarse en el centro. La mamá le acaricia el pelo al niño (animación sutil dentro de la foto).
- **Texto:** escrito a mano en la polaroid: `Rafinha, 6 ❤`.
- **Efectos:** 18,55 obturador de cámara antigua · 18,90 una caja de música (2 notas) · 19,60 risa infantil lejana · 20,30 papel que se posa.
- **Transición:** la foto se quema desde el centro (*burn transition*) con el chisporroteo de fuego.

**E13 · 20,48–21,43** · "Ele dá um passo..." · Sub: `ER MACHT EINEN` **`SCHRITT…`** (amarillo)
- **Plano:** detalle a ras del piso, con la zapatilla de Rafael centrada y un charco reflejando el barco. Es un plano lento (ralentizado).
- **Acción:** el pie se apoya en el charco y salpica. Las ondas en el agua tienen física real.
- **Efectos:** 20,50 la música baja de golpe · 20,80 una pisada en el agua a cámara lenta (grave, con reverb) · 21,30 inhalación de suspenso.
- **Transición:** corte duro con un "CLACK" de reflector encendiéndose (abre la escena siguiente).

**E14 · 21,43–22,98** · "e os holofotes acendem." · Sub: `UND DIE` **`SCHEINWERFER`** (amarillo) `GEHEN AN.`
- **Plano:** contraplano de Rafael centrado, encandilado por 4 reflectores blancos que se encienden en secuencia. Hay un zoom out rápido con sacudida de cámara.
- **Acción:** Rafael se cubre los ojos con el antebrazo y da un paso atrás, con el cuerpo tensado. La sombra se le estira larga hacia la cámara.
- **Texto:** una etiqueta roja que hace pop: `ALARM`.
- **Efectos:** 21,45, 21,70, 21,95 y 22,20 cuatro "clacks" eléctricos de reflectores con tonos distintos · 22,30 zumbido eléctrico · 22,60 la zapatilla que patina.
- **Transición:** *flash blanco*, con un impacto que se mezcla en la sirena.

**E15 · 22,98–24,55** · "Sirene pra todo lado." · Sub: **`SIRENEN`** (rojo) `VON ÜBERALL.`
- **Plano:** plano general y aéreo del muelle, con Rafael chiquito en el centro. Las patrullas llegan desde los 4 lados y la cámara gira 30° mientras baja.
- **Acción:** las patrullas derrapan y frenan, con los giroflex barriendo rojo y azul. La luz pinta todo el escenario.
- **Fondo:** contenedores de colores y una grúa portuaria. El piso mojado refleja las luces.
- **Texto:** HUD `STREIFENWAGEN: 4 → 7` (el número sube).
- **Efectos:** 23,00 sirenas en paneo L/R · 23,40 derrape de neumáticos · 23,90 frenazo · 24,30 portazos de patrulla.
- **Transición:** *whip pan* hacia el barco con un swoosh pesado.

**E16 · 24,55–26,59** · "E os onze homens? Não são homens." · Sub: `UND DIE ELF MÄNNER?` `ES SIND` **`KEINE MÄNNER.`** (rojo)
- **Plano:** plano medio de la fila del barco, centrado. Hay un *rack focus* del fondo a la figura del medio.
- **Acción:** una por una, las 11 figuras se arrancan la barba falsa con un tirón; el pegamento estira la barba antes de soltarse. Debajo aparecen caras de mujer serias y el pelo voluminoso se suelta del gorro.
- **Efectos:** 24,60 un "hmm" grave de sintetizador · 25,60 a 26,40 tirones de cinta adhesiva en cascada (cada uno con distinto tono) · 26,50 un "riser" invertido.
- **Transición:** las barbas caen hacia la cámara y tapan el cuadro (*wipe con objeto*), con un swish de tela.

**E17 · 26,59–28,94** · "São policiais. De barba falsa." · Sub: `ES SIND` **`POLIZISTINNEN.`** (azul) `MIT` **`FALSCHEN BÄRTEN.`** (amarillo)
- **Plano:** primer plano de una policía centrada que se abre la capa de pescador y deja ver el chaleco `POLIZEI`. Sigue un inserto de una barba falsa cayendo al charco.
- **Acción:** saca una placa que brilla con un destello. La barba cae en cámara lenta, rebota en el charco y salpica.
- **Texto:** chaleco `POLIZEI` · placa `BUNDESPOLIZEI · RIO`.
- **Efectos:** 26,65 tela de impermeable que se abre · 27,10 cierre de velcro · 27,50 "shing" metálico de la placa · 28,40 chapoteo de la barba en el agua.
- **Transición:** *glitch* con interferencia de radio.

**E18 · 28,94–31,21** · "A comandante segura o celular da mãe dele." · Sub: `DIE KOMMANDANTIN HÄLT DAS` **`HANDY SEINER MUTTER.`** (rosa)
- **Plano:** la comandante centrada, en contrapicado, levantando un celular con funda floreada. Hay un zoom in hacia la pantalla.
- **Acción:** con sonrisa fría, toca la pantalla con el pulgar y suena un audio de voz de la mamá. Corte de 0,5 s a Rafael: la cara se le desarma, la mandíbula le tiembla y los ojos se le humedecen.
- **Texto:** en la pantalla `HANDY DER MUTTER` · contacto `Rafinha ❤` · onda de audio animada · `SPRACHNACHRICHT 0:04`.
- **Efectos:** 29,00 vibración de celular · 29,60 tap en la pantalla · 29,80 voz femenina distorsionada y lejana diciendo "Rafinha…" · 30,80 un "dong" grave de revelación.
- **Transición:** el *zoom-in* entra en la pantalla del celular con un whoosh digital.

**E19 · 31,21–33,57** · "O apelido. O endereço. O bilhete." · Sub: **`DER SPITZNAME.`** (rosa) **`DIE ADRESSE.`** (verde) **`DER ZETTEL.`** (amarillo)
- **Plano:** pantalla tipo "tablero de investigación", con 3 tarjetas que entran centradas una tras otra, cada 0,8 s.
- **Acción:**
  1. La tarjeta `SPITZNAME: „RAFINHA"` llega con la polaroid.
  2. La tarjeta `ADRESSE` muestra la casa de la mamá en São Paulo, con un pin rojo.
  3. La tarjeta `ZETTEL` muestra el billete manuscrito.
  Cada tarjeta queda tachada con un ✓ rojo y un hilo rojo las une.
- **Fondo:** pared de corcho con fotos de vigilancia, chinchetas y post-its.
- **Efectos:** 31,25, 32,00 y 32,85 tres golpes de tarjeta sobre el corcho, cada uno con distinto tono · 31,60, 32,40 y 33,20 marcador tachando · 33,40 hilo tensándose.
- **Transición:** zoom out rápido con un "air pull".

**E20 · 33,56–34,31** · "Tudo armado." · Sub: **`ALLES INSZENIERT.`** (rojo)
- **Plano:** cuadro centrado en el que el tablero entero se cierra como una trampa para osos sobre la silueta de Rafael. Es un plano simbólico rápido.
- **Texto:** sello `FALLE` que golpea.
- **Efectos:** 33,60 el clank metálico de una trampa que se cierra · 33,70 un boom grave · 34,10 camera shake.
- **Transición:** corte duro.

### BLOQUE 4 — ESCONDIDO

**E21 · 34,32–35,70** · "Elas pulam pro cais." · Sub: `SIE SPRINGEN AUF DEN` **`KAI.`** (azul)
- **Plano:** plano lateral, con 4 policías saltando del barco al muelle, en el centro. Hay un ralentí corto en el aire y luego velocidad normal al aterrizar.
- **Acción:** aterrizan con aplastamiento del cuerpo, ruedan y se levantan en posición. Las linternas se encienden en sus manos.
- **Efectos:** 34,35 un swish de cuerpos en el aire · 34,90 tres aterrizajes pesados en concreto · 35,20 equipo táctico chocando · 35,50 clic de linternas.
- **Transición:** *swipe* vertical hacia arriba, hacia el cielo, con un whoosh.

**E22 · 35,70–37,97** · "Drones no céu. O helicóptero chegando." · Sub: **`DROHNEN`** (rojo) `AM HIMMEL.` `DER` **`HUBSCHRAUBER`** (azul) `KOMMT.`
- **Plano:** contrapicado del cielo, con 3 drones que entran desde los bordes hacia el centro. Al fondo, el Cristo Redentor iluminado entre las nubes. El helicóptero aparece detrás del Cristo con un foco que barre.
- **Acción:** los drones se estabilizan con un leve rebote y sus luces rojas parpadean. El haz del helicóptero recorre el cuadro.
- **Texto:** pequeñas etiquetas HUD sobre los drones: `DROHNE 01`, `02` y `03`.
- **Efectos:** 35,75 zumbido de hélices de drones (paneo) · 36,40 bip de los drones · 36,80 hélices de helicóptero que van subiendo · 37,60 el "whomp" del foco.
- **Transición:** el foco del helicóptero barre el cuadro y lo blanquea (*light wipe*), con un golpe de aire.

**E23 · 37,96–40,23** · "Rafael se enfia entre os contêineres." · Sub: `RAFAEL ZWÄNGT SICH ZWISCHEN DIE` **`CONTAINER.`** (verde)
- **Plano:** un pasillo estrecho entre contenedores de color rojo, azul, verde y violeta (calcar los de la referencia en inglés, con códigos `HLXU 2290`). Rafael queda centrado y hay un *dolly-in*.
- **Acción:** Rafael entra corriendo, se mete de costado, la espalda se le roza con el metal y saltan chispas de óxido. Se sube la capucha con las dos manos.
- **Fondo:** contenedores con stickers de "FRÁGIL", óxido, cadenas, un pallet roto y charcos.
- **Texto:** HUD `PIER MAUÁ · 00:03`.
- **Efectos:** 38,00 pasos rápidos · 38,60 un roce de tela sobre metal · 39,20 un golpe hueco en el contenedor · 39,80 la capucha (tela).
- **Transición:** *zoom-in* a la cara con una inhalación fuerte.

**E24 · 40,23–41,35** · "E prende a respiração." · Sub: `UND` **`HÄLT DEN ATEM AN.`** (amarillo)
- **Plano:** primer plano centrado de Rafael, con los ojos apretados y los cachetes inflados. Una mano le tapa la boca.
- **Acción:** todo el cuerpo se queda congelado. Solo le tiembla la mano, y una gota de sudor le cae de la sien.
- **Texto:** contador HUD `ATEM ANHALTEN 00:01 → 00:02`, que parpadea en rojo.
- **Efectos:** 40,25 inhalación fuerte que se corta · 40,50 latido grave del corazón (1) · 41,00 latido (2).
- **Transición:** corte con un latido que encadena con la escena siguiente.

**E25 · 41,34–42,72** · "Lanterna. Passos." · Sub: **`TASCHENLAMPE.`** (amarillo) **`SCHRITTE.`** (rojo)
- **Plano 1 (0,7 s):** un cono de linterna que entra por la boca del pasillo y barre por la pared del contenedor.
- **Plano 2 (0,7 s):** las botas tácticas de una policía, que pisa un charco, en el centro y a ras del piso.
- **Efectos:** 41,36 clic de linterna · 41,70 zumbido de la linterna · 42,07 pisada de bota en charco · 42,40 segunda pisada.
- **Transición:** *swipe* rápido con la luz de la linterna.

**E26 · 42,71–44,24** · "Cada vez mais perto." · Sub: `IMMER` **`NÄHER.`** (rojo)
- **Plano:** plano medio de Rafael, centrado y pegado al contenedor. La luz de la linterna se le acerca por el costado, y la cámara hace un zoom in lento que acompaña la tensión.
- **Acción:** sus ojos se mueven hacia la luz sin girar la cabeza. La sombra de la policía crece en la pared.
- **Efectos:** 42,75, 43,25 y 43,75 pasos cada vez más fuertes · 43,40 estática de radio policial ("…sektor drei…") · 44,10 latido acelerado.
- **Transición:** corte hacia arriba (*tilt up*) con un swoosh.

**E27 · 44,25–46,45** · "Até que um drone para bem em cima dele." · Sub: `BIS EINE DROHNE DIREKT` **`ÜBER IHM`** (rojo) `STEHEN BLEIBT.`
- **Plano:** cenital, con el drone en el centro, y a contrapicado Rafael abajo mirando hacia arriba, aterrado, con la boca abierta.
- **Acción:** el drone se frena en seco y se balancea por la inercia. Proyecta un cono rojo que encierra a Rafael en un círculo de luz.
- **Texto:** retícula HUD roja que se cierra sobre Rafael.
- **Efectos:** 44,30 zumbido de drone que crece · 45,10 frenado del drone (cambio brusco de tono) · 45,60 retícula cerrándose (bips cada vez más rápidos) · 46,30 "lock" final.
- **Transición:** *glitch rojo* con una alarma digital.

**E28 · 46,45–47,64** · "Alvo localizado." · Sub: **`ZIEL GEORTET.`** (rojo)
- **Plano:** la vista de la cámara del drone: filtro térmico, Rafael como silueta naranja en el centro y el texto parpadeando.
- **Texto:** grande y centrado, `ZIEL GEORTET` en una cápsula roja · coordenadas `22°53'48"S 43°11'02"W`.
- **Efectos:** 46,50 alarma digital doble · 47,00 una voz robótica corta que dice "Ziel geortet" (opcional, muy baja) · 47,50 sirena que sube.
- **Transición:** el *zoom out* devuelve a la vista normal, con un "air pull" y un impacto.

### BLOQUE 5 — LA FUGA

**E29 · 47,64–48,88** · "E ele corre de novo." · Sub: `UND ER` **`RENNT`** (amarillo) `WIEDER.`
- **Plano:** plano lateral con *travelling*: Rafael centrado, corriendo, con los contenedores pasando en parallax rápido.
- **Acción:** arranca de golpe, con salpicaduras en cada pisada y el cuerpo inclinado.
- **Texto:** HUD `FLUCHT · 00:06` · `STREIFENWAGEN: 7`.
- **Efectos:** 47,65 la música sube de intensidad (hit) · 47,80 un arranque explosivo de zapatillas · 48,20 a 48,80 pasos rápidos en charcos · 48,50 respiración agitada.
- **Transición:** *motion blur* horizontal con un swish.

**E30 · 48,88–50,09** · "Pula o muro do porto!" · Sub: `ÜBER DIE` **`HAFENMAUER!`** (verde)
- **Plano:** plano bajo y centrado de un muro de concreto con un grafiti de "PORTO MARAVILHA" y alambre. Rafael salta en arco.
- **Acción:** toma impulso, pone las manos en el muro, pasa el cuerpo con física de parkour y la capucha flamea. Cae del otro lado, rueda y se levanta.
- **Efectos:** 48,90 impulso · 49,20 manos golpeando concreto · 49,40 un swish de cuerpo en el aire · 49,80 aterrizaje y rodada.
- **Transición:** al caer, la cámara baja con él (*tilt down*), con un golpe al tocar el piso.

**E31 · 50,09–51,87** · "Cruza os trilhos do VLT." · Sub: `ÜBER DIE GLEISE DER` **`STRASSENBAHN.`** (verde)
- **Plano:** el Boulevard Olímpico con el enorme mural colorido de rostros al fondo (calcar el estilo de un mural de colores, sin copiar ninguna obra real). Rafael cruza los rieles en el centro y el VLT (tranvía blanco) pasa a toda velocidad detrás de él, a centímetros.
- **Acción:** la ropa le vuela por el aire desplazado. Se gira medio segundo con cara de pánico y sigue corriendo.
- **Texto:** cartel de estación `VLT · PARADA UTOPIA AQWA` (nombre de estación ficticio), con letrero en alemán debajo: `STRASSENBAHN`.
- **Efectos:** 50,10 campana del VLT · 50,60 el tranvía pasando con efecto Doppler · 51,20 chispas de catenaria · 51,60 pasos sobre los rieles metálicos.
- **Transición:** el tranvía tapa la pantalla (*wipe con objeto*) con un whoosh de viento.

**E32 · 51,88–53,42** · "Sobe a escadaria do morro." · Sub: `DIE TREPPE ZUM` **`HÜGEL`** (verde) `HINAUF.`
- **Plano:** contrapicado de una escalera estrecha del Morro da Conceição, con casitas coloridas, cables de luz enredados y banderitas. Rafael sube en el centro y la cámara lo sigue en diagonal hacia arriba.
- **Acción:** sube de dos en dos escalones, se agarra de la baranda y se impulsa. Le cuesta: el ritmo baja.
- **Fondo:** ropa tendida que se mueve, un gato que salta de una pared, una moto estacionada, plantas en latas y un cartel de "VENDE-SE GELADINHO".
- **Efectos:** 51,90 pasos en escalones de piedra · 52,40 la baranda de metal que vibra · 52,80 el gato maullando y saltando · 53,20 respiración pesada.
- **Transición:** *whip pan* lateral con un swoosh.

**E33 · 53,42–55,84** · "Beco. Cachorro latindo. Outro beco." · Sub: **`GASSE.`** (amarillo) `EIN` **`HUND`** (rojo) `BELLT.` **`NOCH EINE GASSE.`** (amarillo)
- **Plano 1 (0,6 s):** un callejón estrecho con Rafael doblando la esquina.
- **Plano 2 (1,0 s):** el vira-lata caramelo que salta del portón hacia la cámara, ladrando, con el portón vibrando. Rafael da un salto hacia atrás del susto.
- **Plano 3 (0,8 s):** otro callejón con Rafael derrapando y doblando.
- **Fondo:** paredes de ladrillo sin revocar, un portón de chapa, una antena parabólica y un cartel de "CUIDADO CÃO BRAVO" (con la traducción `VORSICHT, BISSIGER HUND` en un sticker).
- **Efectos:** 53,45 un derrape de zapatilla · 54,00 ladrido fuerte con el portón golpeado · 54,40 cadena tensándose · 55,05 un tacho de basura que cae.
- **Transición:** el tacho rueda hacia la cámara y tapa el cuadro, con un clank.

**E34 · 55,84–57,18** · "O pulmão queimando." · Sub: `DIE LUNGE` **`BRENNT.`** (rojo)
- **Plano:** primer plano centrado de Rafael, apoyado con las manos en las rodillas y jadeando. Hay un leve vaivén de cámara y aberración cromática en los bordes.
- **Acción:** el pecho sube y baja rápido, el sudor gotea, traga y tose. Un rayo x estilizado de los pulmones se pone rojo como un HUD médico.
- **Texto:** etiqueta `PULS 182` con una línea de ECG animada.
- **Efectos:** 55,90 jadeo fuerte · 56,30 bip de pulso rápido · 56,70 tos · 57,00 latido.
- **Transición:** la sirena "entra" en paneo y la cámara se aleja de golpe (zoom out) con un air pull.

**E35 · 57,18–58,93** · "Sirene vindo de todo lado." · Sub: **`SIRENEN`** (rojo) `VON ALLEN SEITEN.`
- **Plano:** un mapa HUD del morro visto desde arriba. Un punto amarillo (Rafael) está en el centro, y 7 puntos rojos y azules (las patrullas) se cierran en círculo.
- **Acción:** las patrullas avanzan con estelas luminosas y las calles de escape se ponen en rojo una por una.
- **Texto:** `STREIFENWAGEN: 7` · `FLUCHTWEGE: 3 → 0`.
- **Efectos:** 57,20 sirenas en estéreo amplio · 57,70 bip de radar · 58,20 "blocked" (buzzer) × 3, cada uno más agudo.
- **Transición:** el mapa se pliega hacia el callejón (*zoom-in*) con un whoosh.

**E36 · 58,93–61,44** · "Beco sem saída. Não tem pra onde ir." · Sub: **`SACKGASSE.`** (rojo) `KEIN` **`AUSWEG.`** (rojo)
- **Plano:** Rafael centrado, de frente a una pared de ladrillo alta con un portón soldado. La cámara gira 180° alrededor de él.
- **Acción:** golpea la pared con la palma, empuja el portón (no cede), mira a la izquierda, a la derecha y hacia arriba. Retrocede con la espalda pegada a la pared y cara de pánico.
- **Texto:** píldora roja que hace pop: `SACKGASSE`.
- **Efectos:** 58,95 **la música se corta en seco** · 59,10 palma contra el ladrillo · 59,60 un portón de metal que traquetea · 60,40 una zapatilla que pisa vidrio · 61,00 respiración temblorosa.
- **Transición:** corte duro al plano siguiente, con la luz de linterna que entra por detrás.

### BLOQUE 6 — EL CLIFFHANGER

**E37 · 61,44–63,15** · "Atrás dele: lanternas." · Sub: `HINTER IHM:` **`TASCHENLAMPEN.`** (amarillo)
- **Plano:** contraluz de la boca del callejón, donde aparecen 3 siluetas de policías centradas con conos de linterna volumétricos que apuntan a la cámara. Hay un zoom in lento.
- **Acción:** las siluetas avanzan en sincronía, con el polvo flotando en los haces.
- **Efectos:** 61,45, 61,80 y 62,10 tres clics de linterna · 62,50 pasos tácticos · 62,90 la radio: "Wir haben ihn."
- **Transición:** el haz llega a la cámara y la blanquea (*light wipe*), con un barrido de aire.

**E38 · 63,15–64,64** · "Na frente: faróis." · Sub: `VOR IHM:` **`SCHEINWERFER.`** (amarillo)
- **Plano:** Rafael centrado, girándose hacia el otro lado del callejón. Dos faros redondos se encienden al final del callejón y lo encandilan.
- **Acción:** se cubre los ojos y su sombra se proyecta larga detrás de él. Queda atrapado entre dos luces.
- **Efectos:** 63,20 la música vuelve con un riser · 63,90 el "thunk" de faros encendiéndose · 64,30 motor de Kombi (motor bóxer refrigerado por aire, característico).
- **Transición:** *zoom-in* hacia los faros con un whoosh que sube.

**E39 · 64,64–67,22** · "Uma Kombi branca freia bem na cara dele." · Sub: `EIN WEISSER` **`VW-BUS`** (verde) `BREMST DIREKT VOR IHM.`
- **Plano:** una Kombi blanca vieja, con óxido, techo bicolor, calcomanía de "Jesus te ama" en la luneta y matrícula Mercosur. Llega derrapando y frena a 30 cm de Rafael, en el centro.
- **Acción:** la carrocería cabecea hacia delante por la inercia y vuelve. Sale humo de las cubiertas y el polvo cubre las piernas de Rafael. Él retrocede con las manos levantadas.
- **Texto:** matrícula `BRA 2E19` (Mercosur).
- **Efectos:** 64,70 motor que acelera · 65,40 frenada larga con chirrido · 66,20 suspensión que rebota · 66,80 chapa que vibra.
- **Transición:** corte a primer plano con un golpe de puerta.

**E40 · 67,22–68,18** · "O vidro desce." · Sub: `DAS FENSTER` **`GEHT RUNTER.`** (amarillo)
- **Plano:** primer plano centrado de la ventanilla del conductor. El vidro baja a manivela, con un reflejo de las sirenas que se desliza en el vidrio.
- **Efectos:** 67,25 el chirrido de la manivela girando · 67,80 el vidrio que llega abajo con un "clunk".
- **Transición:** *rack focus* del vidrio a la cara de la conductora, con un "shhh" de aire.

**E41 · 68,18–70,42** · "Uma mulher que ele nunca viu na vida." · Sub: `EINE FRAU, DIE ER` **`NOCH NIE`** (rojo) `GESEHEN HAT.`
- **Plano:** la mujer centrada (según su diseño en la sección 1.4), iluminada de un lado con rojo y azul de sirenas y del otro con la luz cálida del tablero. Un plano/contraplano de 0,6 s con Rafael desconfiado (un ojo entrecerrado, la cabeza hacia atrás).
- **Acción:** la mujer mira por el retrovisor, después a Rafael. Mastica chicle y aprieta el volante.
- **Fondo:** el interior de la Kombi con un rosario colgando del retrovisor, una cinta de Senhor do Bonfim y un dado de peluche.
- **Efectos:** 68,20 motor en ralentí · 68,90 el rosario que tintinea · 69,60 chicle · 70,20 las sirenas que se acercan.
- **Transición:** *zoom-in* a sus ojos con un whoosh corto.

**E42 · 70,42–71,81** · "E ela sabe o nome dele." · Sub: `UND SIE KENNT` **`SEINEN NAMEN.`** (rosa)
- **Plano:** primer plano de Rafael en shock, con los ojos muy abiertos y las cejas arriba.
- **Texto:** una píldora rosa que hace pop: `SIE KENNT SEINEN NAMEN`.
- **Efectos:** 70,45 un "stinger" de cuerdas · 71,00 un pop de UI · 71,60 inhalación.
- **Transición:** corte duro a la mujer.

**E43 · 71,81–73,30** · "Entra, Rafael. Agora." · Sub: `„STEIG EIN,` **`RAFAEL.`** (amarillo) **`SOFORT."`** (rojo)
- **Plano:** la mujer centrada se inclina hacia la cámara y abre la puerta del pasajero desde adentro con un empujón. En el plano siguiente, la puerta abierta queda en el centro y oscura, con las luces de linterna creciendo en el fondo.
- **Acción:** su mano se estira hacia Rafael. El globo de diálogo `STEIG EIN, RAFAEL. SOFORT.` hace pop y tiembla.
- **Efectos:** 71,82 **silencio musical total** (solo ambiente) · 72,20 el clic de la manija y la puerta de la Kombi que se abre de golpe · 72,70 un boom grave sobre "Agora" · 73,10 pasos de policías que se acercan.
- **Transición:** *freeze frame* con desaturación y un "tape stop".

### BLOQUE 7 — CTA

**E44 · 73,29–78,72 (+0,5 s)** · "Ele entra na Kombi? A: entra, agora. B: continua correndo. Comenta A ou B."
- **Plano:** la tarjeta de votación centrada sobre el frame congelado de la Kombi, desenfocado y oscurecido al 60 %. Es el mismo diseño de tarjeta del video de referencia en inglés: círculo con cuenta regresiva arriba, pregunta en grande y dos botones.
- **Texto (entradas escalonadas):**
  - 73,30: la pregunta `STEIGT ER IN DEN` **`BUS?`** (amarillo), que entra con un pop.
  - 74,44: el botón `A · JA, SOFORT EINSTEIGEN` (borde verde), que entra deslizándose desde la izquierda.
  - 75,88: el botón `B · NEIN, WEITERRENNEN` (borde rojo), que entra deslizándose desde la derecha.
  - 77,42: `KOMMENTIERE A ODER B` parpadeando abajo (arriba de y = 1420).
  - La cuenta regresiva en el círculo va de `8` a `0` en todo el bloque.
- **Subtítulo:** igual que la narración, en alemán: `STEIGT ER IN DEN BUS?` → `A: JA, SOFORT.` → `B: WEITERRENNEN.` → `KOMMENTIERE A ODER B.`
- **Efectos:** 73,30 tic-tac de reloj continuo · 73,35 pop de la tarjeta · 74,45 un "click" de botón (tono alto) · 75,90 un "click" de botón (tono bajo) · 76,50 sirenas lejanas · 77,45 notificación de comentario · 78,70 un último "boom" con un corte a negro.
- **Final:** corte a negro en 79,2 s.

---

## 5. Checklist antes de exportar

- [ ] El audio maestro está sincronizado y la voz entra en 0,00 (sin silencio inicial).
- [ ] Cada plano dura ≤ 2,3 s (excepto el CTA).
- [ ] Cada corte tiene transición con efecto de sonido, y no hay dos iguales seguidos.
- [ ] Ningún hueco de más de 1,5 s pasa sin un efecto de sonido.
- [ ] Todo el texto de pantalla está en alemán, sin faltas: ß, ä, ö, ü correctos.
- [ ] La cara y la acción principal quedan siempre entre y = 260 y y = 1180, y nada importante queda debajo de los subtítulos.
- [ ] Rafael es idéntico a la referencia (cabeza, ojos, pelo, piel, buzo gris), sin barba.
- [ ] Las expresiones coinciden con la emoción de cada frase (ver la sección 1.3).
- [ ] Cada escena tiene al menos 1 objeto con animación de entrada y al menos 1 movimiento de cámara (zoom in/out, push o pan) con su efecto.
- [ ] Hay una saturación alta en las luces y las sombras no tienen negro puro.
- [ ] Todos los fondos son distintos y detallados, con detalles brasileños.
- [ ] La mezcla tiene la voz arriba, ducking en efectos y música, y un pico de −1 dBTP.
