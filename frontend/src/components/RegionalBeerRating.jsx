import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaMapMarkerAlt, FaFlag, FaGlobe, FaSearch, FaBeer, FaChevronDown } from 'react-icons/fa'

// Country data with flags and languages
const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', languages: ['en'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', languages: ['de'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', languages: ['es'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', languages: ['fr'] },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', languages: ['pl'] },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', languages: ['sv'] },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', languages: ['da'] },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', languages: ['it'] },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', languages: ['nl'] },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', languages: ['cs'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', languages: ['pt'] },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', languages: ['nl', 'fr', 'de'] },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', languages: ['de'] },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', languages: ['de', 'fr', 'it', 'rm'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', languages: ['en'] },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', languages: ['en', 'ga'] },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', languages: ['no'] },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', languages: ['fi', 'sv'] },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', languages: ['hu'] },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', languages: ['ro'] },
]

// Beer types/styles
const BEER_STYLES = [
  'IPA', 'Pale Ale', 'Stout', 'Porter', 'Lager', 'Pilsner', 'Wheat Beer', 
  'Sour', 'Belgian Ale', 'Brown Ale', 'Amber Ale', 'Red Ale', 'Blonde Ale',
  'Bock', 'Doppelbock', 'Tripel', 'Quadrupel', 'Barleywine', 'Saison',
  'Gose', 'Kölsch', 'Altbier', 'Märzen', 'Oktoberfest', 'Rauchbier'
]

// Popular beer brands by region (sample data)
const POPULAR_BEERS = {
  'US': ['Budweiser', 'Coors', 'Miller', 'Sierra Nevada', 'Sam Adams', 'Lagunitas'],
  'DE': ['Bitburger', 'Krombacher', 'Warsteiner', 'Beck\'s', 'Paulaner', 'Weihenstephaner'],
  'BE': ['Stella Artois', 'Leffe', 'Hoegaarden', 'Duvel', 'Chimay', 'Westmalle'],
  'CZ': ['Pilsner Urquell', 'Budweiser Budvar', 'Staropramen', 'Kozel', 'Bernard'],
  'GB': ['Guinness', 'Newcastle Brown Ale', 'Bass', 'Fuller\'s', 'Boddingtons'],
  'NL': ['Heineken', 'Amstel', 'Grolsch', 'Hertog Jan', 'Bavaria'],
  'PL': ['Żywiec', 'Tyskie', 'Lech', 'Okocim', 'Warka'],
  'ES': ['Estrella Damm', 'Mahou', 'Alhambra', 'Cruzcampo', 'San Miguel'],
}

