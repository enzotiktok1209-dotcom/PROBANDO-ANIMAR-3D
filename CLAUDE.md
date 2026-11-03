# Proyecto: videos storytime de muñecos de bloques en 3D

Este proyecto se usa **solo** para hacer un tipo de video: storytimes verticales (9:16) en primera persona, en un mundo 3D de juguete con personajes de bloques, cortes cada ~2 s, cámara siempre en movimiento, subtítulos de una palabra amarilla y pop-ups de dinero.

Antes de planificar o animar cualquier video:
1. Lee `plugins/animate/skills/animate/styles/blocky-3d/STYLE.md` (el estilo, con medidas) y `REFERENCIA.md` (el análisis plano por plano y la fórmula de guion en 13 bloques).
2. Usa la skill `animate` (`plugins/animate/skills/animate/SKILL.md`) con `"style": "blocky-3d"`.
3. El idioma de trabajo con el usuario es el español.

Reglas fijas de este formato:
- Plano medio 2 s, cortes secos, nunca dos encuadres iguales seguidos, nunca cámara quieta (push-in +2–7 %/s por defecto).
- Subtítulo: una palabra a la vez, `#E2FD07` con contorno negro, pop 20 %→112 %→100 % en 3 fotogramas.
- Cada número dicho aparece en el mundo (pop-up, teléfono, cartel).
- Guion: regla absurda → me afecta → el pueblo se adapta → mi invento → el poder contraataca → caos → pista → guarida secreta → botón → celebración → giro final peor.
- Personajes y nombres inventados para cada video; sin logos, marcas de agua ni nombres de otros creadores o juegos.
- El video de referencia y sus fotogramas nunca se suben al repo.
