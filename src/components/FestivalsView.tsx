import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  Search,
  Filter,
  Flame,
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Download,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon,
  Info,
  Check,
} from 'lucide-react';
import { FestivalItem } from '../types/jyotish';
import { HINDU_FESTIVALS_DATABASE, DIWALI_DEEP_DIVE } from '../data/mockData';

interface FestivalsViewProps {
  initialFestivalId?: string | null;
  onShowToast: (message: string) => void;
}

export const FestivalsView: React.FC<FestivalsViewProps> = ({
  initialFestivalId,
  onShowToast,
}) => {
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(
    initialFestivalId || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vratOnly, setVratOnly] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // Filtered festivals
  const filteredFestivals = HINDU_FESTIVALS_DATABASE.filter((fest) => {
    const matchesSearch =
      fest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.devanagari.includes(searchQuery) ||
      fest.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || fest.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesVrat = !vratOnly || fest.isVrat;

    return matchesSearch && matchesCategory && matchesVrat;
  });

  const categories = [
    { id: 'all', label: 'All Festivals' },
    { id: 'deepawali', label: 'Diwali Series' },
    { id: 'navratri', label: 'Navratri & Durga' },
    { id: 'shaiva', label: 'Maha Shivratri' },
    { id: 'vaishnava', label: 'Krishna & Vishnu' },
    { id: 'solar', label: 'Sankranti & Solar' },
  ];

  const handleSelectFestival = (id: string) => {
    setSelectedFestivalId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedFestivalId(null);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      onShowToast('Playing Lakshmi Beej Mantra chant');
    }
  };

  const handleShareFestival = () => {
    navigator.clipboard?.writeText(
      `Diwali Lakshmi Puja 2024 Shubh Muhurat:\nDate: October 31, 2024\nPradosh Kaal Muhurat: 17:39 - 20:15\nVrishabha Sthir Lagna: 18:24 - 20:20\nNishita Kaal: 23:39 - 24:31\nExplore complete 16-step Shodashopachara Vidhi on Surya Chandra Vedic Jyotish.`
    );
    setCopied(true);
    onShowToast('Festival Muhurat & Vidhi details copied!');
    setTimeout(() => setCopied(false), 2500);
  };

  // If a festival is selected, render the deep dive view
  if (selectedFestivalId) {
    const festData = DIWALI_DEEP_DIVE;

    return (
      <div className="space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Festival Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareFestival}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copied ? 'Copied' : 'Share Muhurat'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Print Puja Vidhi</span>
            </button>
          </div>
        </div>

        {/* Hero Banner for Diwali */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 text-white p-6 sm:p-10 border border-amber-800/60 shadow-lg">
          {/* Subtle gold ornamentation glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                Kartika Krishna Amavasya
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/40">
                Purnimanta Kartika • Shaka 1946
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-amber-100 tracking-tight leading-tight">
              Diwali Lakshmi Puja 2024
            </h1>
            <p className="text-base sm:text-lg text-amber-200/90 font-devanagari">
              दीपावली महालक्ष्मी-गणेश पूजन एवं स्थिर लग्न मुहूर्त
            </p>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
              {festData.significance}
            </p>

            {/* Audio Mantra Player Simulation */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleToggleAudio}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-all"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white animate-pulse" />
                    <span>Pause Sacred Stotram</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-white" />
                    <span>Chant: Om Shreem Hreem Kleem Maha Lakshmi</span>
                  </>
                )}
              </button>
              {isPlayingAudio && (
                <span className="text-xs text-amber-300 font-mono animate-pulse">
                  ♪ Chanting Rigvedic Shree Suktam (432Hz)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Shubh Muhurat Timing Grid */}
        <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                <span>Lakshmi Puja Shubh Muhurat (शुभ पूजन मुहूर्त)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Calculated for New Delhi, India using Pradosh Kaal & Sthir Lagna Siddhanta
              </p>
            </div>
            <span className="text-xs text-amber-900 bg-amber-100 px-3 py-1 rounded-full font-semibold border border-amber-300 self-start sm:self-auto">
              October 31, 2024 (Thursday)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {festData.muhuratWindows.map((window, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  window.isOptimal
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400/30'
                    : 'bg-stone-50/70 border-stone-200/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-700">
                      {window.name}
                    </span>
                    {window.isOptimal && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white">
                        Most Auspicious
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-devanagari text-stone-500 mb-2">
                    {window.devanagari}
                  </div>
                  <div className="text-lg font-serif font-bold text-stone-900 font-mono">
                    {window.startTime} - {window.endTime}
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-current/10 text-xs">
                  <div className="text-stone-500 text-[11px]">Duration: <strong className="text-stone-700">{window.duration}</strong></div>
                  <p className="text-stone-600 text-[11px] mt-1 leading-snug">{window.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 16-Step Shodashopachara Puja Vidhi */}
        <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>Shodashopachara Puja Vidhi (षोडशोपचार पूजा विधि)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                The 16 sacred Vedic offerings to Goddess Lakshmi and Lord Ganesha
              </p>
            </div>
            <span className="text-xs text-stone-500 font-mono">16 Complete Steps</span>
          </div>

          {/* Stepper Tabs Scrollable */}
          <div className="flex overflow-x-auto gap-2 pb-2 border-b border-stone-200 text-xs scrollbar-none">
            {festData.shodashopacharaSteps.map((step) => (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepTab(step.stepNumber)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                  activeStepTab === step.stepNumber
                    ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>#{step.stepNumber} {step.name}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content Card */}
          {(() => {
            const currentStep =
              festData.shodashopacharaSteps.find((s) => s.stepNumber === activeStepTab) ||
              festData.shodashopacharaSteps[0];

            return (
              <div className="mt-5 p-5 rounded-2xl bg-amber-50/40 border border-amber-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-amber-200/70">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      {currentStep.stepNumber}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-base">
                        {currentStep.name} ({currentStep.devanagari})
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentStep.stepNumber === 1}
                      onClick={() => setActiveStepTab((prev) => Math.max(1, prev - 1))}
                      className="px-2.5 py-1 text-xs bg-white rounded-lg border border-stone-300 disabled:opacity-40"
                    >
                      Prev Step
                    </button>
                    <button
                      disabled={currentStep.stepNumber === 16}
                      onClick={() => setActiveStepTab((prev) => Math.min(16, prev + 1))}
                      className="px-2.5 py-1 text-xs bg-white rounded-lg border border-stone-300 disabled:opacity-40"
                    >
                      Next Step
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div>
                    <span className="font-semibold text-stone-700 block mb-1 text-xs">
                      Puja Ritual Action:
                    </span>
                    <p className="text-stone-600 leading-relaxed bg-white p-3.5 rounded-xl border border-amber-100">
                      {currentStep.procedure}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-700 block mb-1 text-xs">
                      Sacred Vedic / Puranic Mantra to Recite:
                    </span>
                    <div className="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300 font-devanagari text-amber-950 font-medium text-sm leading-relaxed">
                      {currentStep.mantra}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Fasting Rules (Vrat Niyam) & Prasad Recipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5">
            <h4 className="font-serif font-bold text-stone-900 text-base mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Vrat Rules & Fasting Guidelines (व्रत नियम)</span>
            </h4>
            <div className="text-xs text-stone-600 space-y-2.5 leading-relaxed">
              <p>• Devotees observe Phalahari (fruits & milk) or Nirjala fast throughout the daytime of Amavasya.</p>
              <p>• Cleanse the house thoroughly and decorate the threshold with fresh mango leaves, marigolds, and rice flour Rangoli.</p>
              <p>• Place a bronze or silver Kalash with coconut on a mound of raw rice (Akshata).</p>
              <p>• Fast is concluded with family Prasad distribution after the conclusion of Pradosh Kaal Lakshmi Aarti.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5">
            <h4 className="font-serif font-bold text-stone-900 text-base mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Bhog & Naivedya Offerings (भोग एवं नैवेद्य)</span>
            </h4>
            <div className="text-xs text-stone-600 space-y-2.5 leading-relaxed">
              <p>• Kheer made of pure cow milk, rice, and sugar crystals (Panchamrita).</p>
              <p>• Batasha, Boondi Ladoo, and Motichoor Ladoo offered especially to Lord Ganesha.</p>
              <p>• Five seasonal fruits including pomegranate, banana, water chestnut (Singhara), coconut, and sugarcane.</p>
              <p>• Lotus flower (Kamal Gatta) and betel nut with clove, cardamom, and silver foil.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Festivals Directory List Screen
  return (
    <div className="space-y-6">
      {/* Directory Header Bar */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Sanatan Hindu Festivals & Vrat Directory
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Comprehensive dates, astronomical tithi rules, rituals, and Shodashopachara Puja Vidhi
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Diwali, Navratri, Shivratri..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-medium">
            <input
              type="checkbox"
              checked={vratOnly}
              onChange={(e) => setVratOnly(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
            />
            <span>Show Fasts / Vrats Only</span>
          </label>
        </div>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFestivals.map((fest) => (
          <div
            key={fest.id}
            onClick={() => handleSelectFestival(fest.id)}
            className="bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400 shadow-xs hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg group-hover:text-amber-800 transition-colors">
                    {fest.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-devanagari block mt-0.5">
                    {fest.devanagari}
                  </span>
                </div>
                {fest.isVrat && (
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                    Vrat
                  </span>
                )}
              </div>

              <div className="mt-3 py-2 px-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs text-amber-900 font-medium">
                {fest.gregorianDate2024}
              </div>

              <div className="mt-2 text-xs text-stone-500 space-y-0.5">
                <div>Tithi: <span className="text-stone-700 font-medium">{fest.tithi}</span></div>
                <div>Month: <span className="text-stone-700 font-medium">{fest.month} ({fest.paksha} Paksha)</span></div>
              </div>

              <p className="mt-3 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {fest.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-amber-700 font-semibold group-hover:underline flex items-center gap-1">
                <span>View Puja Vidhi & Muhurat</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-stone-400 font-mono text-[11px] capitalize">{fest.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
