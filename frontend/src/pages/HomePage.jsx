import { motion } from 'framer-motion'
import { FaSearch, FaStar, FaBeer, FaCar, FaArrowRight, FaGlassCheers, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const HomePage = () => {
  const { t } = useLanguage()
  
  const mainActions = [
    {
      id: 1,
      icon: <FaSearch className="text-3xl" />,
      title: t('beerFinder'),
      description: t('discoverBeers'),
      path: '/finder',
      color: 'from-beer-amber to-beer-yellow',
      buttonText: t('startSearching'),
      delay: 0.1
    },
    {
      id: 2,
      icon: <FaStar className="text-3xl" />,
      title: t('rateBeer'),
      description: t('quickFunRating'),
      path: '/rate',
      color: 'from-brewery-gold to-beer-amber',
      buttonText: t('rateNow'),
      delay: 0.2
    },
    {
      id: 3,
      icon: <FaCar className="text-3xl" />,
      title: t('safety'),
      description: t('safetyTools'),
      path: '/safety',
      color: 'from-red-600 to-orange-500',
      buttonText: t('checkSafety'),
      delay: 0.3
    }
  ]
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Beer Image */}
      <div className="relative overflow-hidden bg-gradient-to-b from-beer-dark to-beer-brown">
        <div className="absolute inset-0 z-0">
          {/* Beer image background with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-beer-dark via-beer-dark/80 to-transparent" />
        </div>
        
        <div className="relative z-10 px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaBeer className="text-5xl text-beer-yellow animate-bubble" />
                <h1 className="text-5xl md:text-6xl font-display font-bold text-beer-yellow">
                  BeerApp
                </h1>
              </div>
              <p className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                {t('appTagline')}
              </p>
              
              {/* Main Call-to-Action Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <Link to="/finder">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-beer-amber to-beer-yellow text-beer-dark font-bold text-xl rounded-2xl shadow-2xl shadow-beer-yellow/30 hover:shadow-beer-yellow/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <FaGlassCheers className="text-2xl" />
                      <span>Discover Amazing Beers</span>
                      <FaChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-beer-amber/30 to-beer-yellow/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>
              </motion.div>
              
              {/* Beer Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex flex-wrap justify-center gap-6 bg-beer-dark/50 backdrop-blur-sm rounded-2xl p-6 border border-beer-amber/20"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-beer-yellow">61+</div>
                  <div className="text-sm text-gray-300">German & Austrian Beers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-beer-yellow">500+</div>
                  <div className="text-sm text-gray-300">International Beers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-beer-yellow">4.7★</div>
                  <div className="text-sm text-gray-300">Average Rating</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 md:h-24">
            <path fill="#1a1a2e" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,165.3C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content - Centered and Compact */}
      <div className="flex-1 px-4 py-12 bg-beer-dark">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-beer-yellow mb-4">
              What would you like to do?
            </h2>
            <p className="text-gray-300">
              Choose from our main features below
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
                <div className="text-sm text-gray-300">{t('beersStat')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-beer-yellow">4.5★</div>
                <div className="text-sm text-gray-300">{t('avgRating')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-beer-yellow">100%</div>
                <div className="text-sm text-gray-300">{t('safeDrinking')}</div>
              </div>
            </div>
          </motion.div>
          
          {/* Safety Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-6">
              <p className="text-lg text-gray-300">
                <span className="text-red-400 font-bold text-xl">⚠️ {t('safetyFirst')}:</span> {t('drinkResponsibly')}. 
                {t('neverDrinkAndDrive')}.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Enjoy responsibly. Know your limits. Always have a designated driver.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced Footer */}
      <footer className="py-8 border-t border-beer-amber/20 bg-beer-dark/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-2">
                <FaBeer className="text-2xl text-beer-yellow" />
                <span className="text-xl font-bold text-beer-yellow">BeerApp</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your ultimate companion for beer discovery & enjoyment
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © 2026 BeerApp • {t('drinkResponsibly')}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Data from <a href="https://punkapi.com/" className="text-beer-amber hover:text-beer-yellow">Punk API</a> • 
                German/Austrian database by BeerApp
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Made with 🍻 for beer lovers worldwide
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Always enjoy responsibly
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage