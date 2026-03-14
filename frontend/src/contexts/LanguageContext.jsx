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
  },
  // Add more languages as needed...
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