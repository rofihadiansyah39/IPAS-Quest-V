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
  Lightbulb
} from 'lucide-react';

interface Props {
  chapter: Chapter;
}

export const InteractiveSimulations: React.FC<Props> = ({ chapter }) => {
  // Bab 1 States
  const [energySource, setEnergySource] = useState<'wind' | 'hydro' | 'solar' | 'coal'>('wind');
  const [sunlight, setSunlight] = useState<number>(80);
  const [waterLevel, setWaterLevel] = useState<number>(75);
  const [co2Level, setCo2Level] = useState<number>(70);

  // Bab 2 States
  const [surfaceType, setSurfaceType] = useState<'ice' | 'wood' | 'rough' | 'oiled'>('wood');
  const [useWheels, setUseWheels] = useState<boolean>(false);
  const [pushForce, setPushForce] = useState<number>(50);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [pushDistance, setPushDistance] = useState<number>(0);
  const [magnetPole1, setMagnetPole1] = useState<'U' | 'S'>('U');
  const [magnetPole2, setMagnetPole2] = useState<'U' | 'S'>('S');
  const [magnetDistance, setMagnetDistance] = useState<number>(40);

  // Bab 3 States
  const [selectedCoord, setSelectedCoord] = useState<{ lat: string; lon: string; name: string; info: string } | null>({
    lat: '2° 35\' LU',
    lon: '98° 49\' BT',
    name: 'Danau Toba & Pulau Samosir',
    info: 'Kaldera vulkanik terbesar di dunia dengan luas 1.145 km².'
  });
  const [tectonicMode, setTectonicMode] = useState<'konvergen' | 'divergen' | 'transform'>('konvergen');

  // Bab 4 States
  const [carbonEmission, setCarbonEmission] = useState<number>(65);
  const [forestCover, setForestCover] = useState<number>(50);

  // Bab 5 States
  const [faunaZone, setFaunaZone] = useState<'asiatis' | 'peralihan' | 'australis'>('peralihan');

  // Bab 7 States
  const [selectedHeritage, setSelectedHeritage] = useState<string>('sasi');

  // Bab 8 States: 4M Sorter
  const [sorterItems, setSorterItems] = useState([
    { id: 1, name: 'Sedotan Plastik di Kedai Es', correctCategory: 'Menolak', placed: '' },
    { id: 2, name: 'Lampu Kamar Saat Siang Hari', correctCategory: 'Mengurangi', placed: '' },
    { id: 3, name: 'Baju Seragam Masih Bagus', correctCategory: 'Menggunakan Ulang', placed: '' },
    { id: 4, name: 'Kardus Paket & Kertas Bekas', correctCategory: 'Mendaur Ulang', placed: '' },
  ]);

  // Handler for push animation
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

  // Handler for 4M Sorting
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

  // ---------------- Render specific simulation ----------------
  return (
    <div className="retro-card p-5 sm:p-7 rounded-xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-pixel text-amber-400 uppercase tracking-widest">
              Laboratorium Sains Virtual
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              {chapter.id === 1 && 'Transformasi Alur Energi & Reaktor Fotosintesis'}
              {chapter.id === 2 && 'Uji Gaya Gesek Benda & Interaksi Magnet 2 Kutub'}
              {chapter.id === 3 && 'Simulator Koordinat Astronomis & Lempeng Bumi'}
              {chapter.id === 4 && 'Neraca Efek Rumah Kaca & Atmosfer Global'}
              {chapter.id === 5 && 'Eksplorasi Fauna 3 Zona & Klasifikasi SDA'}
              {chapter.id === 6 && 'Simulasi Interaksi Sosial & Tanggung Jawab Sekolah'}
              {chapter.id === 7 && 'Paviliun Kearifan Lokal & 12 Warisan UNESCO'}
              {chapter.id === 8 && 'Audit Emisi Jejak Karbon & Tantangan 4M Lingkungan'}
            </h3>
          </div>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Interaktif & Realistis Sesuai Buku</span>
        </div>
      </div>

      {/* BAB 1: ENERGY & PHOTOSYNTHESIS */}
      {chapter.id === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Power Plant Energy Stream */}
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                1. Alur Pembangkit Listrik (PLTB / PLTA / PLTU / Surya)
              </h4>
              <span className="text-xs text-slate-400">Pilih Sumber:</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => { setEnergySource('wind'); retroSound.playBlip(); }}
                className={`px-2 py-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                  energySource === 'wind' ? 'bg-cyan-600 text-white ring-2 ring-cyan-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Wind className="w-4 h-4" />
                <span>PLTB Angin</span>
              </button>
              <button
                onClick={() => { setEnergySource('hydro'); retroSound.playBlip(); }}
                className={`px-2 py-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                  energySource === 'hydro' ? 'bg-blue-600 text-white ring-2 ring-blue-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Droplet className="w-4 h-4" />
                <span>PLTA Air</span>
              </button>
              <button
                onClick={() => { setEnergySource('solar'); retroSound.playBlip(); }}
                className={`px-2 py-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                  energySource === 'solar' ? 'bg-amber-600 text-white ring-2 ring-amber-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Panel Surya</span>
              </button>
              <button
                onClick={() => { setEnergySource('coal'); retroSound.playBlip(); }}
                className={`px-2 py-2 rounded text-xs font-semibold flex flex-col items-center gap-1 transition ${
                  energySource === 'coal' ? 'bg-orange-700 text-white ring-2 ring-orange-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>PLTU Uap</span>
              </button>
            </div>

            {/* Visual Stream Diagram */}
            <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700/60 text-xs space-y-3">
              <div className="font-semibold text-slate-200">
                {energySource === 'wind' && 'PLTB Sidrap (Kincir Angin Raksasa):'}
                {energySource === 'hydro' && 'PLTA Bendungan Air Waduk:'}
                {energySource === 'solar' && 'Panel Surya Fotovoltaik:'}
                {energySource === 'coal' && 'PLTU Pembakaran Batu Bara:'}
              </div>

              {/* Visual Flow Pipeline */}
              <div className="flex items-center justify-between gap-1 text-[11px] font-mono py-2 overflow-x-auto">
                <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center shrink-0 w-24">
                  <div className="text-amber-400 font-bold">1. Awal</div>
                  <div className="text-slate-300 truncate">
                    {energySource === 'wind' && 'Hembusan Angin'}
                    {energySource === 'hydro' && 'Aliran Air Deras'}
                    {energySource === 'solar' && 'Radiasi Matahari'}
                    {energySource === 'coal' && 'Energi Kimia Batu Bara'}
                  </div>
                </div>

                <div className="text-amber-400 font-bold">➔</div>

                <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center shrink-0 w-24">
                  <div className="text-cyan-400 font-bold">2. Turbin</div>
                  <div className="text-slate-300 truncate">
                    {energySource === 'wind' && 'Gerak Baling'}
                    {energySource === 'hydro' && 'Turbin Air'}
                    {energySource === 'solar' && 'Semikonduktor'}
                    {energySource === 'coal' && 'Uap Bertekanan'}
                  </div>
                </div>

                <div className="text-amber-400 font-bold">➔</div>

                <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center shrink-0 w-24">
                  <div className="text-emerald-400 font-bold">3. Generator</div>
                  <div className="text-slate-300 truncate">Listrik Statis/Din</div>
                </div>

                <div className="text-amber-400 font-bold">➔</div>

                <div className="bg-emerald-950/80 p-2 rounded border border-emerald-600 text-center shrink-0 w-24 text-emerald-300">
                  <div className="font-bold">4. Rumah</div>
                  <div className="truncate">Lampu & TV Hidup!</div>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded text-slate-300 text-xs">
                {energySource === 'wind' && '💡 PLTB Sidrap menggerakkan turbin murni dengan angin alami, tanpa menghasilkan asap atau residu polusi!'}
                {energySource === 'hydro' && '💡 Air bendungan mengalirkan energi potensial gravitasi menjadi kinetik (gerak) untuk memutar generator magnet!'}
                {energySource === 'solar' && '💡 Sel surya mengonversi foton cahaya matahari langsung menjadi elektron listrik arus DC secara hening!'}
                {energySource === 'coal' && '⚠️ PLTU menghasilkan listrik besar tapi melepaskan gas buang CO2 dan abu pembakaran ke atmosfer.'}
              </div>
            </div>
          </div>

          {/* Section 2: Photosynthesis Leaf Reactor */}
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <TreePine className="w-4 h-4 text-emerald-400" />
              2. Reaktor Fotosintesis Daun Hijau
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Intensitas Cahaya Matahari:</span>
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
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Asupan Air Tanah (Akar):</span>
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

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Konsentrasi Karbon Dioksida (CO₂ Udara):</span>
                  <span className="font-mono text-emerald-400 font-bold">{co2Level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={co2Level}
                  onChange={(e) => setCo2Level(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Photosynthesis Result */}
            {(() => {
              const photoRate = Math.round((sunlight * 0.4 + waterLevel * 0.3 + co2Level * 0.3));
              return (
                <div className="bg-slate-900 p-4 rounded-lg border border-emerald-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Laju Fotosintesis Kloroplas:</span>
                    <span className="font-pixel text-xs text-emerald-400">{photoRate}% Efektif</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-300"
                      style={{ width: `${photoRate}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-800">
                      <div className="text-slate-400">Produksi Oksigen (O₂):</div>
                      <div className="font-bold text-cyan-300 text-sm">+{photoRate * 1.2} L/jam</div>
                      <div className="text-[10px] text-slate-400">Dihirup Makhluk Hidup</div>
                    </div>
                    <div className="bg-emerald-950/60 p-2 rounded border border-emerald-800">
                      <div className="text-slate-400">Karbohidrat/Glukosa:</div>
                      <div className="font-bold text-amber-300 text-sm">+{photoRate * 0.9} gram</div>
                      <div className="text-[10px] text-slate-400">Disimpan Buah & Umbi</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* BAB 2: FORCES & MAGNETISM */}
      {chapter.id === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Friction Arena */}
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              1. Eksperimen Gaya Gesek & Luas Permukaan Roda
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1.5 font-medium">Kondisi Permukaan Bidang Lintasan:</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['ice', 'oiled', 'wood', 'rough'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setSurfaceType(type); retroSound.playBlip(); }}
                      className={`py-1.5 px-2 rounded text-center font-medium capitalize transition ${
                        surfaceType === type ? 'bg-blue-600 text-white ring-2 ring-blue-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {type === 'ice' && '🧊 Es Licin'}
                      {type === 'oiled' && '🛢️ Berpelumas'}
                      {type === 'wood' && '🪵 Lantai Kayu'}
                      {type === 'rough' && '🪨 Kasar/Batu'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-300">Gunakan Roda (Perkecil Luas Sentuh):</span>
                <button
                  onClick={() => { setUseWheels(!useWheels); retroSound.playBlip(); }}
                  className={`px-3 py-1 rounded font-bold text-xs transition ${
                    useWheels ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {useWheels ? '✓ Beroda (Kursi Roda)' : '✕ Tanpa Roda (Peti Kotak)'}
                </button>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Kekuatan Gaya Otot (Dorongan Ian & Banu):</span>
                  <span className="font-mono text-amber-400 font-bold">{pushForce} Newton</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={pushForce}
                  onChange={(e) => setPushForce(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Push Action Track */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-3">
                <div className="h-14 bg-slate-950 rounded relative overflow-hidden border border-slate-800 flex items-center px-3">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {surfaceType === 'rough' ? '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░' : '─────────────────────────────'}
                  </div>
                  {/* Moving Box Avatar */}
                  <div 
                    className="transition-all duration-500 flex items-center gap-1.5"
                    style={{ transform: `translateX(${pushDistance}px)` }}
                  >
                    <div className={`p-2 rounded font-pixel text-[10px] text-white flex items-center justify-center shadow-lg ${
                      useWheels ? 'bg-emerald-600 ring-2 ring-emerald-300' : 'bg-amber-700 border border-amber-900'
                    }`}>
                      {useWheels ? '♿ RODA' : '📦 PETI'}
                    </div>
                    {isPushing && (
                      <span className="text-[10px] font-pixel text-amber-300 animate-bounce">
                        ➡ Dorong!
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleTestFriction}
                    disabled={isPushing}
                    className="retro-btn bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-4 rounded text-xs"
                  >
                    🚀 Berikan Gaya Dorong
                  </button>
                  <span className="text-xs font-mono text-slate-300">
                    Jarak Tempuh: <strong className="text-amber-400">{pushDistance} cm</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Magnet Poles Lab */}
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
              <Magnet className="w-4 h-4 text-purple-400" />
              2. Menyelidiki Kutub Magnet & Arah Gaya
            </h4>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-around gap-4 py-3">
                {/* Magnet 1 */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-400">Magnet 1 (Tangan Kiri)</span>
                  <div className="flex rounded overflow-hidden border-2 border-slate-700 shadow-md">
                    <button
                      onClick={() => { setMagnetPole1(magnetPole1 === 'U' ? 'S' : 'U'); retroSound.playBlip(); }}
                      className={`px-3 py-2 font-pixel text-xs text-white ${magnetPole1 === 'U' ? 'bg-red-600' : 'bg-blue-600'}`}
                    >
                      {magnetPole1 === 'U' ? 'U (Utara)' : 'S (Selatan)'}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500">Klik untuk balik kutub</span>
                </div>

                {/* Distance Slider */}
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 mb-1">Jarak: {magnetDistance} mm</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={magnetDistance}
                    onChange={(e) => setMagnetDistance(Number(e.target.value))}
                    className="w-24 accent-purple-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 mt-1">Makin dekat makin kuat</span>
                </div>

                {/* Magnet 2 */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-400">Magnet 2 (Tangan Kanan)</span>
                  <div className="flex rounded overflow-hidden border-2 border-slate-700 shadow-md">
                    <button
                      onClick={() => { setMagnetPole2(magnetPole2 === 'U' ? 'S' : 'U'); retroSound.playBlip(); }}
                      className={`px-3 py-2 font-pixel text-xs text-white ${magnetPole2 === 'U' ? 'bg-red-600' : 'bg-blue-600'}`}
                    >
                      {magnetPole2 === 'U' ? 'U (Utara)' : 'S (Selatan)'}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500">Klik untuk balik kutub</span>
                </div>
              </div>

              {/* Force Outcome Alert */}
              {(() => {
                const isRepel = magnetPole1 === magnetPole2;
                const forceStrength = Math.round((110 - magnetDistance) * 1.5);
                return (
                  <div className={`p-3.5 rounded-lg border text-center space-y-1 ${
                    isRepel ? 'bg-red-950/40 border-red-500 text-red-200' : 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  }`}>
                    <div className="font-pixel text-xs tracking-wider">
                      {isRepel ? '◀◀ TOLAK - MENOLAK ▶▶' : '▶▶ TARIK - MENARIK ◀◀'}
                    </div>
                    <div className="text-xs">
                      {isRepel 
                        ? `Kutub Sejenis (${magnetPole1} bertemu ${magnetPole2}) saling mendorong menjauh! Kekuatan tolak: ${forceStrength} mN.`
                        : `Kutub Berbeda (${magnetPole1} bertemu ${magnetPole2}) saling menyatu dengan erat! Kekuatan tarik: ${forceStrength} mN.`
                      }
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      💡 Konsep ini digunakan pada Kereta Maglev agar melayang di atas rel!
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* BAB 3: MAPS & EARTH CRUST */}
      {chapter.id === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              1. Penjelajah Garis Lintang (Mendatar) & Bujur (Tegak)
            </h4>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-3">
              <p className="text-slate-300">
                Pilih titik astronomis Indonesia untuk melihat kenampakan geografisnya:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    name: 'Danau Toba & Samosir',
                    lat: '2° 35\' LU',
                    lon: '98° 49\' BT',
                    info: 'Kaldera supervulkanik purba terbesar di dunia dengan kedalaman 508 meter.'
                  },
                  {
                    name: 'Khatulistiwa Pontianak',
                    lat: '0° 00\' Lintang',
                    lon: '109° 20\' BT',
                    info: 'Tepat di garis ekuator pembagi belahan bumi utara dan selatan tanpa bayangan saat titik kulminasi.'
                  },
                  {
                    name: 'Teluk Bima NTB',
                    lat: '8° 27\' LS',
                    lon: '118° 43\' BT',
                    info: 'Dataran rendah pesisir penghasil garam rakyat terbesar Nusa Tenggara Barat.'
                  },
                  {
                    name: 'Pegunungan Jayawijaya Papua',
                    lat: '4° 04\' LS',
                    lon: '137° 09\' BT',
                    info: 'Puncak tertinggi Indonesia dengan bentang alam karst dan gletser tropis.'
                  }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedCoord(item); retroSound.playBlip(); }}
                    className={`p-2.5 rounded text-left transition border ${
                      selectedCoord?.name === item.name 
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className="font-mono text-[10px] text-amber-400 mt-0.5">{item.lat} · {item.lon}</div>
                  </button>
                ))}
              </div>

              {selectedCoord && (
                <div className="bg-slate-950 p-3 rounded border border-cyan-800/60 mt-3 text-xs space-y-1">
                  <div className="font-bold text-cyan-300 flex items-center justify-between">
                    <span>{selectedCoord.name}</span>
                    <span className="font-mono text-[11px] bg-cyan-900/40 px-2 py-0.5 rounded text-amber-300">
                      {selectedCoord.lat}, {selectedCoord.lon}
                    </span>
                  </div>
                  <p className="text-slate-300">{selectedCoord.info}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              2. Dinamika Lempeng Tektonik Pembentuk Bentang Alam
            </h4>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-1.5">
                {(['konvergen', 'divergen', 'transform'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => { setTectonicMode(mode); retroSound.playBlip(); }}
                    className={`p-2 rounded text-center capitalize font-bold transition ${
                      tectonicMode === mode ? 'bg-amber-600 text-white ring-2 ring-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-slate-700 space-y-2">
                <div className="font-bold text-amber-300">
                  {tectonicMode === 'konvergen' && 'Tumbukan Konvergen (Menghunjam / Subduksi):'}
                  {tectonicMode === 'divergen' && 'Pemisahan Divergen (Saling Menjauh):'}
                  {tectonicMode === 'transform' && 'Pergeseran Transform (Sesar Mendatar):'}
                </div>
                <p className="text-slate-300">
                  {tectonicMode === 'konvergen' && 'Dua lempeng saling berdekatan. Lempeng samudera menunjam ke bawah lempeng benua, memicu deretan gunung api di Sumatra & Jawa serta palung laut dalam.'}
                  {tectonicMode === 'divergen' && 'Dua lempeng bergerak saling menjauh akibat arus konveksi mantel bumi, membentuk punggung tengah samudera dan rekahan kerak litosfer.'}
                  {tectonicMode === 'transform' && 'Dua lempeng bergesekan menyamping di sepanjang patahan (seperti Sesar Semangko di Sumatra), menimbulkan gesekan kuat dan guncangan gempa bumi tektonik.'}
                </p>
                <div className="text-[11px] text-cyan-400 pt-1">
                  🌏 Kerak bumi (litosfer) tebalnya 0-100 km bergerak beberapa centimeter per tahun di atas mantel bumi.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BAB 4: CLIMATE & GREENHOUSE */}
      {chapter.id === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-orange-400" />
              1. Neraca Gas Rumah Kaca & Suhu Rata-Rata Bumi
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Emisi Karbon Manusia (Pabrik & Kendaraan):</span>
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

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Luas Hutan Tropis Penyerap Karbon:</span>
                  <span className="font-mono text-emerald-400 font-bold">{forestCover}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={forestCover}
                  onChange={(e) => setForestCover(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Dynamic Global Warming Metrics */}
              {(() => {
                const netHeating = (carbonEmission * 0.035) - (forestCover * 0.015);
                const earthTemp = (14.5 + netHeating).toFixed(1);
                const isOverheated = netHeating > 1.2;

                return (
                  <div className={`p-4 rounded-lg border space-y-2 text-center ${
                    isOverheated ? 'bg-red-950/40 border-red-500' : 'bg-emerald-950/40 border-emerald-500'
                  }`}>
                    <div className="text-slate-400 text-xs">Prediksi Suhu Permukaan Global:</div>
                    <div className="font-pixel text-xl text-amber-400">{earthTemp}°C</div>
                    <div className="text-xs text-slate-300">
                      {isOverheated 
                        ? '⚠️ Bahaya: Es kutub mencair cepat, permukaan air laut naik, dan cuaca menjadi ekstrem!'
                        : '✓ Seimbang: Hutan tropis mampu menyerap emisi karbon dengan optimal!'}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-cyan-400" />
              2. Neraca Krisis Air Bersih Dunia (Hanya 3,5% Air Tawar)
            </h4>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Air Asin Lautan:</span>
                    <span className="font-bold text-blue-400">96,5%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[96.5%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="text-cyan-300 font-bold">Air Tawar Layak Pakai:</span>
                    <span className="font-bold text-cyan-300">HANYA 3,5%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[3.5%]" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-cyan-900 text-slate-300 space-y-1.5 mt-2">
                <div className="font-bold text-cyan-300">Mengapa Kita Harus Menghemat Air?</div>
                <p>
                  Meskipun 70% bumi tertutup air, hanya sedikit sekali yang berupa air tawar di sungai, danau, dan air tanah.
                  Pencemaran limbah detergen dan sampah plastik merusak sumber yang sedikit ini!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BAB 5: BIODIVERSITY & SDA */}
      {chapter.id === 5 && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-emerald-400" />
                Peta 3 Zona Fauna Khas Nusantara (Garis Wallace & Weber)
              </h4>
              <div className="flex gap-1.5">
                {(['asiatis', 'peralihan', 'australis'] as const).map(zone => (
                  <button
                    key={zone}
                    onClick={() => { setFaunaZone(zone); retroSound.playBlip(); }}
                    className={`px-3 py-1.5 rounded text-xs font-bold capitalize transition ${
                      faunaZone === zone ? 'bg-emerald-600 text-white ring-2 ring-emerald-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Zona {zone}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-4 rounded-lg border ${faunaZone === 'asiatis' ? 'bg-emerald-950/80 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
                <div className="font-bold text-emerald-300 text-sm mb-1">1. Wilayah Barat (Asiatis)</div>
                <div className="text-slate-400 mb-2">Sumatra, Jawa, Bali, Kalimantan</div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li><strong>Fauna:</strong> Gajah, Harimau Sumatra, Badak Bercula, Orangutan, Bekantan, Elang Jawa</li>
                  <li><strong>Flora:</strong> Meranti, Keruing, Rotan, Pohon Jati</li>
                  <li><strong>Ciri:</strong> Mamalia berukuran besar & hutan hujan tropis lebat</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${faunaZone === 'peralihan' ? 'bg-emerald-950/80 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
                <div className="font-bold text-amber-300 text-sm mb-1">2. Wilayah Tengah (Peralihan)</div>
                <div className="text-slate-400 mb-2">Sulawesi, Nusa Tenggara, Maluku</div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li><strong>Fauna:</strong> Komodo, Anoa, Babirusa, Tarsius, Burung Maleo</li>
                  <li><strong>Flora:</strong> Kayu Cendana, Anggrek Serat</li>
                  <li><strong>Ciri:</strong> Satwa endemik purba yang tidak ada di belahan bumi lain</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${faunaZone === 'australis' ? 'bg-emerald-950/80 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
                <div className="font-bold text-cyan-300 text-sm mb-1">3. Wilayah Timur (Australis)</div>
                <div className="text-slate-400 mb-2">Papua dan pulau-pulau sekitarnya</div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li><strong>Fauna:</strong> Cendrawasih, Kasuari, Kanguru Pohon, Walabi, Kuskus</li>
                  <li><strong>Flora:</strong> Pohon Sagu, Buah Matoa</li>
                  <li><strong>Ciri:</strong> Hewan berkantung & burung berbulu warna-warni indah</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BAB 7: UNESCO & LOCAL WISDOM */}
      {chapter.id === 7 && (
        <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-pink-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Galeri Kearifan Lokal & 12 Warisan Budaya Tak Benda UNESCO
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { id: 'sasi', title: 'Tradisi Sasi', loc: 'Maluku & Papua', desc: 'Larangan adat memanen biota laut tertentu agar populasi pulih.' },
              { id: 'bebie', title: 'Tradisi Bebie', loc: 'Muara Enim, Sumsel', desc: 'Gotong royong menanam dan panen padi bersama penuh rasa syukur.' },
              { id: 'soya', title: 'Cuci Negeri Soya', loc: 'Ambon', desc: 'Ritual tahunan membersihkan desa untuk persaudaraan.' },
              { id: 'cireundeu', title: 'Rasi Cireundeu', loc: 'Cimahi, Jabar', desc: 'Ketahanan pangan turun-temurun mengonsumsi beras singkong.' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setSelectedHeritage(item.id); retroSound.playBlip(); }}
                className={`p-3 rounded-lg border text-left transition ${
                  selectedHeritage === item.id ? 'bg-pink-950/80 border-pink-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-pink-300">{item.title}</div>
                <div className="text-[10px] text-slate-400">{item.loc}</div>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{item.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 p-3.5 rounded border border-pink-800/50 text-xs text-slate-300">
            <strong className="text-pink-300">12 Warisan Budaya Tak Benda UNESCO Indonesia:</strong> Wayang Kulit, Keris, Batik, Pendidikan Batik, Angklung, Tari Saman, Noken Papua, Tari Tradisional Bali, Perahu Pinisi, Pencak Silat, Pantun, dan Gamelan!
          </div>
        </div>
      )}

      {/* BAB 8: 4M SORTER CHALLENGE */}
      {chapter.id === 8 && (
        <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Tantangan Memilah 4M: Menolak, Mengurangi, Menggunakan Ulang, Mendaur Ulang
            </h4>
            <button
              onClick={() => {
                setSorterItems(prev => prev.map(i => ({ ...i, placed: '' })));
                retroSound.playBlip();
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="space-y-3">
            {sorterItems.map(item => (
              <div 
                key={item.id}
                className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  {item.placed === item.correctCategory ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : item.placed ? (
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span className="font-semibold text-slate-200">{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {['Menolak', 'Mengurangi', 'Menggunakan Ulang', 'Mendaur Ulang'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => handlePlaceItem(item.id, cat)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        item.placed === cat
                          ? item.placed === item.correctCategory
                            ? 'bg-emerald-600 text-white font-bold ring-1 ring-emerald-300'
                            : 'bg-red-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-3 rounded text-xs text-slate-300 border border-slate-800">
            💡 <strong>Rumus 4M Pahlawan Lingkungan:</strong>
            <span className="block mt-1 text-slate-400">
              1. <strong>Menolak</strong>: Tolak plastik sekali pakai/sedotan. 
              2. <strong>Mengurangi</strong>: Hemat listrik & air. 
              3. <strong>Menggunakan Ulang</strong>: Pakai wadah & baju berkali-kali. 
              4. <strong>Mendaur Ulang</strong>: Olah kembali kertas & botol.
            </span>
          </div>
        </div>
      )}

      {/* BAB 6: CITIZEN ROLES */}
      {chapter.id === 6 && (
        <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            Matriks Tanggung Jawab di Sekolah & Masyarakat
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900 p-4 rounded border border-purple-900 space-y-2">
              <div className="font-bold text-purple-300 text-sm">🏫 Di Lingkungan Sekolah</div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Datang ke sekolah tepat waktu sebelum bel berbunyi</li>
                <li>Melaksanakan tugas piket kebersihan kelas tanpa disuruh</li>
                <li>Mendengarkan bapak/ibu guru saat menjelaskan materi</li>
                <li>Berjalan tertib di lorong kelas (tidak berlari-lari membahayakan teman)</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-4 rounded border border-purple-900 space-y-2">
              <div className="font-bold text-emerald-300 text-sm">🏡 Di Lingkungan Masyarakat</div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Mengikuti kerja bakti membersihkan saluran air dan selokan</li>
                <li>Membuang sampah pada tempatnya (tidak membuang ke sungai)</li>
                <li>Mengantre dengan tertib saat berbelanja di kasir toko</li>
                <li>Menjaga ketenangan dan saling menyapa tetangga dengan sopan</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic">
            Peribahasa: &quot;Di mana bumi dipijak, di situ langit dijunjung&quot; — menghormati aturan setempat menciptakan kedamaian.
          </p>
        </div>
      )}
    </div>
  );
};
