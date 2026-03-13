import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBeer, FaSearch, FaStar, FaUser, FaHome } from 'react-icons/fa'

const Navigation = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/beers', label: 'Beers', icon: <FaBeer /> },
    { path: '/search', label: 'Search', icon: <FaSearch /> },
    { path: '/ratings', label: 'Ratings', icon: <FaStar /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
  ]
  
  return (
    <nav className="sticky top-0 z-50 frosted-glass py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <FaBeer className="text-3xl text-beer-yellow animate-bubble" />
            <Link to="/" className="text-2xl font-display font-bold text-gradient">
              BeerApp
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-beer-amber text-beer-dark font-semibold'
                    : 'text-gray-300 hover:text-beer-yellow hover:bg-beer-dark/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary hidden md:flex items-center gap-2"
          >
            <FaBeer />
            <span>Sign In</span>
          </motion.button>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-2xl text-beer-yellow">
            <FaBeer />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation