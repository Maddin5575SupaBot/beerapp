import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaFilter, FaBeer, FaRandom, FaFire, FaSnowflake, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import combinedBeerService from '../services/combinedBeerService'
import BeerCard from './BeerCard'

const BeerFinder = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [beers, setBeers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    style: 'all',
    minABV: 0,
    maxABV: 15,
    minIBU: 0,
    maxIBU: 100,
    color: 'all',
    taste: 'all',
    sortBy: 'name',
    country: 'all'
  })
  const [styles, setStyles] = useState(['All'])
  const [countries, setCountries] = useState(['All'])

  useEffect(() => {
    loadBeers()
    loadStyles()
    loadCountries()
  }, [])

  const loadBeers = () => {
    setLoading(true)
    try {
      // Use combined beer service with all 131 beers from 14 countries
      const data = combinedBeerService.getAllBeers()
      setBeers(data)
    } catch (error) {
      console.error('Error loading beers:', error)
      setBeers([])
    } finally {
      setLoading(false)
    }
  }

  const loadStyles = () => {
    try {
      const allStyles = combinedBeerService.getAllStyles()
      setStyles(['All', ...allStyles])
    } catch (error) {
      console.error('Error loading styles:', error)
      setStyles(['All'])
    }
  }

  const loadCountries = () => {
    try {
      const allCountries = combinedBeerService.getAllCountries()
      setCountries(['All', ...allCountries])
    } catch (error) {
      console.error('Error loading countries:', error)
      setCountries(['All'])
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      loadBeers()
      return
    }

    setLoading(true)
    try {
      // Search in combined database with all 131 beers
      const data = combinedBeerService.searchBeers(searchQuery)
      setBeers(data)
    } catch (error) {
      console.error('Error searching beers:', error)
      setBeers([])
    } finally {
      setLoading(false)
    }
  }

  const handleRandomBeer = () => {
    setLoading(true)
    try {
      // Get random beer from combined database
      const randomBeer = combinedBeerService.getRandomBeer()
      setBeers([randomBeer])
    } catch (error) {
      console.error('Error getting random beer:', error)
      setBeers([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    setLoading(true)
    try {
      // Get all beers from combined database
      let data = combinedBeerService.getAllBeers()
      
      // Apply country filter
      if (filters.country !== 'all') {
        data = data.filter(beer => beer.brewery_country === filters.country)
      }
      
      // Apply ABV filter
      if (filters.minABV > 0 || filters.maxABV < 15) {
        data = data.filter(beer => {
          const abv = beer.abv || 0
          return abv >= filters.minABV && abv <= filters.maxABV
        })
      }
      
      // Apply IBU filter
      if (filters.minIBU > 0 || filters.maxIBU < 100) {
        data = data.filter(beer => {
          const ibu = beer.ibu || 0
          return ibu >= filters.minIBU && ibu <= filters.maxIBU
        })
      }
      
      // Apply style filter
      if (filters.style !== 'all') {
        data = data.filter(beer => {
          const beerStyle = beer.style || ''
          return beerStyle.toLowerCase().includes(filters.style.toLowerCase())
        })
      }
      
      // Apply sorting
      data.sort((a, b) => {
        switch (filters.sortBy) {
          case 'abv':
            return (b.abv || 0) - (a.abv || 0)
          case 'ibu':
            return (b.ibu || 0) - (a.ibu || 0)
          case 'name':
            return (a.name || '').localeCompare(b.name || '')
          default:
            return 0
        }
      })
      
      setBeers(data)
    } catch (error) {
      console.error('Error applying filters:', error)
      setBeers([])
    } finally {
      setLoading(false)
    }
  }

  const getQuickFilters = () => {
    return [
      { label: t('lightBeers'), icon: <FaSnowflake />, filter: { minABV: 0, maxABV: 4.5 } },
      { label: t('strongBeers'), icon: <FaFire />, filter: { minABV: 7, maxABV: 15 } },
      { label: t('sessionBeers'), icon: <FaBeer />, filter: { minABV: 3, maxABV: 5 } },
      { label: 'German Pilsner', icon: <FaBeer />, filter: { style: 'Pilsner', country: 'Germany' } },
      { label: 'Belgian Trappist', icon: <FaBeer />, filter: { style: 'Trappist', country: 'Belgium' } },
      { label: 'Czech Lagers', icon: <FaBeer />, filter: { country: 'Czech Republic' } }
    ]
  }

  const applyQuickFilter = (filter) => {
    setFilters(prev => ({ ...prev, ...filter }))
    setTimeout(() => applyFilters(), 100)
  }

  return (
    <div className="space-y-8">
      {/* Database Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-beer p-6"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-beer-yellow mb-2">
            <FaGlobe className="inline mr-2" />
            Beer Database
          </h3>
          <p className="text-gray-400 text-sm">
            131 beers from 14 countries - All in one search
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-beer-dark/30 rounded-lg">
            <div className="text-2xl font-bold text-beer-yellow">131</div>
            <div className="text-sm text-gray-300">Total Beers</div>
          </div>
          <div className="p-4 bg-beer-dark/30 rounded-lg">
            <div className="text-2xl font-bold text-beer-yellow">14</div>
            <div className="text-sm text-gray-300">Countries</div>
          </div>
          <div className="p-4 bg-beer-dark/30 rounded-lg">
            <div className="text-2xl font-bold text-beer-yellow">61</div>
            <div className="text-sm text-gray-300">German/Austrian</div>
          </div>
          <div className="p-4 bg-beer-dark/30 rounded-lg">
            <div className="text-2xl font-bold text-beer-yellow">70</div>
            <div className="text-sm text-gray-300">International</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-400">
          <span className="text-beer-yellow font-semibold">
            Search across all beers from Germany, Austria, Belgium, Czech Republic, UK, Ireland, and more!
          </span>
        </div>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-beer p-6"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('search') + " " + t('beer') + " " + t('byNameStyleBrewery')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="input-beer w-full pl-12 pr-4"
            />
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="btn-primary flex items-center gap-2"
            >
              <FaSearch />
              <span>{t('search')}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRandomBeer}
              className="btn-secondary flex items-center gap-2"
            >
              <FaRandom />
              <span>{t('random')}</span>
            </motion.button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-beer-yellow">{t('quickFilters')}</h3>
          <div className="flex flex-wrap gap-2">
            {getQuickFilters().map((quickFilter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyQuickFilter(quickFilter.filter)}
                className="flex items-center gap-2 px-4 py-2 bg-beer-dark/50 border border-beer-amber/30 rounded-lg text-gray-300 hover:bg-beer-amber hover:text-beer-dark transition-colors"
              >
                {quickFilter.icon}
                <span>{quickFilter.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Advanced Filters - Based on Martin's requirements */}
        <div className="grid md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('brewingStyle')}</label>
            <select
              value={filters.style}
              onChange={(e) => handleFilterChange('style', e.target.value)}
              className="input-beer w-full"
            >
              {styles.map(style => (
                <option key={style} value={style.toLowerCase()}>
                  {style}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Country</label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="input-beer w-full"
            >
              {countries.map(country => (
                <option key={country} value={country === 'All' ? 'all' : country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('alcoholLevel')} ({t('abv')})</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="15"
                step="0.1"
                value={filters.minABV}
                onChange={(e) => handleFilterChange('minABV', parseFloat(e.target.value))}
                className="input-beer w-20"
                placeholder={t('min')}
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                max="15"
                step="0.1"
                value={filters.maxABV}
                onChange={(e) => handleFilterChange('maxABV', parseFloat(e.target.value))}
                className="input-beer w-20"
                placeholder={t('max')}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('bitterness')} ({t('ibu')})</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={filters.minIBU}
                onChange={(e) => handleFilterChange('minIBU', parseInt(e.target.value))}
                className="input-beer w-20"
                placeholder={t('min')}
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={filters.maxIBU}
                onChange={(e) => handleFilterChange('maxIBU', parseInt(e.target.value))}
                className="input-beer w-20"
                placeholder={t('max')}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('color')}</label>
            <select
              value={filters.color}
              onChange={(e) => handleFilterChange('color', e.target.value)}
              className="input-beer w-full"
            >
              <option value="all">{t('allColors')}</option>
              <option value="pale">{t('paleYellow')}</option>
              <option value="amber">{t('amberCopper')}</option>
              <option value="brown">{t('brownDark')}</option>
              <option value="black">{t('blackStout')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('tasteProfile')}</label>
            <select
              value={filters.taste}
              onChange={(e) => handleFilterChange('taste', e.target.value)}
              className="input-beer w-full"
            >
              <option value="all">{t('allTastes')}</option>
              <option value="hoppy">{t('hoppyBitter')}</option>
              <option value="malty">{t('maltySweet')}</option>
              <option value="fruity">{t('fruityCitrus')}</option>
              <option value="roasty">{t('roastyChocolate')}</option>
              <option value="sour">{t('sourTart')}</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={applyFilters}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <FaFilter />
            <span>{t('applyFilters')}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-beer-yellow">
            {t('found')} {beers.length} {t('beers')}
          </h2>
          {loading && (
            <div className="text-beer-yellow animate-pulse">
              {t('loading')}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card-beer p-6 animate-pulse">
                <div className="h-48 bg-beer-dark/50 rounded-lg mb-4"></div>
                <div className="h-4 bg-beer-dark/50 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-beer-dark/50 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-beer-dark/50 rounded w-full mb-2"></div>
                <div className="h-3 bg-beer-dark/50 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : beers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {beers.map((beer, index) => (
              <motion.div
                key={beer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BeerCard beer={{
                  ...beer,
                  brewery: beer.brewery || 'Unknown Brewery',
                  style: beer.tagline?.split(' ')[0] || 'Craft Beer',
                  rating: 4.0 + (beer.abv / 20), // Mock rating based on ABV
                  description: beer.description || 'A delicious craft beer'
                }} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 card-beer">
            <FaSearch className="text-6xl text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-300">
              {t('noBeersFound')}
            </h3>
            <p className="text-gray-400 mb-6">
              {t('tryDifferentFilters')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({
                  style: 'all',
                  minABV: 0,
                  maxABV: 15,
                  minIBU: 0,
                  maxIBU: 100,
                  color: 'all',
                  taste: 'all',
                  sortBy: 'name'
                })
                loadBeers()
              }}
              className="btn-primary"
            >
              {t('clearAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BeerFinder