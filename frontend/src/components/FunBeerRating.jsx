import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaTrophy, FaBeer, FaMapMarkerAlt, FaGlobe, FaSmile, FaLaugh, FaHeart, FaFire } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'

// Simple country detection with flags
const COUNTRIES = [
  { code: 'US', name: 'USA', flag: '🇺🇸' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'GB', name: 'UK', flag: '🇬🇧' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
]

// Fun beer emojis for ratings
const BEER_EMOJIS = ['🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🧊']

// Popular beer suggestions by country
const POPULAR_BEER_SUGGESTIONS = {
  'DE': ['Bitburger', 'Krombacher', 'Warsteiner', 'Beck\'s', 'Paulaner', 'Weihenstephaner'],
  'BE': ['Stella Artois', 'Leffe Blonde', 'Duvel', 'Hoegaarden', 'Chimay', 'Westmalle'],
  'CZ': ['Pilsner Urquell', 'Budweiser Budvar', 'Staropramen', 'Kozel', 'Bernard'],
  'GB': ['Guinness', 'Newcastle Brown Ale', 'Fuller\'s London Pride', 'Boddingtons', 'Bass'],
  'US': ['Budweiser', 'Coors', 'Miller', 'Sierra Nevada', 'Sam Adams', 'Lagunitas'],
  'ES': ['Estrella Damm', 'Mahou', 'Alhambra', 'Cruzcampo', 'San Miguel'],
  'FR': ['Kronenbourg 1664', 'Heineken France', 'Desperados', 'Pelforth', 'Leffe'],
  'IT': ['Peroni', 'Moretti', 'Nastro Azzurro', 'Ichnusa', 'Menabrea'],
  'NL': ['Heineken', 'Amstel', 'Grolsch', 'Hertog Jan', 'Bavaria'],
  'PL': ['Żywiec', 'Tyskie', 'Lech', 'Okocim', 'Warka'],
  'SE': ['Norrlands Guld', 'Mariestads', 'Falcon', 'Spendrups', 'Pripps Blå'],
  'DK': ['Carlsberg', 'Tuborg', 'Royal Unibrew', 'Faxe', 'Albani'],
  'default': ['Local Beer', 'Craft Beer', 'Regional Special', 'Popular Brand']
}

// Top beers by country (sample data - would come from API)
const TOP_BEERS_BY_COUNTRY = {
  'DE': [
    { name: 'Bitburger', emoji: '🍺', votes: 1250 },
    { name: 'Krombacher', emoji: '🍻', votes: 1100 },
    { name: 'Warsteiner', emoji: '🥂', votes: 980 },
  ],
  'BE': [
    { name: 'Stella Artois', emoji: '🍺', votes: 950 },
    { name: 'Leffe Blonde', emoji: '🍻', votes: 820 },
    { name: 'Duvel', emoji: '🥂', votes: 780 },
  ],
  'CZ': [
    { name: 'Pilsner Urquell', emoji: '🍺', votes: 1100 },
    { name: 'Budweiser Budvar', emoji: '🍻', votes: 920 },
    { name: 'Staropramen', emoji: '🥂', votes: 780 },
  ],
  'GB': [
    { name: 'Guinness', emoji: '🍺', votes: 1500 },
    { name: 'Newcastle Brown', emoji: '🍻', votes: 820 },
    { name: 'Fuller\'s London Pride', emoji: '🥂', votes: 710 },
  ],
  'US': [
    { name: 'Budweiser', emoji: '🍺', votes: 1800 },
    { name: 'Coors', emoji: '🍻', votes: 1500 },
    { name: 'Miller', emoji: '🥂', votes: 1450 },
  ],
  // Default fallback
  'default': [
    { name: 'Local Favorite', emoji: '🍺', votes: 500 },
    { name: 'Regional Special', emoji: '🍻', votes: 300 },
    { name: 'Craft Beer', emoji: '🥂', votes: 200 },
  ]
}

const FunBeerRating = () => {
  const { t } = useLanguage()
  const [rating, setRating] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [beerName, setBeerName] = useState('')
  const [showTopBeers, setShowTopBeers] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [randomEmoji, setRandomEmoji] = useState('🍺')

  // Auto-detect country on load
  useEffect(() => {
    detectCountry()
    
    // Random beer emoji for fun
    const emoji = BEER_EMOJIS[Math.floor(Math.random() * BEER_EMOJIS.length)]
    setRandomEmoji(emoji)
    
    // Fun animation interval
    const interval = setInterval(() => {
      const newEmoji = BEER_EMOJIS[Math.floor(Math.random() * BEER_EMOJIS.length)]
      setRandomEmoji(newEmoji)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const detectCountry = async () => {
    // Try geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding to get country from coordinates
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            )
            const data = await response.json()
            const countryCode = data.address?.country_code?.toUpperCase()
            
            if (countryCode) {
              const country = COUNTRIES.find(c => c.code === countryCode)
              if (country) {
                setSelectedCountry(country)
                return
              }
            }
          } catch (error) {
            console.log('Geocoding failed, falling back to IP detection')
          }
          
          // If geocoding fails, try IP detection
          detectCountryByIP()
        },
        () => {
          // Geolocation denied, try IP detection
          detectCountryByIP()
        }
      )
    } else {
      // No geolocation support, try IP detection
      detectCountryByIP()
    }
  }

  const detectCountryByIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      const countryCode = data.country_code
      
      const country = COUNTRIES.find(c => c.code === countryCode)
      if (country) {
        setSelectedCountry(country)
        return
      }
    } catch (error) {
      // IP detection failed, try browser language
      detectCountryByBrowser()
    }
  }

  const detectCountryByBrowser = () => {
    const browserLang = navigator.language.split('-')[1] || navigator.language.split('-')[0]
    const country = COUNTRIES.find(c => c.code === browserLang?.toUpperCase())
    
    if (country) {
      setSelectedCountry(country)
    } else {
      // Default to first country
      setSelectedCountry(COUNTRIES[0])
    }
  }

  const handleRating = (stars) => {
    setRating(stars)
    
    // Fun haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const getTopBeers = () => {
    if (!selectedCountry) return TOP_BEERS_BY_COUNTRY.default
    return TOP_BEERS_BY_COUNTRY[selectedCountry.code] || TOP_BEERS_BY_COUNTRY.default
  }

  const handleSubmit = () => {
    // MANDATORY validation
    if (rating === 0) {
      // Fun alert for missing rating
      alert('⭐ Please tap the stars to rate!')
      return
    }
    
    if (!beerName.trim()) {
      // Fun alert for missing beer name
      alert('🍺 Please enter the beer name to identify top beers!')
      return
    }
    
    setIsSubmitting(true)
    
    // Beer name is now mandatory
    const beerToRate = beerName.trim()
    
    // Save rating locally
    const ratingData = {
      beer: beerToRate,
      rating,
      country: selectedCountry,
      timestamp: new Date().toISOString(),
      emoji: randomEmoji
    }
    
    const ratings = JSON.parse(localStorage.getItem('fun_beer_ratings') || '[]')
    ratings.push(ratingData)
    localStorage.setItem('fun_beer_ratings', JSON.stringify(ratings))
    
    // Show success with top beers
    setTimeout(() => {
      setIsSubmitting(false)
      setShowTopBeers(true)
      
      // Reset for next rating (keep country)
      setRating(0)
      setBeerName('')
    }, 800)
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRating(i)}
          className={`text-5xl md:text-6xl transition-all duration-300 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
        >
          {i <= rating ? <FaStar className="fill-current" /> : <FaStar />}
        </motion.button>
      )
    }
    return stars
  }

  const renderTopBeers = () => {
    const topBeers = getTopBeers()
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaTrophy className="text-3xl text-yellow-400" />
          <h3 className="text-2xl font-bold text-beer-yellow">
            Top 3 in {selectedCountry?.flag} {selectedCountry?.name}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topBeers.map((beer, index) => (
            <motion.div
              key={beer.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl text-center ${
                index === 0 ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-400/30' :
                index === 1 ? 'bg-gradient-to-br from-gray-400/20 to-gray-500/20 border-2 border-gray-400/30' :
                'bg-gradient-to-br from-amber-800/20 to-brown-800/20 border-2 border-amber-700/30'
              }`}
            >
              <div className="text-4xl mb-2">{beer.emoji}</div>
              <div className={`text-2xl font-bold mb-1 ${
                index === 0 ? 'text-yellow-400' :
                index === 1 ? 'text-gray-300' :
                'text-amber-300'
              }`}>
                #{index + 1}
              </div>
              <div className="text-xl font-semibold text-white mb-2">{beer.name}</div>
              <div className="text-gray-300">{beer.votes.toLocaleString()} votes</div>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTopBeers(false)}
          className="mt-8 btn-primary mx-auto block"
        >
          Rate Another Beer
        </motion.button>
      </motion.div>
    )
  }

  if (showTopBeers) {
    return renderTopBeers()
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Fun Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaBeer className="text-4xl text-beer-yellow animate-bubble" />
          <h1 className="text-4xl font-display font-bold text-beer-yellow">
            Rate Your Beer!
          </h1>
          <span className="text-4xl">{randomEmoji}</span>
        </div>
        <p className="text-gray-300 text-lg">
          Quick & fun - help find the best beers worldwide
        </p>
      </motion.div>

      {/* Country Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-beer-dark/50 rounded-full">
          <FaMapMarkerAlt className="text-beer-amber" />
          <span className="text-2xl">{selectedCountry?.flag || '🌍'}</span>
          <span className="text-gray-300 font-semibold">
            {selectedCountry?.name || 'Detecting...'}
          </span>
        </div>
      </motion.div>

      {/* Simple Beer Input - MANDATORY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="text-center mb-4">
          <label className="text-gray-300 text-lg">
            Which beer are you rating? *
          </label>
        </div>
        <input
          type="text"
          value={beerName}
          onChange={(e) => setBeerName(e.target.value)}
          placeholder="Enter beer brand/name"
          className={`input-beer w-full text-center text-xl py-4 ${
            beerName.trim() ? 'border-beer-amber' : 'border-red-500/50'
          }`}
          maxLength={30}
          required
        />
        <div className="text-center mt-2 text-sm">
          {beerName.trim() ? (
            <span className="text-green-400">✓ Got it!</span>
          ) : (
            <span className="text-red-400">Required to identify top beers</span>
          )}
        </div>
        
        {/* Popular beer suggestions */}
        {selectedCountry && (
          <div className="mt-4">
            <div className="text-center text-gray-400 text-sm mb-2">
              Popular in {selectedCountry.name}:
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {(POPULAR_BEER_SUGGESTIONS[selectedCountry.code] || POPULAR_BEER_SUGGESTIONS.default)
                .slice(0, 4)
                .map(beer => (
                <button
                  key={beer}
                  type="button"
                  onClick={() => setBeerName(beer)}
                  className="px-3 py-1.5 bg-beer-dark/50 text-gray-300 rounded-lg text-sm hover:bg-beer-dark transition-colors"
                >
                  {beer}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Star Rating - Fun & Big */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-beer-yellow mb-2">
            How much do you love it?
          </h2>
          <div className="text-gray-300">
            Tap the stars - it's that easy!
          </div>
        </div>
        
        <div className="flex justify-center gap-2 md:gap-4 mb-6">
          {renderStars()}
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-300 mb-2">
            {rating > 0 ? `${rating}.0 / 5.0` : 'Tap to rate!'}
          </div>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span>Meh</span>
            <span>Awesome!</span>
          </div>
        </div>
      </motion.div>

      {/* Fun Rating Labels */}
      {rating > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-beer-amber/20 to-beer-yellow/20 rounded-full">
            {rating === 5 && <><FaFire className="text-red-400" /> <span className="text-xl text-red-300">Fire! 🔥</span></>}
            {rating === 4 && <><FaHeart className="text-pink-400" /> <span className="text-xl text-pink-300">Love it! ❤️</span></>}
            {rating === 3 && <><FaLaugh className="text-yellow-400" /> <span className="text-xl text-yellow-300">Good! 😊</span></>}
            {rating === 2 && <><FaSmile className="text-green-400" /> <span className="text-xl text-green-300">OK 👍</span></>}
            {rating === 1 && <><FaSmile className="text-blue-400" /> <span className="text-xl text-blue-300">Not for me 👎</span></>}
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: (rating > 0 && beerName.trim()) ? 1.05 : 1 }}
          whileTap={{ scale: (rating > 0 && beerName.trim()) ? 0.95 : 1 }}
          onClick={handleSubmit}
          disabled={rating === 0 || !beerName.trim() || isSubmitting}
          className={`text-2xl font-bold py-4 px-8 rounded-2xl transition-all ${
            (rating > 0 && beerName.trim())
              ? 'bg-gradient-to-r from-beer-amber to-beer-yellow text-beer-dark hover:shadow-2xl hover:shadow-beer-yellow/30'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-beer-dark"></div>
              Submitting...
            </span>
          ) : (rating > 0 && beerName.trim()) ? (
            <span className="flex items-center gap-2">
              <FaStar />
              Submit Rating!
            </span>
          ) : (
            <span>Rate & enter beer name</span>
          )}
        </motion.button>
        
        <div className="mt-4 text-gray-400 text-sm">
          ⚡ Quick • 🎯 Easy • 🌍 Global
        </div>
      </motion.div>

      {/* Fun Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t border-beer-amber/10"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-beer-yellow">1M+</div>
            <div className="text-gray-300">Ratings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-beer-yellow">50+</div>
            <div className="text-gray-300">Countries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-beer-yellow">10K+</div>
            <div className="text-gray-300">Beers</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FunBeerRating