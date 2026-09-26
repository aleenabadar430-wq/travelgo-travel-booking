import { Calendar, Users, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';

const BookingCard = ({ booking }) => {
  const statusConfig = {
    pending: { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: Clock, label: 'Pending' },
    confirmed: { color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle, label: 'Confirmed' },
    cancelled: { color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', icon: XCircle, label: 'Cancelled' }
  };

  const status = booking.status || 'pending';
  const { color, bg, icon: StatusIcon, label } = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <div className="bg-white rounded-xl border border-sky-100/80 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.05)] p-5 flex flex-col md:flex-row gap-5 hover:border-sky-200 transition-all duration-200">
      <div className="md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden bg-sky-50 border border-sky-100">
        <img 
          src={booking.destination?.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={booking.destination?.name || 'Destination'} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-900">
              {booking.destination?.name || 'Unknown Destination'}
            </h3>
            <span className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border ${color} ${bg}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </span>
          </div>
          
          <div className="space-y-2.5 mt-3 text-slate-600">
            <div className="flex items-center text-sm">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center mr-2.5 text-sky-600">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-700">{booking.destination?.location || 'Location Not available'}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center mr-2.5 text-sky-600">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-700">
                {new Date(booking.travel_date).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center mr-2.5 text-sky-600">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-700">{booking.number_of_people} {booking.number_of_people === 1 ? 'Person' : 'People'}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
          <div className="text-xs text-slate-500">
            Booking Reference: <span className="font-mono font-semibold text-slate-800">#{booking.id?.toString().padStart(6, '0') || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
