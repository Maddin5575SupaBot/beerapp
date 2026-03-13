import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaEdit, FaTrash, FaUser, FaCalendar, FaBeer } from 'react-icons/fa'
import ratingService from '../services/ratingService'

const BeerRating = ({ beerId, beerName, onRatingSubmit }) => {
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [ratingStats, setRatingStats] = useState(null)
  const [recentRatings, setRecentRatings] = useState([])
  const [userRatings, setUserRatings] = useState([])
  const [editingReview, setEditingReview] = useState(false)

  useEffect(() => {
    loadRatingData()
  }, [beerId])

  const loadRatingData = async () => {
    // Load user's rating for this beer
    const userRatingData = ratingService.getUserRating(beerId)
    if (userRatingData) {
      setUserRating(userRatingData.rating)
      setReview(userRatingData.review || '')
    }

    // Load rating statistics
    const stats = ratingService.getBeerRatingStats(beerId)
    setRatingStats(stats)

    // Load recent ratings
    const recent = ratingService.getBeerRatings(beerId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
    setRecentRatings(recent)

    // Load user's other ratings
    const userRatedBeers = ratingService.getUserRatedBeers()
      .filter(r => r.beerId !== beerId)
      .slice(0, 3)
    setUserRatings(userRatedBeers)
  }

  const handleRatingSubmit = () => {
    if (userRating === 0) {
      alert('Please select a rating (1-5 stars)')
      return
    }

    ratingService.rateBeer(beerId, userRating, review)
    
    // Reload data
    loadRatingData()
    
    // Notify parent component
    if (onRatingSubmit) {
      onRatingSubmit({ beerId, rating: userRating, review })
    }

    // Show success message
    alert(`Thanks for rating ${beerName}!`)
  }

  const handleDeleteRating = () => {
    if (window.confirm('Are you sure you want to delete your rating?')) {
      ratingService.deleteRating(beerId)
      setUserRating(0)
      setReview('')
      loadRatingData()
    }
  }

  const renderStars = (rating, interactive = false, size = 'text-2xl') => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={interactive ? () => setUserRating(i) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={`${size} transition-transform ${
            interactive ? 'hover:scale-125 cursor-pointer' : ''
          } ${
            i <= (hoverRating || userRating)
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

  const renderDistribution = () => {
    if (!ratingStats || ratingStats.count === 0) return null

    const maxCount = Math.max(...Object.values(ratingStats.distribution))
    
    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(stars => (
          <div key={stars} className="flex items-center gap-2">
            <div className="w-8 text-right">
              <span className="text-sm text-gray-400">{stars}★</span>
            </div>
            <div className="flex-1">
              <div 
                className="h-2 bg-beer-amber rounded-full"
                style={{ 
                  width: `${(ratingStats.distribution[stars] / maxCount) * 100}%` 
                }}
              />
            </div>
            <div className="w-8 text-left">
              <span className="text-sm text-gray-400">{ratingStats.distribution[stars]}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Rating Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-beer p-6"
      >
        <h2 className="text-2xl font-display font-bold mb-6 text-beer-yellow">
          Rate {beerName}
        </h2>
        
        <div className="space-y-6">
          {/* Star Rating */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex gap-1">
                {renderStars(userRating, true)}
              </div>
              <span className="text-xl font-semibold text-gray-300">
                {userRating > 0 ? `${userRating}.0` : 'Select rating'}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Review Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Review (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts on this beer..."
              rows="4"
              className="input-beer w-full resize-none"
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {review.length}/500 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRatingSubmit}
              disabled={userRating === 0}
              className={`btn-primary flex-1 flex items-center justify-center gap-2 ${
                userRating === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaStar />
              <span>{userRating > 0 ? 'Update Rating' : 'Submit Rating'}</span>
            </motion.button>
            
            {userRating > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteRating}
                className="btn-secondary flex items-center justify-center gap-2 px-6"
              >
                <FaTrash />
                <span>Delete</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Rating Statistics */}
      {ratingStats && ratingStats.count > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-beer p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-beer-yellow">
            Rating Statistics
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-beer-yellow mb-2">
                {ratingStats.average.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(ratingStats.average, false, 'text-lg')}
              </div>
              <div className="text-gray-400">
                {ratingStats.count} {ratingStats.count === 1 ? 'rating' : 'ratings'}
              </div>
            </div>

            {/* Distribution */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4 text-gray-300">
                Rating Distribution
              </h4>
              {renderDistribution()}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Ratings */}
      {recentRatings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card-beer p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-beer-yellow">
            Recent Ratings
          </h3>
          
          <div className="space-y-4">
            {recentRatings.map((rating, index) => (
              <div key={index} className="border-b border-beer-amber/10 pb-4 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-beer-dark flex items-center justify-center">
                      <FaUser className="text-beer-amber" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-300">
                        {rating.userId === 'anonymous' ? 'Anonymous User' : rating.userId}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FaCalendar />
                        <span>{formatDate(rating.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(rating.rating, false, 'text-lg')}
                  </div>
                </div>
                
                {rating.review && (
                  <p className="text-gray-300 mt-2 pl-11">
                    "{rating.review}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* User's Other Ratings */}
      {userRatings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card-beer p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-beer-yellow">
            Your Other Ratings
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {userRatings.map((userRating, index) => (
              <div key={index} className="bg-beer-dark/30 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <FaBeer className="text-beer-amber" />
                  <div className="font-semibold text-gray-300">
                    Beer #{userRating.beerId}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(userRating.rating, false, 'text-sm')}
                </div>
                {userRating.review && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    "{userRating.review}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Rating Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card-beer p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-beer-yellow">
          Rating Guidelines
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(1, false, 'text-sm')}
              </div>
              <span className="text-gray-300">Poor - Undrinkable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(2, false, 'text-sm')}
              </div>
              <span className="text-gray-300">Fair - Has flaws</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(3, false, 'text-sm')}
              </div>
              <span className="text-gray-300">Good - Solid beer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(4, false, 'text-sm')}
              </div>
              <span className="text-gray-300">Very Good - Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(5, false, 'text-sm')}
              </div>
              <span className="text-gray-300">Outstanding - World class</span>
            </div>
          </div>
          
          <div className="text-gray-300">
            <p className="mb-2">Consider these factors when rating:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Aroma and appearance</li>
              <li>Flavor and mouthfeel</li>
              <li>Overall drinkability</li>
              <li>Style accuracy</li>
              <li>Personal enjoyment</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BeerRating