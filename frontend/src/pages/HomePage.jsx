import { motion } from 'framer-motion'
import { FaSearch, FaStar, FaBeer, FaArrowRight, FaCar, FaShieldAlt } from 'react-icons/fa'
import BeerCard from '../components/BeerCard'
import { Link } from 'react-router-dom'

const HomePage = () => {
  // Mock data for featured beers
  const featuredBeers = [
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
  ]
  
  const features = [
    {
      icon: <FaSearch />,
      title: 'Discover',
      description: 'Find new beers based on your taste preferences',
      path: '/finder'
    },
    {
      icon: <FaStar />,
      title: 'Rate',
      description: 'Rate beers and share your reviews with the community',
      path: '/rate/1'
    },
    {
      icon: <FaCar />,
      title: 'Safety',
      description: 'Drink n Drive safety calculator and educational tools',
      path: '/safety'
    }
  ]
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
          <span className="text-gradient">Discover Your Next</span>
          <br />
          <span className="text-beer-yellow">Favorite Beer</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Explore thousands of beers, rate your favorites, and get personalized recommendations 
          from the world's largest beer community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/finder">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <FaSearch />
              <span>Explore Beers</span>
              <FaArrowRight />
            </motion.button>
          </Link>
          <Link to="/rate/1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <FaStar />
              <span>Rate Beers</span>
            </motion.button>
          </Link>
          <Link to="/safety">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center gap-2 bg-red-900/30 hover:bg-red-900/50 border-red-700/50"
            >
              <FaShieldAlt />
              <span>Safety Tool</span>
            </motion.button>
          </Link>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="py-12"
      >
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-beer-yellow">
          Why BeerApp?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-beer text-center p-8 hover:bg-beer-dark/50 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl text-beer-yellow mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>
      
      {/* Featured Beers Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-12"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-beer-yellow">
            Featured Beers
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center gap-2"
          >
            <span>View All</span>
            <FaArrowRight />
          </motion.button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center py-16 card-beer"
      >
        <h2 className="text-4xl font-display font-bold mb-6">
          Ready to <span className="text-gradient">Explore</span>?
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Join thousands of beer enthusiasts discovering, rating, and sharing their beer experiences.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-lg px-8 py-4"
        >
          Get Started Free
        </motion.button>
      </motion.section>
    </div>
  )
}

export default HomePage