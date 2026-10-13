import React, { useState } from 'react';
import {
  Settings,
  MapPin,
  Sparkles,
  Server,
  FileText,
  Plus,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  Database,
  Sliders,
  Check,
  Code,
} from 'lucide-react';
import { CityLocation, AdminCmsSubTab } from '../types/jyotish';
import { CITIES_DATABASE, HINDU_FESTIVALS_DATABASE } from '../data/mockData';

interface AdminCmsViewProps {
  onShowToast: (message: string) => void;
}

export const AdminCmsView: React.FC<AdminCmsViewProps> = ({ onShowToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<AdminCmsSubTab>('regional-cities');
  const [cities, setCities] = useState<CityLocation[]>(CITIES_DATABASE);
  const [ayanamshaModel, setAyanamshaModel] = useState('lahiri');
  const [sunriseMethod, setSunriseMethod] = useState<'upper-limb' | 'center-disk'>('upper-limb');
  const [refractionCorrection, setRefractionCorrection] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // New city form
  const [newCityName, setNewCityName] = useState('');
  const [newCityDevanagari, setNewCityDevanagari] = useState('');
  const [newCityLat, setNewCityLat] = useState('25.3176');
  const [newCityLon, setNewCityLon] = useState('82.9739');
  const [newCityTz, setNewCityTz] = useState('Asia/Kolkata');
  const [isAddingCity, setIsAddingCity] = useState(false);

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName) return;

    const newCity: CityLocation = {
      id: `city-${Date.now()}`,
      name: newCityName,
      devanagari: newCityDevanagari || newCityName,
      country: 'India',
      state: 'Regional',
      latitude: parseFloat(newCityLat) || 0,
      longitude: parseFloat(newCityLon) || 0,
      timezone: newCityTz,
      elevationMeters: 80,
      ephemerisModel: 'Lahiri Drik',
    };

    setCities([newCity, ...cities]);
    setIsAddingCity(false);
    setNewCityName('');
    setNewCityDevanagari('');
    onShowToast(`City '${newCity.name}' successfully added to database`);
  };

  const handleDeleteCity = (id: string, name: string) => {
    setCities(cities.filter((c) => c.id !== id));
    onShowToast(`City '${name}' removed`);
  };

  const handlePurgeCache = () => {
    setIsSyncing(true);
    onShowToast('Purging Redis Ephemeris cache and re-computing planetary tables...');
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('Redis cache warmed up! Hit ratio: 99.8% (12ms average latency)');
    }, 1500);
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Name,Devanagari,Latitude,Longitude,Timezone,Model\n' +
      cities
        .map(
          (c) =>
            `${c.id},"${c.name}","${c.devanagari}",${c.latitude},${c.longitude},"${c.timezone}","${c.ephemerisModel}"`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vedic_cities_ephemeris.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported cities CSV database');
  };

  return (
    <div className="space-y-6">
      {/* CMS Header & Sub-navigation */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-stone-100 text-stone-800">
                <Settings className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Ephemeris CMS & Computational Controls
                </h2>
                <p className="text-xs text-stone-500">
                  Manage geographical coordinates, astronomical algorithms, cache synchronization, and festival schemas
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePurgeCache}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors shadow-2xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Recalculating...' : 'Sync Ephemeris Cache'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs Nav */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveSubTab('regional-cities')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition-colors ${
              activeSubTab === 'regional-cities'
                ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Regional Cities & Geo-Coordinates ({cities.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('astronomical-engine')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition-colors ${
              activeSubTab === 'astronomical-engine'
                ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Astronomical Engine & Ayanamsha</span>
          </button>

          <button
            onClick={() => setActiveSubTab('festival-catalog')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition-colors ${
              activeSubTab === 'festival-catalog'
                ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Festival Rules & Puja Vidhi CMS</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ingestion-logs')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition-colors ${
              activeSubTab === 'ingestion-logs'
                ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Redis Cache & Engine Logs</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Regional Cities Manager */}
      {activeSubTab === 'regional-cities' && (
        <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Geographical Coordinates Registry
              </h3>
              <p className="text-xs text-stone-500">
                Panchang timings automatically recalculate according to exact latitude, longitude, and elevation
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl border border-stone-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsAddingCity(!isAddingCity)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-2xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add City</span>
              </button>
            </div>
          </div>

          {/* Add City Drawer/Form */}
          {isAddingCity && (
            <form
              onSubmit={handleAddCity}
              className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-3"
            >
              <div className="font-semibold text-amber-900 text-sm">Add New City Coordinates</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">City Name (English)</label>
                  <input
                    type="text"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    placeholder="e.g. Ayodhya"
                    className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-stone-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Devanagari Name</label>
                  <input
                    type="text"
                    value={newCityDevanagari}
                    onChange={(e) => setNewCityDevanagari(e.target.value)}
                    placeholder="e.g. अयोध्या"
                    className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-stone-300 font-devanagari"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Latitude (°N/S)</label>
                  <input
                    type="text"
                    value={newCityLat}
                    onChange={(e) => setNewCityLat(e.target.value)}
                    placeholder="e.g. 26.7922"
                    className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-stone-300 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Longitude (°E/W)</label>
                  <input
                    type="text"
                    value={newCityLon}
                    onChange={(e) => setNewCityLon(e.target.value)}
                    placeholder="e.g. 82.1998"
                    className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-stone-300 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Timezone</label>
                  <input
                    type="text"
                    value={newCityTz}
                    onChange={(e) => setNewCityTz(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-stone-300 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCity(false)}
                  className="px-3 py-1.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700"
                >
                  Save City
                </button>
              </div>
            </form>
          )}

          {/* Cities Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/70">
                  <th className="py-2.5 px-3">City Name</th>
                  <th className="py-2.5 px-3">Devanagari</th>
                  <th className="py-2.5 px-3">Coordinates (Lat / Lon)</th>
                  <th className="py-2.5 px-3">Timezone</th>
                  <th className="py-2.5 px-3">Ephemeris Method</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {cities.map((city) => (
                  <tr key={city.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-stone-850">
                      {city.name}
                      <span className="text-stone-400 font-normal ml-1">({city.country})</span>
                    </td>
                    <td className="py-2.5 px-3 font-devanagari text-stone-700">
                      {city.devanagari}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-stone-700">
                      {city.latitude.toFixed(4)}°, {city.longitude.toFixed(4)}°
                    </td>
                    <td className="py-2.5 px-3 font-mono text-stone-600 text-[11px]">
                      {city.timezone}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-800 font-mono">
                        {city.ephemerisModel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleDeleteCity(city.id, city.name)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete city"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Astronomical Engine Settings */}
      {activeSubTab === 'astronomical-engine' && (
        <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Astronomical Ephemeris Configuration
            </h3>
            <p className="text-xs text-stone-500">
              Select Ayanamsha algorithm, solar disk edge adjustments, and refraction models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Ayanamsha Selection */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
              <span className="font-bold text-stone-800 text-sm block">Ayanamsha System</span>
              <p className="text-stone-500 text-[11px]">
                Defines the offset between the Tropical (Sayana) and Sidereal (Nirayana) zodiacs
              </p>

              <div className="space-y-2">
                {[
                  {
                    id: 'lahiri',
                    name: 'Chitra Paksha / Lahiri Ayanamsha (Standard)',
                    desc: "Official Indian Astronomical Ephemeris standard (Spica star at exactly 180° / 0° Libra). Current value: 24° 12' 38\".",
                  },
                  {
                    id: 'raman',
                    name: 'B.V. Raman Ayanamsha',
                    desc: 'Traditional South Indian astrological system propagated by Dr. B.V. Raman.',
                  },
                  {
                    id: 'kp',
                    name: 'Krishnamurti Padhdhati (KP)',
                    desc: 'Used in KP Horary astrology for precise sub-lord division.',
                  },
                  {
                    id: 'surya-siddhanta',
                    name: 'Surya Siddhanta (Classical)',
                    desc: 'Traditional Hindu astronomical treatise text computation without modern orbital perturbations.',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`block p-3 rounded-xl border cursor-pointer transition-all ${
                      ayanamshaModel === item.id
                        ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-500'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ayanamsha"
                        checked={ayanamshaModel === item.id}
                        onChange={() => {
                          setAyanamshaModel(item.id);
                          onShowToast(`Ayanamsha changed to: ${item.name}`);
                        }}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span className="font-semibold text-stone-900">{item.name}</span>
                    </div>
                    <p className="text-stone-500 text-[11px] mt-1 pl-5">{item.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Sunrise Edge & Refraction Correction */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
              <span className="font-bold text-stone-800 text-sm block">Sunrise & Horizon Definitions</span>
              
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-stone-700 block mb-1">Sunrise Disc Definition:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSunriseMethod('upper-limb')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        sunriseMethod === 'upper-limb'
                          ? 'border-amber-600 bg-amber-50 font-semibold text-amber-900'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <div className="font-semibold">Upper Limb (Drik Standard)</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Moment upper tip of Sun crosses apparent horizon
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSunriseMethod('center-disk')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        sunriseMethod === 'center-disk'
                          ? 'border-amber-600 bg-amber-50 font-semibold text-amber-900'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <div className="font-semibold">Center of Solar Disk</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Astronomical geometric center without semidiameter
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={refractionCorrection}
                      onChange={(e) => setRefractionCorrection(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-semibold text-stone-850">
                        Atmospheric Refraction Correction (34 Arcminutes)
                      </span>
                      <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">
                        Compensates for optical bending of light near horizon at sea level (1013.25 hPa, 10°C). Recommended for all authentic Panchang calculations.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-3 border-t border-stone-200">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Mathematical Precision: ±0.1 arcsecond</span>
                    </div>
                    <p className="text-[11px] text-emerald-800/90 mt-1">
                      Computed using VSOP87 planetary theory and ELP2000-82 lunar theory algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Festival Catalog & Ritual Schema */}
      {activeSubTab === 'festival-catalog' && (
        <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Festival Rules & Vidhi Schema Catalog
              </h3>
              <p className="text-xs text-stone-500">
                Astronomical conditional triggers for Hindu festivals and Shodashopachara rituals
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/70">
                  <th className="py-2.5 px-3">Festival Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Tithi / Astronomical Rule</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Vidhi Steps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {HINDU_FESTIVALS_DATABASE.map((fest) => (
                  <tr key={fest.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-stone-850">
                      {fest.name}
                      <span className="text-stone-400 font-normal font-devanagari ml-1">
                        ({fest.devanagari})
                      </span>
                    </td>
                    <td className="py-2.5 px-3 capitalize text-stone-600">{fest.category}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-stone-700">
                      {fest.month} • {fest.paksha} {fest.tithi}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Published
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-stone-600 font-mono">16 Steps (Complete)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Ingestion & Redis Cache Logs */}
      {activeSubTab === 'ingestion-logs' && (
        <div className="bg-stone-950 text-stone-100 rounded-2xl border border-stone-800 shadow-md p-5 sm:p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2 text-amber-400">
              <Server className="w-4 h-4" />
              <span className="font-bold">Redis Ephemeris Cache Node #1 (asia-northeast1)</span>
            </div>
            <div className="flex items-center gap-3 text-stone-400 text-[11px]">
              <span>Uptime: 99.98%</span>
              <span className="text-emerald-400 font-semibold">● ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Cache Hit Ratio</span>
              <span className="text-lg font-bold text-emerald-400">99.82%</span>
            </div>
            <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Query Latency</span>
              <span className="text-lg font-bold text-amber-400">11.4 ms</span>
            </div>
            <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Indexed Cities</span>
              <span className="text-lg font-bold text-white">{cities.length} Active</span>
            </div>
            <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Ephemeris Epoch</span>
              <span className="text-lg font-bold text-blue-400">2024-2035</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-stone-400 text-[11px] block mb-2 font-semibold">
              Live Ingestion & Astronomical Computation Stream:
            </span>
            <div className="bg-black/60 rounded-xl p-4 border border-stone-800/80 text-[11px] space-y-1.5 text-stone-300 font-mono max-h-60 overflow-y-auto">
              <div className="text-stone-500">[2024-10-24 00:00:01 UTC] Ephemeris daemon triggered daily Nirayana recalculation.</div>
              <div className="text-emerald-400">[2024-10-24 00:00:02 UTC] Lahiri delta-t offset verified: 69.184 seconds.</div>
              <div className="text-stone-300">[2024-10-24 00:00:03 UTC] Sol-Luna orbital matrix calculated for 16 primary coordinates.</div>
              <div className="text-amber-300">[2024-10-24 00:00:04 UTC] Pushya Nakshatra transition computed at 21:48:12 IST.</div>
              <div className="text-stone-300">[2024-10-24 00:00:05 UTC] Abhijit Muhurat slot computed for New Delhi: 11:43:08 - 12:28:44 IST.</div>
              <div className="text-emerald-400">[2024-10-24 00:00:06 UTC] 1,420 key pairs pushed to Redis memory cluster. Status: 200 OK.</div>
              <div className="text-stone-400">[2024-10-24 05:01:23 UTC] Client heartbeat from New Delhi IP. Cache hit (0.4ms).</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
