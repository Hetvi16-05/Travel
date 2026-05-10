export const mockTrips = [
  {
    id: 1, title: 'Goa Beach Escape', destination: 'Goa, India', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    startDate: '2024-12-20', endDate: '2024-12-27', days: 7, travelers: 2, budget: 25000, spent: 18500,
    mood: 'Couple', status: 'upcoming', rating: 4.8, highlights: ['Baga Beach','Fort Aguada','Dudhsagar Falls'],
  },
  {
    id: 2, title: 'Rajasthan Heritage Tour', destination: 'Jaipur, India', cover: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    startDate: '2024-11-10', endDate: '2024-11-17', days: 7, travelers: 4, budget: 60000, spent: 55000,
    mood: 'Family', status: 'completed', rating: 4.9, highlights: ['Amber Fort','Hawa Mahal','City Palace'],
  },
  {
    id: 3, title: 'Manali Snow Adventure', destination: 'Manali, India', cover: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    startDate: '2025-01-15', endDate: '2025-01-22', days: 7, travelers: 3, budget: 35000, spent: 0,
    mood: 'Adventure', status: 'planned', rating: 0, highlights: ['Rohtang Pass','Solang Valley','Old Manali'],
  },
  {
    id: 4, title: 'Kerala Backwaters', destination: 'Alleppey, India', cover: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    startDate: '2025-02-05', endDate: '2025-02-10', days: 5, travelers: 2, budget: 20000, spent: 0,
    mood: 'Luxury', status: 'planned', rating: 0, highlights: ['Houseboat','Vembanad Lake','Marari Beach'],
  },
  {
    id: 5, title: 'Ladakh Road Trip', destination: 'Leh, India', cover: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&q=80',
    startDate: '2024-08-01', endDate: '2024-08-12', days: 12, travelers: 5, budget: 80000, spent: 76000,
    mood: 'Adventure', status: 'completed', rating: 5.0, highlights: ['Pangong Lake','Nubra Valley','Khardung La'],
  },
]

export const mockItinerary = [
  {
    day: 1, date: '2024-12-20', city: 'Goa',
    activities: [
      { id: 'a1', time: '08:00', title: 'Arrive at Dabolim Airport', type: 'transport', duration: '1h', icon: '✈️' },
      { id: 'a2', time: '10:00', title: 'Check-in at Beach Resort', type: 'hotel', duration: '1h', icon: '🏨' },
      { id: 'a3', time: '12:00', title: 'Lunch at Fisherman\'s Wharf', type: 'food', duration: '1.5h', icon: '🍽️', cost: 800 },
      { id: 'a4', time: '15:00', title: 'Baga Beach & Water Sports', type: 'activity', duration: '3h', icon: '🏄', cost: 1500 },
      { id: 'a5', time: '20:00', title: 'Dinner & Nightlife at Tito\'s Lane', type: 'food', duration: '2h', icon: '🌙', cost: 1200 },
    ],
  },
  {
    day: 2, date: '2024-12-21', city: 'Goa',
    activities: [
      { id: 'a6', time: '07:00', title: 'Sunrise at Anjuna Beach', type: 'activity', duration: '2h', icon: '🌅' },
      { id: 'a7', time: '10:00', title: 'Old Goa Churches Tour', type: 'culture', duration: '3h', icon: '⛪', cost: 200 },
      { id: 'a8', time: '14:00', title: 'Spice Plantation Visit', type: 'activity', duration: '3h', icon: '🌿', cost: 600 },
      { id: 'a9', time: '19:00', title: 'Sunset Cruise on Mandovi River', type: 'activity', duration: '2h', icon: '🚢', cost: 800 },
    ],
  },
  {
    day: 3, date: '2024-12-22', city: 'Goa',
    activities: [
      { id: 'a10', time: '09:00', title: 'Fort Aguada Trek', type: 'activity', duration: '2h', icon: '🏰', cost: 100 },
      { id: 'a11', time: '12:00', title: 'Seafood Lunch at Ritz Classic', type: 'food', duration: '1.5h', icon: '🦞', cost: 1200 },
      { id: 'a12', time: '15:00', title: 'Calangute Beach Relaxation', type: 'activity', duration: '3h', icon: '🌊' },
      { id: 'a13', time: '20:00', title: 'Casino Night at Deltin Royale', type: 'activity', duration: '4h', icon: '🎰', cost: 2000 },
    ],
  },
]

