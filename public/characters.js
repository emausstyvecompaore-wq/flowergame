// Base de données des 12 personnages de biscuits (Saison 1 : Les Gardiens d'Amani)
const CHARACTERS = [
  {
    id: "kofi",
    code: "BISCUIT-KOFI-01",
    number: "01",
    name: "Kofi",
    title: "Le Fauve Vif-Argent",
    rarity: "Épique",
    rarityClass: "epic",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #fde68a 100%)",
    element: "Vent & Savane",
    kingdom: "Plateaux Célestes",
    role: "Capitaine des Héros",
    quote: "Le vent ne recule jamais, et moi non plus ! En avant !",
    power: "Onde Sonique & Super Vitesse",
    votes: 342,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kofi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="50%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
          <radialGradient id="kofi-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#b45309" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="110" r="85" fill="url(#kofi-aura)"/>
        <!-- Crinière stylisée / Coiffe fauve -->
        <path d="M45,130 C30,90 50,40 100,35 C150,40 170,90 155,130 C170,170 140,210 100,215 C60,210 30,170 45,130 Z" fill="#92400e"/>
        <path d="M55,120 C42,85 62,50 100,48 C138,50 158,85 145,120 C155,160 130,195 100,200 C70,195 45,160 55,120 Z" fill="url(#kofi-gold)"/>
        <!-- Visage -->
        <ellipse cx="100" cy="115" rx="42" ry="48" fill="#78350f"/>
        <!-- Peintures de guerre dorées -->
        <path d="M72,95 L65,115 L78,110 Z" fill="#fde68a"/>
        <path d="M128,95 L135,115 L122,110 Z" fill="#fde68a"/>
        <!-- Yeux dorés intenses -->
        <ellipse cx="85" cy="105" rx="8" ry="6" fill="#fef08a"/>
        <circle cx="86" cy="105" r="3.5" fill="#1e1b4b"/>
        <circle cx="88" cy="103" r="1.5" fill="#ffffff"/>
        <ellipse cx="115" cy="105" rx="8" ry="6" fill="#fef08a"/>
        <circle cx="114" cy="105" r="3.5" fill="#1e1b4b"/>
        <circle cx="116" cy="103" r="1.5" fill="#ffffff"/>
        <!-- Sourcils déterminés -->
        <path d="M75,94 Q85,92 92,97" stroke="#451a03" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M125,94 Q115,92 108,97" stroke="#451a03" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <!-- Nez & Museau félin -->
        <polygon points="100,120 95,128 105,128" fill="#451a03"/>
        <!-- Sourire confiant -->
        <path d="M92,136 Q100,144 108,136" stroke="#fde68a" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- Collier Kente & Pendentif Griffe Dorée -->
        <path d="M68,160 Q100,185 132,160 L140,200 Q100,225 60,200 Z" fill="#b45309"/>
        <polygon points="100,182 108,198 92,198" fill="#fde68a"/>
        <!-- Éclairs de vent -->
        <path d="M25,50 L40,70 L32,73 L48,98" stroke="#fde68a" stroke-width="2.5" fill="none" opacity="0.8"/>
        <path d="M175,50 L160,70 L168,73 L152,98" stroke="#fde68a" stroke-width="2.5" fill="none" opacity="0.8"/>
      </svg>
    `
  },
  {
    id: "amina",
    code: "BISCUIT-AMINA-02",
    number: "02",
    name: "Amina",
    title: "La Reine de la Pluie",
    rarity: "Légendaire",
    rarityClass: "legendary",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #a5f3fc 100%)",
    element: "Eau Vivante",
    kingdom: "Brumes du Nil Vert",
    role: "Héroïne & Stratège",
    quote: "L'eau semble douce, mais elle fend les rochers les plus durs !",
    power: "Danse des Mille Ruisseaux & Barrière Aqueuse",
    votes: 512,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="amina-water" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="50%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#bae6fd"/>
          </linearGradient>
        </defs>
        <circle cx="100" cy="110" r="85" fill="#0891b2" opacity="0.25"/>
        <!-- Diadème & Gouttes d'eau flottantes -->
        <circle cx="100" cy="40" r="9" fill="#38bdf8"/>
        <circle cx="65" cy="55" r="6" fill="#7dd3fc"/>
        <circle cx="135" cy="55" r="6" fill="#7dd3fc"/>
        <!-- Chevelure tressée turquoise royale -->
        <path d="M50,90 Q40,160 55,210 Q70,220 75,170 Q80,100 80,85 Z" fill="#0369a1"/>
        <path d="M150,90 Q160,160 145,210 Q130,220 125,170 Q120,100 120,85 Z" fill="#0369a1"/>
        <ellipse cx="100" cy="85" rx="50" ry="38" fill="#075985"/>
        <!-- Visage -->
        <ellipse cx="100" cy="115" rx="38" ry="44" fill="#451a03"/>
        <!-- Couronne de perles et cauris -->
        <path d="M68,85 Q100,75 132,85" stroke="#38bdf8" stroke-width="5" fill="none"/>
        <polygon points="100,68 94,80 106,80" fill="#bae6fd"/>
        <!-- Yeux azurs profonds -->
        <ellipse cx="86" cy="112" rx="7" ry="5.5" fill="#38bdf8"/>
        <circle cx="87" cy="112" r="3" fill="#082f49"/>
        <circle cx="88" cy="110" r="1.5" fill="#ffffff"/>
        <ellipse cx="114" cy="112" rx="7" ry="5.5" fill="#38bdf8"/>
        <circle cx="113" cy="112" r="3" fill="#082f49"/>
        <circle cx="114" cy="110" r="1.5" fill="#ffffff"/>
        <!-- Perles de cauris pendantes -->
        <ellipse cx="62" cy="120" rx="4" ry="7" fill="#f0fdf4"/>
        <ellipse cx="138" cy="120" rx="4" ry="7" fill="#f0fdf4"/>
        <!-- Lèvres et sourire serein -->
        <path d="M93,138 Q100,143 107,138" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <!-- Drapé impérial aquatique -->
        <path d="M65,165 Q100,185 135,165 L150,225 L50,225 Z" fill="url(#amina-water)"/>
      </svg>
    `
  },
  {
    id: "bayo",
    code: "BISCUIT-BAYO-03",
    number: "03",
    name: "Bayo",
    title: "L'Artisan Solaire",
    rarity: "Rare",
    rarityClass: "rare",
    color: "#f97316",
    gradient: "linear-gradient(135deg, #c2410c 0%, #f97316 50%, #fed7aa 100%)",
    element: "Feu & Métal",
    kingdom: "Forges d'Oyo",
    role: "Inventeur & Génie Comique",
    quote: "Donnez-moi 10 secondes et du soleil, et je vous construis un aéronef !",
    power: "Étincelle d'Ingéniosité Solaire",
    votes: 289,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#f97316" opacity="0.2"/>
        <!-- Lunettes d'alchimiste cuivre sur le front -->
        <rect x="65" y="70" width="30" height="24" rx="8" fill="#b45309" stroke="#fed7aa" stroke-width="3"/>
        <rect x="105" y="70" width="30" height="24" rx="8" fill="#b45309" stroke="#fed7aa" stroke-width="3"/>
        <line x1="95" y1="82" x2="105" y2="82" stroke="#fed7aa" stroke-width="3"/>
        <circle cx="80" cy="82" r="7" fill="#fef08a" opacity="0.8"/>
        <circle cx="120" cy="82" r="7" fill="#fef08a" opacity="0.8"/>
        <!-- Visage malicieux -->
        <ellipse cx="100" cy="122" rx="40" ry="44" fill="#713f12"/>
        <!-- Yeux rieurs -->
        <path d="M78,115 Q86,110 94,115" stroke="#fed7aa" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M106,115 Q114,110 122,115" stroke="#fed7aa" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <!-- Nez rond et tâche de suie -->
        <circle cx="100" cy="126" r="6" fill="#451a03"/>
        <ellipse cx="112" cy="130" rx="5" ry="3" fill="#1c1917" opacity="0.6"/>
        <!-- Grand sourire farceur -->
        <path d="M85,138 Q100,154 115,138" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="#b45309"/>
        <!-- Tablier d'inventeur avec boulons solaires -->
        <path d="M60,170 L140,170 L135,225 L65,225 Z" fill="#ea580c"/>
        <circle cx="85" cy="190" r="4" fill="#fef08a"/>
        <circle cx="115" cy="190" r="4" fill="#fef08a"/>
      </svg>
    `
  },
  {
    id: "zola",
    code: "BISCUIT-ZOLA-04",
    number: "04",
    name: "Zola",
    title: "La Fée Baobab",
    rarity: "Commune",
    rarityClass: "common",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #15803d 0%, #22c55e 50%, #bbf7d0 100%)",
    element: "Terre & Végétal",
    kingdom: "Forêt d'Ébène",
    role: "Guérisseuse & Amie des Esprits",
    quote: "Écoute le murmure de la terre... elle a tant de secrets à nous révéler.",
    power: "Souffle de Renaissance & Lianes Protectrices",
    votes: 195,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#22c55e" opacity="0.2"/>
        <!-- Couronne de feuilles de baobab & fleur d'hibiscus -->
        <circle cx="130" cy="72" r="12" fill="#ef4444"/>
        <circle cx="130" cy="72" r="5" fill="#fef08a"/>
        <path d="M60,75 Q100,55 140,75" stroke="#16a34a" stroke-width="6" stroke-linecap="round" fill="none"/>
        <!-- Visage doux -->
        <ellipse cx="100" cy="118" rx="38" ry="42" fill="#582d1d"/>
        <!-- Yeux vert émeraude -->
        <ellipse cx="85" cy="115" rx="7" ry="6" fill="#86efac"/>
        <circle cx="85" cy="115" r="3" fill="#052e16"/>
        <ellipse cx="115" cy="115" rx="7" ry="6" fill="#86efac"/>
        <circle cx="115" cy="115" r="3" fill="#052e16"/>
        <!-- Sourire bienveillant -->
        <path d="M92,138 Q100,144 108,138" stroke="#bbf7d0" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <!-- Robe feuillage sacrée -->
        <path d="M65,165 Q100,180 135,165 L145,225 L55,225 Z" fill="#15803d"/>
      </svg>
    `
  },
  {
    id: "tariq",
    code: "BISCUIT-TARIQ-05",
    number: "05",
    name: "Tariq",
    title: "L'Acrobate des Sables",
    rarity: "Rare",
    rarityClass: "rare",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #bfdbfe 100%)",
    element: "Vent & Mirages",
    kingdom: "Plateaux du Sahel",
    role: "Voltigeur & Messager Nomade",
    quote: "Tu as cligné des yeux ? J'étais déjà à l'autre bout de la cité !",
    power: "Mirage Éolien & Esquive Absolue",
    votes: 274,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#3b82f6" opacity="0.2"/>
        <!-- Chèche touareg indigo enveloppant -->
        <path d="M50,70 Q100,45 150,70 Q160,110 150,150 Q100,175 50,150 Z" fill="#1e3a8a"/>
        <!-- Fente du regard intense -->
        <ellipse cx="100" cy="108" rx="36" ry="16" fill="#713f12"/>
        <ellipse cx="86" cy="108" rx="6" ry="4" fill="#93c5fd"/>
        <circle cx="86" cy="108" r="2.5" fill="#0f172a"/>
        <ellipse cx="114" cy="108" rx="6" ry="4" fill="#93c5fd"/>
        <circle cx="114" cy="108" r="2.5" fill="#0f172a"/>
        <!-- Voile flottant dans le vent du désert -->
        <path d="M55,145 Q80,190 145,170 Q150,225 60,225 Z" fill="#2563eb"/>
      </svg>
    `
  },
  {
    id: "nia-kibo",
    code: "BISCUIT-NIA-06",
    number: "06",
    name: "Nia & Kibo",
    title: "Le Duo au Pangolin Doré",
    rarity: "Commune",
    rarityClass: "common",
    color: "#eab308",
    gradient: "linear-gradient(135deg, #a16207 0%, #eab308 50%, #fef08a 100%)",
    element: "Terre & Protection",
    kingdom: "Forêt d'Ébène",
    role: "Cadette Curieuse & Mascotte Protectrice",
    quote: "Kibo, debout ! C'est l'heure de rouler vers la victoire !",
    power: "Boule de Comète Indestructible",
    votes: 388,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#eab308" opacity="0.2"/>
        <!-- Nia (visage jeune et expressif) -->
        <ellipse cx="85" cy="115" rx="34" ry="38" fill="#653520"/>
        <!-- Couettes perlées -->
        <circle cx="50" cy="90" r="14" fill="#1c1917"/>
        <circle cx="50" cy="90" r="5" fill="#facc15"/>
        <circle cx="120" cy="90" r="14" fill="#1c1917"/>
        <circle cx="120" cy="90" r="5" fill="#facc15"/>
        <!-- Yeux pétillants de Nia -->
        <circle cx="75" cy="112" r="5" fill="#ffffff"/>
        <circle cx="76" cy="112" r="3" fill="#1c1917"/>
        <circle cx="95" cy="112" r="5" fill="#ffffff"/>
        <circle cx="96" cy="112" r="3" fill="#1c1917"/>
        <!-- Kibo le petit pangolin doré sur l'épaule -->
        <ellipse cx="140" cy="145" rx="28" ry="24" fill="#ca8a04"/>
        <circle cx="155" cy="135" r="12" fill="#eab308"/>
        <!-- Écailles dorées géométriques -->
        <path d="M125,145 Q135,135 145,145 Q155,135 165,145" stroke="#fef08a" stroke-width="3" fill="none"/>
        <circle cx="160" cy="132" r="2.5" fill="#0f172a"/>
      </svg>
    `
  },
  {
    id: "mansa",
    code: "BISCUIT-MANSA-07",
    number: "07",
    name: "Mansa Osei",
    title: "Le Gardien d'Or Ancestral",
    rarity: "Légendaire",
    rarityClass: "legendary",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #78350f 0%, #d97706 50%, #fef3c7 100%)",
    element: "Cosmos & Or Sacré",
    kingdom: "Forêt des Rois",
    role: "Le Sage Mentor Mythique",
    quote: "La vraie richesse d'un peuple n'est pas son or, mais le courage de ses enfants.",
    power: "Lumière Purificatrice Céleste",
    votes: 490,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#f59e0b" opacity="0.3"/>
        <!-- Couronne royale d'or sculptée -->
        <path d="M55,60 L75,30 L100,50 L125,30 L145,60 Z" fill="#fbbf24" stroke="#78350f" stroke-width="3"/>
        <circle cx="100" cy="48" r="6" fill="#ef4444"/>
        <!-- Visage vénérable -->
        <ellipse cx="100" cy="110" rx="38" ry="46" fill="#582d1d"/>
        <!-- Barbe blanche taillée ornée d'anneaux d'or -->
        <path d="M75,135 Q100,195 125,135 Z" fill="#f1f5f9"/>
        <rect x="94" y="160" width="12" height="6" rx="2" fill="#f59e0b"/>
        <!-- Yeux empreints de sagesse infinie -->
        <ellipse cx="85" cy="105" rx="6" ry="4.5" fill="#fef08a"/>
        <circle cx="85" cy="105" r="2.5" fill="#451a03"/>
        <ellipse cx="115" cy="105" rx="6" ry="4.5" fill="#fef08a"/>
        <circle cx="115" cy="105" r="2.5" fill="#451a03"/>
        <!-- Étole d'or tissée royale -->
        <path d="M50,170 Q100,200 150,170 L160,225 L40,225 Z" fill="#d97706"/>
      </svg>
    `
  },
  {
    id: "yara",
    code: "BISCUIT-YARA-08",
    number: "08",
    name: "Yara",
    title: "La Danseuse de Braise",
    rarity: "Épique",
    rarityClass: "epic",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #991b1b 0%, #ef4444 50%, #fecaca 100%)",
    element: "Feu & Rythme",
    kingdom: "Forges d'Oyo",
    role: "Guerrière Rythmique & Artiste",
    quote: "Si le rythme n'est pas dans ton cœur, tes pieds ne sauront jamais où aller !",
    power: "Rythme du Volcan & Tambours Incandescents",
    votes: 310,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#ef4444" opacity="0.25"/>
        <!-- Flammes d'énergie en arrière plan -->
        <path d="M70,40 Q90,15 100,45 Q110,15 130,40" stroke="#fca5a5" stroke-width="4" fill="none"/>
        <!-- Visage fier et déterminé -->
        <ellipse cx="100" cy="115" rx="38" ry="44" fill="#713f12"/>
        <!-- Peintures de braise rouge vif -->
        <path d="M70,105 Q85,115 70,125" stroke="#ef4444" stroke-width="3" fill="none"/>
        <path d="M130,105 Q115,115 130,125" stroke="#ef4444" stroke-width="3" fill="none"/>
        <!-- Yeux flamboyants -->
        <ellipse cx="85" cy="108" rx="7" ry="5" fill="#fca5a5"/>
        <circle cx="85" cy="108" r="3" fill="#450a0a"/>
        <ellipse cx="115" cy="108" rx="7" ry="5" fill="#fca5a5"/>
        <circle cx="115" cy="108" r="3" fill="#450a0a"/>
        <!-- Tambours de poignet mystiques -->
        <circle cx="45" cy="170" r="14" fill="#b91c1c" stroke="#fca5a5" stroke-width="2.5"/>
        <circle cx="155" cy="170" r="14" fill="#b91c1c" stroke="#fca5a5" stroke-width="2.5"/>
      </svg>
    `
  },
  {
    id: "djemba",
    code: "BISCUIT-DJEMBA-09",
    number: "09",
    name: "Djemba",
    title: "Le Colosse d'Argile",
    rarity: "Rare",
    rarityClass: "rare",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #6b21a8 0%, #a855f7 50%, #f3e8ff 100%)",
    element: "Argile & Eaux Vives",
    kingdom: "Brumes du Nil Vert",
    role: "Le Grand Frère Protecteur",
    quote: "Personne ne touche à mes amis tant que je serai debout !",
    power: "Rempart Immuable & Force Tellurique",
    votes: 245,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#a855f7" opacity="0.2"/>
        <!-- Colosse robuste -->
        <ellipse cx="100" cy="120" rx="46" ry="48" fill="#582d1d"/>
        <!-- Peinture blanche sacrée sur le front et joues -->
        <circle cx="100" cy="95" r="7" fill="#ffffff"/>
        <line x1="75" y1="125" x2="65" y2="135" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <line x1="125" y1="125" x2="135" y2="135" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <!-- Yeux doux et bienveillants -->
        <ellipse cx="85" cy="110" rx="6" ry="4" fill="#f3e8ff"/>
        <circle cx="85" cy="110" r="2.5" fill="#2e1065"/>
        <ellipse cx="115" cy="110" rx="6" ry="4" fill="#f3e8ff"/>
        <circle cx="115" cy="110" r="2.5" fill="#2e1065"/>
        <!-- Bouclier sculpté d'hippopotame -->
        <path d="M50,175 Q100,210 150,175 L155,225 L45,225 Z" fill="#7e22ce"/>
      </svg>
    `
  },
  {
    id: "asha",
    code: "BISCUIT-ASHA-10",
    number: "10",
    name: "Asha",
    title: "L'Oracle Stellaire",
    rarity: "Épique",
    rarityClass: "epic",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #3730a3 0%, #6366f1 50%, #e0e7ff 100%)",
    element: "Étoiles & Constellations",
    kingdom: "Plateaux du Sahel",
    role: "Astronome Mystique & Visionnaire",
    quote: "Les étoiles ont déjà écrit notre victoire, il ne nous reste plus qu'à la vivre !",
    power: "Alignement Cosmique & Flash Éblouissant",
    votes: 367,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#6366f1" opacity="0.25"/>
        <!-- Voile céleste bleu nuit constellation -->
        <path d="M55,60 Q100,35 145,60 Q160,130 145,190 Q100,210 55,190 Z" fill="#1e1b4b"/>
        <!-- Constellations étincelantes sur le voile -->
        <circle cx="75" cy="80" r="2.5" fill="#fde047"/>
        <circle cx="95" cy="65" r="2" fill="#fde047"/>
        <line x1="75" y1="80" x2="95" y2="65" stroke="#fde047" stroke-width="1"/>
        <circle cx="125" cy="85" r="3" fill="#fde047"/>
        <!-- Visage mystique -->
        <ellipse cx="100" cy="120" rx="36" ry="42" fill="#78350f"/>
        <!-- Yeux étoilés -->
        <polygon points="85,108 87,113 92,113 88,116 90,121 85,118 80,121 82,116 78,113 83,113" fill="#e0e7ff"/>
        <polygon points="115,108 117,113 122,113 118,116 120,121 115,118 110,121 112,116 108,113 113,113" fill="#e0e7ff"/>
      </svg>
    `
  },
  {
    id: "pao",
    code: "BISCUIT-PAO-11",
    number: "11",
    name: "Pao",
    title: "Le Caméléon d'Énergie",
    rarity: "Commune",
    rarityClass: "common",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #047857 0%, #10b981 50%, #a7f3d0 100%)",
    element: "Prisme & Réflexion",
    kingdom: "Brumes du Nil Vert",
    role: "Mascotte Facétieuse & Comique",
    quote: "Krrr-Krrr-Plic ! (Un clin d'œil malicieux pour tout désamorcer)",
    power: "Camouflage Prismatique & Aspiration Magique",
    votes: 412,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#10b981" opacity="0.2"/>
        <!-- Corps de caméléon coloré -->
        <ellipse cx="100" cy="115" rx="55" ry="45" fill="#10b981"/>
        <!-- Queue en spirale -->
        <path d="M48,135 Q25,145 35,165 Q45,175 55,160" stroke="#059669" stroke-width="7" stroke-linecap="round" fill="none"/>
        <!-- Grands yeux comiques indépendants -->
        <circle cx="85" cy="100" r="16" fill="#34d399" stroke="#065f46" stroke-width="3"/>
        <circle cx="85" cy="100" r="6" fill="#064e3b"/>
        <circle cx="87" cy="98" r="2.5" fill="#ffffff"/>
        <circle cx="125" cy="100" r="16" fill="#34d399" stroke="#065f46" stroke-width="3"/>
        <circle cx="127" cy="103" r="6" fill="#064e3b"/>
        <circle cx="129" cy="101" r="2.5" fill="#ffffff"/>
        <!-- Petite écharpe traditionnelle africaine -->
        <path d="M70,145 Q100,165 130,145" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" fill="none"/>
      </svg>
    `
  },
  {
    id: "malik",
    code: "BISCUIT-MALIK-12",
    number: "12",
    name: "Malik",
    title: "Le Faucon de Foudre",
    rarity: "Légendaire",
    rarityClass: "legendary",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #8b5cf6 50%, #ddd6fe 100%)",
    element: "Foudre Sombre & Ciel Nocturne",
    kingdom: "Forges d'Oyo",
    role: "Le Rival Solitaire (Arc de Rédemption)",
    quote: "L'ombre n'est pas mon ennemie, elle est mon armure.",
    power: "Griffe de Foudre Pourpre & Vol Silencieux",
    votes: 538,
    avatarSvg: `
      <svg viewBox="0 0 200 240" class="character-illustration" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="110" r="85" fill="#8b5cf6" opacity="0.25"/>
        <!-- Éclairs pourpres célestes -->
        <path d="M35,45 L50,75 L42,78 L60,110" stroke="#c084fc" stroke-width="3" fill="none"/>
        <path d="M165,45 L150,75 L158,78 L140,110" stroke="#c084fc" stroke-width="3" fill="none"/>
        <!-- Capuche plumes de faucon noir et violet -->
        <path d="M50,70 Q100,30 150,70 Q165,130 145,175 Q100,195 55,175 Z" fill="#2e1065"/>
        <!-- Visage ténébreux et altier -->
        <ellipse cx="100" cy="115" rx="35" ry="42" fill="#582d1d"/>
        <!-- Yeux perçants ultraviolets -->
        <ellipse cx="85" cy="110" rx="7" ry="4.5" fill="#c084fc"/>
        <circle cx="85" cy="110" r="2.5" fill="#3b0764"/>
        <circle cx="86" cy="109" r="1.5" fill="#ffffff"/>
        <ellipse cx="115" cy="110" rx="7" ry="4.5" fill="#c084fc"/>
        <circle cx="115" cy="110" r="2.5" fill="#3b0764"/>
        <circle cx="116" cy="109" r="1.5" fill="#ffffff"/>
        <!-- Regard fier et silencieux -->
        <path d="M78,103 L92,107" stroke="#c084fc" stroke-width="2.5"/>
        <path d="M122,103 L108,107" stroke="#c084fc" stroke-width="2.5"/>
      </svg>
    `
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CHARACTERS };
}
