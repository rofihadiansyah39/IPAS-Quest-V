import { Character, Chapter, Badge, StudentProfile } from '../types/ipas';

export const SQUAD_IMAGE = '/src/assets/images/retro_pixel_characters_squad_1791700779169.jpg';
export const WORLD_MAP_IMAGE = '/src/assets/images/retro_world_map_science_1791700793010.jpg';
export const ENERGY_LAB_IMAGE = '/src/assets/images/retro_energy_lab_backdrop_1791700805400.jpg';
export const BIODIVERSITY_IMAGE = '/src/assets/images/retro_nature_biodiversity_1791700817277.jpg';

export interface CharacterDialogue {
  intro: string;
  guideVoice: string;
  quizPrompt: string;
  victoryPraise: string;
  remedialCheer: string;
}

export interface CharacterWithDialogue extends Character {
  dialogues: CharacterDialogue;
}

export const CHARACTERS: CharacterWithDialogue[] = [
  {
    id: 'banu',
    name: 'Banu',
    title: 'Scout Alam Cilik',
    role: 'Penyelidik Lingkungan & Gaya Fisika',
    color: '#f59e0b',
    bio: 'Banu memiliki rasa ingin tahu yang tinggi terhadap alam sekitar. Ia gemar mengamati fenomena sehari-hari: dari menggosokkan tangan saat kedinginan hingga mendorong kontainer berat bersama teman.',
    specialty: 'Dinamika Gaya Gesek & Ekosistem Darat',
    stats: { hp: 65, atk: 32, spd: 28 },
    dialogues: {
      intro: 'Halo teman-teman! Namaku Banu. Aku siap mengajakmu menjelajah rahasia gaya dan perubahan energi di sekitar kita!',
      guideVoice: 'Lihat benda di sekitarmu! Saat kita mendorong peti atau mengayuh sepeda, ada gaya otot dan gaya gesek yang sedang bekerja lho!',
      quizPrompt: 'Tantangan Bab menantimu! Ayo buktikan ketelitianmu dalam menganalisis fenomena sains ini!',
      victoryPraise: 'Luar biasa! Kamu berhasil menaklukkan tantangan ini seperti penjelajah sejati! Terus pertahankan semangat belajarmu!',
      remedialCheer: 'Jangan putus asa ya! Setiap ilmuwan hebat selalu belajar dari kesalahan. Ayo coba lagi eksperimennya bersama Banu!'
    }
  },
  {
    id: 'dara',
    name: 'Dara',
    title: 'Geologist Cilik',
    role: 'Pakar Peta, Lintang-Bujur & Bentang Alam',
    color: '#06b6d4',
    bio: 'Dara adalah siswi petualang yang pernah tinggal di Bali, Natuna, dan Pegunungan Bintang. Sangat mahir membaca peta astronomis, komponen legenda, dan formasi lempeng tektonik bumi.',
    specialty: 'Kartografi Peta, Tektonik & Geologi',
    stats: { hp: 58, atk: 28, spd: 35 },
    dialogues: {
      intro: 'Hai! Aku Dara. Bersamaku, kita akan membaca peta Indonesia, garis lintang-bujur, dan menyelidiki terbentuknya Danau Toba!',
      guideVoice: 'Ingat ya: Garis Lintang itu mendatar sejajar khatulistiwa, sedangkan Garis Bujur itu tegak! Keduanya memandu letak astronomis kita.',
      quizPrompt: 'Buka atlasmu dan siapkan kompas! Waktunya menguji keahlian membaca koordinat dan bentang alam bumi!',
      victoryPraise: 'Hebat sekali! Analisis koordinatmu sangat akurat layaknya seorang kartografer profesional!',
      remedialCheer: 'Tenang, membaca peta memang butuh latihan. Perhatikan kembali legenda dan simbolnya, kamu pasti bisa!'
    }
  },
  {
    id: 'ian',
    name: 'Ian',
    title: 'Leader Petualang',
    role: 'Penyelidik Turbin Energi & Alur Listrik',
    color: '#ef4444',
    bio: 'Ian selalu siap memimpin ekspedisi sains di kelas. Sangat tertarik dengan pembangkit listrik tenaga bayu (PLTB Sidrap), aliran air waduk PLTA, dan efisiensi energi terbarukan.',
    specialty: 'Hukum Kekekalan Energi & Pembangkit Listrik',
    stats: { hp: 72, atk: 38, spd: 30 },
    dialogues: {
      intro: 'Salam sains! Aku Ian. Mari kita pimpin penyelidikan bagaimana manusia mengubah energi alam menjadi listrik untuk jutaan rumah!',
      guideVoice: 'Energi tidak dapat kita ciptakan dari nol, tetapi bisa diubah dari gerak air, hembusan angin, atau cahaya matahari!',
      quizPrompt: 'Saatnya uji logika! Analisis alur perubahan energi dari hulu bendungan hingga menyalakan lampu kamarmu!',
      victoryPraise: 'Sempurna! Kamu memahami alur energi dengan sangat cemerlang! Daya nalarmu bertegangan tinggi!',
      remedialCheer: 'Belum berhasil? Coba periksa kembali jenis energinya: kinetik, kimia, atau listrik. Ayo kita bangkit bersama!'
    }
  },
  {
    id: 'aga',
    name: 'Aga',
    title: 'Insinyur & Magnet Master',
    role: 'Pakar Fisika Terapan & Teknologi Inovatif',
    color: '#8b5cf6',
    bio: 'Aga adalah anak ceria berkursi roda yang sangat cerdas dan inovatif. Memahami prinsip roda pengurang gesek, interaksi kutub magnetik U-S, dan cara kerja kereta Maglev.',
    specialty: 'Medan Magnet, Kereta Maglev & Rekayasa Roda',
    stats: { hp: 60, atk: 30, spd: 34 },
    dialogues: {
      intro: 'Halo kawan cerdas! Aku Aga. Kursi rodaku membuktikan bahwa dengan roda dan magnet, hal berat jadi sangat mudah dipindahkan!',
      guideVoice: 'Kutub sejenis tolak-menolak, kutub berbeda tarik-menarik! Roda juga memperkecil luas gesek lantai lho!',
      quizPrompt: 'Mesin kuis sudah siap! Ayo uji pemahamanmu tentang sifat magnet dan gaya di sekitar kita!',
      victoryPraise: 'Keren abis! Jawabanmu secepat laju kereta Maglev! Kamu memang insinyur cilik berbakat!',
      remedialCheer: 'Jangan khawatir! Mari kita balik kutub magnetnya dan uji kembali eksperimennya bersama Aga!'
    }
  },
  {
    id: 'mia',
    name: 'Mia',
    title: 'Biologist & Pelindung Bumi',
    role: 'Pakar Fotosintesis, Biodiversitas & 4M Lingkungan',
    color: '#10b981',
    bio: 'Mia adalah siswi berhijab dan berkacamata manis yang mencintai tanaman hijau, satwa Nusantara, tradisi kearifan lokal jamu, dan aksi nyata 4M penyelamatan iklim bumi.',
    specialty: 'Fotosintesis, Garis Wallacea & Aksi 4M Iklim',
    stats: { hp: 55, atk: 25, spd: 36 },
    dialogues: {
      intro: 'Assalamu’alaikum! Aku Mia. Ayo kita pelajari fotosintesis daun, satwa Wallacea, dan cara menjadi pahlawan 4M pelindung bumi!',
      guideVoice: 'Tumbuhan menyerap air tanah dan CO2 dengan bantuan klorofil untuk menghasilkan oksigen segar bagi paru-paru bumi kita!',
      quizPrompt: 'Soal kuis alam menantimu! Tunjukkan kecintaan dan pemahamanmu terhadap kelestarian flora-fauna Nusantara!',
      victoryPraise: 'Masya Allah luar biasa! Kamu membuktikan diri sebagai pahlawan lingkungan sejati! Bumi tersenyum bangga padamu!',
      remedialCheer: 'Tetap tersenyum! Setiap bibit pohon butuh waktu untuk mekar. Ulangi materinya pelan-pelan ya sahabat!'
    }
  },
];

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    title: 'Bab 1: Mengubah Bentuk Energi',
    shortTitle: 'Bentuk Energi',
    subtitle: 'Hukum Kekekalan, Fotosintesis & Pembangkit Listrik',
    themeColor: '#eab308',
    bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
    worldZone: 'Sidrap Wind Valley & Pembangkit PLTB',
    description: 'Manusia tidak dapat menciptakan energi, namun mengubah energi dari satu bentuk ke bentuk lain untuk mempermudah kehidupan.',
    targetCompetency: 'Menganalisis transformasi energi pada benda buatan, fotosintesis, dan pembangkit listrik.',
    simulationType: 'energy_converter',
    badgeReward: {
      id: 'badge_energi',
      title: 'Dynamo Master',
      description: 'Menguasai transformasi energi alam dan fotosintesis!',
      icon: '⚡',
    },
    subChapters: [
      {
        id: '1a',
        title: 'A. Perubahan Energi di Sekitar Kita',
        summary: 'Manusia memanfaatkan energi dengan mengubah bentuknya. Energi kimia pada bensin berubah jadi gerak, listrik berubah jadi cahaya atau panas.',
        points: [
          'Hukum Alam: Manusia tidak bisa menciptakan energi, hanya dapat mengubahnya (Hukum Kekekalan Energi).',
          'Contoh Perubahan: Bensin (energi kimia) → Mobil bergerak (energi gerak).',
          'Alat Rumah Tangga: Penanak nasi (listrik → panas), Kipas angin (listrik → gerak), Lampu (listrik → cahaya).',
          'Tubuh Manusia: Makanan (energi kimia) → Otot beraktivitas (energi gerak & panas tubuh).'
        ],
        comicDialogue: [
          { speaker: 'Banu', text: 'Hujannya deras sekali, badanku kedinginan karena sedikit basah!' },
          { speaker: 'Ian', text: 'Coba deh gosokkan kedua telapak tanganmu dengan cepat! Tanganmu akan terasa hangat karena energi gerak berubah jadi energi panas.' },
          { speaker: 'Banu', text: 'Wah ajaib, benar sekali! Gesekan tangan mengubah energi gerak menjadi panas!' }
        ],
        keyConcept: 'Energi tidak dapat dimusnahkan atau diciptakan, melainkan berubah bentuk.',
        experimentTitle: 'Eksperimen Perubahan Energi Telapak Tangan & Listrik Statis Balon',
        experimentSteps: [
          'Gosokkan kedua telapak tangan selama 20 hitungan lalu rasakan suhu kulitmu.',
          'Gosokkan balon atau penggaris plastik ke rambut kering sebanyak 15 kali.',
          'Dekatkan ke sobekan kertas kecil dan amati gaya listrik statis yang timbul!'
        ]
      },
      {
        id: '1b',
        title: 'B. Fotosintesis, Proses Penting di Bumi',
        summary: 'Tumbuhan tidak berpindah tempat atau memiliki mulut, tetapi memproduksi makanannya sendiri melalui fotosintesis menggunakan cahaya matahari.',
        points: [
          'Bahan Alami: Cahaya Matahari + Air (diserap akar dari tanah) + Gas Karbon Dioksida (diserap stomata daun).',
          'Bahan Khusus: Klorofil (zat hijau daun) di dalam kloroplas yang menangkap energi cahaya matahari.',
          'Hasil Akhir: Glukosa/Karbohidrat (disalurkan ke seluruh bagian tumbuhan/buah) + Oksigen (dilepas ke udara untuk bernapas semua makhluk hidup).',
          'Matahari adalah sumber energi utama bagi seluruh rantai makanan di Bumi.'
        ],
        comicDialogue: [
          { speaker: 'Mia', text: 'Kucing ini kelihatan lapar lalu mencari makan. Kalau tumbuhan bisa lapar atau tidak ya?' },
          { speaker: 'Aga', text: 'Tumbuhan tidak punya mulut, tapi mereka memasak makanan sendiri dengan daun hijau lewat fotosintesis!' },
          { speaker: 'Mia', text: 'Tepat sekali! Tumbuhan menyerap sinar matahari, air, dan CO2, lalu memberi kita oksigen segar untuk bernapas!' }
        ],
        keyConcept: 'Cahaya Matahari + Air + CO2 → [Klorofil] → Karbohidrat + Oksigen (O2).',
        experimentTitle: 'Uji Gelembung Oksigen Daun Segar dalam Gelas',
        experimentSteps: [
          'Ambil 1 lembar daun hijau segar dari halaman.',
          'Masukkan daun ke dalam gelas kaca bening berisi air hingga terendam penuh.',
          'Letakkan di bawah sinar matahari langsung selama 20-30 menit.',
          'Amati butiran gelembung kecil di permukaan daun: itulah gas oksigen murni!'
        ]
      },
      {
        id: '1c',
        title: 'C. Mengapa Manusia Mengubah Bentuk Energi?',
        summary: 'Tuhan menyediakan energi berlimpah, tetapi manusia harus mengubahnya agar dapat menggerakkan peradaban, seperti PLTA, PLTU, dan PLTB.',
        points: [
          'Pembangkit Listrik Tenaga Air (PLTA): Air bendungan mengalir deras (energi gerak) memutar turbin dan generator menghasilkan listrik.',
          'Pembangkit Listrik Tenaga Uap (PLTU): Batu bara dibakar menghasilkan panas mendidihkan air menjadi uap bertekanan pemutar generator.',
          'PLTB Sidrap (Sulawesi Selatan): Pembangkit Listrik Tenaga Bayu terbesar di ASEAN mengaliri 70.000 keluarga secara ramah lingkungan.',
          'Baterai: Menyimpan energi kimia yang dapat diubah menjadi listrik portabel tanpa kabel.'
        ],
        comicDialogue: [
          { speaker: 'Dara', text: 'Ibu sedang masak nasi tapi listrik padam. Mengapa listrik sangat penting di rumah kita ya?' },
          { speaker: 'Ian', text: 'Karena manusia telah merancang banyak alat yang mengubah listrik menjadi cahaya penerangan, panas kompor, dan pendingin!' }
        ],
        keyConcept: 'Teknologi energi diciptakan manusia untuk menyelesaikan tantangan hidup sehari-hari.'
      }
    ],
    quiz: [
      {
        id: 'q1_1',
        question: 'Pada Pembangkit Listrik Tenaga Air (PLTA), perubahan energi utama yang terjadi untuk memutar generator adalah...',
        context: 'Ian sedang mengamati aliran air deras bendungan yang memutar kincir turbin.',
        options: [
          'Energi panas menjadi energi bunyi',
          'Energi gerak (aliran air) menjadi energi listrik',
          'Energi kimia menjadi energi cahaya',
          'Energi listrik menjadi energi gerak'
        ],
        correctIndex: 1,
        explanation: 'Air yang mengalir membawa energi kinetik (gerak) untuk memutar turbin, yang kemudian menggerakkan generator penghasil listrik.',
        points: 20
      },
      {
        id: 'q1_2',
        question: 'Zat hijau daun yang bertugas menangkap energi cahaya matahari pada proses fotosintesis adalah...',
        context: 'Mia sedang meneliti daun bayam di bawah mikroskop.',
        options: [
          'Oksigen',
          'Karbohidrat',
          'Klorofil',
          'Stomata'
        ],
        correctIndex: 2,
        explanation: 'Klorofil merupakan pigmen hijau daun di dalam kloroplas yang bertugas menyerap radiasi cahaya matahari.',
        points: 20
      },
      {
        id: 'q1_3',
        question: 'Hasil akhir yang dilepaskan tumbuhan ke udara dari proses fotosintesis dan dihirup manusia untuk bernapas adalah...',
        context: 'Banu beristirahat di bawah pohon rindang yang sejuk.',
        options: [
          'Gas Karbon Dioksida',
          'Gas Oksigen',
          'Gas Metana',
          'Uap Belerang'
        ],
        correctIndex: 1,
        explanation: 'Proses fotosintesis mengubah CO2 dan air menjadi karbohidrat serta melepaskan gas oksigen (O2) ke udara.',
        points: 20
      },
      {
        id: 'q1_4',
        question: 'Ketika kendaraan bermotor menghabiskan bensin untuk melaju, perubahan bentuk energi yang paling utama dimanfaatkan adalah...',
        context: 'Mobil keluarga melaju di jalan tol.',
        options: [
          'Energi kimia menjadi energi gerak',
          'Energi bunyi menjadi energi listrik',
          'Energi cahaya menjadi energi pegas',
          'Energi magnet menjadi energi kimia'
        ],
        correctIndex: 0,
        explanation: 'Bahan bakar bensin menyimpan energi kimia yang melalui pembakaran mesin diubah menjadi energi kinetik (gerak).',
        points: 20
      },
      {
        id: 'q1_5',
        question: 'Pembangkit Listrik Tenaga Bayu (PLTB) pertama dan terbesar di ASEAN yang terletak di Indonesia berada di...',
        context: 'Mega turbin kincir angin raksasa berputar anggun di atas perbukitan.',
        options: [
          'Bima, Nusa Tenggara Barat',
          'Sidrap, Sulawesi Selatan',
          'Danau Toba, Sumatra Utara',
          'Cimahi, Jawa Barat'
        ],
        correctIndex: 1,
        explanation: 'PLTB Sidrap di Sulawesi Selatan adalah pembangkit listrik tenaga angin pertama dan terbesar di ASEAN yang melistriki puluhan ribu keluarga.',
        points: 20
      }
    ]
  },
  {
    id: 2,
    title: 'Bab 2: Gaya di Sekitar Kita',
    shortTitle: 'Gaya & Gerak',
    subtitle: 'Gaya Otot, Gaya Gesek, Gaya Pegas & Sifat Magnet',
    themeColor: '#3b82f6',
    bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
    worldZone: 'Maglev Mountain & Friction Arena',
    description: 'Gaya adalah tarikan atau dorongan yang dapat menggerakkan benda diam, mengubah arah gerak, maupun mengubah bentuk benda.',
    targetCompetency: 'Menyelidiki pengaruh gaya otot, gaya gesek permukaan, gaya pegas, dan sifat magnetis kutub.',
    simulationType: 'friction_magnet',
    badgeReward: {
      id: 'badge_gaya',
      title: 'Magnetik Sakti',
      description: 'Menaklukkan gaya gesek dan interaksi kutub magnet!',
      icon: '🧲',
    },
    subChapters: [
      {
        id: '2a',
        title: 'A. Apa itu Gaya?',
        summary: 'Gaya adalah interaksi pada benda berupa tarikan atau dorongan. Gaya memiliki arah dan kekuatan tertentu.',
        points: [
          'Gaya Otot: Dihasilkan oleh otot manusia atau hewan untuk mendorong gerobak atau menarik tambang.',
          'Pengaruh Gaya: Benda diam menjadi bergerak, benda bergerak menjadi diam, atau mengubah bentuk benda (misal meremas kertas).',
          'Tarik Tambang: Tim yang mengerahkan gaya tarik lebih besar akan menggerakkan tali ke arahnya.',
          'Gaya Pegas: Dimiliki benda elastis seperti karet katapel yang kembali ke bentuk semula saat dilepas.'
        ],
        comicDialogue: [
          { speaker: 'Ian', text: 'Ayo Banu, kita angkat peti mainan ini ke luar kelas!' },
          { speaker: 'Banu', text: 'Aduh berat sekali, tanganku tidak kuat mengangkatnya!' },
          { speaker: 'Aga', text: 'Daripada diangkat, coba Ian menarik talinya dan Banu mendorong dari belakang! Menggeser lebih ringan daripada mengangkat beban vertikal!' }
        ],
        keyConcept: 'Gaya = Tarikan atau Dorongan yang menggerakkan dan mengubah benda.',
      },
      {
        id: '2b',
        title: 'B. Menyelidiki Gaya Gesek',
        summary: 'Gaya gesek terjadi saat dua permukaan benda saling bersentuhan. Arah gaya gesek selalu berlawanan dengan arah gerak benda.',
        points: [
          'Sifat Arah: Arah gaya gesek selalu BERLAWANAN dengan arah gerak benda.',
          'Luas Permukaan: Benda beroda memiliki luas sentuh kecil sehingga gaya gesek kecil dan mudah didorong.',
          'Kekasaran Permukaan: Permukaan kasar memperbesar gaya gesek (sepatu bola bergerigi agar tidak tergelincir).',
          'Pelumas: Oli atau pelumas pada engsel pintu/pagar memperkecil gaya gesek agar licin dan ringan.'
        ],
        comicDialogue: [
          { speaker: 'Mia', text: 'Banu hati-hati! Lantai selasar baru saja dipel dan masih basah!' },
          { speaker: 'Banu', text: 'Waaah! Hampir saja terpeleset! Kenapa lantai basah membuat kita mudah tergelincir ya?' },
          { speaker: 'Aga', text: 'Karena air membuat permukaan lantai menjadi licin, sehingga gaya gesek antara sol sepatu dan lantai mengecil drastis!' }
        ],
        keyConcept: 'Gaya gesek berlawanan arah gerak; diperkecil oleh roda/pelumas, diperbesar oleh permukaan kasar.',
      },
      {
        id: '2c',
        title: 'C. Menyelidiki Gaya Magnet',
        summary: 'Magnet menarik benda feromagnetik (besi, nikel, kobalt) tanpa harus menyentuhnya secara langsung dan memiliki dua kutub magnetik.',
        points: [
          'Benda Magnetis vs Nonmagnetis: Magnet menarik paku besi, klip kertas; TIDAK menarik kayu, plastik, karet.',
          'Dua Kutub: Kutub Utara (U) dan Kutub Selatan (S). Bagian kutub memiliki gaya magnet paling kuat.',
          'Interaksi Kutub: Kutub senama (U-U / S-S) saling TOLAK-MENOLAK; kutub berlainan (U-S) saling TARIK-MENARIK.',
          'Teknologi Magnet: Kereta Shanghai Maglev melayang tanpa roda di atas rel magnet, kompas penunjuk arah, pintu kulkas rapat.'
        ],
        comicDialogue: [
          { speaker: 'Aga', text: 'Lihat, magnet ini bisa menarik paku kecil meskipun belum bersentuhan langsung!' },
          { speaker: 'Ian', text: 'Keren! Dan jika kutub merah didekatkan dengan kutub merah lainnya, kedua magnet saling mendorong menjauh!' }
        ],
        keyConcept: 'Kutub sejenis tolak-menolak, kutub berbeda tarik-menarik. Magnet bekerja menembus jarak & penghalang tipis.'
      }
    ],
    quiz: [
      {
        id: 'q2_1',
        question: 'Dua batang magnet didekatkan dengan posisi Kutub Utara (U) bertemu Kutub Utara (U). Apa yang akan terjadi?',
        context: 'Aga sedang melakukan uji coba dua magnet batang di atas meja laboratorium.',
        options: [
          'Kedua magnet akan saling tarik-menarik dengan kuat',
          'Kedua magnet akan saling tolak-menolak',
          'Kedua magnet akan kehilangan sifat kemagnetannya seketika',
          'Tidak terjadi interaksi apa pun'
        ],
        correctIndex: 1,
        explanation: 'Kutub-kutub magnet yang sejenis (U-U atau S-S) akan saling tolak-menolak bila didekatkan.',
        points: 20
      },
      {
        id: 'q2_2',
        question: 'Mengapa kursi roda atau kontainer beroda lebih mudah didorong dibanding kotak kayu tanpa roda di atas lantai?',
        context: 'Ian dan Banu memindahkan peti donasi buku ke perpustakaan.',
        options: [
          'Roda menghilangkan gaya gravitasi bumi',
          'Bentuk lingkaran roda memperkecil luas permukaan yang bergesekan dengan lantai',
          'Roda mengubah energi listrik menjadi energi gerak otomatis',
          'Roda menambah bobot beban menjadi lebih berat'
        ],
        correctIndex: 1,
        explanation: 'Roda bundar memperkecil luas permukaan kontak dengan lantai, sehingga gaya gesek yang menahan gerak berkurang drastis.',
        points: 20
      },
      {
        id: 'q2_3',
        question: 'Benda manakah di bawah ini yang PASTI DAPAT ditarik oleh magnet?',
        context: 'Mia memancing berbagai benda dari dalam kotak misteri menggunakan magnet.',
        options: [
          'Penggaris plastik dan penghapus karet',
          'Pensil kayu dan ranting kering',
          'Paku besi, klip kertas, dan jarum baja',
          'Kaca jendela dan botol plastik'
        ],
        correctIndex: 2,
        explanation: 'Magnet hanya dapat menarik benda berbahan logam tertentu seperti besi, baja, nikel, dan kobalt.',
        points: 20
      },
      {
        id: 'q2_4',
        question: 'Manakah dari pernyataan berikut yang merupakan contoh tindakan untuk MEMPERBESAR gaya gesek demi keamanan manusia?',
        context: 'Para pemain sepak bola bersiap di lapangan rumput yang licin setelah hujan.',
        options: [
          'Memberikan pelumas oli pada rantai sepeda',
          'Menambahkan paku-paku (pul) pada sol sepatu sepak bola',
          'Mengilapkan lantai keramik dengan cairan pemoles licin',
          'Memasang roda kecil pada bagian bawah lemari'
        ],
        correctIndex: 1,
        explanation: 'Paku-paku sol sepatu bola membuat permukaan alas bergerigi kasar sehingga gaya gesek bertambah dan pemain tidak mudah tergelincir di rumput.',
        points: 20
      },
      {
        id: 'q2_5',
        question: 'Kereta cepat Maglev di Shanghai mampu melesat tanpa roda hingga 430 km/jam karena memanfaatkan teknologi...',
        context: 'Kereta super cepat melayang di atas rel.',
        options: [
          'Gaya pegas dari karet katapel',
          'Gaya tolak-menolak medan magnet listrik yang membuat kereta melayang di atas rel',
          'Gaya gesek udara yang sangat kasar',
          'Gaya gravitasi bulan yang menarik kereta'
        ],
        correctIndex: 1,
        explanation: 'Kereta Maglev (Magnetic Levitation) menggunakan elektromagnet untuk membuat bodi kereta melayang bebas hambatan gesek roda.',
        points: 20
      }
    ]
  },
  {
    id: 3,
    title: 'Bab 3: Di Sini Tempat Tinggalku!',
    shortTitle: 'Peta & Bentang Alam',
    subtitle: 'Komponen Peta, Tektonik Bumi & Keajaiban Danau Toba',
    themeColor: '#06b6d4',
    bgGradient: 'from-cyan-950 via-slate-900 to-slate-950',
    worldZone: 'Archipelago Atlas & Danau Toba Caldera',
    description: 'Peta adalah gambaran permukaan bumi pada bidang datar dengan skala tertentu. Bentang alam terbentuk oleh dinamika tektonik dan proses alami bumi.',
    targetCompetency: 'Membaca komponen peta (astronomis & geografis) serta menjelaskan proses terbentuknya bentang alam bumi.',
    simulationType: 'plate_tectonics',
    badgeReward: {
      id: 'badge_peta',
      title: 'Kartografer Sejati',
      description: 'Menjelajahi garis lintang-bujur dan pergerakan lempeng tektonik!',
      icon: '🗺️',
    },
    subChapters: [
      {
        id: '3a',
        title: 'A. Mengenal Peta & Komponennya',
        summary: 'Peta adalah media komunikasi tertua yang memuat judul, mata angin, skala, legenda, garis astronomis (lintang & bujur), dan inset.',
        points: [
          'Garis Astronomis: Garis Lintang (mendatar) dan Garis Bujur (tegak lurus) untuk menentukan titik koordinat absolut di bumi.',
          'Letak Geografis: Posisi suatu wilayah berdasarkan kenampakan alam atau batas wilayah di sekitarnya.',
          'Peta Umum vs Tematik: Peta tematik memuat tema khusus, seperti peta sebaran fauna, curah hujan BMKG, atau pariwisata.',
          'Legenda & Simbol: Membantu pembaca mengartikan gunung (segitiga), pelabuhan (jangkar), danau, dan sungai.'
        ],
        comicDialogue: [
          { speaker: 'Banu', text: 'Dara, ada tulisan 4°24 LU dan 108°30 BT pada peta. Angka apa itu ya?' },
          { speaker: 'Dara', text: 'Itu adalah garis astronomis! LU singkatan Lintang Utara dan BT singkatan Bujur Timur untuk menentukan lokasi persis di bumi!' }
        ],
        keyConcept: 'Garis Lintang mendatar, Garis Bujur tegak. Keduanya menentukan letak astronomis.',
      },
      {
        id: '3b',
        title: 'B. Bentang Alam Daerahku & Tektonik',
        summary: 'Bentang alam bumi meliputi gunung, bukit, dataran rendah, danau, dan palung. Terbentuk melalui gaya endogen lempeng tektonik dan vulkanisme.',
        points: [
          'Lapisan Bumi: Kerak Bumi (litosfer tebal 0-100 km), Mantel Bumi, Inti Luar (cair), dan Inti Dalam (padat).',
          'Gerak Lempeng: Divergen (saling menjauh), Konvergen (saling bertubrukan & menghunjam), Transform (bergesekan menyamping).',
          'Danau Toba: Danau kaldera terbesar di dunia (luas >1.145 km², dalam 508 m) hasil letusan dahsyat supervulkanik Gunung Toba Purba.',
          'Pulau Samosir: Pulau vulkanik di tengah Danau Toba dengan luas 630 km² yang menyimpan danau di dalam danau (Sidihoni & Aek Natonang).'
        ],
        comicDialogue: [
          { speaker: 'Ian', text: 'Kakekku bercerita kalau Danau Toba dahulu kala adalah gunung berapi raksasa!' },
          { speaker: 'Dara', text: 'Betul sekali Ian! Tiga letusan purba dahsyat membentuk kaldera raksasa yang terisi air hujan menjadi danau terbesar di dunia!' }
        ],
        keyConcept: 'Lempeng tektonik bergerak beberapa cm per tahun. Pergesekan lempeng memicu gempa bumi dan gunung berapi.',
      }
    ],
    quiz: [
      {
        id: 'q3_1',
        question: 'Garis mendatar pada bola bumi atau peta yang digunakan untuk menentukan posisi relatif terhadap garis khatulistiwa disebut...',
        context: 'Dara sedang mencari koordinat kota Sabang pada peta atlas.',
        options: [
          'Garis Bujur',
          'Garis Lintang',
          'Garis Skala',
          'Garis Kontur'
        ],
        correctIndex: 1,
        explanation: 'Garis lintang adalah garis khayal mendatar yang sejajar dengan khatulistiwa (0°). Garis bujur adalah garis tegak yang menghubungkan kutub utara dan selatan.',
        points: 20
      },
      {
        id: 'q3_2',
        question: 'Lapisan paling luar bumi tempat manusia dan makhluk hidup berpijak dan membangun kota dengan ketebalan 0-100 km dinamakan...',
        context: 'Penampang belahan lapisan bumi diperlihatkan di ruang sains.',
        options: [
          'Inti Dalam Bumi',
          'Mantel Bumi',
          'Kerak Bumi (Litosfer)',
          'Inti Luar Bumi'
        ],
        correctIndex: 2,
        explanation: 'Kerak bumi adalah lapisan terluar yang padat dan kaku, bagian dari litosfer tempat seluruh kehidupan daratan berada.',
        points: 20
      },
      {
        id: 'q3_3',
        question: 'Danau Toba di Sumatra Utara terbentuk dari peristiwa alam berupa...',
        context: 'Pemandangan spektakuler perbukitan hijau mengelilingi perairan biru Danau Toba.',
        options: [
          'Pengikisan angin selama ribuan tahun',
          'Letusan dahsyat supervulkanik purba yang meruntuhkan puncak dan membentuk kaldera raksasa',
          'Penggalian buatan oleh peradaban manusia kuno',
          'Pencairan es kutub yang menggenangi lembah'
        ],
        correctIndex: 1,
        explanation: 'Danau Toba adalah kaldera vulkanik terbesar di dunia yang terbentuk akibat letusan dahsyat Gunung Toba Purba.',
        points: 20
      },
      {
        id: 'q3_4',
        question: 'Pertemuan dua lempeng tektonik bumi yang saling berdekatan dan salah satu lempengnya menghunjam ke bawah disebut pergerakan...',
        context: 'Pergerakan kerak bumi memicu terbentuknya palung laut dan pegunungan.',
        options: [
          'Konvergen',
          'Divergen',
          'Transform',
          'Rotasi'
        ],
        correctIndex: 0,
        explanation: 'Gerak konvergen terjadi saat lempeng saling bertumbukan/mendekat, di mana lempeng samudera biasanya menghunjam ke bawah lempeng benua.',
        points: 20
      },
      {
        id: 'q3_5',
        question: 'Peta yang dibuat khusus untuk menampilkan informasi tertentu seperti peta curah hujan, persebaran flora-fauna, atau kepadatan penduduk disebut...',
        context: 'Peta dinding yang menampilkan corak warna zona hujan BMKG.',
        options: [
          'Peta Umum',
          'Peta Tematik (Khusus)',
          'Peta Topografi Militer',
          'Peta Denah Rumah'
        ],
        correctIndex: 1,
        explanation: 'Peta tematik atau peta khusus dirancang untuk menyajikan tema informasi tertentu sesuai kebutuhan penggunanya.',
        points: 20
      }
    ]
  },
  {
    id: 4,
    title: 'Bab 4: Iklim dan Perubahannya',
    shortTitle: 'Iklim & Atmosfer',
    subtitle: 'Musim Tropis vs Subtropis, Efek Rumah Kaca & Jejak Karbon',
    themeColor: '#f97316',
    bgGradient: 'from-orange-950 via-slate-900 to-slate-950',
    worldZone: 'Atmosphere Lab & Climate Observatory',
    description: 'Iklim adalah rata-rata cuaca selama puluhan tahun. Peningkatan gas rumah kaca akibat aktivitas manusia memicu pemanasan global.',
    targetCompetency: 'Membedakan cuaca dan iklim, menganalisis proses efek rumah kaca serta dampak emisi gas buang.',
    simulationType: 'greenhouse_carbon',
    badgeReward: {
      id: 'badge_iklim',
      title: 'Penjaga Atmosfer',
      description: 'Menjaga bumi dari ancaman pemanasan global dan gas rumah kaca!',
      icon: '🌡️',
    },
    subChapters: [
      {
        id: '4a',
        title: 'A. Musim dan Iklim di Indonesia',
        summary: 'Cuaca berubah dalam hitungan jam/hari, sedangkan iklim adalah rata-rata cuaca dalam periode 10-30 tahun. Indonesia beriklim tropis.',
        points: [
          'Iklim Tropis: Berada di sekitar garis khatulistiwa (0°), menerima sinar matahari melimpah sepanjang tahun dengan 2 musim: Hujan & Kemarau.',
          'Iklim Subtropis: Jauh dari khatulistiwa, mengalami 4 musim: Dingin, Semi, Panas, dan Gugur.',
          'Adaptasi Hewan: Beruang melakukan hibernasi (tidur panjang di musim dingin), sedangkan siput melakukan estivasi (menghemat energi di musim panas terik).'
        ],
        comicDialogue: [
          { speaker: 'Ian', text: 'Kemarin aku menonton film manusia salju. Kenapa ya di daerah kita tidak pernah turun salju?' },
          { speaker: 'Aga', text: 'Karena negara kita Indonesia dilintasi garis khatulistiwa, beriklim tropis yang hangat sepanjang tahun!' }
        ],
        keyConcept: 'Cuaca = jangka pendek harian. Iklim = rata-rata cuaca jangka panjang 10-30 tahun.',
      },
      {
        id: '4b',
        title: 'B. Efek Rumah Kaca & Pemanasan Global',
        summary: 'Atmosfer bumi bertindak seperti atap kaca yang menahan panas agar bumi layak huni. Namun, gas rumah kaca berlebih membuat bumi terlalu panas.',
        points: [
          'Alami: Tanpa atmosfer, bumi akan membeku di bawah 0°C pada malam hari. Efek rumah kaca alami menjaga suhu bumi hangat.',
          'Gas Rumah Kaca (GRK): Karbon dioksida (CO2), Metana (CH4 dari kotoran ternak), CFC (freon pendingin), N2O.',
          'Pemanasan Global: Suhu bumi meningkat 1,1°C dibanding tahun 1800-an. Panas terjebak dan tidak dapat dipantulkan kembali ke angkasa.',
          'Dampak Buruk: Es kutub mencair, kenaikan permukaan air laut menenggelamkan pulau kecil, kebakaran hutan, dan cuaca ekstrem.'
        ],
        comicDialogue: [
          { speaker: 'Mia', text: 'Cuaca akhir-akhir ini panas sekali ya, matahari terasa sangat menyengat!' },
          { speaker: 'Dara', text: 'Itu karena konsentrasi gas rumah kaca di atmosfer semakin tebal menahan pantulan panas kembali ke angkasa.' }
        ],
        keyConcept: 'Gas CO2 dan metana berlebih memerangkap panas radiasi matahari di atmosfer.',
      },
      {
        id: '4c',
        title: 'C. Gas Karbon di Sekitarku & Krisis Air Bersih',
        summary: 'Aktivitas transportasi dan industri melepaskan polutan udara. Pemanasan global juga mengancam cadangan 3,5% air tawar bumi.',
        points: [
          'Polutan Udara: Karbon monoksida (CO), Nitrogen dioksida (NO2), Sulfur dioksida (SO2), Timbal (Pb), CO2.',
          'Krisis Air Bersih: 70% bumi tertutup air, namun HANYA 3,5% berupa air tawar yang dapat diminum manusia.',
          'Pencemaran limbah dan penggundulan hutan menyebabkan mata air mengering.'
        ],
        comicDialogue: [
          { speaker: 'Banu', text: 'Ternyata air tawar yang bisa kita minum cuma 3,5% dari seluruh air di dunia!' },
          { speaker: 'Mia', text: 'Betul Banu! Jika kita mencemari sungai dengan sampah dan limbah, kita akan mengalami krisis air bersih!' }
        ],
        keyConcept: 'Hanya 3,5% air di bumi yang berupa air tawar. Menjaga air dan mengurangi emisi adalah kewajiban bersama.'
      }
    ],
    quiz: [
      {
        id: 'q4_1',
        question: 'Berapakah persentase jumlah air tawar yang dapat dikonsumsi di bumi dari seluruh total air yang ada?',
        context: 'Grafik infografis perbandingan air laut asin dan air tawar dunia.',
        options: [
          'Sekitar 70%',
          'Sekitar 50%',
          'Sekitar 3,5%',
          'Sekitar 25%'
        ],
        correctIndex: 2,
        explanation: 'Sekitar 70% bumi tertutup air, namun sebagian besar adalah air laut asin. Air tawar hanya berjumlah sekitar 3,5%.',
        points: 20
      },
      {
        id: 'q4_2',
        question: 'Fenomena hewan siput menghemat energi dengan beristirahat panjang saat musim panas yang sangat terik disebut...',
        context: 'Mia mempelajari cara bertahan hidup hewan di iklim subtropis.',
        options: [
          'Hibernasi',
          'Estivasi',
          'Migrasi',
          'Kamuflase'
        ],
        correctIndex: 1,
        explanation: 'Hibernasi dilakukan di musim dingin (misal beruang), sedangkan estivasi dilakukan di musim panas terik (misal siput).',
        points: 20
      },
      {
        id: 'q4_3',
        question: 'Gas utama yang dihasilkan dari pembakaran bahan bakar fosil minyak bumi dan batu bara yang menahan panas di atmosfer adalah...',
        context: 'Asap knalpot kendaraan bermotor dan cerobong asap pabrik.',
        options: [
          'Gas Karbon Dioksida (CO2)',
          'Gas Oksigen (O2)',
          'Gas Nitrogen murni',
          'Gas Helium'
        ],
        correctIndex: 0,
        explanation: 'Karbon dioksida (CO2) adalah gas rumah kaca utama yang menyerap radiasi inframerah dan memerangkap panas di bumi.',
        points: 20
      },
      {
        id: 'q4_4',
        question: 'Apa dampak nyata dari pemanasan global bagi wilayah kepulauan dan pesisir pantai?',
        context: 'Gletser es di kutub mencair secara cepat.',
        options: [
          'Permukaan air laut naik sehingga berisiko menenggelamkan pulau-pulau kecil',
          'Air laut akan membeku menjadi daratan es baru',
          'Suhu laut turun drastis menjadi minus derajat',
          'Tidak ada perubahan permukaan laut'
        ],
        correctIndex: 0,
        explanation: 'Mencairnya es kutub menambah volume air samudera sehingga permukaan laut meningkat dan mengancam pemukiman pesisir.',
        points: 20
      },
      {
        id: 'q4_5',
        question: 'Berapa lama waktu pencatatan rata-rata cuaca yang diperlukan ilmuwan untuk menentukan iklim di suatu wilayah?',
        context: 'Stasiun meteorologi BMKG mencatat data cuaca jangka panjang.',
        options: [
          '1 sampai 3 hari',
          '1 sampai 2 minggu',
          '10 sampai 30 tahun',
          '500 sampai 1000 tahun'
        ],
        correctIndex: 2,
        explanation: 'Menurut ilmu meteorologi dan klimatologi, iklim ditentukan dari pola cuaca rata-rata selama 10 hingga 30 tahun.',
        points: 20
      }
    ]
  },
  {
    id: 5,
    title: 'Bab 5: Ini Khas Daerahku!',
    shortTitle: 'Kekayaan Alam & Profesi',
    subtitle: 'Biodiversitas, Garis Wallace-Weber, SDA & Profesi Masyarakat',
    themeColor: '#10b981',
    bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
    worldZone: 'Bima Salt Bay & Wallacea Sanctuary',
    description: 'Bentang alam menentukan keanekaragaman flora-fauna, sumber daya alam unggulan, serta ragam mata pencaharian dan profesi masyarakat.',
    targetCompetency: 'Mengidentifikasi 3 zona flora-fauna Indonesia, membedakan SDA terbarukan & tak terbarukan, serta menganalisis profesi daerah.',
    simulationType: 'biodiversity_map',
    badgeReward: {
      id: 'badge_hayati',
      title: 'Sahabat Hayati',
      description: 'Menemukan fauna endemik Nusantara dan kearifan sumber daya alam!',
      icon: '🌿',
    },
    subChapters: [
      {
        id: '5a',
        title: 'A. Keanekaragaman Hayati & 3 Zona Fauna',
        summary: 'Keanekaragaman hayati terbagi menjadi tingkat gen, spesies, dan ekosistem. Persebaran fauna Indonesia terbagi 3 wilayah.',
        points: [
          'Tingkat Biodiversitas: Gen (variasi warna bunga mawar), Spesies (kucing, harimau, singa), Ekosistem (hutan tropis, sabana, rawa).',
          'Zona Asiatis (Barat): Sumatra, Jawa, Kalimantan (Gajah, Badak, Orangutan, Harimau Sumatra, Meranti, Jati).',
          'Zona Peralihan (Tengah): Sulawesi, Maluku, Nusa Tenggara (Anoa, Babirusa, Komodo, Tarsius, Kayu Cendana).',
          'Zona Australis (Timur): Papua dan sekitarnya (Cendrawasih, Kasuari, Kanguru Pohon, Walabi, Pohon Sagu, Matoa).'
        ],
        comicDialogue: [
          { speaker: 'Banu', text: 'Pisang di pasar ada banyak sekali jenisnya: pisang tanduk, ambon, kepok, dan raja!' },
          { speaker: 'Aga', text: 'Iya Banu, buah mangga juga ada mangga arumanis, manalagi, dan gedong! Itu adalah contoh keanekaragaman tingkat gen!' }
        ],
        keyConcept: 'Fauna Asiatis (Barat), Peralihan (Tengah - Wallacea), dan Australis (Timur).',
      },
      {
        id: '5b',
        title: 'B. Sumber Daya Alam Hayati & Nonhayati',
        summary: 'SDA berasal dari alam untuk kebutuhan manusia. Terbagi menjadi SDA dapat diperbarui dan tidak dapat diperbarui.',
        points: [
          'SDA Dapat Diperbarui: Matahari, air, angin, tanah, tumbuhan, hewan (berkelanjutan jika dijaga).',
          'SDA Tidak Dapat Diperbarui: Minyak bumi, batu bara, emas, nikel (terbatas dan dapat habis).',
          'Garam Teluk Bima: Dataran rendah bersuhu panas dengan curah hujan rendah menghasilkan 80% garam NTB.',
          'Inovasi: Rumput laut diolah menjadi bahan pembungkus makanan ramah lingkungan pengganti plastik.'
        ],
        comicDialogue: [
          { speaker: 'Mia', text: 'Bima di NTB terkenal sebagai penghasil garam rakyat terbesar ya!' },
          { speaker: 'Ian', text: 'Benar Mia! Bentang alam teluk dengan curah hujan rendah dan terik matahari sangat cocok untuk penguapan air laut menjadi kristal garam.' }
        ],
        keyConcept: 'SDA Hayati (makhluk hidup), Nonhayati (benda mati). Hemat SDA tak terbarukan!',
      },
      {
        id: '5c',
        title: 'C. Mata Pencaharian vs Profesi',
        summary: 'Bentang alam memengaruhi mata pencaharian, sedangkan profesi muncul karena kebutuhan layanan masyarakat dengan keahlian khusus.',
        points: [
          'Mata Pencaharian: Pekerjaan memenuhi kebutuhan dasar yang sangat dipengaruhi bentang alam (nelayan di laut, petani di sawah, petambak).',
          'Profesi: Pekerjaan yang memerlukan pendidikan dan pelatihan khusus untuk melayani masyarakat (guru, dokter, kartografer, arsitek, peneliti).',
          'Keberagaman Sosial: Di tepi sungai tidak semua orang nelayan, ada guru yang mengajar dan dokter yang merawat kesehatan.'
        ],
        comicDialogue: [
          { speaker: 'Dara', text: 'Apa bedanya mata pencaharian dengan profesi?' },
          { speaker: 'Ian', text: 'Mata pencaharian langsung terkait bentang alam seperti nelayan di pesisir, sedangkan profesi seperti dokter atau guru membutuhkan pelatihan dan sekolah khusus!' }
        ],
        keyConcept: 'Bentang alam membentuk mata pencaharian, kebutuhan sosial memunculkan profesi.'
      }
    ],
    quiz: [
      {
        id: 'q5_1',
        question: 'Hewan khas Indonesia yang termasuk ke dalam tipe fauna Peralihan (Wallacea) antara lain adalah...',
        context: 'Peta garis Wallace dan Weber membagi zonasi fauna Nusantara.',
        options: [
          'Gajah sumatra dan Orangutan kalimantan',
          'Anoa, Babirusa, dan Komodo',
          'Cendrawasih dan Kanguru pohon',
          'Badak bercula satu dan Harimau jawa'
        ],
        correctIndex: 1,
        explanation: 'Anoa, babirusa, tarsius, dan komodo adalah hewan endemik zona peralihan yang hanya ditemukan di kawasan tengah Indonesia.',
        points: 20
      },
      {
        id: 'q5_2',
        question: 'Manakah di bawah ini yang merupakan sumber daya alam yang TIDAK DAPAT diperbarui?',
        context: 'Bahan tambang yang ditambang dari dalam perut bumi.',
        options: [
          'Sinar matahari dan hembusan angin',
          'Pohon kelapa dan ikan laut',
          'Minyak bumi, batu bara, dan bijih nikel',
          'Air sungai dan tanah subur'
        ],
        correctIndex: 2,
        explanation: 'Bahan bakar fosil dan logam mineral memerlukan jutaan tahun untuk terbentuk kembali, sehingga termasuk SDA yang tidak dapat diperbarui.',
        points: 20
      },
      {
        id: 'q5_3',
        question: 'Perbedaan utama antara mata pencaharian dengan profesi adalah...',
        context: 'Masyarakat di pesisir pantai dan perkotaan.',
        options: [
          'Profesi tidak menghasilkan uang, sedangkan mata pencaharian selalu kaya',
          'Profesi memerlukan pendidikan dan pelatihan khusus untuk melayani masyarakat, sedangkan mata pencaharian dipengaruhi langsung oleh bentang alam',
          'Mata pencaharian hanya boleh dilakukan oleh anak-anak',
          'Profesi hanya ada di luar negeri'
        ],
        correctIndex: 1,
        explanation: 'Profesi seperti dokter, guru, arsitek membutuhkan pendidikan khusus. Mata pencaharian seperti nelayan, petani bergantung pada alam.',
        points: 20
      },
      {
        id: 'q5_4',
        question: 'Keanekaragaman yang terlihat pada variasi warna bunga mawar (merah, putih, kuning) termasuk keanekaragaman tingkat...',
        context: 'Taman bunga sekolah dengan aneka mawar mekar.',
        options: [
          'Ekosistem',
          'Gen',
          'Spesies',
          'Komunitas'
        ],
        correctIndex: 1,
        explanation: 'Variasi sifat antarindividu dalam satu spesies (seperti warna mawar atau warna kulit manusia) adalah keanekaragaman tingkat gen.',
        points: 20
      },
      {
        id: 'q5_5',
        question: 'Mengapa Kabupaten Bima di Nusa Tenggara Barat mampu menghasilkan 80% total produksi garam di provinsinya?',
        context: 'Lahan tambak garam putih membentang di pesisir Teluk Bima.',
        options: [
          'Karena memiliki curah hujan sangat tinggi sepanjang tahun',
          'Karena letak geografisnya di dataran rendah teluk dengan curah hujan rendah dan terik matahari optimal',
          'Karena banyak pabrik batubara di sekitarnya',
          'Karena tidak memiliki akses perairan laut'
        ],
        correctIndex: 1,
        explanation: 'Daerah pesisir teluk dengan curah hujan rendah dan sinar matahari panas adalah syarat ideal pengkristalan garam dari air laut.',
        points: 20
      }
    ]
  },
  {
    id: 6,
    title: 'Bab 6: Peranku di Lingkungan Sekolah dan Masyarakat',
    shortTitle: 'Peran & Aturan',
    subtitle: 'Hak, Tanggung Jawab, Aturan & Interaksi Sosial Positif',
    themeColor: '#8b5cf6',
    bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
    worldZone: 'Civic Plaza & Harmony Village',
    description: 'Manusia adalah makhluk sosial yang saling bergantung. Peraturan diciptakan agar tercipta ketertiban, keadilan, dan kelestarian bersama.',
    targetCompetency: 'Menganalisis peran dan tanggung jawab di sekolah dan masyarakat serta menerapkan interaksi sosial yang berakhlak mulia.',
    simulationType: 'role_responsibilities',
    badgeReward: {
      id: 'badge_peran',
      title: 'Warga Teladan',
      description: 'Menjalankan tanggung jawab dan mematuhi aturan bermasyarakat!',
      icon: '🤝',
    },
    subChapters: [
      {
        id: '6a',
        title: 'A. Peran dan Tugasku di Sekolah & Masyarakat',
        summary: 'Setiap individu memegang banyak peran: sebagai peserta didik di sekolah, anak di rumah, dan warga di masyarakat.',
        points: [
          'Peran Peserta Didik: Datang tepat waktu, memperhatikan guru, menjaga kebersihan kelas, mengikuti upacara bendera.',
          'Peran Warga Masyarakat: Ikut kerja bakti membersihkan selokan, menjaga ketenangan, saling menolong tetangga yang membutuhkan.',
          'Keberagaman Peran: Guru mendidik, pedagang menyediakan bahan makanan, dokter mengobati, petugas kebersihan menjaga lingkungan asri.'
        ],
        comicDialogue: [
          { speaker: 'Ian', text: 'Di sekolah peranku adalah peserta didik. Kalau di rumah aku anak yang membantu orang tua!' },
          { speaker: 'Mia', text: 'Betul Ian! Dan ketika ada kerja bakti membersihkan sungai kampung, kita semua berperan sebagai warga yang bertanggung jawab!' }
        ],
        keyConcept: 'Setiap peran memiliki hak dan tugas yang harus dijalankan secara seimbang.',
      },
      {
        id: '6b',
        title: 'B. Peraturan dan Tanggung Jawabku',
        summary: 'Peraturan tertulis dan tidak tertulis diciptakan untuk menciptakan keteraturan. Peribahasa: Di mana bumi dipijak di situ langit dijunjung.',
        points: [
          'Peraturan Tertulis: Tertulis resmi, ada sanksi tegas (misal: rambu lalu lintas, tata tertib sekolah dilarang berlari di lorong).',
          'Peraturan Tidak Tertulis: Norma sopan santun (mengantre di kasir, memberi tempat duduk pada lansia di bus).',
          'Makna Peribahasa: Kemanapun kita pergi, kita wajib menghormati dan mematuhi adat serta aturan tempat tersebut.'
        ],
        comicDialogue: [
          { speaker: 'Ian', text: 'Kenapa kita tidak boleh berlari di sepanjang lorong kelas?' },
          { speaker: 'Mia', text: 'Lihat tanda di dinding itu Ian! Berlari di lorong bisa menabrak teman lain yang sedang berjalan membawa buku.' }
        ],
        keyConcept: 'Peraturan menjaga keamanan bersama; tanggung jawab adalah kesadaran mematuhinya.',
      },
      {
        id: '6c',
        title: 'C. Interaksi Sosial di Sekolah & Masyarakat',
        summary: 'Interaksi sosial membutuhkan kontak dan komunikasi. Musyawarah dan diskusi sehat menghindari perselisihan.',
        points: [
          'Syarat Interaksi Sosial: Adanya Kontak Sosial dan Komunikasi timbal balik.',
          'Bentuk Interaksi Positif: Gotong royong membersihkan sungai, berdiskusi kelompok, saling menyapa dengan santun.',
          'Interaksi dengan Alam: Menanam pohon dan merawat taman menghasilkan dampak positif; membuang sampah sembarangan merusak alam.'
        ],
        comicDialogue: [
          { speaker: 'Banu', text: 'Sungai di dekat sekolah banyak sampahnya, baunya tidak enak!' },
          { speaker: 'Aga', text: 'Ayo kita ajak teman-teman dan warga bergotong royong! Gotong royong adalah bukti nyata interaksi sosial yang bertanggung jawab.' }
        ],
        keyConcept: 'Interaksi sosial yang baik didasari saling menghargai, gotong royong, dan menjaga lingkungan.',
      }
    ],
    quiz: [
      {
        id: 'q6_1',
        question: 'Makna dari peribahasa "Di mana bumi dipijak, di situ langit dijunjung" adalah...',
        context: 'Murid-murid sedang mempelajari norma dan adat istiadat di berbagai daerah.',
        options: [
          'Kita bebas melakukan apa saja sesuka hati di tempat baru',
          'Di manapun kita berada, kita harus menghormati dan mematuhi peraturan yang berlaku di tempat tersebut',
          'Langit di setiap daerah selalu berwarna biru',
          'Kita tidak perlu berbicara dengan warga setempat'
        ],
        correctIndex: 1,
        explanation: 'Peribahasa tersebut mengajarkan bahwa kita harus menghormati aturan, norma, dan adat istiadat di mana pun kita berada.',
        points: 20
      },
      {
        id: 'q6_2',
        question: 'Dua syarat utama agar interaksi sosial dapat berlangsung antara dua orang atau lebih adalah...',
        context: 'Dua orang sahabat bertemu di gerbang sekolah.',
        options: [
          'Kontak sosial dan komunikasi',
          'Uang saku dan pakaian mahal',
          'Alat elektronik dan sambungan internet',
          'Jarak yang sangat jauh'
        ],
        correctIndex: 0,
        explanation: 'Interaksi sosial hanya dapat terwujud jika terjadi kontak sosial (hubungan awal) dan komunikasi (penyampaian pesan yang dipahami).',
        points: 20
      },
      {
        id: 'q6_3',
        question: 'Manakah contoh perilaku yang mencerminkan tanggung jawab sebagai peserta didik di lingkungan sekolah?',
        context: 'Aktivitas pagi hari sebelum jam pelajaran dimulai.',
        options: [
          'Datang terlambat dan berlari kencang di lorong kelas',
          'Melaksanakan tugas piket kebersihan kelas dan mendengarkan penjelasan guru dengan saksama',
          'Mencoret-coret meja perpustakaan',
          'Membuang bungkus bekal di bawah laci meja'
        ],
        correctIndex: 1,
        explanation: 'Melaksanakan tugas piket dan menghargai proses belajar adalah bentuk tanggung jawab utama peserta didik di sekolah.',
        points: 20
      },
      {
        id: 'q6_4',
        question: 'Tindakan berikut ini yang merupakan contoh interaksi sosial manusia dengan alam yang berdampak NEGATIF adalah...',
        context: 'Pencemaran lingkungan di pinggir sungai.',
        options: [
          'Menanam bibit mangrove di pesisir pantai',
          'Membersihkan sampah plastik dari saluran air bersama warga',
          'Membakar tumpukan sampah plastik di tempat terbuka dekat pemukiman',
          'Membuat kompos dari daun-daun kering di taman sekolah'
        ],
        correctIndex: 2,
        explanation: 'Membakar sampah plastik melepaskan gas beracun dan polusi karbon yang mencemari udara dan merusak atmosfer.',
        points: 20
      },
      {
        id: 'q6_5',
        question: 'Mengapa dalam diskusi kelompok di kelas kita perlu bermusyawarah dan saling menghargai pendapat teman?',
        context: 'Banu, Dara, Ian, Aga, dan Mia sedang membagi tugas proyek sains.',
        options: [
          'Agar hanya suara kita sendiri yang selalu dimenangkan',
          'Untuk menghindari perselisihan dan menghasilkan kesepakatan terbaik bersama secara mufakat',
          'Supaya tugas tidak perlu dikerjakan sama sekali',
          'Agar diskusi selesai dalam 5 detik saja'
        ],
        correctIndex: 1,
        explanation: 'Musyawarah mufakat menjunjung toleransi dan kebersamaan, sehingga setiap anggota merasa dihargai dan tujuan tercapai dengan damai.',
        points: 20
      }
    ]
  },
  {
    id: 7,
    title: 'Bab 7: Keragaman Budaya dan Kearifan Lokal',
    shortTitle: 'Kearifan Lokal',
    subtitle: 'Tradisi Sasi, Bebie, Cuci Negeri Soya & 12 Warisan UNESCO',
    themeColor: '#ec4899',
    bgGradient: 'from-pink-950 via-slate-900 to-slate-950',
    worldZone: 'Heritage Realm & Nusantara Cultural Pavilion',
    description: 'Kearifan lokal adalah nilai luhur dan pandangan hidup turun-temurun untuk menjaga keharmonisan masyarakat dan kelestarian alam.',
    targetCompetency: 'Menganalisis tradisi kearifan lokal (Sasi, Bebie, Cireundeu) dan melestarikan warisan budaya UNESCO Indonesia.',
    simulationType: 'unesco_culture',
    badgeReward: {
      id: 'badge_budaya',
      title: 'Penjaga Tradisi',
      description: 'Menjaga kelestarian kearifan lokal dan warisan budaya Nusantara!',
      icon: '🎭',
    },
    subChapters: [
      {
        id: '7a',
        title: 'A. Kearifan Lokal di Masyarakat Sekitarku',
        summary: 'Kearifan lokal diwariskan nenek moyang untuk menjaga alam dan mempererat persaudaraan.',
        points: [
          'Tradisi Cuci Negeri Soya (Ambon): Gotong royong tahunan membersihkan negeri pada minggu kedua Desember untuk persatuan.',
          'Tradisi Sasi (Maluku & Papua): Larangan adat mengambil sumber daya tertentu (ikan teripang, lola) dalam periode waktu tertentu agar populasi pulih.',
          'Tradisi Bebie (Muara Enim, Sumsel): Gotong royong menanam dan memanen padi bersama lalu ditutup pesta syukur.',
          'Filosofi Papua: "Te aro neweak lako" (alam adalah aku), memandang gunung dan tanah seperti tubuh sendiri.'
        ],
        comicDialogue: [
          { speaker: 'Mia', text: 'Ibu selalu membuat jamu kunyit asam untuk kami minum di rumah!' },
          { speaker: 'Dara', text: 'Itu kearifan lokal pengobatan herbal yang luar biasa! Di kampung Cireundeu Cimahi, warganya bahkan menjaga tradisi makan beras singkong (rasi) yang menyehatkan.' }
        ],
        keyConcept: 'Kearifan lokal mengajarkan manusia membatasi eksploitasi alam demi generasi masa depan.',
      },
      {
        id: '7b',
        title: 'B. Tradisi dan Budaya Nusantara',
        summary: 'Indonesia memiliki ratusan suku dengan bahasa daerah, pakaian adat, makanan tradisional, dan rumah adat yang unik.',
        points: [
          'Rumah Adat: Rumah Gadang (Sumatra Barat), Rumah Panjang (Kalimantan Barat), Rumah Walewangko (Sulawesi Utara), Rumah Kebaya/Bapang (Betawi).',
          'Pakaian Adat: Ageman Songkok Singkepan Ageng (Keraton Surakarta), pakaian adat Dayak, Papua, dan Minangkabau.',
          'Kuliner Nusantara: Klepon di Jawa Barat disebut onde-onde di Minangkabau; rendang kaya rempah dipengaruhi akulturasi budaya.'
        ],
        comicDialogue: [
          { speaker: 'Aga', text: 'Kue bulat hijau isi gula merah ini di kampungku Sumatra Barat disebut onde-onde!' },
          { speaker: 'Dara', text: 'Di Jawa Barat kue ini disebut klepon! Nama boleh beda, tapi rasanya sama-sama enak dan memperkaya budaya kita!' }
        ],
        keyConcept: 'Perbedaan budaya bukan pemisah, melainkan kekayaan identitas bangsa Indonesia.',
      },
      {
        id: '7c',
        title: 'C. Sikap Bangga & 12 Warisan Budaya UNESCO',
        summary: 'Warisan tak benda Indonesia yang diakui UNESCO membuktikan tingginya nilai peradaban Nusantara di mata dunia.',
        points: [
          '12 Warisan UNESCO: Wayang, Keris, Batik, Seni Membatik, Angklung, Tari Saman, Noken Papua, Tari Bali, Perahu Pinisi, Pencak Silat, Gamelan, Pantun.',
          'Sikap Pelestarian: Mau mempelajari tarian/lagu daerah, bangga menggunakan batik, tidak mencemooh logat daerah teman.'
        ],
        comicDialogue: [
          { speaker: 'Ian', text: 'Keren sekali para penari menampilkan Tari Saman dengan kompak dan serasi di panggung!' },
          { speaker: 'Mia', text: 'Tari Saman dan Angklung bahkan sudah diakui dunia oleh UNESCO sebagai warisan budaya kemanusiaan!' }
        ],
        keyConcept: 'Melestarikan budaya adalah menjaga jati diri bangsa di tengah arus modernisasi.'
      }
    ],
    quiz: [
      {
        id: 'q7_1',
        question: 'Tradisi adat Sasi di Maluku dan Papua bertujuan untuk menjaga kelestarian alam dengan cara...',
        context: 'Masyarakat pesisir Maluku menerapkan larangan adat.',
        options: [
          'Membuang semua jaring nelayan ke tengah samudra',
          'Memberlakukan larangan mengambil atau memanen jenis sumber daya alam tertentu selama jangka waktu tertentu agar populasinya pulih',
          'Melarang siapa pun memakan ikan selamanya',
          'Menutup semua pelabuhan perdagangan'
        ],
        correctIndex: 1,
        explanation: 'Tradisi Sasi adalah kearifan lokal konservasi laut dan darat yang melarang pemanenan berkala agar populasi satwa berkembang biak kembali.',
        points: 20
      },
      {
        id: 'q7_2',
        question: 'Tradisi gotong royong menanam dan memanen padi bersama yang dilakukan masyarakat di Muara Enim, Sumatra Selatan bernama...',
        context: 'Hamparan sawah menguning dipanen bersama-sama.',
        options: [
          'Tradisi Bebie',
          'Tradisi Cuci Negeri Soya',
          'Tradisi Grebeg Besar',
          'Tradisi Ngaben'
        ],
        correctIndex: 0,
        explanation: 'Tradisi Bebie di Muara Enim adalah wujud gotong royong warga dalam menanam dan memanen padi secara bersama-sama penuh rasa syukur.',
        points: 20
      },
      {
        id: 'q7_3',
        question: 'Manakah di antara warisan budaya tak benda berikut yang TELAH diakui secara resmi oleh UNESCO dari Indonesia?',
        context: 'Daftar Warisan Budaya Tak Benda Dunia UNESCO.',
        options: [
          'Gamelan, Angklung, Tari Saman, dan Batik',
          'Game online luar negeri dan komik impor',
          'Mobil sport modern',
          'Lampu neon kota'
        ],
        correctIndex: 0,
        explanation: 'UNESCO mengakui 12 warisan budaya tak benda Indonesia termasuk Wayang, Keris, Batik, Angklung, Tari Saman, Noken, Pinisi, Pencak Silat, Gamelan, dan Pantun.',
        points: 20
      },
      {
        id: 'q7_4',
        question: 'Masyarakat Kampung Adat Cireundeu di Kota Cimahi memiliki kearifan lokal unik dalam ketahanan pangan, yaitu mengonsumsi makanan pokok berupa...',
        context: 'Pengolahan umbi tradisional di Kampung Adat Cireundeu.',
        options: [
          'Gandum impor',
          'Rasi (Beras Singkong)',
          'Mie instan cepat saji',
          'Jagung manis rebus'
        ],
        correctIndex: 1,
        explanation: 'Masyarakat adat Cireundeu secara turun-temurun mengonsumsi rasi (beras singkong) sebagai makanan pokok pengganti beras padi.',
        points: 20
      },
      {
        id: 'q7_5',
        question: 'Bagaimana sikap terbaik yang harus kita tunjukkan ketika teman sekelas berbicara dengan bahasa atau logat daerah asalnya?',
        context: 'Suasana kelas yang memiliki murid dari berbagai suku di Indonesia.',
        options: [
          'Menertawakannya dan meminta teman tersebut diam',
          'Menghargai keberagaman bahasa daerah dan belajar saling mengenal dengan rasa bangga',
          'Menjauhi teman tersebut saat jam istirahat',
          'Memaksa teman tersebut melupakan bahasa daerahnya'
        ],
        correctIndex: 1,
        explanation: 'Sikap saling menghormati dan toleransi terhadap kebhinekaan suku dan bahasa adalah pengamalan Profil Pelajar Pancasila.',
        points: 20
      }
    ]
  },
  {
    id: 8,
    title: 'Bab 8: Menjadi Pahlawan Lingkungan',
    shortTitle: 'Pahlawan Lingkungan',
    subtitle: 'Audit Jejak Karbon, Gerakan 4M & Pelestarian Masa Depan',
    themeColor: '#059669',
    bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
    worldZone: 'Eco Sanctuary & Green Hero Tower',
    description: 'Menjadi pahlawan lingkungan dimulai dari aksi nyata: menghitung jejak karbon, menerapkan 4M (Menolak, Mengurangi, Menggunakan Ulang, Mendaur Ulang).',
    targetCompetency: 'Menghitung estimasi emisi karbon aktivitas sehari-hari dan merancang aksi nyata 4M untuk menekan pemanasan global.',
    simulationType: 'four_m_sorter',
    badgeReward: {
      id: 'badge_pahlawan',
      title: 'Pahlawan 4M Bumi',
      description: 'Menjadi teladan nyata pemilahan sampah 4M dan penghematan karbon!',
      icon: '🛡️',
    },
    subChapters: [
      {
        id: '8a',
        title: 'A. Lingkungan Kita sedang Terancam',
        summary: 'Pencemaran udara, air, dan tanah mengancam keseimbangan ekosistem. Tumbuhan berperan krusial menyerap polusi karbon.',
        points: [
          'Pencemaran Air: Sampah plastik dan limbah rumah tangga mencemari sungai, menghilangkan akses air bersih.',
          'Pencemaran Udara: Asap kendaraan, pembakaran sampah, dan pabrik menghasilkan gas beracun yang merusak saluran pernapasan.',
          'Peran Pohon: Tumbuhan menyerap CO2 untuk fotosintesis dan menghasilkan oksigen segar pembersih udara.'
        ],
        comicDialogue: [
          { speaker: 'Banu', text: 'Setiap kali lewat jalan yang warganya membakar sampah, dadaku terasa sesak karena asapnya!' },
          { speaker: 'Mia', text: 'Betul Banu, asap pembakaran sampah sangat berbahaya. Itulah kenapa kita butuh lebih banyak pohon untuk menyaring udara kotor!' }
        ],
        keyConcept: 'Menanam pohon dan menghentikan pembakaran sampah melindungi paru-paru bumi.',
      },
      {
        id: '8b',
        title: 'B. Mengurangi Jejak Karbon (Carbon Footprint)',
        summary: 'Jejak karbon adalah total gas emisi CO2 yang dihasilkan dari aktivitas kita sehari-hari, seperti listrik dan transportasi.',
        points: [
          'Emisi Alat Rumah: AC 1 PK (480 g CO2/jam), Mobil pribadi (3.360 g CO2/jam), TV 50W (30 g CO2/jam), Laptop (100 g CO2/jam).',
          'Pemanasan Global: Suhu bumi meningkat 1°C dalam 120 tahun terakhir. Langkah kecil di rumah membuat perbedaan besar.',
          'Aksi Nyata: Mematikan lampu yang tidak terpakai, mencabut colokan charger, berjalan kaki atau bersepeda untuk jarak dekat.'
        ],
        comicDialogue: [
          { speaker: 'Aga', text: 'Ternyata mobil pribadi menghasilkan 3.360 gram karbon dioksida setiap jam pemakaian!' },
          { speaker: 'Ian', text: 'Wah banyak sekali! Jika kita bersepeda atau naik transportasi umum, kita bisa memangkas ribuan gram emisi karbon!' }
        ],
        keyConcept: 'Jejak karbon berkurang drastis dengan penghematan listrik dan transportasi hijau.',
      },
      {
        id: '8c',
        title: 'C. Gerakan 4M & Lestari Budayaku Jati Diriku',
        summary: 'Empat langkah peduli lingkungan: Menolak, Mengurangi, Menggunakan Ulang, Mendaur Ulang serta menjaga keseimbangan hidup aktif.',
        points: [
          '1. Menolak (Refuse): Menolak kantong plastik sekali pakai dan sedotan plastik; membawa botol minum & totebag sendiri.',
          '2. Mengurangi (Reduce): Menghemat pemakaian listrik, mematikan kran air saat menyikat gigi, tidak membuang makanan.',
          '3. Menggunakan Ulang (Reuse): Memanfaatkan botol bekas jadi pot bunga, mendonasikan buku & mainan ke adik kelas.',
          '4. Mendaur Ulang (Recycle): Mengumpulkan kardus dan botol plastik untuk dilebur kembali di fasilitas daur ulang.',
          'Aktivitas Fisik & Permainan Tradisional: Mengurangi waktu menatap gawai untuk bermain gobak sodor, egrang, dan lompat tali yang menyehatkan tubuh.'
        ],
        comicDialogue: [
          { speaker: 'Mia', text: 'Bawa selalu tumbler air minum sendiri ke sekolah agar kita tidak menyumbang botol plastik sekali pakai!' },
          { speaker: 'Banu', text: 'Siap Mia! Dan sore ini ayo kita main lompat tali dan bentengan di lapangan bersama teman-teman daripada terus menatap gawai!' }
        ],
        keyConcept: 'Gerakan 4M (Menolak, Mengurangi, Menggunakan Ulang, Mendaur Ulang) adalah perisai bumi.'
      }
    ],
    quiz: [
      {
        id: 'q8_1',
        question: 'Membawa botol minum (tumbler) sendiri dari rumah dan menolak sedotan plastik sekali pakai merupakan penerapan dari prinsip 4M yaitu...',
        context: 'Murid kelas 5 membawa perlengkapan bekal ramah lingkungan.',
        options: [
          'Mendaur Ulang (Recycle)',
          'Menolak (Refuse)',
          'Menghanguskan',
          'Menyimpan'
        ],
        correctIndex: 1,
        explanation: 'Menolak (Refuse) adalah tindakan awal menolak penggunaan barang sekali pakai yang tidak ramah lingkungan sejak awal.',
        points: 20
      },
      {
        id: 'q8_2',
        question: 'Berapakah estimasi emisi gas karbon dioksida (CO2) yang dihasilkan oleh mobil pribadi dalam 1 jam perjalanan?',
        context: 'Data emisi alat transportasi berdasarkan buku panduan IPAS Kelas IV/V.',
        options: [
          'Sekitar 30 gram CO2',
          'Sekitar 189 gram CO2',
          'Sekitar 3.360 gram CO2',
          '0 gram CO2'
        ],
        correctIndex: 2,
        explanation: 'Berdasarkan infografis buku, 1 jam perjalanan mobil berbahan bakar fosil menghasilkan sekitar 3.360 gram CO2.',
        points: 20
      },
      {
        id: 'q8_3',
        question: 'Tindakan menyumbangkan buku cerita atau seragam sekolah yang masih layak pakai kepada adik kelas termasuk contoh prinsip 4M...',
        context: 'Pembersihan lemari buku menjelang tahun ajaran baru.',
        options: [
          'Menggunakan Ulang (Reuse)',
          'Menolak (Refuse)',
          'Membakar',
          'Membeli Baru'
        ],
        correctIndex: 0,
        explanation: 'Menggunakan Ulang (Reuse) adalah memanfaatkan kembali barang yang masih berfungsi dengan baik tanpa harus membuangnya ke tempat sampah.',
        points: 20
      },
      {
        id: 'q8_4',
        question: 'Mengapa bermain permainan tradisional di luar ruangan (seperti bentengan, egrang, gobak sodor) lebih baik bagi anak dibanding terus-menerus bermain gawai online?',
        context: 'Aktivitas sore hari siswa di lingkungan perumahan.',
        options: [
          'Karena permainan tradisional membosankan',
          'Karena badan lebih aktif bergerak sehat, menghemat energi listrik gawai, dan menumbuhkan interaksi sosial langsung',
          'Karena permainan gawai membutuhkan air bersih',
          'Supaya tidak perlu belajar sains lagi'
        ],
        correctIndex: 1,
        explanation: 'Permainan tradisional melatih kebugaran jasmani, mengurangi jejak emisi listrik gawai, serta melestarikan budaya sosial Nusantara.',
        points: 20
      },
      {
        id: 'q8_5',
        question: 'Bagaimana peran fotosintesis tumbuhan dalam memitigasi dampak pemanasan global dan polusi udara?',
        context: 'Gerakan penghijauan menanam 1.000 bibit pohon di sekolah.',
        options: [
          'Tumbuhan menghasilkan asap tebal yang menutupi sinar matahari',
          'Tumbuhan menyerap gas karbon dioksida (polutan) dan melepaskan gas oksigen bersih ke atmosfer',
          'Tumbuhan membuat suhu bumi naik 5 derajat',
          'Tumbuhan menghentikan siklus air bumi'
        ],
        correctIndex: 1,
        explanation: 'Tumbuhan adalah penyerap alami gas karbon dioksida terbesar di daratan, mengonversinya menjadi biomassa dan melepaskan oksigen segar.',
        points: 20
      }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge_energi',
    title: 'Dynamo Master',
    description: 'Menuntaskan penyelidikan perubahan energi & fotosintesis (Bab 1)',
    icon: '⚡',
    unlocked: true,
    earnedAt: 'Hari ini',
    rarity: 'Common'
  },
  {
    id: 'badge_gaya',
    title: 'Magnetik Sakti',
    description: 'Menuntaskan eksperimen gaya gesek & dua kutub magnet (Bab 2)',
    icon: '🧲',
    unlocked: true,
    earnedAt: 'Kemarin',
    rarity: 'Common'
  },
  {
    id: 'badge_peta',
    title: 'Kartografer Sejati',
    description: 'Membaca koordinat astronomis dan bentang alam Danau Toba (Bab 3)',
    icon: '🗺️',
    unlocked: false,
    rarity: 'Rare'
  },
  {
    id: 'badge_iklim',
    title: 'Penjaga Atmosfer',
    description: 'Memahami efek rumah kaca dan kalkulasi jejak karbon (Bab 4)',
    icon: '🌡️',
    unlocked: false,
    rarity: 'Rare'
  },
  {
    id: 'badge_hayati',
    title: 'Sahabat Hayati',
    description: 'Menguasai persebaran fauna Wallacea dan sumber daya daerah (Bab 5)',
    icon: '🌿',
    unlocked: false,
    rarity: 'Epic'
  },
  {
    id: 'badge_peran',
    title: 'Warga Teladan',
    description: 'Mematuhi aturan sekolah dan mengamalkan interaksi gotong royong (Bab 6)',
    icon: '🤝',
    unlocked: false,
    rarity: 'Common'
  },
  {
    id: 'badge_budaya',
    title: 'Penjaga Tradisi',
    description: 'Memahami tradisi Sasi, Bebie, dan 12 Warisan Budaya UNESCO (Bab 7)',
    icon: '🎭',
    unlocked: false,
    rarity: 'Epic'
  },
  {
    id: 'badge_pahlawan',
    title: 'Pahlawan 4M Bumi',
    description: 'Menyelesaikan audit jejak karbon dan rencana aksi 4M lingkungan (Bab 8)',
    icon: '🛡️',
    unlocked: false,
    rarity: 'Legendary'
  },
  {
    id: 'badge_combo',
    title: 'Kombo Cendekia',
    description: 'Menjawab 5 pertanyaan kuis berturut-turut tanpa salah!',
    icon: '🔥',
    unlocked: true,
    earnedAt: 'Hari ini',
    rarity: 'Rare'
  },
  {
    id: 'badge_simulator',
    title: 'Laboran Cilik',
    description: 'Mencoba semua simulasi laboratorium sains interaktif',
    icon: '🔬',
    unlocked: false,
    rarity: 'Epic'
  }
];

