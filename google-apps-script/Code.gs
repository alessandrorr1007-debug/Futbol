/**
 * ============================================================================
 * MATCHWEEK — GOOGLE APPS SCRIPT BACKEND SERVICE (FASE 3B)
 * ============================================================================
 * Servicio de lectura seguro, de solo lectura, para consultar los datos
 * deportivos de las 13 pestañas de la hoja de cálculo de Matchweek.
 * 
 * Hoja de cálculo objetivo: Matchweek_Datos
 * ID: 1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw
 * ============================================================================
 */

function doGet(e) {
  try {
    const spreadsheetId = '1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw';
    const ss = SpreadsheetApp.openById(spreadsheetId);

    const allSheetNames = [
      'Competiciones',
      'Equipos',
      'Partidos',
      'Ultimos 5 partidos',
      'Enfrentamientos H2H',
      'Estadisticas',
      'Control de actualizaciones',
      'Goles',
      'Eventos del partido',
      'Alineaciones',
      'Clasificaciones',
      'Cobertura diaria',
      'Detalle final'
    ];

    // Soporte para filtrar por pestaña individual (?sheet=Partidos)
    var requestedSheet = (e && e.parameter && e.parameter.sheet) ? e.parameter.sheet : null;
    var targetSheets = requestedSheet ? [requestedSheet] : allSheetNames;

    const result = {
      status: 'success',
      timestampUtc: new Date().toISOString(),
      timestampPeru: Utilities.formatDate(new Date(), 'America/Lima', "yyyy-MM-dd'T'HH:mm:ssXXX"),
      spreadsheetId: spreadsheetId,
      version: '3.1.0',
      data: {}
    };

    targetSheets.forEach(function(sheetName) {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        result.data[sheetName] = [];
        return;
      }

      const values = sheet.getDataRange().getValues();
      if (!values || values.length <= 1) {
        result.data[sheetName] = [];
        return;
      }

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

          if (val instanceof Date) {
            val = val.toISOString();
          } else if (val === '' || val === undefined) {
            val = null;
          }

          if (val !== null) hasContent = true;
          item[header] = val;
        }

        if (hasContent) {
          records.push(item);
        }
      }

      result.data[sheetName] = records;
    });

    result.summary = {
      sheetsReturned: Object.keys(result.data).length,
      partidosCount: result.data['Partidos'] ? result.data['Partidos'].length : 0,
      equiposCount: result.data['Equipos'] ? result.data['Equipos'].length : 0
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
