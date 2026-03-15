// Combined Beer Service - Merges German/Austrian database with international beers
import germanAustrianBeers from '../data/germanAustrianBeers.json'

// International beers data (curated selection)
const internationalBeers = {
  beers: [
    // ===== BELGIAN BEERS (Top 50 - Selected 15 most famous) =====
    { "id": 1001, "name": "Westvleteren 12", "brewery": "Sint-Sixtusabdij van Westvleteren", "brewery_city": "Westvleteren", "brewery_country": "Belgium", "style": "Quadrupel", "abv": 10.2, "ibu": 38, "description": "World's best beer according to many. Complex dark ale with rich malt, dark fruit, and spice notes.", "category": "Trappist Ale" },
    { "id": 1002, "name": "Rochefort 10", "brewery": "Abbaye Notre-Dame de Saint-Rémy", "brewery_city": "Rochefort", "brewery_country": "Belgium", "style": "Quadrupel", "abv": 11.3, "ibu": 27, "description": "Rich, dark Trappist ale with notes of chocolate, dried fruit, and spices.", "category": "Trappist Ale" },
    { "id": 1003, "name": "Chimay Bleue", "brewery": "Bières de Chimay", "brewery_city": "Chimay", "brewery_country": "Belgium", "style": "Dark Strong Ale", "abv": 9.0, "ibu": 35, "description": "Classic Belgian dark ale with complex malt character and subtle spice.", "category": "Trappist Ale" },
    { "id": 1004, "name": "Orval", "brewery": "Brasserie d'Orval", "brewery_city": "Villers-devant-Orval", "brewery_country": "Belgium", "style": "Pale Ale", "abv": 6.2, "ibu": 36, "description": "Unique Trappist ale with Brettanomyces yeast for distinctive dry, fruity character.", "category": "Trappist Ale" },
    { "id": 1005, "name": "Westmalle Tripel", "brewery": "Abdij der Trappisten van Westmalle", "brewery_city": "Westmalle", "brewery_country": "Belgium", "style": "Tripel", "abv": 9.5, "ibu": 32, "description": "The original Tripel - golden, strong, with complex fruit and spice notes.", "category": "Trappist Ale" },
    { "id": 1006, "name": "Duvel", "brewery": "Duvel Moortgat", "brewery_city": "Breendonk", "brewery_country": "Belgium", "style": "Strong Golden Ale", "abv": 8.5, "ibu": 33, "description": "Iconic Belgian strong golden ale with delicate fruitiness and dry finish.", "category": "Strong Ale" },
    { "id": 1007, "name": "Delirium Tremens", "brewery": "Brouwerij Huyghe", "brewery_city": "Melle", "brewery_country": "Belgium", "style": "Strong Golden Ale", "abv": 8.5, "ibu": 26, "description": "Award-winning strong pale ale with complex fruit and spice notes.", "category": "Strong Ale" },
    { "id": 1008, "name": "La Chouffe", "brewery": "Brasserie d'Achouffe", "brewery_city": "Achouffe", "brewery_country": "Belgium", "style": "Blond Ale", "abv": 8.0, "ibu": 25, "description": "Unfiltered blond beer with subtle spice and fruit notes.", "category": "Belgian Ale" },
    { "id": 1009, "name": "Leffe Blond", "brewery": "Abbaye de Leffe", "brewery_city": "Dinant", "brewery_country": "Belgium", "style": "Blond Ale", "abv": 6.6, "ibu": 20, "description": "Classic abbey beer with smooth malt character and subtle spice.", "category": "Abbey Beer" },
    { "id": 1010, "name": "Hoegaarden", "brewery": "Brouwerij van Hoegaarden", "brewery_city": "Hoegaarden", "brewery_country": "Belgium", "style": "Witbier", "abv": 4.9, "ibu": 15, "description": "Original Belgian white beer with coriander and orange peel.", "category": "Wheat Beer" },
    { "id": 1011, "name": "Cantillon Gueuze", "brewery": "Brasserie Cantillon", "brewery_city": "Brussels", "brewery_country": "Belgium", "style": "Gueuze", "abv": 5.0, "ibu": 0, "description": "Traditional spontaneously fermented lambic blend - tart, complex, and dry.", "category": "Lambic" },
    { "id": 1012, "name": "Lindemans Kriek", "brewery": "Brouwerij Lindemans", "brewery_city": "Vlezenbeek", "brewery_country": "Belgium", "style": "Fruit Lambic", "abv": 3.5, "ibu": 0, "description": "Cherry lambic with sweet fruit character balanced by lambic tartness.", "category": "Fruit Beer" },
    { "id": 1013, "name": "Saison Dupont", "brewery": "Brasserie Dupont", "brewery_city": "Tourpes", "brewery_country": "Belgium", "style": "Saison", "abv": 6.5, "ibu": 30, "description": "Classic farmhouse ale with peppery spice, citrus, and dry finish.", "category": "Saison" },
    { "id": 1014, "name": "Rodenbach Grand Cru", "brewery": "Brouwerij Rodenbach", "brewery_city": "Roeselare", "brewery_country": "Belgium", "style": "Flanders Red Ale", "abv": 6.0, "ibu": 18, "description": "Sour red ale aged in oak barrels with complex tart fruit character.", "category": "Sour Ale" },
    { "id": 1015, "name": "Gulden Draak", "brewery": "Brouwerij Van Steenberge", "brewery_city": "Ertvelde", "brewery_country": "Belgium", "style": "Dark Strong Ale", "abv": 10.5, "ibu": 30, "description": "Rich, dark ale with complex malt and dark fruit flavors.", "category": "Strong Ale" },

    // ===== CZECH BEERS (Top 20 - Selected 10 most famous) =====
    { "id": 2001, "name": "Pilsner Urquell", "brewery": "Plzeňský Prazdroj", "brewery_city": "Plzeň", "brewery_country": "Czech Republic", "style": "Pilsner", "abv": 4.4, "ibu": 40, "description": "The original Pilsner, first brewed in 1842. Crisp, golden lager with distinctive Saaz hop character.", "category": "Czech Lager" },
    { "id": 2002, "name": "Budweiser Budvar", "brewery": "Budějovický Budvar", "brewery_city": "České Budějovice", "brewery_country": "Czech Republic", "style": "Lager", "abv": 5.0, "ibu": 22, "description": "Czech premium lager with balanced malt and hop character.", "category": "Czech Lager" },
    { "id": 2003, "name": "Staropramen", "brewery": "Pivovar Staropramen", "brewery_city": "Prague", "brewery_country": "Czech Republic", "style": "Lager", "abv": 5.0, "ibu": 24, "description": "Prague's most famous beer with smooth malt character.", "category": "Czech Lager" },
    { "id": 2004, "name": "Kozel Premium", "brewery": "Pivovar Velké Popovice", "brewery_city": "Velké Popovice", "brewery_country": "Czech Republic", "style": "Lager", "abv": 4.6, "ibu": 20, "description": "Smooth, easy-drinking Czech lager.", "category": "Czech Lager" },
    { "id": 2005, "name": "Gambrinus", "brewery": "Plzeňský Prazdroj", "brewery_city": "Plzeň", "brewery_country": "Czech Republic", "style": "Lager", "abv": 4.3, "ibu": 18, "description": "Popular Czech lager from Pilsen.", "category": "Czech Lager" },
    { "id": 2006, "name": "Bernard", "brewery": "Pivovar Bernard", "brewery_city": "Humpolec", "brewery_country": "Czech Republic", "style": "Lager", "abv": 5.0, "ibu": 26, "description": "Traditional Czech lager from family brewery.", "category": "Czech Lager" },
    { "id": 2007, "name": "Krušovice", "brewery": "Pivovar Krušovice", "brewery_city": "Krušovice", "brewery_country": "Czech Republic", "style": "Lager", "abv": 5.0, "ibu": 22, "description": "Royal brewery since 1581, classic Czech lager.", "category": "Czech Lager" },
    { "id": 2008, "name": "Radegast", "brewery": "Pivovar Radegast", "brewery_city": "Nošovice", "brewery_country": "Czech Republic", "style": "Lager", "abv": 4.8, "ibu": 25, "description": "Czech lager with distinctive hop bitterness.", "category": "Czech Lager" },
    { "id": 2009, "name": "Svijany", "brewery": "Pivovar Svijany", "brewery_city": "Svijany", "brewery_country": "Czech Republic", "style": "Lager", "abv": 4.8, "ibu": 24, "description": "Traditional Czech lager from regional brewery.", "category": "Czech Lager" },
    { "id": 2010, "name": "Primátor", "brewery": "Pivovar Náchod", "brewery_city": "Náchod", "brewery_country": "Czech Republic", "style": "Lager", "abv": 5.0, "ibu": 26, "description": "Czech lager with full malt character.", "category": "Czech Lager" },

    // ===== UK BEERS (Top 20 - Selected 10 most famous) =====
    { "id": 3001, "name": "Fuller's London Pride", "brewery": "Fuller's", "brewery_city": "London", "brewery_country": "United Kingdom", "style": "ESB", "abv": 4.7, "ibu": 30, "description": "Classic English bitter with balanced malt and hop character.", "category": "Bitter" },
    { "id": 3002, "name": "Bass Pale Ale", "brewery": "Bass Brewery", "brewery_city": "Burton upon Trent", "brewery_country": "United Kingdom", "style": "Pale Ale", "abv": 5.0, "ibu": 35, "description": "Historic English pale ale with distinctive red triangle logo.", "category": "Pale Ale" },
    { "id": 3003, "name": "Newcastle Brown Ale", "brewery": "Newcastle Breweries", "brewery_city": "Newcastle upon Tyne", "brewery_country": "United Kingdom", "style": "Brown Ale", "abv": 4.7, "ibu": 25, "description": "Iconic English brown ale with nutty, caramel flavors.", "category": "Brown Ale" },
    { "id": 3004, "name": "Samuel Smith's Old Brewery Pale Ale", "brewery": "Samuel Smith's", "brewery_city": "Tadcaster", "brewery_country": "United Kingdom", "style": "Pale Ale", "abv": 5.0, "ibu": 32, "description": "Traditional Yorkshire pale ale brewed with well water.", "category": "Pale Ale" },
    { "id": 3005, "name": "Boddingtons Pub Ale", "brewery": "Boddingtons", "brewery_city": "Manchester", "brewery_country": "United Kingdom", "style": "Bitter", "abv": 4.1, "ibu": 28, "description": "Creamy, smooth bitter from Manchester.", "category": "Bitter" },
    { "id": 3006, "name": "Young's Double Chocolate Stout", "brewery": "Young's", "brewery_city": "London", "brewery_country": "United Kingdom", "style": "Stout", "abv": 5.2, "ibu": 40, "description": "Rich, chocolatey stout with real dark chocolate.", "category": "Stout" },
    { "id": 3007, "name": "Harvey's Sussex Best Bitter", "brewery": "Harvey's", "brewery_city": "Lewes", "brewery_country": "United Kingdom", "style": "Bitter", "abv": 4.0, "ibu": 32, "description": "Award-winning traditional English bitter.", "category": "Bitter" },
    { "id": 3008, "name": "Timothy Taylor's Landlord", "brewery": "Timothy Taylor", "brewery_city": "Keighley", "brewery_country": "United Kingdom", "style": "Pale Ale", "abv": 4.3, "ibu": 34, "description": "Multiple award-winning pale ale from Yorkshire.", "category": "Pale Ale" },
    { "id": 3009, "name": "Marston's Pedigree", "brewery": "Marston's", "brewery_city": "Burton upon Trent", "brewery_country": "United Kingdom", "style": "Bitter", "abv": 4.5, "ibu": 30, "description": "Traditional Burton ale with distinctive flavor.", "category": "Bitter" },
    { "id": 3010, "name": "Greene King IPA", "brewery": "Greene King", "brewery_city": "Bury St Edmunds", "brewery_country": "United Kingdom", "style": "IPA", "abv": 3.6, "ibu": 28, "description": "Britain's best-selling IPA with balanced hop character.", "category": "IPA" },

    // ===== IRISH BEERS (Top 5) =====
    { "id": 4001, "name": "Guinness Draught", "brewery": "Guinness", "brewery_city": "Dublin", "brewery_country": "Ireland", "style": "Dry Stout", "abv": 4.2, "ibu": 45, "description": "World's most famous stout with creamy head and roasted character.", "category": "Stout" },
    { "id": 4002, "name": "Smithwick's Red Ale", "brewery": "Smithwick's", "brewery_city": "Kilkenny", "brewery_country": "Ireland", "style": "Red Ale", "abv": 4.5, "ibu": 22, "description": "Ireland's oldest ale with smooth malt and subtle hop character.", "category": "Red Ale" },
    { "id": 4003, "name": "Kilkenny Irish Cream Ale", "brewery": "Kilkenny", "brewery_city": "Kilkenny", "brewery_country": "Ireland", "style": "Cream Ale", "abv": 4.3, "ibu": 20, "description": "Smooth, creamy ale with rich malt character.", "category": "Cream Ale" },
    { "id": 4004, "name": "Murphy's Irish Stout", "brewery": "Murphy's", "brewery_city": "Cork", "brewery_country": "Ireland", "style": "Stout", "abv": 4.0, "ibu": 35, "description": "Smooth, creamy stout from Cork with chocolate and coffee notes.", "category": "Stout" },
    { "id": 4005, "name": "Beamish Irish Stout", "brewery": "Beamish", "brewery_city": "Cork", "brewery_country": "Ireland", "style": "Stout", "abv": 4.1, "ibu": 38, "description": "Traditional Irish stout with rich roasted malt character.", "category": "Stout" },

    // ===== OTHER COUNTRIES (Top 3-5 each) =====
    
    // Netherlands (Top 5)
    { "id": 5001, "name": "Heineken", "brewery": "Heineken", "brewery_city": "Amsterdam", "brewery_country": "Netherlands", "style": "Lager", "abv": 5.0, "ibu": 23, "description": "World-famous Dutch lager with balanced taste.", "category": "Lager" },
    { "id": 5002, "name": "Amstel", "brewery": "Amstel", "brewery_city": "Amsterdam", "brewery_country": "Netherlands", "style": "Lager", "abv": 5.0, "ibu": 22, "description": "Dutch premium lager with crisp finish.", "category": "Lager" },
    { "id": 5003, "name": "Grolsch", "brewery": "Grolsch", "brewery_city": "Enschede", "brewery_country": "Netherlands", "style": "Lager", "abv": 5.0, "ibu": 25, "description": "Dutch beer with distinctive swing-top bottle.", "category": "Lager" },
    { "id": 5004, "name": "Hertog Jan", "brewery": "Hertog Jan", "brewery_city": "Arcen", "brewery_country": "Netherlands", "style": "Pilsner", "abv": 5.0, "ibu": 28, "description": "Premium Dutch pilsner with full flavor.", "category": "Pilsner" },
    { "id": 5005, "name": "Brand", "brewery": "Brand", "brewery_city": "Wijlre", "brewery_country": "Netherlands", "style": "Pilsner", "abv": 5.0, "ibu": 26, "description": "Oldest Dutch brewery, traditional pilsner.", "category": "Pilsner" },

    // Denmark (Top 5)
    { "id": 6001, "name": "Carlsberg", "brewery": "Carlsberg", "brewery_city": "Copenhagen", "brewery_country": "Denmark", "style": "Pilsner", "abv": 5.0, "ibu": 24, "description": "Danish pilsner with smooth, balanced taste.", "category": "Pilsner" },
    { "id": 6002, "name": "Tuborg", "brewery": "Tuborg", "brewery_city": "Copenhagen", "brewery_country": "Denmark", "style": "Pilsner", "abv": 5.0, "ibu": 22, "description": "Danish pilsner with mild hop character.", "category": "Pilsner" },
    { "id": 6003, "name": "Mikkeller", "brewery": "Mikkeller", "brewery_city": "Copenhagen", "brewery_country": "Denmark", "style": "IPA", "abv": 6.9, "ibu": 65, "description": "Experimental craft beer from Danish gypsy brewery.", "category": "IPA" },
    { "id": 6004, "name": "To Øl", "brewery": "To Øl", "brewery_city": "Copenhagen", "brewery_country": "Denmark", "style": "Pale Ale", "abv": 5.8, "ibu": 45, "description": "Danish craft beer with creative recipes.", "category": "Pale Ale" },
    { "id": 6005, "name": "Faxe", "brewery": "Faxe", "brewery_city": "Faxe", "brewery_country": "Denmark", "style": "Lager", "abv": 5.0, "ibu": 20, "description": "Danish export beer in distinctive can.", "category": "Lager" },

    // USA (Top 5 - Craft beers)
    { "id": 7001, "name": "Sierra Nevada Pale Ale", "brewery": "Sierra Nevada", "brewery_city": "Chico, CA", "brewery_country": "United States", "style": "Pale Ale", "abv": 5.6, "ibu": 38, "description": "American craft beer classic with Cascade hops.", "category": "Pale Ale" },
    { "id": 7002, "name": "Samuel Adams Boston Lager", "brewery": "Boston Beer Company", "brewery_city": "Boston, MA", "brewery_country": "United States", "style": "Lager", "abv": 5.0, "ibu": 30, "description": "American craft lager with rich malt character.", "category": "Lager" },
    { "id": 7003, "name": "Budweiser", "brewery": "Anheuser-Busch", "brewery_city": "St. Louis, MO", "brewery_country": "United States", "style": "Lager", "abv": 5.0, "ibu": 12, "description": "America's most popular beer.", "category": "Lager" },
    { "id": 7004, "name": "Coors Light", "brewery": "Coors", "brewery_city": "Golden, CO", "brewery_country": "United States", "style": "Light Lager", "abv": 4.2, "ibu": 10, "description": "American light lager with Rocky Mountain water.", "category": "Light Beer" },
    { "id": 7005, "name": "Miller Lite", "brewery": "Miller", "brewery_city": "Milwaukee, WI", "brewery_country": "United States", "style": "Light Lager", "abv": 4.2, "ibu": 12, "description": "Original light beer from USA.", "category": "Light Beer" },

    // France (Top 3)
    { "id": 8001, "name": "Kronenbourg 1664", "brewery": "Kronenbourg", "brewery_city": "Strasbourg", "brewery_country": "France", "style": "Lager", "abv": 5.5, "ibu": 20, "description": "French premium lager with aromatic hops.", "category": "Lager" },
    { "id": 8002, "name": "Desperados", "brewery": "Brasserie Fischer", "brewery_city": "Schiltigheim", "brewery_country": "France", "style": "Tequila Beer", "abv": 5.9, "ibu": 15, "description": "French beer with tequila flavor.", "category": "Specialty Beer" },
    { "id": 8003, "name": "Pelforth", "brewery": "Pelforth", "brewery_city": "Lille", "brewery_country": "France", "style": "Brown Ale", "abv": 6.5, "ibu": 25, "description": "French brown ale with caramel notes.", "category": "Brown Ale" },

    // Italy (Top 3)
    { "id": 9001, "name": "Peroni", "brewery": "Peroni", "brewery_city": "Rome", "brewery_country": "Italy", "style": "Lager", "abv": 4.7, "ibu": 22, "description": "Italian premium lager with crisp taste.", "category": "Lager" },
    { "id": 9002, "name": "Moretti", "brewery": "Birra Moretti", "brewery_city": "Udine", "brewery_country": "Italy", "style": "Lager", "abv": 4.6, "ibu": 20, "description": "Italian beer with distinctive mustache logo.", "category": "Lager" },
    { "id": 9003, "name": "Nastro Azzurro", "brewery": "Peroni", "brewery_city": "Rome", "brewery_country": "Italy", "style": "Lager", "abv": 5.1, "ibu": 24, "description": "Italian premium lager, 'Blue Ribbon'.", "category": "Lager" },

    // Spain (Top 3)
    { "id": 10001, "name": "Estrella Damm", "brewery": "Damm", "brewery_city": "Barcelona", "brewery_country": "Spain", "style": "Lager", "abv": 5.4, "ibu": 21, "description": "Catalan beer with Mediterranean character.", "category": "Lager" },
    { "id": 10002, "name": "Mahou", "brewery": "Mahou", "brewery_city": "Madrid", "brewery_country": "Spain", "style": "Lager", "abv": 5.5, "ibu": 20, "description": "Spanish beer from Madrid.", "category": "Lager" },
    { "id": 10003, "name": "Cruzcampo", "brewery": "Cruzcampo", "brewery_city": "Seville", "brewery_country": "Spain", "style": "Lager", "abv": 4.8, "ibu": 19, "description": "Andalusian beer from Seville.", "category": "Lager" },

    // Poland (Top 3)
    { "id": 11001, "name": "Żywiec", "brewery": "Żywiec", "brewery_city": "Żywiec", "brewery_country": "Poland", "style": "Lager", "abv": 5.6, "ibu": 26, "description": "Polish lager from the Tatra Mountains.", "category": "Lager" },
    { "id": 11002, "name": "Tyskie", "brewery": "Tyskie", "brewery_city": "Tychy", "brewery_country": "Poland", "style": "Lager", "abv": 5.6, "ibu": 24, "description": "Polish beer with 400-year tradition.", "category": "Lager" },
    { "id": 11003, "name": "Okocim", "brewery": "Okocim", "brewery_city": "Brzesko", "brewery_country": "Poland", "style": "Lager", "abv": 5.6, "ibu": 25, "description": "Polish beer from historic brewery.", "category": "Lager" },

    // Switzerland (Top 3)
    { "id": 12001, "name": "Feldschlösschen", "brewery": "Feldschlösschen", "brewery_city": "Rheinfelden", "brewery_country": "Switzerland", "style": "Lager", "abv": 5.2, "ibu": 22, "description": "Swiss beer from the castle brewery.", "category": "Lager" },
    { "id": 12002, "name": "Cardinal", "brewery": "Cardinal", "brewery_city": "Fribourg", "brewery_country": "Switzerland", "style": "Lager", "abv": 5.2, "ibu": 23, "description": "Swiss beer with balanced taste.", "category": "Lager" },
    { "id": 12003, "name": "Eichhof", "brewery": "Eichhof", "brewery_city": "Lucerne", "brewery_country": "Switzerland", "style": "Lager", "abv": 5.0, "ibu": 21, "description": "Swiss beer from Lucerne.", "category": "Lager" }
  ]
}

