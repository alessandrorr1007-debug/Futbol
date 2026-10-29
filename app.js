/**
 * ============================================================================
 * MATCHWEEK — PREMIUM FOOTBALL INTELLIGENCE
 * ============================================================================
 * Arquitectura frontend moderna, reactiva, accesible y orientada a datos reales.
 * Versión: 3.2.0 — Fase 3B: Historial semanal, resultados finales y estadísticas
 * 
 * Fuente oficial: Google Sheets (Matchweek_Datos)
 * ID del libro: 1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw
 * ============================================================================
 */

'use strict';

/**
 * ----------------------------------------------------------------------------
 * 1. CONFIGURACIÓN DEL SISTEMA
 * ----------------------------------------------------------------------------
 */
const MatchweekConfig = {
  name: 'Matchweek',
  tagline: 'Football Intelligence',
  version: '4.0.0', // Matchweek 2.0: Dos semanas de partidos, cancha táctica y 14 pestañas
  season: '2026/27',
  timezone: 'America/Lima', // UTC-5 estricto
  locale: 'es-PE',

  // Configuración de las 14 pestañas oficiales de Google Sheets
  googleSheets: {
    spreadsheetId: '1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw',
    sheetsUrl: 'https://docs.google.com/spreadsheets/d/1txMziS4K5lBqM9k2erksVN0KcfOZa1fTcz0-SReYROw/edit',
    sheetNames: [
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
      'Detalle final',
      'Auditoria semanal'
    ],
    // URL opcional de Google Apps Script Web App (si se despliega)
    appsScriptUrl: ''
  },

  schedule: {
    updateDayIso: 1, // Lunes
    updateHourUtc: 4,
    label: 'Lunes a las 04:00 UTC'
  }
};

/**
 * ----------------------------------------------------------------------------
 * 2. MAPEO BIDIRECCIONAL DE IDENTIFICADORES DE COMPETICIÓN
 * ----------------------------------------------------------------------------
 */
const COMPETITION_ID_MAP = {
  'PL': 'premier-league',
  'PD': 'laliga',
  'SA': 'serie-a',
  'BL1': 'bundesliga',
  'FL1': 'ligue-1',
  'CL': 'champions-league',
  'EL': 'europa-league',
  'ECL': 'conference-league',
  'LIB': 'copa-libertadores',
  'SUD': 'copa-sudamericana',
  'PER1': 'liga-1',
  // Inversos para soporte canónico
  'premier-league': 'premier-league',
  'laliga': 'laliga',
  'serie-a': 'serie-a',
  'bundesliga': 'bundesliga',
  'ligue-1': 'ligue-1',
  'champions-league': 'champions-league',
  'europa-league': 'europa-league',
  'conference-league': 'conference-league',
  'copa-libertadores': 'copa-libertadores',
  'copa-sudamericana': 'copa-sudamericana',
  'liga-1': 'liga-1'
};

const CATEGORIES = [
  { id: 'grandes-ligas', name: 'GRANDES LIGAS', subtitle: 'Las 5 ligas de élite europea', shortName: 'Ligas' },
  { id: 'europeas', name: 'COMPETICIONES EUROPEAS', subtitle: 'Torneos continentales UEFA', shortName: 'UEFA' },
  { id: 'sudamerica', name: 'SUDAMÉRICA', subtitle: 'Torneos continentales CONMEBOL', shortName: 'CONMEBOL' },
  { id: 'peru', name: 'PERÚ', subtitle: 'Fútbol profesional peruano', shortName: 'Perú' }
];

