import React, { useState } from 'react';
import { StudentProfile } from '../types/ipas';
import { CHAPTERS_DATA, INITIAL_BADGES } from '../data/ipasData';
import { retroSound } from '../utils/audio';
import { 
  HeartHandshake, 
  Search, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Home, 
  Calendar,
  Printer
} from 'lucide-react';

interface Props {
  students: StudentProfile[];
}

export const ParentPortalView: React.FC<Props> = ({ students }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std_01');
  const [accessCodeInput, setAccessCodeInput] = useState<string>('');
  const [showPrintReport, setShowPrintReport] = useState<boolean>(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleVerifyCode = () => {
    retroSound.playBlip();
    const found = students.find(
      s => s.parentCode.toLowerCase() === accessCodeInput.trim().toLowerCase()
    );
    if (found) {
      setSelectedStudentId(found.id);
      retroSound.playCoin();
    } else {
      retroSound.playError();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border-3 border-indigo-500/60 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-pixel text-indigo-400">
          <HeartHandshake className="w-4 h-4" />
          <span>PORTAL PENDAMPINGAN ORANG TUA SISWA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white">
          Laporan Kemajuan Belajar IPAS Kelas 5 SD
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Pantau perkembangan pemahaman sains putra-putri Anda secara transparan, capaian lencana petualangan, serta rekomendasi aktivitas edukatif di rumah.
        </p>
      </div>

      {/* Select Student or Access Code */}
      <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">
            Pilih Profil Ananda:
          </label>
          <div className="flex flex-wrap gap-2">
            {students.map(std => (
              <button
                key={std.id}
                onClick={() => { setSelectedStudentId(std.id); retroSound.playBlip(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedStudentId === std.id 
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <span>{std.name}</span>
                {std.needsRemedial && (
                  <span className="w-2 h-2 rounded-full bg-red-400" title="Butuh bimbingan" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="md:border-l md:border-slate-800 md:pl-5">
          <label className="text-xs font-bold text-slate-300 block mb-1.5">
            Atau Masukkan Kode Akses Orang Tua:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Contoh: ORTU-BANU-01"
              value={accessCodeInput}
              onChange={(e) => setAccessCodeInput(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono"
            />
            <button
              onClick={handleVerifyCode}
              className="retro-btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Student Performance Profile Card */}
      {currentStudent && (
        <div className="space-y-6">
          {/* Top Summary Banner */}
          <div className="retro-card p-5 sm:p-6 rounded-xl bg-slate-900 border-2 border-indigo-500/40 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-indigo-900/60 border-2 border-indigo-400 flex items-center justify-center font-pixel text-xl text-amber-300">
                {currentStudent.name[0]}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{currentStudent.name}</h3>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">
                  NISN: {currentStudent.nisn} · Kelas 5A
                </div>
                <div className="text-xs text-indigo-300 mt-1">
                  Wali Murid: <strong>{currentStudent.parentName}</strong>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] font-pixel text-slate-400">RATA-RATA NILAI</div>
              <div className={`font-pixel text-xl mt-1 ${
                currentStudent.averageScore >= 70 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {currentStudent.averageScore}%
              </div>
              <div className="text-[10px] text-slate-500">
                {currentStudent.averageScore >= 85 ? 'Predikat: Sangat Baik (A)' : currentStudent.averageScore >= 70 ? 'Predikat: Tuntas (B)' : 'Predikat: Perlu Remedial (C)'}
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] font-pixel text-slate-400">KETUNTASAN MATERI</div>
              <div className="font-pixel text-xl text-amber-400 mt-1">
                {currentStudent.completedChaptersCount} / 8
              </div>
              <div className="text-[10px] text-slate-500">
                Bab Pembelajaran Tuntas
              </div>
            </div>
          </div>

          {/* Teacher Official Notes & Guidance Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <FileText className="w-4 h-4" />
                <span>Catatan Perkembangan dari Guru Kelas</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{currentStudent.teacherNote || 'Ananda menunjukkan antusiasme yang sangat baik dalam memahami konsep IPAS.'}&rdquo;
              </div>

              {currentStudent.needsRemedial ? (
                <div className="bg-red-950/40 border border-red-500/80 p-3 rounded-lg text-xs text-red-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Perhatian Khusus Orang Tua:</span>
                  </div>
                  <p>
                    Ananda membutuhkan penguatan pada materi: <strong>{currentStudent.weakTopics.join(', ')}</strong>. Mohon mendampingi ananda mengulang kuis mandiri di rumah.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-950/40 border border-emerald-500/80 p-3 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ananda telah mencapai ketuntasan KKM dengan prestasi membanggakan!</span>
                </div>
              )}
            </div>

            {/* Recommended Home Activities */}
            <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <Home className="w-4 h-4" />
                <span>Rekomendasi Aktivitas Bersama di Rumah</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
                  🌱 <strong>Eksperimen Dapur:</strong> Ajak ananda mengamati daun segar di dalam gelas bening berjemur matahari untuk membuktikan pelepasan gelembung oksigen fotosintesis.
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
                  🧲 <strong>Uji Benda Magnet:</strong> Berikan magnet kulkas untuk menguji sendok logam, paku, dan botol plastik di ruang keluarga.
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
                  🛡️ <strong>Aksi Nyata 4M:</strong> Melatih kebiasaan membawa tumbler air minum dan memilah kardus bekas bersama keluarga.
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Score Breakdown */}
          <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Rincian Nilai Evaluasi Tiap Bab Pembelajaran</span>
              </h4>
              <button
                onClick={() => { retroSound.playBlip(); setShowPrintReport(true); }}
                className="retro-btn bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Rapor Digital</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {CHAPTERS_DATA.map(ch => {
                const sc = currentStudent.chapterScores[ch.id] || 0;
                const isPassed = sc >= 70;

                return (
                  <div 
                    key={ch.id}
                    className={`p-3 rounded-lg border ${
                      sc === 0 
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500' 
                        : isPassed 
                        ? 'bg-emerald-950/30 border-emerald-700/60 text-slate-200' 
                        : 'bg-red-950/30 border-red-700/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold">Bab {ch.id}</span>
                      <span className={`font-pixel text-[10px] font-bold ${
                        sc === 0 ? 'text-slate-600' : isPassed ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {sc > 0 ? `${sc}%` : 'Belum'}
                      </span>
                    </div>
                    <div className="text-xs font-medium truncate mt-1 text-slate-300">
                      {ch.shortTitle}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {sc === 0 ? 'Belum Dikerjakan' : isPassed ? '✓ Memenuhi KKM' : '⚠️ Perlu Remedial'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE REPORT MODAL */}
      {showPrintReport && currentStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border-4 border-slate-900">
            {/* Report Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
              <div className="text-xs uppercase font-bold text-slate-600 tracking-widest">
                KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
              </div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                RAPOR CAPAIAN PEMBELAJARAN IPAS KELAS 5 SD
              </h2>
              <div className="text-xs text-slate-600">
                SD Negeri Pelita Bangsa · Kurikulum Merdeka Edisi Revisi
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-2 text-xs border-b border-slate-300 pb-3">
              <div><strong>Nama Siswa:</strong> {currentStudent.name}</div>
              <div><strong>NISN:</strong> {currentStudent.nisn}</div>
              <div><strong>Nama Orang Tua:</strong> {currentStudent.parentName}</div>
              <div><strong>Rata-Rata Kelas:</strong> {currentStudent.averageScore}%</div>
            </div>

            {/* Scores Table */}
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="p-2">Bab Pembelajaran</th>
                  <th className="p-2">Nilai Kuis</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {CHAPTERS_DATA.map(ch => {
                  const sc = currentStudent.chapterScores[ch.id] || 0;
                  return (
                    <tr key={ch.id}>
                      <td className="p-2 font-medium">{ch.title}</td>
                      <td className="p-2 font-mono font-bold">{sc > 0 ? `${sc}%` : '-'}</td>
                      <td className="p-2">
                        {sc >= 70 ? 'Tuntas' : sc > 0 ? 'Remedial' : 'Belum Uji'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Teacher Note in Report */}
            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">
              <strong>Catatan Dewan Guru:</strong> &ldquo;{currentStudent.teacherNote}&rdquo;
            </div>

            <div className="flex justify-end gap-3 pt-2 no-print">
              <button
                onClick={() => setShowPrintReport(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded text-xs"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-indigo-700 text-white font-bold rounded text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
