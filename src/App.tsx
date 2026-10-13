/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab, CityLocation } from './types/jyotish';
import { CITIES_DATABASE } from './data/mockData';
import { Header } from './components/Header';
import { DailyPanchangView } from './components/DailyPanchangView';
import { MonthlyCalendarView } from './components/MonthlyCalendarView';
import { MuhuratChoghadiyaView } from './components/MuhuratChoghadiyaView';
import { KundliMilanView } from './components/KundliMilanView';
import { FestivalsView } from './components/FestivalsView';
import { AdminCmsView } from './components/AdminCmsView';
import { CitySelectorModal } from './components/CitySelectorModal';
import {
  Sparkles,
  Heart,
  Calendar,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('daily-panchang');
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES_DATABASE[0]);
  const [currentDateStr, setCurrentDateStr] = useState<string>('2024-10-24');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deepDiveFestivalId, setDeepDiveFestivalId] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenFestivalDetail = (festivalId: string) => {
    setDeepDiveFestivalId(festivalId);
    setActiveTab('festivals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCalendarDate = (dateStr: string) => {
    setCurrentDateStr(dateStr);
    setActiveTab('daily-panchang');
    showToast(`Loaded Daily Panchang for ${dateStr}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900/95 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-700/80 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'festivals') {
            setDeepDiveFestivalId(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCity={selectedCity}
        onCityChange={(city) => {
          setSelectedCity(city);
          showToast(`Location set to ${city.name} (${city.latitude.toFixed(2)}°N)`);
        }}
        onOpenCityModal={() => setIsCityModalOpen(true)}
      />

      {/* Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'daily-panchang' && (
          <DailyPanchangView
            selectedCity={selectedCity}
            currentDateStr={currentDateStr}
            onDateChange={(date) => setCurrentDateStr(date)}
            onOpenFestivalDetail={handleOpenFestivalDetail}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'monthly-calendar' && (
          <MonthlyCalendarView
            onSelectDate={handleSelectCalendarDate}
            onOpenFestivalDetail={handleOpenFestivalDetail}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'muhurat-and-choghadiya' && (
          <MuhuratChoghadiyaView
            selectedCity={selectedCity}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'kundli-matching' && (
          <KundliMilanView onShowToast={showToast} />
        )}

        {activeTab === 'festivals' && (
          <FestivalsView
            initialFestivalId={deepDiveFestivalId}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'admin-cms' && (
          <AdminCmsView onShowToast={showToast} />
        )}
      </main>

      {/* City Coordinates Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          showToast(`Coordinates updated: ${city.name} (${city.latitude.toFixed(2)}°N, ${city.longitude.toFixed(2)}°E)`);
        }}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-200/90 bg-white/90 backdrop-blur-xs py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-bold text-sm shadow-2xs">
              ॐ
            </div>
            <div>
              <span className="font-serif font-bold text-stone-900 text-sm">
                Surya Chandra Vedic Jyotish
              </span>
              <span className="block text-[11px] text-stone-400">
                Drik Siddhanta High-Precision Ephemeris • Sidereal Nirayana System
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('daily-panchang')}
              className="hover:text-amber-700 transition-colors"
            >
              Daily Panchang
            </button>
            <button
              onClick={() => setActiveTab('monthly-calendar')}
              className="hover:text-amber-700 transition-colors"
            >
              Hindu Calendar
            </button>
            <button
              onClick={() => setActiveTab('kundli-matching')}
              className="hover:text-amber-700 transition-colors"
            >
              36 Guna Milan
            </button>
            <button
              onClick={() => setActiveTab('festivals')}
              className="hover:text-amber-700 transition-colors"
            >
              Puja Vidhi
            </button>
            <button
              onClick={() => setActiveTab('admin-cms')}
              className="hover:text-amber-700 transition-colors"
            >
              Admin CMS
            </button>
          </div>

          <div className="text-center md:text-right text-[11px] text-stone-400">
            Ayanamsha: Lahiri (24° 12' 38") • Refraction: Corrected (34')
          </div>
        </div>
      </footer>
    </div>
  );
}
