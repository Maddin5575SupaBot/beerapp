import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaFlag, FaStar, FaChartLine, FaGlobe, FaBeer } from 'react-icons/fa'

// Sample data for demonstration
const SAMPLE_RANKINGS = [
  {
    country: { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    topBeers: [
      { name: 'Bitburger', rating: 4.7, votes: 1250, style: 'Pilsner' },
      { name: 'Krombacher', rating: 4.6, votes: 1100, style: 'Pilsner' },
      { name: 'Warsteiner', rating: 4.5, votes: 980, style: 'Pilsner' },
      { name: 'Paulaner', rating: 4.8, votes: 850, style: 'Hefeweizen' },
      { name: 'Weihenstephaner', rating: 4.9, votes: 720, style: 'Hefeweizen' }
    ]
  },
  {
    country: { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    topBeers: [
      { name: 'Stella Artois', rating: 4.5, votes: 950, style: 'Pilsner' },
      { name: 'Leffe Blonde', rating: 4.7, votes: 820, style: 'Belgian Ale' },
      { name: 'Duvel', rating: 4.8, votes: 780, style: 'Strong Pale Ale' },
      { name: 'Chimay Blue', rating: 4.9, votes: 650, style: 'Trappist' },
      { name: 'Westmalle Tripel', rating: 4.9, votes: 620, style: 'Tripel' }
    ]
  },
  {
    country: { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
    topBeers: [
      { name: 'Pilsner Urquell', rating: 4.8, votes: 1100, style: 'Pilsner' },
      { name: 'Budweiser Budvar', rating: 4.6, votes: 920, style: 'Lager' },
      { name: 'Staropramen', rating: 4.4, votes: 780, style: 'Lager' },
      { name: 'Kozel', rating: 4.5, votes: 690, style: 'Lager' },
      { name: 'Bernard', rating: 4.7, votes: 580, style: 'Various' }
    ]
  },
  {
    country: { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    topBeers: [
      { name: 'Guinness', rating: 4.7, votes: 1500, style: 'Stout' },
      { name: 'Newcastle Brown Ale', rating: 4.4, votes: 820, style: 'Brown Ale' },
      { name: 'Fuller\'s London Pride', rating: 4.6, votes: 710, style: 'Bitter' },
      { name: 'Boddingtons', rating: 4.3, votes: 590, style: 'Bitter' },
      { name: 'Bass', rating: 4.2, votes: 480, style: 'Pale Ale' }
    ]
  },
  {
    country: { code: 'US', name: 'United States', flag: '🇺🇸' },
    topBeers: [
      { name: 'Budweiser', rating: 4.2, votes: 1800, style: 'Lager' },
      { name: 'Coors', rating: 4.1, votes: 1500, style: 'Lager' },
      { name: 'Miller', rating: 4.1, votes: 1450, style: 'Lager' },
      { name: 'Sierra Nevada Pale Ale', rating: 4.7, votes: 920, style: 'Pale Ale' },
      { name: 'Sam Adams Boston Lager', rating: 4.5, votes: 850, style: 'Lager' }
    ]
  }
]

const RegionalRankings = () => {
  const [selectedCountry, setSelectedCountry] = useState(SAMPLE_RANKINGS[0])
  const [rankings, setRankings] = useState(SAMPLE_RANKINGS)
  const [sortBy, setSortBy] = useState('rating') // rating, votes, name

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulate loading real data
    const storedRatings = JSON.parse(localStorage.getItem('beerapp_regional_ratings') || '[]')
    
    if (storedRatings.length > 0) {
      // Process real ratings to create rankings
      const countryMap = {}
      
      storedRatings.forEach(rating => {
        const countryCode = rating.regionalData.countryCode
        if (!countryMap[countryCode]) {
          countryMap[countryCode] = {
            country: rating.country,
            beers: {}
          }
        }
        
        const beerName = rating.beerDetails.brand
        if (!countryMap[countryCode].beers[beerName]) {
          countryMap[countryCode].beers[beerName] = {
            name: beerName,
            ratings: [],
            totalRating: 0,
            style: rating.beerDetails.style || rating.beerDetails.customStyle || 'Unknown'
          }
        }
        
        countryMap[countryCode].beers[beerName].ratings.push(rating.rating)
        countryMap[countryCode].beers[beerName].totalRating += rating.rating
      })
      
      // Convert to ranking format
      const realRankings = Object.values(countryMap).map(countryData => {
        const beers = Object.values(countryData.beers).map(beer => ({
          name: beer.name,
          rating: beer.totalRating / beer.ratings.length,
          votes: beer.ratings.length,
          style: beer.style
        }))
        
        // Sort by rating
        beers.sort((a, b) => b.rating - a.rating)
        
        return {
          country: countryData.country,
          topBeers: beers.slice(0, 5)
        }
      })
      
      if (realRankings.length > 0) {
        setRankings(realRankings)
        setSelectedCountry(realRankings[0])
      }
    }
  }, [])

  const getSortedBeers = (beers) => {
    return [...beers].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'votes') return b.votes - a.votes
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }

  const getGlobalTopBeers = () => {
    const allBeers = []
    rankings.forEach(countryRanking => {
      countryRanking.topBeers.forEach(beer => {
        allBeers.push({
          ...beer,
          country: countryRanking.country
        })
      })
    })
    
    return allBeers
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaTrophy className="text-4xl text-beer-yellow" />
          <h2 className="text-3xl font-display font-bold text-beer-yellow">
            Regional Beer Rankings
          </h2>
          <FaGlobe className="text-4xl text-beer-amber" />
        </div>
        <p className="text-gray-300 text-lg">
          Discover the most loved beers by country and region
        </p>
      </motion.div>

      {/* Country Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow flex items-center gap-2">
          <FaFlag />
          <span>Select Country</span>
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {rankings.map((ranking, index) => (
            <button
              key={ranking.country.code}
              onClick={() => setSelectedCountry(ranking)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                selectedCountry?.country.code === ranking.country.code
                  ? 'bg-beer-amber text-beer-dark font-semibold'
                  : 'bg-beer-dark/50 text-gray-300 hover:bg-beer-dark'
              }`}
            >
              <span className="text-2xl">{ranking.country.flag}</span>
              <span>{ranking.country.name}</span>
              <span className="text-sm opacity-75">({ranking.topBeers.length})</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Country Rankings */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Country Header */}
          <div className="card-beer p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedCountry.country.flag}</span>
                <div>
                  <h3 className="text-2xl font-display font-bold text-beer-yellow">
                    {selectedCountry.country.name}
                  </h3>
                  <p className="text-gray-400">
                    Most loved beers according to local ratings
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-beer-dark/50 border border-beer-amber/30 rounded-lg px-3 py-2 text-gray-300"
                >
                  <option value="rating">Rating</option>
                  <option value="votes">Votes</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Beer Rankings Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-beer-amber/20">
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Rank</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Beer</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Style</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Rating</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Votes</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedBeers(selectedCountry.topBeers).map((beer, index) => (
                    <motion.tr
                      key={beer.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-beer-amber/10 hover:bg-beer-dark/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index === 0 ? 'bg-beer-yellow text-beer-dark' :
                          index === 1 ? 'bg-gray-400 text-beer-dark' :
                          index === 2 ? 'bg-beer-brown text-beer-yellow' :
                          'bg-beer-dark/50 text-gray-300'
                        } font-bold`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <FaBeer className="text-beer-amber" />
                          <div>
                            <div className="font-semibold text-gray-300">{beer.name}</div>
                            <div className="text-sm text-gray-400">Local favorite</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-beer-dark/50 rounded-full text-sm text-gray-300">
                          {beer.style}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <FaStar className="text-beer-yellow" />
                          <span className="font-bold text-gray-300">{beer.rating.toFixed(1)}</span>
                          <span className="text-gray-400 text-sm">/5.0</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-300 font-medium">{beer.votes.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-32 bg-beer-dark/50 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-beer-amber to-beer-yellow h-2 rounded-full"
                            style={{ width: `${(beer.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-beer p-6 text-center">
              <div className="text-3xl font-bold text-beer-yellow mb-2">
                {selectedCountry.topBeers.length}
              </div>
              <div className="text-gray-300">Ranked Beers</div>
            </div>
            
            <div className="card-beer p-6 text-center">
              <div className="text-3xl font-bold text-beer-yellow mb-2">
                {selectedCountry.topBeers.reduce((sum, beer) => sum + beer.votes, 0).toLocaleString()}
              </div>
              <div className="text-gray-300">Total Votes</div>
            </div>
            
            <div className="card-beer p-6 text-center">
              <div className="text-3xl font-bold text-beer-yellow mb-2">
                {(selectedCountry.topBeers.reduce((sum, beer) => sum + beer.rating, 0) / selectedCountry.topBeers.length).toFixed(1)}
              </div>
              <div className="text-gray-300">Avg Rating</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Global Top 10 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-6 text-beer-yellow flex items-center gap-2">
          <FaGlobe />
          <span>Global Top 10 Beers</span>
        </h3>
        
        <div className="space-y-4">
          {getGlobalTopBeers().map((beer, index) => (
            <motion.div
              key={`${beer.name}-${beer.country.code}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-beer-dark/30 rounded-lg hover:bg-beer-dark/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index === 0 ? 'bg-beer-yellow text-beer-dark' :
                  index === 1 ? 'bg-gray-400 text-beer-dark' :
                  index === 2 ? 'bg-beer-brown text-beer-yellow' :
                  'bg-beer-dark/50 text-gray-300'
                } font-bold`}>
                  {index + 1}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{beer.country.flag}</span>
                  <div>
                    <div className="font-semibold text-gray-300">{beer.name}</div>
                    <div className="text-sm text-gray-400">{beer.country.name} • {beer.style}</div>
                  </div>
                </div>
              </div>
              
