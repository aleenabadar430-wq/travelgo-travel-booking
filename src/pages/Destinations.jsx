import { useState, useEffect } from 'react';
import api from '../services/api';
import DestinationCard from '../components/DestinationCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const FALLBACK_DESTINATIONS = [
  {
    id: 1,
    name: "Santorini Island Experience",
    location: "Greece",
    price: "1499.00",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    short_description: "Explore whitewashed houses, volcanic beaches, and stunning Aegean sunsets.",
    description: "Experience the legendary beauty of Santorini with its iconic blue-domed churches, dramatic cliffside views, and luxurious Mediterranean coastline."
  },
  {
    id: 2,
    name: "Kyoto Ancient Temples",
    location: "Japan",
    price: "1850.00",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    short_description: "Discover serene bamboo groves, historic shrines, and traditional tea houses.",
    description: "Immerse yourself in Japan's cultural heartland, surrounded by historic temples, serene gardens, and vibrant seasonal foliage."
  },
  {
    id: 3,
    name: "Swiss Alps Adventure",
    location: "Switzerland",
    price: "2200.00",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    short_description: "Majestic snow-capped peaks, scenic mountain railways, and alpine hiking.",
    description: "Marvel at the majestic Matterhorn, ride world-famous glacier express trains, and relax in pristine alpine villages."
  },
  {
    id: 4,
    name: "Bali Tropical Paradise",
    location: "Indonesia",
    price: "1199.00",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    short_description: "Lush rice terraces, pristine beaches, and spiritual wellness retreats.",
    description: "Escape to the Island of the Gods with crystal clear waters, tropical jungle sanctuaries, and vibrant local culture."
  }
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await api.get('destinations/');
      const data = response.data;
      const list = Array.isArray(data)
        ? data
        : (Array.isArray(data?.results)
          ? data.results
          : (Array.isArray(data?.destinations) ? data.destinations : []));

      if (list.length > 0) {
        setDestinations(list);
      } else {
        setDestinations(FALLBACK_DESTINATIONS);
      }
    } catch (error) {
      console.warn('Backend server connection failed or unavailable, showing demo destinations:', error);
      toast.info('Backend server not connected. Displaying demo destinations.');
      setDestinations(FALLBACK_DESTINATIONS);
    } finally {
      setLoading(false);
    }
  };

  const destinationList = Array.isArray(destinations) ? destinations : [];

  const filteredAndSortedDestinations = destinationList
    .filter(dest => 
      (dest.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === '' || (dest.location || '').toLowerCase().includes(locationFilter.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price_asc') return parseFloat(a.price || 0) - parseFloat(b.price || 0);
      if (sortBy === 'price_desc') return parseFloat(b.price || 0) - parseFloat(a.price || 0);
      return 0;
    });

  const uniqueLocations = [...new Set(destinationList.map(d => d.location).filter(Boolean))];

  return (
    <div className="bg-sky-50/40 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Header Banner */}
        <div className="bg-slate-950 text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-md text-center relative overflow-hidden border border-sky-950">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-500/20 text-sky-200 border border-sky-400/30 uppercase tracking-widest mb-3">
              Curated Travel Experiences
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Explore Worldwide Destinations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              Hand-picked journeys designed for comfort, authenticity, and unforgettable memories.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-sky-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations..."
              className="pl-10 w-full py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400 bg-sky-50/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Showing <span className="text-slate-900 font-bold">{filteredAndSortedDestinations.length}</span> destinations
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-9 w-9 text-sky-500 animate-spin" />
          </div>
        ) : filteredAndSortedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAndSortedDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-sky-100 shadow-xs">
            <p className="text-base font-semibold text-slate-700 mb-2">No matching destinations found.</p>
            <p className="text-xs text-slate-500 mb-5">Try adjusting your search criteria or reset filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setLocationFilter(''); setSortBy('default'); }}
              className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg text-xs font-semibold hover:bg-sky-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
