import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaBeer, FaArrowLeft, FaShareAlt, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BeerDetailPage = () => {
  const { id } = useParams()
  
  // Mock data - in real app, this would come from an API based on the id
  const beer = {
    id: 1,
    name: 'Hoppy IPA',
    brewery: 'Craft Brew Co.',
    breweryLocation: 'Portland, Oregon',
    style: 'India Pale Ale',
    abv: '6.5%',
    ibu: '65',
    rating: 4.5,
    totalRatings: 1247,
    description: 'A bold and hoppy IPA with prominent citrus and pine notes. Brewed with a blend of American hops for a crisp, refreshing finish.',
    tastingNotes: ['Citrus', 'Pine', 'Grapefruit', 'Resin'],
    foodPairings: ['Spicy Foods', 'Grilled Meats', 'Sharp Cheeses'],
    servingTemp: '45-50°F (7-10°C)',
    glassware: 'IPA Glass or Pint Glass',
    availability: 'Year-round',
    awards: ['Gold Medal - Great American Beer Festival 2022'],
    image: 'https://images.unsplash.com/photo-1629734711235-0f8c5d2b5c1f?w=800'
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
      {/* Back Navigation */}
      <Link
        to="/beers"
        className="inline-flex items-center gap-2 text-beer-yellow hover:text-beer-amber transition-colors"
      >
        <FaArrowLeft />
        <span>Back to Beers</span>
      </Link>
      
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