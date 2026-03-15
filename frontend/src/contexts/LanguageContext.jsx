import { createContext, useContext, useState, useEffect } from 'react'

// Supported languages with flags and native names
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', native: 'Polski' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪', native: 'Svenska' },
  { code: 'da', name: 'Danish', flag: '🇩🇰', native: 'Dansk' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', native: 'Italiano' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', native: 'Nederlands' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿', native: 'Čeština' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
]

// Translation dictionaries
const TRANSLATIONS = {
  en: {
    // Navigation
    home: 'Home',
    beers: 'Beers',
    beerFinder: 'Beer Finder',
    rateBeer: 'Rate Beer',
    safety: 'Drink n Drive',
    signIn: 'Sign In',
    
    // Common
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    
    // Beer terms
    beer: 'Beer',
    brewery: 'Brewery',
    style: 'Style',
    abv: 'ABV',
    ibu: 'IBU',
    rating: 'Rating',
    reviews: 'Reviews',
    
    // Safety
    drinkResponsibly: 'Drink Responsibly',
    neverDrinkAndDrive: 'Never Drink and Drive',
    safetyFirst: 'Safety First',
    
    // Home page
    appTagline: 'Your companion for beer discovery and responsible enjoyment',
    discoverBeers: 'Discover beers by style, ABV, or ingredients',
    quickFunRating: 'Quick & fun rating - see top beers in your country',
    safetyTools: 'Drink responsibly with our safety tools',
    startSearching: 'Start Searching',
    rateNow: 'Rate Now',
    checkSafety: 'Check Safety',
    beersStat: 'Beers',
    avgRating: 'Avg Rating',
    safeDrinking: 'Safe Drinking',
    
    // Common beer terms
    style: 'Style',
    abv: 'ABV',
    ibu: 'IBU',
    ingredients: 'Ingredients',
    country: 'Country',
    brewery: 'Brewery',
    byNameStyleBrewery: 'by name, style, or brewery',
    
    // Actions
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    apply: 'Apply',
    loadMore: 'Load More',
    viewDetails: 'View Details',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    random: 'Random',
    quickFilters: 'Quick Filters',
    brewingStyle: 'Brewing Style',
    alcoholLevel: 'Alcohol Level',
    bitterness: 'Bitterness',
    color: 'Color',
    tasteProfile: 'Taste Profile',
    allColors: 'All Colors',
    paleYellow: 'Pale/Yellow',
    amberCopper: 'Amber/Copper',
    brownDark: 'Brown/Dark',
    blackStout: 'Black/Stout',
    allTastes: 'All Tastes',
    hoppyBitter: 'Hoppy/Bitter',
    maltySweet: 'Malty/Sweet',
    fruityCitrus: 'Fruity/Citrus',
    roastyChocolate: 'Roasty/Chocolate',
    sourTart: 'Sour/Tart',
    sortBy: 'Sort By',
    name: 'Name',
    abvHighToLow: 'ABV (High to Low)',
    abvLowToHigh: 'ABV (Low to High)',
    ibuHighToLow: 'IBU (High to Low)',
    ibuLowToHigh: 'IBU (Low to High)',
    applyFilters: 'Apply Filters',
    found: 'Found',
    noBeersFound: 'No beers found',
    tryDifferentFilters: 'Try adjusting your search or filters',
    clearAll: 'Clear All',
    min: 'Min',
    max: 'Max',
    lightBeers: 'Light Beers',
    strongBeers: 'Strong Beers',
    hoppyIPAs: 'Hoppy IPAs',
    sessionBeers: 'Session Beers',
    
    // Ratings
    yourRating: 'Your Rating',
    overallRating: 'Overall Rating',
    rateThisBeer: 'Rate this Beer',
    submitRating: 'Submit Rating',
    ratingSubmitted: 'Rating Submitted!',
    
    // Safety page
    bloodAlcoholContent: 'Blood Alcohol Content',
    timeToSober: 'Time to Sober',
    safeToDrive: 'Safe to Drive',
    notSafeToDrive: 'Not Safe to Drive',
    calculate: 'Calculate',
    reset: 'Reset',
    weight: 'Weight',
    gender: 'Gender',
    drinks: 'Drinks',
    hours: 'Hours',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    
    // Errors & messages
    errorLoading: 'Error loading data',
    noResults: 'No results found',
    tryAgain: 'Try Again',
    connectionError: 'Connection Error',
    offlineMessage: 'You appear to be offline',
    
    // Months (for dates)
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
  de: {
    // Navigation
    home: 'Startseite',
    beers: 'Biere',
    beerFinder: 'Bierfinder',
    rateBeer: 'Bier bewerten',
    safety: 'Alkohol am Steuer',
    signIn: 'Anmelden',
    
    // Common
    loading: 'Lädt...',
    submit: 'Absenden',
    cancel: 'Abbrechen',
    save: 'Speichern',
    delete: 'Löschen',
    search: 'Suchen',
    filter: 'Filtern',
    sort: 'Sortieren',
    
    // Beer terms
    beer: 'Bier',
    brewery: 'Brauerei',
    style: 'Stil',
    abv: 'Alkoholgehalt',
    ibu: 'Bitterkeit',
    rating: 'Bewertung',
    reviews: 'Bewertungen',
    
    // Safety
    drinkResponsibly: 'Verantwortungsvoll trinken',
    neverDrinkAndDrive: 'Nie betrunken fahren',
    safetyFirst: 'Sicherheit zuerst',
    
    // Home page
    appTagline: 'Dein Begleiter für Bierentdeckung und verantwortungsvollen Genuss',
    discoverBeers: 'Entdecke Biere nach Stil, Alkoholgehalt oder Zutaten',
    quickFunRating: 'Schnelle & spaßige Bewertung - siehe Top-Biere in deinem Land',
    safetyTools: 'Trinke verantwortungsvoll mit unseren Sicherheitswerkzeugen',
    startSearching: 'Suche starten',
    rateNow: 'Jetzt bewerten',
    checkSafety: 'Sicherheit prüfen',
    beersStat: 'Biere',
    avgRating: 'Durchschn. Bewertung',
    safeDrinking: 'Sicherer Genuss',
    
    // Common beer terms
    style: 'Stil',
    abv: 'Alkoholgehalt',
    ibu: 'Bitterkeit',
    ingredients: 'Zutaten',
    country: 'Land',
    brewery: 'Brauerei',
    byNameStyleBrewery: 'nach Name, Stil oder Brauerei',
    
    // Actions
    search: 'Suchen',
    filter: 'Filtern',
    clear: 'Löschen',
    apply: 'Anwenden',
    loadMore: 'Mehr laden',
    viewDetails: 'Details anzeigen',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    random: 'Zufällig',
    quickFilters: 'Schnellfilter',
    brewingStyle: 'Braustil',
    alcoholLevel: 'Alkoholgehalt',
    bitterness: 'Bitterkeit',
    color: 'Farbe',
    tasteProfile: 'Geschmacksprofil',
    allColors: 'Alle Farben',
    paleYellow: 'Blass/Gelb',
    amberCopper: 'Bernstein/Kupfer',
    brownDark: 'Braun/Dunkel',
    blackStout: 'Schwarz/Stout',
    allTastes: 'Alle Geschmäcker',
    hoppyBitter: 'Hopfig/Bitter',
    maltySweet: 'Malzig/Süß',
    fruityCitrus: 'Fruchtig/Zitrus',
    roastyChocolate: 'Röstig/Schokolade',
    sourTart: 'Sauer/Herb',
    sortBy: 'Sortieren nach',
    name: 'Name',
    abvHighToLow: 'Alkohol (Hoch zu Niedrig)',
    abvLowToHigh: 'Alkohol (Niedrig zu Hoch)',
    ibuHighToLow: 'Bitterkeit (Hoch zu Niedrig)',
    ibuLowToHigh: 'Bitterkeit (Niedrig zu Hoch)',
    applyFilters: 'Filter anwenden',
    found: 'Gefunden',
    noBeersFound: 'Keine Biere gefunden',
    tryDifferentFilters: 'Versuche deine Suche oder Filter anzupassen',
    clearAll: 'Alles löschen',
    min: 'Min',
    max: 'Max',
    lightBeers: 'Leichte Biere',
    strongBeers: 'Starke Biere',
    hoppyIPAs: 'Hopfige IPAs',
    sessionBeers: 'Session-Biere',
    
    // Ratings
    yourRating: 'Deine Bewertung',
    overallRating: 'Gesamtbewertung',
    rateThisBeer: 'Dieses Bier bewerten',
    submitRating: 'Bewertung absenden',
    ratingSubmitted: 'Bewertung abgesendet!',
    
    // Safety page
    bloodAlcoholContent: 'Blutalkoholgehalt',
    timeToSober: 'Zeit bis nüchtern',
    safeToDrive: 'Fahrtauglich',
    notSafeToDrive: 'Nicht fahrtauglich',
    calculate: 'Berechnen',
    reset: 'Zurücksetzen',
    weight: 'Gewicht',
    gender: 'Geschlecht',
    drinks: 'Getränke',
    hours: 'Stunden',
    male: 'Männlich',
    female: 'Weiblich',
    other: 'Andere',
    
    // Errors & messages
    errorLoading: 'Fehler beim Laden der Daten',
    noResults: 'Keine Ergebnisse gefunden',
    tryAgain: 'Erneut versuchen',
    connectionError: 'Verbindungsfehler',
    offlineMessage: 'Du scheinst offline zu sein',
    
    // Months (for dates)
    january: 'Januar',
    february: 'Februar',
    march: 'März',
    april: 'April',
    may: 'Mai',
    june: 'Juni',
    july: 'Juli',
    august: 'August',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'Dezember',
  },
  es: {
    // Navigation
    home: 'Inicio',
    beers: 'Cervezas',
    beerFinder: 'Buscador de Cervezas',
    rateBeer: 'Calificar Cerveza',
    safety: 'Beber y Conducir',
    signIn: 'Iniciar Sesión',
    
    // Common
    loading: 'Cargando...',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    
    // Beer terms
    beer: 'Cerveza',
    brewery: 'Cervecería',
    style: 'Estilo',
    abv: 'Alcohol',
    ibu: 'Amargor',
    rating: 'Calificación',
    reviews: 'Reseñas',
    
    // Safety
    drinkResponsibly: 'Beber con responsabilidad',
    neverDrinkAndDrive: 'Nunca beber y conducir',
    safetyFirst: 'Seguridad primero',
    
    // Home page
    appTagline: 'Tu compañero para descubrir cervezas y disfrutar responsablemente',
    discoverBeers: 'Descubre cervezas por estilo, alcohol o ingredientes',
    quickFunRating: 'Calificación rápida y divertida - ve las mejores cervezas en tu país',
    safetyTools: 'Bebe responsablemente con nuestras herramientas de seguridad',
    startSearching: 'Comenzar búsqueda',
    rateNow: 'Calificar ahora',
    checkSafety: 'Verificar seguridad',
    beersStat: 'Cervezas',
    avgRating: 'Calificación promedio',
    safeDrinking: 'Consumo seguro',
    
    // Common beer terms
    style: 'Estilo',
    abv: 'Alcohol',
    ibu: 'Amargor',
    ingredients: 'Ingredientes',
    country: 'País',
    brewery: 'Cervecería',
    
    // Actions
    search: 'Buscar',
    filter: 'Filtrar',
    clear: 'Limpiar',
    apply: 'Aplicar',
    loadMore: 'Cargar más',
    viewDetails: 'Ver detalles',
    addToFavorites: 'Añadir a favoritos',
    removeFromFavorites: 'Eliminar de favoritos',
    
    // Ratings
    yourRating: 'Tu calificación',
    overallRating: 'Calificación general',
    rateThisBeer: 'Calificar esta cerveza',
    submitRating: 'Enviar calificación',
    ratingSubmitted: '¡Calificación enviada!',
    
    // Safety page
    bloodAlcoholContent: 'Contenido de alcohol en sangre',
    timeToSober: 'Tiempo para sobriedad',
    safeToDrive: 'Apto para conducir',
    notSafeToDrive: 'No apto para conducir',
    calculate: 'Calcular',
    reset: 'Reiniciar',
    weight: 'Peso',
    gender: 'Género',
    drinks: 'Bebidas',
    hours: 'Horas',
    male: 'Masculino',
    female: 'Femenino',
    other: 'Otro',
    
    // Errors & messages
    errorLoading: 'Error al cargar datos',
    noResults: 'No se encontraron resultados',
    tryAgain: 'Intentar de nuevo',
    connectionError: 'Error de conexión',
    offlineMessage: 'Parece que estás desconectado',
    
    // Months (for dates)
    january: 'Enero',
    february: 'Febrero',
    march: 'Marzo',
    april: 'Abril',
    may: 'Mayo',
    june: 'Junio',
    july: 'Julio',
    august: 'Agosto',
    september: 'Septiembre',
    october: 'Octubre',
    november: 'Noviembre',
    december: 'Diciembre',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    beers: 'Bières',
    beerFinder: 'Chercheur de Bière',
    rateBeer: 'Noter la Bière',
    safety: 'Boire et Conduire',
    signIn: 'Se Connecter',
    
    // Common
    loading: 'Chargement...',
    submit: 'Soumettre',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    
    // Beer terms
    beer: 'Bière',
    brewery: 'Brasserie',
    style: 'Style',
    abv: 'Alcool',
    ibu: 'Amertume',
    rating: 'Note',
    reviews: 'Avis',
    
    // Safety
    drinkResponsibly: 'Boire avec modération',
    neverDrinkAndDrive: 'Ne jamais boire et conduire',
    safetyFirst: 'Sécurité d\'abord',
    
    // Home page
    appTagline: 'Votre compagnon pour découvrir des bières et profiter responsablement',
    discoverBeers: 'Découvrez des bières par style, alcool ou ingrédients',
    quickFunRating: 'Évaluation rapide et amusante - voir les meilleures bières de votre pays',
    safetyTools: 'Buvez responsablement avec nos outils de sécurité',
    startSearching: 'Commencer la recherche',
    rateNow: 'Évaluer maintenant',
    checkSafety: 'Vérifier la sécurité',
    beersStat: 'Bières',
    avgRating: 'Note moyenne',
    safeDrinking: 'Consommation sûre',
    
    // Common beer terms
    style: 'Style',
    abv: 'Alcool',
    ibu: 'Amertume',
    ingredients: 'Ingrédients',
    country: 'Pays',
    brewery: 'Brasserie',
    
    // Actions
    search: 'Rechercher',
    filter: 'Filtrer',
    clear: 'Effacer',
    apply: 'Appliquer',
    loadMore: 'Charger plus',
    viewDetails: 'Voir détails',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    
    // Ratings
    yourRating: 'Votre note',
    overallRating: 'Note globale',
    rateThisBeer: 'Noter cette bière',
    submitRating: 'Soumettre la note',
    ratingSubmitted: 'Note soumise !',
    
    // Safety page
    bloodAlcoholContent: 'Taux d\'alcoolémie',
    timeToSober: 'Temps pour sobriété',
    safeToDrive: 'Aptitude à conduire',
    notSafeToDrive: 'Inaptitude à conduire',
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    weight: 'Poids',
    gender: 'Genre',
    drinks: 'Boissons',
    hours: 'Heures',
    male: 'Masculin',
    female: 'Féminin',
    other: 'Autre',
    
    // Errors & messages
    errorLoading: 'Erreur de chargement des données',
    noResults: 'Aucun résultat trouvé',
    tryAgain: 'Réessayer',
    connectionError: 'Erreur de connexion',
    offlineMessage: 'Vous semblez être hors ligne',
    
    // Months (for dates)
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre',
  },
  pl: {
    // Navigation
    home: 'Strona główna',
    beers: 'Piwa',
    beerFinder: 'Wyszukiwarka Piw',
    rateBeer: 'Oceń Piwo',
    safety: 'Picie i Kierowanie',
    signIn: 'Zaloguj się',
    
    // Common
    loading: 'Ładowanie...',
    submit: 'Wyślij',
    cancel: 'Anuluj',
    save: 'Zapisz',
    delete: 'Usuń',
    search: 'Szukaj',
    filter: 'Filtruj',
    sort: 'Sortuj',
    
    // Beer terms
    beer: 'Piwo',
    brewery: 'Browar',
    style: 'Styl',
    abv: 'Alkohol',
    ibu: 'Goryczka',
    rating: 'Ocena',
    reviews: 'Recenzje',
    
    // Safety
    drinkResponsibly: 'Pij odpowiedzialnie',
    neverDrinkAndDrive: 'Nigdy nie pij i prowadź',
    safetyFirst: 'Bezpieczeństwo przede wszystkim',
    
    // Home page (basic translations)
    appTagline: 'Twój towarzysz do odkrywania piw i odpowiedzialnej zabawy',
    discoverBeers: 'Odkrywaj piwa według stylu, alkoholu lub składników',
    quickFunRating: 'Szybka i zabawna ocena - zobacz najlepsze piwa w twoim kraju',
    safetyTools: 'Pij odpowiedzialnie z naszymi narzędziami bezpieczeństwa',
    startSearching: 'Rozpocznij wyszukiwanie',
    rateNow: 'Oceń teraz',
    checkSafety: 'Sprawdź bezpieczeństwo',
    beersStat: 'Piwa',
    avgRating: 'Śr. ocena',
    safeDrinking: 'Bezpieczne picie',
  },
  sv: {
    // Navigation
    home: 'Hem',
    beers: 'Öl',
    beerFinder: 'Ölsökare',
    rateBeer: 'Betygsätt Öl',
    safety: 'Dricka och Köra',
    signIn: 'Logga in',
    
    // Common
    loading: 'Laddar...',
    submit: 'Skicka',
    cancel: 'Avbryt',
    save: 'Spara',
    delete: 'Radera',
    search: 'Sök',
    filter: 'Filtrera',
    sort: 'Sortera',
    
    // Beer terms
    beer: 'Öl',
    brewery: 'Bryggeri',
    style: 'Stil',
    abv: 'Alkohol',
    ibu: 'Bitterhet',
    rating: 'Betyg',
    reviews: 'Recensioner',
    
    // Safety
    drinkResponsibly: 'Drick ansvarsfullt',
    neverDrinkAndDrive: 'Drick aldrig och kör',
    safetyFirst: 'Säkerhet först',
    
    // Home page (basic translations)
    appTagline: 'Din följeslagare för ölupptäckt och ansvarsfull njutning',
    discoverBeers: 'Upptäck öl efter stil, alkohol eller ingredienser',
    quickFunRating: 'Snabb & rolig betygssättning - se toppöl i ditt land',
    safetyTools: 'Drick ansvarsfullt med våra säkerhetsverktyg',
    startSearching: 'Börja söka',
    rateNow: 'Betygsätt nu',
    checkSafety: 'Kontrollera säkerhet',
    beersStat: 'Öl',
    avgRating: 'Snittbetyg',
    safeDrinking: 'Säker dryck',
  },
  da: {
    // Navigation
    home: 'Hjem',
    beers: 'Øl',
    beerFinder: 'Øl Finder',
    rateBeer: 'Bedøm Øl',
    safety: 'Drik og Kør',
    signIn: 'Log ind',
    
    // Common
    loading: 'Indlæser...',
    submit: 'Indsend',
    cancel: 'Annuller',
    save: 'Gem',
    delete: 'Slet',
    search: 'Søg',
    filter: 'Filtrer',
    sort: 'Sorter',
    
    // Beer terms
    beer: 'Øl',
    brewery: 'Bryggeri',
    style: 'Stil',
    abv: 'Alkohol',
    ibu: 'Bitterhed',
    rating: 'Bedømmelse',
    reviews: 'Anmeldelser',
    
    // Safety
    drinkResponsibly: 'Drik ansvarligt',
    neverDrinkAndDrive: 'Drik aldrig og kør',
    safetyFirst: 'Sikkerhed først',
    
    // Home page (basic translations)
    appTagline: 'Din følgesvend til ølopdagelse og ansvarlig nydelse',
    discoverBeers: 'Opdag øl efter stil, alkohol eller ingredienser',
    quickFunRating: 'Hurtig & sjov bedømmelse - se topøl i dit land',
    safetyTools: 'Drik ansvarligt med vores sikkerhedsværktøjer',
    startSearching: 'Start søgning',
    rateNow: 'Bedøm nu',
    checkSafety: 'Tjek sikkerhed',
    beersStat: 'Øl',
    avgRating: 'Gns. bedømmelse',
    safeDrinking: 'Sikker drik',
  },
  it: {
    // Navigation
    home: 'Home',
    beers: 'Birre',
    beerFinder: 'Cerca Birra',
    rateBeer: 'Valuta Birra',
    safety: 'Bere e Guidare',
    signIn: 'Accedi',
    
    // Common
    loading: 'Caricamento...',
    submit: 'Invia',
    cancel: 'Annulla',
    save: 'Salva',
    delete: 'Elimina',
    search: 'Cerca',
    filter: 'Filtra',
    sort: 'Ordina',
    
    // Beer terms
    beer: 'Birra',
    brewery: 'Birrificio',
    style: 'Stile',
    abv: 'Alcol',
    ibu: 'Amarezza',
    rating: 'Valutazione',
    reviews: 'Recensioni',
    
    // Safety
    drinkResponsibly: 'Bere responsabilmente',
    neverDrinkAndDrive: 'Mai bere e guidare',
    safetyFirst: 'Sicurezza prima',
    
    // Home page (basic translations)
    appTagline: 'Il tuo compagno per scoprire birre e divertirti responsabilmente',
    discoverBeers: 'Scopri birre per stile, alcol o ingredienti',
    quickFunRating: 'Valutazione veloce e divertente - vedi le migliori birre nel tuo paese',
    safetyTools: 'Bevi responsabilmente con i nostri strumenti di sicurezza',
    startSearching: 'Inizia ricerca',
    rateNow: 'Valuta ora',
    checkSafety: 'Controlla sicurezza',
    beersStat: 'Birre',
    avgRating: 'Media valutazione',
    safeDrinking: 'Bere sicuro',
  },
  nl: {
    // Navigation
    home: 'Home',
    beers: 'Bieren',
    beerFinder: 'Bier Zoeker',
    rateBeer: 'Beoordeel Bier',
    safety: 'Drinken en Rijden',
    signIn: 'Inloggen',
    
    // Common
    loading: 'Laden...',
    submit: 'Verzenden',
    cancel: 'Annuleren',
    save: 'Opslaan',
    delete: 'Verwijderen',
    search: 'Zoeken',
    filter: 'Filteren',
    sort: 'Sorteren',
    
    // Beer terms
    beer: 'Bier',
    brewery: 'Brouwerij',
    style: 'Stijl',
    abv: 'Alcohol',
    ibu: 'Bitterheid',
    rating: 'Beoordeling',
    reviews: 'Recensies',
    
    // Safety
    drinkResponsibly: 'Drink verantwoord',
    neverDrinkAndDrive: 'Drink nooit en rij',
    safetyFirst: 'Veiligheid eerst',
    
    // Home page (basic translations)
    appTagline: 'Jouw metgezel voor bierontdekking en verantwoord genieten',
    discoverBeers: 'Ontdek bieren op stijl, alcohol of ingrediënten',
    quickFunRating: 'Snelle & leuke beoordeling - zie topbieren in jouw land',
    safetyTools: 'Drink verantwoord met onze veiligheidshulpmiddelen',
    startSearching: 'Start zoeken',
    rateNow: 'Beoordeel nu',
    checkSafety: 'Controleer veiligheid',
    beersStat: 'Bieren',
    avgRating: 'Gem. beoordeling',
    safeDrinking: 'Veilig drinken',
  },
  cs: {
    // Navigation
    home: 'Domů',
    beers: 'Piva',
    beerFinder: 'Vyhledávač Piv',
    rateBeer: 'Ohodnoť Pivo',
    safety: 'Pití a Řízení',
    signIn: 'Přihlásit se',
    
    // Common
    loading: 'Načítání...',
    submit: 'Odeslat',
    cancel: 'Zrušit',
    save: 'Uložit',
    delete: 'Smazat',
    search: 'Hledat',
    filter: 'Filtrovat',
    sort: 'Seřadit',
    
    // Beer terms
    beer: 'Pivo',
    brewery: 'Pivovar',
    style: 'Styl',
    abv: 'Alkohol',
    ibu: 'Hořkost',
    rating: 'Hodnocení',
    reviews: 'Recenze',
    
    // Safety
    drinkResponsibly: 'Pijte zodpovědně',
    neverDrinkAndDrive: 'Nikdy nepijte a neřiďte',
    safetyFirst: 'Bezpečnost na prvním místě',
    
    // Home page (basic translations)
    appTagline: 'Váš průvodce objevováním piv a zodpovědného užívání',
    discoverBeers: 'Objevujte piva podle stylu, alkoholu nebo ingrediencí',
    quickFunRating: 'Rychlé a zábavné hodnocení - uvidíte nejlepší piva ve vaší zemi',
    safetyTools: 'Pijte zodpovědně s našimi bezpečnostními nástroji',
    startSearching: 'Začít hledat',
    rateNow: 'Ohodnotit nyní',
    checkSafety: 'Zkontrolovat bezpečnost',
    beersStat: 'Piva',
    avgRating: 'Prům. hodnocení',
    safeDrinking: 'Bezpečné pití',
  },
  pt: {
    // Navigation
    home: 'Início',
    beers: 'Cervejas',
    beerFinder: 'Localizador de Cerveja',
    rateBeer: 'Avaliar Cerveja',
    safety: 'Beber e Dirigir',
    signIn: 'Entrar',
    
    // Common
    loading: 'Carregando...',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Excluir',
    search: 'Pesquisar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    
    // Beer terms
    beer: 'Cerveja',
    brewery: 'Cervejaria',
    style: 'Estilo',
    abv: 'Álcool',
    ibu: 'Amargor',
    rating: 'Avaliação',
    reviews: 'Avaliações',
    
    // Safety
    drinkResponsibly: 'Beba com responsabilidade',
    neverDrinkAndDrive: 'Nunca beba e dirija',
    safetyFirst: 'Segurança primeiro',
    
    // Home page (basic translations)
    appTagline: 'Seu companheiro para descobrir cervejas e aproveitar com responsabilidade',
    discoverBeers: 'Descubra cervejas por estilo, álcool ou ingredientes',
    quickFunRating: 'Avaliação rápida e divertida - veja as melhores cervejas do seu país',
    safetyTools: 'Beba com responsabilidade com nossas ferramentas de segurança',
    startSearching: 'Iniciar pesquisa',
    rateNow: 'Avaliar agora',
    checkSafety: 'Verificar segurança',
    beersStat: 'Cervejas',
    avgRating: 'Média avaliação',
    safeDrinking: 'Consumo seguro',
  },
}

// Create context
const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get saved language from localStorage
    const savedLang = localStorage.getItem('beerapp_language')
    if (savedLang) {
      try {
        return JSON.parse(savedLang)
      } catch (e) {
        console.error('Error parsing saved language:', e)
      }
    }
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0]
    const detectedLang = LANGUAGES.find(lang => lang.code === browserLang)
    return detectedLang || LANGUAGES[0]
  })

  const t = (key) => {
    return TRANSLATIONS[language.code]?.[key] || TRANSLATIONS.en[key] || key
  }

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('beerapp_language', JSON.stringify(newLanguage))
    // Dispatch event for components that listen to language changes
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLanguage }))
  }

  // Listen for language changes from Navigation component
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail)
    }
    
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}