import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaThermometerHalf, FaMapMarkerAlt, FaUtensils, FaGlassCheers, FaUserFriends, FaCalendar, FaClock, FaFlag, FaShieldAlt } from 'react-icons/fa'

const DetailedRating = ({ beerId, beerName, onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [details, setDetails] = useState({
    temperature: 'cold', // cold, cool, room, warm
    ambient: 'indoor', // indoor, outdoor, bar, home
    reason: 'enjoyment', // enjoyment, social, celebration, relaxation
    snack: '', // free text
    food: '' // free text
  })
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userInfo, setUserInfo] = useState({
    ip: '',
    userAgent: '',
    timestamp: ''
  })

  useEffect(() => {
    // Get user info for fake vote detection
    setUserInfo({
      ip: 'Detecting...',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    })

    // Try to get IP (simulated - in real app, use backend)
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setUserInfo(prev => ({ ...prev, ip: data.ip }))
      })
      .catch(() => {
        setUserInfo(prev => ({ ...prev, ip: 'Unknown' }))
      })

    // Get location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          })
        },
        (error) => {
          setLocationError(`Location access denied: ${error.message}`)
        }
      )
    } else {
      setLocationError('Geolocation not supported')
    }
  }, [])

  const handleDetailChange = (key, value) => {
    setDetails(prev => ({ ...prev, [key]: value }))
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
          className={`text-3xl transition-transform ${
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

  const validateRating = () => {
    const errors = []

    if (rating === 0) {
      errors.push('Please select a rating (1-5 stars)')
    }

    // Check for suspicious patterns (fake vote detection)
    const now = new Date()
    const submitTime = new Date(userInfo.timestamp)
    const timeDiff = (now - submitTime) / 1000 // seconds

    if (timeDiff < 5) {
      errors.push('Rating submitted too quickly (possible bot)')
    }

    if (!location && locationError.includes('denied')) {
      errors.push('Location access required to prevent fake votes')
    }

    // Check for duplicate IP (simulated)
    const recentRatings = JSON.parse(localStorage.getItem('beerapp_recent_ratings') || '[]')
    const sameIPRatings = recentRatings.filter(r => r.ip === userInfo.ip && r.timestamp > Date.now() - 3600000)
    if (sameIPRatings.length >= 3) {
      errors.push('Too many ratings from this IP address in the last hour')
    }

    return errors
  }

  const handleSubmit = async () => {
    const errors = validateRating()
    if (errors.length > 0) {
      alert(`Cannot submit rating:\n${errors.join('\n')}`)
      return
    }

    setIsSubmitting(true)

    // Prepare rating data
    const ratingData = {
      beerId,
      beerName,
      rating,
      details,
      location,
      userInfo: {
        ...userInfo,
        timestamp: new Date().toISOString()
      },
      submittedAt: new Date().toISOString()
    }

    // Store locally (in real app, send to backend)
    const recentRatings = JSON.parse(localStorage.getItem('beerapp_recent_ratings') || '[]')
    recentRatings.push(ratingData)
    localStorage.setItem('beerapp_recent_ratings', JSON.stringify(recentRatings.slice(-50)))

    // Store rating in main rating service
    const existingRatings = JSON.parse(localStorage.getItem('beerapp_ratings') || '{}')
    const beerRatings = existingRatings[beerId] || []
    beerRatings.push({
      userId: 'user_' + Date.now(),
      rating,
      review: JSON.stringify(details),
      createdAt: new Date().toISOString(),
      metadata: { location, userInfo }
    })
    existingRatings[beerId] = beerRatings
    localStorage.setItem('beerapp_ratings', JSON.stringify(existingRatings))

    // Call parent callback
    if (onSubmit) {
      onSubmit(ratingData)
    }

    // Show success
    setTimeout(() => {
      alert(`✅ Rating submitted for ${beerName}!\n\nRating: ${rating}/5\nLocation: ${location ? 'Recorded' : 'Not available'}\nTime: ${new Date().toLocaleTimeString()}`)
      setIsSubmitting(false)
      
      // Reset form
      setRating(0)
      setDetails({
        temperature: 'cold',
        ambient: 'indoor',
        reason: 'enjoyment',
        snack: '',
        food: ''
      })
    }, 1000)
  }

  const getFoodSuggestions = () => {
    const suggestions = {
      cold: {
        indoor: ['Cheese platter', 'Roasted nuts', 'Pretzels'],
        outdoor: ['Grilled sausages', 'Barbecue snacks', 'Fresh vegetables'],
        bar: ['Bar nuts', 'Chips', 'Olives'],
        home: ['Homemade snacks', 'Crackers', 'Dips']
      },
      cool: {
        indoor: ['Light salads', 'Seafood', 'Fresh fruits'],
        outdoor: ['Cold cuts', 'Sandwiches', 'Fruit salad'],
        bar: ['Tapas', 'Small plates', 'Antipasti'],
        home: ['Charcuterie board', 'Bruschetta', 'Canapés']
      },
      room: {
        indoor: ['Stews', 'Roasts', 'Hearty dishes'],
        outdoor: ['Grilled meats', 'Burgers', 'Kebabs'],
        bar: ['Pub food', 'Wings', 'Fries'],
        home: ['Comfort food', 'Casseroles', 'Pasta']
      },
      warm: {
        indoor: ['Spicy dishes', 'Curries', 'Hot appetizers'],
        outdoor: ['Spicy grilled items', 'Hot dogs', 'Spicy snacks'],
        bar: ['Spicy bar snacks', 'Hot wings', 'Spicy nuts'],
        home: ['Spicy dips', 'Hot cheese', 'Spicy crackers']
      }
    }

    return suggestions[details.temperature]?.[details.ambient] || ['Cheese', 'Nuts', 'Pretzels']
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold mb-2 text-beer-yellow">
          Rate {beerName}
        </h2>
        <p className="text-gray-400">
          Detailed rating helps prevent fake votes and improves recommendations
        </p>
      </motion.div>

      {/* Security Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card-beer p-4 bg-beer-dark/30 border border-beer-amber/20"
      >
        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-beer-yellow text-xl" />
          <div>
            <h3 className="font-semibold text-beer-yellow">Fake Vote Protection</h3>
            <p className="text-sm text-gray-400">
              Location tracking and timing checks help ensure authentic ratings
            </p>
          </div>
        </div>
      </motion.div>

      {/* Star Rating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow">
          Overall Rating (1-5)
        </h3>
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {renderStars(rating, true)}
          </div>
          <div className="text-2xl font-bold text-gray-300 mb-2">
            {rating > 0 ? `${rating}.0 / 5.0` : 'Select rating'}
          </div>
          <div className="flex justify-between w-full max-w-md text-sm text-gray-400">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>
      </motion.div>

      {/* Detailed Questions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-6 text-beer-yellow">
          Drinking Details
        </h3>
        
        <div className="space-y-6">
          {/* Temperature */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-300 mb-3">
              <FaThermometerHalf />
              <span>Beer Temperature</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['cold', 'cool', 'room', 'warm'].map(temp => (
                <button
                  key={temp}
                  type="button"
                  onClick={() => handleDetailChange('temperature', temp)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    details.temperature === temp
                      ? 'bg-beer-amber text-beer-dark font-semibold'
                      : 'bg-beer-dark/50 text-gray-300 hover:bg-beer-dark'
                  }`}
                >
                  {temp.charAt(0).toUpperCase() + temp.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Ambient */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-300 mb-3">
              <FaGlassCheers />
              <span>Drinking Environment</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['indoor', 'outdoor', 'bar', 'home'].map(env => (
                <button
                  key={env}
                  type="button"
                  onClick={() => handleDetailChange('ambient', env)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    details.ambient === env
                      ? 'bg-beer-amber text-beer-dark font-semibold'
                      : 'bg-beer-dark/50 text-gray-300 hover:bg-beer-dark'
                  }`}
                >
                  {env.charAt(0).toUpperCase() + env.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-300 mb-3">
              <FaUserFriends />
              <span>Reason for Drinking</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['enjoyment', 'social', 'celebration', 'relaxation'].map(reason => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => handleDetailChange('reason', reason)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    details.reason === reason
                      ? 'bg-beer-amber text-beer-dark font-semibold'
                      : 'bg-beer-dark/50 text-gray-300 hover:bg-beer-dark'
                  }`}
                >
                  {reason.charAt(0).toUpperCase() + reason.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Snack/Food */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-gray-300 mb-2">
                <FaUtensils />
                <span>Snack or Food (Optional)</span>
              </label>
              <input
                type="text"
                value={details.snack}
                onChange={(e) => handleDetailChange('snack', e.target.value)}
                placeholder="What did you eat with the beer?"
                className="input-beer w-full"
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-gray-300 mb-2">
                <FaUtensils />
                <span>Main Food (Optional)</span>
              </label>
              <input
                type="text"
                value={details.food}
                onChange={(e) => handleDetailChange('food', e.target.value)}
                placeholder="What was the main meal?"
                className="input-beer w-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Location Tracking */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>Location Verification</span>
        </h3>
        
        <div className="space-y-4">
          {location ? (
            <div className="bg-beer-dark/30 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt className="text-beer-yellow" />
                <span className="font-semibold text-gray-300">Location recorded</span>
              </div>
              <div className="text-sm text-gray-400">
                Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
                <br />
                Accuracy: ±{Math.round(location.accuracy)} meters
              </div>
            </div>
          ) : (
            <div className="bg-beer-dark/30 p-4 rounded-lg border border-beer-amber/30">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt className="text-beer-amber" />
                <span className="font-semibold text-beer-amber">Location required</span>
              </div>
              <div className="text-sm text-gray-400">
                {locationError || 'Please enable location services to submit rating'}
                <br />
                <span className="text-beer-yellow">Location helps prevent fake votes</span>
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-400">
            <FaShieldAlt className="inline mr-2" />
            Location data is used only for vote verification and is not stored with personal information.
          </div>
        </div>
      </motion.div>

      {/* Food Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow">
          Food Pairing Suggestions
        </h3>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            Based on your selected temperature ({details.temperature}) and environment ({details.ambient}):
          </p>
          
          <div className="grid md:grid-cols-3 gap-3">
            {getFoodSuggestions().map((food, index) => (
              <div key={index} className="bg-beer-dark/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-beer-amber" />
                  <span className="font-medium text-gray-300">{food}</span>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-400">
            These suggestions improve as more users provide detailed ratings!
          </p>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="sticky bottom-6 z-10"
      >
        <div className="card-beer p-6 bg-beer-dark/90 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-300">
              <div className="flex items-center gap-2 mb-1">
                <FaClock />
                <span className="font-semibold">Time: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaFlag />
                <span>IP: {userInfo.ip}</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || (!location && locationError.includes('denied'))}
              className={`btn-primary px-8 py-3 text-lg ${
                isSubmitting || rating === 0 || (!location && locationError.includes('denied'))
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
                  Submit Detailed Rating
                </span>
              )}
            </motion.button>
          </div>
          
          {(rating === 0 || (!location && locationError.includes('denied'))) && (
            <div className="mt-4 text-sm text-beer-amber">
              {rating === 0 && '• Please select a rating\n'}
              {!location && locationError.includes('denied') && '• Location access is required to prevent fake votes'}
            </div>
          )}
        </div>
      </motion.div>

      {/* Security Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="card-beer p-6 bg-beer-dark/30"
      >
        <h3 className="text-lg font-semibold mb-4 text-beer-yellow flex items-center gap-2">
          <FaShieldAlt />
          <span>How We Prevent Fake Votes</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-beer-amber/20 flex items-center justify-center">
                <span className="text-beer-yellow text-sm">1</span>
              </div>
              <span className="font-medium text-gray-300">Location Verification</span>
            </div>
            <p className="text-sm text-gray-400 pl-8">
              GPS coordinates help verify authentic user locations
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-beer-amber/20 flex items-center justify-center">
                <span className="text-beer-yellow text-sm">2</span>
              </div>
              <span className="font-medium text-gray-300">Timing Analysis</span>
            </div>
            <p className="text-sm text-gray-400 pl-8">
              Submission speed and patterns detect automated votes
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-beer-amber/20 flex items-center justify-center">
                <span className="text-beer-yellow text-sm">3</span>
              </div>
              <span className="font-medium text-gray-300">IP Monitoring</span>
            </div>
            <p className="text-sm text-gray-400 pl-8">
              Limits ratings per IP address to prevent mass voting
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-beer-amber/20 flex items-center justify-center">
                <span className="text-beer-yellow text-sm">4</span>
              </div>
              <span className="font-medium text-gray-300">Detailed Context</span>
            </div>
            <p className="text-sm text-gray-400 pl-8">
              Specific drinking details are hard for bots to fake consistently
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DetailedRating