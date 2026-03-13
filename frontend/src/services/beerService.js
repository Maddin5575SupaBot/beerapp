// Beer service for API calls and data management
// Using Punk API (https://punkapi.com/) for real beer data

import axios from 'axios'

const PUNK_API = 'https://api.punkapi.com/v2'

// Mock data for development when API is not available
const mockBeers = [
  {
    id: 1,
    name: 'Buzz',
    tagline: 'A Real Bitter Experience.',
    description: 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
    abv: 4.5,
    ibu: 60,
    image_url: 'https://images.punkapi.com/v2/keg.png',
    food_pairing: ['Spicy chicken tikka masala', 'Grilled chicken quesadilla', 'Caramel toffee cake']
  },
  {
    id: 2,
    name: 'Trashy Blonde',
    tagline: 'You Know You Shouldn\'t',
    description: 'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure.',
    abv: 4.1,
    ibu: 41.5,
    image_url: 'https://images.punkapi.com/v2/2.png',
    food_pairing: ['Fresh crab with lemon', 'Garlic butter dipping sauce', 'Goats cheese salad', 'Creamy lemon bar doused in powdered sugar']
  },
  {
    id: 3,
    name: 'Berliner Weisse With Yuzu - B-Sides',
    tagline: 'Japanese Citrus Berliner Weisse.',
    description: 'Japanese citrus fruit intensifies the sour nature of this German classic.',
    abv: 4.2,
    ibu: 8,
    image_url: 'https://images.punkapi.com/v2/3.png',
    food_pairing: ['Smoked chicken wings', 'Miso ramen', 'Yuzu cheesecake']
  },
  {
    id: 4,
    name: 'Pilsen Lager',
    tagline: 'Unleash the Yeast Series.',
    description: 'Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast.',
    abv: 6.3,
    ibu: 55,
    image_url: 'https://images.punkapi.com/v2/4.png',
    food_pairing: ['Spicy crab cakes', 'Spicy cucumber and carrot Thai salad', 'Sweet filled doughnuts']
  },
  {
    id: 5,
    name: 'Avery Brown Dredge',
    tagline: 'Bloggers\' Imperial Pilsner.',
    description: 'An Imperial Pilsner in the heart of the Czech Republic. Plisner imperialism taken to the next level.',
    abv: 7.2,
    ibu: 59,
    image_url: 'https://images.punkapi.com/v2/5.png',
    food_pairing: ['Vietnamese squid salad', 'Chargrilled wild boar', 'Vanilla panna cotta']
  }
]

class BeerService {
  // Get all beers with pagination
  async getBeers(page = 1, perPage = 10) {
    try {
      const response = await axios.get(`${PUNK_API}/beers`, {
        params: { page, per_page: perPage }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching beers:', error)
      // Return mock data if API fails
      return mockBeers
    }
  }

  // Search beers by name
  async searchBeers(query, page = 1, perPage = 10) {
    try {
      const response = await axios.get(`${PUNK_API}/beers`, {
        params: { beer_name: query, page, per_page: perPage }
      })
      return response.data
    } catch (error) {
      console.error('Error searching beers:', error)
      // Filter mock data by query
      return mockBeers.filter(beer => 
        beer.name.toLowerCase().includes(query.toLowerCase()) ||
        beer.tagline.toLowerCase().includes(query.toLowerCase()) ||
        beer.description.toLowerCase().includes(query.toLowerCase())
      )
    }
  }

  // Get beer by ID
  async getBeerById(id) {
    try {
      const response = await axios.get(`${PUNK_API}/beers/${id}`)
      return response.data[0]
    } catch (error) {
      console.error('Error fetching beer by ID:', error)
      // Return mock beer by ID
      return mockBeers.find(beer => beer.id === parseInt(id)) || mockBeers[0]
    }
  }

  // Get beers by ABV range
  async getBeersByABV(minABV, maxABV, page = 1, perPage = 10) {
    try {
      const response = await axios.get(`${PUNK_API}/beers`, {
        params: { abv_gt: minABV, abv_lt: maxABV, page, per_page: perPage }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching beers by ABV:', error)
      // Filter mock data by ABV
      return mockBeers.filter(beer => beer.abv >= minABV && beer.abv <= maxABV)
    }
  }

  // Get beers by IBU range
  async getBeersByIBU(minIBU, maxIBU, page = 1, perPage = 10) {
    try {
      const response = await axios.get(`${PUNK_API}/beers`, {
        params: { ibu_gt: minIBU, ibu_lt: maxIBU, page, per_page: perPage }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching beers by IBU:', error)
      // Filter mock data by IBU
      return mockBeers.filter(beer => beer.ibu >= minIBU && beer.ibu <= maxIBU)
    }
  }

  // Get random beer
  async getRandomBeer() {
    try {
      const response = await axios.get(`${PUNK_API}/beers/random`)
      return response.data[0]
    } catch (error) {
      console.error('Error fetching random beer:', error)
      // Return random mock beer
      return mockBeers[Math.floor(Math.random() * mockBeers.length)]
    }
  }

  // Get beer styles (extracted from beers)
  async getBeerStyles() {
    try {
      const response = await axios.get(`${PUNK_API}/beers`, { params: { per_page: 80 } })
      const styles = [...new Set(response.data.map(beer => {
        // Extract style from tagline or description
        const tagline = beer.tagline.toLowerCase()
        if (tagline.includes('ipa')) return 'IPA'
        if (tagline.includes('lager')) return 'Lager'
        if (tagline.includes('stout')) return 'Stout'
        if (tagline.includes('pale ale')) return 'Pale Ale'
        if (tagline.includes('porter')) return 'Porter'
        if (tagline.includes('wheat')) return 'Wheat Beer'
        if (tagline.includes('sour')) return 'Sour'
        return 'Other'
      }))]
      return ['All', ...styles.filter(style => style !== 'Other')]
    } catch (error) {
      console.error('Error fetching beer styles:', error)
      return ['All', 'IPA', 'Lager', 'Stout', 'Pale Ale', 'Porter', 'Wheat Beer', 'Sour']
    }
  }
}

export default new BeerService()