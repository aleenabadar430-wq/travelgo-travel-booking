import { Link } from 'react-router-dom';
import { Compass, Camera, Map } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-sky-50/40">
      {/* Hero Section */}
      <div className="relative h-[72vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-sky-950 bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Travel background" 
            className="w-full h-full object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/20 text-sky-200 backdrop-blur-md border border-sky-400/30 uppercase tracking-widest mb-5">
            Welcome to TravelGo
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Discover Your Next <span className="text-sky-400">Adventure</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200 mb-9 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore the world's most beautiful destinations with TravelGo. Hand-crafted journeys designed for comfort and peace of mind.
          </p>
          <Link 
            to="/destinations" 
            className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 px-8 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            Start Exploring
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Why Choose TravelGo</h2>
          <div className="w-12 h-1 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 mb-6 shadow-xs">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Expert Guides</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Our local experts ensure you experience the authentic heart of every destination.</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 mb-6 shadow-xs">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Curated Experiences</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Hand-picked itineraries designed to create unforgettable lifelong memories.</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 mb-6 shadow-xs">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Breathtaking Views</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Stay in locations that offer the most spectacular scenery in the world.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-slate-950 border-t border-sky-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">Ready for your next journey?</h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto font-normal">Join thousands of travelers who have already discovered their dream destinations with us.</p>
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 px-7 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-md"
          >
            Create an Account today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
