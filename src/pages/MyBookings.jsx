import { useState, useEffect } from 'react';
import api from '../services/api';
import BookingCard from '../components/BookingCard';
import { Loader2, Ticket } from 'lucide-react';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('bookings/');
      setBookings(response.data.results || respose.data)
    } catch (error) {
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50/40">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50/40 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3.5 mb-8">
          <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-xs">
            <Ticket className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
        </div>
        
        {bookings.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-400 mb-4 border border-sky-100">
              <Ticket className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No bookings yet</h2>
            <p className="text-slate-500 text-sm mb-7 max-w-sm">Start exploring our incredible destinations and book your next grand adventure today.</p>
            <a 
              href="/destinations" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-xs font-semibold uppercase tracking-wider rounded-lg shadow-xs text-white bg-sky-500 hover:bg-sky-600 transition-colors"
            >
              Browse Destinations
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
