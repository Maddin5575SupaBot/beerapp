import { motion } from 'framer-motion'
import { FaSearch, FaStar, FaBeer, FaCar, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const HomePage = () => {
  const { t } = useLanguage()
  
  const mainActions = [
    {
      id: 1,
      icon: <FaSearch className="text-3xl" />,
      title: t('beerFinder'),
      description: 'Discover beers by style, ABV, or ingredients',
      path: '/finder',
      color: 'from-beer-amber to-beer-yellow',
      buttonText: 'Start Searching',
      delay: 0.1
    },
    {
      id: 2,
      icon: <FaStar className="text-3xl" />,
      title: t('rateBeer'),
      description: 'Quick & fun rating - see top beers in your country',
      path: '/rate',
      color: 'from-brewery-gold to-beer-amber',
      buttonText: 'Rate Now',
      delay: 0.2
    },
    {
      id: 3,
      icon: <FaCar className="text-3xl" />,
      title: t('safety'),
      description: 'Drink responsibly with our safety tools',
      path: '/safety',
      color: 'from-red-600 to-orange-500',
      buttonText: 'Check Safety',
      delay: 0.3
    }
  ]
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Centered and Compact */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* App Logo/Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaBeer className="text-4xl text-beer-yellow animate-bubble" />
              <h1 className="text-4xl font-display font-bold text-beer-yellow">
                BeerApp
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Your companion for beer discovery and responsible enjoyment
            </p>
          </motion.div>
          
          {/* Three Main Action Buttons */}
          <div className="space-y-6 mb-12">
            {mainActions.map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: action.delay }}
              >
                <Link to={action.path}>
                  <div className="group relative overflow-hidden rounded-2xl bg-beer-dark/50 border border-beer-amber/20 p-6 hover:bg-beer-dark/70 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                      {/* Icon with gradient background */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white`}>
                        {action.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {action.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {action.description}
                        </p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="text-beer-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaArrowRight className="text-xl" />
                      </div>
                    </div>
                    
                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-beer-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Quick Stats/Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-beer-brown/20 rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-beer-yellow">500+</div>
                <div className="text-sm text-gray-300">Beers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-beer-yellow">4.5★</div>
                <div className="text-sm text-gray-300">Avg Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-beer-yellow">100%</div>
                <div className="text-sm text-gray-300">Safe Drinking</div>
              </div>
            </div>
          </motion.div>
          
          {/* Safety Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-gray-400">
              <span className="text-red-400 font-semibold">⚠️ {t('safetyFirst')}:</span> {t('drinkResponsibly')}. 
              {t('neverDrinkAndDrive')}.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Minimal Footer */}
      <footer className="py-6 border-t border-beer-amber/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 BeerApp • {t('drinkResponsibly')} • Data from <a href="https://punkapi.com/" className="text-beer-amber hover:text-beer-yellow">Punk API</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage