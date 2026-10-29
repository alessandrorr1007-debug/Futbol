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

## 📁 Archivos del Proyecto

- `index.html`: Estructura semántica, accesibilidad y contenedores de diseño.
- `styles.css`: Sistema de diseño completo, variables, responsive y temas.
- `app.js`: Lógica reactiva, gestión de estado, cálculo de fechas y renderizado.
