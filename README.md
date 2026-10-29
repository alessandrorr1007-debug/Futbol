# Matchweek 2.0 — Premium Football Intelligence

Plataforma de inteligencia deportiva para consultar partidos, calendarios de dos semanas (14 días), análisis tácticos con cancha reglamentaria, estadísticas comparativas estilo Sofascore, cronología minuto a minuto bilateral y clasificaciones oficiales, sincronizada en tiempo real con 14 pestañas de Google Sheets.

---

## 🚀 Inicio Rápido y Despliegue

La web está optimizada para ejecutarse en cualquier navegador moderno y desplegarse directamente en GitHub Pages.

```bash
# Servir localmente en puerto 8080
python -m http.server 8080
```
Abrir: [http://localhost:8080](http://localhost:8080)

* **Web Publicada en GitHub Pages:** [https://alessandrorr1007-debug.github.io/Futbol/](https://alessandrorr1007-debug.github.io/Futbol/)
* **Google Sheets Oficial (Matchweek_Datos):** [https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit](https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit)

---

## ⚡ Novedades Principales en Matchweek 2.0

### 1. Ventana de 14 Días (Dos Semanas de Partidos)
* **Semana actual (Lunes a Domingo):** Encuentros finalizados, en vivo y programados.
* **Semana siguiente (Lunes a Domingo):** Próximos encuentros de ambas semanas.
* **Cálculo dinámico en horario de Perú (`America/Lima`, UTC-5):** Sin fechas fijas ni desfases por cálculos en UTC.
* **Selector superior de período:**
  * `⚡ Esta semana` (7 días de lunes a domingo)
  * `📅 Próxima semana` (7 días de lunes a domingo)
  * `♾ Ver 14 días` (14 días cronológicos completos)
* **Tira de fechas reactiva:** Píldora `TODOS` dinámica y resaltado sutil del día actual (`is-today`).
* **Subagrupación por día y competición:** Cada día agrupa sus encuentros por torneo (`.comp-group-block`) con bandera, nombre y contador, ordenados cronológicamente.

### 2. Tarjetas de Partido Profesionales e Interactivas
* Toda la tarjeta es clickeable (`cursor: pointer`, accesible mediante teclado con `Enter` o `Espacio`) para abrir la ficha técnica.
* Botón de favoritos accesible con `e.stopPropagation()`.
* Diferenciación de 7 estados oficiales: `PROGRAMADO`, `EN VIVO`, `DESCANSO`, `FINALIZADO`, `APLAZADO`, `SUSPENDIDO`, `CANCELADO`.
* Previsualización de goleadores en la tarjeta con iconos ⚽, minutos y penaltis.

### 3. Rediseño Integral del Modal de Análisis (6 Pestañas)
* **Encabezado Persistente:** Competición, jornada, local y visitante con escudos en alta resolución, marcador central, estado y cinta de metadatos (`.dialog-meta-strip`: estadio, árbitro, fecha en horario peruano).
* **Pestaña 1 — Resumen:**
  * Goleadores bilaterales: columna local y visitante con minuto, jugador, asistencia y tipo de gol.
  * Línea de tiempo (timeline) bilateral: eje central con medallas de minutos y eventos deportivos a cada lado (⚽ Gol, 🟨 Amarilla, 🟥 Roja, 🔄 Sustitución, 🎯 Penalti, 📺 VAR).
  * Tarjeta de detalle final: marcador al descanso, asistencia oficial de público y resumen verificado.
* **Pestaña 2 — Estadísticas Comparativas (Sofascore Style):**
  * Visualización horizontal con barras proporcionales y acento de equipo dominante.
  * 4 categorías estructuradas: *Control de juego* (Posesión, Pases, Precisión), *Ataque* (Remates, Tiros a puerta, xG), *Disciplina* (Faltas, Amarillas, Rojas) y *Otras* (Córners, Fueras de juego, Paradas).
  * Exclusión estricta de métricas históricas `h2h_*` para evitar confusión con el encuentro analizado.
* **Pestaña 3 — Alineaciones y Cancha Táctica ⚽:**
  * Cancha reglamentaria SVG con césped degradado, líneas oficiales y áreas reglamentarias.
  * Distribución táctica de jugadores según la formación de cada club (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, etc.).
  * Nodos de jugadores con dorsal, nombre corto e iconos de incidencias (goles, tarjetas, sustitución).
  * Selector toggle para alternar entre **Cancha Táctica ⚽** y **Vista Lista 📋**.
  * Roster completo con titulares, suplentes y directores técnicos.
* **Pestaña 4 — Forma Reciente:**
  * Bloques separados para local y visitante con los últimos 5 partidos (del más reciente al más antiguo).
  * Secuencia visual de resultados con insignias (V verde, E ámbar, D rojo).
  * Resumen estadístico calculado matemáticamente (V, E, D, GF, GC, DG).
* **Pestaña 5 — Historial H2H:**
  * Barra comparativa tricolor: Victorias Local (acento verde) | Empates (neutro) | Victorias Visitante (celeste).
  * Contadores de victorias y empates.
  * Tarjetas compactas de enfrentamientos directos previos.
* **Pestaña 6 — Clasificación Oficial:**
  * Tabla completa (`#`, Escudo, Equipo, PJ, PG, PE, PP, GF, GC, DG, Pts).
  * Resaltado sutil (`.highlight-team`) de los dos equipos participantes del encuentro.
  * Contenedor responsive con scroll horizontal en móvil.

---

## 📊 Integración con las 14 Pestañas de Google Sheets

La plataforma lee y sincroniza en paralelo las 14 pestañas oficiales de Google Sheets mediante la API pública de Google Visualization (GViz JSON):

1. `Competiciones` (11 torneos oficiales)
2. `Equipos` (Directorio y escudos de clubes)
3. `Partidos` (Agenda de encuentros, fechas y horarios de Perú)
4. `Ultimos 5 partidos` (Rachas y antecedentes recientes)
5. `Enfrentamientos H2H` (Historial directo entre rivales)
6. `Estadisticas` (Métricas numéricas de juego)
7. `Control de actualizaciones` (Logs de actualización)
8. `Goles` (Anotadores, minutos y asistencias)
9. `Eventos del partido` (Tarjetas, sustituciones, goles minuto a minuto)
10. `Alineaciones` (Titulares, suplentes, dorsales, formaciones y entrenadores)
11. `Clasificaciones` (Tablas de posiciones oficiales)
12. `Cobertura diaria` (Verificación de fechas con y sin partidos)
13. `Detalle final` (Marcadores al descanso, árbitros y asistencias de público)
14. `Auditoria semanal` (Verificación integral de consistencia semanal)

---

## 🧪 Pruebas Automatizadas y Validación en Navegador Real

La aplicación fue evaluada y validada en **Google Chrome real** mediante DevTools Protocol (CDP):

```bash
node scratch/test_matchweek_2_real_browser.js
```

### Resultados de la suite en navegador real:
* **Conexión CDP:** Establecida exitosamente en puerto 9222.
* **Sincronización:** 14 pestañas consultadas sin errores (59 partidos, 20 goles, 68 eventos, 172 alineaciones, 88 estadísticas, 41 H2H, 70 registros de forma, 40 clasificaciones, 59 auditorías).
* **Selector 14 días:** 14 días renderizados, tira de 15 píldoras, 59 partidos visibles.
* **Agrupación por competición:** 21 bloques subagrupados con banderas y contadores.
* **Modal de análisis (Sevilla vs Osasuna):** Encabezado persistente, 6 pestañas funcionales.
* **Estadísticas comparativas:** 4 categorías verificadas, barras proporcionales activas, cero contaminación de promedios H2H.
* **Cancha táctica:** 22 jugadores posicionados en 4-4-2 y 4-3-3, nodos de dorsal y nombres cortos, toggle a lista verificado.
* **Forma reciente y H2H:** 20 insignias de racha, barras comparativas 3-partes verificadas.
* **Clasificación:** Tabla oficial con resaltado de ambos equipos.
* **Responsive Móvil:** Viewport 390x844 px verificado sin desbordamientos horizontales.
