import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBeer, FaSearch, FaStar, FaUser } from 'react-icons/fa'
import HomePage from './pages/HomePage'
import BeerListPage from './pages/BeerListPage'
import BeerDetailPage from './pages/BeerDetailPage'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="min-h-screen bg-gradient-beer">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers" element={<BeerListPage />} />
          <Route path="/beer/:id" element={<BeerDetailPage />} />
        </Routes>
      </main>
      
      <footer className="mt-16 py-8 text-center text-gray-400 border-t border-beer-amber/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FaBeer className="text-2xl text-beer-yellow animate-bubble" />
            <span className="text-xl font-display font-bold text-gradient">BeerApp</span>
          </motion.div>
          <p className="text-sm">🍻 Discover, Rate, Enjoy • Made with love for beer enthusiasts</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} BeerApp • Please drink responsibly</p>
        </div>
      </footer>
    </div>
  )
}

export default App