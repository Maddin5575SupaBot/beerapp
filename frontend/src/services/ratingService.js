// Rating service for beer ratings and reviews
// In a real app, this would connect to a backend API

class RatingService {
  constructor() {
    // Initialize with localStorage for persistence
    this.storageKey = 'beerapp_ratings'
    this.ratings = this.loadRatings()
  }

  // Load ratings from localStorage
  loadRatings() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading ratings:', error)
      return {}
    }
  }

  // Save ratings to localStorage
  saveRatings() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.ratings))
    } catch (error) {
      console.error('Error saving ratings:', error)
    }
  }

  // Rate a beer (1-5 stars)
  rateBeer(beerId, rating, review = '', userId = 'anonymous') {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    const beerRatings = this.ratings[beerId] || []
    
    // Check if user already rated this beer
    const existingIndex = beerRatings.findIndex(r => r.userId === userId)
    
    if (existingIndex >= 0) {
      // Update existing rating
      beerRatings[existingIndex] = {
        ...beerRatings[existingIndex],
        rating,
        review,
        updatedAt: new Date().toISOString()
      }
    } else {
      // Add new rating
      beerRatings.push({
        userId,
        rating,
        review,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    this.ratings[beerId] = beerRatings
    this.saveRatings()
    
    return this.getBeerRatingStats(beerId)
  }

  // Get rating for a specific beer by user
  getUserRating(beerId, userId = 'anonymous') {
    const beerRatings = this.ratings[beerId] || []
    return beerRatings.find(r => r.userId === userId)
  }

  // Get all ratings for a beer
  getBeerRatings(beerId) {
    return this.ratings[beerId] || []
  }

  // Get rating statistics for a beer
  getBeerRatingStats(beerId) {
    const beerRatings = this.ratings[beerId] || []
    
    if (beerRatings.length === 0) {
      return {
        average: 0,
        count: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
    }

    const total = beerRatings.reduce((sum, r) => sum + r.rating, 0)
    const average = total / beerRatings.length
    
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    beerRatings.forEach(r => {
      distribution[r.rating]++
    })

    return {
      average: parseFloat(average.toFixed(1)),
      count: beerRatings.length,
      distribution
    }
  }

  // Get user's rated beers
  getUserRatedBeers(userId = 'anonymous') {
    const userRatings = []
    
    Object.entries(this.ratings).forEach(([beerId, ratings]) => {
      const userRating = ratings.find(r => r.userId === userId)
      if (userRating) {
        userRatings.push({
          beerId: parseInt(beerId),
          rating: userRating.rating,
          review: userRating.review,
          ratedAt: userRating.updatedAt
        })
      }
    })

    return userRatings.sort((a, b) => new Date(b.ratedAt) - new Date(a.ratedAt))
  }

  // Get top rated beers
  getTopRatedBeers(limit = 10) {
    const beerStats = []
    
    Object.entries(this.ratings).forEach(([beerId, ratings]) => {
      if (ratings.length >= 3) { // Only include beers with at least 3 ratings
        const stats = this.getBeerRatingStats(beerId)
        beerStats.push({
          beerId: parseInt(beerId),
          ...stats
        })
      }
    })

    return beerStats
      .sort((a, b) => b.average - a.average || b.count - a.count)
      .slice(0, limit)
  }

  // Delete a rating
  deleteRating(beerId, userId = 'anonymous') {
    const beerRatings = this.ratings[beerId] || []
    const filtered = beerRatings.filter(r => r.userId !== userId)
    
    if (filtered.length === 0) {
      delete this.ratings[beerId]
    } else {
      this.ratings[beerId] = filtered
    }
    
    this.saveRatings()
    return true
  }

  // Get recent ratings
  getRecentRatings(limit = 10) {
    const allRatings = []
    
    Object.entries(this.ratings).forEach(([beerId, ratings]) => {
      ratings.forEach(rating => {
        allRatings.push({
          beerId: parseInt(beerId),
          ...rating
        })
      })
    })

    return allRatings
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, limit)
  }

  // Clear all ratings (for testing)
  clearAllRatings() {
    this.ratings = {}
    this.saveRatings()
  }
}

export default new RatingService()