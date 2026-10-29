/**
 * ============================================================================
 * MATCHWEEK — GOOGLE APPS SCRIPT BACKEND SERVICE (FASE 3A)
 * ============================================================================
 * Servicio de lectura seguro, de solo lectura, para consultar los datos
 * deportivos de las 7 pestañas de la hoja de cálculo de Matchweek.
 * 
 * Hoja de cálculo objetivo: Matchweek_Datos
 * ID: 1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw
 * ============================================================================
 */

/**
 * Endpoint HTTP GET para la lectura pública de solo lectura.
 * Responde con un JSON estructurado con las 7 pestañas de la hoja de cálculo.
 * No requiere autenticación interactiva de los visitantes de GitHub Pages.
 */
function doGet(e) {
  try {
    const spreadsheetId = '1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw';
    const ss = SpreadsheetApp.openById(spreadsheetId);

    const sheetNames = [
      'Competiciones',
      'Equipos',
      'Partidos',
      'Ultimos 5 partidos',
      'Enfrentamientos H2H',
      'Estadisticas',
      'Control de actualizaciones'
    ];

    const result = {
      status: 'success',
      timestampUtc: new Date().toISOString(),
      timestampPeru: Utilities.formatDate(new Date(), 'America/Lima', "yyyy-MM-dd'T'HH:mm:ssXXX"),
      spreadsheetId: spreadsheetId,
      version: '1.0.0',
      data: {}
    };

    sheetNames.forEach(function(sheetName) {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        result.data[sheetName] = [];
        return;
      }

      const values = sheet.getDataRange().getValues();
      if (!values || values.length <= 1) {
        // Hoja vacía o solo contiene fila de encabezados
        result.data[sheetName] = [];
        return;
      }

      // Fila 0 contiene los nombres de las columnas
      const headers = values[0].map(function(h) {
        return String(h).trim();
      });

      const records = [];
      for (var i = 1; i < values.length; i++) {
        var row = values[i];
        var item = {};
        var hasContent = false;

        for (var j = 0; j < headers.length; j++) {
          var header = headers[j];
          if (!header) continue;
          var val = row[j];

          // Formatear fechas y valores nulos
          if (val instanceof Date) {
            val = val.toISOString();
          } else if (val === '' || val === undefined) {
            val = null;
          }

          if (val !== null) hasContent = true;
          item[header] = val;
        }

        // Solo agregar filas con contenido real
        if (hasContent) {
          records.push(item);
        }
      }

      result.data[sheetName] = records;
    });

    // Añadir resumen técnico
    result.summary = {
      totalCompeticiones: result.data['Competiciones'].length,
      totalEquipos: result.data['Equipos'].length,
      totalPartidos: result.data['Partidos'].length,
      totalUltimos5: result.data['Ultimos 5 partidos'].length,
      totalH2H: result.data['Enfrentamientos H2H'].length,
      totalEstadisticas: result.data['Estadisticas'].length,
      totalControles: result.data['Control de actualizaciones'].length
    };

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    const errorOutput = {
      status: 'error',
      message: err.toString(),
      timestampUtc: new Date().toISOString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorOutput))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
