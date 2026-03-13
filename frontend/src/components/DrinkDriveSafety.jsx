import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCar, FaBeer, FaGlassCheers, FaClock, FaUser, FaFlag, FaExclamationTriangle, FaShieldAlt, FaTaxi, FaBus, FaWalking, FaBan } from 'react-icons/fa'
import drinkDriveService from '../services/drinkDriveService'

const DrinkDriveSafety = () => {
  const [userInfo, setUserInfo] = useState({
    weight: 70, // kg
    gender: 'male',
    country: 'us'
  })
  
  const [drinks, setDrinks] = useState([])
  const [hours, setHours] = useState(1)
  const [bac, setBac] = useState(0)
  const [results, setResults] = useState(null)
  const [safetyTips, setSafetyTips] = useState([])
  const [emergencyContacts, setEmergencyContacts] = useState(null)
  const [alcoholFreeOptions, setAlcoholFreeOptions] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setSafetyTips(drinkDriveService.getSafetyTips())
    setEmergencyContacts(drinkDriveService.getEmergencyContacts(userInfo.country))
    setAlcoholFreeOptions([
      { name: 'Alcohol-Free Beer', description: 'Taste of beer without alcohol', icon: '🍺' },
      { name: 'Mocktails', description: 'Creative non-alcoholic cocktails', icon: '🍹' },
      { name: 'Sparkling Water', description: 'With lemon or lime', icon: '💧' },
      { name: 'Juice & Soda', description: 'Various fruit juices and soft drinks', icon: '🥤' },
      { name: 'Tea & Coffee', description: 'Hot or iced varieties', icon: '☕' },
      { name: 'Energy Drinks', description: 'For staying alert', icon: '⚡' }
    ])
  }

  const addDrink = () => {
    const newDrink = {
      id: Date.now(),
      type: 'beer',
      volume: 500, // ml
      abv: 5.0, // %
      time: new Date().toISOString()
    }
    setDrinks([...drinks, newDrink])
  }

  const updateDrink = (id, field, value) => {
    setDrinks(drinks.map(drink => 
      drink.id === id ? { ...drink, [field]: value } : drink
    ))
  }

  const removeDrink = (id) => {
    setDrinks(drinks.filter(drink => drink.id !== id))
  }

  const calculateBAC = () => {
    // IMPORTANT DISCLAIMER
    alert('⚠️ IMPORTANT: This calculator is for educational purposes only.\n\nDO NOT drink and drive. Always use designated drivers, taxis, or public transportation.\n\nThis tool estimates BAC but individual metabolism varies. When in doubt, don\'t drive.')

    const calculatedBAC = drinkDriveService.calculateBAC(
      userInfo.weight,
      userInfo.gender,
      drinks,
      hours
    )
    
    setBac(calculatedBAC)
    
    const legalCheck = drinkDriveService.checkLegalToDrive(calculatedBAC, userInfo.country)
    const timeUntilSober = drinkDriveService.estimateTimeUntilSober(calculatedBAC)
    const effects = drinkDriveService.getEffectsAtBAC(calculatedBAC)
    
    setResults({
      bac: calculatedBAC,
      legalCheck,
      timeUntilSober,
      effects,
      standardDrinks: drinks.reduce((sum, drink) => 
        sum + drinkDriveService.calculateStandardDrinks(drink.volume, drink.abv), 0
      )
    })
  }

  const createDrinkingPlan = () => {
    const plan = drinkDriveService.createDrinkingPlan(
      userInfo.weight,
      userInfo.gender,
      hours,
      userInfo.country
    )
    
    alert(`🍻 Safe Drinking Plan:\n\n${plan.recommendation}\n\nTips:\n${plan.tips.join('\n• ')}`)
  }

  const getBACColor = (bacValue) => {
    if (bacValue < 0.03) return 'text-green-400'
    if (bacValue < 0.05) return 'text-yellow-400'
    if (bacValue < 0.08) return 'text-orange-400'
    return 'text-red-400'
  }

  const getBACBackground = (bacValue) => {
    if (bacValue < 0.03) return 'bg-green-400/20'
    if (bacValue < 0.05) return 'bg-yellow-400/20'
    if (bacValue < 0.08) return 'bg-orange-400/20'
    return 'bg-red-400/20'
  }

  return (
    <div className="space-y-8">
      {/* Header with Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold mb-4 text-gradient">
          🚗 Drink n Drive Safety
        </h1>
        <div className="card-beer p-4 bg-red-900/20 border border-red-700/50">
          <div className="flex items-center gap-3">
            <FaBan className="text-red-400 text-2xl" />
            <div className="text-left">
              <h3 className="text-xl font-bold text-red-300">⚠️ IMPORTANT DISCLAIMER</h3>
              <p className="text-gray-300">
                <strong>DO NOT DRINK AND DRIVE.</strong> This tool is for educational purposes only. 
                Always use designated drivers, taxis, or public transportation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card-beer p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-beer-yellow flex items-center gap-2">
          <FaUser />
          <span>Your Information</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              min="40"
              max="150"
              value={userInfo.weight}
              onChange={(e) => setUserInfo({ ...userInfo, weight: parseFloat(e.target.value) })}
              className="input-beer w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={userInfo.gender}
              onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
              className="input-beer w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <select
              value={userInfo.country}
              onChange={(e) => {
                setUserInfo({ ...userInfo, country: e.target.value })
                setEmergencyContacts(drinkDriveService.getEmergencyContacts(e.target.value))
              }}
              className="input-beer w-full"
            >
              <option value="us">United States (0.08%)</option>
              <option value="uk">United Kingdom (0.08%)</option>
              <option value="de">Germany (0.05%)</option>
              <option value="se">Sweden (0.02%)</option>
              <option value="cz">Czech Republic (0.00%)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Drink Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-beer p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-beer-yellow flex items-center gap-2">
            <FaBeer />
            <span>Drinks Consumed</span>
          </h2>
          <button
            onClick={addDrink}
            className="btn-primary flex items-center gap-2"
          >
            <FaGlassCheers />
            <span>Add Drink</span>
          </button>
        </div>
        
        {drinks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FaBeer className="text-4xl mx-auto mb-4 opacity-50" />
            <p>No drinks added yet. Click "Add Drink" to start.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {drinks.map((drink, index) => (
              <div key={drink.id} className="bg-beer-dark/30 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <FaBeer className="text-beer-amber text-xl" />
                    <span className="font-semibold text-gray-300">
                      Drink #{index + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => removeDrink(drink.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Type</label>
                    <select
                      value={drink.type}
                      onChange={(e) => updateDrink(drink.id, 'type', e.target.value)}
                      className="input-beer w-full"
                    >
                      <option value="beer">Beer</option>
                      <option value="wine">Wine</option>
                      <option value="spirits">Spirits</option>
                      <option value="cocktail">Cocktail</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Volume (ml)</label>
                    <input
                      type="number"
                      min="100"
                      max="1000"
                      step="50"
                      value={drink.volume}
                      onChange={(e) => updateDrink(drink.id, 'volume', parseFloat(e.target.value))}
                      className="input-beer w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Alcohol % (ABV)</label>
                    <input
                      type="number"
                      min="0.5"
                      max="40"
                      step="0.1"
                      value={drink.abv}
                      onChange={(e) => updateDrink(drink.id, 'abv', parseFloat(e.target.value))}
                      className="input-beer w-full"
                    />
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-gray-400">
                  Standard drinks: {drinkDriveService.calculateStandardDrinks(drink.volume, drink.abv).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <FaClock className="inline mr-2" />
            Time since first drink (hours)
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="input-beer w-full"
          />
        </div>
      </motion.div>

      {/* Calculate Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <button
          onClick={calculateBAC}
          className="btn-primary px-8 py-4 text-lg flex items-center gap-3 mx-auto"
        >
          <FaCar />
          <span>Calculate BAC & Safety Status</span>
        </button>
        
        <button
          onClick={createDrinkingPlan}
          className="btn-secondary mt-4 px-8 py-3"
        >
          Create Safe Drinking Plan
        </button>
      </motion.div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* BAC Display */}
          <div className={`card-beer p-6 ${getBACBackground(results.bac)}`}>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <span className={getBACColor(results.bac)}>
                  {results.bac.toFixed(3)}%
                </span>
              </div>
              <div className="text-xl font-semibold mb-4">
                Blood Alcohol Content (BAC)
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-beer-dark/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Standard Drinks</div>
                  <div className="text-2xl font-bold text-beer-yellow">
                    {results.standardDrinks.toFixed(1)}
                  </div>
                </div>
                
                <div className="bg-beer-dark/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Time to Sober</div>
                  <div className="text-2xl font-bold text-beer-yellow">
                    {results.timeUntilSober}h
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  results.legalCheck.legal ? 'bg-green-900/30' : 'bg-red-900/30'
                }`}>
                  <div className="text-sm text-gray-400">Legal to Drive</div>
                  <div className={`text-2xl font-bold ${
                    results.legalCheck.legal ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {results.legalCheck.legal ? 'YES' : 'NO'}
                  </div>
                </div>
              </div>
              
              {!results.legalCheck.legal && (
                <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <FaExclamationTriangle className="text-red-400 text-2xl" />
                    <div>
                      <div className="font-bold text-red-300">
                        ⚠️ DO NOT DRIVE
                      </div>
                      <div className="text-gray-300">
                        You are {results.legalCheck.overBy.toFixed(3)}% over the legal limit of {results.legalCheck.limit}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Effects */}
          {results.effects.current.length > 0 && (
            <div className="card-beer p-6">
              <h3 className="text-xl font-semibold mb-4 text-beer-yellow">
                Current Effects
              </h3>
              <ul className="space-y-2">
                {results.effects.current.map((effect, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-beer-amber"></div>
                    <span className="text-gray-300">{effect}</span>
                  </li>
                ))}
              </ul>
              
              {results.effects.upcoming.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold mt-6 mb-3 text-beer-amber">
                    Approaching Effects
                  </h4>
                  <ul className="space-y-2">
                    {results.effects.upcoming.map((effect, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-beer-amber/50"></div>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Alcohol-Free Options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card-beer p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-beer-yellow">
          🚫 Alcohol-Free Options
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {alcoholFreeOptions.map((option, index) => (
            <div key={index} className="bg-beer-dark/30 p-4 rounded-lg hover:bg-beer-dark/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="font-semibold text-gray-300">{option.name}</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">{option.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Remember: You can always enjoy social events without alcohol!
          </p>
        </div>
      </motion.div>

      {/* Safety Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="card-beer p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-beer-yellow flex items-center gap-2">
          <FaShieldAlt />
          <span>Safety Tips</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {safetyTips.map((section, index) => (
            <div key={index} className="bg-beer-dark/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-beer-amber">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-beer-amber mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Contacts & Transportation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="card-beer p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-beer-yellow">
          🚕 Alternative Transportation
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          {emergencyContacts && (
            <div className="bg-beer-dark/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-beer-amber">
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Emergency</div>
                  <div className="text-xl font-bold text-red-400">
                    {emergencyContacts.emergency}
                  </div>
                </div>
                {emergencyContacts.poisonControl && (
                  <div>
                    <div className="text-sm text-gray-400">Poison Control</div>
                    <div className="text-lg font-semibold text-beer-yellow">
                      {emergencyContacts.poisonControl}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Transportation Options */}
          <div className="bg-beer-dark/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-beer-amber">
              Get Home Safe
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaTaxi className="text-beer-yellow text-xl" />
                <div>
                  <div className="font-semibold text-gray-300">Ride-Sharing</div>
                  <div className="text-sm text-gray-400">
                    {emergencyContacts?.rideSharing?.join(', ') || 'Uber, Lyft'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaBus className="text-beer-yellow text-xl" />
                <div>
                  <div className="font-semibold text-gray-300">Public Transport</div>
                  <div className="text-sm text-gray-400">
                    Check local bus/train schedules
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaWalking className="text-beer-yellow text-xl" />
                <div>
                  <div className="font-semibold text-gray-300">Walking</div>
                  <div className="text-sm text-gray-400">
                    Only if safe and close
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">Designated Driver</div>
                <div className="text-gray-300">
                  Always plan for a sober driver before drinking
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-400 text-2xl" />
            <div>
              <div className="font-bold text-red-300">FINAL WARNING</div>
              <div className="text-gray-300">
                No amount of alcohol is safe for driving. If you drink, don't drive. 
                If you drive, don't drink. Your life and others' lives depend on it.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DrinkDriveSafety