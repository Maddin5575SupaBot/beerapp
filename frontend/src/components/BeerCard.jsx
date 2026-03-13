import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaBeer, FaFire } from 'react-icons/fa'

const BeerCard = ({ beer }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-beer-yellow fill-current" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-beer-yellow fill-current opacity-50" />)
      } else {
        stars.push(<FaStar key={i} className="text-gray-600" />)
      }
    }
    
    return stars
  }
  
  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="card-beer group"
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <div className="h-48 bg-gradient-to-br from-beer-amber/20 to-beer-brown/30 flex items-center justify-center">
          <FaBeer className="text-8xl text-beer-amber/30 group-hover:scale-110 transition-transform duration-500" />
        </div>
        {beer.abv >= '7.0' && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <FaFire />
            <span>Strong</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-100 group-hover:text-beer-yellow transition-colors">
              {beer.name}
            </h3>
            <p className="text-gray-400">{beer.brewery}</p>
          </div>
          <span className="bg-beer-amber/20 text-beer-yellow px-3 py-1 rounded-full text-sm font-semibold">
            {beer.style}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-2">{beer.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="text-beer-yellow font-semibold">
              ABV: {beer.abv}
            </div>
            <div className="text-gray-400">
              IBU: {beer.ibu}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {renderStars(beer.rating)}
            <span className="ml-2 text-gray-300">{beer.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link
          to={`/beer/${beer.id}`}
          className="block w-full mt-4 py-3 text-center bg-beer-dark/50 border border-beer-amber/30 rounded-lg text-beer-yellow font-semibold hover:bg-beer-amber hover:text-beer-dark transition-all duration-300 group-hover:border-beer-amber"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default BeerCard