const COMPETITIONS = [
  // --- GRANDES LIGAS ---
  {
    id: 'premier-league',
    sheetId: 'PL',
    name: 'Premier League',
    country: 'Inglaterra',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'PL',
    accentColor: '#9A6BFF',
    badgeBg: 'rgba(154, 107, 255, 0.14)',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    founded: '1992',
    description: 'Máxima categoría del fútbol profesional inglés y liga más vista del planeta.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/><path d="M5 19h14v2H5z"/></svg>`
  },
  {
    id: 'laliga',
    sheetId: 'PD',
    name: 'LaLiga',
    country: 'España',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'LL',
    accentColor: '#FF4B4B',
    badgeBg: 'rgba(255, 75, 75, 0.14)',
    flag: '🇪🇸',
    founded: '1929',
    description: 'La máxima competición de clubes de España, hogar de históricos clásicos mundiales.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2 12"/></svg>`
  },
  {
    id: 'serie-a',
    sheetId: 'SA',
    name: 'Serie A',
    country: 'Italia',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'SA',
    accentColor: '#008FD7',
    badgeBg: 'rgba(0, 143, 215, 0.14)',
    flag: '🇮🇹',
    founded: '1898',
    description: 'El campeonato italiano por excelencia, caracterizado por su rigor táctico y pasión.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
  },
  {
    id: 'bundesliga',
    sheetId: 'BL1',
    name: 'Bundesliga',
    country: 'Alemania',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'BL',
    accentColor: '#D10214',
    badgeBg: 'rgba(209, 2, 20, 0.14)',
    flag: '🇩🇪',
    founded: '1963',
    description: 'Fútbol alemán con estadios repletos, juego vertical y promedio goleador de élite.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  },
  {
    id: 'ligue-1',
    sheetId: 'FL1',
    name: 'Ligue 1',
    country: 'Francia',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'L1',
    accentColor: '#091C3E',
    badgeBg: 'rgba(9, 28, 62, 0.35)',
    flag: '🇫🇷',
    founded: '1932',
    description: 'La división de honor de Francia, cuna de talentos mundiales y potencia europea.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  },

  // --- COMPETICIONES EUROPEAS ---
  {
    id: 'champions-league',
    sheetId: 'CL',
    name: 'UEFA Champions League',
    country: 'Europa',
    category: 'europeas',
    categoryName: 'Competiciones Europeas',
    shortCode: 'UCL',
    accentColor: '#00F0FF',
    badgeBg: 'rgba(0, 240, 255, 0.14)',
    flag: '🇪🇺',
    founded: '1955',
    description: 'El torneo de clubes más prestigioso del fútbol mundial. La cúspide europea.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>`
  },
  {
    id: 'europa-league',
    sheetId: 'EL',
    name: 'UEFA Europa League',
    country: 'Europa',
    category: 'europeas',
    categoryName: 'Competiciones Europeas',
    shortCode: 'UEL',
    accentColor: '#FF6900',
    badgeBg: 'rgba(255, 105, 0, 0.14)',
    flag: '🇪🇺',
    founded: '1971',
    description: 'La gran batalla europea por la gloria continental y el billete directo a la Champions.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v4H6z"/><path d="M7 7v4c0 3.5 2.5 6 5 6s5-2.5 5-6V7"/><path d="M12 17v4m-3 0h6"/></svg>`
  },
  {
    id: 'conference-league',
    sheetId: 'ECL',
    name: 'UEFA Conference League',
    country: 'Europa',
    category: 'europeas',
    categoryName: 'Competiciones Europeas',
    shortCode: 'UECL',
    accentColor: '#05C46B',
    badgeBg: 'rgba(5, 196, 107, 0.14)',
    flag: '🇪🇺',
    founded: '2021',
    description: 'Tercer certamen europeo de la UEFA, impulsando la competitividad de clubes en ascenso.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="12,6 14,10 18,11 15,14 16,18 12,16 8,18 9,14 6,11 10,10" fill="currentColor" stroke="none"/></svg>`
  },

  // --- SUDAMÉRICA ---
  {
    id: 'copa-libertadores',
    sheetId: 'LIB',
    name: 'Copa Libertadores',
    country: 'Sudamérica',
    category: 'sudamerica',
    categoryName: 'Sudamérica',
    shortCode: 'LIB',
    accentColor: '#E5B838',
    badgeBg: 'rgba(229, 184, 56, 0.14)',
    flag: '🌎',
    founded: '1960',
    description: 'La máxima gloria eterna de los clubes de América del Sur organizada por la CONMEBOL.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M12 13v8m-4 0h8"/><path d="M5 8a7 7 0 0 0 14 0"/></svg>`
  },
  {
    id: 'copa-sudamericana',
    sheetId: 'SUD',
    name: 'Copa Sudamericana',
    country: 'Sudamérica',
    category: 'sudamerica',
    categoryName: 'Sudamérica',
    shortCode: 'SUD',
    accentColor: '#2980B9',
    badgeBg: 'rgba(41, 128, 185, 0.14)',
    flag: '🌎',
    founded: '2002',
    description: 'La gran conquista del continente, donde se forjan memorables noches sudamericanas.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><circle cx="12" cy="11" r="3"/></svg>`
  },

  // --- PERÚ ---
  {
    id: 'liga-1',
    sheetId: 'PER1',
    name: 'Liga 1',
    country: 'Perú',
    category: 'peru',
    categoryName: 'Perú',
    shortCode: 'L1P',
    accentColor: '#E52330',
    badgeBg: 'rgba(229, 35, 48, 0.14)',
    flag: '🇵🇪',
    founded: '1912',
    description: 'Torneo de la primera división profesional del fútbol peruano y pasión nacional.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M12 6v12m-4-8v4m8-4v4"/></svg>`
  }
];

/**
 * ----------------------------------------------------------------------------
 * 3. ALMACÉN DE DATOS DINÁMICOS EN MEMORIA (14 PESTAÑAS)
 * ----------------------------------------------------------------------------
 */
let FIXTURES = [];
let TEAMS = {};
let H2H_RECORDS = [];
let RECENT_FORM_RECORDS = [];
let MATCH_STATS_RECORDS = [];
let UPDATE_CONTROL_LOG = [];
let GOALS_RECORDS = [];
let MATCH_EVENTS_RECORDS = [];
let LINEUPS_RECORDS = [];
let STANDINGS_RECORDS = [];
let DAILY_COVERAGE_RECORDS = [];
let FINAL_DETAILS_RECORDS = [];
let AUDITORIA_SEMANAL_RECORDS = [];

/**
 * ----------------------------------------------------------------------------
 * 4. SERVICIO DE LECTURA SEGURO DE GOOGLE SHEETS
 * ----------------------------------------------------------------------------
 */
const GoogleSheetsSyncService = {
  isQuerying: false,
  cacheKey: 'matchweek_sheets_cache_v4',

  async syncAllSheets() {
    if (this.isQuerying) {
      console.warn('[SyncService] Ya existe una sincronización en curso.');
      return { status: 'busy' };
    }

    this.isQuerying = true;
    const startTime = Date.now();

    try {
      let rawData = null;

      // 1. Probar backend Google Apps Script si está configurado
      if (MatchweekConfig.googleSheets.appsScriptUrl) {
        try {
          const res = await fetch(MatchweekConfig.googleSheets.appsScriptUrl, { redirect: 'follow' });
          if (res.ok) {
            const json = await res.json();
            if (json && json.status === 'success' && json.data) {
              rawData = json.data;
            }
          }
        } catch (e) {
          console.warn('[SyncService] Apps Script no disponible, recurriendo a transporte directo.', e);
        }
      }

      // 2. Si no se usó Apps Script, usar transporte nativo de Google Sheets (JSONP con &headers=1)
      if (!rawData) {
        rawData = await this.fetchViaDirectSheetsApi();
      }

      // 3. Normalizar y transformar las 14 pestañas
      const normalized = DataTransformer.transformAllSheets(rawData);

      // 4. Actualizar almacén de memoria
      FIXTURES = normalized.partidos;
      TEAMS = normalized.equipos;
      H2H_RECORDS = normalized.h2h;
      RECENT_FORM_RECORDS = normalized.ultimos5;
      MATCH_STATS_RECORDS = normalized.estadisticas;
      UPDATE_CONTROL_LOG = normalized.control;
      GOALS_RECORDS = normalized.goles;
      MATCH_EVENTS_RECORDS = normalized.eventos;
      LINEUPS_RECORDS = normalized.alineaciones;
      STANDINGS_RECORDS = normalized.clasificaciones;
      DAILY_COVERAGE_RECORDS = normalized.coberturaDiaria;
      FINAL_DETAILS_RECORDS = normalized.detalleFinal;
      AUDITORIA_SEMANAL_RECORDS = normalized.auditoriaSemanal;

      const durationMs = Date.now() - startTime;
      const peruNow = CalendarService.getPeruNow();

      const syncResult = {
        status: 'success',
        queryTimePeru: CalendarService.format(peruNow, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        timestampIso: new Date().toISOString(),
        durationMs: durationMs,
        summary: {
          partidosCount: FIXTURES.length,
          equiposCount: Object.keys(TEAMS).length,
          competicionesCount: normalized.competiciones.length,
          golesCount: GOALS_RECORDS.length,
          eventosCount: MATCH_EVENTS_RECORDS.length,
          h2hCount: H2H_RECORDS.length,
          statsCount: MATCH_STATS_RECORDS.length,
          ultimos5Count: RECENT_FORM_RECORDS.length,
          detalleFinalCount: FINAL_DETAILS_RECORDS.length,
          coberturaCount: DAILY_COVERAGE_RECORDS.length,
          auditoriaCount: AUDITORIA_SEMANAL_RECORDS.length,
          lastContentUpdate: normalized.control.length > 0 ? (normalized.control[0].finUtc || normalized.control[0].inicioUtc) : null
        }
      };

      // 5. Guardar en almacenamiento temporal para modo sin conexión
      this.saveToCache(syncResult, rawData);
      return syncResult;

    } catch (err) {
      console.error('[SyncService] Error al sincronizar con Google Sheets:', err);
      const cached = this.loadFromCache();
      return {
        status: 'error',
        error: err.message,
        cachedFallback: cached
      };
    } finally {
      this.isQuerying = false;
    }
  },

  async fetchViaDirectSheetsApi() {
    const sheetNames = MatchweekConfig.googleSheets.sheetNames;
    const fetchPromises = sheetNames.map(name => this.fetchSingleSheet(name));
    const results = await Promise.all(fetchPromises);

    const sheetMap = {};
    sheetNames.forEach((name, idx) => {
      sheetMap[name] = results[idx];
    });
    return sheetMap;
  },

  fetchSingleSheet(sheetName) {
    return new Promise((resolve, reject) => {
      const sheetId = MatchweekConfig.googleSheets.spreadsheetId;
      const callbackName = 'mw_cb_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();

      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error(`Tiempo de espera agotado al consultar pestaña "${sheetName}"`));
      }, 14000);

      function cleanup() {
        clearTimeout(timeout);
        delete window[callbackName];
        const el = document.getElementById(callbackName);
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }

      window[callbackName] = function(json) {
        cleanup();
        try {
          if (!json || json.status !== 'ok') {
            return reject(new Error(`Google Sheets reportó estado no exitoso en "${sheetName}"`));
          }
          const records = DataTransformer.parseGvizTable(json.table);
          resolve(records);
        } catch (e) {
          reject(e);
        }
      };

      const script = document.createElement('script');
      script.id = callbackName;
      // Parámetro &headers=1 fundamental para obtener los encabezados de columnas de manera limpia
      script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:${callbackName}&headers=1&sheet=${encodeURIComponent(sheetName)}`;
      script.onerror = function() {
        cleanup();
        reject(new Error(`Error de red al conectar con la pestaña "${sheetName}"`));
      };
      document.head.appendChild(script);
    });
  },

  saveToCache(syncResult, rawData) {
    try {
      const payload = {
        result: syncResult,
        rawData: rawData,
        savedAt: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('[SyncService] No se pudo guardar caché local', e);
    }
  },

  loadFromCache() {
    try {
      const raw = localStorage.getItem(this.cacheKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};

/**
 * ----------------------------------------------------------------------------
 * 5. TRANSFORMACIÓN, NORMALIZACIÓN Y VALIDACIÓN DE DATOS (13 PESTAÑAS)
 * ----------------------------------------------------------------------------
 */
const DataTransformer = {
  /**
   * Convierte la estructura de tabla de Google Visualization (GVIZ)
   * en un arreglo de objetos con nombres de campos legibles.
   */
  parseGvizTable(table) {
    if (!table || !table.rows || table.rows.length === 0) return [];
    const rows = table.rows;
    let headers = [];
    let startIndex = 0;

    const hasColLabels = table.cols && table.cols.some(c => c && c.label && c.label.trim() !== '');

    if (hasColLabels) {
      headers = table.cols.map(c => (c && c.label) ? String(c.label).trim() : '');
      startIndex = 0;
    } else if (rows.length > 0 && rows[0].c) {
      headers = rows[0].c.map(cell => (cell && cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : ''));
      startIndex = 1;
    }

    const records = [];
    for (let i = startIndex; i < rows.length; i++) {
      const cells = rows[i].c;
      const record = {};
      let hasValue = false;

      headers.forEach((header, colIdx) => {
        if (!header) return;
        const cell = cells ? cells[colIdx] : null;
        let val = (cell && cell.v !== null && cell.v !== undefined) ? cell.v : null;

        if (val !== null && val !== '') {
          hasValue = true;
        } else {
          val = null;
        }
        record[header] = val;
      });

      if (hasValue) {
        records.push(record);
      }
    }

    return records;
  },

  sanitizeText(val) {
    if (val === null || val === undefined) return '';
    return String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const trimmed = url.trim();
    if (/^https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/i.test(trimmed)) {
      return trimmed;
    }
    return null;
  },

  parseNumeric(val) {
    if (val === null || val === undefined || val === '') return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  },

  /**
   * Normaliza los estados del partido exigidos por la especificación:
   * PROGRAMADO | EN_VIVO | DESCANSO | FINALIZADO | APLAZADO | SUSPENDIDO | CANCELADO
   */
  normalizeStatus(rawStatus) {
    if (!rawStatus) return 'PROGRAMADO';
    const s = String(rawStatus).trim().toUpperCase();

    if (['FINALIZADO', 'FINISHED', 'FT', 'TERMINADO', 'FIN'].includes(s)) {
      return 'FINALIZADO';
    }
    if (['DESCANSO', 'HT', 'HALFTIME', 'ENTRETIEMPO'].includes(s)) {
      return 'DESCANSO';
    }
    if (['EN_VIVO', 'EN VIVO', 'LIVE', 'IN_PLAY', 'EN JUEGO', '1T', '2T', '1H', '2H', 'JUGANDOSE'].includes(s)) {
      return 'EN_VIVO';
    }
    if (['APLAZADO', 'POSTPONED', 'POSPUESTO'].includes(s)) {
      return 'APLAZADO';
    }
    if (['SUSPENDIDO', 'SUSPENDED', 'INTERRUMPIDO'].includes(s)) {
      return 'SUSPENDIDO';
    }
    if (['CANCELADO', 'CANCELLED', 'CANCELED', 'ANULADO'].includes(s)) {
      return 'CANCELADO';
    }
    return 'PROGRAMADO';
  },

  /**
   * Normaliza formaciones deportivas evitando desvíos por formatos de fecha en Google Sheets.
   * Ej: '4-4-2002' -> '4-4-2', '4-2-3-1' -> '4-2-3-1', '4-3-3' -> '4-3-3'.
   */
  normalizeFormation(rawForm) {
    if (!rawForm) return '4-4-2';
    const s = String(rawForm).trim();
    if (s.includes('4-4-2') || s.includes('4/4/2002') || s.includes('4-4-2002')) return '4-4-2';
    if (s.includes('4-3-3') || s.includes('4/3/2003') || s.includes('4-3-2003')) return '4-3-3';
    if (s.includes('4-2-3-1')) return '4-2-3-1';
    if (s.includes('3-5-2') || s.includes('3/5/2002') || s.includes('3-5-2002')) return '3-5-2';
    if (s.includes('3-4-3')) return '3-4-3';
    if (s.includes('5-3-2')) return '5-3-2';
    if (s.includes('4-1-4-1')) return '4-1-4-1';
    const match = s.match(/\d+(?:-\d+)+/);
    if (match) {
      const parts = match[0].split('-');
      if (parts.length >= 3 && parts[parts.length - 1] > 2000) {
        parts[parts.length - 1] = parts[parts.length - 1].slice(-1);
        return parts.join('-');
      }
      return match[0];
    }
    return s || '4-4-2';
  },

  /**
   * Interpreta fecha y hora fijándolas estrictamente al día calendario de America/Lima (UTC-5).
   * Evita discrepancias causadas por horas UTC cercanas a medianoche.
   */
  parseMatchDateTime(fechaHoraPeru, fechaHoraUtc) {
    if (fechaHoraPeru) {
      const str = String(fechaHoraPeru).trim();
      const dateMatch = str.match(/(\d{4})-(\d{2})-(\d{2})/);
      const timeMatch = str.match(/(\d{1,2}):(\d{2})/);
      if (dateMatch) {
        const dateIso = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
        const hh = timeMatch ? timeMatch[1].padStart(2, '0') : 'TBD';
        const mm = timeMatch ? timeMatch[2] : '';
        const timeFormatted = timeMatch ? `${hh}:${mm}` : 'TBD';
        return {
          dateIso: dateIso,
          timeFormatted: timeFormatted,
          fullDateTime: `${dateIso} ${timeFormatted}`
        };
      }
    }

    if (fechaHoraUtc) {
      try {
        const utcDate = new Date(fechaHoraUtc);
        if (!isNaN(utcDate.getTime())) {
          const peruFormatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Lima',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
          const parts = peruFormatter.formatToParts(utcDate);
          const map = {};
          parts.forEach(p => map[p.type] = p.value);
          const dateIso = `${map.year}-${map.month}-${map.day}`;
          const timeFormatted = `${map.hour}:${map.minute}`;
          return {
            dateIso: dateIso,
            timeFormatted: timeFormatted,
            fullDateTime: `${dateIso} ${timeFormatted}`
          };
        }
      } catch (e) {
        console.warn('[DataTransformer] Error parseando fecha UTC:', e);
      }
    }

    return {
      dateIso: '2026-10-31',
      timeFormatted: 'TBD',
      fullDateTime: 'Pendiente'
    };
  },

  transformAllSheets(rawData) {
    const out = {
      competiciones: [],
      equipos: {},
      partidos: [],
      ultimos5: [],
      h2h: [],
      estadisticas: [],
      control: [],
      goles: [],
      eventos: [],
      alineaciones: [],
      clasificaciones: [],
      coberturaDiaria: [],
      detalleFinal: [],
      auditoriaSemanal: []
    };

    // 1. Equipos
    const rawEquipos = rawData['Equipos'] || [];
    rawEquipos.forEach(r => {
      const id = String(r.equipo_id || '').trim();
      if (!id) return;
      out.equipos[id] = {
        id: id,
        nombreOficial: this.sanitizeText(r.nombre_oficial || id),
        nombreCorto: this.sanitizeText(r.nombre_corto || r.nombre_oficial || id),
        pais: this.sanitizeText(r.pais || ''),
        escudoUrl: this.sanitizeUrl(r.escudo_url),
        fuenteUrl: this.sanitizeUrl(r.fuente_url),
        verificadoEn: r.verificado_en || null
      };
    });

    // 2. Competiciones
    const rawComps = rawData['Competiciones'] || [];
    out.competiciones = rawComps.map(r => ({
      id: r.competicion_id,
      nombre: this.sanitizeText(r.nombre),
      region: this.sanitizeText(r.region),
      pais: this.sanitizeText(r.pais_confederacion),
      temporada: r.temporada || MatchweekConfig.season,
      activo: String(r.activo || 'SI').toUpperCase() === 'SI'
    }));

    // 3. Partidos
    const rawPartidos = rawData['Partidos'] || [];
    const seenPartidoIds = new Set();

    rawPartidos.forEach(r => {
      const rawId = r.partido_id;
      if (!rawId) return;

      const id = String(rawId).trim();
      if (seenPartidoIds.has(id)) {
        console.warn(`[DataTransformer] Partido duplicado omitido con ID: ${id}`);
        return;
      }
      seenPartidoIds.add(id);

      const rawCompId = String(r.competicion_id || '').trim();
      const canonicalLeagueId = COMPETITION_ID_MAP[rawCompId] || rawCompId;
      const dateInfo = this.parseMatchDateTime(r.fecha_hora_peru, r.fecha_hora_utc);

      const localId = String(r.local_id || '').trim();
      const visitanteId = String(r.visitante_id || '').trim();
      const homeTeamObj = out.equipos[localId];
      const awayTeamObj = out.equipos[visitanteId];

      const homeGoals = this.parseNumeric(r.goles_local);
      const awayGoals = this.parseNumeric(r.goles_visitante);
      const normalizedStatus = this.normalizeStatus(r.estado);

      let canonicalStatus = 'upcoming';
      if (normalizedStatus === 'FINALIZADO') canonicalStatus = 'finished';
      else if (normalizedStatus === 'EN_VIVO') canonicalStatus = 'live';
      else if (normalizedStatus === 'DESCANSO') canonicalStatus = 'halftime';
      else if (normalizedStatus === 'APLAZADO') canonicalStatus = 'postponed';
      else if (normalizedStatus === 'SUSPENDIDO') canonicalStatus = 'suspended';
      else if (normalizedStatus === 'CANCELADO') canonicalStatus = 'cancelled';

      out.partidos.push({
        id: id,
        league: canonicalLeagueId,
        rawLeagueId: rawCompId,
        season: r.temporada || MatchweekConfig.season,
        date: dateInfo.dateIso, // YYYY-MM-DD en hora de Perú
        time: dateInfo.timeFormatted, // HH:mm en hora de Perú
        fullDateTimePeru: dateInfo.fullDateTime,
        localId: localId,
        visitanteId: visitanteId,
        homeTeam: homeTeamObj ? homeTeamObj.nombreCorto : this.sanitizeText(localId),
        awayTeam: awayTeamObj ? awayTeamObj.nombreCorto : this.sanitizeText(visitanteId),
        homeCrest: homeTeamObj ? homeTeamObj.escudoUrl : null,
        awayCrest: awayTeamObj ? awayTeamObj.escudoUrl : null,
        venue: this.sanitizeText(r.estadio || 'Estadio por confirmar'),
        status: canonicalStatus,
        statusLabel: normalizedStatus,
        rawStatus: r.estado,
        homeGoals: homeGoals,
        awayGoals: awayGoals,
        hasScore: homeGoals !== null && awayGoals !== null,
        featured: !!r.destacado,
        sourceUrl: this.sanitizeUrl(r.fuente_url),
        verifiedAt: r.verificado_en || null
      });
    });

    // 4. Últimos 5 Partidos (Forma reciente)
    const rawUltimos = rawData['Ultimos 5 partidos'] || [];
    out.ultimos5 = rawUltimos.map(r => ({
      partidoObjetivoId: String(r.partido_id_objetivo || '').trim(),
      equipoId: String(r.equipo_id || '').trim(),
      anteriorPartidoId: r.anterior_partido_id,
      fecha: r.fecha,
      competicion: this.sanitizeText(r.competicion),
      rivalId: this.sanitizeText(r.rival_id),
      localVisitante: r.local_visitante,
      golesFavor: this.parseNumeric(r.goles_favor),
      golesContra: this.parseNumeric(r.goles_contra),
      resultado: String(r.resultado || '').trim().toUpperCase(),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 5. Enfrentamientos H2H
    const rawH2H = rawData['Enfrentamientos H2H'] || [];
    out.h2h = rawH2H.map(r => ({
      partidoObjetivoId: String(r.partido_id_objetivo || '').trim(),
      partidoHistoricoId: r.partido_historico_id,
      fecha: r.fecha,
      competicion: this.sanitizeText(r.competicion),
      localId: this.sanitizeText(r.local_id),
      visitanteId: this.sanitizeText(r.visitante_id),
      golesLocal: this.parseNumeric(r.goles_local),
      golesVisitante: this.parseNumeric(r.goles_visitante),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 6. Estadísticas
    const rawStats = rawData['Estadisticas'] || [];
    out.estadisticas = rawStats.map(r => ({
      partidoId: String(r.partido_id || '').trim(),
      equipoId: String(r.equipo_id || '').trim(),
      metrica: this.sanitizeText(r.metrica),
      valor: r.valor,
      unidad: this.sanitizeText(r.unidad || ''),
      periodo: this.sanitizeText(r.periodo || '90MIN'),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 7. Control de actualizaciones
    const rawControl = rawData['Control de actualizaciones'] || [];
    out.control = rawControl.map(r => ({
      ejecucionId: r.ejecucion_id,
      inicioUtc: r.inicio_utc,
      finUtc: r.fin_utc,
      semanaInicioPeru: r.semana_inicio_peru,
      semanaFinPeru: r.semana_fin_peru,
      estado: r.estado,
      competicionesConsultadas: r.competiciones_consultadas,
      partidosVerificados: r.partidos_verificados,
      observaciones: this.sanitizeText(r.observaciones || ''),
      fuente: this.sanitizeText(r.fuente || '')
    }));

    // 8. Goles
    const rawGoles = rawData['Goles'] || [];
    out.goles = rawGoles.map(r => ({
      eventoId: r.evento_id,
      partidoId: String(r.partido_id || '').trim(),
      equipoId: String(r.equipo_id || '').trim(),
      jugadorId: r.jugador_id,
      jugadorNombre: this.sanitizeText(r.jugador_nombre || 'Gol'),
      minuto: this.parseNumeric(r.minuto),
      adicional: this.parseNumeric(r.adicional),
      tipoGol: String(r.tipo_gol || 'NORMAL').trim().toUpperCase(),
      asistenciaJugador: this.sanitizeText(r.asistencia_jugador || ''),
      marcadorLocal: this.parseNumeric(r.marcador_local),
      marcadorVisitante: this.parseNumeric(r.marcador_visitante),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 9. Eventos del partido
    const rawEventos = rawData['Eventos del partido'] || [];
    out.eventos = rawEventos.map(r => ({
      eventoId: r.evento_id,
      partidoId: String(r.partido_id || '').trim(),
      minuto: this.parseNumeric(r.minuto) || 0,
      adicional: this.parseNumeric(r.adicional),
      equipoId: String(r.equipo_id || '').trim(),
      jugadorId: r.jugador_id,
      jugadorNombre: this.sanitizeText(r.jugador_nombre || ''),
      tipoEvento: String(r.tipo_evento || '').trim().toLowerCase(),
      descripcion: this.sanitizeText(r.descripcion || ''),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 10. Alineaciones
    const rawAlineaciones = rawData['Alineaciones'] || [];
    out.alineaciones = rawAlineaciones.map(r => ({
      partidoId: String(r.partido_id || '').trim(),
      equipoId: String(r.equipo_id || '').trim(),
      jugadorId: r.jugador_id,
      jugadorNombre: this.sanitizeText(r.jugador_nombre || ''),
      numero: this.parseNumeric(r.numero),
      posicion: this.sanitizeText(r.posicion || ''),
      rol: this.sanitizeText(r.rol || 'jugador'),
      formacion: this.normalizeFormation(r.formacion),
      titular: String(r.titular || '').toLowerCase() === 'si' || String(r.titular || '').toLowerCase() === 'true' || r.titular === 1 || r.titular === true,
      minutoEntrada: this.parseNumeric(r.minuto_entrada),
      minutoSalida: this.parseNumeric(r.minuto_salida),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 11. Clasificaciones
    const rawClasificaciones = rawData['Clasificaciones'] || [];
    out.clasificaciones = rawClasificaciones.map(r => ({
      competicionId: COMPETITION_ID_MAP[r.competicion_id] || r.competicion_id,
      rawCompeticionId: r.competicion_id,
      temporada: r.temporada || MatchweekConfig.season,
      jornada: r.jornada,
      equipoId: String(r.equipo_id || '').trim(),
      posicion: this.parseNumeric(r.posicion),
      pj: this.parseNumeric(r.pj) || 0,
      pg: this.parseNumeric(r.pg) || 0,
      pe: this.parseNumeric(r.pe) || 0,
      pp: this.parseNumeric(r.pp) || 0,
      gf: this.parseNumeric(r.gf) || 0,
      gc: this.parseNumeric(r.gc) || 0,
      dg: this.parseNumeric(r.dg) || 0,
      puntos: this.parseNumeric(r.puntos) || 0,
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 12. Cobertura diaria
    const rawCobertura = rawData['Cobertura diaria'] || [];
    out.coberturaDiaria = rawCobertura.map(r => ({
      fechaPeru: String(r.fecha_peru || '').trim(),
      competicionId: COMPETITION_ID_MAP[r.competicion_id] || r.competicion_id,
      rawCompeticionId: r.competicion_id,
      estadoConsulta: String(r.estado_consulta || '').trim().toLowerCase(),
      cantidadPartidos: this.parseNumeric(r.cantidad_partidos) || 0,
      consultaUtc: r.consulta_utc,
      fuenteUrl: this.sanitizeUrl(r.fuente_url),
      observaciones: this.sanitizeText(r.observaciones || '')
    }));

    // 13. Detalle final
    const rawDetalle = rawData['Detalle final'] || [];
    out.detalleFinal = rawDetalle.map(r => ({
      partidoId: String(r.partido_id || '').trim(),
      descansoLocal: this.parseNumeric(r.descanso_local),
      descansoVisitante: this.parseNumeric(r.descanso_visitante),
      finalLocal: this.parseNumeric(r.final_local),
      finalVisitante: this.parseNumeric(r.final_visitante),
      prorroga: String(r.prorroga || '').toLowerCase() === 'si',
      penaltisLocal: this.parseNumeric(r.penaltis_local),
      penaltisVisitante: this.parseNumeric(r.penaltis_visitante),
      arbitro: this.sanitizeText(r.arbitro || ''),
      asistenciaEstadio: this.parseNumeric(r.asistencia_estadio),
      resumenVerificado: this.sanitizeText(r.resumen_verificado || ''),
      fuenteUrl: this.sanitizeUrl(r.fuente_url)
    }));

    // 14. Auditoria semanal
    const rawAuditoria = rawData['Auditoria semanal'] || [];
    out.auditoriaSemanal = rawAuditoria.map(r => ({
      partidoId: String(r.partido_id || '').trim(),
      fechaPeru: String(r.fecha_peru || '').trim(),
      competicionId: String(r.competicion_id || '').trim(),
      encuentro: this.sanitizeText(r.encuentro || ''),
      estadoActual: this.sanitizeText(r.estado_actual || ''),
      estadio: this.sanitizeText(r.estadio || ''),
      estadisticas: this.sanitizeText(r.estadisticas || ''),
      alineaciones: this.sanitizeText(r.alineaciones || ''),
      formaReciente: this.sanitizeText(r.forma_reciente || ''),
      h2h: this.sanitizeText(r.h2h || ''),
      clasificacion: this.sanitizeText(r.clasificacion || ''),
      detalleFinal: this.sanitizeText(r.detalle_final || ''),
      verificacionIntegral: this.sanitizeText(r.verificacion_integral || '')
    }));

    return out;
  }
};

/**
 * ----------------------------------------------------------------------------
 * 6. SERVICIO DE CALENDARIO (LUNES A DOMINGO, ANCLADO A AMERICA/LIMA)
 * ----------------------------------------------------------------------------
 */
const CalendarService = {
  pad(n) {
    return String(n).padStart(2, '0');
  },

  toIso(d) {
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}`;
  },

  /**
   * Obtiene la fecha y hora actual anclada al día calendario en America/Lima (UTC-5).
   */
  getPeruNow() {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const parts = formatter.formatToParts(new Date());
      const map = {};
      parts.forEach(p => map[p.type] = p.value);
      return new Date(
        Number(map.year),
        Number(map.month) - 1,
        Number(map.day),
        Number(map.hour || 12),
        Number(map.minute || 0),
        Number(map.second || 0)
      );
    } catch {
      const now = new Date();
      const peruMs = now.getTime() + (-5 * 60 + now.getTimezoneOffset()) * 60000;
      return new Date(peruMs);
    }
  },

  /**
   * Obtiene el lunes de la semana correspondiente a una fecha peruana.
   * Fija la hora a las 12:00:00 para blindar el cálculo contra saltos de horario.
   */
  getMonday(date) {
    const ref = date || this.getPeruNow();
    const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate(), 12, 0, 0);
    const day = d.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const diff = (day + 6) % 7; // Domingo (0) retrocede 6 días a Lunes
    d.setDate(d.getDate() - diff);
    return d;
  },

  addDays(date, days) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    d.setDate(d.getDate() + days);
    return d;
  },

  getWeekEnd(mondayDate) {
    return this.addDays(mondayDate, 6);
  },

  getDaysOfWeek(mondayDate) {
    return Array.from({ length: 7 }, (_, i) => this.addDays(mondayDate, i));
  },

  getCurrentMonday() {
    return this.getMonday(this.getPeruNow());
  },

  getNextMonday() {
    return this.addDays(this.getCurrentMonday(), 7);
  },

  getTwoWeeksDays() {
    const monday = this.getCurrentMonday();
    return Array.from({ length: 14 }, (_, i) => this.addDays(monday, i));
  },

  getPeriodDays(mode = 'current') {
    if (mode === 'next') {
      return this.getDaysOfWeek(this.getNextMonday());
    }
    if (mode === '14days') {
      return this.getTwoWeeksDays();
    }
    return this.getDaysOfWeek(this.getCurrentMonday());
  },

  getPeriodRangeIso(mode = 'current') {
    const curMon = this.getCurrentMonday();
    const curSun = this.addDays(curMon, 6);
    const nxtMon = this.addDays(curMon, 7);
    const nxtSun = this.addDays(nxtMon, 6);

    if (mode === 'next') {
      return { startIso: this.toIso(nxtMon), endIso: this.toIso(nxtSun), startDate: nxtMon, endDate: nxtSun };
    }
    if (mode === '14days') {
      return { startIso: this.toIso(curMon), endIso: this.toIso(nxtSun), startDate: curMon, endDate: nxtSun };
    }
    return { startIso: this.toIso(curMon), endIso: this.toIso(curSun), startDate: curMon, endDate: curSun };
  },

  isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  },

  isToday(date) {
    return this.isSameDay(date, this.getPeruNow());
  },

  isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  },

  format(date, options) {
    return new Intl.DateTimeFormat(MatchweekConfig.locale, {
      timeZone: 'America/Lima',
      ...options
    }).format(date);
  }
};

