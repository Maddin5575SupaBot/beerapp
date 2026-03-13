// Drink n Drive safety calculator and educational tool
// IMPORTANT: This is for educational purposes only. Always drink responsibly.

class DrinkDriveService {
  constructor() {
    // Blood Alcohol Content (BAC) calculation constants
    this.WIDMARK_FACTOR = {
      male: 0.68,
      female: 0.55
    }
    
    this.METABOLISM_RATE = 0.015 // BAC reduction per hour
    
    // Standard drink definitions (in grams of pure alcohol)
    this.STANDARD_DRINKS = {
      beer: {
        regular: 13.6,    // 5% ABV, 12oz
        strong: 20.4,     // 7.5% ABV, 12oz
        light: 10.2       // 3.5% ABV, 12oz
      },
      wine: {
        glass: 14.0,      // 12% ABV, 5oz
        bottle: 84.0      // 12% ABV, 750ml
      },
      spirits: {
        shot: 14.0,       // 40% ABV, 1.5oz
        cocktail: 28.0    // 40% ABV, 3oz
      }
    }
    
    // Legal limits (varies by country)
    this.LEGAL_LIMITS = {
      us: 0.08,      // United States
      uk: 0.08,      // United Kingdom
      de: 0.05,      // Germany
      se: 0.02,      // Sweden (very strict)
      cz: 0.00       // Czech Republic (zero tolerance)
    }
    
    // Effects at different BAC levels
    this.BAC_EFFECTS = [
      { level: 0.02, effects: ['Slight mood elevation', 'Relaxation', 'Slight body warmth'] },
      { level: 0.05, effects: ['Lowered inhibitions', 'Euphoria', 'Impaired judgment'] },
      { level: 0.08, effects: ['Poor muscle coordination', 'Slurred speech', 'Impaired driving skills'] },
      { level: 0.10, effects: ['Clear deterioration of reaction time', 'Slurred speech', 'Poor coordination'] },
      { level: 0.15, effects: ['Major loss of balance', 'Vomiting', 'Unable to walk without assistance'] },
      { level: 0.30, effects: ['Loss of consciousness', 'Severe risk of death'] }
    ]
  }

  // Calculate Blood Alcohol Content (BAC)
  calculateBAC(weight, gender, drinks, hours) {
    // Weight in kg
    const weightKg = weight
    
    // Total alcohol consumed (in grams)
    const totalAlcohol = drinks.reduce((sum, drink) => {
      return sum + (drink.volume * drink.abv * 0.789) // Convert to grams of alcohol
    }, 0)
    
    // Widmark formula: BAC = (Alcohol in grams / (Weight in grams * r)) - (Metabolism * hours)
    const widmarkFactor = this.WIDMARK_FACTOR[gender]
    const bac = (totalAlcohol / (weightKg * 1000 * widmarkFactor)) - (this.METABOLISM_RATE * hours)
    
    return Math.max(0, parseFloat(bac.toFixed(3)))
  }

  // Estimate time until sober
  estimateTimeUntilSober(currentBAC, targetBAC = 0.00) {
    if (currentBAC <= targetBAC) return 0
    
    const hoursNeeded = (currentBAC - targetBAC) / this.METABOLISM_RATE
    return parseFloat(hoursNeeded.toFixed(1))
  }

  // Check if legal to drive
  checkLegalToDrive(bac, country = 'us') {
    const legalLimit = this.LEGAL_LIMITS[country] || 0.08
    return {
      legal: bac < legalLimit,
      limit: legalLimit,
      overBy: bac > legalLimit ? parseFloat((bac - legalLimit).toFixed(3)) : 0
    }
  }

  // Get effects at current BAC level
  getEffectsAtBAC(bac) {
    const currentEffects = []
    const upcomingEffects = []
    
    this.BAC_EFFECTS.forEach(effect => {
      if (bac >= effect.level) {
        currentEffects.push(...effect.effects)
      } else if (bac >= effect.level * 0.8) {
        upcomingEffects.push(...effect.effects)
      }
    })
    
    return {
      current: currentEffects,
      upcoming: upcomingEffects.slice(0, 3) // Show next 3 potential effects
    }
  }