const RegionalBeerRating = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [beerDetails, setBeerDetails] = useState({
    brand: '',
    style: '',
    customStyle: '',
    region: '',
    notes: ''
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Try to detect user's country from IP or browser
    detectUserCountry()
    
    // Try to get precise location (optional)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        () => {
          // Location not required, just use country detection
        }
      )
    }
  }, [])

  const detectUserCountry = async () => {
    try {
      // Try to get country from IP
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      const countryCode = data.country_code
      
      const detectedCountry = COUNTRIES.find(c => c.code === countryCode)
      if (detectedCountry) {
        setSelectedCountry(detectedCountry)
      }
    } catch (error) {
      // Fallback to browser language
      const browserLang = navigator.language.split('-')[0]
      const langCountry = COUNTRIES.find(c => c.languages.includes(browserLang))
      if (langCountry) {
        setSelectedCountry(langCountry)
      }
    }
  }

  const handleBeerDetailChange = (key, value) => {
    setBeerDetails(prev => ({ ...prev, [key]: value }))
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setShowCountryDropdown(false)
    
    // Auto-suggest popular beers for selected country
    if (POPULAR_BEERS[country.code] && !beerDetails.brand) {
      handleBeerDetailChange('brand', POPULAR_BEERS[country.code][0])
    }
  }

  const renderStars = (currentRating, interactive = false) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={interactive ? () => setRating(i) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={`text-4xl transition-transform ${
            interactive ? 'hover:scale-125 cursor-pointer' : ''
          } ${
            i <= (hoverRating || currentRating)
              ? 'text-beer-yellow fill-current'
              : 'text-gray-600'
          }`}
          disabled={!interactive}
        >
          <FaStar />
        </button>
      )
    }
    return stars
  }

  const getPopularBeersForCountry = () => {
    if (!selectedCountry) return []
    return POPULAR_BEERS[selectedCountry.code] || []
  }

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating (1-5 stars)')
      return
    }

    if (!selectedCountry) {
      alert('Please select your country')
      return
    }

    if (!beerDetails.brand.trim()) {
      alert('Please enter the beer brand/name')
      return
    }

    setIsSubmitting(true)

    const ratingData = {
      rating,
      country: selectedCountry,
      beerDetails: {
        ...beerDetails,
        style: beerDetails.style === 'other' ? beerDetails.customStyle : beerDetails.style
      },
      userLocation,
      timestamp: new Date().toISOString(),
      regionalData: {
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
        flag: selectedCountry.flag
      }
    }

    // Store locally (in real app, send to backend API)
    const existingRatings = JSON.parse(localStorage.getItem('beerapp_regional_ratings') || '[]')
    existingRatings.push(ratingData)
    localStorage.setItem('beerapp_regional_ratings', JSON.stringify(existingRatings))

    // Call parent callback
    if (onSubmit) {
      onSubmit(ratingData)
    }

    // Show success
    setTimeout(() => {
      alert(`✅ Rating submitted!\n\n${beerDetails.brand} - ${rating}/5 stars\n${selectedCountry.flag} ${selectedCountry.name}`)
      setIsSubmitting(false)
      
      // Reset form (keep country selection)
      setRating(0)
      setBeerDetails({
        brand: '',
        style: '',
        customStyle: '',
        region: '',
        notes: ''
      })
    }, 1000)
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaBeer className="text-4xl text-beer-yellow animate-bubble" />
          <h2 className="text-3xl font-display font-bold text-beer-yellow">
            Rate Your Beer
          </h2>
          <FaGlobe className="text-4xl text-beer-amber" />
        </div>
        <p className="text-gray-300 text-lg">
          Help identify the most loved beers by region and country
        </p>
      </motion.div>

      {/* Country Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow flex items-center gap-2">
          <FaFlag />
          <span>Select Your Country</span>
        </h3>
        
        <div className="relative">
          <button
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className="w-full bg-beer-dark/50 border border-beer-amber/30 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-beer-dark transition-colors"
          >
            <div className="flex items-center gap-3">
              {selectedCountry ? (
                <>
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span className="text-gray-300 font-medium">{selectedCountry.name}</span>
                </>
              ) : (
                <span className="text-gray-400">Choose your country...</span>
              )}
            </div>
            <FaChevronDown className={`text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showCountryDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-beer-dark border border-beer-amber/20 rounded-lg shadow-xl max-h-64 overflow-y-auto">
              {COUNTRIES.map(country => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-beer-brown/30 transition-colors text-left"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className="text-gray-300 font-medium">{country.name}</div>
                    <div className="text-sm text-gray-400">
                      {country.languages.map(lang => lang.toUpperCase()).join(', ')}
                    </div>
                  </div>
                  {selectedCountry?.code === country.code && (
                    <div className="w-2 h-2 rounded-full bg-beer-yellow"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {userLocation && (
          <div className="mt-4 p-3 bg-beer-dark/30 rounded-lg flex items-center gap-3">
            <FaMapMarkerAlt className="text-beer-amber" />
            <div className="text-sm text-gray-300">
              Location detected: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </div>
          </div>
        )}
      </motion.div>

      {/* Beer Identification */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-6 text-beer-yellow">
          Beer Details
        </h3>
        
        <div className="space-y-6">
          {/* Brand/Name */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Beer Brand/Name *
            </label>
            <input
              type="text"
              value={beerDetails.brand}
              onChange={(e) => handleBeerDetailChange('brand', e.target.value)}
              placeholder="e.g., Guinness, Heineken, Budweiser"
              className="input-beer w-full"
              required
            />
            
            {selectedCountry && getPopularBeersForCountry().length > 0 && (
              <div className="mt-3">
                <div className="text-sm text-gray-400 mb-2">Popular in {selectedCountry.name}:</div>
                <div className="flex flex-wrap gap-2">
                  {getPopularBeersForCountry().map(beer => (
                    <button
                      key={beer}
                      type="button"
                      onClick={() => handleBeerDetailChange('brand', beer)}
                      className="px-3 py-1.5 bg-beer-dark/50 text-gray-300 rounded-lg text-sm hover:bg-beer-dark transition-colors"
                    >
                      {beer}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Beer Style */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Beer Style
            </label>
            <div className="relative">
              <button
                onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                className="w-full bg-beer-dark/50 border border-beer-amber/30 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-beer-dark transition-colors"
              >
                <span className={beerDetails.style ? 'text-gray-300' : 'text-gray-400'}>
                  {beerDetails.style || 'Select beer style...'}
                </span>
                <FaChevronDown className={`text-gray-400 transition-transform ${showStyleDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showStyleDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-beer-dark border border-beer-amber/20 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  {BEER_STYLES.map(style => (
                    <button
                      key={style}
                      onClick={() => {
                        handleBeerDetailChange('style', style)
                        setShowStyleDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left text-gray-300 hover:bg-beer-brown/30 transition-colors"
                    >
                      {style}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      handleBeerDetailChange('style', 'other')
                      setShowStyleDropdown(false)
                    }}
                    className="w-full px-4 py-3 text-left text-gray-400 hover:bg-beer-brown/30 transition-colors border-t border-beer-amber/10"
                  >
                    Other (specify below)
                  </button>
                </div>
              )}
            </div>
            
            {beerDetails.style === 'other' && (
              <div className="mt-3">
                <input
                  type="text"
                  value={beerDetails.customStyle}
                  onChange={(e) => handleBeerDetailChange('customStyle', e.target.value)}
                  placeholder="Enter beer style..."
                  className="input-beer w-full"
                />
              </div>
            )}
          </div>

          {/* Region (Optional) */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Region/State (Optional)
            </label>
            <input
              type="text"
              value={beerDetails.region}
              onChange={(e) => handleBeerDetailChange('region', e.target.value)}
              placeholder="e.g., Bavaria, California, Flanders"
              className="input-beer w-full"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={beerDetails.notes}
              onChange={(e) => handleBeerDetailChange('notes', e.target.value)}
              placeholder="Any special notes about this beer..."
              rows="3"
              className="input-beer w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Star Rating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-6 text-beer-yellow">
          Your Rating (1-5 Stars)
        </h3>
        
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-6">
            {renderStars(rating, true)}
          </div>
          
          <div className="text-3xl font-bold text-gray-300 mb-2">
            {rating > 0 ? `${rating}.0 / 5.0` : 'Select your rating'}
          </div>
          
          <div className="flex justify-between w-full max-w-md text-sm text-gray-400 mb-6">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
          
          <div className="grid grid-cols-5 gap-2 w-full max-w-md">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`py-2 rounded-lg transition-all ${
                  rating >= star
                    ? 'bg-beer-amber text-beer-dark font-bold'
                    : 'bg-beer-dark/50 text-gray-400 hover:bg-beer-dark'
                }`}
              >
                {star} ★
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Regional Context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow flex items-center gap-2">
          <FaGlobe />
          <span>Regional Impact</span>
        </h3>
        
        <div className="space-y-4">
          <div className="bg-beer-dark/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-beer-yellow" />
              <span className="font-semibold text-gray-300">How Your Rating Helps</span>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-beer-amber mt-1.5 flex-shrink-0"></div>
                <span>Identifies most loved beers in {selectedCountry?.name || 'your country'}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-beer-amber mt-1.5 flex-shrink-0"></div>
                <span>Shows regional beer preferences and trends</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-beer-amber mt-1.5 flex-shrink-0"></div>
                <span>Helps travelers discover local favorites</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-beer-amber mt-1.5 flex-shrink-0"></div>
                <span>Supports local breweries and beer culture</span>
              </li>
            </ul>
          </div>
          
          {selectedCountry && (
            <div className="bg-gradient-to-r from-beer-dark to-beer-brown/30 p-4 rounded-lg border border-beer-amber/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedCountry.flag}</span>
                <div>
                  <div className="font-bold text-xl text-beer-yellow">{selectedCountry.name}</div>
                  <div className="text-sm text-gray-400">
                    Languages: {selectedCountry.languages.map(lang => lang.toUpperCase()).join(', ')}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Your rating will contribute to the {selectedCountry.name} beer rankings and help identify regional favorites.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Submit Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-6 z-10"
      >
        <div className="card-beer p-6 bg-beer-dark/90 backdrop-blur-sm border border-beer-amber/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-300">
              <div className="flex items-center gap-2 mb-1">
                <FaFlag />
                <span className="font-semibold">
                  {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : 'Select country'}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {beerDetails.brand ? `Rating: ${beerDetails.brand}` : 'Enter beer details'}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || !selectedCountry || !beerDetails.brand.trim()}
              className={`btn-primary px-8 py-3 text-lg min-w-[200px] ${
                isSubmitting || rating === 0 || !selectedCountry || !beerDetails.brand.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaStar />
                  Submit Regional Rating
                </span>
              )}
            </motion.button>
          </div>
          
          {(rating === 0 || !selectedCountry || !beerDetails.brand.trim()) && (
            <div className="mt-4 text-sm text-beer-amber space-y-1">
              {rating === 0 && <div>• Please select a rating (1-5 stars)</div>}
              {!selectedCountry && <div>• Please select your country</div>}
              {!beerDetails.brand.trim() && <div>• Please enter the beer brand/name</div>}
            </div>
          )}
        </div>
      </motion.div>

      {/* Language Support Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="card-beer p-6 bg-beer-dark/30"
      >
        <h3 className="text-lg font-semibold mb-4 text-beer-yellow flex items-center gap-2">
          <FaGlobe />
          <span>Multi-Language Support</span>
        </h3>
        
        <div className="space-y-3">
          <p className="text-gray-300">
            This app supports ratings in multiple languages. Your country selection helps us:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COUNTRIES.slice(0, 12).map(country => (
              <div key={country.code} className="flex items-center gap-2 p-2 bg-beer-dark/50 rounded-lg">
                <span className="text-xl">{country.flag}</span>
                <span className="text-sm text-gray-300">{country.code}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-400">
            More languages coming soon! The goal is to build a global beer rating community.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default RegionalBeerRating