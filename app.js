/**
 * ============================================================================
 * MATCHWEEK — PREMIUM FOOTBALL INTELLIGENCE
 * ============================================================================
 * Arquitectura frontend moderna, modular y accesible.
 * Versión: 2.1.0 — Rediseño Premium
 * Concepto: Sports Media + Data Intelligence + Modern SaaS Dashboard
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
  version: '2.1.0',
  season: '2026/27',
  timezone: 'America/Lima', // UTC-5
  locale: 'es-PE',

  // Actualización programada semanal (Lunes a las 04:00 UTC)
  schedule: {
    updateDayIso: 1, // Lunes
    updateHourUtc: 4,
    label: 'Lunes a las 04:00 UTC'
  },

  // Endpoints preparados para la fase de conexión con API oficial
  endpoints: {
    fixtures: './api/v1/fixtures.json',
    standings: './api/v1/standings.json',
    h2h: './api/v1/h2h.json',
    teamForm: './api/v1/teams/:id/form.json',
    matchStats: './api/v1/matches/:id/stats.json',
    aiAnalysis: './api/v1/ai/match-preview.json'
  }
};

/**
 * ----------------------------------------------------------------------------
 * 2. CATÁLOGO OFICIAL DE COMPETICIONES (11)
 * ----------------------------------------------------------------------------
 * Agrupadas en la estructura requerida:
 * - GRANDES LIGAS (5)
 * - COMPETICIONES EUROPEAS (3)
 * - SUDAMÉRICA (2)
 * - PERÚ (1)
 */
const CATEGORIES = [
  {
    id: 'grandes-ligas',
    name: 'GRANDES LIGAS',
    subtitle: 'Las 5 ligas de élite europea',
    shortName: 'Ligas'
  },
  {
    id: 'europeas',
    name: 'COMPETICIONES EUROPEAS',
    subtitle: 'Torneos continentales UEFA',
    shortName: 'UEFA'
  },
  {
    id: 'sudamerica',
    name: 'SUDAMÉRICA',
    subtitle: 'Torneos continentales CONMEBOL',
    shortName: 'CONMEBOL'
  },
  {
    id: 'peru',
    name: 'PERÚ',
    subtitle: 'Fútbol profesional peruano',
    shortName: 'Perú'
  }
];

