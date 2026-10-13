import React, { useState } from 'react';
import {
  X,
  Search,
  MapPin,
  Check,
  Globe,
  Compass,
} from 'lucide-react';
import { CityLocation } from '../types/jyotish';
import { CITIES_DATABASE } from '../data/mockData';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCities = CITIES_DATABASE.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.devanagari.includes(searchQuery) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-amber-300 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Select City & Geographical Coordinates
              </h3>
              <p className="text-xs text-stone-500">
                Timings automatically recalculate based on exact sunrise & sidereal ephemeris
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city (e.g. Varanasi, London, New York, Ujjain)..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-amber-600 transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Cities List */}
        <div className="p-4 overflow-y-auto space-y-2 divide-y divide-stone-100">
          {filteredCities.map((city) => {
            const isSelected = city.id === selectedCity.id;

            return (
              <div
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`pt-2 first:pt-0 p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-100/70 border border-amber-300'
                    : 'hover:bg-amber-50/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg ${isSelected ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-500'}`}>
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-stone-900 text-sm">
                        {city.name}
                      </span>
                      <span className="text-xs text-stone-500 font-devanagari">
                        {city.devanagari}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {city.state}, {city.country}
                    </div>
                    <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                      {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E • {city.timezone}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <span className="p-1 rounded-full bg-amber-600 text-white">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>{filteredCities.length} cities available in ephemeris registry</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
