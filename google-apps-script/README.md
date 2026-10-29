# Servicio de Lectura Google Apps Script — Matchweek (Fase 3B)

Este servicio proporciona un endpoint JSON seguro y de solo lectura para conectar **Matchweek** alojado en GitHub Pages con la hoja de cálculo de Google Sheets.

## 📄 Archivo de Datos Objetivo
* **Nombre:** Matchweek_Datos
* **ID:** `1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw`
* **URL:** [https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit](https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit)

### Las 13 Pestañas Soportadas:
1. `Competiciones`
2. `Equipos`
3. `Partidos`
4. `Ultimos 5 partidos`
5. `Enfrentamientos H2H`
6. `Estadisticas`
7. `Control de actualizaciones`
8. `Goles`
9. `Eventos del partido`
10. `Alineaciones`
11. `Clasificaciones`
12. `Cobertura diaria`
13. `Detalle final`

---

## 🚀 Instrucciones de Despliegue (Paso a Paso)

Si eres el propietario de la hoja de cálculo y deseas desplegar tu propia Web App:

1. Abre la hoja de cálculo [Matchweek_Datos](https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit).
2. En el menú superior, ve a **Extensiones** > **Apps Script**.
3. Pega el código de `Code.gs` en el editor.
4. Haz clic en **Implementar** (Deploy) > **Nueva implementación** (New deployment).
5. Selecciona el tipo: **Aplicación web** (Web app).
6. Configuración de permisos:
   * **Descripción:** `Matchweek Data Reader v3.1`
   * **Ejecutar como:** `Yo` (tu cuenta de Google)
   * **Quién tiene acceso:** `Cualquier usuario` (Anyone)
7. Haz clic en **Implementar**.
8. Copia la **URL de la aplicación web** generada (termina en `/exec`).
9. En Matchweek, puedes configurar esta URL en `app.js` dentro de `MatchweekConfig.googleSheets.appsScriptUrl`.

---

## 🛡️ Seguridad y Permisos

* **Solo Lectura:** El script únicamente implementa la función `doGet()`. No contiene métodos de escritura (`doPost`, `doPut`, `doDelete`), imposibilitando cualquier modificación accidental o maliciosa del archivo.
* **Sin Credenciales Expuestas:** El frontend no almacena API keys privadas ni secretos de OAuth.
* **CORS Habilitado:** Google Apps Script Web Apps devuelven cabeceras CORS adecuadas con redirección 302 hacia `script.googleusercontent.com` gestionada automáticamente por el navegador.

