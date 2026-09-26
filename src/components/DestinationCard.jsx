import { MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
  return (
    <div className="bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] hover:shadow-[0_12px_24px_-4px_rgba(56,189,248,0.12)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-[4/3] overflow-hidden bg-sky-50">
        <img 
          src={destination.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center shadow-xs border border-white/10">
          <MapPin className="w-3 h-3 mr-1 text-sky-300" />
          <span>{destination.location}</span>
        </div>

        <div className="absolute top-3 right-3 bg-white/95 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border border-sky-100 shadow-xs">
          ${destination.price} <span className="text-[10px] text-slate-500 font-normal">/ person</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors">
          {destination.name}
        </h3>
        
        <p className="text-slate-500 text-xs sm:text-sm mb-5 line-clamp-2 leading-relaxed flex-grow font-normal">
          {destination.short_description || destination.description}
        </p>
        
        <Link 
          to={`/destinations/${destination.id}`}
          className="mt-auto w-full flex items-center justify-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white py-2.5 px-4 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-xs"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
