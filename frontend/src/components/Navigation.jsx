import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBeer, FaSearch, FaStar, FaUser, FaHome, FaCar, FaShieldAlt, FaGlobe, FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext'

const Navigation = () => {
  const location = useLocation()
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const { language, changeLanguage, t } = useLanguage()
  
  const navItems = [
    { path: '/', label: t('home'), icon: <FaHome /> },
    { path: '/beers', label: t('beers'), icon: <FaBeer /> },
    { path: '/finder', label: t('beerFinder'), icon: <FaSearch /> },
    { path: '/rate', label: t('rateBeer'), icon: <FaStar /> },
    { path: '/safety', label: t('safety'), icon: <FaCar /> },
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
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-beer-dark/50 border border-beer-amber/30 text-gray-300 hover:bg-beer-dark transition-colors"
              >
                <FaGlobe className="text-beer-amber" />
                <span className="text-xl">{language.flag}</span>
                <span className="hidden md:inline text-sm">{language.code.toUpperCase()}</span>
                <FaChevronDown className={`text-gray-400 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-beer-dark border border-beer-amber/20 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang)
                        setShowLanguageDropdown(false)
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-beer-brown/30 transition-colors text-left ${
                        language.code === lang.code ? 'bg-beer-amber/20' : ''
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="text-gray-300 font-medium">{lang.name}</div>
                        <div className="text-sm text-gray-400">{lang.native}</div>
                      </div>
                      {language.code === lang.code && (
                        <div className="w-2 h-2 rounded-full bg-beer-yellow"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary hidden md:flex items-center gap-2"
            >
              <FaBeer />
              <span>{t('signIn')}</span>
            </motion.button>
          </div>
          
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