const COMPETITIONS = [
  // --- GRANDES LIGAS ---
  {
    id: 'premier-league',
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
    name: 'LaLiga',
    country: 'España',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'LL',
    accentColor: '#FF4B4B',
    badgeBg: 'rgba(255, 75, 75, 0.14)',
    flag: '🇪🇸',
    founded: '1929',
    description: 'Campeonato nacional de liga de primera división del fútbol de España.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9"/><path d="M12 12l5-5"/></svg>`
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    country: 'Italia',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'SA',
    accentColor: '#0098FF',
    badgeBg: 'rgba(0, 152, 255, 0.14)',
    flag: '🇮🇹',
    founded: '1898',
    description: 'Máxima competición de clubes del fútbol italiano, cuna del scudetto.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"/><path d="M12 8v8m-3-3l3 3 3-3"/></svg>`
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Alemania',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'BL',
    accentColor: '#E52424',
    badgeBg: 'rgba(229, 36, 36, 0.14)',
    flag: '🇩🇪',
    founded: '1963',
    description: 'Competición de fútbol de élite en Alemania con los estadios más vibrantes.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 16l4-8 2 4 4-4"/></svg>`
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    country: 'Francia',
    category: 'grandes-ligas',
    categoryName: 'Grandes Ligas',
    shortCode: 'L1',
    accentColor: '#0EE096',
    badgeBg: 'rgba(14, 224, 150, 0.14)',
    flag: '🇫🇷',
    founded: '1932',
    description: 'Primera división del fútbol francés, hogar de grandes talentos mundiales.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/><circle cx="12" cy="12" r="3"/></svg>`
  },

  // --- COMPETICIONES EUROPEAS ---
  {
    id: 'champions-league',
    name: 'UEFA Champions League',
    country: 'Europa',
    category: 'europeas',
    categoryName: 'Competiciones Europeas',
    shortCode: 'UCL',
    accentColor: '#5B8DEF',
    badgeBg: 'rgba(91, 141, 239, 0.14)',
    flag: '🇪🇺',
    founded: '1955',
    description: 'El torneo continental de clubes más codiciado y prestigioso del fútbol mundial.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 16.1l-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z"/></svg>`
  },
  {
    id: 'europa-league',
    name: 'UEFA Europa League',
    country: 'Europa',
    category: 'europeas',
    categoryName: 'Competiciones Europeas',
    shortCode: 'UEL',
    accentColor: '#F68E28',
    badgeBg: 'rgba(246, 142, 40, 0.14)',
    flag: '🇪🇺',
    founded: '1971',
    description: 'Segunda competición europea de clubes, caracterizada por su intensidad y paridad.',
    emblemSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v4H6z"/><path d="M7 7v4c0 3.5 2.5 6 5 6s5-2.5 5-6V7"/><path d="M12 17v4m-3 0h6"/></svg>`
  },
  {
    id: 'conference-league',
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
 * 3. ALMACÉN DE DATOS REALES (ESTRICTAMENTE CERO DATOS FICTICIOS)
 * ----------------------------------------------------------------------------
 */
const FIXTURES = [];
const TEAMS = {};
const H2H = {};
const STANDINGS = {};

/**
 * ----------------------------------------------------------------------------
 * 4. SERVICIOS PREPARADOS PARA FUTURAS INTEGRACIONES
 * ----------------------------------------------------------------------------
 */
const RealScoresService = {
  async fetchLive() { return []; },
  async fetchByRange(startIso, endIso) { return []; }
};

const PerformanceStatsService = {
  async getMatchMetrics(matchId) { return null; },
  async getTeamSeasonMetrics(teamId) { return null; }
};

const TeamFormService = {
  async getLastFiveMatches(teamId) { return null; }
};

const HeadToHeadService = {
  async getLastFiveH2H(teamA, teamB) { return null; }
};

const StandingsService = {
  async getTable(leagueId) { return null; }
};

const AiIntelligenceService = {
  async generateTacticalPreview(matchId) { return null; }
};

/**
 * ----------------------------------------------------------------------------
 * 5. SERVICIO DE CALENDARIO (LUNES A DOMINGO)
 * ----------------------------------------------------------------------------
 */
const CalendarService = {
  pad(n) {
    return String(n).padStart(2, '0');
  },

  toIso(d) {
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}`;
  },

  getMonday(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const day = d.getDay(); // 0 = Domingo, 1 = Lunes
    const diff = (day + 6) % 7;
    d.setDate(d.getDate() - diff);
    return d;
  },

  addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  },

  getWeekEnd(mondayDate) {
    return this.addDays(mondayDate, 6);
  },

  getDaysOfWeek(mondayDate) {
    return Array.from({ length: 7 }, (_, i) => this.addDays(mondayDate, i));
  },

  isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  },

  isToday(date) {
    return this.isSameDay(date, new Date());
  },

  isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Domingo o Sábado
  },

  format(date, options) {
    return new Intl.DateTimeFormat(MatchweekConfig.locale, options).format(date);
  }
};

/**
 * ----------------------------------------------------------------------------
 * 6. SERVICIO DE FAVORITOS (LOCALSTORAGE)
 * ----------------------------------------------------------------------------
 */
const FavoritesService = {
  storageKey: 'matchweek-favorites-v2',

  getFavoriteIds() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr.filter(Number.isInteger) : []);
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
    const set = this.getFavoriteIds();
    const exists = set.has(matchId);
    if (exists) set.delete(matchId);
    else set.add(matchId);
    this.save(set);
    return !exists;
  },

  has(matchId) {
    return this.getFavoriteIds().has(matchId);
  },

  count() {
    return this.getFavoriteIds().size;
  }
};

/**
 * ----------------------------------------------------------------------------
 * 7. ESTADO DE LA APLICACIÓN
 * ----------------------------------------------------------------------------
 */
const State = {
  view: 'inicio',            // 'inicio' | 'partidos' | 'favoritos' | 'competicion'
  selectedLeague: 'all',     // 'all' o ID de competición
  currentWeekStart: CalendarService.getMonday(new Date()),
  selectedDay: 'all',        // 'all' o YYYY-MM-DD
  activeFilter: 'all',       // 'all' | 'featured' | 'upcoming' | 'finished'
  searchQuery: '',
  favorites: FavoritesService.getFavoriteIds(),
  activeStatsTab: 'overview' // 'overview' | 'form' | 'h2h' | 'metrics' | 'ai'
};

/**
 * ----------------------------------------------------------------------------
 * 8. CONTROLADOR DE INTERFAZ DE USUARIO
 * ----------------------------------------------------------------------------
 */
const UI = {
  $: id => document.getElementById(id),

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  init() {
    this.initTheme();
    this.updateCurrentDateDisplay();
    this.bindEvents();
    this.render();
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
      const now = new Date();
      dateEl.textContent = CalendarService.format(now, {
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
    this.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  },

  getFixturesForWeek() {
    const startIso = CalendarService.toIso(State.currentWeekStart);
    const endIso = CalendarService.toIso(CalendarService.getWeekEnd(State.currentWeekStart));
    return FIXTURES.filter(f => f.date >= startIso && f.date <= endIso);
  },

  getVisibleFixtures() {
    const week = this.getFixturesForWeek();
    return week.filter(f => {
      if (State.selectedLeague !== 'all' && f.league !== State.selectedLeague) return false;
      if (State.selectedDay !== 'all' && f.date !== State.selectedDay) return false;
      if (State.view === 'favoritos' && !State.favorites.has(f.id)) return false;
      if (State.activeFilter === 'featured' && !f.featured) return false;
      if (State.activeFilter === 'upcoming' && f.status !== 'upcoming') return false;
      if (State.activeFilter === 'finished' && f.status !== 'finished') return false;

      if (State.searchQuery) {
        const comp = COMPETITIONS.find(c => c.id === f.league);
        const text = `${f.home || ''} ${f.away || ''} ${comp ? comp.name : ''}`.toLowerCase();
        if (!text.includes(State.searchQuery)) return false;
      }
      return true;
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
  // RENDERIZADO GLOBAL
  // --------------------------------------------------------------------------
  render() {
    this.renderHeader();
    this.renderSidebar();
    this.renderHeroAndOverview();
    this.renderCompetitionsHub();
    this.renderCompetitionBanner();
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
    // 1. Grupo PRINCIPAL
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

    // 2. Grupos de Competiciones
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

    // Métricas del overview
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
            ${comps.map(comp => `
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
                    <span>Temporada ${MatchweekConfig.season}</span>
                  </div>
                </div>
                <span class="hub-card-arrow">↗</span>
              </div>
            `).join('')}
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
              <span class="comp-tag">0 partidos registrados</span>
              <span class="comp-tag">Feed oficial en espera</span>
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

    const btnAll = this.$('btnBannerShowAll');
    if (btnAll) {
      btnAll.addEventListener('click', () => {
        State.selectedLeague = 'all';
        State.view = 'partidos';
        this.render();
      });
    }
  },

  renderWeekControls() {
    const weekLabel = this.$('weekLabel');
    if (weekLabel) {
      const start = State.currentWeekStart;
      const end = CalendarService.getWeekEnd(start);
      weekLabel.textContent = `${CalendarService.format(start, { day: 'numeric', month: 'short' })} – ${CalendarService.format(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
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
        gamesKicker.textContent = 'AGENDA COMPLETA';
        gamesHeading.innerHTML = 'Todos los partidos<span class="accent">.</span>';
      } else {
        gamesKicker.textContent = 'AGENDA SEMANAL / 2026—27';
        gamesHeading.innerHTML = 'Próximos encuentros<span class="accent">.</span>';
      }
    }

    const gameCount = this.$('gameCount');
    if (gameCount) {
      const count = this.getVisibleFixtures().length;
      gameCount.textContent = `${count} ${count === 1 ? 'encuentro' : 'encuentros'}`;
    }
  },

  renderDateStrip() {
    const strip = this.$('dateStrip');
    if (!strip) return;

    const days = CalendarService.getDaysOfWeek(State.currentWeekStart);

    strip.innerHTML = days.map(d => {
      const s = CalendarService.toIso(d);
      const isSelected = State.selectedDay === s;
      const isToday = CalendarService.isToday(d);
      const isWeekend = CalendarService.isWeekend(d);
      const dayName = CalendarService.format(d, { weekday: 'short' }).replace('.', '').toUpperCase();
      const dayNumber = d.getDate();

      return `
        <button
          class="date-pill ${isSelected ? 'active' : ''} ${isToday ? 'is-today' : ''} ${isWeekend ? 'is-weekend' : ''}"
          data-day="${s}"
          aria-pressed="${isSelected}"
          title="${CalendarService.format(d, { weekday: 'long', day: 'numeric', month: 'long' })}">
          <span class="day-name">${dayName}</span>
          <span class="day-number tabular-nums">${dayNumber}</span>
          <span class="day-indicator"></span>
        </button>
      `;
    }).join('');
  },

  renderFilterButtons() {
    document.querySelectorAll('.filter').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === State.activeFilter);
    });
  },

  renderMatchList() {
    const list = this.$('matchList');
    if (!list) return;

    // Búsqueda activa
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
            <p class="empty-state-desc">No se encontraron encuentros ni competiciones con ese criterio. Prueba buscando por Premier League, LaLiga, Serie A, Champions League, Liga 1 o Copa Libertadores.</p>
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
            <div class="empty-state-actions">
              <button class="btn-action secondary" id="btnResetSearch">Limpiar búsqueda</button>
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
    }

    const matches = this.getVisibleFixtures();

    if (matches.length > 0) {
      list.innerHTML = this.renderMatchGroups(matches);
      return;
    }

    // ========================================================================
    // ESTADOS VACÍOS PREMIUM (REQUISITO FUNDAMENTAL)
    // ========================================================================

    // CASO A: Usuario selecciona una competición específica (ej: Premier League)
    if (State.selectedLeague !== 'all') {
      const comp = COMPETITIONS.find(c => c.id === State.selectedLeague) || {
        name: 'Competición',
        country: '',
        categoryName: '',
        accentColor: '#C6FF4D',
        badgeBg: 'rgba(198, 255, 77, 0.14)',
        emblemSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>`
      };

      list.innerHTML = `
        <div class="empty-state competition-empty-state">
          <div class="empty-state-badge" style="--badge-bg: ${comp.badgeBg}; --badge-color: ${comp.accentColor}">
            ${comp.emblemSvg}
          </div>
          <span class="empty-state-country">${this.escapeHtml(comp.categoryName)} · ${this.escapeHtml(comp.country)}</span>
          <h3 class="empty-state-title">${this.escapeHtml(comp.name)}</h3>
          <strong class="empty-state-headline">No hay partidos disponibles por el momento.</strong>
          <p class="empty-state-desc">Los encuentros aparecerán aquí cuando se habilite la actualización de datos.</p>
          <div class="empty-state-details">
            <span class="empty-detail-pill">Temporada ${MatchweekConfig.season}</span>
            <span class="empty-detail-pill">0 partidos registrados</span>
            <span class="empty-detail-pill">Feed oficial en espera</span>
          </div>
          <div class="empty-state-actions">
            <button class="btn-action secondary" id="btnEmptyShowAll">Ver todas las competiciones</button>
            <button class="btn-action primary" id="btnEmptyGoHome">Volver al inicio</button>
          </div>
        </div>
      `;

      this.$('btnEmptyShowAll')?.addEventListener('click', () => {
        State.selectedLeague = 'all';
        State.view = 'partidos';
        this.render();
        this.$('gamesSection')?.scrollIntoView({ behavior: 'smooth' });
      });

      this.$('btnEmptyGoHome')?.addEventListener('click', () => {
        State.selectedLeague = 'all';
        State.view = 'inicio';
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    // CASO B: Vista de Favoritos
    if (State.view === 'favoritos') {
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
          <p class="empty-state-desc">Cuando se habilite la actualización de datos oficiales, podrás hacer clic en el corazón de cualquier partido para agregarlo a tu lista de seguimiento personal.</p>
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

    // CASO C: Vista general de partidos o inicio (0 partidos en la agenda)
    list.innerHTML = `
      <div class="empty-state general-empty-state">
        <div class="empty-state-art">
          <svg viewBox="0 0 100 60" class="empty-vector" aria-hidden="true">
            <!-- Pitch lines vector -->
            <rect x="5" y="5" width="90" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
            <line x1="50" y1="5" x2="50" y2="55" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <circle cx="50" cy="30" r="12" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
            <circle cx="50" cy="30" r="2.5" fill="var(--accent)"/>
            <rect x="5" y="16" width="16" height="28" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.25"/>
            <rect x="79" y="16" width="16" height="28" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.25"/>
          </svg>
        </div>
        <span class="empty-badge">AGENDA OFICIAL</span>
        <h3 class="empty-state-title">Calendario semanal</h3>
        <strong class="empty-state-headline">No hay partidos disponibles por el momento.</strong>
        <p class="empty-state-desc">Los encuentros de esta semana aparecerán aquí cuando se habilite la actualización de datos.</p>
        <div class="empty-state-details">
          <span class="empty-detail-pill">11 competiciones configuradas</span>
          <span class="empty-detail-pill">Ciclo de actualización cada lunes</span>
          <span class="empty-detail-pill">Cero partidos simulados</span>
        </div>
        <div class="empty-state-actions">
          <button class="btn-action primary" id="btnGeneralExplore">Explorar competiciones disponibles</button>
        </div>
      </div>
    `;

    this.$('btnGeneralExplore')?.addEventListener('click', () => {
      State.view = 'inicio';
      this.render();
      this.$('competitionsHub')?.scrollIntoView({ behavior: 'smooth' });
    });
  },

  renderMatchGroups(matches) {
    const groups = matches.reduce((acc, m) => {
      (acc[m.date] = acc[m.date] || []).push(m);
      return acc;
    }, {});

    return Object.keys(groups).sort().map(dateStr => {
      const dateObj = new Date(dateStr + 'T12:00:00');
      const dateTitle = CalendarService.format(dateObj, { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
      const dayMatches = groups[dateStr];

      return `
        <div class="day-group">
          <div class="day-heading">
            <span class="day-heading-title">${dateTitle}</span>
            <span class="day-heading-line"></span>
            <span class="day-heading-count tabular-nums">${dayMatches.length} ${dayMatches.length === 1 ? 'PARTIDO' : 'PARTIDOS'}</span>
          </div>
          ${dayMatches.map(m => this.renderMatchCard(m)).join('')}
        </div>
      `;
    }).join('');
  },

  renderMatchCard(m) {
    const comp = COMPETITIONS.find(c => c.id === m.league) || { name: 'Fútbol', accentColor: '#C6FF4D' };
    const isFav = State.favorites.has(m.id);

    return `
      <article class="match-card" data-match-id="${m.id}">
        <div class="match-meta">
          <span class="competition" style="color: ${comp.accentColor}">${this.escapeHtml(comp.name)}</span>
          <small class="tabular-nums">Hora Perú (UTC−5)</small>
        </div>
        <div class="teams">
          <div class="team">
            <span class="team-crest">${m.homeCrest || '⚽'}</span>
            <span class="team-name">${this.escapeHtml(m.homeTeam || 'Local')}</span>
          </div>
          <div class="score-box">
            <strong class="tabular-nums">${this.escapeHtml(m.time || 'TBD')}</strong>
            <small>${m.status === 'finished' ? 'FINALIZADO' : 'POR JUGAR'}</small>
          </div>
          <div class="team right">
            <span class="team-crest">${m.awayCrest || '⚽'}</span>
            <span class="team-name">${this.escapeHtml(m.awayTeam || 'Visitante')}</span>
          </div>
        </div>
        <div class="match-action">
          <button class="fav-button ${isFav ? 'saved' : ''}" data-fav="${m.id}" aria-label="Favorito">
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
  // PANEL / DIÁLOGO DE ANÁLISIS DE PARTIDO (PREPARADO PARA DATOS REALES)
  // --------------------------------------------------------------------------
  openMatchDetails(matchId) {
    const match = FIXTURES.find(f => f.id === matchId);
    const dialog = this.$('matchDialog');
    const content = this.$('dialogContent');
    if (!dialog || !content) return;

    if (!match) {
      content.innerHTML = `
        <div class="dialog-top">
          <div class="dialog-toolbar">
            <span class="dialog-kicker">FICHA DE ANÁLISIS</span>
            <button class="dialog-close" id="dialogCloseBtn" aria-label="Cerrar ventana">✕</button>
          </div>
          <h3 class="dialog-heading">Ficha técnica no disponible</h3>
          <p class="dialog-sub">No hay un partido seleccionado o no se encontraron registros deportivos oficiales.</p>
        </div>
        <div class="dialog-body">
          <div class="dialog-empty-panel">
            <p>La información detallada se habilitará una vez iniciada la conexión con la fuente oficial de datos.</p>
          </div>
        </div>
      `;
      dialog.showModal();
      this.$('dialogCloseBtn')?.addEventListener('click', () => dialog.close());
      return;
    }

    const comp = COMPETITIONS.find(c => c.id === match.league);

    content.innerHTML = `
      <div class="dialog-top">
        <div class="dialog-toolbar">
          <span class="dialog-kicker">${comp ? comp.name.toUpperCase() : 'COMPETICIÓN'}</span>
          <button class="dialog-close" id="dialogCloseBtn" aria-label="Cerrar">✕</button>
        </div>
        <div class="dialog-teams">
          <div class="dialog-side">
            <span class="dialog-crest">${match.homeCrest || '⚽'}</span>
            <strong>${this.escapeHtml(match.homeTeam)}</strong>
          </div>
          <div class="dialog-center">
            <span class="dialog-vs">VS</span>
            <span class="dialog-time tabular-nums">${match.time || 'TBD'}</span>
            <small>HORA PERÚ</small>
          </div>
          <div class="dialog-side">
            <span class="dialog-crest">${match.awayCrest || '⚽'}</span>
            <strong>${this.escapeHtml(match.awayTeam)}</strong>
          </div>
        </div>

        <nav class="dialog-tabs" role="tablist">
          <button class="dialog-tab active" data-tab="overview">Resumen</button>
          <button class="dialog-tab" data-tab="form">Forma Reciente</button>
          <button class="dialog-tab" data-tab="h2h">Historial H2H</button>
          <button class="dialog-tab" data-tab="metrics">Estadísticas</button>
          <button class="dialog-tab" data-tab="ai">Análisis IA</button>
        </nav>
      </div>

      <div class="dialog-body">
        <div class="dialog-note">
          <strong>Sincronización oficial:</strong> Los datos históricos, comparativa de goles y análisis táctico se calcularán automáticamente tras habilitar el feed en tiempo real. Cero datos simulados.
        </div>
      </div>
    `;

    dialog.showModal();
    this.$('dialogCloseBtn')?.addEventListener('click', () => dialog.close());
  },

  // --------------------------------------------------------------------------
  // ENLACE DE EVENTOS
  // --------------------------------------------------------------------------
  bindEvents() {
    // 1. Delegación de eventos en el documento
    document.addEventListener('click', e => {
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

      // Clic en píldora de día
      const datePill = e.target.closest('[data-day]');
      if (datePill) {
        const targetDay = datePill.dataset.day;
        State.selectedDay = State.selectedDay === targetDay ? 'all' : targetDay;
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

      // Clic en detalle de partido
      const detailBtn = e.target.closest('[data-detail]');
      if (detailBtn) {
        const matchId = Number(detailBtn.dataset.detail);
        this.openMatchDetails(matchId);
        return;
      }

      // Clic en botón de favorito
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) {
        const matchId = Number(favBtn.dataset.fav);
        const isAdded = FavoritesService.toggle(matchId);
        State.favorites = FavoritesService.getFavoriteIds();
        this.render();
        this.showToast(isAdded ? 'Añadido a favoritos' : 'Eliminado de favoritos');
        return;
      }
    });

    // 2. Navegación semanal
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
      State.currentWeekStart = CalendarService.getMonday(new Date());
      State.selectedDay = 'all';
      this.render();
      this.showToast('Semana actual');
    });

    // 3. Botones del Hero
    this.$('exploreButton')?.addEventListener('click', () => {
      this.$('competitionsHub')?.scrollIntoView({ behavior: 'smooth' });
    });

    this.$('viewCalendarButton')?.addEventListener('click', () => {
      this.$('gamesSection')?.scrollIntoView({ behavior: 'smooth' });
    });

    // 4. Búsqueda en tiempo real
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

    // Atajo de teclado '/' para enfocar buscador
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
    });

    // 5. Cambio de tema Claro / Oscuro
    this.$('themeButton')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // 6. Menú móvil
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

    // 7. Clic fuera del diálogo modal
    const matchDialog = this.$('matchDialog');
    if (matchDialog) {
      matchDialog.addEventListener('click', e => {
        if (e.target === matchDialog) matchDialog.close();
      });
    }

    // 8. Logotipo para volver al Inicio
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

// Inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => UI.init());
} else {
  UI.init();
}
