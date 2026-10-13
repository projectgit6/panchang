import React, { useState } from 'react';
import {
  Clock,
  Sun,
  Moon,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Flame,
  Home,
  Car,
  Heart,
  Baby,
  Briefcase,
} from 'lucide-react';
import { CityLocation } from '../types/jyotish';
import { DAY_CHOGHADIYA, NIGHT_CHOGHADIYA } from '../data/mockData';

interface MuhuratChoghadiyaViewProps {
  selectedCity: CityLocation;
  onShowToast: (message: string) => void;
}

export const MuhuratChoghadiyaView: React.FC<MuhuratChoghadiyaViewProps> = ({
  selectedCity,
  onShowToast,
}) => {
  const [activeSegment, setActiveSegment] = useState<'day' | 'night'>('day');
  const [activeCategory, setActiveCategory] = useState<'vivah' | 'griha' | 'vahan' | 'namkaran' | 'vyapar'>('vivah');

  const muhuratCategories = [
    { id: 'vivah', label: 'Vivah (Marriage)', icon: Heart, count: '14 Auspicious Dates' },
    { id: 'griha', label: 'Griha Pravesh (House Warming)', icon: Home, count: '8 Dates' },
    { id: 'vahan', label: 'Vehicle Purchase (वाहन खरीद)', icon: Car, count: '11 Dates' },
    { id: 'namkaran', label: 'Namkaran (Naming Ceremony)', icon: Baby, count: '12 Dates' },
    { id: 'vyapar', label: 'Business Opening (व्यापार आरम्भ)', icon: Briefcase, count: '9 Dates' },
  ];

  const vivahMuhuratDates = [
    { date: 'Nov 12, 2024', day: 'Tuesday', tithi: 'Devutthana Ekadashi', nakshatra: 'Uttara Bhadrapada', time: '18:44 to 28:12' },
    { date: 'Nov 13, 2024', day: 'Wednesday', tithi: 'Tulsi Vivah / Dwadashi', nakshatra: 'Revati', time: '06:42 to 14:15' },
    { date: 'Nov 16, 2024', day: 'Saturday', tithi: 'Kartika Purnima', nakshatra: 'Rohini', time: '23:48 to 28:35' },
    { date: 'Nov 17, 2024', day: 'Sunday', tithi: 'Margashirsha Krishna Dwitiya', nakshatra: 'Mrigashira', time: '06:45 to 22:15' },
    { date: 'Nov 22, 2024', day: 'Friday', tithi: 'Krishna Ashtami', nakshatra: 'Magha', time: '23:44 to 28:40' },
    { date: 'Nov 28, 2024', day: 'Thursday', tithi: 'Krishna Trayodashi', nakshatra: 'Swati', time: '07:35 to 22:50' },
  ];

  const grihaPraveshDates = [
    { date: 'Nov 02, 2024', day: 'Saturday', tithi: 'Govardhan Puja / Pratipada', nakshatra: 'Vishakha', time: '06:35 to 20:10' },
    { date: 'Nov 04, 2024', day: 'Monday', tithi: 'Bhai Dooj / Dwitiya', nakshatra: 'Anuradha', time: '06:36 to 23:55' },
    { date: 'Nov 07, 2024', day: 'Thursday', tithi: 'Chhath Sandhya Arghya', nakshatra: 'Uttara Ashadha', time: '06:38 to 11:45' },
    { date: 'Nov 13, 2024', day: 'Wednesday', tithi: 'Tulsi Vivah', nakshatra: 'Revati', time: '06:42 to 14:15' },
  ];

  const vahanDates = [
    { date: 'Oct 29, 2024', day: 'Tuesday', tithi: 'Dhanteras', nakshatra: 'Uttara Phalguni', time: '10:31 to 20:30' },
    { date: 'Oct 31, 2024', day: 'Thursday', tithi: 'Diwali', nakshatra: 'Chitra / Swati', time: '06:32 to 15:40' },
    { date: 'Nov 10, 2024', day: 'Sunday', tithi: 'Akshaya Navami', nakshatra: 'Shatabhisha', time: '06:40 to 18:25' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Clock className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Shubh Muhurat & Choghadiya Engine
                </h2>
                <p className="text-xs text-stone-500">
                  Accurate Vedic timing windows for ceremonies, business ventures, vehicle purchases, and daily acts
                </p>
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-stone-500">Location:</span>{' '}
            <strong className="text-stone-900">{selectedCity.name}</strong>
            <span className="block text-[11px] font-mono text-amber-700">
              Latitude: {selectedCity.latitude.toFixed(2)}° • IST (UTC+05:30)
            </span>
          </div>
        </div>
      </div>

      {/* 24-Hour Day & Night Choghadiya Full Explorer */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Full Daily Choghadiya Chakra (दैनिक चौघड़िया चक्र)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Traditional octet partitions of day (Sunrise to Sunset) and night (Sunset to Sunrise)
            </p>
          </div>

          {/* Toggle Button */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveSegment('day')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeSegment === 'day'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Day Choghadiya (06:28 - 17:42)</span>
            </button>
            <button
              onClick={() => setActiveSegment('night')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeSegment === 'night'
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night Choghadiya (17:42 - 06:28)</span>
            </button>
          </div>
        </div>

        {/* Detailed Choghadiya List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(activeSegment === 'day' ? DAY_CHOGHADIYA : NIGHT_CHOGHADIYA).map((item) => {
            const isGood = item.auspiciousness === 'good';
            const isBad = item.auspiciousness === 'bad';

            return (
              <div
                key={item.periodNumber}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isGood
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : isBad
                    ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                    : 'bg-amber-50/60 border-amber-200 text-amber-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-stone-500">Slot #{item.periodNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isGood
                          ? 'bg-emerald-100 text-emerald-800'
                          : isBad
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.auspiciousness.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-base font-serif font-bold">
                    {item.name} ({item.devanagari})
                  </div>
                  <div className="text-xs opacity-75 font-mono mt-0.5">
                    Lord: {item.graha}
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-current/15">
                  <div className="text-xs font-mono font-semibold">
                    {item.startTime} - {item.endTime}
                  </div>
                  <div className="text-[11px] opacity-75 mt-0.5">
                    {isGood
                      ? 'Best for journey, finance & rituals'
                      : isBad
                      ? 'Avoid signing deeds or traveling'
                      : 'Moderate / Routine movement only'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Samskara & Auspicious Ceremony Dates Finder */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Ceremonial Samskara Muhurat Finder (विवाह एवं संस्कार मुहूर्त)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Vedic dates cross-verified for Guru-Shukra Astha (combustion), Adhika Masa, and Malamaas exclusions
            </p>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
          {muhuratCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/90 shadow-2xs ring-1 ring-amber-400'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-1.5 ${
                    isSelected ? 'text-amber-700' : 'text-stone-500'
                  }`}
                />
                <div
                  className={`font-semibold text-xs ${
                    isSelected ? 'text-amber-950' : 'text-stone-800'
                  }`}
                >
                  {cat.label}
                </div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">{cat.count}</div>
              </button>
            );
          })}
        </div>

        {/* Muhurat Dates Table for Selected Category */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/70">
                <th className="py-2.5 px-3">Date (Gregorian)</th>
                <th className="py-2.5 px-3">Weekday</th>
                <th className="py-2.5 px-3">Tithi</th>
                <th className="py-2.5 px-3">Nakshatra</th>
                <th className="py-2.5 px-3">Auspicious Time Slot</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(activeCategory === 'vivah'
                ? vivahMuhuratDates
                : activeCategory === 'griha'
                ? grihaPraveshDates
                : vahanDates
              ).map((m, idx) => (
                <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-stone-900 font-serif text-sm">
                    {m.date}
                  </td>
                  <td className="py-3 px-3 text-stone-700 font-medium">{m.day}</td>
                  <td className="py-3 px-3 text-stone-700">{m.tithi}</td>
                  <td className="py-3 px-3 text-stone-700">{m.nakshatra}</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-900 bg-amber-50/50">
                    {m.time}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      Shubh Muhurat
                    </span>
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
