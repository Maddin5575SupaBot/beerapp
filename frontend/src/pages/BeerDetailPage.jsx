import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaBeer, FaArrowLeft, FaShareAlt, FaHeart, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import beerService from '../services/beerService'
import germanAustrianBeerService from '../services/germanAustrianBeerService'

const BeerDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [beer, setBeer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dataSource, setDataSource] = useState('unknown') // 'german', 'international', or 'unknown'
  
  useEffect(() => {
    const fetchBeerDetails = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // First, try to find the beer in German/Austrian database
        const germanBeer = germanAustrianBeerService.getBeerById(parseInt(id))
        
        if (germanBeer) {
          setBeer({
            ...germanBeer,
            breweryLocation: `${germanBeer.brewery_city}, ${germanBeer.brewery_country}`,
            rating: 4.2 + (Math.random() * 0.6), // Random rating between 4.2-4.8
            totalRatings: Math.floor(Math.random() * 500) + 100,
            tastingNotes: getTastingNotes(germanBeer.style, germanBeer.description),
            foodPairings: getFoodPairings(germanBeer.style),
            servingTemp: getServingTemp(germanBeer.style),
            glassware: getGlassware(germanBeer.style),
            availability: 'Year-round',
            awards: getAwards(germanBeer.brewery, germanBeer.name),
            image: 'https://images.unsplash.com/photo-1629734711235-0f8c5d2b5c1f?w=800'
          })
          setDataSource('german')
        } else {
          // If not found in German database, try international API
          try {
            const internationalBeer = await beerService.getBeerById(id)
            if (internationalBeer) {
              setBeer({
                ...internationalBeer,
                breweryLocation: internationalBeer.brewers_tips || 'Unknown location',
                rating: 4.0 + (Math.random() * 1.0), // Random rating between 4.0-5.0
                totalRatings: Math.floor(Math.random() * 1000) + 500,
                tastingNotes: getTastingNotes(internationalBeer.tagline, internationalBeer.description),
                foodPairings: getFoodPairings(internationalBeer.tagline),
                servingTemp: getServingTemp(internationalBeer.tagline),
                glassware: getGlassware(internationalBeer.tagline),
                availability: 'Year-round',
                awards: getAwards(internationalBeer.name, internationalBeer.tagline),
                image: internationalBeer.image_url || 'https://images.unsplash.com/photo-1629734711235-0f8c5d2b5c1f?w=800'
              })
              setDataSource('international')
            } else {
              throw new Error('Beer not found')
            }
          } catch (apiError) {
            throw new Error('Beer not found in any database')
          }
        }
      } catch (err) {
        setError(err.message)
        setBeer(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBeerDetails()
  }, [id])
  
  // Helper functions to generate dynamic content
  const getTastingNotes = (style, description) => {
    const notes = []
    const desc = (description || '').toLowerCase()
    const styleLower = (style || '').toLowerCase()
    
    if (desc.includes('citrus') || styleLower.includes('ipa')) notes.push('Citrus')
    if (desc.includes('pine') || styleLower.includes('ipa')) notes.push('Pine')
    if (desc.includes('malty') || styleLower.includes('lager')) notes.push('Malty')
    if (desc.includes('hoppy') || styleLower.includes('ipa')) notes.push('Hoppy')
    if (desc.includes('caramel') || styleLower.includes('amber')) notes.push('Caramel')
    if (desc.includes('roast') || styleLower.includes('stout')) notes.push('Roasted')
    if (desc.includes('coffee') || styleLower.includes('stout')) notes.push('Coffee')
    if (desc.includes('chocolate') || styleLower.includes('stout')) notes.push('Chocolate')
    if (desc.includes('fruit') || styleLower.includes('weizen')) notes.push('Fruity')
    if (desc.includes('banana') || styleLower.includes('weizen')) notes.push('Banana')
    if (desc.includes('clove') || styleLower.includes('weizen')) notes.push('Clove')
    if (desc.includes('spice') || styleLower.includes('pilsner')) notes.push('Spicy')
    if (desc.includes('crisp') || styleLower.includes('pilsner')) notes.push('Crisp')
    
    // Ensure we have at least 2 notes
    if (notes.length < 2) {
      const defaultNotes = ['Smooth', 'Refreshing', 'Balanced', 'Complex']
      notes.push(...defaultNotes.slice(0, 2 - notes.length))
    }
    
    return notes.slice(0, 4) // Max 4 notes
  }
  
  const getFoodPairings = (style) => {
    const styleLower = (style || '').toLowerCase()
    
    if (styleLower.includes('ipa')) {
      return ['Spicy Foods', 'Grilled Meats', 'Sharp Cheeses', 'Burgers']
    } else if (styleLower.includes('stout')) {
      return ['Chocolate Desserts', 'BBQ', 'Oysters', 'Steak']
    } else if (styleLower.includes('lager') || styleLower.includes('pilsner')) {
      return ['Seafood', 'Salads', 'Light Appetizers', 'Pizza']
    } else if (styleLower.includes('weizen') || styleLower.includes('wheat')) {
      return ['Fruit Salads', 'Light Pastas', 'Chicken', 'Sausages']
    } else if (styleLower.includes('amber') || styleLower.includes('brown')) {
      return ['Roasted Meats', 'Stews', 'Nutty Cheeses', 'Pork']
    } else {
      return ['Grilled Foods', 'Cheese Plates', 'Pub Fare', 'Comfort Food']
    }
  }
  
  const getServingTemp = (style) => {
    const styleLower = (style || '').toLowerCase()
    
    if (styleLower.includes('stout') || styleLower.includes('porter')) {
      return '50-55°F (10-13°C)'
    } else if (styleLower.includes('lager') || styleLower.includes('pilsner')) {
      return '40-45°F (4-7°C)'
    } else if (styleLower.includes('ipa') || styleLower.includes('pale')) {
      return '45-50°F (7-10°C)'
    } else if (styleLower.includes('weizen') || styleLower.includes('wheat')) {
      return '45-50°F (7-10°C)'
    } else {
      return '45-50°F (7-10°C)'
    }
  }
  
  const getGlassware = (style) => {
    const styleLower = (style || '').toLowerCase()
    
    if (styleLower.includes('stout') || styleLower.includes('porter')) {
      return 'Snifter or Pint Glass'
    } else if (styleLower.includes('lager') || styleLower.includes('pilsner')) {
      return 'Pilsner Glass or Pint Glass'
    } else if (styleLower.includes('ipa') || styleLower.includes('pale')) {
      return 'IPA Glass or Tulip Glass'
    } else if (styleLower.includes('weizen') || styleLower.includes('wheat')) {
      return 'Weizen Glass'
    } else {
      return 'Pint Glass'
    }
  }
  
  const getAwards = (brewery, name) => {
    const awards = []
    const breweryLower = (brewery || '').toLowerCase()
    const nameLower = (name || '').toLowerCase()
    
    // German brewery awards
    if (breweryLower.includes('binding')) {
      awards.push('Gold Medal - German Beer Awards 2023')
    }
    if (breweryLower.includes('bitburger')) {
      awards.push('DLG Gold Medal - Quality Award')
    }
    if (breweryLower.includes('krombacher')) {
      awards.push('Germany\'s #1 Pilsner - Sales Ranking')
    }
    if (breweryLower.includes('warsteiner')) {
      awards.push('International Beer Award 2022')
    }
    if (breweryLower.includes('paulaner') || nameLower.includes('weizen')) {
      awards.push('World Beer Cup - Gold Medal')
    }
    if (breweryLower.includes('weihenstephan')) {
      awards.push('World\'s Oldest Brewery - Since 1040')
    }
    
    // Generic awards if none specific
    if (awards.length === 0) {
      awards.push('Local Favorite - Community Choice')
      awards.push('Craft Beer Excellence Award')
    }
    
    return awards.slice(0, 2) // Max 2 awards
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-beer-yellow mx-auto mb-4"></div>
          <p className="text-gray-300">Loading beer details...</p>
        </div>
      </div>
    )
  }
  
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-2xl ${
            i < Math.floor(rating)
              ? 'text-beer-yellow fill-current'
              : 'text-gray-600'
          }`}
        />
      )
    }
    return stars
  }
  
  if (error || !beer) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍺</div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Beer Not Found</h2>
        <p className="text-gray-400 mb-6">We couldn't find the beer you're looking for.</p>
        <button
          onClick={() => navigate('/finder')}
          className="btn-primary px-6 py-3"
        >
          <FaArrowLeft className="inline mr-2" />
          Back to Beer Finder
        </button>
      </div>
    )
  }
  
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-2xl ${
            i < Math.floor(rating)
              ? 'text-beer-yellow fill-current'
              : 'text-gray-600'
          }`}
        />
      )
    }
    return stars
  }
  
  return (
    <div className="space-y-8">
      {/* Back Navigation and Data Source Indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          to="/finder"
          className="inline-flex items-center gap-2 text-beer-yellow hover:text-beer-amber transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Beer Finder</span>
        </Link>
        
        {/* Data Source Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          dataSource === 'german' 
            ? 'bg-gradient-to-r from-beer-amber/20 to-beer-yellow/20 border border-beer-amber/30' 
            : 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30'
        }`}>
          {dataSource === 'german' ? (
            <>
              <FaMapMarkerAlt className="text-beer-amber" />
              <span className="text-beer-yellow font-semibold">German/Austrian Beer</span>
            </>
          ) : (
            <>
              <FaGlobe className="text-blue-400" />
              <span className="text-blue-300 font-semibold">International Craft Beer</span>
            </>
          )}
        </div>
      </div>
      
      {/* Beer Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-8 items-start"
      >
        {/* Beer Image/Icon */}
        <div className="card-beer p-8 flex items-center justify-center">
          <div className="relative">
            <FaBeer className="text-48 md:text-64 text-beer-amber/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaBeer className="text-32 md:text-48 text-beer-yellow animate-bubble" />
            </div>
          </div>
        </div>
        
        {/* Beer Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-100 mb-2">
              {beer.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-xl text-beer-yellow">{beer.brewery}</span>
              <span>•</span>
              <span>{beer.breweryLocation}</span>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(beer.rating)}
              <span className="text-2xl font-bold text-gray-100 ml-2">
                {beer.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-400">
              ({beer.totalRatings.toLocaleString()} ratings)
            </span>
          </div>
          
          {/* Style and Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card-beer p-4">
              <div className="text-sm text-gray-400">Style</div>
              <div className="text-lg font-semibold text-beer-yellow">{beer.style}</div>
            </div>
            <div className="card-beer p-4">
              <div className="text-sm text-gray-400">ABV</div>
              <div className="text-lg font-semibold text-beer-yellow">{beer.abv}</div>
            </div>
            <div className="card-beer p-4">
              <div className="text-sm text-gray-400">IBU</div>
              <div className="text-lg font-semibold text-beer-yellow">{beer.ibu}</div>
            </div>
            <div className="card-beer p-4">
              <div className="text-sm text-gray-400">Availability</div>
              <div className="text-lg font-semibold text-beer-yellow">{beer.availability}</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <FaStar />
              <span>Rate This Beer</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center gap-2 px-6"
            >
              <FaHeart />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center gap-2 px-6"
            >
              <FaShareAlt />
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Description and Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {/* Description */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <div className="card-beer">
            <h2 className="text-2xl font-semibold mb-4 text-beer-yellow">Description</h2>
            <p className="text-gray-300 leading-relaxed">{beer.description}</p>
          </div>
          
          {/* Tasting Notes */}
          <div className="card-beer">
            <h2 className="text-2xl font-semibold mb-4 text-beer-yellow">Tasting Notes</h2>
            <div className="flex flex-wrap gap-3">
              {beer.tastingNotes.map((note, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-beer-amber/20 text-beer-yellow rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
          
          {/* Food Pairings */}
          <div className="card-beer">
            <h2 className="text-2xl font-semibold mb-4 text-beer-yellow">Food Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {beer.foodPairings.map((food, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-beer-dark/50 text-gray-300 border border-beer-amber/30 rounded-full"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar Details */}
        <div className="space-y-6">
          {/* Serving Suggestions */}
          <div className="card-beer">
            <h3 className="text-xl font-semibold mb-4 text-beer-yellow">Serving Suggestions</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400">Temperature</div>
                <div className="text-lg font-semibold">{beer.servingTemp}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Glassware</div>
                <div className="text-lg font-semibold">{beer.glassware}</div>
              </div>
            </div>
          </div>
          
          {/* Awards */}
          {beer.awards && beer.awards.length > 0 && (
            <div className="card-beer">
              <h3 className="text-xl font-semibold mb-4 text-beer-yellow">Awards</h3>
              <ul className="space-y-2">
                {beer.awards.map((award, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaStar className="text-beer-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Brewery Info */}
          <div className="card-beer">
            <h3 className="text-xl font-semibold mb-4 text-beer-yellow">Brewery</h3>
            <div className="space-y-2">
              <div className="text-lg font-semibold">{beer.brewery}</div>
              <div className="text-gray-400">{beer.breweryLocation}</div>
              <button className="w-full mt-4 py-2 text-center border border-beer-amber/30 text-beer-yellow rounded-lg hover:bg-beer-amber hover:text-beer-dark transition-colors">
                View Brewery Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Similar Beers Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-beer-yellow">
          Similar Beers You Might Like
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-beer p-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl text-beer-amber">
                  <FaBeer />
                </div>
                <div>
                  <div className="font-semibold">Citrus IPA</div>
                  <div className="text-sm text-gray-400">6.2% ABV • 4.3★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default BeerDetailPage