export interface WizardMemberData {
  id: string;
  fileNumber: string;
  name: string;
  role: string;
  house: 'GRYFFINDOR' | 'SLYTHERIN' | 'RAVENCLAW' | 'HUFFLEPUFF';
  houseTag?: string;
  houseColor: string;
  accentColor: string;
  entryDirection: 'left' | 'right';
  videoSrc: string;
  videoWebm?: string;
  posterSrc: string;
  shortBio: string;
  technicalGroupTitle?: string;
  technicalAchievements: string[];
  beyondCodeAchievements: string[];
  signatureSpell?: string;
  signatureSpellSubtitle?: string;
  closingLine: string;
  wandSpecs?: string;
  houseMotto?: string;
  socialLinks?: {
    email?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export const TEAM_MEMBERS: WizardMemberData[] = [
  {
    id: 'gautam-chipkar',
    fileNumber: 'HORCRUX / WIZARD FILE 001',
    name: 'GAUTAM N CHIPKAR',
    role: 'TEAM LEAD · THE BUILDER',
    house: 'GRYFFINDOR',
    houseTag: 'GRYFFINDOR',
    houseColor: '#c0392b',
    accentColor: '#d4af37',
    entryDirection: 'left',
    videoSrc: '/team/gautam/gautam-wizard-source.mp4',
    videoWebm: '/team/gautam/gautam-wizard-transparent.webm',
    posterSrc: '/team/gautam/gautam-portrait-fallback.png',
    shortBio:
      'AI engineer, builder, and competitive problem-solver. Turning ambitious ideas into working systems and showing up when the stakes are high.',
    technicalGroupTitle: 'TECHNICAL FEATS & RECORD',
    technicalAchievements: [
      '4× National-Level Hackathon Finalist',
      'Built and shipped multiple AI tools for business use',
      'Semi-finalist — The Economic Times AI Hackathon 2.0',
      'Open-source contributor to projects associated with Vercel, Airbnb, and Model Context Protocol',
      '200+ day GitHub streak, solving bugs and building projects'
    ],
    beyondCodeAchievements: [
      'Won university-level ad-making competitions twice during IEEE Week',
      'Helped organize events alongside Inferno.asia and NotOnlineClub'
    ],
    signatureSpell: 'Architecto Maxima',
    closingLine: '“New arena. New competition. We\'re here to win.”',
    wandSpecs: '12½” Elder Wood · Dragon Heartstring Core',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/gautam-n-chipkar',
      github: 'https://github.com/gee-46/',
      portfolio: 'https://gautamnc-portfolio.vercel.app/'
    }
  },
  {
    id: 'amra-qureshi',
    fileNumber: 'HORCRUX / WIZARD FILE 002',
    name: 'AMRA K. QURESHI',
    role: 'THE AI ALCHEMIST · WIZARD OF INTELLIGENT SYSTEMS',
    house: 'HUFFLEPUFF',
    houseTag: 'HUFFLEPUFF — HOUSE TO BE CONFIRMED',
    houseColor: '#e5a93b',
    accentColor: '#ffd978',
    entryDirection: 'right',
    videoSrc: '/team/amra/amra-wizard-source.mp4',
    videoWebm: '/team/amra/amra-wizard-transparent.webm',
    posterSrc: '/team/amra/amra-portrait-fallback.png',
    shortBio:
      'Turning curious ideas into intelligent systems. Blending AI, creativity, and a little unconventional thinking to build solutions that actually matter.',
    technicalGroupTitle: 'TECHNICAL FEATS & MAGICAL INVENTIONS',
    technicalAchievements: [
      'Paw Care 🐾 — The Veterinary AI Companion: Built an AI-powered veterinary assistant using Google Gemini, RAG, and ChromaDB to deliver context-aware pet health guidance.',
      'LocalHire ✨ — The Employment Enchantment: Designed a smart hiring platform connecting local job seekers with employers through job discovery, applications, and recruitment management.',
      'AI/ML Intern — CodeAlpha: Explored AI chatbots and computer vision applications.',
      'Smart India Hackathon: Team shortlisted among the Top 40 out of 100 participating teams.',
      'The Economic Times AI Hackathon: Participant.'
    ],
    beyondCodeAchievements: [
      'Creativity is my superpower — finding fresh approaches when the obvious solution doesn\'t cut it.',
      'From pet-care AI to local employment, I enjoy building technology around real human needs.',
      'A curious mind, a collaborative spirit, and the ability to adapt when the challenge changes.',
      'Outside the lab: cooking, baking, puzzles, travelling, fashion, and helping others.'
    ],
    signatureSpell: 'Intelligencia Maxima! ✨',
    closingLine: '“Give me a problem, a little creative freedom, and a keyboard. We\'ll find the magic — or build the solution ourselves.”',
    wandSpecs: 'Elder Wand · Phoenix Feather Core',
    socialLinks: {
      email: 'amraqureshi67@gmail.com',
      github: 'https://github.com/amraqureshi',
      linkedin: 'https://linkedin.com/in/amra-qureshi-5b7756369'
    }
  },
  {
    id: 'jonathan-david',
    fileNumber: 'HORCRUX / WIZARD FILE 003',
    name: 'JONATHAN JOHN DAVID',
    role: 'MODEL TRAINER · RLHF SPECIALIST',
    house: 'RAVENCLAW',
    houseTag: 'RAVENCLAW',
    houseColor: '#2575fc',
    accentColor: '#d4af37',
    entryDirection: 'left',
    videoSrc: '/team/jonathan/jonathan-wizard-source.mp4',
    videoWebm: '/team/jonathan/jonathan-wizard-transparent.webm',
    posterSrc: '/team/jonathan/jonathan-portrait-fallback.png',
    shortBio:
      'Teaching intelligence to think better, one interaction at a time. Blending human feedback, generative AI, and prompt engineering to shape smarter, more useful AI systems.',
    technicalGroupTitle: 'TECHNICAL FEATS & RECORD',
    technicalAchievements: [
      '3× National-Level Hackathon Finalist — Proven problem-solving under pressure across competitive innovation challenges.',
      '2nd Runner-Up — Anveshan National-Level Hackathon — Recognized for innovation and teamwork on a national stage.',
      'RLHF Specialist — Focused on Reinforcement Learning from Human Feedback and improving AI responses through human-guided evaluation.',
      'Generative AI & Prompt Engineering — Exploring ways to guide AI models toward more relevant, reliable, and useful outputs.',
      'Open-Source Contributor — Contributing to collaborative development and the wider developer community.'
    ],
    beyondCodeAchievements: [
      'The Event Architect — Experienced in organizing events in Dandeli, helping bring people together and turn plans into memorable experiences.',
      'The Team Connector — Believes great results come from clear communication, collaboration, and bringing different strengths together.',
      'Calm Under Pressure — Hackathons and event coordination have taught me to adapt quickly, think on my feet, and keep moving when challenges appear.',
      'Curiosity Is My Compass — Always looking to learn, experiment, and discover better ways to solve problems.'
    ],
    signatureSpell: 'Humanitas Intelligencia ✨',
    closingLine: '“Technology may create the possibilities, but human insight gives them direction.”',
    wandSpecs: 'Elder Wand · Phoenix Feather Core',
    houseMotto: 'THE RAVENCLAW CODE: Think deeply. Build intelligently. Collaborate fearlessly.'
  },
  {
    id: 'tanushree-kavalapure',
    fileNumber: 'HORCRUX / WIZARD FILE 004',
    name: 'TANUSHREE KAVALAPURE',
    role: 'THE AI INNOVATOR · THE STRATEGIST',
    house: 'SLYTHERIN',
    houseTag: 'SLYTHERIN',
    houseColor: '#10b981',
    accentColor: '#cbd5e1',
    entryDirection: 'right',
    videoSrc: '/team/tanushree/tanushree-slytherin.mp4',
    videoWebm: '/team/tanushree/tanushree-wizard-transparent.webm',
    posterSrc: '/team/tanushree/tanushree-portrait-fallback.png',
    shortBio:
      'Driven by ambition and unconventional thinking, blending intelligent systems with creative leadership. Equally at home solving technical challenges, challenging perspectives, and turning ambitious ideas into reality.',
    technicalGroupTitle: 'TECHNICAL FEATS & RECORD',
    technicalAchievements: [
      'First Hackathon. Third Place. — Made a debut at the IEEE Anveshan National-Level Hackathon, securing 3rd place and advancing to Round 2.',
      'North Karnataka’s Only Selected Team in Its Track. — Stood out at Anveshan as the only team selected in its track from across North Karnataka.',
      'Round 2 Qualifier. — Advanced to the second round of Yugantar DevForge with a Speech-to-Text web application.',
      'AI for Social Good. — Built AI-powered web applications for Mental Health & Wellbeing and Speech-to-Text technology.'
    ],
    beyondCodeAchievements: [
      'The Silver Tongue — Two-time inter-college debate awardee, recognised for persuasive communication and sharp argumentation.',
      'The Mind Behind the Motion — Event Lead and Execom Member, IEEE Student Branch, SGBIT, bringing people and ideas into action.',
      'The Eye for the Unseen — SAC Member, NKSS IEEE Design Committee, contributing a creative perspective to the technical community.',
      'The Voice of the Assembly — Organised Sansad Samvaad, an AP-style debate competition.',
      'The Spark of Disruption — Conducted Reverse Coding during IEEE Week and helped organise an Innovation & Design Thinking exhibition for first-year students.',
      'The Force Behind the Scenes — Volunteered at the NKSS IEEE Industry Summit in Belagavi and contributed to IEEE Week activities.'
    ],
    signatureSpell: 'Audacia Mentis',
    signatureSpellSubtitle: 'The Courage of the Mind',
    closingLine: '“Question what exists. Imagine what doesn\'t. Then find a way to make it real.”',
    wandSpecs: 'Elder Wand · Basilisk Horn Core'
  }
];
