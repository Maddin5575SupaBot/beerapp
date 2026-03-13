import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaSort, FaSearch } from 'react-icons/fa'
import BeerCard from '../components/BeerCard'

const BeerListPage = () => {
  const [search, setSearch] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  
  // Mock data - in real app, this would come from an API
  const beers = [
    {
      id: 1,
      name: 'Hoppy IPA',
      brewery: 'Craft Brew Co.',
      style: 'IPA',
      abv: '6.5%',
      ibu: '65',
      rating: 4.5,
      description: 'A bold IPA with citrus and pine notes',
      image: 'https://images.unsplash.com/photo-1629734711235-0f8c5d2b5c1f?w=400'
    },
    {
      id: 2,
      name: 'Amber Ale',
      brewery: 'Traditional Brews',
      style: 'Amber Ale',
      abv: '5.2%',
      ibu: '25',
      rating: 4.2,
      description: 'Smooth and malty with caramel notes',
      image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w-400'
    },
    {
      id: 3,
      name: 'Stout Reserve',
      brewery: 'Dark Horse Brewery',
      style: 'Stout',
      abv: '8.0%',
      ibu: '45',
      rating: 4.8,
      description: 'Rich chocolate and coffee flavors',
      image: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=400'
    },
    {
      id: 4,
      name: 'Pilsner Premium',
      brewery: 'European Brews',
      style: 'Pilsner',
      abv: '4.8%',
      ibu: '30',
      rating: 4.0,
      description: 'Crisp and refreshing lager',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400'
    },
    {
      id: 5,
      name: 'Wheat Beer',
      brewery: 'Summer Brews',
      style: 'Wheat Beer',
      abv: '5.0%',
      ibu: '15',
      rating: 4.3,
      description: 'Light and fruity with banana notes',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400'
    },
    {
      id: 6,
      name: 'Porter Classic',
      brewery: 'Heritage Brewery',
      style: 'Porter',
      abv: '6.0%',
      ibu: '35',
      rating: 4.6,
      description: 'Dark and roasty with chocolate undertones',
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400'
    },
  ]
  
  const beerStyles = ['all', 'IPA', 'Amber Ale', 'Stout', 'Pilsner', 'Wheat Beer', 'Porter', 'Lager', 'Sour']
  
  const filteredBeers = beers.filter(beer => {
    const matchesSearch = beer.name.toLowerCase().includes(search.toLowerCase()) ||
                         beer.brewery.toLowerCase().includes(search.toLowerCase()) ||
                         beer.description.toLowerCase().includes(search.toLowerCase())
    const matchesStyle = selectedStyle === 'all' || beer.style === selectedStyle
    return matchesSearch && matchesStyle
  })
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold mb-4 text-gradient">
          Explore Beers
        </h1>
        <p className="text-gray-300">
          Discover {beers.length}+ beers from around the world
        </p>
      </motion.div>
      
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search beers, breweries, or styles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-beer w-full pl-12 pr-4"
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-300">
            <FaFilter />
            <span className="font-semibold">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {beerStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedStyle === style
                    ? 'bg-beer-amber text-beer-dark font-semibold'
                    : 'bg-beer-dark/50 text-gray-300 hover:bg-beer-dark hover:text-beer-yellow'
                }`}
              >
                {style === 'all' ? 'All Styles' : style}
              </button>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <FaSort className="text-gray-400" />
            <select className="input-beer bg-beer-dark/50">
              <option>Sort by: Rating</option>
              <option>Sort by: ABV</option>
              <option>Sort by: Name</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400"
      >
        Showing {filteredBeers.length} of {beers.length} beers
        {selectedStyle !== 'all' && ` in ${selectedStyle}`}
        {search && ` matching "${search}"`}
      </motion.div>
      
      {/* Beer Grid */}
      {filteredBeers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBeers.map((beer, index) => (
            <motion.div
              key={beer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <BeerCard beer={beer} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 card-beer"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-300">
            No beers found
          </h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedStyle('all')
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
      
      {/* Pagination */}
      {filteredBeers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-2 pt-8"
        >
          <button className="px-4 py-2 rounded-lg bg-beer-dark/50 text-gray-300 hover:bg-beer-dark">
            Previous
          </button>
          <button className="px-4 py-2 rounded-lg bg-beer-amber text-beer-dark font-semibold">
            1
          </button>
          <button className="px-4 py-2 rounded-lg bg-beer-dark/50 text-gray-300 hover:bg-beer-dark">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-beer-dark/50 text-gray-300 hover:bg-beer-dark">
            3
          </button>
          <button className="px-4 py-2 rounded-lg bg-beer-dark/50 text-gray-300 hover:bg-beer-dark">
            Next
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default BeerListPage