import React, { useState } from 'react';
import { retroSound } from '../utils/audio';
import { Chapter } from '../types/ipas';
import { 
  Zap, 
  Wind, 
  Sun, 
  Droplet, 
  Sparkles, 
  Magnet, 
  Compass, 
  Globe2, 
  Flame, 
  Layers, 
  TreePine, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb,
  Radio,
  Eye,
  Volume2
} from 'lucide-react';

interface Props {
  chapter: Chapter;
}

export const InteractiveSimulations: React.FC<Props> = ({ chapter }) => {
  // Navigation between Chapter Lab vs Light Lab vs Sound Lab
  const [labTab, setLabTab] = useState<'chapter' | 'light' | 'sound'>('chapter');

  // =================== Bab 1 States ===================
  const [energySource, setEnergySource] = useState<'wind' | 'hydro' | 'solar' | 'coal'>('wind');
  const [sunlight, setSunlight] = useState<number>(80);
  const [waterLevel, setWaterLevel] = useState<number>(75);
  const [co2Level, setCo2Level] = useState<number>(70);

  // =================== Bab 2 States ===================
  const [surfaceType, setSurfaceType] = useState<'ice' | 'wood' | 'rough' | 'oiled'>('wood');
  const [useWheels, setUseWheels] = useState<boolean>(false);
  const [pushForce, setPushForce] = useState<number>(50);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [pushDistance, setPushDistance] = useState<number>(0);
  const [magnetPole1, setMagnetPole1] = useState<'U' | 'S'>('U');
  const [magnetPole2, setMagnetPole2] = useState<'U' | 'S'>('S');
  const [magnetDistance, setMagnetDistance] = useState<number>(40);

  // =================== Bab 3 States ===================
  const [selectedCoord, setSelectedCoord] = useState<{ lat: string; lon: string; name: string; info: string }>({
    lat: '2° 35\' LU',
    lon: '98° 49\' BT',
    name: 'Danau Toba & Pulau Samosir',
    info: 'Kaldera supervulkanik purba terbesar di dunia dengan luas 1.145 km².'
  });
  const [tectonicMode, setTectonicMode] = useState<'konvergen' | 'divergen' | 'transform'>('konvergen');

  // =================== Bab 4 States ===================
  const [carbonEmission, setCarbonEmission] = useState<number>(65);
  const [forestCover, setForestCover] = useState<number>(50);

  // =================== Bab 5 States ===================
  const [faunaZone, setFaunaZone] = useState<'asiatis' | 'peralihan' | 'australis'>('peralihan');

  // =================== Bab 7 States ===================
  const [selectedHeritage, setSelectedHeritage] = useState<string>('sasi');

  // =================== Bab 8 States: 4M Sorter ===================
  const [sorterItems, setSorterItems] = useState([
    { id: 1, name: 'Sedotan Plastik di Kedai Es', correctCategory: 'Menolak', placed: '' },
    { id: 2, name: 'Lampu Kamar Saat Siang Hari', correctCategory: 'Mengurangi', placed: '' },
    { id: 3, name: 'Baju Seragam Masih Bagus', correctCategory: 'Menggunakan Ulang', placed: '' },
    { id: 4, name: 'Kardus Paket & Kertas Bekas', correctCategory: 'Mendaur Ulang', placed: '' },
  ]);

  // =================== SIMULASI CAHAYA (LIGHT LAB) ===================
  const [lightMode, setLightMode] = useState<'straight' | 'mirror' | 'refraction' | 'transparent'>('straight');
  const [cardAligned, setCardAligned] = useState<boolean>(true);
  const [mirrorType, setMirrorType] = useState<'flat' | 'concave' | 'convex'>('flat');
  const [objectTransparency, setObjectTransparency] = useState<'clear' | 'translucent' | 'opaque'>('clear');

  // =================== SIMULASI BUNYI (SOUND LAB) ===================
  const [soundMode, setSoundMode] = useState<'fork' | 'string' | 'medium'>('fork');
  const [forkVibrating, setForkVibrating] = useState<boolean>(false);
  const [stringTension, setStringTension] = useState<number>(60); // 20 - 100
  const [stringLength, setStringLength] = useState<number>(50); // 20 - 100
  const [soundMedium, setSoundMedium] = useState<'solid' | 'liquid' | 'gas' | 'vacuum'>('gas');

  // Handler for push animation in Bab 2
  const handleTestFriction = () => {
    retroSound.playBlip();
    setIsPushing(true);
    let frictionFactor = 1;
    if (surfaceType === 'ice') frictionFactor = 0.2;
    if (surfaceType === 'oiled') frictionFactor = 0.3;
    if (surfaceType === 'wood') frictionFactor = 0.6;
    if (surfaceType === 'rough') frictionFactor = 1.2;
    if (useWheels) frictionFactor *= 0.35;

    const calculatedDist = Math.max(10, Math.min(280, Math.round((pushForce / frictionFactor) * 2)));
    setPushDistance(calculatedDist);

    setTimeout(() => {
      setIsPushing(false);
      retroSound.playCoin();
    }, 600);
  };

  // Handler for 4M Sorting in Bab 8
  const handlePlaceItem = (itemId: number, category: string) => {
    retroSound.playBlip();
    setSorterItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const isRight = item.correctCategory === category;
        if (isRight) {
          retroSound.playCorrect();
        } else {
          retroSound.playError();
        }
        return { ...item, placed: category };
      }
      return item;
    }));
  };

  // Strike Tuning Fork
  const handleStrikeFork = (freq: number) => {
    setForkVibrating(true);
    retroSound.playFrequency(freq, 0.6);
    setTimeout(() => setForkVibrating(false), 700);
  };

  // Pluck String
  const handlePluckString = () => {
    // Frequency increases with tension, decreases with length
    const calculatedFreq = Math.round(200 + (stringTension * 3) - (stringLength * 1.5));
    retroSound.playFrequency(calculatedFreq, 0.5);
  };

  return (
    <div className="retro-card p-4 sm:p-6 rounded-xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-5">
      {/* Simulation Category Navigation Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
        <div>
          <div className="text-[9px] font-pixel text-amber-400 uppercase tracking-widest">
            Laboratorium Sains Virtual Siswa
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
            Eksperimen Interaktif Sebelum Uji Kuis
          </h3>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800 overflow-x-auto">
          <button
            type="button"
            onClick={() => { setLabTab('chapter'); retroSound.playBlip(); }}
            className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              labTab === 'chapter'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Materi Bab {chapter.id}</span>
          </button>

          <button
            type="button"
            onClick={() => { setLabTab('light'); retroSound.playBlip(); }}
            className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              labTab === 'light'
                ? 'bg-yellow-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Percobaan Cahaya</span>
          </button>

          <button
            type="button"
            onClick={() => { setLabTab('sound'); retroSound.playBlip(); }}
            className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              labTab === 'sound'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Percobaan Bunyi</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PERCOBAAN SPESIFIK BAB (1 S/D 8)                                    */}
      {/* ========================================================================= */}
      {labTab === 'chapter' && (
        <div className="space-y-4">
          {/* BAB 1: TRANSFORMASI ENERGI & REAKTOR FOTOSINTESIS */}
          {chapter.id === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Pembangkit Listrik (PLTB / PLTA / Surya / PLTU)
                  </h4>
                  <span className="text-[10px] text-slate-400">Pilih:</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setEnergySource('wind'); retroSound.playBlip(); }}
                    className={`cursor-pointer p-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                      energySource === 'wind' ? 'bg-cyan-600 text-white ring-2 ring-cyan-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5" />
                    <span className="text-[10px]">PLTB Angin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEnergySource('hydro'); retroSound.playBlip(); }}
                    className={`cursor-pointer p-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                      energySource === 'hydro' ? 'bg-blue-600 text-white ring-2 ring-blue-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5" />
                    <span className="text-[10px]">PLTA Air</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEnergySource('solar'); retroSound.playBlip(); }}
                    className={`cursor-pointer p-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                      energySource === 'solar' ? 'bg-amber-600 text-white ring-2 ring-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Surya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEnergySource('coal'); retroSound.playBlip(); }}
                    className={`cursor-pointer p-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                      energySource === 'coal' ? 'bg-orange-700 text-white ring-2 ring-orange-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span className="text-[10px]">PLTU Uap</span>
                  </button>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/60 text-xs space-y-2">
                  <div className="font-semibold text-slate-200">
                    {energySource === 'wind' && 'PLTB Sidrap: Angin menggerakkan turbin raksasa tanpa asap limbah!'}
                    {energySource === 'hydro' && 'PLTA Bendungan: Air deras memutar turbin dan generator!'}
                    {energySource === 'solar' && 'Panel Surya: Sinar matahari langsung diubah menjadi listrik!'}
                    {energySource === 'coal' && 'PLTU: Pembakaran batu bara menghasilkan uap, tetapi menghasilkan gas karbon.'}
                  </div>
                  <div className="text-[11px] text-amber-300 bg-slate-950 p-2 rounded font-mono">
                    Hukum Kekekalan: Energi tidak musnah, melainkan berubah bentuk.
                  </div>
                </div>
              </div>

              {/* Photosynthesis Slider */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <TreePine className="w-4 h-4" />
                  Reaktor Fotosintesis Daun Hijau
                </h4>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-0.5 text-[11px]">
                      <span>Cahaya Matahari:</span>
                      <span className="font-mono text-amber-400 font-bold">{sunlight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sunlight}
                      onChange={(e) => setSunlight(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-0.5 text-[11px]">
                      <span>Air Tanah (Akar):</span>
                      <span className="font-mono text-cyan-400 font-bold">{waterLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                {(() => {
                  const rate = Math.round((sunlight * 0.5 + waterLevel * 0.5));
                  return (
                    <div className="bg-slate-900 p-3 rounded-lg border border-emerald-800/60 space-y-1.5 text-center">
                      <div className="text-[11px] text-slate-300">Hasil Fotosintesis:</div>
                      <div className="font-pixel text-xs text-emerald-400">
                        Oksigen Bersih: +{rate}% · Karbohidrat: +{Math.round(rate * 0.8)}g
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* BAB 2: GAYA GESEK & MAGNET */}
          {chapter.id === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-blue-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Uji Gaya Gesek & Keuntungan Roda
                </h4>

                <div className="grid grid-cols-4 gap-1">
                  {(['ice', 'oiled', 'wood', 'rough'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => { setSurfaceType(type); retroSound.playBlip(); }}
                      className={`cursor-pointer p-1.5 rounded text-[10px] font-medium text-center ${
                        surfaceType === type ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {type === 'ice' && '🧊 Es'}
                      {type === 'oiled' && '🛢️ Oli'}
                      {type === 'wood' && '🪵 Kayu'}
                      {type === 'rough' && '🪨 Kasar'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-slate-900 p-2 rounded">
                  <span className="text-slate-300 text-[11px]">Pasang Roda:</span>
                  <button
                    type="button"
                    onClick={() => { setUseWheels(!useWheels); retroSound.playBlip(); }}
                    className={`cursor-pointer px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      useWheels ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {useWheels ? '✓ Beroda' : '✕ Tanpa Roda'}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleTestFriction}
                    disabled={isPushing}
                    className="cursor-pointer retro-btn bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded text-xs"
                  >
                    🚀 Berikan Gaya Dorong
                  </button>
                  <span className="text-[11px] text-amber-400 font-mono font-bold">
                    Jarak: {pushDistance} cm
                  </span>
                </div>
              </div>

              {/* Magnet Pole Lab */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-purple-400 flex items-center gap-1.5">
                  <Magnet className="w-4 h-4" />
                  Interaksi Dua Kutub Magnet
                </h4>

                <div className="flex items-center justify-around gap-2 bg-slate-900 p-3 rounded-lg">
                  <button
                    type="button"
                    onClick={() => { setMagnetPole1(magnetPole1 === 'U' ? 'S' : 'U'); retroSound.playBlip(); }}
                    className={`cursor-pointer px-3 py-1.5 rounded font-pixel text-xs text-white ${
                      magnetPole1 === 'U' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                  >
                    {magnetPole1 === 'U' ? 'Kutub U' : 'Kutub S'}
                  </button>

                  <span className="font-pixel text-[11px] text-amber-400">
                    {magnetPole1 === magnetPole2 ? '◀ TOLAK ▶' : '▶ TARIK ◀'}
                  </span>

                  <button
                    type="button"
                    onClick={() => { setMagnetPole2(magnetPole2 === 'U' ? 'S' : 'U'); retroSound.playBlip(); }}
                    className={`cursor-pointer px-3 py-1.5 rounded font-pixel text-xs text-white ${
                      magnetPole2 === 'U' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                  >
                    {magnetPole2 === 'U' ? 'Kutub U' : 'Kutub S'}
                  </button>
                </div>

                <div className="text-[11px] text-slate-300 text-center bg-slate-900 p-2 rounded">
                  {magnetPole1 === magnetPole2 
                    ? '⚠️ Kutub sejenis saling TOLAK-MENOLAK (Prinsip melayang Kereta Maglev!)' 
                    : '✓ Kutub berlawanan saling TARIK-MENARIK dengan kuat!'}
                </div>
              </div>
            </div>
          )}

          {/* BAB 3: PETA & TEKTONIK */}
          {chapter.id === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  Koordinat Garis Lintang (Mendatar) & Bujur (Tegak)
                </h4>
                <div className="bg-slate-900 p-3 rounded-lg border border-cyan-800/40 space-y-1">
                  <div className="font-bold text-cyan-300">{selectedCoord.name}</div>
                  <div className="font-mono text-amber-300 text-[11px]">{selectedCoord.lat}, {selectedCoord.lon}</div>
                  <p className="text-slate-300 text-[11px]">{selectedCoord.info}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  Gerak Lempeng Pembentuk Bentang Alam
                </h4>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['konvergen', 'divergen', 'transform'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => { setTectonicMode(mode); retroSound.playBlip(); }}
                      className={`cursor-pointer p-1.5 rounded text-center capitalize font-bold text-[11px] ${
                        tectonicMode === mode ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-900 p-2.5 rounded text-[11px] text-slate-300">
                  {tectonicMode === 'konvergen' && 'Lempeng saling bertubrukan membentuk pegunungan & palung laut.'}
                  {tectonicMode === 'divergen' && 'Lempeng saling menjauh membentuk patahan baru.'}
                  {tectonicMode === 'transform' && 'Lempeng bergesekan menyamping memicu guncangan gempa bumi.'}
                </div>
              </div>
            </div>
          )}

          {/* BAB 4: IKLIM & EFEK RUMAH KACA */}
          {chapter.id === 4 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-orange-400 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4" />
                Neraca Gas Rumah Kaca & Cadangan Air Tawar (3,5%)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Emisi Gas CO2:</span>
                    <span className="font-mono text-red-400 font-bold">{carbonEmission}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={carbonEmission}
                    onChange={(e) => setCarbonEmission(Number(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>
                <div className="bg-slate-900 p-3 rounded text-center space-y-1">
                  <div className="text-[11px] text-slate-400">Prediksi Suhu Permukaan Bumi:</div>
                  <div className="font-pixel text-base text-amber-400">
                    {(14.5 + carbonEmission * 0.03).toFixed(1)}°C
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BAB 5: FAUNA 3 ZONA WALLACEA */}
          {chapter.id === 5 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <TreePine className="w-4 h-4" />
                  Peta 3 Zona Fauna Nusantara
                </h4>
                <div className="flex gap-1">
                  {(['asiatis', 'peralihan', 'australis'] as const).map(z => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => { setFaunaZone(z); retroSound.playBlip(); }}
                      className={`cursor-pointer px-2.5 py-1 rounded text-[10px] font-bold capitalize ${
                        faunaZone === z ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded text-slate-300 text-[11px]">
                {faunaZone === 'asiatis' && 'Zona Barat (Asiatis): Gajah, Badak, Orangutan, Harimau Sumatra, Meranti.'}
                {faunaZone === 'peralihan' && 'Zona Tengah (Peralihan Wallacea): Anoa, Babirusa, Komodo, Tarsius, Cendana.'}
                {faunaZone === 'australis' && 'Zona Timur (Australis): Cendrawasih, Kasuari, Kanguru Pohon, Walabi, Pohon Sagu.'}
              </div>
            </div>
          )}

          {/* BAB 6: TANGGUNG JAWAB */}
          {chapter.id === 6 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-purple-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Nilai Karakter: &quot;Di mana bumi dipijak, di situ langit dijunjung&quot;
              </h4>
              <p className="text-slate-300 text-[11px]">
                Mematuhi aturan sekolah (tidak berlari di lorong, piket kelas) dan masyarakat (gotong royong membersihkan sungai) adalah wujud interaksi sosial positif.
              </p>
            </div>
          )}

          {/* BAB 7: KEARIFAN LOKAL */}
          {chapter.id === 7 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-pink-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Kearifan Tradisi Nusantara
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'sasi', title: 'Tradisi Sasi (Maluku)', desc: 'Larangan panen berkala agar biota laut pulih.' },
                  { id: 'bebie', title: 'Tradisi Bebie (Sumsel)', desc: 'Gotong royong panen padi bersama.' },
                  { id: 'soya', title: 'Cuci Negeri Soya', desc: 'Gotong royong tahunan bersihkan desa.' },
                  { id: 'cireundeu', title: 'Rasi Cireundeu', desc: 'Konsumsi beras singkong jaga ketahanan pangan.' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setSelectedHeritage(item.id); retroSound.playBlip(); }}
                    className={`cursor-pointer p-2 rounded text-left border ${
                      selectedHeritage === item.id ? 'bg-pink-950 border-pink-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="font-bold text-[11px] text-pink-300">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BAB 8: TANTANGAN 4M */}
          {chapter.id === 8 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Tantangan 4M: Menolak, Mengurangi, Menggunakan Ulang, Mendaur Ulang
              </h4>
              <div className="space-y-2">
                {sorterItems.map(item => (
                  <div key={item.id} className="bg-slate-900 p-2.5 rounded flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-white">{item.name}</span>
                    <div className="flex gap-1 flex-wrap">
                      {['Menolak', 'Mengurangi', 'Menggunakan Ulang', 'Mendaur Ulang'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handlePlaceItem(item.id, cat)}
                          className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.placed === cat
                              ? item.placed === item.correctCategory ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PERCOBAAN SIFAT-SIFAT CAHAYA (LIGHT LAB)                            */}
      {/* ========================================================================= */}
      {labTab === 'light' && (
        <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-xl border border-yellow-500/50">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-bold text-yellow-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span>Laboratorium Virtual: Sifat-Sifat Cahaya</span>
            </h4>
            <div className="flex gap-1">
              {[
                { id: 'straight', label: '1. Merambat Lurus' },
                { id: 'transparent', label: '2. Tembus Benda Bening' },
                { id: 'mirror', label: '3. Pemantulan Cermin' },
                { id: 'refraction', label: '4. Pembiasan & Pelangi' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setLightMode(item.id as typeof lightMode); retroSound.playBlip(); }}
                  className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-bold transition ${
                    lightMode === item.id 
                      ? 'bg-yellow-500 text-slate-950' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode 1: Merambat Lurus */}
          {lightMode === 'straight' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">
                  Uji Coba: 3 Lembar Karton Berlubang di Depan Sinar Senter
                </span>
                <button
                  type="button"
                  onClick={() => { setCardAligned(!cardAligned); retroSound.playBlip(); }}
                  className={`cursor-pointer px-3 py-1 rounded font-pixel text-[10px] ${
                    cardAligned ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {cardAligned ? '✓ Lubang Sejajar' : '✕ Lubang Digeser'}
                </button>
              </div>

              {/* Visual Simulation Canvas */}
              <div className="h-32 bg-slate-950 rounded-lg border border-slate-800 relative flex items-center justify-between px-6 overflow-hidden">
                {/* Flashlight */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-7 bg-amber-500 rounded-l-lg border border-amber-300 flex items-center justify-center font-pixel text-[9px] text-slate-950 font-bold">
                    🔦
                  </div>
                  {/* Beam */}
                  <div className={`h-2 transition-all duration-300 ${
                    cardAligned 
                      ? 'w-64 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 shadow-[0_0_15px_rgba(253,224,71,0.8)]' 
                      : 'w-24 bg-gradient-to-r from-yellow-300 to-transparent'
                  }`} />
                </div>

                {/* 3 Cards */}
                <div className="flex items-center gap-6">
                  <div className="w-3 h-20 bg-amber-800 rounded border border-amber-600 relative flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                  </div>
                  <div className={`w-3 h-20 bg-amber-800 rounded border border-amber-600 relative flex items-center justify-center transition-transform ${
                    cardAligned ? 'translate-y-0' : '-translate-y-6'
                  }`}>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                  </div>
                  <div className="w-3 h-20 bg-amber-800 rounded border border-amber-600 relative flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                  </div>
                </div>

                {/* Eye Observer */}
                <div className="text-right">
                  <span className="text-2xl">{cardAligned ? '👁️' : '🙈'}</span>
                  <div className="text-[10px] font-pixel text-slate-400 mt-1">
                    {cardAligned ? 'Terlihat!' : 'Terhalang!'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded text-slate-300 text-[11px]">
                💡 <strong>Kesimpulan:</strong> Cahaya selalu <strong>merambat lurus</strong>. Ketika satu lubang karton digeser tidak sejajar, sinar cahaya terhalang dan mata tidak dapat melihat cahaya senter.
              </div>
            </div>
          )}

          {/* Mode 2: Tembus Benda Bening */}
          {lightMode === 'transparent' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Pilih Jenis Benda Penghalang:</span>
                <div className="flex gap-1.5">
                  {(['clear', 'translucent', 'opaque'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { setObjectTransparency(t); retroSound.playBlip(); }}
                      className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-bold ${
                        objectTransparency === t ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {t === 'clear' && 'Gelas Kaca (Bening)'}
                      {t === 'translucent' && 'Kertas Buram'}
                      {t === 'opaque' && 'Buku Tebal (Gelap/Opak)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-28 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-around px-6">
                <div className="text-xl">🔦 Senter</div>
                <div className={`w-8 h-20 rounded border-2 flex items-center justify-center font-bold text-[10px] ${
                  objectTransparency === 'clear' ? 'bg-cyan-400/20 border-cyan-400 text-cyan-200' :
                  objectTransparency === 'translucent' ? 'bg-slate-600/40 border-slate-500 text-slate-300' :
                  'bg-amber-900 border-amber-700 text-amber-200'
                }`}>
                  {objectTransparency === 'clear' ? 'KACA' : objectTransparency === 'translucent' ? 'BURAM' : 'BUKU'}
                </div>
                <div className={`p-3 rounded text-center border font-mono ${
                  objectTransparency === 'clear' ? 'bg-yellow-950 border-yellow-500 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
                  objectTransparency === 'translucent' ? 'bg-slate-900 border-slate-600 text-slate-400' :
                  'bg-black border-slate-800 text-slate-600'
                }`}>
                  {objectTransparency === 'clear' && '☀️ Cahaya Tembus Sempurna!'}
                  {objectTransparency === 'translucent' && '⛅ Cahaya Tembus Sebagian'}
                  {objectTransparency === 'opaque' && '🌑 Terbentuk Bayangan Gelap!'}
                </div>
              </div>
            </div>
          )}

          {/* Mode 3: Pemantulan Cermin */}
          {lightMode === 'mirror' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Pilih Bentuk Cermin:</span>
                <div className="flex gap-1.5">
                  {(['flat', 'concave', 'convex'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { setMirrorType(m); retroSound.playBlip(); }}
                      className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-bold ${
                        mirrorType === m ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {m === 'flat' && 'Cermin Datar'}
                      {m === 'concave' && 'Cermin Cekung'}
                      {m === 'convex' && 'Cermin Cembung'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                {mirrorType === 'flat' && '🪞 Cermin Datar: Sudut pantul tepat sama dengan sudut datang. Bayangan sama besar dan tegak.'}
                {mirrorType === 'concave' && '🥄 Cermin Cekung (Bagian dalam sendok): Bersifat mengumpulkan sinar cahaya ke satu titik fokus (konvergen).'}
                {mirrorType === 'convex' && '🔍 Cermin Cembung (Spion mobil/tikungan): Bersifat menyebarkan sinar cahaya (divergen) sehingga bidang pandang menjadi lebih luas.'}
              </div>
            </div>
          )}

          {/* Mode 4: Pembiasan & Penguraian Prisma Pelangi */}
          {lightMode === 'refraction' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="text-slate-300">
                Eksperimen Prisma Kaca: Penguraian Cahaya Putih Menjadi Spektrum Pelangi
              </div>

              <div className="h-28 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center gap-4 px-4 overflow-hidden">
                <div className="font-bold text-white text-xs">Sinar Putih ➔</div>
                <div className="w-12 h-16 bg-cyan-400/20 border-2 border-cyan-300 rotate-12 flex items-center justify-center font-pixel text-[9px] text-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.5)]">
                  PRISMA
                </div>
                {/* Rainbow Spectrum */}
                <div className="flex flex-col gap-0.5 w-32">
                  <div className="h-1.5 bg-red-500 rounded" title="Merah" />
                  <div className="h-1.5 bg-orange-500 rounded" title="Jingga" />
                  <div className="h-1.5 bg-yellow-400 rounded" title="Kuning" />
                  <div className="h-1.5 bg-green-500 rounded" title="Hijau" />
                  <div className="h-1.5 bg-blue-500 rounded" title="Biru" />
                  <div className="h-1.5 bg-indigo-600 rounded" title="Nila" />
                  <div className="h-1.5 bg-purple-600 rounded" title="Ungu" />
                </div>
                <div className="font-pixel text-[9px] text-amber-300">
                  Me-Ji-Ku-Hi-Bi-Ni-U!
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded text-[11px] text-slate-300">
                💡 <strong>Pembiasan & Dispersi:</strong> Cahaya matahari terlihat putih, namun tersusun dari 7 warna spektrum. Ketika melewati butiran air hujan atau prisma kaca, cahaya dibiaskan dan terurai menjadi pelangi yang indah!
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PERCOBAAN GETARAN & GELOMBANG BUNYI (SOUND LAB)                      */}
      {/* ========================================================================= */}
      {labTab === 'sound' && (
        <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-xl border border-cyan-500/50">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Laboratorium Virtual: Getaran & Sifat Bunyi</span>
            </h4>
            <div className="flex gap-1">
              {[
                { id: 'fork', label: '1. Garpu Tala' },
                { id: 'string', label: '2. Senar Gitar' },
                { id: 'medium', label: '3. Medium Perambatan' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setSoundMode(item.id as typeof soundMode); retroSound.playBlip(); }}
                  className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-bold transition ${
                    soundMode === item.id 
                      ? 'bg-cyan-500 text-slate-950' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode 1: Garpu Tala */}
          {soundMode === 'fork' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">
                  Klik Tombol Garpu Tala untuk Memukul & Mendengarkan Getarannya:
                </span>
                <span className="text-[10px] font-pixel text-cyan-400">Audio 8-Bit Aktif</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Garpu Tala Rendah', freq: 261.63, note: 'Do (C4)' },
                  { label: 'Garpu Tala Standar', freq: 440.00, note: 'La (A4)' },
                  { label: 'Garpu Tala Tinggi', freq: 880.00, note: 'La Tinggi (A5)' },
                ].map(fork => (
                  <button
                    key={fork.freq}
                    type="button"
                    onClick={() => handleStrikeFork(fork.freq)}
                    className="cursor-pointer retro-btn p-3 rounded-lg bg-slate-950 hover:bg-cyan-950/80 border border-cyan-800 text-center space-y-1 transition"
                  >
                    <div className={`text-2xl transition-transform ${forkVibrating ? 'animate-bounce' : ''}`}>
                      🍴
                    </div>
                    <div className="font-bold text-white text-xs">{fork.label}</div>
                    <div className="font-mono text-cyan-300 text-[10px]">{fork.note} · {fork.freq} Hz</div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-2.5 rounded text-[11px] text-slate-300">
                💡 <strong>Konsep Bunyi:</strong> Bunyi dihasilkan oleh <strong>benda yang bergetar</strong>. Garpu tala yang bergetar menggetarkan udara di sekitarnya hingga gelombang suara sampai ke gendang telinga kita!
              </div>
            </div>
          )}

          {/* Mode 2: Senar Dawai */}
          {soundMode === 'string' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="text-slate-300">
                Atur Ketegangan & Panjang Senar Gitar, Lalu Petik Senar:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                    <span>Ketegangan Senar (Kencang vs Kendor):</span>
                    <span className="font-mono text-amber-400 font-bold">{stringTension}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={stringTension}
                    onChange={(e) => setStringTension(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                    <span>Panjang Senar (Pendek vs Panjang):</span>
                    <span className="font-mono text-cyan-400 font-bold">{stringLength}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={stringLength}
                    onChange={(e) => setStringLength(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={handlePluckString}
                  className="cursor-pointer retro-btn bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded text-xs flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🎸 Petik Senar Gitar</span>
                </button>

                <div className="text-right text-[11px]">
                  <span className="text-slate-400">Karakter Nada: </span>
                  <strong className="text-amber-400 font-mono">
                    {stringTension > 70 && stringLength < 40 ? 'Tinggi & Melengking (Frekuensi Tinggi)' :
                     stringTension < 40 && stringLength > 70 ? 'Rendah & Berat (Frekuensi Rendah)' :
                     'Sedang / Harmonis'}
                  </strong>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded text-[11px] text-slate-300">
                💡 Makin kencang dan pendek senar, getaran makin cepat menghasilkan <strong>nada tinggi</strong>. Makin kendor dan panjang senar, nada menjadi <strong>rendah</strong>.
              </div>
            </div>
          )}

          {/* Mode 3: Medium Perambatan Bunyi */}
          {soundMode === 'medium' && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="text-slate-300">
                Pilih Medium untuk Melihat Kecepatan Perambatan Gelombang Bunyi:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'solid', label: '1. Zat Padat (Baja/Rel)', speed: '~5.000 m/s', desc: 'Paling cepat karena partikel sangat rapat!' },
                  { id: 'liquid', label: '2. Zat Cair (Air Laut)', speed: '~1.500 m/s', desc: 'Cepat, digunakan sonar lumba-lumba.' },
                  { id: 'gas', label: '3. Gas (Udara Terbuka)', speed: '~340 m/s', desc: 'Kecepatan suara normal kita berbicara.' },
                  { id: 'vacuum', label: '4. Ruang Hampa (Vakum)', speed: '0 m/s (Hening)', desc: 'TIDAK MERAMBAT! Tidak ada partikel perantara.' }
                ].map(med => (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => { setSoundMedium(med.id as typeof soundMedium); retroSound.playBlip(); }}
                    className={`cursor-pointer p-2.5 rounded-lg border text-left transition ${
                      soundMedium === med.id 
                        ? 'bg-cyan-950 border-cyan-400 text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-cyan-300 text-[11px]">{med.label}</div>
                    <div className="font-mono text-amber-300 text-[10px] mt-0.5">{med.speed}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{med.desc}</div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-2.5 rounded text-[11px] text-slate-300">
                💡 <strong>Fakta Sains:</strong> Bunyi membutuhkan medium (padat, cair, atau gas) untuk merambat. Di luar angkasa yang hampa udara, suara ledakan tidak dapat terdengar sama sekali!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