/**
 * ----------------------------------------------------------------------------
 * 7. SERVICIO DE FAVORITOS (LOCALSTORAGE)
 * ----------------------------------------------------------------------------
 */
const FavoritesService = {
  storageKey: 'matchweek-favorites-v4',

  getFavoriteIds() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr.map(String) : []);
    } catch {
      return new Set();
    }
  },

  save(favSet) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify([...favSet]));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  },

  toggle(matchId) {
    const id = String(matchId);
    const set = this.getFavoriteIds();
    const exists = set.has(id);
    if (exists) set.delete(id);
    else set.add(id);
    this.save(set);
    return !exists;
  },

  has(matchId) {
    return this.getFavoriteIds().has(String(matchId));
  },

  count() {
    return this.getFavoriteIds().size;
  }
};

/**
 * ----------------------------------------------------------------------------
 * 8. ESTADO GLOBAL DE LA APLICACIÓN (MATCHWEEK 2.0)
 * ----------------------------------------------------------------------------
 */
const State = {
  view: 'inicio',              // 'inicio' | 'partidos' | 'favoritos' | 'competicion'
  selectedLeague: 'all',       // 'all' o ID de competición
  periodMode: 'current',       // 'current' (esta semana) | 'next' (próxima semana) | '14days' (ver 14 días)
  currentWeekStart: CalendarService.getCurrentMonday(),
  selectedDay: 'all',          // 'all' o 'YYYY-MM-DD'
  activeFilter: 'all',         // 'all' | 'featured' | 'upcoming' | 'finished'
  searchQuery: '',
  favorites: FavoritesService.getFavoriteIds(),
  lastSyncResult: null,        // Resultado de la última consulta a Google Sheets
  activeModalMatchId: null,    // ID del partido abierto en el modal
  activeModalTab: 'resumen',    // 'resumen' | 'estadisticas' | 'alineaciones' | 'forma' | 'h2h' | 'clasificacion'
  lineupViewMode: 'pitch'      // 'pitch' (cancha táctica) | 'list' (vista lista)
};

/**
 * ----------------------------------------------------------------------------
 * 9. CONTROLADOR DE INTERFAZ DE USUARIO (MATCHWEEK UI)
 * ----------------------------------------------------------------------------
 */
