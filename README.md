# Matchweek — Premium Football Intelligence

Plataforma de inteligencia deportiva para consultar partidos semanales, competiciones, resultados y estadísticas oficiales con dirección de arte premium y experiencia de usuario de nivel comercial.

## 🚀 Inicio Rápido

Abre `index.html` en cualquier navegador web moderno. Para servirla localmente:

```bash
# Servir con Python en puerto 8080
python -m http.server 8080
```
Luego abre [http://localhost:8080](http://localhost:8080) en tu navegador.

---

## 🎨 Identidad Visual y Sistema de Diseño

La interfaz combina los principios de **Sports Media + Data Intelligence + Modern SaaS Dashboard** con una paleta de alta precisión:

* **Fondo principal:** `#080D12`
* **Superficies:** `#101922`
* **Superficies elevadas:** `#17232D`
* **Bordes:** `#26333D`
* **Acento principal:** `#C6FF4D` (Lime tech / electric pitch)
* **Texto principal:** `#F5F7FA`
* **Texto secundario:** `#94A3B8`
* **Tipografía:** *Outfit* (títulos, encabezados, números) + *DM Sans* (interfaz y lectura)
* **Números tabulares:** Implementación de `font-variant-numeric: tabular-nums` para marcadores, fechas y cronómetros.

---

## 🏆 Organización de Competiciones (11)

La navegación lateral y el directorio central se organizan en los siguientes grupos oficiales:

### 1. PRINCIPAL
- **Inicio**
- **Todos los partidos**
- **Favoritos**

### 2. GRANDES LIGAS
- **Premier League** — Inglaterra
- **LaLiga** — España
- **Serie A** — Italia
- **Bundesliga** — Alemania
- **Ligue 1** — Francia

### 3. COMPETICIONES EUROPEAS
- **UEFA Champions League**
- **UEFA Europa League**
- **UEFA Conference League**

### 4. SUDAMÉRICA
- **Copa Libertadores**
- **Copa Sudamericana**

### 5. PERÚ
- **Liga 1** — Perú

Cada competición cuenta con:
- Emblema vectorial SVG independiente y color característico.
- Filtro funcional para visualizar únicamente sus partidos.
- Banner de cabecera con país, confederación, año de fundación y temporada.
- Estado vacío contextual profesional.

---

## 🛡️ Estado de los Datos (Cero Datos Simulados)

- **Sin partidos ficticios:** Se han eliminado por completo los encuentros de demostración (Chelsea vs. Man Utd, Liverpool vs. Arsenal, etc.).
- **Contadores fidedignos:** Los contadores deportivos muestran `0` hasta la integración de la API. El contador de competiciones muestra `11` (estructura activa de la plataforma).
- **Estados vacíos elegantes:** Cada sección muestra mensajes orientativos profesionales indicando que los encuentros aparecerán cuando se habilite la actualización de datos oficiales.

---

## ✨ Componentes y Funcionalidades

- **Hero Editorial:** Composición abstracta inspirada en un campo táctico y líneas de juego (*"El fútbol no se detiene."*).
- **Calendario Semanal:** Cálculo dinámico de semanas de lunes a domingo, navegación histórica, botón *"Hoy"*, diferenciación de fin de semana y selección interactiva.
- **Buscador en Tiempo Real:** Búsqueda rápida por competición o equipo con atajo de teclado `/` y botón de limpieza instantánea.
- **Favoritos:** Almacenamiento persistente en el navegador con `localStorage`.
- **Ficha Técnica y Análisis:** Modal accesible (`<dialog>`) preparado para estadísticas, antecedentes H2H y resúmenes tácticos con IA.
- **Diseño Responsive:** Adaptabilidad completa validada en resoluciones móviles (360px, 390px), tablets (768px, 1024px) y escritorio (1440px, 1920px).
- **Compatibilidad con GitHub Pages:** Rutas relativas seguras sin dependencias externas pesadas.

---

## 🔮 Preparación para Futuras Integraciones

El código en `app.js` cuenta con servicios modulares preparados para:
1. **Actualización automática cada lunes a las 04:00 UTC** (`MatchweekConfig.schedule`).
2. **Obtención de resultados reales** (`RealScoresService`).
3. **Estadísticas de rendimiento y xG** (`PerformanceStatsService`).
4. **Últimos cinco partidos de cada equipo** (`TeamFormService`).
5. **Historial de enfrentamientos directos H2H** (`HeadToHeadService`).
6. **Clasificaciones oficiales de liga** (`StandingsService`).
7. **Análisis predictivo con Inteligencia Artificial** (`AiIntelligenceService`).

---

## 📊 Fase 3A: Integración con Google Sheets (Matchweek_Datos)

Matchweek cuenta con una integración profesional, reactiva y segura con el archivo oficial de Google Sheets:
* **Archivo oficial:** [Matchweek_Datos](https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit)
* **Spreadsheet ID:** `1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw`

### Las 7 Pestañas Sincronizadas
1. **Competiciones:** `competicion_id`, `nombre`, `region`, `pais_confederacion`, `temporada`, `activo`.
2. **Equipos:** `equipo_id`, `nombre_oficial`, `nombre_corto`, `pais`, `escudo_url`, `fuente_url`, `verificado_en`.
3. **Partidos:** `partido_id`, `competicion_id`, `temporada`, `fecha_hora_utc`, `fecha_hora_peru`, `local_id`, `visitante_id`, `estadio`, `estado`, `goles_local`, `goles_visitante`, `fuente_url`, `verificado_en`.
4. **Ultimos 5 partidos:** `partido_id_objetivo`, `equipo_id`, `resultado`, `rival_id`, `goles_a_favor`, `goles_en_contra`, `fecha`.
5. **Enfrentamientos H2H:** `partido_id_objetivo`, `partido_historico_id`, `local_id`, `visitante_id`, `goles_local`, `goles_visitante`, `fecha`.
6. **Estadisticas:** `partido_id`, `equipo_id`, `metrica`, `valor`, `unidad`, `periodo`, `fuente_url`, `verificado_en`.
7. **Control de actualizaciones:** `estado`, `inicio_utc`, `fin_utc`, `duracion_segundos`, `filas_insertadas`.

---

### 🔄 Botón «Actualizar partidos» y sus 5 Estados Obligatorios
El botón situado en el encabezado superior (y replicado en el banner de estado táctico) gestiona el ciclo de vida de la consulta:
1. **Estado inicial:** Disponible para iniciar la consulta («Actualizar partidos»).
2. **Estado de carga:** Muestra *"Consultando datos deportivos..."*, bloquea solicitudes duplicadas temporalmente e inicia la animación de rotación suave.
3. **Estado exitoso:** Muestra *"Datos actualizados correctamente."*, indicando la fecha y hora de la consulta en **horario de Perú (`America/Lima`)**.
4. **Estado sin registros:** Muestra *"No hay partidos registrados para esta semana."* cuando la hoja no incluye encuentros para la semana actual, respetando la política de cero invención de datos.
5. **Estado de error:** Muestra *"No fue posible consultar los datos. Inténtalo nuevamente."* permitiendo reintentar sin romper la interfaz.

---

### 🔒 Arquitectura de Seguridad y Rendimiento
* **Cero claves privadas en frontend:** No se exponen tokens OAuth ni claves API sensibles en el código del navegador.
* **Transporte Nativo sin Restricciones CORS:** Implementación de transporte directo mediante Google Visualization API (JSONP) que opera de forma 100% nativa en GitHub Pages sin requerir proxies de terceros.
* **Servicio Google Apps Script (Opcional):** Código preparado en `google-apps-script/Code.gs` para actuar como backend de solo lectura con caché y cuotas seguras.
* **Validación y Sanitización:** `DataTransformer` sanitiza HTML y URLs para prevenir ataques XSS, descarta identificadores duplicados y diferencia numéricamente el marcador `0` de la ausencia de datos (`null`).
* **Caché Local Offline:** Si una consulta falla debido a pérdida de conectividad, se preservan los últimos datos válidos en `localStorage`.

---

---

## 📊 Fase 3B: Historial Semanal, Resultados Finales y Estadísticas Profesionales

En la Fase 3B, Matchweek se consolida como un historial futbolístico fidedigno y completo, garantizando que todos los partidos registrados (desde el lunes hasta el domingo de la semana seleccionada) se visualicen permanentemente, sin desaparecer al terminar.

### 1. Resolución de Partidos Anteriores y Calendario Semanal
* **Zona Horaria Estricta:** Toda la lógica de agrupación y cálculo de fechas opera bajo `America/Lima` (UTC-5), evitando que diferencias con la medianoche UTC desplacen encuentros al día siguiente o a la semana anterior.
* **Píldora «SEMANA TODOS»:** Permite visualizar en una sola vista toda la agenda semanal de lunes a domingo (59 partidos registrados).
* **Partidos Finalizados Conservados:** Encuentros como *Sevilla vs. Osasuna (2-0)* y *Paris Saint-Germain vs. Olympique Lyon (2-0)* permanecen visibles con su marcador oficial, goleadores y ficha completa.
* **Navegación Histórica:** Botones `‹` y `›` para navegar entre semanas, botón `Hoy` para regresar a la fecha actual y selector directo para cada día de la semana.

---

### 2. Las 13 Pestañas Oficiales Sincronizadas
La plataforma lee e integra relacionalmente las 13 hojas del libro oficial de Google Sheets mediante `&headers=1`:
1. **Competiciones:** Metadatos de los 11 torneos oficiales.
2. **Equipos:** 107 clubes con escudo, nombre oficial, nombre corto y país.
3. **Partidos:** 59 encuentros con fecha/hora UTC, fecha/hora Perú, estadio, marcador y estado.
4. **Ultimos 5 partidos:** Forma reciente vinculada por `partido_id_objetivo` y `equipo_id`.
5. **Enfrentamientos H2H:** Historial directo vinculado por `partido_id_objetivo`.
6. **Estadisticas:** Métricas por `partido_id` y `equipo_id`.
7. **Control de actualizaciones:** Registro de ejecuciones del pipeline.
8. **Goles:** Goleadores, minutos, penaltis y asistencias vinculados por `partido_id`.
9. **Eventos del partido:** Cronología de goles, tarjetas amarillas/rojas y sustituciones.
10. **Alineaciones:** Titulares, suplentes y posiciones vinculados por `partido_id`.
11. **Clasificaciones:** Tabla de posiciones vinculada por `competicion_id` y `temporada`.
12. **Cobertura diaria:** Registro de días verificados por `fecha_peru` y `competicion_id`.
13. **Detalle final:** Marcador al descanso, árbitro principal y asistencia confirmada.

---

### 3. Los 4 Estados Vacíos Contextuales Obligatorios
Para garantizar máxima transparencia y evitar afirmar erróneamente que no hubo partidos, la interfaz evalúa contra la pestaña `Cobertura diaria`:
* **CASO A (Cobertura verificada sin partidos):**
  *"No hubo partidos programados para este día."*
* **CASO B (Cobertura todavía no consultada):**
  *"Todavía no se ha verificado la programación de este día."*
* **CASO C (Consulta con errores):**
  *"No se pudo comprobar la programación. Intenta actualizar."*
* **CASO D (Hay partidos en otras competiciones):**
  *"No hay partidos de esta competición para el día seleccionado."*

---

### 4. Normalización de 7 Estados de Partido
Normalización bidireccional desde Google Sheets a identificadores canónicos:
* `PROGRAMADO` (`upcoming`)
* `EN_VIVO` (`live`)
* `DESCANSO` (`halftime`)
* `FINALIZADO` (`finished`)
* `APLAZADO` (`postponed`)
* `SUSPENDIDO` (`suspended`)
* `CANCELADO` (`cancelled`)

---

### 5. Ficha Profesional del Encuentro (Modal de 6 Pestañas)
El modal `#matchDialog` organiza los datos en pestañas interactivas sin gráficos ficticios:
1. **Resumen:** Marcador, goleadores oficiales con minutos y asistencias, árbitro, marcador al descanso y cronología de eventos.
2. **Estadísticas:** Métricas numéricas reales desde la pestaña `Estadisticas` (o estado vacío si no hay datos).
3. **Alineaciones:** Titulares y suplentes divididos por equipo local y visitante.
4. **Forma reciente:** Últimos 5 partidos oficiales con resultados (V, E, D) y marcadores.
5. **Historial H2H:** Enfrentamientos directos previos entre ambos clubes.
6. **Clasificación:** Tabla de posiciones oficial de la competición con resaltado de ambos equipos.

---

## 📁 Archivos del Proyecto

- `index.html`: Estructura semántica, accesibilidad, botón `#syncButton`, banner táctico `#syncBanner` y modal `#matchDialog`.
- `styles.css`: Sistema de diseño, tokens tipográficos, estados de sincronización, animaciones, números tabulares y diseño responsive.
- `app.js`: Controlador UI v3.2.0, `CalendarService` (America/Lima), `DataTransformer` (13 hojas), `GoogleSheetsSyncService` y gestión modal.
- `google-apps-script/Code.gs`: Endpoint optimizado con soporte para las 13 pestañas y parámetro `?sheet=`.
- `google-apps-script/README.md`: Documentación técnica de despliegue para Google Apps Script.
- `scratch/test_phase3b_complete.js`: Suite automatizada de 51 pruebas de integración y validación.


