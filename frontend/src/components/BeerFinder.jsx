import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaFilter, FaBeer, FaRandom, FaFire, FaSnowflake } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import beerService from '../services/beerService'
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
    sortBy: 'name'
  })
  const [styles, setStyles] = useState(['All', 'IPA', 'Lager', 'Stout', 'Pale Ale', 'Wheat Beer'])

  useEffect(() => {
    loadBeers()
    loadStyles()
  }, [])

  const loadBeers = async () => {
    setLoading(true)
    try {
      const data = await beerService.getBeers(1, 20)
      setBeers(data)
    } catch (error) {
      console.error('Error loading beers:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStyles = async () => {
    try {
      const data = await beerService.getBeerStyles()
      setStyles(data)
    } catch (error) {
      console.error('Error loading styles:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadBeers()
      return
    }

    setLoading(true)
    try {
      const data = await beerService.searchBeers(searchQuery)
      setBeers(data)
    } catch (error) {
      console.error('Error searching beers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRandomBeer = async () => {
    setLoading(true)
    try {
      const randomBeer = await beerService.getRandomBeer()
      setBeers([randomBeer])
    } catch (error) {
      console.error('Error getting random beer:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = async () => {
    setLoading(true)
    try {
      let data
      
      if (filters.minABV > 0 || filters.maxABV < 15) {
        data = await beerService.getBeersByABV(filters.minABV, filters.maxABV)
      } else if (filters.minIBU > 0 || filters.maxIBU < 100) {
        data = await beerService.getBeersByIBU(filters.minIBU, filters.maxIBU)
      } else {
        data = await beerService.getBeers(1, 20)
      }
      
      // Apply style filter
      if (filters.style !== 'all') {
        data = data.filter(beer => 
          beer.tagline?.toLowerCase().includes(filters.style.toLowerCase()) ||
          beer.description?.toLowerCase().includes(filters.style.toLowerCase())
        )
      }
      
      // Apply color filter (based on beer characteristics)
      if (filters.color !== 'all') {
        data = data.filter(beer => {
          const abv = beer.abv || 0
          const description = (beer.description || '').toLowerCase()
          const tagline = (beer.tagline || '').toLowerCase()
          
          switch (filters.color) {
            case 'pale':
              return abv < 5.5 || description.includes('pale') || tagline.includes('pale')
            case 'amber':
              return (abv >= 5.5 && abv < 7) || description.includes('amber') || tagline.includes('amber')
            case 'brown':
              return description.includes('brown') || tagline.includes('brown') || description.includes('porter')
            case 'black':
              return description.includes('stout') || tagline.includes('stout') || description.includes('black')
            default:
              return true
          }
        })
      }
      
      // Apply taste filter
      if (filters.taste !== 'all') {
        data = data.filter(beer => {
          const description = (beer.description || '').toLowerCase()
          const tagline = (beer.tagline || '').toLowerCase()
          
          switch (filters.taste) {
            case 'hoppy':
              return description.includes('hoppy') || description.includes('bitter') || 
                     tagline.includes('ipa') || (beer.ibu || 0) > 40
            case 'malty':
              return description.includes('malty') || description.includes('sweet') ||
                     description.includes('caramel') || description.includes('toffee')
            case 'fruity':
              return description.includes('fruit') || description.includes('citrus') ||
                     description.includes('berry') || tagline.includes('fruit')
            case 'roasty':
              return description.includes('roast') || description.includes('chocolate') ||
                     description.includes('coffee') || description.includes('dark')
            case 'sour':
              return description.includes('sour') || description.includes('tart') ||
                     tagline.includes('sour') || description.includes('acid')
            default:
              return true
          }
        })
      }
      
      // Apply sorting
      data.sort((a, b) => {
        switch (filters.sortBy) {
          case 'abv':
            return b.abv - a.abv
          case 'ibu':
            return b.ibu - a.ibu
          case 'name':
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
      
      setBeers(data)
    } catch (error) {
      console.error('Error applying filters:', error)
    } finally {
      setLoading(false)
    }
  }

  const getQuickFilters = () => [
    { label: t('lightBeers'), icon: <FaSnowflake />, filter: { minABV: 0, maxABV: 4.5 } },
    { label: t('strongBeers'), icon: <FaFire />, filter: { minABV: 7, maxABV: 15 } },
    { label: t('hoppyIPAs'), icon: <FaBeer />, filter: { style: 'IPA', minIBU: 50 } },
    { label: t('sessionBeers'), icon: <FaBeer />, filter: { minABV: 3, maxABV: 5 } }
  ]

  const applyQuickFilter = (filter) => {
    setFilters(prev => ({ ...prev, ...filter }))
    setTimeout(() => applyFilters(), 100)
  }

  return (
    <div className="space-y-8">
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
        <div className="grid md:grid-cols-5 gap-4">
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