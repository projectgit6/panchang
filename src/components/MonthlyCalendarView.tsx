import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Download,
  Info,
  Clock,
  Sun,
  Moon,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { CalendarDay, PlanetaryTransitItem } from '../types/jyotish';
import {
  OCTOBER_2024_CALENDAR,
  PLANETARY_TRANSITS_OCT_2024,
} from '../data/mockData';

interface MonthlyCalendarViewProps {
  onSelectDate: (dateStr: string) => void;
  onOpenFestivalDetail?: (festivalId: string) => void;
  onShowToast: (message: string) => void;
}

export const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({
  onSelectDate,
  onOpenFestivalDetail,
  onShowToast,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('October 2024');
  const [filterType, setFilterType] = useState<'all' | 'vrats' | 'festivals'>('all');
  const [inspectedDay, setInspectedDay] = useState<CalendarDay | null>(
    OCTOBER_2024_CALENDAR.find((d) => d.dayNumber === 24) || OCTOBER_2024_CALENDAR[0]
  );

  const daysOfWeek = [
    { en: 'Sun', sa: 'रवि' },
    { en: 'Mon', sa: 'सोम' },
    { en: 'Tue', sa: 'मंगल' },
    { en: 'Wed', sa: 'बुध' },
    { en: 'Thu', sa: 'गुरु' },
    { en: 'Fri', sa: 'शुक्र' },
    { en: 'Sat', sa: 'शनि' },
  ];

  // Filter logic
  const filteredDays = OCTOBER_2024_CALENDAR.filter((day) => {
    if (filterType === 'vrats') return day.isVrat || day.isEkadashi;
    if (filterType === 'festivals') return day.festivals.length > 0;
    return true;
  });

  const handleDayClick = (day: CalendarDay) => {
    setInspectedDay(day);
  };

  const handleDownloadCalendar = () => {
    onShowToast('Generating printable Vedic Calendar for October 2024...');
    setTimeout(() => {
      onShowToast('Vedic Calendar PDF ready for download');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Month Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-amber-50/80 border border-amber-200 rounded-xl p-1">
              <button
                disabled
                className="p-2 text-stone-300 cursor-not-allowed rounded-lg"
                title="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-4 py-1 text-center min-w-[180px]">
                <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
                  Kartika / Ashwina 2081
                </div>
                <div className="text-base sm:text-lg font-serif font-bold text-stone-900">
                  {selectedMonth}
                </div>
              </div>
              <button
                disabled
                className="p-2 text-stone-300 cursor-not-allowed rounded-lg"
                title="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <span className="hidden sm:inline-block text-xs text-stone-500 font-mono">
              31 Days • Sharad Ritu
            </span>
          </div>

          {/* Filters & Actions */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Days
              </button>
              <button
                onClick={() => setFilterType('festivals')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterType === 'festivals'
                    ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Major Festivals
              </button>
              <button
                onClick={() => setFilterType('vrats')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterType === 'vrats'
                    ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Fasts & Vrats
              </button>
            </div>

            <button
              onClick={handleDownloadCalendar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl transition-colors shadow-2xs"
            >
              <Download className="w-4 h-4 text-amber-700" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-amber-200/80 shadow-xs p-4 sm:p-5">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs pb-3 border-b border-stone-200">
            {daysOfWeek.map((day, idx) => (
              <div
                key={day.en}
                className={`py-2 rounded-lg ${
                  idx === 0
                    ? 'text-rose-700 bg-rose-50/50'
                    : idx === 6
                    ? 'text-amber-700 bg-amber-50/50'
                    : 'text-stone-700'
                }`}
              >
                <span className="block font-serif text-sm">{day.en}</span>
                <span className="text-[11px] font-devanagari opacity-75">{day.sa}</span>
              </div>
            ))}
          </div>

          {/* Month Days Grid (October 2024 starts on Tuesday, idx=2) */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-2">
            {/* Empty offset slots for Sunday & Monday */}
            <div className="h-20 sm:h-24 bg-stone-50/40 rounded-xl border border-dashed border-stone-200/60 p-1 opacity-40">
              <span className="text-stone-400 text-xs">Sep 29</span>
            </div>
            <div className="h-20 sm:h-24 bg-stone-50/40 rounded-xl border border-dashed border-stone-200/60 p-1 opacity-40">
              <span className="text-stone-400 text-xs">Sep 30</span>
            </div>

            {OCTOBER_2024_CALENDAR.map((day) => {
              const isSelected = inspectedDay?.date === day.date;
              const hasFestivals = day.festivals.length > 0;

              return (
                <div
                  key={day.date}
                  onClick={() => handleDayClick(day)}
                  className={`min-h-20 sm:min-h-24 rounded-xl p-1.5 sm:p-2 cursor-pointer transition-all border relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/90 shadow-sm ring-2 ring-amber-400/40'
                      : hasFestivals
                      ? 'border-amber-300/80 bg-amber-50/30 hover:border-amber-400'
                      : day.isPurnima || day.isAmavasya
                      ? 'border-blue-300 bg-blue-50/30 hover:border-blue-400'
                      : day.isEkadashi
                      ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400'
                      : 'border-stone-200/80 bg-white hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {/* Date number and Tithi */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`font-serif text-sm sm:text-base font-bold ${
                          isSelected ? 'text-amber-900' : 'text-stone-900'
                        }`}
                      >
                        {day.dayNumber}
                      </span>
                    </div>

                    {/* Moon indicator */}
                    {day.isPurnima && (
                      <span
                        title="Purnima (Full Moon)"
                        className="w-3.5 h-3.5 rounded-full bg-amber-300 border border-amber-500 flex items-center justify-center text-[8px] font-bold"
                      >
                        🌕
                      </span>
                    )}
                    {day.isAmavasya && (
                      <span
                        title="Amavasya (New Moon)"
                        className="w-3.5 h-3.5 rounded-full bg-stone-800 border border-stone-950 flex items-center justify-center text-[8px] text-white font-bold"
                      >
                        🌑
                      </span>
                    )}
                    {day.isEkadashi && (
                      <span
                        title="Ekadashi Vrat"
                        className="px-1 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold"
                      >
                        11
                      </span>
                    )}
                  </div>

                  {/* Tithi name */}
                  <div className="text-[10px] sm:text-[11px] text-stone-600 font-devanagari truncate">
                    {day.tithiName}
                  </div>

                  {/* Festival Badges */}
                  <div className="mt-1 space-y-0.5">
                    {day.festivals.slice(0, 1).map((fest, idx) => (
                      <div
                        key={idx}
                        className={`text-[9px] sm:text-[10px] font-semibold px-1 py-0.5 rounded truncate ${
                          day.isMajorFestival
                            ? 'bg-amber-600 text-white font-bold shadow-2xs'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}
                        title={fest}
                      >
                        {fest}
                      </div>
                    ))}
                    {day.festivals.length > 1 && (
                      <div className="text-[9px] text-amber-800 font-medium">
                        +{day.festivals.length - 1} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Month Legend */}
          <div className="mt-5 pt-3.5 border-t border-stone-200 flex flex-wrap items-center gap-4 text-xs text-stone-600">
            <span className="font-semibold text-stone-800">Legend:</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-600" />
              <span>Major Festival (प्रमुख पर्व)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
              <span>Ekadashi Fast (एकादशी)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-300 border border-amber-500" />
              <span>Purnima (पूर्णिमा)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-stone-800" />
              <span>Amavasya (अमावस्या)</span>
            </span>
          </div>
        </div>

        {/* Selected Day Inspector Side Panel (1 Col) */}
        <div className="space-y-5">
          {inspectedDay ? (
            <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
                  Day Inspector
                </span>
                <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                  {inspectedDay.date}
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  {new Date(inspectedDay.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  Tithi: <strong className="text-stone-800">{inspectedDay.tithiName}</strong> ({inspectedDay.paksha} Paksha)
                </div>
              </div>

              {/* Day Festivals */}
              <div className="mt-4">
                <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Festivals & Observances:
                </span>
                {inspectedDay.festivals.length > 0 ? (
                  <div className="space-y-1.5">
                    {inspectedDay.festivals.map((fest, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center justify-between"
                      >
                        <span>{fest}</span>
                        {fest.toLowerCase().includes('diwali') && (
                          <button
                            onClick={() => onOpenFestivalDetail?.('diwali-2024')}
                            className="text-[10px] text-amber-700 hover:text-amber-900 underline font-normal"
                          >
                            View Vidhi
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic">No major public festivals on this day.</p>
                )}
              </div>

              {/* Fasting Info */}
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs space-y-1.5 text-stone-600">
                <div className="flex justify-between">
                  <span>Vrat Status:</span>
                  <span className="font-semibold text-stone-850">
                    {inspectedDay.isVrat ? 'Yes (Fast observed)' : 'Regular Day'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Chandra Rashi:</span>
                  <span className="font-semibold text-stone-850 font-mono">
                    {inspectedDay.dayNumber > 22 && inspectedDay.dayNumber < 25 ? 'Karka (Cancer)' : 'Mithuna (Gemini)'}
                  </span>
                </div>
              </div>

              {/* Action Button: Jump to Daily Panchang for this date */}
              <div className="mt-5 pt-3 border-t border-stone-100">
                <button
                  onClick={() => onSelectDate(inspectedDay.date)}
                  className="w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Panchang for this Day</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}

          {/* Planetary Transits (Graha Gochar) Card */}
          <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Monthly Graha Gochar</span>
              </h4>
              <span className="text-[10px] text-stone-400 font-mono">October 2024</span>
            </div>

            <div className="space-y-2.5">
              {PLANETARY_TRANSITS_OCT_2024.map((transit, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/70 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-amber-100">
                    <span>{transit.planet}</span>
                    <span className="text-[11px] text-stone-400 font-mono">{transit.date}</span>
                  </div>
                  <div className="text-stone-300 text-[11px] mt-0.5 font-medium">
                    {transit.event}
                  </div>
                  <div className="text-[10px] text-amber-400/90 font-mono mt-1">
                    At {transit.time} • Impact: {transit.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
