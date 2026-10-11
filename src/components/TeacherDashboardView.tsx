import React, { useState } from 'react';
import { StudentProfile } from '../types/ipas';
import { CHAPTERS_DATA } from '../data/ipasData';
import { retroSound } from '../utils/audio';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Send, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  BellRing,
  Phone,
  Edit3,
  RefreshCw,
  Award
} from 'lucide-react';

interface Props {
  students: StudentProfile[];
  onUpdateStudents: (updated: StudentProfile[]) => void;
}

export const TeacherDashboardView: React.FC<Props> = ({
  students,
  onUpdateStudents,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'remedial' | 'online' | 'high'>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [remedialSentNotice, setRemedialSentNotice] = useState<string | null>(null);
  const [newTeacherNote, setNewTeacherNote] = useState<string>('');

  // Statistics
  const totalStudents = students.length;
  const remedialStudents = students.filter(s => s.averageScore < 70 || s.needsRemedial);
  const averageClassScore = Math.round(
    students.reduce((acc, s) => acc + s.averageScore, 0) / (totalStudents || 1)
  );
  const completedClassChaptersTotal = students.reduce((acc, s) => acc + s.completedChaptersCount, 0);

  // Filtered Students
  const filteredList = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.nisn.includes(searchQuery);
    if (!matchesSearch) return false;
    if (filterMode === 'remedial') return s.needsRemedial || s.averageScore < 70;
    if (filterMode === 'online') return s.status === 'online';
    if (filterMode === 'high') return s.averageScore >= 90;
    return true;
  });

  const handleSendRemedial = (student: StudentProfile) => {
    retroSound.playCoin();
    setRemedialSentNotice(`Materi remedial dan latihan mandiri berhasil dikirimkan ke akun ${student.name} serta notifikasi dikirim ke ${student.parentName}!`);
    setTimeout(() => {
      setRemedialSentNotice(null);
    }, 4500);
  };

  const handleSaveTeacherNote = () => {
    if (!selectedStudent) return;
    retroSound.playBlip();
    const updated = students.map(s => {
      if (s.id === selectedStudent.id) {
        return { ...s, teacherNote: newTeacherNote };
      }
      return s;
    });
    onUpdateStudents(updated);
    setSelectedStudent({ ...selectedStudent, teacherNote: newTeacherNote });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-pixel text-amber-400">
            <Users className="w-4 h-4" />
            <span>PORTAL GURU IPAS · KELAS 5A</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Dashboard Pemantauan Progres Belajar Real-Time
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            SD Negeri Pelita Bangsa · Tahun Ajaran 2026/2027 · Kurikulum Merdeka
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/60 px-3 py-1.5 rounded-lg text-emerald-300 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Sync: Aktif
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="retro-card p-4 rounded-xl bg-slate-900 border-slate-800">
          <div className="text-[10px] font-pixel text-slate-400">TOTAL SISWA KELAS</div>
          <div className="font-pixel text-2xl text-white mt-1">{totalStudents}</div>
          <div className="text-xs text-slate-400 mt-1">Siswa Terdaftar di Kelas 5A</div>
        </div>

        <div className="retro-card p-4 rounded-xl bg-slate-900 border-slate-800">
          <div className="text-[10px] font-pixel text-slate-400">RATA-RATA NILAI KELAS</div>
          <div className="font-pixel text-2xl text-emerald-400 mt-1">{averageClassScore}%</div>
          <div className="text-xs text-slate-400 mt-1">Target KKM Minimal: 70%</div>
        </div>

        <div className="retro-card p-4 rounded-xl bg-slate-900 border-red-500/60 bg-red-950/20">
          <div className="text-[10px] font-pixel text-red-400 flex items-center justify-between">
            <span>PERLU REMEDIAL</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="font-pixel text-2xl text-red-400 mt-1">{remedialStudents.length} Siswa</div>
          <div className="text-xs text-red-300/80 mt-1">Nilai di bawah batas KKM 70%</div>
        </div>

        <div className="retro-card p-4 rounded-xl bg-slate-900 border-slate-800">
          <div className="text-[10px] font-pixel text-slate-400">TOTAL BAB TUNTAS</div>
          <div className="font-pixel text-2xl text-amber-400 mt-1">{completedClassChaptersTotal} Bab</div>
          <div className="text-xs text-slate-400 mt-1">Dari 8 Bab Pembelajaran</div>
        </div>
      </div>

      {/* NOTIFIKASI OTOMATIS: PERINGATAN SISWA BELUM CAPAI TARGET */}
      {remedialStudents.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-red-950/40 border-2 border-red-500/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 text-red-400 font-pixel text-xs sm:text-sm">
              <BellRing className="w-5 h-5 animate-bounce" />
              <span>NOTIFIKASI OTOMATIS: {remedialStudents.length} SISWA BELUM MENCAPAI KKM</span>
            </div>
            <span className="text-[11px] bg-red-900/60 text-red-200 px-2.5 py-0.5 rounded border border-red-700">
              Perlu Intervensi Pembelajaran
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {remedialStudents.map(student => (
              <div 
                key={student.id}
                className="bg-slate-900/90 p-3.5 rounded-lg border border-red-800/80 flex flex-col justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{student.name}</span>
                    <span className="font-pixel text-red-400 font-bold">{student.averageScore}%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    NISN: {student.nisn} · Ortu: {student.parentName} ({student.parentPhone})
                  </div>
                  <div className="mt-2 text-red-200 bg-red-950/60 p-2 rounded border border-red-900 text-[11px]">
                    <strong>Topik Perlu Penguatan:</strong> {student.weakTopics.join(', ') || 'Pemahaman Kuis Awal'}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleSendRemedial(student)}
                    className="retro-btn bg-red-600 hover:bg-red-500 text-white font-bold py-1.5 px-3 rounded text-[11px] flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Kirim Paket Remedial Otomatis
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setNewTeacherNote(student.teacherNote || '');
                    }}
                    className="retro-btn bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-1.5 px-3 rounded text-[11px]"
                  >
                    Beri Catatan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {remedialSentNotice && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs rounded-lg flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{remedialSentNotice}</span>
            </div>
          )}
        </div>
      )}

      {/* Chapter Mastery Overview (Bab 1 - 8) */}
      <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Analisis Tingkat Penguasaan Materi Kelas 5A per Bab</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {CHAPTERS_DATA.map(ch => {
            // Calculate average for this chapter
            const scores = students
              .map(s => s.chapterScores[ch.id] || 0)
              .filter(sc => sc > 0);
            const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

            return (
              <div key={ch.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Bab {ch.id}</span>
                  <span className={`font-pixel text-[10px] ${avg >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {avg > 0 ? `${avg}%` : 'Belum Uji'}
                  </span>
                </div>
                <div className="font-bold text-white truncate text-xs">{ch.shortTitle}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${avg >= 70 ? 'bg-emerald-400' : 'bg-red-500'}`}
                    style={{ width: `${avg}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Roster Table & Filter */}
      <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Daftar Lengkap Siswa & Riwayat Capaian</h3>
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama / NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${
              filterMode === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Semua ({students.length})
          </button>
          <button
            onClick={() => setFilterMode('remedial')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${
              filterMode === 'remedial' ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Perlu Remedial ({remedialStudents.length})
          </button>
          <button
            onClick={() => setFilterMode('online')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${
              filterMode === 'online' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Online Sekarang ({students.filter(s => s.status === 'online').length})
          </button>
          <button
            onClick={() => setFilterMode('high')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${
              filterMode === 'high' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Nilai Unggul ≥90% ({students.filter(s => s.averageScore >= 90).length})
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">Siswa</th>
                <th className="py-2.5 px-3">NISN</th>
                <th className="py-2.5 px-3">Bab Tuntas</th>
                <th className="py-2.5 px-3">Rata-Rata</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Aktivitas Terakhir</th>
                <th className="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredList.map(st => (
                <tr key={st.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-medium text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-pixel text-[10px] text-amber-400">
                      {st.name[0]}
                    </span>
                    <span>{st.name}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">{st.nisn}</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{st.completedChaptersCount} / 8</td>
                  <td className="py-3 px-3">
                    <span className={`font-pixel text-[11px] font-bold ${
                      st.averageScore >= 70 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {st.averageScore}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                      st.status === 'online' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : st.status === 'idle'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        st.status === 'online' ? 'bg-emerald-400' : st.status === 'idle' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                      {st.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 max-w-[200px] truncate">{st.lastActivity}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedStudent(st);
                        setNewTeacherNote(st.teacherNote || '');
                        retroSound.playBlip();
                      }}
                      className="retro-btn bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded text-[11px] font-semibold"
                    >
                      Buka Rapor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT DETAIL MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-3 border-amber-500 rounded-xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">{selectedStudent.name}</h3>
                <span className="text-xs text-slate-400 font-mono">NISN: {selectedStudent.nisn} · Kode Ortu: {selectedStudent.parentCode}</span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white font-pixel text-xs"
              >
                ✕
              </button>
            </div>

            {/* Scores per Chapter */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-2">Nilai Kuis Tiap Bab:</span>
              <div className="grid grid-cols-4 gap-2 text-xs text-center font-mono">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(chNum => {
                  const sc = selectedStudent.chapterScores[chNum] || 0;
                  return (
                    <div key={chNum} className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-500">Bab {chNum}</div>
                      <div className={`font-bold font-pixel text-[11px] mt-0.5 ${
                        sc >= 70 ? 'text-emerald-400' : sc > 0 ? 'text-red-400' : 'text-slate-600'
                      }`}>
                        {sc > 0 ? `${sc}%` : '-'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ortu Contact */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400">Kontak Orang Tua:</div>
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedStudent.parentName} ({selectedStudent.parentPhone})</span>
              </div>
            </div>

            {/* Note Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Catatan Guru untuk Siswa & Orang Tua:</span>
              </label>
              <textarea
                rows={3}
                value={newTeacherNote}
                onChange={(e) => setNewTeacherNote(e.target.value)}
                placeholder="Tuliskan catatan kemajuan belajar atau arahan remedial..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="retro-btn bg-slate-800 text-slate-300 px-4 py-2 rounded text-xs"
              >
                Tutup
              </button>
              <button
                onClick={handleSaveTeacherNote}
                className="retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded text-xs"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
