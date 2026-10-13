import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Printer,
  RotateCcw,
  User,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  Download,
} from 'lucide-react';
import { AshtakootaKoota, KundliProfile } from '../types/jyotish';
import {
  SAMPLE_BOY_PROFILE,
  SAMPLE_GIRL_PROFILE,
  SAMPLE_ASHTAKOOTA_RESULTS,
} from '../data/mockData';

interface KundliMilanViewProps {
  onShowToast: (message: string) => void;
}

export const KundliMilanView: React.FC<KundliMilanViewProps> = ({ onShowToast }) => {
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [boyProfile, setBoyProfile] = useState<KundliProfile>(SAMPLE_BOY_PROFILE);
  const [girlProfile, setGirlProfile] = useState<KundliProfile>(SAMPLE_GIRL_PROFILE);
  const [hasCalculated, setHasCalculated] = useState(true);

  // Total score calculation
  const totalObtained = SAMPLE_ASHTAKOOTA_RESULTS.reduce((acc, k) => acc + k.obtained, 0);
  const maxPossible = 36;
  const matchPercentage = Math.round((totalObtained / maxPossible) * 100);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    onShowToast('Calculated Ashtakoota 36 Guna Milan and Kuja Dosha');
  };

  const handleReset = () => {
    setBoyProfile({
      name: '',
      dob: '',
      tob: '',
      pob: '',
      rashi: 'Mesha (Aries)',
      nakshatra: 'Ashwini',
      nakshatraPada: 1,
      manglikStatus: 'non-manglik',
    });
    setGirlProfile({
      name: '',
      dob: '',
      tob: '',
      pob: '',
      rashi: 'Vrishabha (Taurus)',
      nakshatra: 'Rohini',
      nakshatraPada: 1,
      manglikStatus: 'non-manglik',
    });
    setHasCalculated(false);
  };

  const handleLoadSample = () => {
    setBoyProfile(SAMPLE_BOY_PROFILE);
    setGirlProfile(SAMPLE_GIRL_PROFILE);
    setHasCalculated(true);
    onShowToast('Loaded sample profile: Rahul & Priya');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Milan Engine Header Banner */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Kundli Milan & 36 Guna Matchmaking
                </h2>
                <p className="text-xs text-stone-500">
                  Ashtakoota Milan, Kuja (Manglik) Dosha verification, and Marital Harmony Analysis
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-2 text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors border border-amber-300"
            >
              Load Sample Couple
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors border border-stone-200"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* Birth Details Input Forms */}
        <form onSubmit={handleCalculate} className="mt-6 pt-5 border-t border-stone-200/70">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Boy's Details */}
            <div className="bg-blue-50/40 rounded-xl p-4 sm:p-5 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Boy's Details (वर विवरण - Groom)</span>
                </div>
                <span className="text-[11px] font-mono text-blue-750 bg-blue-100 px-2 py-0.5 rounded">
                  Rahul Sharma
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={boyProfile.name}
                    onChange={(e) => setBoyProfile({ ...boyProfile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Birth City</label>
                  <input
                    type="text"
                    value={boyProfile.pob}
                    onChange={(e) => setBoyProfile({ ...boyProfile, pob: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    placeholder="e.g. New Delhi, India"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={boyProfile.dob}
                    onChange={(e) => setBoyProfile({ ...boyProfile, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Time of Birth</label>
                  <input
                    type="time"
                    value={boyProfile.tob}
                    onChange={(e) => setBoyProfile({ ...boyProfile, tob: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Janma Rashi (Moon Sign)</label>
                  <input
                    type="text"
                    value={boyProfile.rashi}
                    onChange={(e) => setBoyProfile({ ...boyProfile, rashi: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Janma Nakshatra</label>
                  <input
                    type="text"
                    value={boyProfile.nakshatra}
                    onChange={(e) => setBoyProfile({ ...boyProfile, nakshatra: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Girl's Details */}
            <div className="bg-rose-50/40 rounded-xl p-4 sm:p-5 border border-rose-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-rose-900 font-semibold text-sm">
                  <User className="w-4 h-4 text-rose-600" />
                  <span>Girl's Details (कन्या विवरण - Bride)</span>
                </div>
                <span className="text-[11px] font-mono text-rose-750 bg-rose-100 px-2 py-0.5 rounded">
                  Priya Patel
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={girlProfile.name}
                    onChange={(e) => setGirlProfile({ ...girlProfile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    placeholder="e.g. Priya Patel"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Birth City</label>
                  <input
                    type="text"
                    value={girlProfile.pob}
                    onChange={(e) => setGirlProfile({ ...girlProfile, pob: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    placeholder="e.g. Ahmedabad, India"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={girlProfile.dob}
                    onChange={(e) => setGirlProfile({ ...girlProfile, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Time of Birth</label>
                  <input
                    type="time"
                    value={girlProfile.tob}
                    onChange={(e) => setGirlProfile({ ...girlProfile, tob: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Janma Rashi (Moon Sign)</label>
                  <input
                    type="text"
                    value={girlProfile.rashi}
                    onChange={(e) => setGirlProfile({ ...girlProfile, rashi: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Janma Nakshatra</label>
                  <input
                    type="text"
                    value={girlProfile.nakshatra}
                    onChange={(e) => setGirlProfile({ ...girlProfile, nakshatra: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Clear Fields
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Compute Kundli Milan & 36 Gunas</span>
            </button>
          </div>
        </form>
      </div>

      {/* Matchmaking Results Section */}
      {hasCalculated && (
        <div className="space-y-6">
          {/* Top Scorecard & Compatibility Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score Ring Card */}
            <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white rounded-2xl p-6 shadow-md border border-amber-600 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold mb-2">
                Ashtakoota Total Score
              </span>

              {/* Radial Meter */}
              <div className="relative w-40 h-40 flex items-center justify-center my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - totalObtained / maxPossible)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    {totalObtained}
                  </span>
                  <span className="text-xs text-amber-200 font-medium">out of 36 Gunas</span>
                </div>
              </div>

              <div className="mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-amber-900 shadow-xs inline-block">
                  Uttam Match (उत्तम मिलान - Highly Favorable)
                </span>
                <p className="text-xs text-amber-100/90 mt-2 max-w-xs">
                  Above 28 Gunas indicates high marital harmony, mutual understanding, and longevity.
                </p>
              </div>
            </div>

            {/* Kuja / Manglik Dosha Status Card */}
            <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Manglik (Kuja) Dosha Evaluation</span>
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    Dosha Neutralized
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  {/* Boy Kuja Status */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-stone-800">Groom (Rahul Sharma)</span>
                      <span className="text-emerald-700 font-bold">Non-Manglik</span>
                    </div>
                    <p className="text-stone-500 text-[11px]">
                      Mars is placed in the 3rd House (Upachaya Bhava) from Lagna. No Kuja Dosha.
                    </p>
                  </div>

                  {/* Girl Kuja Status */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-stone-800">Bride (Priya Patel)</span>
                      <span className="text-amber-800 font-bold">Anshik Manglik (Cancelled)</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Mars in 12th House is cancelled as Jupiter aspects Mars from Kendra (Bhava 4) and Moon sits in exalted Vrishabha.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Marriage can proceed smoothly without specialized remedial rites.</span>
              </div>
            </div>

            {/* Jyotish Verdict & Muhurat Recommendation */}
            <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span>Astrological Verdict</span>
                  </h3>
                  <span className="text-xs text-amber-800 font-mono font-medium">82% Concordance</span>
                </div>

                <div className="mt-4 text-xs space-y-2.5 text-stone-700 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Nadi Koota (8/8):</strong> Madhya & Antya Nadi combination avoids Nadi Dosha, promising healthy progeny and genetic affinity.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Bhakoot Koota (7/7):</strong> 3-11 Navamsha relationship ensures mutual financial prosperity and family happiness.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Gana Koota (6/6):</strong> Both Manushya and Deva Gana harmoniously align in temperaments.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                <strong>Recommended Vivah Muhurat:</strong> Margashirsha (Nov-Dec 2024) or Magha (Jan 2025).
              </div>
            </div>
          </div>

          {/* Ashtakoota 8 Kootas Detailed Scorecard Table */}
          <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Ashtakoota Milan Breakdown (अष्टकूट मिलान सारिणी)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Detailed assessment of all eight Vedic compatibility parameters
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Score: {totalObtained} / 36
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/70">
                    <th className="py-2.5 px-3">Koota</th>
                    <th className="py-2.5 px-3">Boy's Factor</th>
                    <th className="py-2.5 px-3">Girl's Factor</th>
                    <th className="py-2.5 px-3">Significance</th>
                    <th className="py-2.5 px-3 text-center">Max Gunas</th>
                    <th className="py-2.5 px-3 text-center">Obtained</th>
                    <th className="py-2.5 px-3">Dosha Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {SAMPLE_ASHTAKOOTA_RESULTS.map((koota) => (
                    <tr key={koota.name} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3 px-3 font-semibold text-stone-850">
                        <div>{koota.name}</div>
                        <div className="text-[11px] text-stone-400 font-devanagari">
                          {koota.devanagari}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-stone-700 font-medium">{koota.boyValue}</td>
                      <td className="py-3 px-3 text-stone-700 font-medium">{koota.girlValue}</td>
                      <td className="py-3 px-3 text-stone-500 text-[11px]">{koota.description}</td>
                      <td className="py-3 px-3 text-center font-mono font-medium text-stone-600">
                        {koota.max}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-amber-800">
                        {koota.obtained}
                      </td>
                      <td className="py-3 px-3">
                        {koota.hasDosha ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                            Dosha Present
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            No Dosha (Favorable)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50/80 font-bold text-stone-900 border-t-2 border-amber-300">
                    <td className="py-3 px-3">Total Score</td>
                    <td colSpan={3} className="py-3 px-3 text-stone-600 text-[11px]">
                      Sum of all 8 Vedic Kootas
                    </td>
                    <td className="py-3 px-3 text-center font-mono">36</td>
                    <td className="py-3 px-3 text-center font-mono text-amber-800 text-sm">
                      {totalObtained}
                    </td>
                    <td className="py-3 px-3 text-emerald-800 font-serif">
                      Uttam (High Compatibility)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Vedic Chart Rendering Toggle (North Indian vs South Indian) */}
          <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Lagna & Chandra Kundli Charts (कुंडली चक्र)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Visual horoscope representation for both partners
                </p>
              </div>

              {/* Chart Style Switcher */}
              <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setChartStyle('north')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    chartStyle === 'north'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  North Indian (Diamond)
                </button>
                <button
                  onClick={() => setChartStyle('south')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    chartStyle === 'south'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  South Indian (Square)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Boy's Chart Box */}
              <div className="bg-stone-50/70 rounded-xl p-4 border border-stone-200 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-stone-850">Groom: {boyProfile.name}</span>
                  <span className="font-mono text-stone-500">Lagna: Mesha • Moon: Mesha</span>
                </div>

                {/* SVG Chart Rendering */}
                {chartStyle === 'north' ? (
                  <svg className="w-64 h-64 border border-amber-300 bg-amber-50/40 rounded-lg" viewBox="0 0 200 200">
                    {/* Outer Box */}
                    <rect x="5" y="5" width="190" height="190" fill="none" stroke="#b45309" strokeWidth="2" />
                    {/* Diagonals */}
                    <line x1="5" y1="5" x2="195" y2="195" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="5" y1="195" x2="195" y2="5" stroke="#b45309" strokeWidth="1.5" />
                    {/* Inner Diamond */}
                    <polygon points="100,5 195,100 100,195 5,100" fill="none" stroke="#b45309" strokeWidth="1.5" />
                    
                    {/* House labels & planets */}
                    <text x="100" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">1 (Lagna/Mo)</text>
                    <text x="50" y="25" textAnchor="middle" fontSize="9" fill="#57534e">12</text>
                    <text x="25" y="50" textAnchor="middle" fontSize="9" fill="#57534e">11</text>
                    <text x="45" y="100" textAnchor="middle" fontSize="9" fill="#78350f">10 (Ju)</text>
                    <text x="25" y="150" textAnchor="middle" fontSize="9" fill="#57534e">9</text>
                    <text x="50" y="175" textAnchor="middle" fontSize="9" fill="#57534e">8</text>
                    <text x="100" y="155" textAnchor="middle" fontSize="9" fill="#78350f">7</text>
                    <text x="150" y="175" textAnchor="middle" fontSize="9" fill="#57534e">6</text>
                    <text x="175" y="150" textAnchor="middle" fontSize="9" fill="#57534e">5</text>
                    <text x="155" y="100" textAnchor="middle" fontSize="9" fill="#78350f">4 (Ma)</text>
                    <text x="175" y="50" textAnchor="middle" fontSize="9" fill="#57534e">3</text>
                    <text x="150" y="25" textAnchor="middle" fontSize="9" fill="#57534e">2 (Su/Ve)</text>
                  </svg>
                ) : (
                  <svg className="w-64 h-64 border border-amber-300 bg-amber-50/40 rounded-lg" viewBox="0 0 200 200">
                    <rect x="5" y="5" width="190" height="190" fill="none" stroke="#b45309" strokeWidth="2" />
                    {/* 4x4 Grid with empty center 2x2 */}
                    <line x1="52" y1="5" x2="52" y2="195" stroke="#b45309" strokeWidth="1" />
                    <line x1="100" y1="5" x2="100" y2="52" stroke="#b45309" strokeWidth="1" />
                    <line x1="100" y1="148" x2="100" y2="195" stroke="#b45309" strokeWidth="1" />
                    <line x1="148" y1="5" x2="148" y2="195" stroke="#b45309" strokeWidth="1" />
                    <line x1="5" y1="52" x2="195" y2="52" stroke="#b45309" strokeWidth="1" />
                    <line x1="5" y1="100" x2="52" y2="100" stroke="#b45309" strokeWidth="1" />
                    <line x1="148" y1="100" x2="195" y2="100" stroke="#b45309" strokeWidth="1" />
                    <line x1="5" y1="148" x2="195" y2="148" stroke="#b45309" strokeWidth="1" />

                    <text x="28" y="32" textAnchor="middle" fontSize="9" fill="#78350f">Me (1)</text>
                    <text x="76" y="32" textAnchor="middle" fontSize="9" fill="#78350f">Vr (2)</text>
                    <text x="124" y="32" textAnchor="middle" fontSize="9" fill="#78350f">Mi (3)</text>
                    <text x="172" y="32" textAnchor="middle" fontSize="9" fill="#78350f">Ka (4)</text>
                    <text x="100" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Rahul</text>
                  </svg>
                )}
              </div>

              {/* Girl's Chart Box */}
              <div className="bg-stone-50/70 rounded-xl p-4 border border-stone-200 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-stone-850">Bride: {girlProfile.name}</span>
                  <span className="font-mono text-stone-500">Lagna: Simha • Moon: Vrishabha</span>
                </div>

                {/* SVG Chart Rendering */}
                {chartStyle === 'north' ? (
                  <svg className="w-64 h-64 border border-rose-300 bg-rose-50/40 rounded-lg" viewBox="0 0 200 200">
                    <rect x="5" y="5" width="190" height="190" fill="none" stroke="#be123c" strokeWidth="2" />
                    <line x1="5" y1="5" x2="195" y2="195" stroke="#be123c" strokeWidth="1.5" />
                    <line x1="5" y1="195" x2="195" y2="5" stroke="#be123c" strokeWidth="1.5" />
                    <polygon points="100,5 195,100 100,195 5,100" fill="none" stroke="#be123c" strokeWidth="1.5" />
                    
                    <text x="100" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">1 (Lagna)</text>
                    <text x="50" y="25" textAnchor="middle" fontSize="9" fill="#57534e">12 (Ma)</text>
                    <text x="25" y="50" textAnchor="middle" fontSize="9" fill="#57534e">11</text>
                    <text x="45" y="100" textAnchor="middle" fontSize="9" fill="#9f1239">10 (Mo Ex.)</text>
                    <text x="25" y="150" textAnchor="middle" fontSize="9" fill="#57534e">9</text>
                    <text x="50" y="175" textAnchor="middle" fontSize="9" fill="#57534e">8</text>
                    <text x="100" y="155" textAnchor="middle" fontSize="9" fill="#9f1239">7 (Ju)</text>
                    <text x="150" y="175" textAnchor="middle" fontSize="9" fill="#57534e">6</text>
                    <text x="175" y="150" textAnchor="middle" fontSize="9" fill="#57534e">5</text>
                    <text x="155" y="100" textAnchor="middle" fontSize="9" fill="#9f1239">4</text>
                    <text x="175" y="50" textAnchor="middle" fontSize="9" fill="#57534e">3</text>
                    <text x="150" y="25" textAnchor="middle" fontSize="9" fill="#57534e">2 (Ve/Su)</text>
                  </svg>
                ) : (
                  <svg className="w-64 h-64 border border-rose-300 bg-rose-50/40 rounded-lg" viewBox="0 0 200 200">
                    <rect x="5" y="5" width="190" height="190" fill="none" stroke="#be123c" strokeWidth="2" />
                    <line x1="52" y1="5" x2="52" y2="195" stroke="#be123c" strokeWidth="1" />
                    <line x1="100" y1="5" x2="100" y2="52" stroke="#be123c" strokeWidth="1" />
                    <line x1="100" y1="148" x2="100" y2="195" stroke="#be123c" strokeWidth="1" />
                    <line x1="148" y1="5" x2="148" y2="195" stroke="#be123c" strokeWidth="1" />
                    <line x1="5" y1="52" x2="195" y2="52" stroke="#be123c" strokeWidth="1" />
                    <line x1="5" y1="100" x2="52" y2="100" stroke="#be123c" strokeWidth="1" />
                    <line x1="148" y1="100" x2="195" y2="100" stroke="#be123c" strokeWidth="1" />
                    <line x1="5" y1="148" x2="195" y2="148" stroke="#be123c" strokeWidth="1" />

                    <text x="28" y="32" textAnchor="middle" fontSize="9" fill="#9f1239">Me</text>
                    <text x="76" y="32" textAnchor="middle" fontSize="9" fill="#9f1239">Vr (Mo)</text>
                    <text x="124" y="32" textAnchor="middle" fontSize="9" fill="#9f1239">Mi</text>
                    <text x="172" y="32" textAnchor="middle" fontSize="9" fill="#9f1239">Ka</text>
                    <text x="100" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">Priya</text>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