// Combine all beers
const allBeers = [...germanAustrianBeers.beers, ...internationalBeers.beers]

const combinedBeerService = {
  // Get all beers
  getAllBeers() {
    return allBeers
  },

  // Get beers by country
  getBeersByCountry(countryCode) {
    const countryMap = {
      'DE': 'Germany',
      'AT': 'Austria',
      'BE': 'Belgium',
      'CZ': 'Czech Republic',
      'GB': 'United Kingdom',
      'IE': 'Ireland',
      'NL': 'Netherlands',
      'DK': 'Denmark',
      'US': 'United States',
      'FR': 'France',
      'IT': 'Italy',
      'ES': 'Spain',
      'PL': 'Poland',
      'CH': 'Switzerland'
    }
    
    const countryName = countryMap[countryCode] || countryCode
    return allBeers.filter(beer => beer.brewery_country === countryName)
  },

  // Get beer by ID
  getBeerById(id) {
    return allBeers.find(beer => beer.id === parseInt(id))
  },

  // Search beers
  searchBeers(query) {
    const searchTerm = query.toLowerCase()
    return allBeers.filter(beer => 
      beer.name.toLowerCase().includes(searchTerm) ||
      beer.brewery.toLowerCase().includes(searchTerm) ||
      beer.style.toLowerCase().includes(searchTerm) ||
      beer.description.toLowerCase().includes(searchTerm)
    )
  },

  // Get random beer
  getRandomBeer() {
    return allBeers[Math.floor(Math.random() * allBeers.length)]
  },

  // Get all styles
  getAllStyles() {
    const styles = new Set()
    allBeers.forEach(beer => styles.add(beer.style))
    return Array.from(styles).sort()
  },

  // Get beers by style
  getBeersByStyle(style) {
    return allBeers.filter(beer => beer.style === style)
  },

  // Get beers by ABV range
  getBeersByABV(minABV, maxABV) {
    return allBeers.filter(beer => beer.abv >= minABV && beer.abv <= maxABV)
  },

  // Get unique countries
  getAllCountries() {
    const countries = new Set()
    allBeers.forEach(beer => countries.add(beer.brewery_country))
    return Array.from(countries).sort()
  },

  // Get beer count by country
  getBeerCountByCountry() {
    const counts = {}
    allBeers.forEach(beer => {
      counts[beer.brewery_country] = (counts[beer.brewery_country] || 0) + 1
    })
    return counts
  }
}

export default combinedBeerService