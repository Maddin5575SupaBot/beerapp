# 🍻 BeerApp

A modern web application for beer enthusiasts to discover, rate, and learn about beers.

## 🎯 Project Vision

Create a beautiful, intuitive app that helps users:
- Discover new beers based on preferences
- Rate and review beers
- Learn about beer styles and characteristics
- Track beers they've tried
- Get personalized recommendations

## 🚀 Features (Planned)

### Core Features
- **Beer Discovery**: Browse beers by style, brewery, country, ABV, etc.
- **Rating System**: Rate beers 1-5 stars with written reviews
- **Beer Database**: Comprehensive beer information (style, ABV, IBU, tasting notes)
- **User Profiles**: Track tried beers, wishlist, ratings history
- **Search & Filter**: Advanced search with multiple criteria

### Advanced Features
- **Personalized Recommendations**: AI-powered suggestions based on taste preferences
- **Social Features**: Follow friends, see their ratings
- **Brewery Information**: Details about breweries, locations, tours
- **Seasonal/ Trending**: Discover seasonal beers and trending picks
- **Mobile Responsive**: Works perfectly on all devices

## 🏗️ Tech Stack

### Frontend
- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for data fetching
- **Framer Motion** for animations

### Backend Options
- **Option A**: Node.js/Express with MongoDB
- **Option B**: Python/FastAPI with PostgreSQL
- **Option C**: Firebase/Firestore for quick start

### APIs & Data Sources
- **BreweryDB API** or **Punk API** for beer data
- **Open Brewery DB** for brewery information
- **Custom database** for user ratings/reviews

## 📁 Project Structure

```
BeerApp/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── services/   # API services
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utility functions
│   └── public/         # Static assets
├── backend/            # Backend server
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── models/     # Data models
│   │   ├── controllers/# Business logic
│   │   └── middleware/ # Middleware functions
│   └── tests/          # Backend tests
├── docs/               # Documentation
├── docker/             # Docker configuration
└── scripts/            # Build/deployment scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- (Optional) Docker for containerization

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd BeerApp

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Backend setup (choose one)
cd ../backend
npm install  # For Node.js
# or
pip install -r requirements.txt  # For Python
```

## 🎨 Design Principles

1. **Beer-Centric Design**: Visuals inspired by beer culture
2. **Mobile-First**: Responsive design for all devices
3. **Performance**: Fast loading, optimized images
4. **Accessibility**: WCAG compliant, keyboard navigation
5. **User Experience**: Intuitive navigation, clear information hierarchy

## 📱 Screens (Planned)

1. **Homepage**: Featured beers, recommendations, search
2. **Beer Listing**: Grid/list view with filters
3. **Beer Detail**: Comprehensive beer information, ratings, reviews
4. **User Profile**: Personal stats, ratings history, wishlist
5. **Search Results**: Advanced filtering options
6. **Brewery Pages**: Brewery information and their beers

## 🔧 Development Roadmap

### Phase 1: MVP (2-3 weeks)
- Basic beer listing with mock data
- Simple rating system
- Responsive design
- Basic search functionality

### Phase 2: Core Features (3-4 weeks)
- Real API integration
- User authentication
- Advanced filtering
- Personal recommendations

### Phase 3: Advanced Features (4-6 weeks)
- Social features
- Brewery information
- Seasonal/trending sections
- Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Beer data from various open APIs
- Icons from FontAwesome/React Icons
- Design inspiration from popular beer apps

---

**Let's build something awesome for beer lovers!** 🍻

*"Beer is proof that God loves us and wants us to be happy." - Benjamin Franklin*