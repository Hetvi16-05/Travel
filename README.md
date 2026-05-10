# 🌍 Travia: Your AI-Powered Travel Guide

Travia is a modern, high-performance travel planning platform that leverages AI to transform how you explore the world. From generating custom itineraries to tracking your travel budget and generating detailed booking reports, Travia is designed to be your ultimate digital travel companion.

![Travia Dashboard](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80)

## ✨ Key Features

*   **🤖 Travia Guide (AI Assistant)**: A conversational AI persona that understands your travel dreams and builds personalized itineraries in seconds.
*   **📍 Interactive Itinerary Builder**: A split-view interface with a live Map (Leaflet) and a chronological Timeline.
*   **💰 Smart Budgeting**: Real-time expense tracking with category breakdowns and "budget health" analytics.
*   **📜 Booking Reports**: Professional, automatically generated invoices and summaries for your trips.
*   **🌏 Destination Discovery**: Explore trending cities with high-quality landscape imagery and curated activity suggestions.
*   **☁️ Cloud Sync**: Secure authentication and persistent storage for all your travel plans.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS (Custom Glassmorphism Theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Leaflet & React Leaflet
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL
- **AI Integration**: NLP
- **Security**: JWT Authentication, Bcrypt, Helmet, CORS

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL

### 1. Clone & Install
```bash
git clone https://github.com/Hetvi16-05/Travel.git
cd Travel

# Install Frontend dependencies
npm install

# Install Backend dependencies
cd server
npm install
```

### 2. Environment Setup
Create a `.env` file in the `server` directory:
```env
PORT=5001
DATABASE_URL=postgresql://user:password@localhost:5432/travia
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Database Setup
```bash
# In the /server directory
npm run migrate
npm run seed # If you have a local psql client configured
```

### 4. Run Locally
Open two terminal windows:

**Terminal 1 (Backend)**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend)**
```bash
npm run dev
```

The app should now be running at `http://localhost:5173`.

---

## 📁 Project Structure

```text
Travel/
├── src/                # React Frontend
│   ├── components/     # UI & Feature Components
│   ├── pages/          # Page Views (Dashboard, Itinerary, etc.)
│   ├── context/        # Global App State
│   └── lib/            # API Client & Utilities
├── server/             # Node.js Backend
│   ├── src/
│   │   ├── modules/    # Modular Feature Logic (AI, Trips, Auth)
│   │   └── middleware/ # Auth & Error Handling
│   └── seeds/          # Database Seed Scripts
└── public/             # Static Assets
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

