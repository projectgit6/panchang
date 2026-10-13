import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Heart,
  BookOpen,
  Settings,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { NavigationTab, CityLocation } from '../types/jyotish';
import { CITIES_DATABASE } from '../data/mockData';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  selectedCity: CityLocation;
  onCityChange: (city: CityLocation) => void;
  onOpenCityModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  selectedCity,
  onCityChange,
  onOpenCityModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const tabs: { id: NavigationTab; label: string; devanagari: string; icon: any }[] = [
    {
      id: 'daily-panchang',
      label: 'Daily Panchang',
      devanagari: 'दैनिक पञ्चाङ्ग',
      icon: Sun,
    },
    {
      id: 'monthly-calendar',
      label: 'Hindu Calendar',
      devanagari: 'मासिक पञ्चाङ्ग',
      icon: Calendar,
    },
    {
      id: 'muhurat-and-choghadiya',
      label: 'Muhurat & Choghadiya',
      devanagari: 'शुभ मुहूर्त व चौघड़िया',
      icon: Clock,
    },
    {
      id: 'kundli-matching',
      label: 'Kundli Milan (36 Gunas)',
      devanagari: '३६ गुण मिलान',
      icon: Heart,
    },
    {
      id: 'festivals',
      label: 'Festivals & Puja Vidhi',
      devanagari: 'पर्व एवं पूजा विधि',
      icon: BookOpen,
    },
    {
      id: 'admin-cms',
      label: 'Ephemeris CMS',
      devanagari: 'खगोलीय CMS',
      icon: Settings,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding & City Selector Row */}
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onTabChange('daily-panchang')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-white shadow-sm ring-2 ring-amber-400/40 group-hover:scale-105 transition-transform">
                <span className="font-serif font-bold text-lg">ॐ</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                    Surya Chandra
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                    Drik
                  </span>
                </div>
                <div className="text-[11px] text-amber-800 font-devanagari font-medium -mt-0.5">
                  वैदिक ज्योतिष एवं खगोलीय पञ्चाङ्गम्
                </div>
              </div>
            </button>
          </div>

          {/* Right Action: City Coordinates Selector Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium transition-colors shadow-2xs"
                title="Change geographic location"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="font-semibold">{selectedCity.name}</span>
                <span className="hidden md:inline text-amber-700/80 font-mono text-[11px]">
                  ({selectedCity.latitude.toFixed(2)}°N, {selectedCity.longitude.toFixed(2)}°E)
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-amber-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                    <span>Select City</span>
                    <button
                      onClick={() => {
                        setCityDropdownOpen(false);
                        onOpenCityModal();
                      }}
                      className="text-amber-700 hover:underline capitalize"
                    >
                      More Cities...
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 pt-1">
                    {CITIES_DATABASE.slice(0, 8).map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onCityChange(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          city.id === selectedCity.id
                            ? 'bg-amber-100 text-amber-950 font-bold'
                            : 'hover:bg-amber-50 text-stone-700'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{city.name}</div>
                          <div className="text-[10px] text-stone-400 font-devanagari">
                            {city.devanagari} • {city.country}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400">
                          {city.latitude.toFixed(1)}°
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="p-1.5 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => {
                        setCityDropdownOpen(false);
                        onOpenCityModal();
                      }}
                      className="w-full py-1.5 text-center text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg font-medium transition-colors"
                    >
                      Search All Regional Coordinates
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto border-t border-stone-100 py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-devanagari ${
                    isActive ? 'text-amber-100 opacity-90' : 'text-stone-400'
                  }`}
                >
                  ({tab.devanagari})
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/60 bg-white p-4 space-y-1.5 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <span className="font-devanagari text-[11px] opacity-80">
                  {tab.devanagari}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