export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: 'std_01',
    name: 'Banu Al-Fatih',
    nisn: '0092147812',
    characterId: 'banu',
    xp: 1450,
    coins: 380,
    completedChaptersCount: 5,
    averageScore: 92,
    chapterScores: { 1: 100, 2: 90, 3: 95, 4: 85, 5: 90, 6: 0, 7: 0, 8: 0 },
    status: 'online',
    lastActivity: 'Sedang Kuis Bab 5: Ini Khas Daerahku!',
    needsRemedial: false,
    weakTopics: [],
    parentName: 'Bambang Sudirgo, S.T.',
    parentPhone: '0812-3456-7890',
    parentCode: 'ORTU-BANU-01',
    teacherNote: 'Sangat antusias pada penyelidikan gaya dan sains alam. Pemahaman materi sangat baik.'
  },
  {
    id: 'std_02',
    name: 'Dara Anindya',
    nisn: '0092147813',
    characterId: 'dara',
    xp: 1820,
    coins: 520,
    completedChaptersCount: 7,
    averageScore: 96,
    chapterScores: { 1: 100, 2: 100, 3: 95, 4: 90, 5: 100, 6: 95, 7: 95, 8: 0 },
    status: 'online',
    lastActivity: 'Mempelajari Bab 7: Keragaman Budaya',
    needsRemedial: false,
    weakTopics: [],
    parentName: 'Dr. Kartika Maharani',
    parentPhone: '0813-8899-1122',
    parentCode: 'ORTU-DARA-02',
    teacherNote: 'Peringkat 1 kelas! Pemahaman membaca peta astronomis dan tradisi kearifan sangat tajam.'
  },
  {
    id: 'std_03',
    name: 'Ian Maulana Pratama',
    nisn: '0092147814',
    characterId: 'ian',
    xp: 1600,
    coins: 430,
    completedChaptersCount: 6,
    averageScore: 88,
    chapterScores: { 1: 95, 2: 90, 3: 85, 4: 85, 5: 85, 6: 90, 7: 0, 8: 0 },
    status: 'online',
    lastActivity: 'Simulasi Alur Energi PLTA',
    needsRemedial: false,
    weakTopics: [],
    parentName: 'Hendra Pratama',
    parentPhone: '0811-2233-4455',
    parentCode: 'ORTU-IAN-03',
    teacherNote: 'Jiwa kepemimpinan luar biasa dalam kelompok penyelidikan sains.'
  },
  {
    id: 'std_04',
    name: 'Aga Rizki Saputra',
    nisn: '0092147815',
    characterId: 'aga',
    xp: 1350,
    coins: 350,
    completedChaptersCount: 5,
    averageScore: 84,
    chapterScores: { 1: 90, 2: 100, 3: 80, 4: 75, 5: 75, 6: 0, 7: 0, 8: 0 },
    status: 'idle',
    lastActivity: 'Selesai Eksperimen Magnet Batang',
    needsRemedial: false,
    weakTopics: ['Efek Rumah Kaca'],
    parentName: 'Siti Zubaidah',
    parentPhone: '0852-7766-5544',
    parentCode: 'ORTU-AGA-04',
    teacherNote: 'Sangat menyukai fisika terapan. Perlu sedikit penguatan di materi gas rumah kaca.'
  },
  {
    id: 'std_05',
    name: 'Mia Siti Nurhaliza',
    nisn: '0092147816',
    characterId: 'mia',
    xp: 1510,
    coins: 410,
    completedChaptersCount: 6,
    averageScore: 90,
    chapterScores: { 1: 95, 2: 85, 3: 85, 4: 90, 5: 95, 6: 90, 7: 0, 8: 0 },
    status: 'online',
    lastActivity: 'Mempelajari Tradisi Sasi Maluku',
    needsRemedial: false,
    weakTopics: [],
    parentName: 'Fatimah Zahra, M.Pd.',
    parentPhone: '0819-0011-2233',
    parentCode: 'ORTU-MIA-05',
    teacherNote: 'Kreatif, gemar membuat catatan mind-map rapi dan teliti.'
  },
  {
    id: 'std_06',
    name: 'Rian Dwi Syahputra',
    nisn: '0092147817',
    characterId: 'banu',
    xp: 680,
    coins: 140,
    completedChaptersCount: 2,
    averageScore: 58,
    chapterScores: { 1: 60, 2: 55, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
    status: 'offline',
    lastActivity: 'Gagal Kuis Bab 2: Gaya Gesek',
    needsRemedial: true,
    weakTopics: ['Hukum Kekekalan Energi', 'Sifat Gaya Gesek & Roda', 'Gaya Magnet'],
    parentName: 'Agus Syahputra',
    parentPhone: '0812-9988-7766',
    parentCode: 'ORTU-RIAN-06',
    teacherNote: 'PERHATIAN: Nilai kuis Bab 1 & 2 di bawah KKM 70. Butuh pendampingan khusus dan bimbingan orang tua di rumah.'
  },
  {
    id: 'std_07',
    name: 'Lestari Ayu Ningtyas',
    nisn: '0092147818',
    characterId: 'dara',
    xp: 750,
    coins: 180,
    completedChaptersCount: 3,
    averageScore: 62,
    chapterScores: { 1: 65, 2: 60, 3: 60, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
    status: 'idle',
    lastActivity: 'Membaca Bab 3: Garis Astronomis',
    needsRemedial: true,
    weakTopics: ['Garis Lintang vs Bujur', 'Komponen Peta & Skala'],
    parentName: 'Supriyati',
    parentPhone: '0878-1234-5678',
    parentCode: 'ORTU-LESTARI-07',
    teacherNote: 'PERHATIAN: Kesulitan membaca simbol koordinat peta. Disarankan mengulang simulasi lintang bujur.'
  },
  {
    id: 'std_08',
    name: 'Fikri Haikal',
    nisn: '0092147819',
    characterId: 'ian',
    xp: 1220,
    coins: 310,
    completedChaptersCount: 4,
    averageScore: 78,
    chapterScores: { 1: 85, 2: 75, 3: 75, 4: 75, 5: 0, 6: 0, 7: 0, 8: 0 },
    status: 'online',
    lastActivity: 'Sedang Membaca Bab 5: Zona Asiatis',
    needsRemedial: false,
    weakTopics: ['Perhitungan Jejak Karbon'],
    parentName: 'Haikal Basri',
    parentPhone: '0853-4455-6677',
    parentCode: 'ORTU-FIKRI-08',
    teacherNote: 'Progres stabil di atas KKM. Disarankan melatih kuis interaktif secara berkala.'
  }
];
