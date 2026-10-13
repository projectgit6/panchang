import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Clock,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Printer,
  Copy,
  Info,
  Sparkles,
  Flame,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { CityLocation } from '../types/jyotish';
import {
  INITIAL_PANCHANG_DAY,
  DAY_CHOGHADIYA,
  NIGHT_CHOGHADIYA,
  PLANETARY_POSITIONS,
} from '../data/mockData';

interface DailyPanchangViewProps {
  selectedCity: CityLocation;
  currentDateStr: string;
  onDateChange: (dateStr: string) => void;
  onOpenFestivalDetail?: (festivalId: string) => void;
  onShowToast: (message: string) => void;
}

export const DailyPanchangView: React.FC<DailyPanchangViewProps> = ({
  selectedCity,
  currentDateStr,
  onDateChange,
  onOpenFestivalDetail,
  onShowToast,
}) => {
  const [choghadiyaTab, setChoghadiyaTab] = useState<'day' | 'night'>('day');
  const [copied, setCopied] = useState(false);

  // Parse date
  const dateObj = new Date(currentDateStr);
  const formattedDateHeading = dateObj.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrevDay = () => {
    const prev = new Date(dateObj);
    prev.setDate(prev.getDate() - 1);
    onDateChange(prev.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const next = new Date(dateObj);
    next.setDate(next.getDate() + 1);
    onDateChange(next.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    onDateChange(new Date().toISOString().split('T')[0]);
  };

  const panchang = INITIAL_PANCHANG_DAY;

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Daily Panchang for ${selectedCity.name} - ${formattedDateHeading}\nTithi: ${panchang.tithi.name} (${panchang.tithi.endingTime})\nNakshatra: ${panchang.nakshatra.name} (${panchang.nakshatra.endingTime})\nSunrise: ${panchang.sunrise} | Sunset: ${panchang.sunset}\nAbhijit Muhurat: 11:43 - 12:28\nRahu Kaal: 13:30 - 14:55`
    );
    setCopied(true);
    onShowToast('Panchang summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Date Navigation & Regional Bar */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Day & Date Picker */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center bg-amber-50/80 border border-amber-200 rounded-xl p-1">
              <button
                onClick={handlePrevDay}
                title="Previous Day"
                className="p-2 hover:bg-amber-100 rounded-lg text-amber-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-3 py-1 text-center min-w-[170px] sm:min-w-[210px]">
                <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
                  {panchang.vaar} • {panchang.paksha} Paksha
                </div>
                <div className="text-base sm:text-lg font-serif font-bold text-stone-900">
                  {formattedDateHeading}
                </div>
              </div>
              <button
                onClick={handleNextDay}
                title="Next Day"
                className="p-2 hover:bg-amber-100 rounded-lg text-amber-900 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleToday}
              className="px-3.5 py-2 text-xs font-medium bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors border border-amber-300"
            >
              Today
            </button>

            <div className="relative">
              <input
                type="date"
                value={currentDateStr}
                onChange={(e) => onDateChange(e.target.value)}
                className="opacity-0 absolute inset-0 cursor-pointer w-full"
                id="panchang-date-input"
              />
              <label
                htmlFor="panchang-date-input"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl cursor-pointer border border-stone-200 transition-colors"
              >
                <Calendar className="w-4 h-4 text-stone-500" />
                <span>Jump to Date</span>
              </label>
            </div>
          </div>

          {/* Quick Actions (Print / Copy / Share) */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-300 rounded-xl shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Vedic Era Sub-header */}
        <div className="mt-4 pt-3.5 border-t border-amber-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <span className="text-stone-500 block">Vikram Samvat</span>
            <span className="font-semibold text-stone-800">{panchang.vikramSamvat} (Pingala)</span>
          </div>
          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <span className="text-stone-500 block">Shaka Samvat</span>
            <span className="font-semibold text-stone-800">{panchang.shakaSamvat} (Krodhi)</span>
          </div>
          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <span className="text-stone-500 block">Purnimanta</span>
            <span className="font-semibold text-stone-800">{panchang.purnimantaMonth} Masa</span>
          </div>
          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <span className="text-stone-500 block">Amanta</span>
            <span className="font-semibold text-stone-800">{panchang.amantaMonth} Masa</span>
          </div>
          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <span className="text-stone-500 block">Ayana</span>
            <span className="font-semibold text-stone-800">{panchang.ayana}</span>
          </div>
          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <span className="text-stone-500 block">Ritu (Season)</span>
            <span className="font-semibold text-stone-800">{panchang.ritu} (Autumn)</span>
          </div>
        </div>
      </div>

      {/* Hero Section: Celestial Sun & Moon Arc + Today's Festivals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sun & Moon Celestial Card (2 cols) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white rounded-2xl p-6 shadow-md border border-stone-800 relative overflow-hidden">
          {/* Background constellation ambient art */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Drik Siddhanta High-Precision Ephemeris
                </span>
                <h3 className="text-xl font-serif font-bold text-amber-100 mt-1">
                  Surya-Chandra Celestial Dynamics
                </h3>
              </div>
              <div className="text-right text-xs text-stone-400">
                <span>{selectedCity.name}</span>
                <span className="block text-[11px] text-amber-400/90 font-mono">
                  {selectedCity.latitude > 0 ? `${selectedCity.latitude.toFixed(2)}°N` : `${Math.abs(selectedCity.latitude).toFixed(2)}°S`},{' '}
                  {selectedCity.longitude > 0 ? `${selectedCity.longitude.toFixed(2)}°E` : `${Math.abs(selectedCity.longitude).toFixed(2)}°W`}
                </span>
              </div>
            </div>

            {/* Visual Solar Arc Canvas / Graphic */}
            <div className="py-2">
              <div className="relative h-28 sm:h-32 w-full flex items-center justify-center">
                {/* Visual Arc SVG */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                  <defs>
                    <linearGradient id="sunArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                    </linearGradient>
                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                      <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Horizon ground line */}
                  <line x1="20" y1="100" x2="380" y2="100" stroke="#57534e" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Sky Arc Path */}
                  <path
                    d="M 40 100 A 160 85 0 0 1 360 100"
                    fill="none"
                    stroke="url(#sunArcGrad)"
                    strokeWidth="3.5"
                  />

                  {/* Sun Icon position along the arc (simulated mid-day sun) */}
                  <g transform="translate(230, 24)">
                    <circle cx="0" cy="0" r="14" fill="url(#sunGlow)" />
                    <circle cx="0" cy="0" r="6" fill="#fff" />
                    <text x="0" y="-12" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">
                      Sun 13:45
                    </text>
                  </g>

                  {/* Sunrise Marker */}
                  <g transform="translate(40, 100)">
                    <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                    <text x="0" y="16" textAnchor="middle" fill="#d6d3d1" fontSize="10">
                      Rise {panchang.sunrise}
                    </text>
                  </g>

                  {/* Solar Noon Marker */}
                  <g transform="translate(200, 15)">
                    <line x1="0" y1="0" x2="0" y2="85" stroke="#78716c" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="0" y="-4" textAnchor="middle" fill="#e7e5e4" fontSize="9">
                      Noon {panchang.solarNoon}
                    </text>
                  </g>

                  {/* Sunset Marker */}
                  <g transform="translate(360, 100)">
                    <circle cx="0" cy="0" r="4" fill="#f97316" />
                    <text x="0" y="16" textAnchor="middle" fill="#d6d3d1" fontSize="10">
                      Set {panchang.sunset}
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Sun & Moon Details Grid */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stone-800">
              {/* Sun Stats */}
              <div className="bg-stone-800/60 rounded-xl p-3.5 border border-stone-700/60">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold text-amber-200 text-sm">Surya (Sun)</span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">Tula Rashi</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Sunrise</span>
                    <span className="font-mono text-amber-100 font-semibold text-sm">{panchang.sunrise}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Sunset</span>
                    <span className="font-mono text-amber-100 font-semibold text-sm">{panchang.sunset}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-stone-700/40 flex justify-between items-center text-[11px]">
                    <span className="text-stone-400">Day Duration (Dinaman)</span>
                    <span className="font-mono text-stone-200">{panchang.dayDuration}</span>
                  </div>
                </div>
              </div>

              {/* Moon Stats */}
              <div className="bg-stone-800/60 rounded-xl p-3.5 border border-stone-700/60">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-blue-300" />
                    <span className="font-semibold text-blue-200 text-sm">Chandra (Moon)</span>
                  </div>
                  <span className="text-xs text-blue-300/80 font-mono">Karka Rashi</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Moonrise</span>
                    <span className="font-mono text-blue-100 font-semibold text-sm">{panchang.moonrise}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Moonset</span>
                    <span className="font-mono text-blue-100 font-semibold text-sm">{panchang.moonset}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-stone-700/40 flex justify-between items-center text-[11px]">
                    <span className="text-stone-400">Night Duration (Ratriman)</span>
                    <span className="font-mono text-stone-200">{panchang.nightDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Festival & Fasting Today Spotlight */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-orange-50 border border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-200/90 text-amber-900 border border-amber-300">
                Festivals & Vrat Today
              </span>
              <span className="text-xs font-mono text-amber-800">Kartika Krishna</span>
            </div>

            <div className="space-y-3">
              <div className="bg-white/90 rounded-xl p-3.5 border border-amber-200 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      Ahoi Ashtami
                    </h4>
                    <span className="text-xs text-amber-700 font-medium">
                      अहोई अष्टमी व्रत (पुत्र/संतान दीर्घायु)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-amber-100 text-amber-800 rounded">
                    Vrat
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Mothers observe Nirjala fast for the well-being and longevity of children. Stars sighting puja at dusk.
                </p>
                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Puja Muhurat:</span>
                  <span className="font-semibold text-amber-900 font-mono">17:42 - 18:59 (1 hr 17 mins)</span>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-3 border border-amber-200/70 text-xs">
                <div className="font-semibold text-stone-850 flex items-center justify-between">
                  <span>Radha Kunda Snan</span>
                  <span className="text-stone-500 text-[11px]">Mathura / Braj</span>
                </div>
                <p className="text-stone-500 text-[11px] mt-1">
                  Holy midnight dip in Radha Kunda on Ahoi Ashtami.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60">
            <button
              onClick={() => onOpenFestivalDetail?.('diwali-2024')}
              className="w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Upcoming Diwali Lakshmi Puja 2024</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Five Limbs of Panchang (Panchanga) Grid */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>Core Panchanga (पञ्चाङ्गम्)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              The five classical limbs of Vedic time calculation for {formattedDateHeading}
            </p>
          </div>
          <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-mono">
            IST (UTC+05:30)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Tithi */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                1. Tithi (तिथि)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                Auspicious
              </span>
            </div>
            <div className="text-base font-serif font-bold text-stone-900">
              {panchang.tithi.name}
            </div>
            <div className="text-xs font-devanagari text-stone-600 mt-0.5">
              {panchang.tithi.devanagari}
            </div>
            <div className="mt-2 text-xs text-amber-900 bg-amber-50/90 px-2 py-1 rounded font-mono font-medium">
              Ends {panchang.tithi.endingTime}
            </div>
            <div className="mt-3 text-[11px] text-stone-500 space-y-0.5">
              <div>Deity: <span className="text-stone-700 font-medium">{panchang.tithi.deity}</span></div>
              <div>Ruler: <span className="text-stone-700 font-medium">{panchang.tithi.rulingPlanet}</span></div>
            </div>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>Elapsed</span>
                <span>64%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '64%' }} />
              </div>
            </div>
          </div>

          {/* 2. Nakshatra */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                2. Nakshatra (नक्षत्र)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                Guru Pushya
              </span>
            </div>
            <div className="text-base font-serif font-bold text-stone-900">
              {panchang.nakshatra.name}
            </div>
            <div className="text-xs font-devanagari text-stone-600 mt-0.5">
              {panchang.nakshatra.devanagari}
            </div>
            <div className="mt-2 text-xs text-amber-900 bg-amber-50/90 px-2 py-1 rounded font-mono font-medium">
              Ends {panchang.nakshatra.endingTime}
            </div>
            <div className="mt-3 text-[11px] text-stone-500 space-y-0.5">
              <div>Deity: <span className="text-stone-700 font-medium">{panchang.nakshatra.deity}</span></div>
              <div>Ruler: <span className="text-stone-700 font-medium">{panchang.nakshatra.rulingPlanet}</span></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>Elapsed</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>

          {/* 3. Yoga */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                3. Yoga (योग)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                Shubh
              </span>
            </div>
            <div className="text-base font-serif font-bold text-stone-900">
              {panchang.yoga.name}
            </div>
            <div className="text-xs font-devanagari text-stone-600 mt-0.5">
              {panchang.yoga.devanagari}
            </div>
            <div className="mt-2 text-xs text-amber-900 bg-amber-50/90 px-2 py-1 rounded font-mono font-medium">
              Ends {panchang.yoga.endingTime}
            </div>
            <div className="mt-3 text-[11px] text-stone-500 space-y-0.5">
              <div>Deity: <span className="text-stone-700 font-medium">{panchang.yoga.deity}</span></div>
              <div>Meaning: <span className="text-stone-700 font-medium">Accomplished</span></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>Elapsed</span>
                <span>51%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '51%' }} />
              </div>
            </div>
          </div>

          {/* 4. Karana */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                4. Karana (करण)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                Chara
              </span>
            </div>
            <div className="text-base font-serif font-bold text-stone-900">
              {panchang.karana.name}
            </div>
            <div className="text-xs font-devanagari text-stone-600 mt-0.5">
              {panchang.karana.devanagari}
            </div>
            <div className="mt-2 text-xs text-amber-900 bg-amber-50/90 px-2 py-1 rounded font-mono font-medium">
              Ends {panchang.karana.endingTime}
            </div>
            <div className="mt-3 text-[11px] text-stone-500 space-y-0.5">
              <div>Deity: <span className="text-stone-700 font-medium">{panchang.karana.deity}</span></div>
              <div>Next: <span className="text-stone-700 font-medium">Taitila</span></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>Elapsed</span>
                <span>83%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '83%' }} />
              </div>
            </div>
          </div>

          {/* 5. Vaar (Solar Day) */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                5. Vaar (वार)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                Guru
              </span>
            </div>
            <div className="text-base font-serif font-bold text-stone-900">
              {panchang.vaar}
            </div>
            <div className="text-xs font-devanagari text-stone-600 mt-0.5">
              गुरुवार (बृहस्पतिवार)
            </div>
            <div className="mt-2 text-xs text-stone-700 bg-stone-200/60 px-2 py-1 rounded font-medium">
              Full Day (Sunrise to Sunrise)
            </div>
            <div className="mt-3 text-[11px] text-stone-500 space-y-0.5">
              <div>Lord: <span className="text-stone-700 font-medium">Brihaspati (Jupiter)</span></div>
              <div>Color: <span className="text-stone-700 font-medium">Yellow / Peet</span></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>Day cycle</span>
                <span>Active</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auspicious & Inauspicious Timings Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auspicious Timings (Shubh Muhurat) */}
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                  Shubh Muhurat (Auspicious Timings)
                </h3>
                <span className="text-xs text-emerald-700 font-medium">शुभ एवं फलदायी मुहूर्त</span>
              </div>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium">
              Favorable
            </span>
          </div>

          <div className="divide-y divide-emerald-100">
            {/* Abhijit Muhurat */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 text-sm">Abhijit Muhurat</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
                    Supreme
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Destroys millions of doshas; ideal for beginning ventures</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-800">11:43 - 12:28</span>
                <span className="block text-[11px] text-stone-400">45 mins</span>
              </div>
            </div>

            {/* Amrit Kaal */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Amrit Kaal</span>
                <p className="text-xs text-stone-500 mt-0.5">Nectar period; highly auspicious for pujas & travel</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-800">13:10 - 14:48</span>
                <span className="block text-[11px] text-stone-400">1h 38m</span>
              </div>
            </div>

            {/* Brahma Muhurat */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Brahma Muhurat</span>
                <p className="text-xs text-stone-500 mt-0.5">Creator's hour; ideal for meditation, mantra, study</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-800">04:46 - 05:34</span>
                <span className="block text-[11px] text-stone-400">Pre-dawn</span>
              </div>
            </div>

            {/* Vijay Muhurat */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Vijay Muhurat</span>
                <p className="text-xs text-stone-500 mt-0.5">Victorious hour; suitable for signing deeds & lawsuits</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-800">13:58 - 14:44</span>
                <span className="block text-[11px] text-stone-400">46 mins</span>
              </div>
            </div>

            {/* Godhuli Muhurat */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Godhuli Muhurat</span>
                <p className="text-xs text-stone-500 mt-0.5">Cow dust hour at dusk; auspicious for home pujas</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-800">17:42 - 18:07</span>
                <span className="block text-[11px] text-stone-400">Dusk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inauspicious Timings (Ashubh Kaal) */}
        <div className="bg-white rounded-2xl border border-rose-200 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                  Ashubh Timings (Periods to Avoid)
                </h3>
                <span className="text-xs text-rose-700 font-medium">अशुभ काल एवं वर्जित समय</span>
              </div>
            </div>
            <span className="text-xs bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md font-medium">
              Avoid New Beginnings
            </span>
          </div>

          <div className="divide-y divide-rose-100">
            {/* Rahu Kaal */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 text-sm">Rahu Kaal</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                    Strict Avoid
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Avoid starting new projects, buying assets, or travel</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-rose-800">13:30 - 14:55</span>
                <span className="block text-[11px] text-rose-600 font-medium">1h 25m</span>
              </div>
            </div>

            {/* Yamaganda */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Yamaganda</span>
                <p className="text-xs text-stone-500 mt-0.5">Lord Yama's period; unfavorable for financial transactions</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-rose-800">06:28 - 07:52</span>
                <span className="block text-[11px] text-stone-400">1h 24m</span>
              </div>
            </div>

            {/* Gulika Kaal */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Gulika Kaal</span>
                <p className="text-xs text-stone-500 mt-0.5">Saturn's son; actions performed tend to repeat</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-rose-800">09:17 - 10:41</span>
                <span className="block text-[11px] text-stone-400">1h 24m</span>
              </div>
            </div>

            {/* Dur Muhurat */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Dur Muhurat</span>
                <p className="text-xs text-stone-500 mt-0.5">Unfavorable two segments during daylight</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-rose-800">10:12 - 10:58</span>
                <span className="block text-[11px] text-stone-400">Also 14:44 - 15:30</span>
              </div>
            </div>

            {/* Varjyam */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-sm">Varjyam</span>
                <p className="text-xs text-stone-500 mt-0.5">Nakshatra poison period; avoid medicinal and marital acts</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-rose-800">19:22 - 20:56</span>
                <span className="block text-[11px] text-stone-400">Night</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day & Night Choghadiya Section */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Choghadiya Timings (चौघड़िया)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Traditional 1.5-hour segments for instant Muhurat guidance
            </p>
          </div>

          {/* Day / Night Toggle */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 self-start sm:self-auto">
            <button
              onClick={() => setChoghadiyaTab('day')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                choghadiyaTab === 'day'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Day Choghadiya (दिन)</span>
            </button>
            <button
              onClick={() => setChoghadiyaTab('night')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                choghadiyaTab === 'night'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night Choghadiya (रात्रि)</span>
            </button>
          </div>
        </div>

        {/* Choghadiya Grid / Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {(choghadiyaTab === 'day' ? DAY_CHOGHADIYA : NIGHT_CHOGHADIYA).map((chog) => {
            let bgClass = 'bg-stone-50 border-stone-200 text-stone-700';
            let badgeClass = 'bg-stone-200 text-stone-800';

            if (chog.auspiciousness === 'good') {
              bgClass = 'bg-emerald-50/70 border-emerald-200 text-emerald-900';
              badgeClass = 'bg-emerald-100 text-emerald-800 font-semibold';
            } else if (chog.auspiciousness === 'bad') {
              bgClass = 'bg-rose-50/70 border-rose-200 text-rose-900';
              badgeClass = 'bg-rose-100 text-rose-800 font-semibold';
            } else {
              bgClass = 'bg-amber-50/70 border-amber-200 text-amber-900';
              badgeClass = 'bg-amber-100 text-amber-800 font-semibold';
            }

            return (
              <div
                key={chog.periodNumber}
                className={`p-3 rounded-xl border flex flex-col justify-between transition-transform hover:-translate-y-0.5 ${bgClass}`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-stone-400">#{chog.periodNumber}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${badgeClass}`}>
                      {chog.auspiciousness.toUpperCase()}
                    </span>
                  </div>
                  <div className="font-bold font-serif text-sm">
                    {chog.name}
                  </div>
                  <div className="text-[11px] font-devanagari opacity-80">
                    {chog.devanagari}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-current/15 text-[11px] font-mono font-medium">
                  <div>{chog.startTime}</div>
                  <div className="opacity-70 text-[10px]">to {chog.endTime}</div>
                  <div className="mt-1 text-[10px] opacity-80 font-sans">
                    Graha: {chog.graha}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-4 text-xs text-stone-500">
          <span className="font-semibold text-stone-700">Guide:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Amrit, Shubh, Labh: Highly Favorable (लाभ, शुभ, अमृत)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Char: Neutral / Travel only (चर)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Rog, Kaal, Udveg: Avoid new tasks (रोग, काल, उद्वेग)</span>
          </span>
        </div>
      </div>

      {/* Planetary Positions (Navagraha Sthiti) Table */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Planetary Positions (ग्रह स्थिति - Graha Sthiti)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Sidereal Nirayana positions based on Lahiri Ayanamsha (24° 12' 38")
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-1 rounded">
            Epoch: J2000 / Topocentric
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/70">
                <th className="py-2.5 px-3">Graha (Planet)</th>
                <th className="py-2.5 px-3">Rashi (Zodiac)</th>
                <th className="py-2.5 px-3">Degree / Min</th>
                <th className="py-2.5 px-3">Nakshatra</th>
                <th className="py-2.5 px-3 text-center">Pada</th>
                <th className="py-2.5 px-3">Lord</th>
                <th className="py-2.5 px-3 text-right">Motion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {PLANETARY_POSITIONS.map((planet) => (
                <tr key={planet.planet} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-stone-850 flex items-center gap-2">
                    <span>{planet.planet}</span>
                    <span className="text-stone-400 font-normal font-devanagari">
                      ({planet.devanagari})
                    </span>
                  </td>
                  <td className="py-3 px-3 text-stone-700 font-medium">{planet.rashi}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-stone-800">
                    {planet.degrees}° {planet.minutes}' {planet.seconds}"
                  </td>
                  <td className="py-3 px-3 text-stone-700">{planet.nakshatra}</td>
                  <td className="py-3 px-3 text-center font-mono font-semibold text-amber-800">
                    {planet.pada}
                  </td>
                  <td className="py-3 px-3 text-stone-600">{planet.lord}</td>
                  <td className="py-3 px-3 text-right">
                    {planet.isRetrograde ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        Vakri (Retrograde)
                      </span>
                    ) : planet.isCombust ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        Asta (Combust)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        Margi (Direct)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