export const mockActivities = [
  { id: 1, title: 'Scuba Diving in Goa', category: 'Adventure', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', price: 3500, duration: '4h', rating: 4.8, reviews: 234, saved: false, destination: 'Goa' },
  { id: 2, title: 'Heritage Walk - Jaipur Old City', category: 'Culture', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', price: 800, duration: '3h', rating: 4.9, reviews: 189, saved: true, destination: 'Jaipur' },
  { id: 3, title: 'Backwater Houseboat Cruise', category: 'Relaxation', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', price: 6500, duration: '1 day', rating: 4.7, reviews: 312, saved: false, destination: 'Kerala' },
  { id: 4, title: 'Street Food Tour - Mumbai', category: 'Food', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', price: 1200, duration: '3h', rating: 4.6, reviews: 445, saved: true, destination: 'Mumbai' },
  { id: 5, title: 'Snow Skiing - Solang Valley', category: 'Adventure', image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80', price: 2500, duration: '5h', rating: 4.8, reviews: 167, saved: false, destination: 'Manali' },
  { id: 6, title: 'Tiger Safari - Ranthambore', category: 'Nature', image: 'https://images.unsplash.com/photo-1477764250597-dffe9f601ae8?w=600&q=80', price: 4500, duration: '4h', rating: 4.9, reviews: 278, saved: false, destination: 'Ranthambore' },
  { id: 7, title: 'Rooftop Yoga - Rishikesh', category: 'Relaxation', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', price: 500, duration: '2h', rating: 4.7, reviews: 523, saved: true, destination: 'Rishikesh' },
  { id: 8, title: 'Goa Night Party - Tito\'s Lane', category: 'Nightlife', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', price: 1500, duration: '5h', rating: 4.5, reviews: 391, saved: false, destination: 'Goa' },
]

export const mockDestinations = [
  { id: 1, name: 'Goa', country: 'India', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', avgCost: 3500, popularity: 96, tags: ['Beach','Party','History'], rating: 4.8 },
  { id: 2, name: 'Jaipur', country: 'India', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80', avgCost: 2800, popularity: 92, tags: ['Heritage','Culture','Food'], rating: 4.9 },
  { id: 3, name: 'Manali', country: 'India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', avgCost: 3000, popularity: 94, tags: ['Snow','Adventure','Mountains'], rating: 4.7 },
  { id: 4, name: 'Kerala', country: 'India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', avgCost: 4000, popularity: 90, tags: ['Backwaters','Beaches','Ayurveda'], rating: 4.8 },
  { id: 5, name: 'Ladakh', country: 'India', image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&q=80', avgCost: 5500, popularity: 88, tags: ['Mountains','Adventure','Culture'], rating: 5.0 },
  { id: 6, name: 'Rishikesh', country: 'India', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', avgCost: 2000, popularity: 85, tags: ['Yoga','Rafting','Spiritual'], rating: 4.6 },
  { id: 7, name: 'Udaipur', country: 'India', image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=800&q=80', avgCost: 3500, popularity: 87, tags: ['Lakes','Palaces','Romance'], rating: 4.9 },
  { id: 8, name: 'Andaman Islands', country: 'India', image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80', avgCost: 6000, popularity: 82, tags: ['Beach','Diving','Islands'], rating: 4.8 },
]

export const mockBudget = {
  total: 25000, spent: 18500,
  categories: [
    { name: 'Transport', budget: 6000, spent: 5200, color: '#6366F1', icon: '✈️' },
    { name: 'Hotel', budget: 8000, spent: 7200, color: '#8B5CF6', icon: '🏨' },
    { name: 'Food', budget: 5000, spent: 3800, color: '#F59E0B', icon: '🍽️' },
    { name: 'Activities', budget: 4000, spent: 2100, color: '#10B981', icon: '🎯' },
    { name: 'Shopping', budget: 2000, spent: 200, color: '#EF4444', icon: '🛍️' },
  ],
  dailySpend: [
    { day: 'Day 1', amount: 3200 }, { day: 'Day 2', amount: 2800 },
    { day: 'Day 3', amount: 4100 }, { day: 'Day 4', amount: 2500 },
    { day: 'Day 5', amount: 3200 }, { day: 'Day 6', amount: 2700 },
  ],
}

export const mockPackingList = [
  { category: 'Clothes', icon: '👕', items: [
    { id: 'c1', name: 'T-shirts (5)', checked: true },
    { id: 'c2', name: 'Shorts (3)', checked: true },
    { id: 'c3', name: 'Swimwear', checked: false },
    { id: 'c4', name: 'Light jacket', checked: false },
    { id: 'c5', name: 'Comfortable footwear', checked: true },
  ]},
  { category: 'Electronics', icon: '📱', items: [
    { id: 'e1', name: 'Phone + charger', checked: true },
    { id: 'e2', name: 'Power bank', checked: true },
    { id: 'e3', name: 'Camera + memory cards', checked: false },
    { id: 'e4', name: 'Earphones', checked: false },
    { id: 'e5', name: 'Universal adapter', checked: false },
  ]},
  { category: 'Documents', icon: '📋', items: [
    { id: 'd1', name: 'Passport / Aadhar', checked: true },
    { id: 'd2', name: 'Flight tickets', checked: true },
    { id: 'd3', name: 'Hotel bookings', checked: false },
    { id: 'd4', name: 'Travel insurance', checked: false },
  ]},
  { category: 'Medicines', icon: '💊', items: [
    { id: 'm1', name: 'Pain relievers', checked: false },
    { id: 'm2', name: 'Antacids', checked: false },
    { id: 'm3', name: 'Sunscreen SPF 50', checked: true },
    { id: 'm4', name: 'Motion sickness pills', checked: false },
  ]},
  { category: 'Accessories', icon: '🕶️', items: [
    { id: 'ac1', name: 'Sunglasses', checked: true },
    { id: 'ac2', name: 'Hat / Cap', checked: false },
    { id: 'ac3', name: 'Travel pillow', checked: false },
    { id: 'ac4', name: 'Reusable water bottle', checked: true },
  ]},
]

export const mockNotes = [
  { id: 1, day: 'Day 1', date: '2024-12-20', title: 'Arrival Day ✈️', content: '## Arrived in Goa!\n\nFlights were smooth. The resort is absolutely stunning — right on the beach. The sea breeze is incredible. Had fresh coconut water right at the reception.\n\n### Highlights\n- Warm welcome at the resort\n- Sunset views from the balcony\n- Best seafood dinner at the beach shack', mood: '😊', images: [] },
  { id: 2, day: 'Day 2', date: '2024-12-21', title: 'Churches & Beaches 🏖️', content: '## Old Goa Tour\n\nVisited the magnificent Basilica of Bom Jesus. The architecture was breathtaking. History lover\'s paradise!\n\nAnthony loved the spice plantation in the afternoon. The fragrance was unreal.', mood: '😍', images: [] },
  { id: 3, day: 'Day 3', date: '2024-12-22', title: 'Fort Aguada & Casino Night 🎰', content: '## Adventure Day!\n\nThe fort views of the Arabian Sea were unreal. Tried our luck at the casino at night — won ₹500! 🎉', mood: '🤩', images: [] },
]

export const mockAdminStats = {
  totalUsers: 12847, activeTrips: 3421, revenue: 4280000, satisfaction: 4.8,
  topDestinations: [
    { name: 'Goa', trips: 2341, growth: '+12%' },
    { name: 'Manali', trips: 1892, growth: '+28%' },
    { name: 'Jaipur', trips: 1654, growth: '+8%' },
    { name: 'Kerala', trips: 1432, growth: '+15%' },
    { name: 'Ladakh', trips: 987, growth: '+34%' },
  ],
  monthlyUsers: [
    { month: 'Jul', users: 8200 }, { month: 'Aug', users: 9800 },
    { month: 'Sep', users: 8600 }, { month: 'Oct', users: 10200 },
    { month: 'Nov', users: 11400 }, { month: 'Dec', users: 12847 },
  ],
}

export const aiSuggestions = [
  "Plan a 5-day Goa trip under ₹15000",
  "Best places to visit in Rajasthan in winter",
  "Adventure activities in Rishikesh for beginners",
  "Budget honeymoon destinations in India",
  "Family trip to Kerala with kids",
  "Solo backpacking route through Northeast India",
]

export const tripMoods = [
  { id: 'adventure', label: 'Adventure', icon: '🏔️', desc: 'Trekking, camping, thrills', color: '#EF4444' },
  { id: 'luxury', label: 'Luxury', icon: '✨', desc: 'Five-star comfort & spa', color: '#F59E0B' },
  { id: 'backpacking', label: 'Backpacking', icon: '🎒', desc: 'Budget & explore freely', color: '#10B981' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Fun for everyone', color: '#3B82F6' },
  { id: 'couple', label: 'Couple', icon: '💑', desc: 'Romantic getaway', color: '#EC4899' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕉️', desc: 'Peace, yoga & temples', color: '#8B5CF6' },
]
