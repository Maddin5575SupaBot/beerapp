// German & Austrian beer service - Focus on DACH region beers
// Uses local JSON database for reliable, fast access to major German/Austrian beers

import beerData from '../data/germanAustrianBeers.json'

class GermanAustrianBeerService {
  constructor() {
    this.beers = beerData.beers
  }

  // Get all beers
  getAllBeers() {
    return this.beers
  }

  // Get beers by country
  getBeersByCountry(country) {
    return this.beers.filter(beer => 
      beer.brewery_country.toLowerCase() === country.toLowerCase()
    )
  }

  // Get German beers
  getGermanBeers() {
    return this.getBeersByCountry('Germany')
  }

  // Get Austrian beers
  getAustrianBeers() {
    return this.getBeersByCountry('Austria')
  }

  // Get beers by brewery
  getBeersByBrewery(breweryName) {
    return this.beers.filter(beer => 
      beer.brewery.toLowerCase().includes(breweryName.toLowerCase())
    )
  }

  // Get unique breweries
  getBreweries() {
    const breweries = new Map()
    
    this.beers.forEach(beer => {
      if (!breweries.has(beer.brewery)) {
        breweries.set(beer.brewery, {
          name: beer.brewery,
          city: beer.brewery_city,
          country: beer.brewery_country,
          beers: []
        })
      }
      breweries.get(beer.brewery).beers.push({
        id: beer.id,
        name: beer.name,
        style: beer.style,
        abv: beer.abv,
        ibu: beer.ibu,
        description: beer.description,
        category: beer.category
      })
    })
    
    return Array.from(breweries.values())
  }

  // Get breweries by country
  getBreweriesByCountry(countryCode) {
    const countryMap = {
      'DE': 'Germany',
      'AT': 'Austria'
    }
    
    const countryName = countryMap[countryCode] || countryCode
    return this.getBreweries().filter(brewery => 
      brewery.country.toLowerCase() === countryName.toLowerCase()
    )
  }

  // Search beers by name, brewery, or style
  searchBeers(query) {
    const lowerQuery = query.toLowerCase()
    return this.beers.filter(beer =>
      beer.name.toLowerCase().includes(lowerQuery) ||
      beer.brewery.toLowerCase().includes(lowerQuery) ||
      beer.style.toLowerCase().includes(lowerQuery) ||
      beer.description.toLowerCase().includes(lowerQuery)
    )
  }

  // Get beer by ID
  getBeerById(id) {
    return this.beers.find(beer => beer.id === id)
  }

  // Get beers by style
  getBeersByStyle(style) {
    return this.beers.filter(beer => 
      beer.style.toLowerCase() === style.toLowerCase()
    )
  }

  // Get all unique styles
  getAllStyles() {
    const styles = new Set(this.beers.map(beer => beer.style))
    return Array.from(styles).sort()
  }

  // Get popular beers (by brewery popularity)
  getPopularBeers(limit = 10) {
    // Simple popularity based on major breweries
    const majorBreweries = [
      'Bitburger', 'Krombacher', 'Warsteiner', 'Beck\'s', 
      'Paulaner', 'Weihenstephaner', 'Gösser', 'Stiegl'
    ]
    
    return this.beers
      .filter(beer => majorBreweries.includes(beer.brewery))
      .slice(0, limit)
  }

  // Get beers by ABV range
  getBeersByABV(minABV, maxABV) {
    return this.beers.filter(beer => 
      beer.abv >= minABV && beer.abv <= maxABV
    )
  }

  // Get beers by IBU range
  getBeersByIBU(minIBU, maxIBU) {
    return this.beers.filter(beer => 
      beer.ibu >= minIBU && beer.ibu <= maxIBU
    )
  }

  // Get random beer
  getRandomBeer() {
    const randomIndex = Math.floor(Math.random() * this.beers.length)
    return this.beers[randomIndex]
  }

  // Get beer suggestions based on country
  getBeerSuggestionsByCountry(countryCode, limit = 5) {
    const countryBeers = this.getBeersByCountry(
      countryCode === 'DE' ? 'Germany' : 
      countryCode === 'AT' ? 'Austria' : 'Germany'
    )
    
    // Return popular beers from that country
    const majorBreweries = countryCode === 'DE' ? [
      'Bitburger', 'Krombacher', 'Warsteiner', 'Beck\'s', 'Paulaner'
    ] : [
      'Gösser', 'Stiegl', 'Ottakringer'
    ]
    
    return countryBeers
      .filter(beer => majorBreweries.includes(beer.brewery))
      .slice(0, limit)
  }

  // Get unique categories
  getAllCategories() {
    const categories = new Set(this.beers.map(beer => beer.category))
    return Array.from(categories).sort()
  }

  // Get beers by category
  getBeersByCategory(category) {
    return this.beers.filter(beer => 
      beer.category.toLowerCase() === category.toLowerCase()
    )
  }
}

export default new GermanAustrianBeerService()