  // Create a drinking plan
  createDrinkingPlan(weight, gender, durationHours, country = 'us') {
    const legalLimit = this.LEGAL_LIMITS[country] || 0.08
    
    // Calculate maximum drinks to stay under limit
    const maxBAC = legalLimit * 0.8 // Safety margin
    const widmarkFactor = this.WIDMARK_FACTOR[gender]
    
    // Reverse Widmark formula to find max alcohol
    const maxAlcoholGrams = (maxBAC + (this.METABOLISM_RATE * durationHours)) * (weight * 1000 * widmarkFactor)
    
    // Convert to standard drinks (assuming regular beer)
    const maxDrinks = Math.floor(maxAlcoholGrams / this.STANDARD_DRINKS.beer.regular)
    
    return {
      maxDrinks,
      recommendation: maxDrinks > 0 
        ? `You can have up to ${maxDrinks} regular beers over ${durationHours} hours and stay under ${(legalLimit * 100).toFixed(1)}% BAC`
        : 'Better not to drink if you plan to drive',
      tips: [
        'Alternate alcoholic drinks with water',
        'Eat before and while drinking',
        'Pace yourself - no more than 1 drink per hour',
        'Use public transportation or ride-sharing',
        'Designate a sober driver'
      ]
    }
  }

  // Log a drinking session
  logDrinkingSession(session) {
    const sessions = this.getDrinkingSessions()
    sessions.push({
      ...session,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    })
    
    // Keep only last 50 sessions
    const recentSessions = sessions.slice(-50)
    localStorage.setItem('beerapp_drinking_sessions', JSON.stringify(recentSessions))
    
    return session
  }

  // Get drinking session history
  getDrinkingSessions() {
    try {
      const stored = localStorage.getItem('beerapp_drinking_sessions')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading drinking sessions:', error)
      return []
    }
  }

  // Get safety tips
  getSafetyTips() {
    return [
      {
        title: 'Plan Ahead',
        tips: [
          'Designate a sober driver before drinking',
          'Have a backup plan (taxi, ride-sharing, public transport)',
          'Know your limits and stick to them'
        ]
      },
      {
        title: 'While Drinking',
        tips: [
          'Pace yourself - no more than 1 standard drink per hour',
          'Alternate alcoholic drinks with water',
          'Eat food while drinking',
          'Avoid drinking games or shots'
        ]
      },
      {
        title: 'After Drinking',
        tips: [
          'Wait at least 1 hour per standard drink before driving',
          'Use a BAC calculator to estimate your level',
          'When in doubt, don\'t drive',
          'Sleep it off if possible'
        ]
      },
      {
        title: 'Alternative Transportation',
        tips: [
          'Ride-sharing apps (Uber, Lyft)',
          'Taxi services',
          'Public transportation',
          'Designated driver services',
          'Walking (if safe and close)'
        ]
      }
    ]
  }

  // Calculate standard drinks from beer info
  calculateStandardDrinks(volumeMl, abv) {
    // Standard drink = 14 grams of pure alcohol
    const alcoholGrams = (volumeMl * abv * 0.789) / 100
    return parseFloat((alcoholGrams / 14).toFixed(2))
  }

  // Emergency contacts (country-specific)
  getEmergencyContacts(country = 'us') {
    const contacts = {
      us: {
        emergency: '911',
        poisonControl: '1-800-222-1222',
        rideSharing: ['Uber', 'Lyft'],
        taxi: 'Local taxi services'
      },
      uk: {
        emergency: '999',
        nonEmergency: '101',
        rideSharing: ['Uber', 'Bolt'],
        taxi: 'Local minicab services'
      },
      de: {
        emergency: '112',
        police: '110',
        rideSharing: ['Uber', 'FREE NOW'],
        taxi: 'Local Taxi services'
      }
    }
    
    return contacts[country] || contacts.us
  }
}

export default new DrinkDriveService()