const UI = {
  $: id => document.getElementById(id),

  escapeHtml(str) {
    return DataTransformer.sanitizeText(str);
  },

  init() {
    this.initTheme();
    this.updateCurrentDateDisplay();
    this.bindEvents();
    this.render();

    // Restaurar caché si existe
    const cached = GoogleSheetsSyncService.loadFromCache();
    if (cached && cached.rawData) {
      try {
        const normalized = DataTransformer.transformAllSheets(cached.rawData);
        FIXTURES = normalized.partidos;
        TEAMS = normalized.equipos;
        H2H_RECORDS = normalized.h2h;
        RECENT_FORM_RECORDS = normalized.ultimos5;
        MATCH_STATS_RECORDS = normalized.estadisticas;
        UPDATE_CONTROL_LOG = normalized.control;
        GOALS_RECORDS = normalized.goles;
        MATCH_EVENTS_RECORDS = normalized.eventos;
        LINEUPS_RECORDS = normalized.alineaciones;
        STANDINGS_RECORDS = normalized.clasificaciones;
        DAILY_COVERAGE_RECORDS = normalized.coberturaDiaria;
        FINAL_DETAILS_RECORDS = normalized.detalleFinal;
        State.lastSyncResult = cached.result;
        this.render();
      } catch (e) {
        console.warn('[UI] No se pudo restaurar caché', e);
      }
    }
  },

  initTheme() {
    const saved = localStorage.getItem('matchweek-theme');
    if (saved === 'light') {
      document.body.classList.add('light');
    }
  },

  toggleTheme() {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('matchweek-theme', isLight ? 'light' : 'dark');
    this.showToast(isLight ? 'Modo claro activado' : 'Modo oscuro activado');
  },

  updateCurrentDateDisplay() {
    const dateEl = this.$('topbarCurrentDate');
    if (dateEl) {
      const peruNow = CalendarService.getPeruNow();
      dateEl.textContent = CalendarService.format(peruNow, {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
      });
    }
  },

  showToast(message) {
    const toast = this.$('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  },

  getFixturesForPeriod() {
    const range = CalendarService.getPeriodRangeIso(State.periodMode);
    return FIXTURES.filter(f => f.date >= range.startIso && f.date <= range.endIso);
  },

  getFixturesForWeek() {
    return this.getFixturesForPeriod();
  },

  getVisibleFixtures() {
    const periodMatches = this.getFixturesForPeriod();
    const filtered = periodMatches.filter(f => {
      if (State.selectedLeague !== 'all' && f.league !== State.selectedLeague) return false;
      if (State.selectedDay !== 'all' && f.date !== State.selectedDay) return false;
      if (State.view === 'favoritos' && !State.favorites.has(String(f.id))) return false;
      if (State.activeFilter === 'featured' && !f.featured) return false;
      if (State.activeFilter === 'upcoming' && f.status !== 'upcoming') return false;
      if (State.activeFilter === 'finished' && f.status !== 'finished') return false;

      if (State.searchQuery) {
        const comp = COMPETITIONS.find(c => c.id === f.league);
        const text = `${f.homeTeam || ''} ${f.awayTeam || ''} ${comp ? comp.name : ''}`.toLowerCase();
        if (!text.includes(State.searchQuery)) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return (a.time || '').localeCompare(b.time || '');
    });
  },

  getMatchingCompetitions() {
    if (!State.searchQuery) return [];
    const q = State.searchQuery.toLowerCase();
    return COMPETITIONS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.shortCode.toLowerCase().includes(q) ||
      c.categoryName.toLowerCase().includes(q)
    );
  },

  // --------------------------------------------------------------------------
  // ACCIÓN PRINCIPAL: ACTUALIZAR PARTIDOS DESDE GOOGLE SHEETS
  // --------------------------------------------------------------------------
  async handleSync() {
    if (GoogleSheetsSyncService.isQuerying) return;

    this.setSyncButtonState('loading');

    const result = await GoogleSheetsSyncService.syncAllSheets();

    if (result.status === 'success') {
      State.lastSyncResult = result;
      this.render();

      const periodMatches = this.getFixturesForPeriod().length;
      if (periodMatches === 0) {
        this.setSyncButtonState('empty', result);
        this.showToast('Google Sheets consultado: sin partidos registrados para el período seleccionado.');
      } else {
        this.setSyncButtonState('success', result);
        this.showToast(`Datos actualizados correctamente (${result.summary.partidosCount} partidos en total).`);
      }
    } else {
      this.setSyncButtonState('error', result);
      this.showToast('No fue posible consultar los datos. Inténtalo nuevamente.');
    }
  },

  setSyncButtonState(stateType, payload = {}) {
    const btnTop = this.$('syncButton');
    const btnBanner = this.$('syncBannerButton');
    const dot = this.$('syncStatusDot');
    const headline = this.$('syncStatusHeadline');
    const sub = this.$('syncStatusSub');
    const lastQueryTime = this.$('syncLastQueryTime');
    const contentStatus = this.$('syncContentStatus');

    const buttons = [btnTop, btnBanner].filter(Boolean);

    if (stateType === 'loading') {
      buttons.forEach(b => {
        b.disabled = true;
        b.classList.add('loading');
        const textEl = b.querySelector('.sync-label') || b.querySelector('.sync-btn-text');
        if (textEl) textEl.textContent = 'Consultando datos deportivos...';
      });

      if (dot) dot.className = 'sync-status-dot loading';
      if (headline) headline.textContent = 'Consultando datos deportivos...';
      if (sub) sub.textContent = 'Conectando con Google Sheets y leyendo las 14 pestañas oficiales...';
      return;
    }

    buttons.forEach(b => {
      b.disabled = false;
      b.classList.remove('loading');
      const textEl = b.querySelector('.sync-label') || b.querySelector('.sync-btn-text');
      if (textEl) textEl.textContent = 'Actualizar partidos';
    });

    if (stateType === 'success') {
      if (dot) dot.className = 'sync-status-dot success';
      if (headline) headline.textContent = 'Datos actualizados correctamente.';
      if (sub) sub.textContent = `Consulta completada en ${payload.durationMs || 150} ms. 14 pestañas sincronizadas.`;
      if (lastQueryTime) lastQueryTime.textContent = payload.queryTimePeru || 'Reciente (Hora Perú)';
      if (contentStatus) {
        contentStatus.textContent = payload.summary?.partidosCount
          ? `${payload.summary.partidosCount} partidos · ${payload.summary.golesCount || 0} goles`
          : 'Datos al día en hoja';
      }
      return;
    }

    if (stateType === 'empty') {
      if (dot) dot.className = 'sync-status-dot empty';
      if (headline) headline.textContent = 'No hay partidos registrados para esta semana.';
      if (sub) sub.textContent = 'La hoja de Google Sheets no contiene encuentros para el rango de fechas consultado. No se inventaron partidos.';
      if (lastQueryTime) lastQueryTime.textContent = payload.queryTimePeru || 'Reciente (Hora Perú)';
      if (contentStatus) contentStatus.textContent = '0 encuentros en hoja';
      return;
    }

    if (stateType === 'error') {
      if (dot) dot.className = 'sync-status-dot error';
      if (headline) headline.textContent = 'No fue posible consultar los datos. Inténtalo nuevamente.';
      if (sub) sub.textContent = payload.error ? `Motivo: ${payload.error}` : 'Verifica la conexión a internet y vuelve a intentar.';
      return;
    }

    if (dot) dot.className = 'sync-status-dot initial';
    if (headline) headline.textContent = 'Listo para consultar Google Sheets';
    if (sub) sub.textContent = 'Presiona «Actualizar partidos» para sincronizar la agenda deportiva con el archivo oficial.';
  },

  // --------------------------------------------------------------------------
  // RENDERIZADO GLOBAL DE LA INTERFAZ
  // --------------------------------------------------------------------------
  render() {
    this.renderHeader();
    this.renderSidebar();
    this.renderHeroAndOverview();
    this.renderCompetitionsHub();
    this.renderCompetitionBanner();
    this.renderPeriodSelector();
    this.renderWeekControls();
    this.renderDateStrip();
    this.renderFilterButtons();
    this.renderMatchList();
    this.renderFooter();
  },

  renderHeader() {
    const breadcrumb = this.$('breadcrumbView');
    if (!breadcrumb) return;

    if (State.selectedLeague !== 'all') {
      const comp = COMPETITIONS.find(c => c.id === State.selectedLeague);
      breadcrumb.textContent = comp ? `${comp.categoryName.toUpperCase()} / ${comp.name.toUpperCase()}` : 'COMPETICIÓN';
    } else if (State.view === 'favoritos') {
      breadcrumb.textContent = 'FAVORITOS';
    } else if (State.view === 'partidos') {
      breadcrumb.textContent = 'TODOS LOS PARTIDOS';
    } else {
      breadcrumb.textContent = 'INICIO';
    }
  },

  renderSidebar() {
    const isInicio = State.view === 'inicio' && State.selectedLeague === 'all';
    const isPartidos = (State.view === 'partidos' || State.view === 'competicion') && State.selectedLeague === 'all';
    const isFavoritos = State.view === 'favoritos';

    const btnInicio = this.$('navInicio');
    const btnPartidos = this.$('navPartidos');
    const btnFavoritos = this.$('navFavoritos');

    if (btnInicio) btnInicio.classList.toggle('active', isInicio);
    if (btnPartidos) btnPartidos.classList.toggle('active', isPartidos);
    if (btnFavoritos) btnFavoritos.classList.toggle('active', isFavoritos);

    const navMatchCount = this.$('navMatchCount');
    if (navMatchCount) navMatchCount.textContent = this.getFixturesForWeek().length;

    const navFavCount = this.$('navFavCount');
    if (navFavCount) navFavCount.textContent = State.favorites.size;

    const nav = this.$('leagueNav');
    if (!nav) return;

    let html = '';

    CATEGORIES.forEach(cat => {
      const items = COMPETITIONS.filter(c => c.category === cat.id);

      html += `
        <div class="sidebar-group">
          <div class="sidebar-group-header">
            <span class="group-title">${this.escapeHtml(cat.name)}</span>
            <span class="group-count">${items.length}</span>
          </div>
          <div class="sidebar-group-list">
            ${items.map(comp => {
              const isSelected = State.selectedLeague === comp.id;
              const compWeekMatches = this.getFixturesForWeek().filter(f => f.league === comp.id).length;
              return `
                <button
                  class="league-item ${isSelected ? 'selected' : ''}"
                  data-league="${comp.id}"
                  style="--item-accent: ${comp.accentColor}"
                  aria-pressed="${isSelected}">
                  <span class="league-item-emblem" style="--emblem-bg: ${comp.badgeBg}; --emblem-color: ${comp.accentColor}">
                    ${comp.emblemSvg}
                  </span>
                  <div class="league-item-info">
                    <span class="league-item-name">${this.escapeHtml(comp.name)}</span>
                    <span class="league-item-sub">${this.escapeHtml(comp.country)}</span>
                  </div>
                  ${compWeekMatches > 0 ? `<span class="nav-count tabular-nums">${compWeekMatches}</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    nav.innerHTML = html;
  },

  renderHeroAndOverview() {
    const heroSection = this.$('heroSection');
    const systemNotice = this.$('systemNotice');
    const overviewSection = this.$('overview');

    const isHome = State.view === 'inicio' && State.selectedLeague === 'all';

    if (heroSection) heroSection.style.display = isHome ? 'block' : 'none';
    if (systemNotice) systemNotice.style.display = isHome ? 'flex' : 'none';
    if (overviewSection) overviewSection.style.display = isHome ? 'block' : 'none';

    const weekFixtures = this.getFixturesForWeek();

    const metricMatches = this.$('metricMatches');
    if (metricMatches) metricMatches.textContent = weekFixtures.length;

    const metricLeagues = this.$('metricLeagues');
    if (metricLeagues) metricLeagues.textContent = COMPETITIONS.length;

    const metricFeatured = this.$('metricFeatured');
    if (metricFeatured) metricFeatured.textContent = weekFixtures.filter(f => f.featured).length;

    const metricFavorites = this.$('metricFavorites');
    if (metricFavorites) metricFavorites.textContent = State.favorites.size;

    const weekRangeSmall = this.$('weekRangeSmall');
    if (weekRangeSmall) {
      const start = State.currentWeekStart;
      const end = CalendarService.getWeekEnd(start);
      weekRangeSmall.textContent = `${CalendarService.format(start, { day: 'numeric', month: 'long' })} — ${CalendarService.format(end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
  },

  renderCompetitionsHub() {
    const hub = this.$('competitionsHub');
    if (!hub) return;

    const isHome = State.view === 'inicio' && State.selectedLeague === 'all';
    hub.style.display = isHome ? 'block' : 'none';

    if (!isHome) return;

    const container = this.$('hubCategories');
    if (!container) return;

    let html = '';

    CATEGORIES.forEach(cat => {
      const comps = COMPETITIONS.filter(c => c.category === cat.id);

      html += `
        <div class="hub-category-block">
          <div class="hub-category-title">
            <span>${this.escapeHtml(cat.name)}</span>
            <small>${this.escapeHtml(cat.subtitle)} · ${comps.length} torneos</small>
          </div>
          <div class="hub-grid">
            ${comps.map(comp => {
              const compMatches = FIXTURES.filter(f => f.league === comp.id).length;
              return `
                <div
                  class="hub-card"
                  data-select-league="${comp.id}"
                  style="--card-color: ${comp.accentColor}">
                  <div class="hub-card-emblem" style="--emblem-bg: ${comp.badgeBg}; --emblem-color: ${comp.accentColor}">
                    ${comp.emblemSvg}
                  </div>
                  <div class="hub-card-body">
                    <div class="hub-card-name">${this.escapeHtml(comp.name)}</div>
                    <div class="hub-card-meta">
                      <span class="hub-card-flag">${comp.flag}</span>
                      <span>${this.escapeHtml(comp.country)}</span>
                      <span class="hub-card-sep">·</span>
                      <span class="tabular-nums">${compMatches} ${compMatches === 1 ? 'partido' : 'partidos'}</span>
                    </div>
                  </div>
                  <span class="hub-card-arrow">↗</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderCompetitionBanner() {
    const mount = this.$('competitionHeaderMount');
    if (!mount) return;

    if (State.selectedLeague === 'all') {
      mount.innerHTML = '';
      return;
    }

    const comp = COMPETITIONS.find(c => c.id === State.selectedLeague);
    if (!comp) {
      mount.innerHTML = '';
      return;
    }

    const compMatchesCount = FIXTURES.filter(f => f.league === comp.id).length;

    mount.innerHTML = `
      <div class="competition-banner" style="--comp-accent: ${comp.accentColor}">
        <div class="comp-banner-left">
          <div class="comp-banner-emblem" style="--emblem-bg: ${comp.badgeBg}; --emblem-color: ${comp.accentColor}">
            ${comp.emblemSvg}
          </div>
          <div class="comp-banner-text">
            <div class="comp-banner-kicker">
              <span>${this.escapeHtml(comp.categoryName)}</span>
              <span>·</span>
              <span>${comp.flag} ${this.escapeHtml(comp.country)}</span>
            </div>
            <h2>${this.escapeHtml(comp.name)}</h2>
            <p class="comp-banner-desc">${this.escapeHtml(comp.description)}</p>
            <div class="comp-banner-tags">
              <span class="comp-tag active">Temporada ${MatchweekConfig.season}</span>
              <span class="comp-tag">Fundada en ${comp.founded}</span>
              <span class="comp-tag tabular-nums">${compMatchesCount} ${compMatchesCount === 1 ? 'partido registrado' : 'partidos registrados'}</span>
              <span class="comp-tag">Fuente: Google Sheets</span>
            </div>
          </div>
        </div>
        <div class="comp-banner-right">
          <button class="btn-banner-all" id="btnBannerShowAll">
            ← Ver todas las competiciones
          </button>
        </div>
      </div>
    `;

    this.$('btnBannerShowAll')?.addEventListener('click', () => {
      State.selectedLeague = 'all';
      State.view = 'partidos';
      this.render();
    });
  },

  renderPeriodSelector() {
    const btnCurrent = this.$('btnPeriodCurrent');
    const btnNext = this.$('btnPeriodNext');
    const btn14Days = this.$('btnPeriod14Days');
    if (!btnCurrent || !btnNext || !btn14Days) return;

    btnCurrent.classList.toggle('active', State.periodMode === 'current');
    btnCurrent.setAttribute('aria-pressed', State.periodMode === 'current');

    btnNext.classList.toggle('active', State.periodMode === 'next');
    btnNext.setAttribute('aria-pressed', State.periodMode === 'next');

    btn14Days.classList.toggle('active', State.periodMode === '14days');
    btn14Days.setAttribute('aria-pressed', State.periodMode === '14days');
  },

  renderWeekControls() {
    const weekLabel = this.$('weekLabel');
    if (weekLabel) {
      if (State.periodMode === '14days') {
        const start = CalendarService.getCurrentMonday();
        const end = CalendarService.addDays(CalendarService.getNextMonday(), 6);
        weekLabel.textContent = `14 DÍAS: ${CalendarService.format(start, { day: 'numeric', month: 'short' })} – ${CalendarService.format(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
      } else if (State.periodMode === 'next') {
        const start = CalendarService.getNextMonday();
        const end = CalendarService.getWeekEnd(start);
        weekLabel.textContent = `PRÓXIMA SEMANA: ${CalendarService.format(start, { day: 'numeric', month: 'short' })} – ${CalendarService.format(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
      } else {
        const start = CalendarService.getCurrentMonday();
        const end = CalendarService.getWeekEnd(start);
        weekLabel.textContent = `${CalendarService.format(start, { day: 'numeric', month: 'short' })} – ${CalendarService.format(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
      }
    }

    const gamesHeading = this.$('gamesHeading');
    const gamesKicker = this.$('gamesKicker');

    if (gamesHeading && gamesKicker) {
      if (State.selectedLeague !== 'all') {
        const comp = COMPETITIONS.find(c => c.id === State.selectedLeague);
        gamesKicker.textContent = `${comp ? comp.categoryName.toUpperCase() : 'COMPETICIÓN'} / ${comp ? comp.country.toUpperCase() : ''}`;
        gamesHeading.innerHTML = `${comp ? this.escapeHtml(comp.name) : 'Competición'}<span class="accent">.</span>`;
      } else if (State.view === 'favoritos') {
        gamesKicker.textContent = 'SEGUIMIENTO PERSONAL';
        gamesHeading.innerHTML = 'Tus favoritos<span class="accent">.</span>';
      } else if (State.view === 'partidos') {
        gamesKicker.textContent = State.periodMode === '14days' ? 'CALENDARIO DE 14 DÍAS' : 'AGENDA COMPLETA';
        gamesHeading.innerHTML = `${State.periodMode === '14days' ? 'Dos semanas de partidos' : 'Todos los partidos'}<span class="accent">.</span>`;
      } else {
        gamesKicker.textContent = State.periodMode === '14days' ? 'CALENDARIO DE 14 DÍAS / DOS SEMANAS' : (State.periodMode === 'next' ? 'PRÓXIMA SEMANA / 2026—27' : 'SEMANA ACTUAL / 2026—27');
        gamesHeading.innerHTML = `${State.periodMode === '14days' ? 'Dos semanas de partidos' : 'Próximos encuentros'}<span class="accent">.</span>`;
      }
    }

    const gameCount = this.$('gameCount');
    if (gameCount) {
      const count = this.getVisibleFixtures().length;
      gameCount.textContent = `${count} ${count === 1 ? 'encuentro' : 'encuentros'}`;
    }
  },

  /**
   * Tira de Selección de Fecha:
   * Reactiva al período: 7 días en semana actual/próxima o 14 días completos en "Ver 14 días"
   */
  renderDateStrip() {
    const strip = this.$('dateStrip');
    if (!strip) return;

    const days = CalendarService.getPeriodDays(State.periodMode);
    const periodMatchesTotal = this.getFixturesForPeriod().filter(f => State.selectedLeague === 'all' || f.league === State.selectedLeague).length;
    const isSelectedAll = State.selectedDay === 'all';

    const allPillTitle = State.periodMode === '14days'
      ? `Ver todos los partidos de las dos semanas (${periodMatchesTotal} encuentros)`
      : `Ver todos los partidos de lunes a domingo (${periodMatchesTotal} encuentros)`;

    const allPillTop = State.periodMode === '14days' ? '14 DÍAS' : 'SEMANA';

    let html = `
      <button
        class="date-pill date-pill-all ${isSelectedAll ? 'active' : ''}"
        data-day="all"
        aria-pressed="${isSelectedAll}"
        title="${allPillTitle}">
        <span class="day-name">${allPillTop}</span>
        <span class="day-number tabular-nums">TODOS</span>
        <span class="day-indicator ${periodMatchesTotal > 0 ? 'has-matches' : ''}"></span>
      </button>
    `;

    html += days.map(d => {
      const s = CalendarService.toIso(d);
      const isSelected = State.selectedDay === s;
      const isToday = CalendarService.isToday(d);
      const isWeekend = CalendarService.isWeekend(d);
      const dayName = CalendarService.format(d, { weekday: 'short' }).replace('.', '').toUpperCase();
      const dayNumber = d.getDate();

      const dayCount = FIXTURES.filter(f => f.date === s && (State.selectedLeague === 'all' || f.league === State.selectedLeague)).length;

      return `
        <button
          class="date-pill ${isSelected ? 'active' : ''} ${isToday ? 'is-today' : ''} ${isWeekend ? 'is-weekend' : ''}"
          data-day="${s}"
          aria-pressed="${isSelected}"
          title="${CalendarService.format(d, { weekday: 'long', day: 'numeric', month: 'long' })} (${dayCount} partidos)">
          <span class="day-name">${dayName}</span>
          <span class="day-number tabular-nums">${dayNumber}</span>
          <span class="day-indicator ${dayCount > 0 ? 'has-matches' : ''}"></span>
        </button>
      `;
    }).join('');

    strip.innerHTML = html;
  },

  renderFilterButtons() {
    document.querySelectorAll('.filter').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === State.activeFilter);
    });
  },

  /**
   * Renderiza el listado de encuentros o los 4 Estados Vacíos Contextuales obligatorios
   */
  renderMatchList() {
    const list = this.$('matchList');
    if (!list) return;

    // 1. Búsqueda activa
    if (State.searchQuery) {
      const matches = this.getVisibleFixtures();
      const matchingComps = this.getMatchingCompetitions();

      if (matches.length === 0 && matchingComps.length === 0) {
        list.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-art">
              <svg viewBox="0 0 80 80" class="empty-vector" aria-hidden="true">
                <circle cx="40" cy="40" r="34" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" fill="none" opacity="0.4"/>
                <circle cx="36" cy="36" r="14" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <line x1="46" y1="46" x2="60" y2="60" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="empty-badge">BÚSQUEDA</span>
            <strong class="empty-state-headline">Sin resultados para "${this.escapeHtml(State.searchQuery)}"</strong>
            <p class="empty-state-desc">No se encontraron encuentros ni competiciones con ese criterio en los datos sincronizados.</p>
            <div class="empty-state-actions">
              <button class="btn-action primary" id="btnResetSearch">Limpiar búsqueda</button>
            </div>
          </div>
        `;
        this.$('btnResetSearch')?.addEventListener('click', () => {
          State.searchQuery = '';
          const input = this.$('searchInput');
          if (input) input.value = '';
          this.render();
        });
        return;
      }

      if (matchingComps.length > 0 && matches.length === 0) {
        list.innerHTML = `
          <div class="empty-state">
            <span class="empty-badge">COMPETICIONES COINCIDENTES</span>
            <strong class="empty-state-headline">${matchingComps.length} ${matchingComps.length === 1 ? 'competición encontrada' : 'competiciones encontradas'}</strong>
            <p class="empty-state-desc">Haz clic en una competición para consultar su apartado oficial:</p>
            <div class="empty-state-quick-grid">
              ${matchingComps.map(c => `
                <button
                  class="quick-comp-card"
                  data-select-league="${c.id}"
                  style="--comp-color: ${c.accentColor}">
                  <span class="quick-comp-emblem" style="--emblem-bg: ${c.badgeBg}; --emblem-color: ${c.accentColor}">
                    ${c.emblemSvg}
                  </span>
                  <div class="quick-comp-info">
                    <strong>${this.escapeHtml(c.name)}</strong>
                    <small>${c.flag} ${this.escapeHtml(c.country)} · ${this.escapeHtml(c.categoryName)}</small>
                  </div>
                  <span class="quick-comp-arrow">↗</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;
        return;
      }
    }

    // 2. Favoritos vacíos
    if (State.view === 'favoritos' && State.favorites.size === 0) {
      list.innerHTML = `
        <div class="empty-state favorites-empty-state">
          <div class="empty-state-art">
            <svg viewBox="0 0 80 80" class="empty-vector" aria-hidden="true">
              <path d="M40 64s-20-13-28-24c-8-11-2-22 8-22 6 0 12 5 20 12 8-7 14-12 20-12 10 0 16 11 8 22-8 11-28 24-28 24z" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>
              <circle cx="40" cy="38" r="4" fill="var(--accent)" opacity="0.8"/>
            </svg>
          </div>
          <span class="empty-badge">FAVORITOS</span>
          <h3 class="empty-state-title">Tus favoritos</h3>
          <strong class="empty-state-headline">No tienes partidos guardados</strong>
          <p class="empty-state-desc">Presiona el corazón en cualquier tarjeta para realizar seguimiento personalizado de tus encuentros preferidos.</p>
          <div class="empty-state-actions">
            <button class="btn-action primary" id="btnFavGoAll">Explorar competiciones</button>
          </div>
        </div>
      `;
      this.$('btnFavGoAll')?.addEventListener('click', () => {
        State.view = 'inicio';
        this.render();
        this.$('competitionsHub')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    const matches = this.getVisibleFixtures();

    // 3. Si existen partidos reales: Renderizar grupos ordenados por día
    if (matches.length > 0) {
      list.innerHTML = this.renderMatchGroups(matches);
      return;
    }

    // ========================================================================
    // 4. ESTADOS VACÍOS CONTEXTUALES OBLIGATORIOS (FASE 3B)
    // ========================================================================

    // CASO C: Consulta con errores
    if (State.lastSyncResult && State.lastSyncResult.status === 'error') {
      list.innerHTML = `
        <div class="empty-state error-empty-state">
          <span class="empty-badge" style="background: rgba(239, 68, 68, 0.2); color: #EF4444;">ERROR DE CONEXIÓN</span>
          <strong class="empty-state-headline">No se pudo comprobar la programación. Intenta actualizar.</strong>
          <p class="empty-state-desc">${this.escapeHtml(State.lastSyncResult.error || 'Ocurrió un error al consultar las pestañas de Google Sheets. Verifica la conexión a internet e inténtalo nuevamente.')}</p>
          <div class="empty-state-actions">
            <button class="btn-action primary" id="btnRetrySyncFromEmpty">Reintentar actualización</button>
          </div>
        </div>
      `;
      this.$('btnRetrySyncFromEmpty')?.addEventListener('click', () => this.handleSync());
      return;
    }

    // CASO D: Hay partidos en otras competiciones para la fecha seleccionada
    const weekStartIso = CalendarService.toIso(State.currentWeekStart);
    const weekEndIso = CalendarService.toIso(CalendarService.getWeekEnd(State.currentWeekStart));

    if (State.selectedLeague !== 'all') {
      const otherMatches = FIXTURES.filter(f => {
        if (f.league === State.selectedLeague) return false;
        if (State.selectedDay === 'all') {
          return f.date >= weekStartIso && f.date <= weekEndIso;
        }
        return f.date === State.selectedDay;
      });

      if (otherMatches.length > 0) {
        const comp = COMPETITIONS.find(c => c.id === State.selectedLeague) || { name: 'Competición' };
        list.innerHTML = `
          <div class="empty-state competition-empty-state">
            <span class="empty-badge">OTRAS COMPETICIONES ACTIVAS</span>
            <strong class="empty-state-headline">No hay partidos de esta competición para el día seleccionado.</strong>
            <p class="empty-state-desc">Se encontraron ${otherMatches.length} ${otherMatches.length === 1 ? 'partido' : 'partidos'} de otros torneos para esta fecha. Puedes consultar la agenda completa con un clic:</p>
            <div class="empty-state-actions">
              <button class="btn-action primary" id="btnEmptyShowAllComps">Ver todas las competiciones</button>
              <button class="btn-action secondary" id="btnEmptyShowAllWeek">Ver toda la semana</button>
            </div>
          </div>
        `;
        this.$('btnEmptyShowAllComps')?.addEventListener('click', () => {
          State.selectedLeague = 'all';
          this.render();
        });
        this.$('btnEmptyShowAllWeek')?.addEventListener('click', () => {
          State.selectedDay = 'all';
          this.render();
        });
        return;
      }
    }

    // Evaluación contra la pestaña "Cobertura diaria" de Google Sheets
    const targetDate = State.selectedDay !== 'all' ? State.selectedDay : null;
    let isDayVerified = false;

    if (targetDate) {
      const coverageRow = DAILY_COVERAGE_RECORDS.find(c => c.fechaPeru === targetDate && (State.selectedLeague === 'all' || c.competicionId === State.selectedLeague));
      if (coverageRow && ['verificado', 'consultado', 'completo', 'sin_partidos'].includes(coverageRow.estadoConsulta)) {
        isDayVerified = true;
      }
    } else {
      // Semana completa
      const verifiedDaysCount = DAILY_COVERAGE_RECORDS.filter(c => c.fechaPeru >= weekStartIso && c.fechaPeru <= weekEndIso).length;
      if (verifiedDaysCount >= 5) isDayVerified = true;
    }

    // CASO A: Cobertura verificada sin partidos
    if (isDayVerified) {
      list.innerHTML = `
        <div class="empty-state verified-empty-state">
          <div class="empty-state-art">
            <svg viewBox="0 0 80 80" class="empty-vector" aria-hidden="true">
              <circle cx="40" cy="40" r="32" stroke="var(--accent)" stroke-width="2" fill="none"/>
              <path d="M28 40l8 8 16-16" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="empty-badge">COBERTURA VERIFICADA</span>
          <strong class="empty-state-headline">No hubo partidos programados para este día.</strong>
          <p class="empty-state-desc">La programación deportiva de esta fecha ha sido confirmada en Google Sheets (pestaña Cobertura diaria) y no cuenta con encuentros en las ligas oficiales seleccionadas.</p>
          <div class="empty-state-actions">
            <button class="btn-action primary" id="btnEmptyViewWeek">Ver toda la semana</button>
          </div>
        </div>
      `;
      this.$('btnEmptyViewWeek')?.addEventListener('click', () => {
        State.selectedDay = 'all';
        this.render();
      });
      return;
    }

    // CASO B: Cobertura todavía no consultada (base de datos sin verificar o vacía)
    list.innerHTML = `
      <div class="empty-state general-empty-state">
        <div class="empty-state-art">
          <svg viewBox="0 0 100 60" class="empty-vector" aria-hidden="true">
            <rect x="5" y="5" width="90" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
            <line x1="50" y1="5" x2="50" y2="55" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <circle cx="50" cy="30" r="12" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
            <circle cx="50" cy="30" r="2.5" fill="var(--accent)"/>
          </svg>
        </div>
        <span class="empty-badge">PENDIENTE DE VERIFICACIÓN</span>
        <h3 class="empty-state-title">Calendario deportivo</h3>
        <strong class="empty-state-headline">Todavía no se ha verificado la programación de este día.</strong>
        <p class="empty-state-desc">Aún no se dispone de verificación de cobertura en el archivo oficial para esta fecha. Presiona «Actualizar partidos» para consultar los últimos registros.</p>
        <div class="empty-state-details">
          <span class="empty-detail-pill">11 competiciones configuradas</span>
          <span class="empty-detail-pill">Fuente: Google Sheets (Matchweek_Datos)</span>
          <span class="empty-detail-pill">Cero partidos simulados</span>
        </div>
        <div class="empty-state-actions">
          <button class="btn-action primary" id="btnTriggerSyncFromEmpty">Actualizar partidos</button>
          ${State.selectedDay !== 'all' ? `<button class="btn-action secondary" id="btnEmptyToAllWeek">Ver toda la semana</button>` : ''}
        </div>
      </div>
    `;

    this.$('btnTriggerSyncFromEmpty')?.addEventListener('click', () => this.handleSync());
    this.$('btnEmptyToAllWeek')?.addEventListener('click', () => {
      State.selectedDay = 'all';
      this.render();
    });
  },

  renderMatchGroups(matches) {
    const dayGroups = matches.reduce((acc, m) => {
      (acc[m.date] = acc[m.date] || []).push(m);
      return acc;
    }, {});

    return Object.keys(dayGroups).sort().map(dateStr => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d, 12, 0, 0);
      const dateTitle = CalendarService.format(dateObj, { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
      const isTodayGroup = CalendarService.isToday(dateObj);
      const dayMatches = dayGroups[dateStr];

      // Subagrupación por competición dentro del día
      const compMap = dayMatches.reduce((acc, m) => {
        (acc[m.league] = acc[m.league] || []).push(m);
        return acc;
      }, {});

      const compKeys = Object.keys(compMap).sort((a, b) => {
        const idxA = COMPETITIONS.findIndex(c => c.id === a);
        const idxB = COMPETITIONS.findIndex(c => c.id === b);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
      });

      const compBlocksHtml = compKeys.map(leagueId => {
        const comp = COMPETITIONS.find(c => c.id === leagueId) || {
          id: leagueId,
          name: leagueId,
          flag: '⚽',
          accentColor: '#C6FF4D'
        };
        const compMatches = compMap[leagueId].sort((a, b) => (a.time || '').localeCompare(b.time || ''));

        return `
          <div class="comp-group-block">
            <div class="comp-group-header" style="--comp-accent: ${comp.accentColor}">
              <span class="comp-group-flag">${comp.flag}</span>
              <span class="comp-group-title" style="color: ${comp.accentColor}">${this.escapeHtml(comp.name)}</span>
              <span class="comp-group-count tabular-nums">${compMatches.length} ${compMatches.length === 1 ? 'partido' : 'partidos'}</span>
            </div>
            <div class="day-matches-grid">
              ${compMatches.map(m => this.renderMatchCard(m)).join('')}
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="day-group ${isTodayGroup ? 'is-today-group' : ''}">
          <div class="day-heading">
            <span class="day-heading-title">
              ${isTodayGroup ? `<span class="live-dot" title="Día actual"></span> ` : ''}${dateTitle}
            </span>
            <span class="day-heading-line"></span>
            <span class="day-heading-count tabular-nums">${dayMatches.length} ${dayMatches.length === 1 ? 'PARTIDO' : 'PARTIDOS'}</span>
          </div>
          <div class="day-comps-container">
            ${compBlocksHtml}
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Renderiza la tarjeta de partido diferenciando claramente los 7 estados:
   * FINALIZADO | EN_VIVO | DESCANSO | PROGRAMADO | APLAZADO | SUSPENDIDO | CANCELADO
   * Toda la tarjeta permite abrir el análisis táctico.
   */
  renderMatchCard(m) {
    const comp = COMPETITIONS.find(c => c.id === m.league) || { name: 'Fútbol', accentColor: '#C6FF4D' };
    const isFav = State.favorites.has(String(m.id));

    let scoreDisplay = '';
    let statusBadge = '';

    if (m.status === 'finished') {
      scoreDisplay = `<strong class="tabular-nums match-score-live">${m.homeGoals} - ${m.awayGoals}</strong>`;
      statusBadge = `<small class="score-tag finished">FINALIZADO</small>`;
    } else if (m.status === 'live') {
      scoreDisplay = `<strong class="tabular-nums match-score-live">${m.homeGoals !== null ? m.homeGoals : 0} - ${m.awayGoals !== null ? m.awayGoals : 0}</strong>`;
      statusBadge = `<small class="score-tag live"><span class="pulse-light"></span> EN VIVO</small>`;
    } else if (m.status === 'halftime') {
      scoreDisplay = `<strong class="tabular-nums match-score-live">${m.homeGoals !== null ? m.homeGoals : 0} - ${m.awayGoals !== null ? m.awayGoals : 0}</strong>`;
      statusBadge = `<small class="score-tag halftime"><span class="pulse-light"></span> DESCANSO</small>`;
    } else if (m.status === 'postponed') {
      scoreDisplay = `<strong class="tabular-nums match-time-muted">${this.escapeHtml(m.time || 'TBD')}</strong>`;
      statusBadge = `<small class="score-tag postponed">APLAZADO</small>`;
    } else if (m.status === 'suspended') {
      scoreDisplay = `<strong class="tabular-nums match-time-muted">${m.hasScore ? `${m.homeGoals} - ${m.awayGoals}` : this.escapeHtml(m.time || 'TBD')}</strong>`;
      statusBadge = `<small class="score-tag suspended">SUSPENDIDO</small>`;
    } else if (m.status === 'cancelled') {
      scoreDisplay = `<strong class="tabular-nums match-time-muted">—</strong>`;
      statusBadge = `<small class="score-tag cancelled">CANCELADO</small>`;
    } else {
      // PROGRAMADO
      scoreDisplay = `<strong class="tabular-nums">${this.escapeHtml(m.time || 'TBD')}</strong>`;
      statusBadge = `<small class="score-tag upcoming">POR JUGAR</small>`;
    }

    // Goleadores en la tarjeta (si existen en Goles para este partido)
    const matchGoals = GOALS_RECORDS.filter(g => String(g.partidoId) === String(m.id));
    let scorersHtml = '';
    if (matchGoals.length > 0) {
      const summaryText = matchGoals.map(g => `${g.jugadorNombre} ${g.minuto}'${g.tipoGol === 'PENALTI' ? ' (P)' : ''}`).join(', ');
      scorersHtml = `
        <div class="match-scorers-preview" title="${this.escapeHtml(summaryText)}">
          <span class="scorers-icon">⚽</span>
          <span class="scorers-text">${this.escapeHtml(summaryText)}</span>
        </div>
      `;
    }

    return `
      <article
        class="match-card ${m.status === 'finished' ? 'is-finished' : ''} ${m.status === 'live' ? 'is-live' : ''}"
        data-match-id="${m.id}"
        tabindex="0"
        role="button"
        aria-label="Ver análisis de ${this.escapeHtml(m.homeTeam)} contra ${this.escapeHtml(m.awayTeam)}">
        <div class="match-meta">
          <span class="competition" style="color: ${comp.accentColor}">${this.escapeHtml(comp.name)}</span>
          <small class="tabular-nums">${this.escapeHtml(m.venue || 'Estadio oficial')} · Hora Perú</small>
        </div>
        <div class="teams">
          <div class="team">
            <span class="team-crest">
              ${m.homeCrest ? `<img src="${this.escapeHtml(m.homeCrest)}" alt="${this.escapeHtml(m.homeTeam)}" class="crest-img" onerror="this.outerHTML='⚽'"/>` : '⚽'}
            </span>
            <span class="team-name">${this.escapeHtml(m.homeTeam)}</span>
          </div>
          <div class="score-box">
            ${scoreDisplay}
            ${statusBadge}
          </div>
          <div class="team right">
            <span class="team-crest">
              ${m.awayCrest ? `<img src="${this.escapeHtml(m.awayCrest)}" alt="${this.escapeHtml(m.awayTeam)}" class="crest-img" onerror="this.outerHTML='⚽'"/>` : '⚽'}
            </span>
            <span class="team-name">${this.escapeHtml(m.awayTeam)}</span>
          </div>
        </div>
        ${scorersHtml}
        <div class="match-action">
          <button class="fav-button ${isFav ? 'saved' : ''}" data-fav="${m.id}" aria-label="Favorito" title="${isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
            ${isFav ? '♥' : '♡'}
          </button>
          <button class="details-button" data-detail="${m.id}">Análisis ↗</button>
        </div>
      </article>
    `;
  },

  renderFooter() {
    const yearEl = this.$('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  },

  // --------------------------------------------------------------------------
  // MODAL / FICHA PROFESIONAL DE ENCUENTRO (6 PESTAÑAS)
  // --------------------------------------------------------------------------
  openMatchDetails(matchId) {
    const match = FIXTURES.find(f => String(f.id) === String(matchId));
    const dialog = this.$('matchDialog');
    const content = this.$('dialogContent');
    if (!dialog || !content) return;

    State.activeModalMatchId = String(matchId);
    State.activeModalTab = 'resumen';

    if (!match) {
      content.innerHTML = `
        <div class="dialog-top">
          <div class="dialog-toolbar">
            <span class="dialog-kicker">FICHA TÉCNICA</span>
            <button class="dialog-close" id="dialogCloseBtn" aria-label="Cerrar ventana">✕</button>
          </div>
          <h3 class="dialog-heading">Partido no encontrado</h3>
          <p class="dialog-sub">No se localizaron registros deportivos oficiales para el encuentro solicitado.</p>
        </div>
        <div class="dialog-body">
          <div class="dialog-empty-panel">
            <p>Por favor consulta nuevamente los registros de Google Sheets.</p>
          </div>
        </div>
      `;
      dialog.showModal();
      this.$('dialogCloseBtn')?.addEventListener('click', () => dialog.close());
      return;
    }

    this.renderModalContent(match);
    dialog.showModal();
  },

  calculatePitchCoordinates(starters, formationStr, isHomeTeam) {
    const formation = DataTransformer.normalizeFormation(formationStr);
    const lines = formation.split('-').map(Number).filter(n => !isNaN(n) && n > 0);

    // Encontrar portero (POR)
    let gkIndex = starters.findIndex(p => p.posicion === 'POR');
    if (gkIndex === -1) gkIndex = 0;

    const fieldPlayers = starters.filter((_, idx) => idx !== gkIndex);
    const result = [];

    // Portero en el área
    result.push({
      player: starters[gkIndex] || { jugadorNombre: 'Portero', numero: 1, posicion: 'POR' },
      x: 50,
      y: isHomeTeam ? 92 : 8
    });

    // Líneas de campo (defensas, medios, delanteros)
    let playerOffset = 0;
    const numLines = lines.length;

    lines.forEach((lineCount, lineIdx) => {
      let yPct = 50;
      if (isHomeTeam) {
        const yMin = 82;
        const yMax = 56;
        yPct = numLines === 1 ? 70 : yMin - (lineIdx / (numLines - 1)) * (yMin - yMax);
      } else {
        const yMin = 18;
        const yMax = 44;
        yPct = numLines === 1 ? 30 : yMin + (lineIdx / (numLines - 1)) * (yMax - yMin);
      }

      for (let i = 0; i < lineCount; i++) {
        const p = fieldPlayers[playerOffset + i] || { jugadorNombre: `Jugador ${playerOffset + i + 1}`, numero: '•', posicion: 'CAMPO' };
        const xPct = ((i + 1) / (lineCount + 1)) * 100;
        result.push({
          player: p,
          x: Number(xPct.toFixed(1)),
          y: Number(yPct.toFixed(1))
        });
      }
      playerOffset += lineCount;
    });

    return result;
  },

  renderPitchPlayerNode(item, isHome, matchGoals, matchEvents) {
    const p = item.player;
    const num = p.numero || '•';

    const pName = (p.jugadorNombre || '').toLowerCase();
    const goalsCount = matchGoals.filter(g => g.jugadorNombre && pName && (g.jugadorNombre.toLowerCase().includes(pName) || pName.includes(g.jugadorNombre.toLowerCase()))).length;
    const hasYellow = matchEvents.some(e => e.tipoEvento.includes('amarilla') && e.jugadorNombre && pName && e.jugadorNombre.toLowerCase().includes(pName));
    const hasRed = matchEvents.some(e => e.tipoEvento.includes('roja') && e.jugadorNombre && pName && e.jugadorNombre.toLowerCase().includes(pName));
    const isSubbed = matchEvents.some(e => (e.tipoEvento.includes('sustitucion') || e.tipoEvento.includes('cambio')) && e.jugadorNombre && pName && e.jugadorNombre.toLowerCase().includes(pName));

    let incidentsHtml = '';
    if (goalsCount > 0) incidentsHtml += `⚽${goalsCount > 1 ? goalsCount : ''}`;
    if (hasRed) incidentsHtml += '🟥';
    else if (hasYellow) incidentsHtml += '🟨';
    if (isSubbed) incidentsHtml += '🔄';

    const rawName = (p.jugadorNombre || '').trim();
    const parts = rawName.split(/\s+/);
    const shortName = parts.length > 1 ? parts[parts.length - 1] : rawName;

    return `
      <div
        class="pitch-player-node ${isHome ? 'home-player' : 'away-player'}"
        style="left: ${item.x}%; top: ${item.y}%;"
        title="${this.escapeHtml(rawName)} (#${num} · ${this.escapeHtml(p.posicion || 'Campo')})">
        <div class="player-jersey">
          ${num}
          ${incidentsHtml ? `<span class="player-incidents">${incidentsHtml}</span>` : ''}
        </div>
        <span class="player-short-name">${this.escapeHtml(shortName)}</span>
      </div>
    `;
  },

  renderTacticalPitchHtml(match, matchLineups, matchGoals, matchEvents) {
    if (matchLineups.length === 0) {
      return `
        <div class="dialog-empty-panel">
          <span class="dialog-empty-icon">📋</span>
          <strong>Alineaciones pendientes de confirmación</strong>
          <p>Las alineaciones oficiales se confirmarán en la pestaña <code>Alineaciones</code> de Google Sheets previo al inicio del encuentro. No se inventaron jugadores ficticios.</p>
        </div>
      `;
    }

    const homeLineups = matchLineups.filter(l => l.equipoId === match.localId);
    const awayLineups = matchLineups.filter(l => l.equipoId === match.visitanteId);

    const homeStarters = homeLineups.filter(l => l.titular);
    const awayStarters = awayLineups.filter(l => l.titular);

    const homeSubs = homeLineups.filter(l => !l.titular && l.posicion !== 'DT');
    const awaySubs = awayLineups.filter(l => !l.titular && l.posicion !== 'DT');

    const homeCoach = homeLineups.find(l => l.posicion === 'DT' || l.tipo === 'ENTRENADOR');
    const awayCoach = awayLineups.find(l => l.posicion === 'DT' || l.tipo === 'ENTRENADOR');

    const rawHomeFormation = homeLineups[0]?.formacion || '4-4-2';
    const rawAwayFormation = awayLineups[0]?.formacion || '4-4-2';

    const homeFormation = DataTransformer.normalizeFormation(rawHomeFormation);
    const awayFormation = DataTransformer.normalizeFormation(rawAwayFormation);

    let tacticalPitchBoardHtml = '';
    if (State.lineupViewMode === 'pitch' && (homeStarters.length > 0 || awayStarters.length > 0)) {
      const homeCoords = this.calculatePitchCoordinates(homeStarters, homeFormation, true);
      const awayCoords = this.calculatePitchCoordinates(awayStarters, awayFormation, false);

      tacticalPitchBoardHtml = `
        <div class="tactical-pitch-card">
          <div class="tactical-team-banner away-banner">
            <span>${this.escapeHtml(match.awayTeam)}</span>
            <span class="tabular-nums">${awayFormation}</span>
          </div>

          <div class="tactical-pitch-board">
            <svg viewBox="0 0 100 140" class="tactical-pitch-svg" preserveAspectRatio="none">
              <!-- Césped y contorno -->
              <rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <!-- Línea central y círculo -->
              <line x1="2" y1="70" x2="98" y2="70" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <circle cx="50" cy="70" r="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <circle cx="50" cy="70" r="1" fill="rgba(255,255,255,0.8)"/>
              
              <!-- Área Visitante -->
              <rect x="24" y="2" width="52" height="22" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <rect x="36" y="2" width="28" height="8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <circle cx="50" cy="16" r="1" fill="rgba(255,255,255,0.8)"/>
              <path d="M 40 24 A 10 10 0 0 0 60 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>

              <!-- Área Local -->
              <rect x="24" y="116" width="52" height="22" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <rect x="36" y="130" width="28" height="8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
              <circle cx="50" cy="124" r="1" fill="rgba(255,255,255,0.8)"/>
              <path d="M 40 116 A 10 10 0 0 1 60 116" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
            </svg>

            <!-- Jugadores Visitantes -->
            ${awayCoords.map(item => this.renderPitchPlayerNode(item, false, matchGoals, matchEvents)).join('')}

            <!-- Jugadores Locales -->
            ${homeCoords.map(item => this.renderPitchPlayerNode(item, true, matchGoals, matchEvents)).join('')}
          </div>

          <div class="tactical-team-banner home-banner">
            <span>${this.escapeHtml(match.homeTeam)}</span>
            <span class="tabular-nums">${homeFormation}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="dialog-panel">
        <div class="lineup-toggle-header">
          <div class="lineup-toggle-bar">
            <button class="lineup-toggle-btn ${State.lineupViewMode === 'pitch' ? 'active' : ''}" data-lineup-view="pitch">Vista Cancha Táctica ⚽</button>
            <button class="lineup-toggle-btn ${State.lineupViewMode === 'list' ? 'active' : ''}" data-lineup-view="list">Vista Lista 📋</button>
          </div>
          <span class="comp-tag">Formación confirmada</span>
        </div>

        ${tacticalPitchBoardHtml}

        <div class="lineups-split">
          <div class="lineup-side">
            <h4>${this.escapeHtml(match.homeTeam)} <small class="tabular-nums">(${homeFormation})</small></h4>
            <div class="subgroup-title"><span>Titulares (${homeStarters.length})</span></div>
            <div class="lineup-list">
              ${homeStarters.map(p => `
                <div class="player-row starter">
                  <span class="player-num tabular-nums">${p.numero || '—'}</span>
                  <span class="player-name">${this.escapeHtml(p.jugadorNombre)}</span>
                  <small class="player-pos">${this.escapeHtml(p.posicion || 'Titular')}</small>
                </div>
              `).join('')}
            </div>
            ${homeSubs.length > 0 ? `
              <div class="subgroup-title" style="margin-top: 14px;"><span>Suplentes (${homeSubs.length})</span></div>
              <div class="lineup-list">
                ${homeSubs.map(p => `
                  <div class="player-row sub">
                    <span class="player-num tabular-nums">${p.numero || '—'}</span>
                    <span class="player-name">${this.escapeHtml(p.jugadorNombre)}</span>
                    <small class="player-pos">${this.escapeHtml(p.posicion || 'Suplente')}</small>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${homeCoach ? `
              <div class="detail-row" style="margin-top: 12px; padding: 6px 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-dim);">Entrenador:</span>
                <strong style="font-size: 12px;">${this.escapeHtml(homeCoach.jugadorNombre)}</strong>
              </div>
            ` : ''}
          </div>

          <div class="lineup-side">
            <h4>${this.escapeHtml(match.awayTeam)} <small class="tabular-nums">(${awayFormation})</small></h4>
            <div class="subgroup-title"><span>Titulares (${awayStarters.length})</span></div>
            <div class="lineup-list">
              ${awayStarters.map(p => `
                <div class="player-row starter">
                  <span class="player-num tabular-nums">${p.numero || '—'}</span>
                  <span class="player-name">${this.escapeHtml(p.jugadorNombre)}</span>
                  <small class="player-pos">${this.escapeHtml(p.posicion || 'Titular')}</small>
                </div>
              `).join('')}
            </div>
            ${awaySubs.length > 0 ? `
              <div class="subgroup-title" style="margin-top: 14px;"><span>Suplentes (${awaySubs.length})</span></div>
              <div class="lineup-list">
                ${awaySubs.map(p => `
                  <div class="player-row sub">
                    <span class="player-num tabular-nums">${p.numero || '—'}</span>
                    <span class="player-name">${this.escapeHtml(p.jugadorNombre)}</span>
                    <small class="player-pos">${this.escapeHtml(p.posicion || 'Suplente')}</small>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${awayCoach ? `
              <div class="detail-row" style="margin-top: 12px; padding: 6px 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-dim);">Entrenador:</span>
                <strong style="font-size: 12px;">${this.escapeHtml(awayCoach.jugadorNombre)}</strong>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  renderComparativeStatsHtml(match, matchStats) {
    const currentMatchStats = matchStats.filter(s => !s.metrica.toLowerCase().startsWith('h2h_'));

    if (currentMatchStats.length === 0) {
      return `
        <div class="dialog-empty-panel">
          <span class="dialog-empty-icon">📈</span>
          <strong>Estadísticas oficiales no disponibles</strong>
          <p>La pestaña <code>Estadisticas</code> de Google Sheets aún no contiene métricas registradas para este partido.</p>
        </div>
      `;
    }

    const categories = [
      {
        id: 'control',
        name: 'Control de juego',
        icon: '⏱',
        metrics: [
          { key: 'posesion', label: 'Posesión', isPct: true },
          { key: 'pases', label: 'Pases totales', isPct: false },
          { key: 'precision_pases', label: 'Precisión de pases', isPct: true }
        ]
      },
      {
        id: 'ataque',
        name: 'Ataque',
        icon: '⚡',
        metrics: [
          { key: 'remates', label: 'Remates totales', isPct: false },
          { key: 'remates_arco', label: 'Remates a puerta', isPct: false },
          { key: 'remates_fuera', label: 'Remates fuera', isPct: false },
          { key: 'xg', label: 'Goles esperados (xG)', isPct: false }
        ]
      },
      {
        id: 'disciplina',
        name: 'Disciplina',
        icon: '🟨',
        metrics: [
          { key: 'faltas', label: 'Faltas cometidas', isPct: false },
          { key: 'amarillas', label: 'Tarjetas amarillas', isPct: false },
          { key: 'rojas', label: 'Tarjetas rojas', isPct: false }
        ]
      },
      {
        id: 'otras',
        name: 'Otras métricas',
        icon: '🛡',
        metrics: [
          { key: 'corners', label: 'Córners', isPct: false },
          { key: 'fueras_juego', label: 'Fueras de juego', isPct: false },
          { key: 'paradas', label: 'Paradas del portero', isPct: false }
        ]
      }
    ];

    const getStatValues = (metricKey) => {
      const homeRow = currentMatchStats.find(s => s.equipoId === match.localId && (s.metrica.toLowerCase() === metricKey || s.metrica.toLowerCase().includes(metricKey)));
      const awayRow = currentMatchStats.find(s => s.equipoId === match.visitanteId && (s.metrica.toLowerCase() === metricKey || s.metrica.toLowerCase().includes(metricKey)));

      if (!homeRow && !awayRow) return null;

      const rawHomeVal = homeRow ? String(homeRow.valor).replace('%', '').trim() : null;
      const rawAwayVal = awayRow ? String(awayRow.valor).replace('%', '').trim() : null;

      const homeNum = rawHomeVal !== null ? parseFloat(rawHomeVal) : 0;
      const awayNum = rawAwayVal !== null ? parseFloat(rawAwayVal) : 0;
      const unit = homeRow?.unidad || awayRow?.unidad || '';

      return {
        homeVal: isNaN(homeNum) ? 0 : homeNum,
        awayVal: isNaN(awayNum) ? 0 : awayNum,
        homeDisplay: homeRow ? `${homeRow.valor}${unit && !String(homeRow.valor).includes(unit) ? ' ' + unit : ''}` : '—',
        awayDisplay: awayRow ? `${awayRow.valor}${unit && !String(awayRow.valor).includes(unit) ? ' ' + unit : ''}` : '—'
      };
    };

    let categoriesHtml = '';

    categories.forEach(cat => {
      const renderedMetrics = [];

      cat.metrics.forEach(m => {
        const vals = getStatValues(m.key);
        if (!vals) return;

        let homeBarPct = 50;
        let awayBarPct = 50;

        if (m.isPct) {
          homeBarPct = Math.min(100, Math.max(0, vals.homeVal));
          awayBarPct = 100 - homeBarPct;
        } else {
          const sum = vals.homeVal + vals.awayVal;
          if (sum > 0) {
            homeBarPct = Number(((vals.homeVal / sum) * 100).toFixed(1));
            awayBarPct = Number((100 - homeBarPct).toFixed(1));
          }
        }

        const isHomeDominant = vals.homeVal > vals.awayVal && m.key !== 'faltas';
        const isAwayDominant = vals.awayVal > vals.homeVal && m.key !== 'faltas';

        renderedMetrics.push(`
          <div class="stat-compare-row">
            <div class="stat-compare-header">
              <span class="stat-val-home ${isHomeDominant ? 'is-dominant' : ''} tabular-nums">${vals.homeDisplay}</span>
              <span class="stat-name-center">${this.escapeHtml(m.label)}</span>
              <span class="stat-val-away ${isAwayDominant ? 'is-dominant' : ''} tabular-nums">${vals.awayDisplay}</span>
            </div>
            <div class="stat-compare-bar-track">
              <div class="stat-bar-fill-home" style="width: ${homeBarPct}%"></div>
              <div class="stat-bar-fill-away" style="width: ${awayBarPct}%"></div>
            </div>
          </div>
        `);
      });

      if (renderedMetrics.length > 0) {
        categoriesHtml += `
          <div class="stats-category-block">
            <div class="stats-category-title">
              <span>${cat.icon} ${this.escapeHtml(cat.name)}</span>
            </div>
            ${renderedMetrics.join('')}
          </div>
        `;
      }
    });

    if (!categoriesHtml) {
      categoriesHtml = `
        <div class="stats-category-block">
          <div class="stats-category-title"><span>Estadísticas del encuentro</span></div>
          <div class="stats-table">
            ${currentMatchStats.map(s => `
              <div class="stat-row">
                <span class="stat-name">${this.escapeHtml(s.metrica)}</span>
                <span class="stat-team-id">${this.escapeHtml(s.equipoId)}</span>
                <strong class="stat-val tabular-nums">${this.escapeHtml(s.valor)} ${this.escapeHtml(s.unidad)}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="dialog-panel">
        ${categoriesHtml}
        <div class="dialog-note">
          <strong>Visualización profesional:</strong> Barras comparativas proporcionales basadas en métricas oficiales de la pestaña <code>Estadisticas</code>.
        </div>
      </div>
    `;
  },

  renderBilateralScorersHtml(match, matchGoals) {
    if (matchGoals.length === 0) {
      if (match.status === 'finished') {
        return `
          <div class="empty-subpanel" style="margin-bottom: 14px;">
            <span>${match.hasScore && match.homeGoals === 0 && match.awayGoals === 0 ? 'Empate sin goles (0 - 0).' : 'Detalle de goleadores pendiente de confirmación en la pestaña Goles.'}</span>
          </div>
        `;
      }
      return '';
    }

    const homeGoals = matchGoals.filter(g => g.equipoId === match.localId);
    const awayGoals = matchGoals.filter(g => g.equipoId === match.visitanteId);

    return `
      <div class="dialog-subgroup" style="margin-top: 10px;">
        <div class="subgroup-title"><span>GOLEADORES OFICIALES</span></div>
        <div class="scorers-bilateral">
          <div class="scorers-column">
            <span class="scorers-column-title">${this.escapeHtml(match.homeTeam)}</span>
            ${homeGoals.length > 0 ? homeGoals.map(g => `
              <div class="goal-item">
                <span class="goal-min tabular-nums">${g.minuto}'${g.adicional ? `+${g.adicional}` : ''}</span>
                <span class="goal-ball">⚽</span>
                <div class="goal-text">
                  <strong>${this.escapeHtml(g.jugadorNombre)}</strong>
                  <small>${g.tipoGol !== 'NORMAL' ? `${g.tipoGol} ` : ''}${g.asistenciaJugador ? `· Asistencia: ${this.escapeHtml(g.asistenciaJugador)}` : ''}</small>
                </div>
              </div>
            `).join('') : '<span style="font-size: 11px; color: var(--text-dim);">Sin goles</span>'}
          </div>

          <div class="scorers-column">
            <span class="scorers-column-title">${this.escapeHtml(match.awayTeam)}</span>
            ${awayGoals.length > 0 ? awayGoals.map(g => `
              <div class="goal-item">
                <span class="goal-min tabular-nums">${g.minuto}'${g.adicional ? `+${g.adicional}` : ''}</span>
                <span class="goal-ball">⚽</span>
                <div class="goal-text">
                  <strong>${this.escapeHtml(g.jugadorNombre)}</strong>
                  <small>${g.tipoGol !== 'NORMAL' ? `${g.tipoGol} ` : ''}${g.asistenciaJugador ? `· Asistencia: ${this.escapeHtml(g.asistenciaJugador)}` : ''}</small>
                </div>
              </div>
            `).join('') : '<span style="font-size: 11px; color: var(--text-dim);">Sin goles</span>'}
          </div>
        </div>
      </div>
    `;
  },

  renderBilateralTimelineHtml(match, matchEvents) {
    if (matchEvents.length === 0) {
      if (match.status === 'finished') {
        return `
          <div class="timeline-empty-notice">
            <span>Cronología no disponible para este encuentro</span>
          </div>
        `;
      }
      return `
        <div class="timeline-empty-notice">
          <span>Cronología pendiente de publicación</span>
        </div>
      `;
    }

    const rowsHtml = matchEvents.map(e => {
      let icon = '⏱';
      if (e.tipoEvento.includes('gol')) icon = '⚽';
      else if (e.tipoEvento.includes('amarilla')) icon = '🟨';
      else if (e.tipoEvento.includes('roja')) icon = '🟥';
      else if (e.tipoEvento.includes('sustitucion') || e.tipoEvento.includes('cambio')) icon = '🔄';
      else if (e.tipoEvento.includes('penalti')) icon = '🎯';
      else if (e.tipoEvento.includes('var')) icon = '📺';

      const isHome = e.equipoId === match.localId;
      const isAway = e.equipoId === match.visitanteId;

      const cardHtml = `
        <div class="timeline-event-card ${isHome ? 'home' : (isAway ? 'away' : 'home')}">
          ${isHome ? `
            <div class="timeline-card-content">
              <strong>${this.escapeHtml(e.jugadorNombre || e.tipoEvento.toUpperCase())}</strong>
              <small>${this.escapeHtml(e.descripcion || '')}</small>
            </div>
            <span class="timeline-card-icon">${icon}</span>
          ` : `
            <span class="timeline-card-icon">${icon}</span>
            <div class="timeline-card-content">
              <strong>${this.escapeHtml(e.jugadorNombre || e.tipoEvento.toUpperCase())}</strong>
              <small>${this.escapeHtml(e.descripcion || '')}</small>
            </div>
          `}
        </div>
      `;

      return `
        <div class="timeline-event-row">
          ${isHome ? cardHtml : '<div></div>'}
          <span class="timeline-axis-badge tabular-nums">${e.minuto}'</span>
          ${isAway ? cardHtml : '<div></div>'}
        </div>
      `;
    }).join('');

    return `
      <div class="dialog-subgroup">
        <div class="subgroup-title"><span>LÍNEA DE TIEMPO DEL ENCUENTRO</span></div>
        <div class="timeline-bilateral">
          ${rowsHtml}
        </div>
      </div>
    `;
  },

  renderRecentFormHtml(match, matchRecentForm) {
    const renderTeamBlock = (teamId, teamName) => {
      const records = matchRecentForm
        .filter(r => r.equipoId === teamId)
        .sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''))
        .slice(0, 5);

      if (records.length === 0) {
        return `
          <div class="form-team-card">
            <div class="form-team-header">
              <span class="form-team-name">${this.escapeHtml(teamName)}</span>
            </div>
            <p style="font-size: 11.5px; color: var(--text-dim); margin: 0;">Sin antecedentes recientes registrados en Google Sheets.</p>
          </div>
        `;
      }

      const wins = records.filter(r => ['V', 'W'].includes(r.resultado.toUpperCase())).length;
      const draws = records.filter(r => ['E', 'D_EMPATE'].includes(r.resultado.toUpperCase())).length;
      const losses = records.filter(r => ['D', 'L'].includes(r.resultado.toUpperCase())).length;
      const gf = records.reduce((sum, r) => sum + (r.golesFavor || 0), 0);
      const gc = records.reduce((sum, r) => sum + (r.golesContra || 0), 0);
      const dg = gf - gc;

      return `
        <div class="form-team-card">
          <div class="form-team-header">
            <span class="form-team-name">${this.escapeHtml(teamName)}</span>
            <div class="form-streak-badges">
              ${records.map(r => `<span class="form-res ${r.resultado.toLowerCase()}">${r.resultado}</span>`).join('')}
            </div>
          </div>

          <div class="form-summary-stats">
            <div class="form-summary-col">
              <span class="form-summary-label">V</span>
              <span class="form-summary-val" style="color: #10B981;">${wins}</span>
            </div>
            <div class="form-summary-col">
              <span class="form-summary-label">E</span>
              <span class="form-summary-val" style="color: #F59E0B;">${draws}</span>
            </div>
            <div class="form-summary-col">
              <span class="form-summary-label">D</span>
              <span class="form-summary-val" style="color: #EF4444;">${losses}</span>
            </div>
            <div class="form-summary-col">
              <span class="form-summary-label">GF</span>
              <span class="form-summary-val">${gf}</span>
            </div>
            <div class="form-summary-col">
              <span class="form-summary-label">GC</span>
              <span class="form-summary-val">${gc}</span>
            </div>
            <div class="form-summary-col">
              <span class="form-summary-label">DG</span>
              <span class="form-summary-val">${dg >= 0 ? `+${dg}` : dg}</span>
            </div>
          </div>

          <div class="form-list">
            ${records.map(r => `
              <div class="form-match-mini-card">
                <div class="form-match-info">
                  <span class="form-match-rival">vs ${this.escapeHtml(r.rivalId)}</span>
                  <span class="form-match-meta tabular-nums">${this.escapeHtml(r.fecha)} · ${r.condicion === 'LOCAL' ? 'Local' : 'Visitante'}</span>
                </div>
                <strong class="tabular-nums" style="font-size: 13px;">${r.golesFavor !== null ? `${r.golesFavor} - ${r.golesContra}` : 'N/D'}</strong>
                <span class="form-res ${r.resultado.toLowerCase()}">${this.escapeHtml(r.resultado)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    };

    return `
      <div class="dialog-panel">
        <div class="form-teams-grid">
          ${renderTeamBlock(match.localId, match.homeTeam)}
          ${renderTeamBlock(match.visitanteId, match.awayTeam)}
        </div>
        <div class="dialog-note">
          <strong>Rendimiento reciente:</strong> Calculado estrictamente con los últimos 5 encuentros anteriores al partido analizado.
        </div>
      </div>
    `;
  },

  renderH2HHtml(match, matchH2H) {
    if (matchH2H.length === 0) {
      return `
        <div class="dialog-empty-panel">
          <span class="dialog-empty-icon">⚔️</span>
          <strong>Sin enfrentamientos directos registrados</strong>
          <p>La pestaña <code>Enfrentamientos H2H</code> de Google Sheets no tiene antecedentes para estos dos clubes.</p>
        </div>
      `;
    }

    const sorted = [...matchH2H].sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
    let winsA = 0;
    let draws = 0;
    let winsB = 0;

    sorted.forEach(r => {
      if (r.golesLocal === null || r.golesVisitante === null) return;
      if (r.golesLocal === r.golesVisitante) {
        draws++;
      } else if (r.golesLocal > r.golesVisitante) {
        if (r.localId === match.localId) winsA++;
        else winsB++;
      } else {
        if (r.visitanteId === match.localId) winsA++;
        else winsB++;
      }
    });

    const total = sorted.length;
    const pctA = total > 0 ? Number(((winsA / total) * 100).toFixed(1)) : 33.3;
    const pctDraw = total > 0 ? Number(((draws / total) * 100).toFixed(1)) : 33.3;
    const pctB = total > 0 ? Number((100 - pctA - pctDraw).toFixed(1)) : 33.3;

    return `
      <div class="dialog-panel">
        <div class="h2h-summary-card">
          <div class="h2h-summary-grid">
            <div>
              <div class="h2h-summary-num" style="color: var(--accent);">${winsA}</div>
              <div class="h2h-summary-label">${this.escapeHtml(match.homeTeam)}</div>
            </div>
            <div>
              <div class="h2h-summary-num" style="color: #94A3B8;">${draws}</div>
              <div class="h2h-summary-label">Empates</div>
            </div>
            <div>
              <div class="h2h-summary-num" style="color: #38BDF8;">${winsB}</div>
              <div class="h2h-summary-label">${this.escapeHtml(match.awayTeam)}</div>
            </div>
          </div>

          <div class="h2h-bar-3part">
            <div class="h2h-bar-part-a" style="width: ${pctA}%" title="${winsA} victorias"></div>
            <div class="h2h-bar-part-draw" style="width: ${pctDraw}%" title="${draws} empates"></div>
            <div class="h2h-bar-part-b" style="width: ${pctB}%" title="${winsB} victorias"></div>
          </div>
        </div>

        <div class="h2h-table">
          ${sorted.map(r => `
            <div class="h2h-row">
              <span class="h2h-date tabular-nums">${this.escapeHtml(r.fecha || '')}</span>
              <span class="h2h-teams">${this.escapeHtml(r.localId)} vs ${this.escapeHtml(r.visitanteId)}</span>
              <strong class="h2h-score tabular-nums">${r.golesLocal !== null ? `${r.golesLocal} - ${r.golesVisitante}` : 'N/D'}</strong>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderStandingsHtml(match, compStandings) {
    if (compStandings.length === 0) {
      return `
        <div class="dialog-empty-panel">
          <span class="dialog-empty-icon">🏆</span>
          <strong>Tabla de posiciones no disponible</strong>
          <p>La pestaña <code>Clasificaciones</code> de Google Sheets aún no contiene la tabla de posiciones oficial para esta competición.</p>
        </div>
      `;
    }

    return `
      <div class="dialog-panel">
        <div class="table-responsive">
          <table class="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>DG</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              ${compStandings.map(s => {
                const isHomeTeam = s.equipoId === match.localId;
                const isAwayTeam = s.equipoId === match.visitanteId;
                return `
                  <tr class="${isHomeTeam || isAwayTeam ? 'highlight-team' : ''}">
                    <td class="tabular-nums">${s.posicion || '—'}</td>
                    <td class="team-col"><strong>${this.escapeHtml(s.equipoId)}</strong></td>
                    <td class="tabular-nums">${s.pj}</td>
                    <td class="tabular-nums">${s.pg}</td>
                    <td class="tabular-nums">${s.pe}</td>
                    <td class="tabular-nums">${s.pp}</td>
                    <td class="tabular-nums">${s.gf}</td>
                    <td class="tabular-nums">${s.gc}</td>
                    <td class="tabular-nums">${s.dg >= 0 ? `+${s.dg}` : s.dg}</td>
                    <td class="tabular-nums pts-col"><strong>${s.puntos}</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="dialog-note">
          <strong>Clasificación oficial:</strong> Registros sincronizados desde la pestaña <code>Clasificaciones</code> de Google Sheets.
        </div>
      </div>
    `;
  },

  renderModalContent(match) {
    const content = this.$('dialogContent');
    if (!content) return;

    const comp = COMPETITIONS.find(c => c.id === match.league) || { name: 'Competición', accentColor: '#C6FF4D' };

    // Relaciones de datos asociadas al partido
    const matchGoals = GOALS_RECORDS.filter(g => String(g.partidoId) === String(match.id));
    const matchEvents = MATCH_EVENTS_RECORDS.filter(e => String(e.partidoId) === String(match.id)).sort((a,b) => a.minuto - b.minuto);
    const matchLineups = LINEUPS_RECORDS.filter(l => String(l.partidoId) === String(match.id));
    const matchDetail = FINAL_DETAILS_RECORDS.find(d => String(d.partidoId) === String(match.id));
    const matchStats = MATCH_STATS_RECORDS.filter(s => String(s.partidoId) === String(match.id));
    const matchH2H = H2H_RECORDS.filter(r => String(r.partidoObjetivoId) === String(match.id));
    const matchRecentForm = RECENT_FORM_RECORDS.filter(r => String(r.partidoObjetivoId) === String(match.id) || r.equipoId === match.localId || r.equipoId === match.visitanteId);
    const compStandings = STANDINGS_RECORDS.filter(s => s.competicionId === match.league).sort((a,b) => (a.posicion || 99) - (b.posicion || 99));

    let tabBodyHtml = '';

    if (State.activeModalTab === 'resumen') {
      tabBodyHtml = `
        <div class="dialog-panel">
          <div class="dialog-info-grid">
            <div class="info-cell">
              <span class="cell-label">Competición</span>
              <strong style="color: ${comp.accentColor}">${this.escapeHtml(comp.name)}</strong>
            </div>
            <div class="info-cell">
              <span class="cell-label">Estadio</span>
              <strong>${this.escapeHtml(match.venue || 'Estadio oficial')}</strong>
            </div>
            <div class="info-cell">
              <span class="cell-label">Fecha y Hora (Perú)</span>
              <strong class="tabular-nums">${this.escapeHtml(match.date)} · ${this.escapeHtml(match.time)}</strong>
            </div>
            <div class="info-cell">
              <span class="cell-label">Estado</span>
              <strong>${this.escapeHtml(match.statusLabel)}</strong>
            </div>
          </div>

          ${matchDetail ? `
            <div class="detail-final-card">
              <div class="detail-row">
                <span>Marcador al descanso:</span>
                <strong class="tabular-nums">${matchDetail.descansoLocal !== null ? `${matchDetail.descansoLocal} - ${matchDetail.descansoVisitante}` : 'Dato no disponible'}</strong>
              </div>
              ${matchDetail.arbitro ? `
                <div class="detail-row">
                  <span>Árbitro principal:</span>
                  <strong>${this.escapeHtml(matchDetail.arbitro)}</strong>
                </div>
              ` : ''}
              ${matchDetail.asistenciaEstadio ? `
                <div class="detail-row">
                  <span>Asistencia confirmada:</span>
                  <strong class="tabular-nums">${matchDetail.asistenciaEstadio.toLocaleString()} espectadores</strong>
                </div>
              ` : ''}
              ${matchDetail.resumenVerificado ? `
                <div class="detail-summary-text">
                  <p>${this.escapeHtml(matchDetail.resumenVerificado)}</p>
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${this.renderBilateralScorersHtml(match, matchGoals)}
          ${this.renderBilateralTimelineHtml(match, matchEvents)}

          <div class="dialog-note">
            <strong>Fuente verificada:</strong> Registros sincronizados desde las pestañas <code>Partidos</code>, <code>Goles</code>, <code>Eventos del partido</code> y <code>Detalle final</code>. Cero datos ficticios.
          </div>
        </div>
      `;
    } else if (State.activeModalTab === 'estadisticas') {
      tabBodyHtml = this.renderComparativeStatsHtml(match, matchStats);
    } else if (State.activeModalTab === 'alineaciones') {
      tabBodyHtml = this.renderTacticalPitchHtml(match, matchLineups, matchGoals, matchEvents);
    } else if (State.activeModalTab === 'forma') {
      tabBodyHtml = this.renderRecentFormHtml(match, matchRecentForm);
    } else if (State.activeModalTab === 'h2h') {
      tabBodyHtml = this.renderH2HHtml(match, matchH2H);
    } else if (State.activeModalTab === 'clasificacion') {
      tabBodyHtml = this.renderStandingsHtml(match, compStandings);
    }

    content.innerHTML = `
      <div class="dialog-top">
        <div class="dialog-toolbar">
          <span class="dialog-kicker" style="color: ${comp.accentColor}">${this.escapeHtml(comp.name.toUpperCase())} ${match.jornada ? `· JORNADA ${match.jornada}` : ''}</span>
          <button class="dialog-close" id="dialogCloseBtn" aria-label="Cerrar ventana">✕</button>
        </div>
        <div class="dialog-teams">
          <div class="dialog-side">
            <span class="dialog-crest">
              ${match.homeCrest ? `<img src="${this.escapeHtml(match.homeCrest)}" alt="${this.escapeHtml(match.homeTeam)}" class="crest-img" onerror="this.outerHTML='⚽'"/>` : '⚽'}
            </span>
            <strong>${this.escapeHtml(match.homeTeam)}</strong>
          </div>
          <div class="dialog-center">
            <span class="dialog-vs">${match.hasScore ? `${match.homeGoals} - ${match.awayGoals}` : 'VS'}</span>
            <span class="dialog-time tabular-nums">${this.escapeHtml(match.time)}</span>
            <small>${this.escapeHtml(match.statusLabel)}</small>
          </div>
          <div class="dialog-side">
            <span class="dialog-crest">
              ${match.awayCrest ? `<img src="${this.escapeHtml(match.awayCrest)}" alt="${this.escapeHtml(match.awayTeam)}" class="crest-img" onerror="this.outerHTML='⚽'"/>` : '⚽'}
            </span>
            <strong>${this.escapeHtml(match.awayTeam)}</strong>
          </div>
        </div>

        <div class="dialog-meta-strip">
          <span>📍 <strong class="dialog-venue-text">${this.escapeHtml(match.venue || 'Estadio oficial')}</strong></span>
          ${matchDetail?.arbitro ? `<span>⚖️ <strong>${this.escapeHtml(matchDetail.arbitro)}</strong></span>` : ''}
          <span>📅 <strong class="tabular-nums">${this.escapeHtml(match.date)} · Hora Perú</strong></span>
        </div>

        <nav class="dialog-tabs" role="tablist">
          <button class="dialog-tab ${State.activeModalTab === 'resumen' ? 'active' : ''}" data-modal-tab="resumen" data-tab="resumen">Resumen</button>
          <button class="dialog-tab ${State.activeModalTab === 'estadisticas' ? 'active' : ''}" data-modal-tab="estadisticas" data-tab="estadisticas">Estadísticas</button>
          <button class="dialog-tab ${State.activeModalTab === 'alineaciones' ? 'active' : ''}" data-modal-tab="alineaciones" data-tab="alineaciones">Alineaciones</button>
          <button class="dialog-tab ${State.activeModalTab === 'forma' ? 'active' : ''}" data-modal-tab="forma" data-tab="forma">Forma Reciente</button>
          <button class="dialog-tab ${State.activeModalTab === 'h2h' ? 'active' : ''}" data-modal-tab="h2h" data-tab="h2h">Historial H2H</button>
          <button class="dialog-tab ${State.activeModalTab === 'clasificacion' ? 'active' : ''}" data-modal-tab="clasificacion" data-tab="clasificacion">Clasificación</button>
        </nav>
      </div>

      <div class="dialog-body">
        ${tabBodyHtml}
      </div>
    `;

    this.$('dialogCloseBtn')?.addEventListener('click', () => {
      this.$('matchDialog')?.close();
    });

    content.querySelectorAll('[data-modal-tab], [data-tab]').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        State.activeModalTab = tabBtn.dataset.modalTab || tabBtn.dataset.tab;
        this.renderModalContent(match);
      });
    });
  },

  // --------------------------------------------------------------------------
  // ENLACE DE EVENTOS
  // --------------------------------------------------------------------------
  bindEvents() {
    document.addEventListener('click', e => {
      // Clic en selector de período: Esta semana | Próxima semana | Ver 14 días
      const periodBtn = e.target.closest('[data-period]');
      if (periodBtn) {
        const mode = periodBtn.dataset.period;
        State.periodMode = mode;
        if (mode === 'current') {
          State.currentWeekStart = CalendarService.getCurrentMonday();
        } else if (mode === 'next') {
          State.currentWeekStart = CalendarService.getNextMonday();
        }
        State.selectedDay = 'all';
        this.render();
        return;
      }

      // Clic en toggle de vista de alineaciones (Cancha táctica vs Lista)
      const lineupViewBtn = e.target.closest('[data-lineup-view]');
      if (lineupViewBtn) {
        State.lineupViewMode = lineupViewBtn.dataset.lineupView;
        const match = FIXTURES.find(f => String(f.id) === String(State.activeModalMatchId));
        if (match) this.renderModalContent(match);
        return;
      }

      // Clic en liga desde el sidebar
      const leagueItem = e.target.closest('[data-league]');
      if (leagueItem) {
        const id = leagueItem.dataset.league;
        State.selectedLeague = State.selectedLeague === id ? 'all' : id;
        State.selectedDay = 'all';
        State.view = State.selectedLeague === 'all' ? 'partidos' : 'competicion';
        this.closeMobileMenu();
        this.render();
        this.$('gamesSection')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // Clic en tarjeta de competición desde el Hub de Inicio
      const hubCard = e.target.closest('[data-select-league]');
      if (hubCard) {
        const id = hubCard.dataset.selectLeague;
        State.selectedLeague = id;
        State.selectedDay = 'all';
        State.view = 'competicion';
        this.render();
        this.$('gamesSection')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // Clic en navegación principal
      const navItem = e.target.closest('[data-view]');
      if (navItem) {
        const targetView = navItem.dataset.view;
        State.view = targetView;
        State.selectedLeague = 'all';
        State.selectedDay = 'all';
        this.closeMobileMenu();
        this.render();
        if (targetView === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          this.$('gamesSection')?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Clic en selector de día o "Toda la semana"
      const datePill = e.target.closest('[data-day]');
      if (datePill) {
        const targetDay = datePill.dataset.day;
        if (targetDay === 'all') {
          State.selectedDay = 'all';
        } else {
          State.selectedDay = State.selectedDay === targetDay ? 'all' : targetDay;
        }
        this.render();
        return;
      }

      // Clic en filtro
      const filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        State.activeFilter = filterBtn.dataset.filter;
        this.render();
        return;
      }

      // Clic en botón de favorito (e.stopPropagation() evita que abra el modal)
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) {
        e.stopPropagation();
        const matchId = favBtn.dataset.fav;
        const isAdded = FavoritesService.toggle(matchId);
        State.favorites = FavoritesService.getFavoriteIds();
        this.render();
        this.showToast(isAdded ? 'Añadido a favoritos' : 'Eliminado de favoritos');
        return;
      }

      // Clic en detalle de partido o en toda la tarjeta del encuentro
      const card = e.target.closest('.match-card[data-match-id]');
      if (card) {
        const matchId = card.dataset.matchId;
        this.openMatchDetails(matchId);
        return;
      }

      const detailBtn = e.target.closest('[data-detail]');
      if (detailBtn) {
        const matchId = detailBtn.dataset.detail;
        this.openMatchDetails(matchId);
        return;
      }
    });

    // Botones de Sincronización
    this.$('syncButton')?.addEventListener('click', () => this.handleSync());
    this.$('syncBannerButton')?.addEventListener('click', () => this.handleSync());

    // Navegación semanal (Lunes a Domingo)
    this.$('prevWeek')?.addEventListener('click', () => {
      State.currentWeekStart = CalendarService.addDays(State.currentWeekStart, -7);
      State.selectedDay = 'all';
      this.render();
    });

    this.$('nextWeek')?.addEventListener('click', () => {
      State.currentWeekStart = CalendarService.addDays(State.currentWeekStart, 7);
      State.selectedDay = 'all';
      this.render();
    });

    this.$('todayButton')?.addEventListener('click', () => {
      State.currentWeekStart = CalendarService.getMonday();
      State.selectedDay = 'all';
      this.render();
      this.showToast('Semana actual');
    });

    // Botones del Hero
    this.$('exploreButton')?.addEventListener('click', () => {
      this.$('competitionsHub')?.scrollIntoView({ behavior: 'smooth' });
    });

    this.$('viewCalendarButton')?.addEventListener('click', () => {
      this.$('gamesSection')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Búsqueda en tiempo real
    const searchInput = this.$('searchInput');
    const searchClear = this.$('searchClearBtn');

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        State.searchQuery = e.target.value.trim().toLowerCase();
        if (searchClear) {
          searchClear.style.display = State.searchQuery ? 'block' : 'none';
        }
        this.render();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        State.searchQuery = '';
        if (searchInput) searchInput.value = '';
        searchClear.style.display = 'none';
        this.render();
      });
    }

    // Atajos de teclado
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        const dialog = this.$('matchDialog');
        if (!dialog || !dialog.open) {
          e.preventDefault();
          this.$('searchInput')?.focus();
        }
      }
      if (e.key === 'Escape') {
        const dialog = this.$('matchDialog');
        if (dialog && dialog.open) {
          dialog.close();
        } else {
          this.closeMobileMenu();
        }
      }
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.classList?.contains('match-card')) {
        const matchId = document.activeElement.dataset.matchId;
        if (matchId) {
          e.preventDefault();
          this.openMatchDetails(matchId);
        }
      }
    });

    // Tema Claro / Oscuro
    this.$('themeButton')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Menú móvil
    this.$('menuButton')?.addEventListener('click', () => {
      this.$('sidebar')?.classList.add('open');
      this.$('mobileBackdrop')?.classList.add('visible');
    });

    this.$('mobileBackdrop')?.addEventListener('click', () => {
      this.closeMobileMenu();
    });

    this.$('sidebarCloseBtn')?.addEventListener('click', () => {
      this.closeMobileMenu();
    });

    // Cerrar diálogo al hacer clic fuera
    const matchDialog = this.$('matchDialog');
    if (matchDialog) {
      matchDialog.addEventListener('click', e => {
        if (e.target === matchDialog) matchDialog.close();
      });
    }

    // Logo para volver al inicio
    this.$('brandLink')?.addEventListener('click', e => {
      e.preventDefault();
      State.view = 'inicio';
      State.selectedLeague = 'all';
      State.selectedDay = 'all';
      this.closeMobileMenu();
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  closeMobileMenu() {
    this.$('sidebar')?.classList.remove('open');
    this.$('mobileBackdrop')?.classList.remove('visible');
  }
};

// Inicialización de la aplicación
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => UI.init());
} else {
  UI.init();
}
