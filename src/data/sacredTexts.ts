// Sacred Quranic Duas & Haram Signboards Database for Instant High-Accuracy AR Recognition

export interface SacredTextItem {
  id: string;
  category: "dua" | "signboard" | "quran";
  title: string;
  arabicFull: string;
  arabicNormalized: string;
  keywords: string[];
  reference?: string;
  translation_gu: string;
  pronunciation_gu: string;
  translation_hi: string;
  translation_en: string;
}

// Normalizes Arabic text by removing diacritics (Tashkeel) and standardizing letter variants
export function normalizeArabic(text: string): string {
  if (!text) return "";
  return text
    // Remove Arabic diacritics (Fatha, Damma, Kasra, Sukun, Shaddah, Tanween, etc.)
    .replace(/[\u0617-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    // Standardize Alef variations (أ, إ, آ -> ا)
    .replace(/[أإآ]/g, "ا")
    // Standardize Teh Marbuta and Heh (ة -> ه)
    .replace(/ة/g, "ه")
    // Standardize Alef Maksura and Yeh (ى -> ي)
    .replace(/ى/g, "ي")
    // Remove tatweel (kashida)
    .replace(/ـ/g, "")
    // Remove punctuation & special characters
    .replace(/[،,.:;!؟?()[\]{}"'`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export const SACRED_TEXTS_DB: SacredTextItem[] = [
  // ── 1. The Exact Tawaf Rabbana Dua (User's Screenshot) ──
  {
    id: "rabbana-tawaf-complete",
    category: "dua",
    title: "Dua Between Rukn Yamani & Hajr al-Aswad (Complete Sunnah)",
    arabicFull: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ، وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
    arabicNormalized: "ربنا اتنا في الدنيا حسنه وفي الاخره حسنه وقنا عذاب النار وادخلنا الجنه مع الابرار يا عزيز يا غفار يا رب العالمين",
    keywords: ["ربنا", "الدنيا", "حسنه", "الاخره", "عذاب النار", "الجنه", "الابرار", "عزيز", "غفار", "العالمين"],
    reference: "Surah Al-Baqarah (2:201) & Sunnah of Tawaf",
    translation_gu: "હે અમારા પાલનહાર! અમને દુનિયામાં પણ ભલાઈ આપ અને આખિરતમાં પણ ભલાઈ આપ અને અમને દોઝખની આગથી બચાવ, અને અમને નેક લોકો સાથે જન્નતમાં દાખલ કર, હે જબરદસ્ત, હે અત્યંત માફ કરનાર, હે તમામ આલમોના પાલનહાર!",
    pronunciation_gu: "રબ્બના આતિના ફિદ્દુન્યા હસનતંવ વફિલ આખિરતિ હસનતંવ વકિના અઝાબન્નનાર, વ અદખિલનલ જન્નતા મઅલ અબરાર, યા અઝીઝુ યા ગફ્ફાર, યા રબ્બલ આલમીન.",
    translation_hi: "ऐ हमारे रब! हमें दुनिया में भी भलाई दे और आख़िरत में भी भलाई दे और हमें जहन्नम की आग से बचा, और हमें नेक लोगों के साथ जन्नत में दाख़िल फ़रमा, ऐ इज़्ज़त वाले, ऐ बख़्शने वाले, ऐ तमाम जहानों के पालने वाले!",
    translation_en: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire, and admit us to Paradise with the righteous, O Almighty, O Forgiver, O Lord of the worlds!",
  },
  {
    id: "rabbana-quran-short",
    category: "quran",
    title: "Rabbana Atina fid-Dunya (Surah Baqarah)",
    arabicFull: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    arabicNormalized: "ربنا اتنا في الدنيا حسنه وفي الاخره حسنه وقنا عذاب النار",
    keywords: ["ربنا", "الدنيا", "حسنه", "الاخره", "عذاب النار"],
    reference: "Surah Al-Baqarah (2:201)",
    translation_gu: "હે અમારા પાલનહાર! અમને દુનિયામાં પણ ભલાઈ આપ અને આખિરતમાં પણ ભલાઈ આપ અને અમને દોઝખની આગથી બચાવ.",
    pronunciation_gu: "રબ્બના આતિના ફિદ્દુન્યા હસનતંવ વફિલ આખિરતિ હસનતંવ વકિના અઝાબન્નનાર.",
    translation_hi: "ऐ हमारे रब! हमें दुनिया में भी भલાઈ दे और आख़िरत में भी भलाई दे और हमें आग के अज़ाब से बचा।",
    translation_en: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
  },
  // ── 2. Entrance into Masjid al-Haram ──
  {
    id: "dua-enter-masjid",
    category: "dua",
    title: "Dua for Entering Masjid al-Haram",
    arabicFull: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    arabicNormalized: "اللهم افتح لي ابواب رحمتك",
    keywords: ["اللهم", "افتح", "ابواب", "رحمتك"],
    reference: "Sahih Muslim",
    translation_gu: "હે અલ્લાહ! મારા માટે તારી રહેમતના દરવાજા ખોલી નાખ.",
    pronunciation_gu: "અલ્લાહુમ્મફ-તહ લી અબવાબા રહ્-મતીક.",
    translation_hi: "ऐ अल्लाह! मेरे लिए अपनी रहमत के दरवाज़े खोल दे।",
    translation_en: "O Allah, open the doors of Your mercy for me.",
  },
  // ── 3. Istilam at Hajr al-Aswad ──
  {
    id: "dua-istilam",
    category: "dua",
    title: "Istilam at Hajar al-Aswad",
    arabicFull: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    arabicNormalized: "بسم الله والله اكبر",
    keywords: ["بسم الله", "الله اكبر"],
    reference: "Sunan Abi Dawud",
    translation_gu: "અલ્લાહના નામ સાથે, અને અલ્લાહ સૌથી મોટો છે.",
    pronunciation_gu: "બિસ્મિલ્લાહિ વલ્લાહુ અકબર.",
    translation_hi: "अल्लाह के नाम से, और अल्लाह सबसे बड़ा है।",
    translation_en: "In the name of Allah, and Allah is the Greatest.",
  },
  // ── 4. Safa & Marwah Starting Verse ──
  {
    id: "safa-marwah-verse",
    category: "quran",
    title: "Mount Safa Quranic Ayah",
    arabicFull: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
    arabicNormalized: "ان الصفا والمروه من شعائر الله",
    keywords: ["الصفا", "المروه", "شعائر الله"],
    reference: "Surah Al-Baqarah (2:158)",
    translation_gu: "ખરેખર સફા અને મરવાહ અલ્લાહની નિશાનીઓમાંથી છે.",
    pronunciation_gu: "ઇન્નસ સફા વલ મર્વતા મિન શઆ-ઇરિલ્લાહ.",
    translation_hi: "बेशक सफ़ा और मरवा अल्लाह की निशानियों में से हैं।",
    translation_en: "Indeed, as-Safa and al-Marwah are among the symbols of Allah.",
  },
  // ── 5. Zamzam Drinking Dua ──
  {
    id: "zamzam-dua",
    category: "dua",
    title: "Dua for Drinking Zamzam Water",
    arabicFull: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    arabicNormalized: "اللهم اني اسالك علما نافعا ورزقا واسعا وشفاء من كل داء",
    keywords: ["اللهم", "علم نافع", "رزقا واسعا", "شفاء", "داء", "زمزم"],
    reference: "Sunan Ibn Majah",
    translation_gu: "હે અલ્લાહ! હું તારી પાસેથી નફાકારક ઇલ્મ, પુષ્કળ રોઝી અને દરેક બીમારીથી શિફા માંગું છું.",
    pronunciation_gu: "અલ્લાહુમ્મા ઇન્ની અસ્અલુક ઇલ્મન નાફિઅંવ વ રિઝ્કંવ વાસિઅંવ વ શિફાઅમ્ મિન કુલ્લી દાઅ.",
    translation_hi: "ऐ अल्लाह! मैं तुझसे नफ़ा देने वाला इल्म, कुशादा रिज़्क़ और हर बीमारी से शिफ़ा मांगता हूँ।",
    translation_en: "O Allah, I ask You for beneficial knowledge, abundant sustenance, and cure from every disease.",
  },
  // ── 6. Key Haram Signboards ──
  {
    id: "sb-mataf",
    category: "signboard",
    title: "Mataf (Ka'bah Tawaf Floor)",
    arabicFull: "المطاف",
    arabicNormalized: "المطاف",
    keywords: ["المطاف", "مطاف"],
    translation_gu: "અલ-મતાફ (કા'બા શરીફની આસપાસ તવાફ કરવાનો વિસ્તાર / ફ્લોર)",
    pronunciation_gu: "અલ-મતાફ",
    translation_hi: "अल-मताफ़ (काबा के गिर्द तवाफ़ का फ़र्श / क्षेत्र)",
    translation_en: "Mataf (Tawaf Floor around the Holy Ka'bah)",
  },
  {
    id: "sb-masaa",
    category: "signboard",
    title: "Al-Masa'a (Safa & Marwah Sa'i Floor)",
    arabicFull: "المسعى",
    arabicNormalized: "المسعى",
    keywords: ["المسعى", "مسعى"],
    translation_gu: "અલ-મસ્આ (સફા અને મરવાહ વચ્ચે સઈ કરવાની જગ્યા)",
    pronunciation_gu: "અલ-મસ્આ",
    translation_hi: "अल-मसआ (सफ़ा और मरवा के बीच सई की जगह)",
    translation_en: "Al-Masa'a (Sa'i Path between Safa and Marwah)",
  },
  {
    id: "sb-pedestrian",
    category: "signboard",
    title: "Pedestrian Way",
    arabicFull: "طريق المشاة",
    arabicNormalized: "طريق المشاه",
    keywords: ["طريق", "المشاه", "مشاه"],
    translation_gu: "પગપાળા ચાલવાનો રસ્તો (પેડેસ્ટ્રિયન વે)",
    pronunciation_gu: "તરીકુલ મુશાહ",
    translation_hi: "पैदल चलने का रास्ता",
    translation_en: "Pedestrian Walkway",
  },
  {
    id: "sb-restrooms",
    category: "signboard",
    title: "Restrooms & Wudhu Facilities",
    arabicFull: "دورات المياه والوضوء",
    arabicNormalized: "دورات المياه والوضوء",
    keywords: ["دورات", "المياه", "وضوء"],
    translation_gu: "શૌચાલય અને વુઝૂખાનું (ટોયલેટ્સ)",
    pronunciation_gu: "દવરાતુલ મિયાહ વલ વુઝૂ",
    translation_hi: "शौचालय और वुज़ूख़ाना",
    translation_en: "Restrooms and Ablution (Wudhu) Facilities",
  },
  {
    id: "sb-king-abdulaziz",
    category: "signboard",
    title: "King Abdulaziz Gate (Gate 1)",
    arabicFull: "باب الملك عبد العزيز",
    arabicNormalized: "باب الملك عبد العزيز",
    keywords: ["باب الملك عبد العزيز", "عبد العزيز"],
    translation_gu: "કિંગ અબ્દુલ અઝીઝ ગેટ (દરવાજા નંબર ૧)",
    pronunciation_gu: "બાબ અલ-મલિક અબ્દુલ અઝીઝ",
    translation_hi: "किंग अब्दुल अज़ीज़ गेट (गेट नं. 1)",
    translation_en: "King Abdulaziz Gate (Gate No. 1)",
  },
  {
    id: "sb-king-fahd",
    category: "signboard",
    title: "King Fahd Gate (Gate 79)",
    arabicFull: "باب الملك فهد",
    arabicNormalized: "باب الملك فهد",
    keywords: ["باب الملك فهد", "فهد"],
    translation_gu: "કિંગ ફહદ ગેટ (દરવાજા નંબર ૭૯)",
    pronunciation_gu: "બાબ અલ-મલિક ફહદ",
    translation_hi: "किंग फ़हद गेट (गेट नं. 79)",
    translation_en: "King Fahd Gate (Gate No. 79)",
  },
  {
    id: "sb-bab-salam",
    category: "signboard",
    title: "Bab as-Salam",
    arabicFull: "باب السلام",
    arabicNormalized: "باب السلام",
    keywords: ["باب السلام", "السلام"],
    translation_gu: "બાબુસ સલામ (સલામ દરવાજો)",
    pronunciation_gu: "બાબુસ સલામ",
    translation_hi: "बाबुस सलाम (सलाम का दरवाज़ा)",
    translation_en: "Bab as-Salam (Peace Gate)",
  },
  {
    id: "sb-emergency",
    category: "signboard",
    title: "Emergency Exit",
    arabicFull: "مخرج طوارئ",
    arabicNormalized: "مخرج طوارئ",
    keywords: ["مخرج", "طوارئ"],
    translation_gu: "ઇમરજન્સી નિકાસ (કટોકટી બહાર નીકળવાનો રસ્તો)",
    pronunciation_gu: "મખરજ તવારી'",
    translation_hi: "आपातकालीन निकास (इमरजेंसी एक्जिट)",
    translation_en: "Emergency Exit",
  },
  {
    id: "sb-zamzam-points",
    category: "signboard",
    title: "Chilled Zamzam Water Points",
    arabicFull: "مياه زمزم المبردة",
    arabicNormalized: "مياه زمزم المبرده",
    keywords: ["مياه", "زمزم", "المبرده"],
    translation_gu: "ઠંડું આબે ઝમઝમ પીવાનું કેન્દ્ર",
    pronunciation_gu: "મિયાહ ઝમઝમ અલ-મુબર્રદા",
    translation_hi: "ठंडा आब-ए-ज़मज़म पीने का केंद्र",
    translation_en: "Chilled Zamzam Water Drinking Station",
  },
  {
    id: "sb-women-prayer",
    category: "signboard",
    title: "Women's Prayer Area",
    arabicFull: "مصلى النساء",
    arabicNormalized: "مصلى النساء",
    keywords: ["مصلى النساء", "النساء"],
    translation_gu: "મહિલાઓ માટે નમાઝ પઢવાની જગ્યા",
    pronunciation_gu: "મુસલ્લા અન-નિસા",
    translation_hi: "महिलाओं के लिए नमाज़ की जगह",
    translation_en: "Women's Prayer Area",
  },
  {
    id: "sb-clinic",
    category: "signboard",
    title: "Emergency Medical Clinic",
    arabicFull: "إسعاف / عيادة طبية",
    arabicNormalized: "اسعاف عياده طبيه",
    keywords: ["اسعاف", "عياده", "طبيه"],
    translation_gu: "ઇમરજન્સી મેડિકલ ક્લિનિક / પ્રાથમિક સારવાર કેન્દ્ર",
    pronunciation_gu: "ઇસ્આફ / ઇયાદા તિબ્બિય્યા",
    translation_hi: "इमरजेंसी मेडिकल क्लीनिक / प्राथमिक उपचार केंद्र",
    translation_en: "Emergency Medical Clinic / First Aid",
  },
  {
    id: "sb-pharmacy",
    category: "signboard",
    title: "Pharmacy",
    arabicFull: "صيدلية",
    arabicNormalized: "صيدليه",
    keywords: ["صيدليه", "صيدلية"],
    translation_gu: "દવાની દુકાન (મેડિકલ સ્ટોર / ફાર્મસી)",
    pronunciation_gu: "સૈદલિયા",
    translation_hi: "दवा की दुकान (फ़ार्मेसी)",
    translation_en: "Pharmacy / Drugstore",
  },
  {
    id: "sb-wheelchair",
    category: "signboard",
    title: "Wheelchair Lane",
    arabicFull: "مسار العربات",
    arabicNormalized: "مسار العربات",
    keywords: ["مسار", "العربات", "عربات"],
    translation_gu: "વ્હીલચેર ચલાવવાનો ખાસ માર્ગ",
    pronunciation_gu: "મસાર અલ-અરબાત",
    translation_hi: "व्हीलचेयर का विशेष रास्ता",
    translation_en: "Wheelchair Lane / Path",
  },
  {
    id: "sb-lost-found",
    category: "signboard",
    title: "Lost and Found Office",
    arabicFull: "مكتب المفقودات والأمانات",
    arabicNormalized: "مكتب المفقودات والامانات",
    keywords: ["مكتب", "المفقودات", "الامانات"],
    translation_gu: "ખોવાયેલી-મળેલી ચીજવસ્તુઓનું કાર્યાલય (લોસ્ટ એન્ડ ફાઉન્ડ)",
    pronunciation_gu: "મક્તબ અલ-મફકૂદાત વલ અમાનાત",
    translation_hi: "खोया-पाया सामान कार्यालय (लॉस्ट एंड फ़ाउंड)",
    translation_en: "Lost and Found Office",
  },
];

// Intelligent Matcher: Scans extracted text against the sacred database
export function matchSacredText(rawText: string): SacredTextItem | null {
  if (!rawText) return null;
  const cleanInput = normalizeArabic(rawText);
  if (!cleanInput || cleanInput.length < 2) return null;

  let bestMatch: SacredTextItem | null = null;
  let highestScore = 0;

  for (const item of SACRED_TEXTS_DB) {
    let score = 0;
    const cleanItem = item.arabicNormalized;

    // Direct substring or inclusion match
    if (cleanItem.includes(cleanInput) || cleanInput.includes(cleanItem)) {
      score += 100;
    }

    // Keyword matching
    for (const kw of item.keywords) {
      const cleanKw = normalizeArabic(kw);
      if (cleanKw && cleanInput.includes(cleanKw)) {
        score += 25;
      }
    }

    // Word overlap count
    const inputWords = cleanInput.split(" ").filter(w => w.length > 2);
    const itemWords = cleanItem.split(" ").filter(w => w.length > 2);
    for (const w of inputWords) {
      if (itemWords.includes(w)) {
        score += 15;
      }
    }

    if (score > highestScore && score >= 25) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}
