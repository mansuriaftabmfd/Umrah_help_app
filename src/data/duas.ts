// ============================================================
// DUAS DATA — Generated from user-provided umrah_duas_app.json
// Complete trilingual dataset (English, Hindi, Gujarati) with exact Arabic text
// Total: 49 Duas & Adhkar
// ============================================================

export type DuaStatus = "established" | "recommended" | "traditional";

export interface DuaTranslation {
  en: string;
  hi: string;
  gu: string;
}

export interface Dua {
  id: string;
  order: number;         // 1 to 49
  sectionOrder: number;  // order within section
  title: string;
  title_gu?: string;     // Verified Gujarati title
  title_hi?: string;     // Verified Hindi title
  group: string;         // section
  section: string;
  kind: string;          // "dua" | "quranic_verse"
  instruction: string | null;
  arabic: string;
  transliteration: string; // Latin pronunciation
  transliteration_gu?: string; // Gujarati pronunciation (ઉચ્ચારણ)
  meaning: DuaTranslation;
  source_pages: string;
  reference: string | null;
  notes: string | null;
  status: DuaStatus;
}

export const DUAS: Dua[] = [
  {
    "id": "leaving_home",
    "order": 1,
    "sectionOrder": 1,
    "title": "Du’a when Leaving Home",
    "group": "Journey & Umrah",
    "section": "Journey & Umrah",
    "kind": "dua",
    "instruction": "Also recite Ayatul Kursi, Surah Ikhlas, Surah Falaq and Surah Naas once.",
    "arabic": "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    "transliteration": "Bismillahi tawakkaltu 'alallah, laa hawla wa laa quwwata illaa billah.",
    "meaning": {
      "en": "I commence my journey in the name of Allah, having put my reliance on Allah; there is no might and no power but in Allah.",
      "hi": "मैं अल्लाह के नाम से अपनी यात्रा शुरू करता/करती हूँ और अल्लाह पर भरोसा करता/करती हूँ। अल्लाह के सिवा न कोई ताकत है और न कोई शक्ति।",
      "gu": "હું અલ્લાહના નામથી મારી મુસાફરી શરૂ કરું છું અને અલ્લાહ પર ભરોસો રાખું છું. અલ્લાહ સિવાય ન કોઈ શક્તિ છે ન કોઈ સામર્થ્ય."
    },
    "source_pages": "3",
    "reference": null,
    "notes": "Instruction is included in the source immediately after this du’a.",
    "status": "established"
  },
  {
    "id": "riding_vehicle",
    "order": 2,
    "sectionOrder": 2,
    "title": "When riding a car / plane",
    "group": "Journey & Umrah",
    "section": "Journey & Umrah",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ۝ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    "transliteration": "Subhaanallazee sakh-khara lanaa haaza wa maa kunnaa lahu muqrineen. Wa innaa ilaa Rabbinaa lamunqaliboon.",
    "meaning": {
      "en": "Exalted is He who has subjected this to us, and we could not have otherwise subdued it. And indeed we shall surely return to our Lord.",
      "hi": "पाक है वह ज़ात जिसने इसे हमारे अधीन कर दिया, जबकि हम इसे अपने काबू में करने की सामर्थ्य नहीं रखते थे। और निश्चय ही हमें अपने रब की ओर लौटकर जाना है।",
      "gu": "પવિત્ર છે એ અલ્લાહે જેને આ વસ્તુને અમારા માટે કાબૂમાં કરી આપી, જ્યારે અમે તેને કાબૂમાં કરવાની શક્તિ ધરાવતા નહોતા. અને નિશ્ચિતપણે અમે અમારા રબ તરફ જ પરત ફરવાના છીએ."
    },
    "source_pages": "3",
    "reference": "Qur’anic supplication / verse quoted in source",
    "notes": null,
    "status": "established"
  },
  {
    "id": "intention_umrah",
    "order": 3,
    "sectionOrder": 1,
    "title": "Intention for Umrah",
    "group": "Umrah",
    "section": "Umrah",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي",
    "transliteration": "Allahumma innee ureedul umrata fayasserhaa lee wa taqabbalhaa minnee.",
    "meaning": {
      "en": "O Allah, indeed I intend to perform the Umrah, so please make it easy for me and accept it from me.",
      "hi": "ऐ अल्लाह! मैं उमरा करने का इरादा करता/करती हूँ। इसे मेरे लिए आसान कर दे और इसे मेरी ओर से स्वीकार फ़रमा।",
      "gu": "હે અલ્લાહ! હું ઉમરાહ કરવાની નીતિ કરું છું. તેને મારા માટે સરળ બનાવ અને મારી તરફથી તેને કબૂલ કર."
    },
    "source_pages": "3",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "talbiyah",
    "order": 4,
    "sectionOrder": 2,
    "title": "Talbiyah",
    "group": "Umrah",
    "section": "Umrah",
    "kind": "dua",
    "instruction": "The source also says to recite Durood Shareef (salawaat) whenever you recite Talbiyah.",
    "arabic": "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
    "transliteration": "Labbaik Allahumma labbaik. Labbaika laa shareeka laka labbaik. Innal-hamda wan-ni’mata laka wal-mulk. Laa shareeka lak.",
    "meaning": {
      "en": "Here I am, O Allah, here I am. I am here, You have no partner, I am here. Indeed all praises and blessings are Yours. All sovereignty belongs to You, and You do not have any partners.",
      "hi": "ऐ अल्लाह! मैं हाज़िर हूँ, मैं हाज़िर हूँ। तेरा कोई साझीदार नहीं, मैं हाज़िर हूँ। बेशक सारी प्रशंसा और नेमतें तेरी ही हैं और बादशाहत भी तेरी है। तेरा कोई साझीदार नहीं।",
      "gu": "હે અલ્લાહ! હું હાજર છું, હું હાજર છું. તારો કોઈ ભાગીદાર નથી, હું હાજર છું. નિશ્ચિતપણે બધી પ્રશંસા અને નેઅમત તારી જ છે અને બાદશાહત પણ તારી છે. તારો કોઈ ભાગીદાર નથી."
    },
    "source_pages": "3",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "frequent_dua",
    "order": 5,
    "sectionOrder": 3,
    "title": "Important Du’a to be recited frequently",
    "group": "Journey & Umrah",
    "section": "Journey & Umrah",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ، وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ",
    "transliteration": "Allahumma innee as’aluka ridaaka wal jannah, wa a’oozu bika min sakhatika wan-naar.",
    "meaning": {
      "en": "O Allah, I ask You for Your Pleasure and Your Heaven, and I seek refuge in You from Your Anger and the Hellfire.",
      "hi": "ऐ अल्लाह! मैं तुझसे तेरी रज़ामंदी और जन्नत मांगता/मांगती हूँ और तेरे ग़ज़ब तथा जहन्नम से तेरी पनाह चाहता/चाहती हूँ।",
      "gu": "હે અલ્લાહ! હું તારી પ્રસન્નતા અને જન્નત માગું છું અને તારા ગુસ્સા તથા જહન્નમથી તારી પનાહ માગું છું."
    },
    "source_pages": "4",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "enter_masjid_haram",
    "order": 6,
    "sectionOrder": 1,
    "title": "When entering Masjid al-Haraam (or any masjid)",
    "group": "Makkah",
    "section": "Makkah",
    "kind": "dua",
    "instruction": null,
    "arabic": "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    "transliteration": "Bismillahi, wassalaatu wassalaamu ‘alaa rasoolillah. Allahummaghfirlee zunoobee waftahlee abwaaba rahmatik.",
    "meaning": {
      "en": "In the name of Allah, and peace and salutations upon the Messenger of Allah. O Allah, forgive my sins and open for me the gates of Your mercy.",
      "hi": "अल्लाह के नाम से। अल्लाह के रसूल पर सलाम और दुरूद हो। ऐ अल्लाह! मेरे गुनाह माफ़ कर और मेरे लिए अपनी रहमत के दरवाज़े खोल दे।",
      "gu": "અલ્લાહના નામથી. અલ્લાહના રસૂલ પર સલામ અને દરૂદ હોય. હે અલ્લાહ! મારા ગુનાઓ માફ કર અને મારી માટે તારી રહેમતના દરવાજા ખોલી દે."
    },
    "source_pages": "4,17",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "sighting_kaaba",
    "order": 7,
    "sectionOrder": 2,
    "title": "Du’a upon sighting the Ka’bah",
    "group": "Makkah",
    "section": "Makkah",
    "kind": "dua",
    "instruction": null,
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، فَحَيِّنَا رَبَّنَا بِالسَّلَامِ",
    "transliteration": "Laa ilaaha illAllahu wallahu Akbar. Allahumma antas-salaam wa minkas-salaam, fahayyinaa rabbanaa bis-salaam.",
    "meaning": {
      "en": "There is no god but Allah. Allah is the greatest. O Allah, You are Peace and from You is peace. So grant us life with peace and security.",
      "hi": "अल्लाह के सिवा कोई पूज्य नहीं, और अल्लाह सबसे बड़ा है। ऐ अल्लाह! तू ही सलामती है और सलामती तुझी से है। ऐ हमारे रब! हमें सलामती और अमन के साथ ज़िंदगी दे।",
      "gu": "અલ્લાહ સિવાય કોઈ ઈલાહ નથી અને અલ્લાહ સૌથી મોટો છે. હે અલ્લાહ! તું જ સલામતી છે અને સલામતી તારી પાસેથી છે. હે અમારા રબ! અમને સલામતી અને અમન સાથે જીવન આપ."
    },
    "source_pages": "4",
    "reference": null,
    "notes": "The source says this du’a is accepted at the first sight of the Ka’bah.",
    "status": "established"
  },
  {
    "id": "kaaba_additional",
    "order": 8,
    "sectionOrder": 3,
    "title": "Additional du’a upon sighting the Ka’bah",
    "group": "Makkah",
    "section": "Makkah",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا",
    "transliteration": "Allahumma zid haazal-baita tashreefan wa ta’zeeman wa takreeman wa mahaabah, wa zid man sharrafahu wa karramahu mimman hajjahu awi’tamarahu tashreefan wa takreeman wa ta’zeeman wa birran.",
    "meaning": {
      "en": "O Allah, increase this House in honour, esteem, respect and reverence. And increase those who honour and respect it - of those who perform Hajj or Umrah - in honour, respect, esteem and piety.",
      "hi": "ऐ अल्लाह! इस घर की इज़्ज़त, महानता, सम्मान और हैबत को और बढ़ा दे। और जो लोग हज या उमरा करके इसे सम्मान देते हैं, उनके सम्मान, इज़्ज़त, महानता और नेकी को भी बढ़ा दे।",
      "gu": "હે અલ્લાહ! આ પવિત્ર ઘરની ઇજ્જત, મહાનતા, સન્માન અને રૌબમાં વધારો કર. અને જે લોકો હજ અથવા ઉમરાહ કરીને તેને સન્માન આપે છે, તેમના સન્માન, ઇજ્જત, મહાનતા અને નેકીમાં પણ વધારો કર."
    },
    "source_pages": "5",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "tawaf_intention",
    "order": 9,
    "sectionOrder": 1,
    "title": "Intention for Tawaaf",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنِّي أُرِيدُ أَنْ أَطُوفَ بِبَيْتِكَ الْحَرَامِ فَيَسِّرْهُ لِي وَتَقَبَّلْهُ مِنِّي",
    "transliteration": "Allahumma innee ureedu an atoofa bi-baitikal-haraami fayassirhu lee wa taqabbalhu minnee.",
    "meaning": {
      "en": "O Allah, I intend to perform Tawaf of the Sacred Mosque, so accept it from me and make it easy for me.",
      "hi": "ऐ अल्लाह! मैं तेरे पवित्र घर का तवाफ करने का इरादा करता/करती हूँ। इसे मेरे लिए आसान कर और मेरी ओर से इसे स्वीकार फ़रमा।",
      "gu": "હે અલ્લાહ! હું તારા પવિત્ર ઘરની તવાફ કરવાની નીતિ કરું છું. તેને મારા માટે સરળ બનાવ અને મારી તરફથી તેને કબૂલ કર."
    },
    "source_pages": "5",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "hajr_aswad",
    "order": 10,
    "sectionOrder": 2,
    "title": "Du’a while kissing the Hajr-e-Aswad",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ",
    "transliteration": "Bismillahi, Allahu Akbar, wa lillahil hamd.",
    "meaning": {
      "en": "In the name of Allah. Allah is the greatest. All praises belong to Allah.",
      "hi": "अल्लाह के नाम से। अल्लाह सबसे बड़ा है। और सारी प्रशंसा अल्लाह ही के लिए है।",
      "gu": "અલ્લાહના નામથી. અલ્લાહ સૌથી મોટો છે. અને બધી પ્રશંસા અલ્લાહ માટે જ છે."
    },
    "source_pages": "5",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "after_istilam",
    "order": 11,
    "sectionOrder": 3,
    "title": "After Istilam (kissing the Hajr-e-Aswad)",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    "transliteration": "SubhaanAllahi, wal hamdu lillaahi, wa laa ilaaha illAllahu wallahu Akbar, wa laa hawla wa laa quwwata illaa billaahil ‘Aliyyil ‘Azeem.",
    "meaning": {
      "en": "Glory be to Allah, all praise is for Allah, there is no god but Allah, Allah is the greatest, and there is no might or power except with Allah, the Most High, the Most Great.",
      "hi": "अल्लाह पाक है, सारी प्रशंसा अल्लाह के लिए है, अल्लाह के सिवा कोई पूज्य नहीं, अल्लाह सबसे बड़ा है। अल्लाह के सिवा न कोई ताकत है न शक्ति; वही बुलंद और महान है।",
      "gu": "અલ્લાહ પવિત્ર છે, બધી પ્રશંસા અલ્લાહ માટે છે, અલ્લાહ સિવાય કોઈ ઈલાહ નથી, અલ્લાહ સૌથી મોટો છે. અલ્લાહ સિવાય ન કોઈ શક્તિ છે ન સામર્થ્ય; તે સર્વોચ્ચ અને મહાન છે."
    },
    "source_pages": "6",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "istilam_salawat",
    "order": 12,
    "sectionOrder": 4,
    "title": "Then recite after Istilam",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "الصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
    "transliteration": "Asswalaatu wassalaamu ‘alaa rasoolillah. Allahumma eemaanan bika wa tasdeeqan bi kitaabika wa wafaa’an bi ahdika wattibaa’an li sunnati nabiyyika Muhammadin sallallaahu ‘alaihi wa sallam.",
    "meaning": {
      "en": "Peace and blessings upon the Messenger of Allah. O Allah, out of faith in You, conviction in Your Book, fulfilment of Your covenant, and following the Sunnah of Your Prophet Muhammad, peace and blessings be upon him.",
      "hi": "अल्लाह के रसूल पर दुरूद और सलाम हो। ऐ अल्लाह! तुझ पर ईमान, तेरी किताब की पुष्टि, तेरे वचन को पूरा करने और तेरे नबी मुहम्मद ﷺ की सुन्नत का पालन करते हुए।",
      "gu": "અલ્લાહના રસૂલ પર દરૂદ અને સલામ હોય. હે અલ્લાહ! તારા પર ઈમાન, તારી કિતાબની પુષ્ટિ, તારા વચનને પૂર્ણ કરવા અને તારા નબી મુહંમદ ﷺ ની સુન્નતનું અનુસરણ કરતાં."
    },
    "source_pages": "6",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "tawaf_house_protection",
    "order": 13,
    "sectionOrder": 5,
    "title": "Du’a for protection from the Fire",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَالْحَرَمَ حَرَمُكَ، وَالْأَمْنَ أَمْنُكَ، وَالْعَبْدَ عَبْدُكَ، وَأَنَا عَبْدُكَ وَابْنُ عَبْدِكَ، وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ، فَأَجِرْنِي مِنَ النَّارِ",
    "transliteration": "Allahumma inna haazal-baita baituka, wal-harama haramuka, wal-amna amnuka, wal-‘abda ‘abduka, wa ana ‘abduka wabnu ‘abdika, wa haazaa maqaamul-‘aa’izi bika minan-naar. Fa ajirnee minan-naar.",
    "meaning": {
      "en": "O Allah, indeed this House is Your House, this sanctuary is Your sanctuary, this protection is Your protection, the slaves are Your slaves, and I am Your slave and the son of Your slave. This place is a means of protection from Hellfire, so protect me from the Fire.",
      "hi": "ऐ अल्लाह! यह घर तेरा घर है, यह हरम तेरा हरम है, सुरक्षा तेरी सुरक्षा है, बंदे तेरे बंदे हैं, और मैं तेरा बंदा और तेरे बंदे का बेटा/बेटी हूँ। यह उस व्यक्ति का ठिकाना है जो तेरी पनाह में आग से बचना चाहता है; अतः मुझे आग से बचा ले।",
      "gu": "હે અલ્લાહ! આ ઘર તારું ઘર છે, આ હરમ તારો હરમ છે, સુરક્ષા તારી સુરક્ષા છે, બંદાઓ તારા બંદા છે, અને હું તારો બંદો તથા તારા બંદાનો પુત્ર/પુત્રી છું. આ સ્થાન નરકની આગથી તારી પનાહ માંગનારનું સ્થાન છે; તેથી મને આગથી બચાવ."
    },
    "source_pages": "6",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "tawaf_atiq",
    "order": 14,
    "sectionOrder": 6,
    "title": "Additional du’a - O Lord of the Ancient House",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ يَا رَبَّ الْبَيْتِ الْعَتِيقِ، أَعْتِقْ رِقَابَنَا وَرِقَابَ آبَائِنَا وَأُمَّهَاتِنَا مِنَ النَّارِ، يَا ذَا الْجُودِ وَالْكَرَمِ وَالْفَضْلِ وَالْمَنِّ وَالْعَطَاءِ وَالْإِحْسَانِ، اللَّهُمَّ أَحْسِنْ عَاقِبَتَنَا فِي الْأُمُورِ كُلِّهَا وَأَجِرْنَا مِنْ خِزْيِ الدُّنْيَا وَعَذَابِ الْآخِرَةِ",
    "transliteration": "Allahumma ya Rabbal-baitil-‘Ateeq, a’tiq riqaabanaa wa riqaaba aabaa’inaa wa ummahaatinaa minan-naar. Yaa zal-joodi wal-karami wal-fadli wal-manni wal-‘ataa’i wal-ihsaan. Allahumma ahsin ‘aaqibatanaa fil-umoori kullihaa wa ajirnaa min khizyid-dunyaa wa ‘azaabil-aakhirah.",
    "meaning": {
      "en": "O Allah, O Lord of the Ancient House, protect our necks and the necks of our fathers and mothers from the Fire. O Owner of goodness, generosity, grace, blessings and beneficence. O Allah, grant us a good end in all our affairs and protect us from disgrace in this world and the torment of the Hereafter.",
      "hi": "ऐ अल्लाह, प्राचीन घर के रब! हमें और हमारे माता-पिता को आग से बचा। ऐ भलाई, उदारता, فضل और एहसान के मालिक! हमारे सभी मामलों का अच्छा अंजाम फ़रमा और दुनिया की जिल्लत तथा आख़िरत के अज़ाब से बचा।",
      "gu": "હે અલ્લાહ, પ્રાચીન ઘરનાં રબ! અમને અને અમારા માતા-પિતાને નરકની આગથી બચાવ. હે ભલાઈ, ઉદારતા, કૃપા અને ઉપકારના માલિક! અમારા બધા કાર્યોનો સારો અંત કર અને દુનિયાની जिल्लત તથા આખિરતના અઝાબથી બચાવ."
    },
    "source_pages": "7",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "rukn_iraqi",
    "order": 15,
    "sectionOrder": 7,
    "title": "Near Rukn-e-Iraqi",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالنِّفَاقِ وَالشِّقَاقِ وَسُوءِ الْأَخْلَاقِ وَسُوءِ الْمُنْقَلَبِ فِي الْأَهْلِ وَالْمَالِ وَالْوَلَدِ",
    "transliteration": "Allahumma innee a’oozu bika minash-shakki wash-shirki wan-nifaaqi wash-shiqaaqi wa soo’il-akhlaaqi wa soo’il-munqalabi fil-ahli wal-maali wal-walad.",
    "meaning": {
      "en": "O Allah, I seek Your protection against doubt, polytheism, schism, hypocrisy, bad morality, and an ill return in family, property and children.",
      "hi": "ऐ अल्लाह! मैं तुझसे शक, शिर्क, nifaq, फूट, बुरे अख़लाक़ और परिवार, माल व बच्चों के मामले में बुरे अंजाम से पनाह चाहता/चाहती हूँ।",
      "gu": "હે અલ્લાહ! હું શંકા, શિર્ક, નિફાક, ફૂટ, ખરાબ અખલાક અને પરિવાર, માલ તથા સંતાનોના મામલામાં ખરાબ પરિણામથી તારી પનાહ માગું છું."
    },
    "source_pages": "7",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "mizab_rahmah",
    "order": 16,
    "sectionOrder": 8,
    "title": "Near Mizab-e-Rahmah",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ أَظِلَّنَا تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّكَ، وَلَا بَاقِيَ إِلَّا وَجْهُكَ، وَاسْقِنَا مِنْ حَوْضِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ شَرْبَةً هَنِيئَةً مَرِيئَةً لَا نَظْمَأُ بَعْدَهَا أَبَدًا، بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ",
    "transliteration": "Allahumma azillanaa tahta zilli ‘arshika yawma laa zilla illaa zilluk, wa laa baaqiya illaa wajhuk. Wasqinaa min hawdi nabiyyinaa Muhammadin sallallaahu ‘alaihi wa sallama sharbatan hanee’atan maree’atan laa nazma’u ba’dahaa abadan. Birahmatika yaa arhamar-raahimeen.",
    "meaning": {
      "en": "O Allah, put us under the shade of Your Throne on the day when there is no shade except Your shade, and give us to drink from the pool of our master Muhammad a pleasant drink after which we shall never thirst, by Your mercy, O Most Merciful.",
      "hi": "ऐ अल्लाह! जिस दिन तेरे अर्श की छाया के सिवा कोई छाया न होगी, उस दिन हमें अपने अर्श की छाया में रख। और हमारे नबी मुहम्मद ﷺ के हौज़ से ऐसा स्वादिष्ट पेय पिला कि उसके बाद हमें कभी प्यास न लगे। अपनी रहमत से, ऐ सबसे अधिक रहम करने वाले।",
      "gu": "હે અલ્લાહ! જે દિવસે તારા અર્શની છાયા સિવાય કોઈ છાયા નહીં હોય, તે દિવસે અમને તારા અર્શની છાયા હેઠળ રાખ. અને અમારા નબી મુહંમદ ﷺ ના હૌઝમાંથી એવું સુખદ પીણું પીવડાવ કે પછી ક્યારેય તરસ ન લાગે. તારી રહેમતથી, હે સૌથી વધુ દયાળુ."
    },
    "source_pages": "8",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "rukn_shami",
    "order": 17,
    "sectionOrder": 9,
    "title": "Near Rukn-e-Shami",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ اجْعَلْهَا عُمْرَةً مَبْرُورَةً، وَسَعْيًا مَشْكُورًا، وَذَنْبًا مَغْفُورًا، وَتِجَارَةً لَنْ تَبُورَ. يَا عَالِمَ مَا فِي الصُّدُورِ، أَخْرِجْنِي يَا اللَّهُ مِنَ الظُّلُمَاتِ إِلَى النُّورِ",
    "transliteration": "Allahummaj’alhaa ‘umratan mabroorah, wa sa’yan mashkooraa, wa zanban maghfooraa, wa tijaaratan lan taboor. Yaa ‘aalima maa fis-sudoor, akhrijnee ya Allahu minaz-zulumaati ilan-noor.",
    "meaning": {
      "en": "O Allah, make this an accepted Umrah, with an accepted effort, pardoned sins and a commerce that does not perish. O Knower of what is hidden in our hearts, bring me from darkness into light.",
      "hi": "ऐ अल्लाह! इसे ऐसी उमरा बना जिसे तू स्वीकार करे, ऐसी कोशिश बना जिसकी क़द्र की जाए, ऐसे गुनाह बना जिन्हें माफ़ कर दिया जाए और ऐसा कारोबार बना जो कभी नष्ट न हो। दिलों के राज़ जानने वाले! मुझे अंधेरों से निकालकर नूर की ओर ले आ।",
      "gu": "હે અલ્લાહ! આ ઉમરાહને કબૂલ થયેલી ઉમરાહ બનાવી, અમારી કોશિશને સ્વીકાર અને વખાણ લાયક બનાવી, અમારા ગુનાઓ માફ કર અને એવો વેપાર આપ જે ક્યારેય નુકસાનમાં ન જાય. દિલોની વાત જાણનાર! મને અંધકારમાંથી પ્રકાશ તરફ લઈ જા."
    },
    "source_pages": "8",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "rukn_yamani",
    "order": 18,
    "sectionOrder": 10,
    "title": "Near Rukn-e-Yamani",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ",
    "transliteration": "Allahumma innee as’alukal-‘afwa wal-‘aafiyata fid-deeni wad-dunyaa wal-aakhirah.",
    "meaning": {
      "en": "O Allah, grant me pardon and safety from danger and sin in this world and in the Hereafter.",
      "hi": "ऐ अल्लाह! मैं तुझसे दीन, दुनिया और आख़िरत में माफ़ी और आफ़ियत मांगता/मांगती हूँ।",
      "gu": "હે અલ્લાહ! હું દિન, દુનિયા અને આખિરતમાં તારી માફી અને આફિયત માગું છું."
    },
    "source_pages": "9",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "between_yamani_aswad",
    "order": 19,
    "sectionOrder": 11,
    "title": "Between Rukn-e-Yamani and Hajr-e-Aswad",
    "group": "Tawaf",
    "section": "Tawaf",
    "kind": "dua",
    "instruction": null,
    "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ، وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
    "transliteration": "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa ‘azaaban-naar. Wa adkhilnal-jannata ma’al-abraar. Yaa ‘azeezu yaa ghaffaaru, yaa rabbal-‘aalameen.",
    "meaning": {
      "en": "Our Lord, give us goodness in this world and goodness in the Hereafter, and save us from the torment of the Fire. Admit us into Paradise with the righteous, O Almighty, O Forgiver, O Lord of the worlds.",
      "hi": "ऐ हमारे रब! हमें दुनिया में भलाई दे और आख़िरत में भी भलाई दे और हमें जहन्नम की आग के अज़ाब से बचा। हमें नेक लोगों के साथ जन्नत में दाख़िल फ़रमा। ऐ ताकतवर, ऐ बहुत माफ़ करने वाले, ऐ सारे जहानों के रब।",
      "gu": "હે અમારા રબ! અમને દુનિયામાં ભલાઈ આપ અને આખિરતમાં પણ ભલાઈ આપ અને અમને નરકની આગના અઝાબથી બચાવ. અમને નેક લોકો સાથે જન્નતમાં દાખલ કર. હે શક્તિશાળી, હે બહુ માફ કરનાર, હે સમગ્ર જહાનના રબ."
    },
    "source_pages": "9",
    "reference": "Quran 2:201",
    "notes": null,
    "status": "established"
  },
  {
    "id": "zamzam",
    "order": 20,
    "sectionOrder": 4,
    "title": "Du’a for drinking Zam Zam",
    "group": "Makkah",
    "section": "Makkah",
    "kind": "dua",
    "instruction": null,
    "arabic": "بِسْمِ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَعَمَلًا صَالِحًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    "transliteration": "Bismillah wal-hamdu lillah. Wassalaatu wassalaamu ‘alaa rasoolillah. Allahumma innee as’aluka ‘ilman naafi’an, wa rizqan waasi’an, wa ‘amalan saalihan, wa shifaa’an min kulli daa’.",
    "meaning": {
      "en": "In the name of Allah. All praises belong to Allah. Peace and blessings of Allah be upon the Messenger of Allah. O Allah, I ask You for beneficial knowledge, abundant sustenance, good deeds and cure from every disease.",
      "hi": "अल्लाह के नाम से। सारी प्रशंसा अल्लाह के लिए है। अल्लाह के रसूल पर दुरूद और सलाम हो। ऐ अल्लाह! मैं तुझसे लाभकारी ज्ञान, विस्तृत रोज़ी, नेक अमल और हर बीमारी से शिफ़ा मांगता/मांगती हूँ।",
      "gu": "અલ્લાહના નામથી. બધી પ્રશંસા અલ્લાહ માટે છે. અલ્લાહના રસૂલ પર દરૂદ અને સલામ હોય. હે અલ્લાહ! હું તારી પાસેથી લાભદાયક જ્ઞાન, વિશાળ રિઝ્ક, સારા અમલ અને દરેક બીમારીથી શિફા માગું છું."
    },
    "source_pages": "9",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "saee_opening",
    "order": 21,
    "sectionOrder": 1,
    "title": "Proceed to Safaa - opening verse",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا ۚ وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
    "transliteration": "Abda’u bimaa bada’a Allaahu bihi. Innas-Safaa wal-Marwata min sha’aa’irillaah. Faman hajj al-baita awi’tamara falaa junaaha ‘alaihi an-yattawwafa bihimaa. Wa man tatawwa’a khairan fa innallaaha shaakirun ‘aleem.",
    "meaning": {
      "en": "I start with what Allah started with: Indeed, as-Safa and al-Marwah are among the symbols of Allah. So whoever performs Hajj or Umrah, there is no blame upon him for walking between them. And whoever volunteers good, then indeed Allah is appreciative and Knowing.",
      "hi": "मैं वहीं से शुरू करता/करती हूँ जिससे अल्लाह ने शुरुआत की। निस्संदेह सफ़ा और मरवा अल्लाह की निशानियों में से हैं। जो व्यक्ति हज या उमरा करे, उसके लिए इनके बीच चलने में कोई दोष नहीं। और जो स्वेच्छा से कोई भलाई करे तो निश्चय ही अल्लाह قدر करने वाला, जानने वाला है।",
      "gu": "હું ત્યાંથી શરૂઆત કરું છું જ્યાંથી અલ્લાહે શરૂઆત કરી છે. નિશ્ચિતપણે સફા અને મરવા અલ્લાહની નિશાનીઓમાંના છે. જે વ્યક્તિ હજ અથવા ઉમરાહ કરે તેના માટે તેમના વચ્ચે ફરવામાં કોઈ દોષ નથી. અને જે પોતાની ઇચ્છાથી ભલાઈ કરે તો નિશ્ચિતપણે અલ્લાહ કદર કરનાર અને જાણનાર છે."
    },
    "source_pages": "10",
    "reference": "Quran 2:158",
    "notes": null,
    "status": "established"
  },
  {
    "id": "safa",
    "order": 22,
    "sectionOrder": 2,
    "title": "Facing the Ka’bah from Safa",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ. لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
    "transliteration": "Allahu Akbar, Allahu Akbar, Allahu Akbar wa lillahil-hamd. Laa ilaaha illallaahu wahdahu laa shareeka lah, lahul-mulku wa lahul-hamd, yuhyee wa yumeet, wa huwa hayyun laa yamoot. Biyadihil-khair, wa huwa ‘alaa kulli shay’in qadeer. Allahumma salli ‘alaa Muhammad wa aali Muhammad.",
    "meaning": {
      "en": "Allah is the Greatest! All praise is for Allah. There is none worthy of worship except Allah, Alone, without partner. To Him belongs the dominion and all praise. He gives life and causes death, He is Living and does not die. In His Hand is all good, and He has power over all things. O Allah, exalt the mention of Muhammad and the family of Muhammad.",
      "hi": "अल्लाह सबसे बड़ा है और सारी प्रशंसा अल्लाह के लिए है। अल्लाह के सिवा कोई पूज्य नहीं, वह अकेला है, उसका कोई साझीदार नहीं। बादशाहत और सारी प्रशंसा उसी की है। वही जीवन और मृत्यु देता है। वह जीवित है और कभी नहीं मरता। सारी भलाई उसके हाथ में है और वह हर चीज़ पर क़ादिर है। ऐ अल्लाह! मुहम्मद ﷺ और उनके परिवार पर दुरूद भेज।",
      "gu": "અલ્લાહ સૌથી મોટો છે અને બધી પ્રશંસા અલ્લાહ માટે છે. અલ્લાહ સિવાય કોઈ ઈલાહ નથી; તે એકલો છે, તેનો કોઈ ભાગીદાર નથી. બાદશાહત અને બધી પ્રશંસા તેની જ છે. તે જીવન આપે છે અને મૃત્યુ આપે છે. તે જીવંત છે અને મરતો નથી. બધી ભલાઈ તેના હાથમાં છે અને તે દરેક વસ્તુ પર કાદિર છે. હે અલ્લાહ! મુહંમદ ﷺ અને તેમના પરિવાર પર દરૂદ મોકલ."
    },
    "source_pages": "10",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "safa_marwa_main",
    "order": 23,
    "sectionOrder": 3,
    "title": "To be recited between Safa and Marwa",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "dua",
    "instruction": null,
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
    "transliteration": "Laa ilaaha illallaahu wahdahu laa shareeka lah, lahul-mulku wa lahul-hamd, yuhyee wa yumeet, wa huwa hayyun laa yamoot. Biyadihil-khair, wa huwa ‘alaa kulli shay’in qadeer. Laa ilaaha illallaahu wahdahu, anjaza wa’dah, wa nasara ‘abdah, wa hazamal-ahzaaba wahdah.",
    "meaning": {
      "en": "There is none worthy of worship except Allah, Alone, without partner. To Him belongs the dominion and all praise. He gives life and causes death, He is Living and does not die. In His Hand is all good and He has power over all things. There is none worthy of worship except Allah, Alone; He fulfilled His promise, supported His servant, and defeated the confederates alone.",
      "hi": "अल्लाह के सिवा कोई पूज्य नहीं, वह अकेला है और उसका कोई साझीदार नहीं। बादशाहत और सारी प्रशंसा उसी की है। वही जीवन और मृत्यु देता है, वह जीवित है और नहीं मरता। सारी भलाई उसके हाथ में है और वह हर चीज़ पर क़ादिर है। अल्लाह अकेला है; उसने अपना वादा पूरा किया, अपने बंदे की मदद की और अकेले ही शत्रुओं के दलों को हरा दिया।",
      "gu": "અલ્લાહ સિવાય કોઈ ઈલાહ નથી; તે એકલો છે અને તેનો કોઈ ભાગીદાર નથી. બાદશાહત અને બધી પ્રશંસા તેની જ છે. તે જીવન આપે છે અને મૃત્યુ આપે છે; તે જીવંત છે અને મરતો નથી. બધી ભલાઈ તેના હાથમાં છે અને તે દરેક વસ્તુ પર કાદિર છે. અલ્લાહ એકલો છે; તેણે પોતાનું વચન પૂરું કર્યું, પોતાના બંદાની મદદ કરી અને એકલાએ જ શત્રુઓના ગઠબંધનને હરાવ્યું."
    },
    "source_pages": "11",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "saee_rabbana",
    "order": 24,
    "sectionOrder": 4,
    "title": "Rabbanaa - goodness in both worlds",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    "transliteration": "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa ‘azaaban-naar.",
    "meaning": {
      "en": "Our Lord, give us goodness in this world and goodness in the Hereafter, and save us from the torment of the Fire.",
      "hi": "ऐ हमारे रब! हमें दुनिया में भलाई दे, आख़िरत में भलाई दे और हमें जहन्नम के अज़ाब से बचा।",
      "gu": "હે અમારા રબ! અમને દુનિયામાં ભલાઈ આપ, આખિરતમાં ભલાઈ આપ અને અમને નરકની આગના અઝાબથી બચાવ."
    },
    "source_pages": "11",
    "reference": "Quran 2:201",
    "notes": null,
    "status": "established"
  },
  {
    "id": "saee_rabbigfir",
    "order": 25,
    "sectionOrder": 5,
    "title": "Rabbigfir warham",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "dua",
    "instruction": null,
    "arabic": "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ",
    "transliteration": "Rabbighfir warham, wa’fu wa takarram, wa tajaawaz ‘ammaa ta’lam. Innaka ta’lamu maa laa na’lam. Innaka antal-a’azzul-akram.",
    "meaning": {
      "en": "Our Lord, forgive us and have mercy on us. Forgive and be generous, and overlook what You know. You know what we do not know. You are the Most Mighty, Most Generous.",
      "hi": "ऐ हमारे रब! हमें माफ़ कर और हम पर रहम फ़रमा। दरगुज़र कर और करम फ़रमा। जिन बातों को तू जानता है उनमें हमारी कोताहियों से दरगुज़र कर। तू वह जानता है जो हम नहीं जानते। निश्चय ही तू सबसे ताकतवर और सबसे अधिक उदार है।",
      "gu": "હે અમારા રબ! અમને માફ કર અને અમ પર રહેમ કર. દરગુજર કર અને કરમ કર. જે તું જાણે છે તેમાં અમારી ભૂલોને માફ કર. તું તે જાણે છે જે અમે નથી જાણતા. નિશ્ચિતપણે તું સૌથી શક્તિશાળી અને સૌથી વધુ ઉદાર છે."
    },
    "source_pages": "11",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "saee_hudaa",
    "order": 26,
    "sectionOrder": 6,
    "title": "Guidance, piety, chastity and sufficiency",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    "transliteration": "Allahumma innee as’alukal-hudaa wat-tuqaa wal-‘afaafa wal-ghinaa.",
    "meaning": {
      "en": "O Allah, I ask You for guidance, righteousness, chastity and self-sufficiency.",
      "hi": "ऐ अल्लाह! मैं तुझसे हिदायत, परहेज़गारी, पाकदामनी और आत्मनिर्भरता मांगता/मांगती हूँ।",
      "gu": "હે અલ્લાહ! હું તારી પાસેથી હિદાયત, પરહેઝગારી, પવિત્રતા અને આત્મનિર્ભરતા માગું છું."
    },
    "source_pages": "11",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "saee_zikr",
    "order": 27,
    "sectionOrder": 7,
    "title": "Help me remember You",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    "transliteration": "Allahumma a’innee ‘alaa dhikrika wa shukrika wa husni ‘ibaadatik.",
    "meaning": {
      "en": "O Allah, help me to remember You, be grateful to You and worship You in a better way.",
      "hi": "ऐ अल्लाह! अपने ज़िक्र, शुक्र और अच्छी तरह इबादत करने में मेरी मदद फ़रमा।",
      "gu": "હે અલ્લાહ! તારા ઝિક્ર, તારો શુક્ર અને સારી રીતે તારી ઈબાદત કરવામાં મારી મદદ કર."
    },
    "source_pages": "11",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "green_lights",
    "order": 28,
    "sectionOrder": 8,
    "title": "Between the green lights in Sa’ee",
    "group": "Sa’ee",
    "section": "Sa’ee",
    "kind": "dua",
    "instruction": null,
    "arabic": "رَبِّ اغْفِرْ وَارْحَمْ، أَنْتَ الْأَعَزُّ الْأَكْرَمُ",
    "transliteration": "Rabbighfir warham, antal-a’azzul-akram.",
    "meaning": {
      "en": "O Allah, forgive us and have mercy on us. You are the Greatest and the Most Kind.",
      "hi": "ऐ अल्लाह! हमें माफ़ कर और हम पर रहम फ़रमा। तू सबसे महान और सबसे अधिक उदार है।",
      "gu": "હે અલ્લાહ! અમને માફ કર અને અમ પર રહેમ કર. તું સૌથી મહાન અને સૌથી વધુ ઉદાર છે."
    },
    "source_pages": "12",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "forgiveness",
    "order": 29,
    "sectionOrder": 1,
    "title": "Du’a for forgiveness",
    "group": "Any time",
    "section": "Any time",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    "transliteration": "Rabbanaa zalamnaa anfusanaa wa illam taghfir lanaa wa tarhamnaa lanakoonanna minal-khaasireen.",
    "meaning": {
      "en": "Our Lord, we have wronged ourselves; if You do not forgive us and have mercy upon us, we shall surely be among the losers.",
      "hi": "ऐ हमारे रब! हमने अपनी जानों पर ज़ुल्म किया। अगर तू हमें माफ़ न करे और हम पर रहम न करे तो हम घाटा उठाने वालों में से हो जाएंगे।",
      "gu": "હે અમારા રબ! અમે અમારી જાત પર જુલમ કર્યો છે. જો તું અમને માફ નહીં કરે અને અમ પર રહેમ નહીં કરે તો અમે ચોક્કસ નુકસાન પામનારામાંથી થઈ જઈશું."
    },
    "source_pages": "12",
    "reference": "Quran 7:23",
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "parents",
    "order": 30,
    "sectionOrder": 2,
    "title": "Du’a for parents",
    "group": "Any time",
    "section": "Any time",
    "kind": "dua",
    "instruction": null,
    "arabic": "رَبَّنَا اغْفِرْ لَنَا وَلِوَالِدَيْنَا، رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    "transliteration": "Rabbanaaghfir lanaa wa liwaalidaynaa. Rabbirhamhumaa kamaa rabbayaanee sagheeraa.",
    "meaning": {
      "en": "Our Lord, forgive us and our parents, and have mercy upon them as they looked after me in my childhood.",
      "hi": "ऐ हमारे रब! हमें और हमारे माता-पिता को माफ़ कर और उन पर रहम फ़रमा जैसे उन्होंने बचपन में मेरा पालन-पोषण किया।",
      "gu": "હે અમારા રબ! અમને અને અમારા માતા-પિતાને માફ કર અને તેઓએ બાળપણમાં અમારો ઉછેર કર્યો તેમ તેમના પર રહેમ કર."
    },
    "source_pages": "12",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "family_children",
    "order": 31,
    "sectionOrder": 3,
    "title": "Du’a for family and children",
    "group": "Any time",
    "section": "Any time",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    "transliteration": "Rabbanaa hab lanaa min azwaajinaa wa zurriyyaatinaa qurrata a’yunin waj’alnaa lil-muttaqeena imaamaa.",
    "meaning": {
      "en": "Our Lord, grant us from our spouses and offspring comfort to our eyes and make us an example for the righteous.",
      "hi": "ऐ हमारे रब! हमारी पत्नियों/पतियों और हमारी संतान को हमारी आँखों की ठंडक बना और हमें परहेज़गारों के लिए आदर्श बना।",
      "gu": "હે અમારા રબ! અમારી પત્નીઓ/પતિઓ અને સંતાનોને અમારી આંખોની ઠંડક બનાવ અને અમને પરહેઝગાર લોકો માટે આદર્શ બનાવ."
    },
    "source_pages": "12",
    "reference": "Quran 25:74",
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "family_children_prayer",
    "order": 32,
    "sectionOrder": 4,
    "title": "Another du’a for family and children",
    "group": "Any time",
    "section": "Any time",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    "transliteration": "Rabbij’alnee muqeemas-salaati wa min zurriyyatee. Rabbanaa wa taqabbal du’aa. Rabbanaghfir lee wa liwaalidayya wa lil-mu’mineena yawma yaquumul-hisaab.",
    "meaning": {
      "en": "My Lord, make me an establisher of prayer, and many from my descendants. Our Lord, accept my supplication. Our Lord, forgive me, my parents and the believers on the Day the account is established.",
      "hi": "ऐ मेरे रब! मुझे और मेरी संतान में से भी नमाज़ कायम करने वाला बना। ऐ हमारे रब! मेरी दुआ स्वीकार कर। ऐ हमारे रब! मुझे, मेरे माता-पिता और सभी ईमान वालों को उस दिन माफ़ कर जब हिसाब कायम होगा।",
      "gu": "હે મારા રબ! મને અને મારી સંતાનમાંથી પણ નમાઝ કાયમ કરનાર બનાવ. હે અમારા રબ! મારી દૂઆ કબૂલ કર. હે અમારા રબ! હિસાબના દિવસે મને, મારા માતા-પિતાને અને ઈમાનવાળાઓને માફ કર."
    },
    "source_pages": "13",
    "reference": "Quran 14:40-41",
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "stress_difficulty",
    "order": 33,
    "sectionOrder": 5,
    "title": "When feeling stressed or facing difficulty",
    "group": "Any time",
    "section": "Any time",
    "kind": "dua",
    "instruction": null,
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
    "transliteration": "Laa ilaaha illallaahul-‘azeemul-haleem. Laa ilaaha illallaahu rabbul-‘arshil-‘azeem. Laa ilaaha illallaahu rabbus-samaawaati wa rabbul-ardi wa rabbul-‘arshil-kareem.",
    "meaning": {
      "en": "None has the right to be worshipped but Allah, the Incomparably Great, the Compassionate; Allah, the Lord of the Mighty Throne; Allah, the Lord of the heavens and the earth and the Lord of the Honourable Throne.",
      "hi": "अल्लाह के सिवा कोई पूज्य नहीं, जो महान और सब्र वाला है। अल्लाह के सिवा कोई पूज्य नहीं, जो महान अर्श का रब है। अल्लाह के सिवा कोई पूज्य नहीं, जो आसमानों और ज़मीन और सम्मानित अर्श का रब है।",
      "gu": "અલ્લાહ સિવાય કોઈ ઈલાહ નથી, જે અતિ મહાન અને સહનશીલ છે. અલ્લાહ સિવાય કોઈ ઈલાહ નથી, જે મહાન અર્શનો રબ છે. અલ્લાહ સિવાય કોઈ ઈલાહ નથી, જે આકાશો, ધરતી અને માનનીય અર્શનો રબ છે."
    },
    "source_pages": "13",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "iman",
    "order": 34,
    "sectionOrder": 6,
    "title": "For strengthening Imaan",
    "group": "Any time",
    "section": "Any time",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
    "transliteration": "Rabbanaa laa tuzigh quloobanaa ba’da iz hadaitanaa wa hab lanaa min ladunka rahmatan innaka antal-wahhaab.",
    "meaning": {
      "en": "Our Lord, let not our hearts deviate after You have guided us, and grant us from Yourself mercy. Indeed, You are the Bestower.",
      "hi": "ऐ हमारे रब! हमें हिदायत देने के बाद हमारे दिलों को टेढ़ा न होने दे और हमें अपने पास से रहमत प्रदान कर। निश्चय ही तू बहुत देने वाला है।",
      "gu": "હે અમારા રબ! તું અમને હિદાયત આપ્યા પછી અમારા દિલોને વાંકાં ન થવા દે અને અમને તારી તરફથી રહેમત આપ. નિશ્ચિતપણે તું ઘણું આપનાર છે."
    },
    "source_pages": "13",
    "reference": "Quran 3:8",
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "death_on_iman",
    "order": 35,
    "sectionOrder": 7,
    "title": "Du’a for death on Imaan",
    "group": "Any time",
    "section": "Any time",
    "kind": "quranic_verse",
    "instruction": null,
    "arabic": "فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنْتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
    "transliteration": "Faatiras-samaawaati wal-ard. Anta waliyyee fid-dunyaa wal-aakhirah. Tawaffanee musliman wa alhiqnee bis-saaliheen.",
    "meaning": {
      "en": "Creator of the heavens and the earth, You are my patron in this world and the Hereafter. Make me die in submission to You as a Muslim and admit me with the righteous.",
      "hi": "ऐ आसमानों और ज़मीन के पैदा करने वाले! तू ही दुनिया और आख़िरत में मेरा संरक्षक है। मुझे मुस्लिम की हालत में मौत दे और मुझे नेक लोगों में शामिल कर।",
      "gu": "હે આકાશો અને ધરતીના સર્જનહાર! તું જ દુનિયા અને આખિરતમાં મારો વાલી છે. મને મુસ્લિમ તરીકે મૃત્યુ આપ અને મને નેક લોકોમાં સામેલ કર."
    },
    "source_pages": "14",
    "reference": "Quran 12:101",
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "deceased",
    "order": 36,
    "sectionOrder": 8,
    "title": "Du’a for deceased at Janazah or while visiting graves",
    "group": "Any time",
    "section": "Any time",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا. اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيمَانِ",
    "transliteration": "Allahummaghfir lihayyinaa wa mayyitinaa, wa shaahidinaa wa ghaa’ibinaa, wa sagheerinaa wa kabeerinaa, wa dhakarinaa wa unthaanaa. Allahumma man ahyaitahu minnaa fa ahyihi ‘alal-Islaam, wa man tawaffaitahu minnaa fa tawaffahu ‘alal-eemaan.",
    "meaning": {
      "en": "O Allah, forgive our living and our dead, those who are present and those who are absent, our young and our old, our males and our females. O Allah, whoever of us You cause to live, let him live in Islam; and whoever of us You cause to die, let him die in faith.",
      "hi": "ऐ अल्लाह! हमारे जीवित और मृत, उपस्थित और अनुपस्थित, छोटे और बड़े, पुरुष और स्त्री सभी को माफ़ फ़रमा। हममें से जिसे तू जीवित रखे उसे इस्लाम पर जीवित रख और जिसे मौत दे उसे ईमान की हालत में मौत दे।",
      "gu": "હે અલ્લાહ! અમારા જીવિત અને મૃત, હાજર અને ગેરહાજર, નાના અને મોટા, પુરુષ અને સ્ત્રીઓને માફ કર. અમારમાંથી જેને તું જીવંત રાખે તેને ઇસ્લામ પર જીવંત રાખ અને જેને મૃત્યુ આપે તેને ઈમાનની હાલતમાં મૃત્યુ આપ."
    },
    "source_pages": "14",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "home_provision",
    "order": 37,
    "sectionOrder": 9,
    "title": "For peace at home and increase in provision",
    "group": "Any time",
    "section": "Any time",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَوَسِّعْ لِي فِي دَارِي، وَبَارِكْ لِي فِي رِزْقِي",
    "transliteration": "Allahummaghfirlee dhanbee, wa wassi’lee fee daaree, wa baarik lee fee rizqee.",
    "meaning": {
      "en": "O Allah, forgive my sin, expand my home for me and bless me in my livelihood.",
      "hi": "ऐ अल्लाह! मेरे गुनाह को माफ़ कर, मेरे घर में विस्तार दे और मेरी रोज़ी में बरकत दे।",
      "gu": "હે અલ્લાહ! મારા ગુનાને માફ કર, મારા ઘરમાં વિશાળતા આપ અને મારી રોજીમાં બરકત આપ."
    },
    "source_pages": "15",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "sustenance",
    "order": 38,
    "sectionOrder": 10,
    "title": "For increase in sustenance",
    "group": "Any time",
    "section": "Any time",
    "kind": "dua",
    "instruction": "The source instructs reciting this 100 times after Fajr time begins, before praying Fajr.",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ، أَسْتَغْفِرُ اللَّهَ",
    "transliteration": "Subhaanallaahi wa bihamdihi, subhaanallaahil-‘azeem. Astaghfirullah.",
    "meaning": {
      "en": "Glory be to Allah and praise be to Him. Glory be to Allah, the Most Great. I seek forgiveness from Allah.",
      "hi": "अल्लाह पाक है और उसी के लिए सारी प्रशंसा है। अल्लाह बहुत महान है। मैं अल्लाह से माफी मांगता/मांगती हूँ।",
      "gu": "અલ્લાહ પવિત્ર છે અને બધી પ્રશંસા તેની જ છે. અલ્લાહ અતિ મહાન છે. હું અલ્લાહ પાસે માફી માગું છું."
    },
    "source_pages": "15",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "pain_ache",
    "order": 39,
    "sectionOrder": 11,
    "title": "For pain / ache",
    "group": "Any time",
    "section": "Any time",
    "kind": "dua",
    "instruction": "Place the right hand on the aching place and recite “Bismillaahir Rahmaanir Raheem” 3 times, then recite the main du’a 7 times.",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nأَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
    "transliteration": "Bismillaahir-Rahmaanir-Raheem. A’oodhu bi’izzatillaahi wa qudratihi min sharri maa ajidu wa uhaadhiru.",
    "meaning": {
      "en": "In the name of Allah, the Most Merciful, the Most Compassionate. I seek refuge with Allah and with His Power from the evil that afflicts me and that which I apprehend.",
      "hi": "अल्लाह के नाम से, जो बहुत मेहरबान और रहम करने वाला है। मैं अल्लाह की इज़्ज़त और उसकी कुदरत की पनाह लेता/लेती हूँ उस तकलीफ़ के बुरे असर से जो मुझे महसूस होती है और जिससे मुझे डर लगता है।",
      "gu": "અલ્લાહના નામથી, જે અતિ કૃપાળુ અને દયાળુ છે. જે તકલીફ મને થાય છે અને જેનાથી મને ભય લાગે છે તેના અશુભ અસરથી હું અલ્લાહની ઇજ્જત અને તેની કૂદરતની પનાહ માગું છું."
    },
    "source_pages": "15",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "madinah_border",
    "order": 40,
    "sectionOrder": 1,
    "title": "At the entrance gate / border of Madeenah",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ هَذَا حَرَمُ نَبِيِّكَ، فَاجْعَلْهُ لِي وِقَايَةً مِنَ النَّارِ، وَأَمَانًا مِنَ الْعَذَابِ، وَسُوْءِ الْحِسَابِ",
    "transliteration": "Allahumma haaza haramu nabiyyika, faj’alhu lee wiqaayatan minan-naar, wa amaanan minal-‘azaab, wa soo’il-hisaab.",
    "meaning": {
      "en": "O Allah, this is the Haram (sanctuary) of Your Prophet. Let it be for me a means of refuge from the Hellfire, a refuge from punishment and a refuge from the trial of reckoning.",
      "hi": "ऐ अल्लाह! यह तेरे नबी का हरम है। इसे मेरे लिए जहन्नम की आग से सुरक्षा, अज़ाब से अमान और बुरे हिसाब से पनाह का ज़रिया बना।",
      "gu": "હે અલ્લાહ! આ તારા નબીનું હરમ છે. તેને મારા માટે નરકની આગથી રક્ષા, અઝાબથી અમાન અને ખરાબ હિસાબથી બચાવનું સાધન બનાવ."
    },
    "source_pages": "16",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "madinah_city",
    "order": 41,
    "sectionOrder": 2,
    "title": "After entering the city of Madeenah",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "بِسْمِ اللَّهِ مَا شَاءَ اللَّهُ، لَا قُوَّةَ إِلَّا بِاللَّهِ. رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَلْ لِي مِنْ لَدُنْكَ سُلْطَانًا نَصِيرًا. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ، وَارْزُقْنِي فِي زِيَارَةِ نَبِيِّكَ مَا رَزَقْتَهُ أَوْلِيَاءَكَ وَأَهْلَ طَاعَتِكَ، وَاغْفِرْ لِي وَارْحَمْنِي يَا خَيْرَ مَسْؤُولٍ",
    "transliteration": "Bismillahi maa shaa Allah, laa quwwata illaa billah. Rabbi adkhilnee mudkhala sidqin wa akhrijnee mukhraja sidqin waj’al lee min ladunka sultaanan naseeraa. Allahumma-ftah lee abwaaba rahmatik, warzuqnee fee ziyaarati nabiyyika maa razaqtahu awliyaa-aka wa ahla taa’atik, waghfir lee warhamnee yaa khaira mas’ool.",
    "meaning": {
      "en": "In the name of Allah; what Allah wills; there is no power except with Allah. My Lord, admit me by an entrance of truth and bring me out by an exit of truth, and grant me from Yourself a supporting authority. O Allah, open for me the gates of Your mercy, grant me in visiting Your Prophet what You granted Your close ones and people of obedience, and forgive me and have mercy on me, O best of those who are asked.",
      "hi": "अल्लाह के नाम से; जो अल्लाह चाहे। अल्लाह के सिवा कोई ताकत नहीं। ऐ मेरे रब! मुझे सच्चाई के साथ प्रवेश दे और सच्चाई के साथ निकाल, और अपनी ओर से मेरे लिए मददगार शक्ति प्रदान कर। ऐ अल्लाह! मेरे लिए अपनी रहमत के दरवाज़े खोल, अपने नबी की ज़ियारत में मुझे वह बरकत दे जो तूने अपने खास बंदों और अपनी इताअत करने वालों को दी है। मुझे माफ़ कर और मुझ पर रहम कर।",
      "gu": "અલ્લાહના નામથી; અલ્લાહ જે ઇચ્છે. અલ્લાહ સિવાય કોઈ શક્તિ નથી. હે મારા રબ! મને સત્ય સાથે પ્રવેશ આપ અને સત્ય સાથે બહાર કાઢ અને પોતાની તરફથી મારી માટે મદદગાર શક્તિ આપ. હે અલ્લાહ! મારી માટે તારી રહેમતના દરવાજા ખોલ, તારા નબીની ઝિયારતમાં મને તે બરકત આપ જે તું પોતાના ખાસ બંદાઓ અને આજ્ઞાપાલકોને આપે છે. મને માફ કર અને માર પર રહેમ કર."
    },
    "source_pages": "16",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "madinah_haram",
    "order": 42,
    "sectionOrder": 3,
    "title": "While going into the Haram of Madeenah",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "اللَّهُمَّ هَذَا حَرَمٌ حَرَّمْتَهُ عَلَى لِسَانِ نَبِيِّكَ وَرَسُولِكَ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، فَأَجْعَلْهُ لِي وِقَايَةً مِنَ النَّارِ وَأَمَانًا مِنَ الْعَذَابِ، وَبَارِكْ لِي فِيهِ كَمَا بَارَكْتَ فِي حَرَمِ بَيْتِكَ الْحَرَامِ، وَحَرِّمْ وَجْهِي وَلَحْمِي وَدَمِي وَعِظَامِي عَلَى النَّارِ يَوْمَ تَبْعَثُ عِبَادَكَ، وَارْزُقْنِي مِنْ بَرَكَاتِ مَا رَزَقْتَ أَوْلِيَاءَكَ وَأَهْلَ طَاعَتِكَ، وَوَفِّقْنِي فِيهِ لِحُسْنِ الْأَدَبِ وَفِعْلِ الْخَيْرِ وَتَرْكِ الشَّرِّ",
    "transliteration": "Allahumma haazaa haramun harramtahu ‘alaa lisaani nabiyyika wa rasoolika sallallaahu ‘alaihi wa sallam, faj’alhu lee wiqaayatan minan-naar wa amaanan minal-‘azaab, wa baarik lee feehi kamaa baarakta fee harami baitikal-haraam, wa harrim wajhee wa lahmee wa dammee wa ‘izaamee ‘alan-naar yawma tab’athu ‘ibaadak, warzuqnee min barakaati maa razaqta awliyaa-aka wa ahla taa’atik, wa waffiqnee feehi li-husnil-adabi wa fi’lil-khairi wa tarkish-sharr.",
    "meaning": {
      "en": "O Allah, this is the sanctuary that You made sacred by the tongue of Your beloved Messenger. Grant it to me as protection from the Fire and safety from punishment; bless it as You blessed the sanctuary of Your House. Protect my face, flesh, blood and bones from the Fire on the day You resurrect Your servants. Grant me from this visit what You granted Your close ones and righteous servants, and enable me to maintain proper etiquette, do good deeds and leave evil.",
      "hi": "ऐ अल्लाह! यह वह हरम है जिसे तूने अपने प्यारे रसूल ﷺ की ज़ुबान से पवित्र ठहराया। इसे मेरे लिए आग से सुरक्षा और अज़ाब से अमान बना और इसमें वैसी बरकत दे जैसी तूने अपने पवित्र घर के हरम में दी। जिस दिन तू अपने बंदों को उठाए, मेरे चेहरे, मांस, खून और हड्डियों को आग पर हराम कर दे। मुझे इस ज़ियारत में वह बरकत दे जो तूने अपने करीबी और नेक बंदों को दी है और मुझे अच्छे आदाब, नेक काम और बुराई छोड़ने की तौफ़ीक दे।",
      "gu": "હે અલ્લાહ! આ તે હરમ છે જેને તું પોતાના પ્રિય રસૂલ ﷺ ની જીભથી પવિત્ર બનાવ્યું. તેને મારા માટે આગથી રક્ષા અને અઝાબથી અમાન બનાવ અને તેમાં એવી બરકત આપ જેવી તું પોતાના પવિત્ર ઘરના હરમમાં આપી. જે દિવસે તું પોતાના બંદાઓને ઊભા કરશ, મારા ચહેરા, માંસ, લોહી અને હાડકાંને આગથી બચાવ. આ ઝિયારતમાં મને તારી નજીકના અને નેક બંદાઓને આપેલી બરકત આપ અને સારા આદાબ, સારા કામ અને બુરાઈ છોડવાની તૌફીક આપ."
    },
    "source_pages": "17",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "masjid_nabawi",
    "order": 43,
    "sectionOrder": 4,
    "title": "While entering Masjid Nabawi",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    "transliteration": "Bismillahi, wassalaatu wassalaamu ‘alaa rasoolillah. Allahummaghfirlee zunoobee waftahlee abwaaba rahmatik.",
    "meaning": {
      "en": "In the name of Allah, and peace and blessings upon the Messenger of Allah. O Allah, forgive my sins and open for me the gates of Your mercy.",
      "hi": "अल्लाह के नाम से। अल्लाह के रसूल पर दुरूद और सलाम हो। ऐ अल्लाह! मेरे गुनाह माफ़ कर और मेरे लिए अपनी रहमत के दरवाज़े खोल दे।",
      "gu": "અલ્લાહના નામથી. અલ્લાહના રસૂલ પર દરૂદ અને સલામ હોય. હે અલ્લાહ! મારા ગુનાઓ માફ કર અને મારી માટે તારી રહેમતના દરવાજા ખોલી દે."
    },
    "source_pages": "17",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "salaam_prophet",
    "order": 44,
    "sectionOrder": 5,
    "title": "Giving Salaam to the Prophet ﷺ",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": "The source says to ask for intercession on the Day of Judgement and ask forgiveness from Allah after this salaam.",
    "arabic": "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا نَبِيَّ اللَّهِ، الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا حَبِيبَ اللَّهِ، الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا رَحْمَةً لِلْعَالَمِينَ، الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا شَفِيعَ الْمُذْنِبِينَ، الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا سَيِّدَ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ، وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
    "transliteration": "Assalaatu assalaamu ‘alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh. Assalaatu assalaamu ‘alaika ya rasoolallaah. Assalaatu assalaamu ‘alaika ya nabiyallaah. Assalaatu assalaamu ‘alaika ya habiballaah. Assalaatu assalaamu ‘alaika ya rahmatan lil-‘aalameen. Assalaatu assalaamu ‘alaika ya shafee’al-muznibeen. Assalaatu assalaamu ‘alaika ya sayyidal-anbiyaa’i wal-mursaleen, wa rahmatullaahi wa barakaatuh.",
    "meaning": {
      "en": "Peace be upon you, O Messenger of Allah. Peace be upon you, O Prophet of Allah. Peace be upon you, O beloved of Allah. Peace be upon you, O mercy for the worlds. Peace be upon you, O intercessor for the sinners. Peace be upon you, O leader of the Prophets and Messengers, and the mercy and blessings of Allah be upon you.",
      "hi": "आप पर सलाम हो, ऐ अल्लाह के रसूल। आप पर सलाम हो, ऐ अल्लाह के नबी। आप पर सलाम हो, ऐ अल्लाह के प्यारे। आप पर सलाम हो, ऐ सारे जहानों के लिए रहमत। आप पर सलाम हो, ऐ गुनाहगारों के शफ़ीअ। आप पर सलाम हो, ऐ तमाम नबियों और रसूलों के सरदार। और आप पर अल्लाह की रहमत और बरकतें हों।",
      "gu": "આપ પર સલામ હોય, હે અલ્લાહના રસૂલ. આપ પર સલામ હોય, હે અલ્લાહના નબી. આપ પર સલામ હોય, હે અલ્લાહના પ્રિય. આપ પર સલામ હોય, હે સમગ્ર જહાન માટે રહેમત. આપ પર સલામ હોય, હે ગુનેગારોના શફીઅ. આપ પર સલામ હોય, હે બધા નબીઓ અને રસૂલો ના સરદાર. અને આપ પર અલ્લાહની રહેમત અને બરકતો હોય."
    },
    "source_pages": "18",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "salaam_prophet_additional",
    "order": 45,
    "sectionOrder": 6,
    "title": "Additional Salaam / testimony",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "أَشْهَدُ أَنَّكَ بَلَّغْتَ الرِّسَالَةَ، وَأَدَّيْتَ الْأَمَانَةَ، وَنَصَحْتَ الْأُمَّةَ، وَكَشَفْتَ الْغُمَّةَ، وَجَاهَدْتَ فِي اللَّهِ حَقَّ جِهَادِهِ، وَعَبَدْتَ رَبَّكَ حَتَّى أَتَاكَ الْيَقِينُ. السَّلَامُ عَلَيْكَ وَعَلَى آلِ بَيْتِكَ وَأَزْوَاجِكَ وَذُرِّيَّتِكَ وَأَصْحَابِكَ أَجْمَعِينَ، السَّلَامُ عَلَيْكَ وَعَلَى سَائِرِ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ، وَجَمِيعِ عِبَادِ اللَّهِ الصَّالِحِينَ، جَزَاكَ اللَّهُ يَا رَسُولَ اللَّهِ أَفْضَلَ مَا جَزَى نَبِيًّا وَرَسُولًا عَنْ أُمَّتِهِ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّكَ عَبْدُهُ وَرَسُولُهُ، وَأَشْهَدُ أَنَّكَ قَدْ بَلَّغْتَ الرِّسَالَةَ، وَأَدَّيْتَ الْأَمَانَةَ، وَنَصَحْتَ الْأُمَّةَ",
    "transliteration": "Ashhadu annaka ballaghtar-risaalata, wa addaital-amaanata, wa nasahtal-ummata, wa kashaftal-ghummata, wa jaahadta fillaahi haqqa jihaadihi, wa ‘abatta rabbaka hattaa ataakal-yaqeen. Assalaamu ‘alaika wa ‘alaa aali baitika wa azwaajika wa dhurriyyatika wa ashaabika ajma’een. Assalaamu ‘alaika wa ‘alaa saa’irilanbiyaa’i wal-mursaleena wa jamee’i ‘ibaadillaahis-saaliheen. Jazaakallaahu yaa rasoolallaahi afdhalamaa jazaa nabiyyan wa rasoolan ‘an ummatih. Ashhadu an laa ilaaha illallaahu wahdahu laa shareeka lah, wa ashhadu annaka ‘abduhu wa rasooluh, wa ashhadu annaka qad ballaghtar-risaalata wa addaital-amaanata wa nasahtal-ummah.",
    "meaning": {
      "en": "I bear witness that you conveyed the Message, fulfilled the trust, advised the Community, removed distress, strove for Allah as He deserves, and worshipped your Lord until certainty came to you. Peace be upon you, your household, wives, progeny and all your Companions; upon the rest of the Prophets and Messengers and all righteous servants of Allah. May Allah reward you, O Messenger of Allah, with the best reward a Prophet and Messenger ever received on behalf of his community. I bear witness that there is no god except Allah alone, without partner, and that you are His servant and Messenger. I also bear witness that you conveyed the Message, fulfilled the trust and advised the Community.",
      "hi": "मैं गवाही देता/देती हूँ कि आपने संदेश पहुँचा दिया, अमानत अदा की, उम्मत की भलाई चाही, कठिनाई दूर की, अल्लाह के लिए जैसा हक़ था वैसा जिहाद किया और यक़ीन आने तक अपने रब की इबादत की। आप पर, आपके घरवालों, आपकी पत्नियों, आपकी संतान और तमाम सहाबा पर सलाम हो। तमाम नबियों और रसूलों तथा अल्लाह के नेक बंदों पर भी सलाम हो। ऐ अल्लाह के रसूल! अल्लाह आपको उस बेहतरीन बदले से नवाज़े जो किसी नबी या रसूल को उसकी उम्मत की ओर से मिला हो। मैं गवाही देता/देती हूँ कि अल्लाह के सिवा कोई पूज्य नहीं, वह अकेला है, उसका कोई साझीदार नहीं; और मैं गवाही देता/देती हूँ कि आप उसके बंदे और रसूल हैं।",
      "gu": "હું સાક્ષી આપું છું કે તમે સંદેશો પહોંચાડ્યો, અમાનત અદા કરી, ઉમ્મતની ભલાઈ ઈચ્છી, મુશ્કેલી દૂર કરી, અલ્લાહ માટે જેમ પ્રયત્ન કરવો જોઈએ તેમ પ્રયત્ન કર્યો અને યકીન આવે ત્યાં સુધી તમારા રબની ઈબાદત કરી. આપ પર, આપના પરિવાર, આપની પત્નીઓ, સંતાનો અને તમામ સહાબા પર સલામ હોય. તમામ નબીઓ, રસૂલો અને અલ્લાહના નેક બંદાઓ પર પણ સલામ હોય. હે અલ્લાહના રસૂલ! અલ્લાહ તમને તમારી ઉમ્મતની તરફથી મળેલા શ્રેષ્ઠ બદલાથી નવાઝે. હું સાક્ષી આપું છું કે અલ્લાહ સિવાય કોઈ ઈલાહ નથી; તે એકલો છે, તેનો કોઈ ભાગીદાર નથી; અને હું સાક્ષી આપું છું કે તમે તેના બંદા અને રસૂલ છો."
    },
    "source_pages": "18-19",
    "reference": null,
    "notes": null,
    "status": "recommended"
  },
  {
    "id": "salaam_on_behalf",
    "order": 46,
    "sectionOrder": 7,
    "title": "Giving Salaam to the Prophet on behalf of others",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ مِنْ (اذكر اسم الشخص)",
    "transliteration": "Assalaamu ‘alaika yaa rasoolallaahi min (mention their name).",
    "meaning": {
      "en": "Peace be upon you, O Messenger of Allah, from (mention the person’s name).",
      "hi": "ऐ अल्लाह के रसूल! आप पर सलाम हो, (व्यक्ति का नाम) की ओर से।",
      "gu": "હે અલ્લાહના રસૂલ! આપ પર સલામ હોય, (વ્યક્તિના નામ) તરફથી."
    },
    "source_pages": "19",
    "reference": null,
    "notes": null,
    "status": "established"
  },
  {
    "id": "salaam_abu_bakr",
    "order": 47,
    "sectionOrder": 8,
    "title": "Giving Salaam upon Abu Bakr Siddiq",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "السَّلَامُ عَلَيْكَ يَا أَبَا بَكْرٍ، السَّلَامُ عَلَيْكَ يَا خَلِيفَةَ رَسُولِ اللَّهِ، السَّلَامُ عَلَيْكَ يَا صَاحِبَ رَسُولِ اللَّهِ فِي الْغَارِ، وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، جَزَاكَ اللَّهُ عَنَّا خَيْرَ الْجَزَاءِ",
    "transliteration": "Assalaamu ‘alaika yaa Abaa Bakr, assalaamu ‘alaika yaa khaleefata rasoolillaah, assalaamu ‘alaika yaa saahiba rasoolillaahi fil-ghaar, wa rahmatullaahi wa barakaatuh. Jazaakallaahu ‘annaa khairal-jazaa’.",
    "meaning": {
      "en": "Peace be upon you, O Abu Bakr; peace be upon you, O successor of the Messenger of Allah; peace be upon you, O companion of the Prophet in the cave. May the mercy and blessings of Allah be upon you. May Allah reward you with good on our behalf.",
      "hi": "ऐ अबू बकर! आप पर सलाम हो। ऐ अल्लाह के रसूल के ख़लीफ़ा! आप पर सलाम हो। ऐ ग़ार में रसूलुल्लाह के साथी! आप पर सलाम हो। आप पर अल्लाह की रहमत और बरकतें हों। अल्लाह आपको हमारी ओर से बेहतरीन बदला दे।",
      "gu": "હે અબૂ બકર! આપ પર સલામ હોય. હે અલ્લાહના રસૂલના ખલીફા! આપ પર સલામ હોય. હે ગુફામાં નબીના સાથી! આપ પર સલામ હોય. આપ પર અલ્લાહની રહેમત અને બરકતો હોય. અલ્લાહ આપને અમારી તરફથી શ્રેષ્ઠ બદલો આપે."
    },
    "source_pages": "19",
    "reference": null,
    "notes": null,
    "status": "traditional"
  },
  {
    "id": "salaam_umar",
    "order": 48,
    "sectionOrder": 9,
    "title": "Giving Salaam upon Umar Faruq",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "السَّلَامُ عَلَيْكَ يَا أَمِيرَ الْمُؤْمِنِينَ عُمَرَ الْفَارُوقِ، وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، جَزَاكَ اللَّهُ عَنَّا خَيْرَ الْجَزَاءِ",
    "transliteration": "Assalaamu ‘alaika yaa ameeral-mu’mineena ‘Umaral-Faarooq, wa rahmatullaahi wa barakaatuh. Jazaakallaahu ‘annaa khairal-jazaa’.",
    "meaning": {
      "en": "Peace be upon you, O Umar, O leader of the believers. May the mercy and blessings of Allah be upon you. May Allah reward you with good on our behalf.",
      "hi": "ऐ उमर फ़ारूक़! आप पर सलाम हो, ऐ मोमिनों के अमीर। आप पर अल्लाह की रहमत और बरकतें हों। अल्लाह आपको हमारी ओर से बेहतरीन बदला दे।",
      "gu": "હે ઉમર ફારૂક! આપ પર સલામ હોય, હે મોમીનોના અમીર. આપ પર અલ્લાહની રહેમત અને બરકતો હોય. અલ્લાહ આપને અમારી તરફથી શ્રેષ્ઠ બદલો આપે."
    },
    "source_pages": "19",
    "reference": null,
    "notes": null,
    "status": "traditional"
  },
  {
    "id": "other_graves",
    "order": 49,
    "sectionOrder": 10,
    "title": "While visiting other graves",
    "group": "Madeenah",
    "section": "Madeenah",
    "kind": "dua",
    "instruction": null,
    "arabic": "السَّلَامُ عَلَيْكُمْ يَا أَهْلَ الْقُبُورِ مِنَ الْمُسْلِمِينَ وَالْمُؤْمِنِينَ، أَنْتُمْ لَنَا سَلَفٌ وَنَحْنُ لَكُمْ تَبَعٌ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ. يَغْفِرُ اللَّهُ لَنَا وَلَكُمْ، وَيَرْحَمُ اللَّهُ وَإِيَّاكُمْ",
    "transliteration": "Assalaamu ‘alaikum yaa ahlal-quboori minal-muslimeena wal-mu’mineen. Antum lanaa salafun wa nahnu lakum taba’. Wa innaa in shaa’allaahu bikum laahiqoon. Yaghfirullaahu lanaa wa lakum, wa yarhamullaahu wa iyyaakum.",
    "meaning": {
      "en": "Peace be upon you, O people of the graves, among the Muslims and believers. You have preceded us, and we are your followers. Insha’Allah we will join you. May Allah forgive us and you, and may Allah have mercy upon us and upon you.",
      "hi": "ऐ कब्र वालों! तुम पर सलाम हो, जो मुसलमान और ईमान वाले हो। तुम हमसे पहले चले गए और हम तुम्हारे पीछे आने वाले हैं। इंशाअल्लाह हम भी तुमसे आ मिलेंगे। अल्लाह हमें और तुम्हें माफ़ करे और हम पर तथा तुम पर रहम करे।",
      "gu": "હે કબરોના રહેવાસીઓ, તમારા પર સલામ હોય; તમે મુસ્લિમ અને ઈમાનવાળા છો. તમે અમથી પહેલાં જઈ ચૂક્યા છો અને અમે તમારા અનુગામી છીએ. ઇનશા અલ્લાહ અમે પણ તમારાથી મળીશું. અલ્લાહ અમને અને તમને માફ કરે અને અમ પર તથા તમારી પર રહેમ કરે."
    },
    "source_pages": "20",
    "reference": null,
    "notes": null,
    "status": "established"
  }
];

export const DUA_GROUPS = [
  "All",
  "Journey & Umrah",
  "Umrah",
  "Makkah",
  "Tawaf",
  "Sa’ee",
  "Any time",
  "Madeenah"
];

export function getAllDuas(): Dua[] {
  return DUAS;
}

export function getDuasByGroup(group: string): Dua[] {
  if (!group || group === "All") return DUAS;
  const clean = (s: string) => s.replace(/[’'ʻ‘]/g, "'").toLowerCase().trim();
  const target = clean(group);
  return DUAS.filter((d) => {
    const dGroup = clean(d.group);
    return (
      dGroup === target ||
      (target === "sa'i" && dGroup === "sa'ee") ||
      (target === "sa'ee" && dGroup === "sa'i")
    );
  });
}

export function getDuaById(id: string): Dua | undefined {
  return DUAS.find((d) => d.id === id);
}

// Complete Gujarati titles for all 49 Duas (indexed by both id and exact English title)
export const DUA_TITLES_GU: Record<string, string> = {
  // ── Journey & Umrah ──
  "leaving_home": "ઘરથી નીકળતી વખતની દુઆ",
  "Du’a when Leaving Home": "ઘરથી નીકળતી વખતની દુઆ",
  "riding_vehicle": "સવારી (ગાડી / વિમાન) પર બેસતી વખતની દુઆ",
  "When riding a car / plane": "સવારી (ગાડી / વિમાન) પર બેસતી વખતની દુઆ",
  "intention_umrah": "ઉમરાહની નિય્યત (ઇરાદો)",
  "Intention for Umrah": "ઉમરાહની નિય્યત (ઇરાદો)",
  "talbiyah": "તલ્બિયાહ (લબ્બૈક)",
  "Talbiyah": "તલ્બિયાહ (લબ્બૈક)",
  "frequent_dua": "વારંવાર પઢવા માટેની મહત્વની દુઆ",
  "Important Du’a to be recited frequently": "વારંવાર પઢવા માટેની મહત્વની દુઆ",

  // ── Makkah ──
  "enter_masjid_haram": "મસ્જિદુલ હરામ (કે કોઈ પણ મસ્જિદ)માં પ્રવેશતી વખતની દુઆ",
  "When entering Masjid al-Haraam (or any masjid)": "મસ્જિદુલ હરામ (કે કોઈ પણ મસ્જિદ)માં પ્રવેશતી વખતની દુઆ",
  "sighting_kaaba": "કાબા શરીફ પર પહેલી નજર પડતી વખતની દુઆ",
  "Du’a upon sighting the Ka’bah": "કાબા શરીફ પર પહેલી નજર પડતી વખતની દુઆ",
  "sighting_kaaba_additional": "કાબા શરીફ જોઈને વધારાની દુઆ",
  "Additional du’a upon sighting the Ka’bah": "કાબા શરીફ જોઈને વધારાની દુઆ",
  "zamzam": "ઝમઝમનું પાણી પીતી વખતની દુઆ",
  "Du’a for drinking Zam Zam": "ઝમઝમનું પાણી પીતી વખતની દુઆ",

  // ── Tawaf ──
  "tawaf_intention": "તવાફની નિય્યત (ઇરાદો)",
  "Intention for Tawaaf": "તવાફની નિય્યત (ઇરાદો)",
  "hajr_aswad": "હજરે અસ્વદને ચૂમતી (ઇસ્તિલામ કરતી) વખતની દુઆ",
  "Du’a while kissing the Hajr-e-Aswad": "હજરે અસ્વદને ચૂમતી (ઇસ્તિલામ કરતી) વખતની દુઆ",
  "after_istilam": "ઇસ્તિલામ પછી પઢવાની દુઆ",
  "After Istilam (kissing the Hajr-e-Aswad)": "ઇસ્તિલામ પછી પઢવાની દુઆ",
  "istilam_salawat": "ઇસ્તિલામ બાદ વધુ પઢવાની દુઆ",
  "then_recite_after_istilam": "ઇસ્તિલામ બાદ વધુ પઢવાની દુઆ",
  "Then recite after Istilam": "ઇસ્તિલામ બાદ વધુ પઢવાની દુઆ",
  "tawaf_house_protection": "દોઝખની આગથી બચવાની દુઆ",
  "protection_fire": "દોઝખની આગથી બચવાની દુઆ",
  "Du’a for protection from the Fire": "દોઝખની આગથી બચવાની દુઆ",
  "tawaf_atiq": "હે પ્રાચીન ઘર (કાબા)ના રબ! વધારાની દુઆ",
  "lord_ancient_house": "હે પ્રાચીન ઘર (કાબા)ના રબ! વધારાની દુઆ",
  "Additional du’a - O Lord of the Ancient House": "હે પ્રાચીન ઘર (કાબા)ના રબ! વધારાની દુઆ",
  "rukn_iraqi": "રુકને ઇરાકી પાસે પઢવાની દુઆ",
  "Near Rukn-e-Iraqi": "રુકને ઇરાકી પાસે પઢવાની દુઆ",
  "mizab_rahmah": "મીઝાબે રહમત (પરનાળા) નીચે પઢવાની દુઆ",
  "Near Mizab-e-Rahmah": "મીઝાબે રહમત (પરનાળા) નીચે પઢવાની દુઆ",
  "rukn_shami": "રુકને શામી પાસે પઢવાની દુઆ",
  "Near Rukn-e-Shami": "રુકને શામી પાસે પઢવાની દુઆ",
  "rukn_yamani": "રુકને યમાની પાસે પઢવાની દુઆ",
  "Near Rukn-e-Yamani": "રુકને યમાની પાસે પઢવાની દુઆ",
  "between_yamani_aswad": "રુકને યમાની અને હજરે અસ્વદ વચ્ચેની દુઆ (રબ્બના આતિના)",
  "Between Rukn-e-Yamani and Hajr-e-Aswad": "રુકને યમાની અને હજરે અસ્વદ વચ્ચેની દુઆ (રબ્બના આતિના)",

  // ── Sa’ee ──
  "saee_opening": "સફા તરફ જતાં પઢવાની આયત",
  "proceed_safaa": "સફા તરફ જતાં પઢવાની આયત",
  "Proceed to Safaa - opening verse": "સફા તરફ જતાં પઢવાની આયત",
  "safa": "સફા પર્વત પર કાબારુખ થઈને પઢવાની દુઆ",
  "Facing the Ka’bah from Safa": "સફા પર્વત પર કાબારુખ થઈને પઢવાની દુઆ",
  "safa_marwa_main": "સફા અને મરવા વચ્ચે પઢવાની મુખ્ય દુઆ",
  "To be recited between Safa and Marwa": "સફા અને મરવા વચ્ચે પઢવાની મુખ્ય દુઆ",
  "saee_rabbana": "બંને જહાંની ભલાઈ માટે દુઆ (રબ્બના)",
  "Rabbanaa - goodness in both worlds": "બંને જહાંની ભલાઈ માટે દુઆ (રબ્બના)",
  "saee_rabbigfir": "રબ્બિગફિર વરહમ દુઆ (માફી અને રહેમતની દુઆ)",
  "saee_rabbighfir": "રબ્બિગફિર વરહમ દુઆ (માફી અને રહેમતની દુઆ)",
  "Rabbigfir warham": "રબ્બિગફિર વરહમ દુઆ (માફી અને રહેમતની દુઆ)",
  "saee_hudaa": "હિદાયત, પરહેઝગારી, પાકીઝગી અને સંતોષ માટે દુઆ",
  "saee_guidance": "હિદાયત, પરહેઝગારી, પાકીઝગી અને સંતોષ માટે દુઆ",
  "Guidance, piety, chastity and sufficiency": "હિદાયત, પરહેઝગારી, પાકીઝગી અને સંતોષ માટે દુઆ",
  "saee_zikr": "અલ્લાહના ઝિક્ર અને શુક્ર માટે સહાયની દુઆ",
  "saee_help_remember": "અલ્લાહના ઝિક્ર અને શુક્ર માટે સહાયની દુઆ",
  "Help me remember You": "અલ્લાહના ઝિક્ર અને શુક્ર માટે સહાયની દુઆ",
  "green_lights": "સઈમાં લીલી લાઇટો વચ્ચે પઢવાની દુઆ",
  "Between the green lights in Sa’ee": "સઈમાં લીલી લાઇટો વચ્ચે પઢવાની દુઆ",

  // ── Any time ──
  "forgiveness": "ગુનાહોની માફી (મગફિરત) માટેની દુઆ",
  "Du’a for forgiveness": "ગુનાહોની માફી (મગફિરત) માટેની દુઆ",
  "parents": "માતા-પિતા માટેની દુઆ",
  "Du’a for parents": "માતા-પિતા માટેની દુઆ",
  "family_children": "પરિવાર અને સંતાનો માટેની દુઆ",
  "Du’a for family and children": "પરિવાર અને સંતાનો માટેની દુઆ",
  "family_children_prayer": "પરિવાર અને બાળકો માટે બીજી દુઆ (નમાઝ કાયમ કરવા માટે)",
  "family_children_2": "પરિવાર અને બાળકો માટે બીજી દુઆ (નમાઝ કાયમ કરવા માટે)",
  "Another du’a for family and children": "પરિવાર અને બાળકો માટે બીજી દુઆ (નમાઝ કાયમ કરવા માટે)",
  "stress_difficulty": "મુશ્કેલી કે ચિંતા વખતે પઢવાની દુઆ",
  "stressed_difficulty": "મુશ્કેલી કે ચિંતા વખતે પઢવાની દુઆ",
  "When feeling stressed or facing difficulty": "મુશ્કેલી કે ચિંતા વખતે પઢવાની દુઆ",
  "iman": "ઈમાનની મજબૂતી માટેની દુઆ",
  "strengthening_imaan": "ઈમાનની મજબૂતી માટેની દુઆ",
  "For strengthening Imaan": "ઈમાનની મજબૂતી માટેની દુઆ",
  "death_on_iman": "ઈમાન પર ખાતિમો (મૃત્યુ) થવા માટેની દુઆ",
  "death_on_imaan": "ઈમાન પર ખાતિમો (મૃત્યુ) થવા માટેની દુઆ",
  "Du’a for death on Imaan": "ઈમાન પર ખાતિમો (મૃત્યુ) થવા માટેની દુઆ",
  "deceased": "જનાઝા / મૈયત અથવા કબર પર પઢવાની દુઆ",
  "deceased_janazah": "જનાઝા / મૈયત અથવા કબર પર પઢવાની દુઆ",
  "Du’a for deceased at Janazah or while visiting graves": "જનાઝા / મૈયત અથવા કબર પર પઢવાની દુઆ",
  "home_provision": "ઘરમાં શાંતિ અને રોજીમાં બરકત માટેની દુઆ",
  "peace_provision": "ઘરમાં શાંતિ અને રોજીમાં બરકત માટેની દુઆ",
  "For peace at home and increase in provision": "ઘરમાં શાંતિ અને રોજીમાં બરકત માટેની દુઆ",
  "sustenance": "રોજી અને રિઝ્કમાં વધારા માટેની દુઆ",
  "increase_sustenance": "રોજી અને રિઝ્કમાં વધારા માટેની દુઆ",
  "For increase in sustenance": "રોજી અને રિઝ્કમાં વધારા માટેની દુઆ",
  "pain_ache": "દર્દ કે બીમારી વખતે પઢવાની દુઆ",
  "For pain / ache": "દર્દ કે બીમારી વખતે પઢવાની દુઆ",

  // ── Madeenah ──
  "madinah_border": "મદીના મુનવ્વરાના પ્રવેશદ્વારે પઢવાની દુઆ",
  "entrance_gate_madeenah": "મદીના મુનવ્વરાના પ્રવેશદ્વારે પઢવાની દુઆ",
  "At the entrance gate / border of Madeenah": "મદીના મુનવ્વરાના પ્રવેશદ્વારે પઢવાની દુઆ",
  "madinah_city": "મદીના શરીફમાં પ્રવેશ્યા પછીની દુઆ",
  "after_entering_madeenah": "મદીના શરીફમાં પ્રવેશ્યા પછીની દુઆ",
  "After entering the city of Madeenah": "મદીના શરીફમાં પ્રવેશ્યા પછીની દુઆ",
  "madinah_haram": "મદીનાના હરમમાં પ્રવેશતી વખતની દુઆ",
  "going_into_haram_madeenah": "મદીનાના હરમમાં પ્રવેશતી વખતની દુઆ",
  "While going into the Haram of Madeenah": "મદીનાના હરમમાં પ્રવેશતી વખતની દુઆ",
  "masjid_nabawi": "મસ્જિદે નબવીમાં દાખલ થતી વખતની દુઆ",
  "While entering Masjid Nabawi": "મસ્જિદે નબવીમાં દાખલ થતી વખતની દુઆ",
  "salaam_prophet": "રસૂલુલ્લાહ ﷺ પર સલામ પઢવાની દુઆ",
  "Giving Salaam to the Prophet ﷺ": "રસૂલુલ્લાહ ﷺ પર સલામ પઢવાની દુઆ",
  "salaam_prophet_additional": "વધારાનો સલામ અને સાક્ષી (શહાદત)",
  "Additional Salaam / testimony": "વધારાનો સલામ અને સાક્ષી (શહાદત)",
  "salaam_on_behalf": "બીજા તરફથી રસૂલુલ્લાહ ﷺ ને સલામ પહોંચાડવાની દુઆ",
  "Giving Salaam to the Prophet on behalf of others": "બીજા તરફથી રસૂલુલ્લાહ ﷺ ને સલામ પહોંચાડવાની દુઆ",
  "salaam_abu_bakr": "હઝરત અબૂ બકર સિદ્દીક (રઝિ.) પર સલામ",
  "Giving Salaam upon Abu Bakr Siddiq": "હઝરત અબૂ બકર સિદ્દીક (રઝિ.) પર સલામ",
  "salaam_umar": "હઝરત ઉમર ફારૂક (રઝિ.) પર સલામ",
  "Giving Salaam upon Umar Faruq": "હઝરત ઉમર ફારૂક (રઝિ.) પર સલામ",
  "other_graves": "જન્નતુલ બકી / અન્ય કબરોની ઝિયારત વખતે સલામ",
  "While visiting other graves": "જન્નતુલ બકી / અન્ય કબરોની ઝિયારત વખતે સલામ"
};

// Complete Hindi titles for all 49 Duas
export const DUA_TITLES_HI: Record<string, string> = {
  "leaving_home": "घर से निकलते वक़्त की दुआ",
  "Du’a when Leaving Home": "घर से निकलते वक़्त की दुआ",
  "riding_vehicle": "सवारी (कार / प्लेन) पर बैठते वक़्त की दुआ",
  "When riding a car / plane": "सवारी (कार / प्लेन) पर बैठते वक़्त की दुआ",
  "intention_umrah": "उमरा की निय्यत (इरादा)",
  "Intention for Umrah": "उमरा की निय्यत (इरादा)",
  "talbiyah": "तल्बिया (लब्बैक)",
  "Talbiyah": "तल्बिया (लब्बैक)",
  "frequent_dua": "बार-बार पढ़ने के लिए अहम दुआ",
  "Important Du’a to be recited frequently": "बार-बार पढ़ने के लिए अहम दुआ",
  "enter_masjid_haram": "मस्जिद-उल-हराम में दाख़िल होते वक़्त की दुआ",
  "When entering Masjid al-Haraam (or any masjid)": "मस्जिद-उल-हराम में दाख़िल होते वक़्त की दुआ",
  "sighting_kaaba": "काबा शरीफ पर पहली नज़र पड़ते वक़्त की दुआ",
  "Du’a upon sighting the Ka’bah": "काबा शरीफ पर पहली नज़र पड़ते वक़्त की दुआ",
  "sighting_kaaba_additional": "काबा देखकर अतिरिक्त दुआ",
  "Additional du’a upon sighting the Ka’bah": "काबा देखकर अतिरिक्त दुआ",
  "tawaf_intention": "तवाफ की निय्यत (इरादा)",
  "Intention for Tawaaf": "तवाफ की निय्यत (इरादा)",
  "hajr_aswad": "हजरे अस्वद को चूमते (इस्तिलाम करते) वक़्त की दुआ",
  "Du’a while kissing the Hajr-e-Aswad": "हजरे अस्वद को चूमते (इस्तिलाम करते) वक़्त की दुआ",
  "after_istilam": "इस्तिलाम के बाद की दुआ",
  "After Istilam (kissing the Hajr-e-Aswad)": "इस्तिलाम के बाद की दुआ",
  "istilam_salawat": "इस्तिलाम के बाद और पढ़ने की दुआ",
  "then_recite_after_istilam": "इस्तिलाम के बाद और पढ़ने की दुआ",
  "Then recite after Istilam": "इस्तिलाम के बाद और पढ़ने की दुआ",
  "tawaf_house_protection": "जहन्नम की आग से पनाह की दुआ",
  "protection_fire": "जहन्नम की आग से पनाह की दुआ",
  "Du’a for protection from the Fire": "जहन्नम की आग से पनाह की दुआ",
  "tawaf_atiq": "ऐ प्राचीन घर के रब! अतिरिक्त दुआ",
  "lord_ancient_house": "ऐ प्राचीन घर के रब! अतिरिक्त दुआ",
  "Additional du’a - O Lord of the Ancient House": "ऐ प्राचीन घर के रब! अतिरिक्त दुआ",
  "rukn_iraqi": "रुकने इराकी के पास की दुआ",
  "Near Rukn-e-Iraqi": "रुकने इराकी के पास की दुआ",
  "mizab_rahmah": "मीज़ाबे रहमत के नीचे की दुआ",
  "Near Mizab-e-Rahmah": "मीज़ाबे रहमत के नीचे की दुआ",
  "rukn_shami": "रुकने शामी के पास की दुआ",
  "Near Rukn-e-Shami": "रुकने शामी के पास की दुआ",
  "rukn_yamani": "रुकने यमानी के पास की दुआ",
  "Near Rukn-e-Yamani": "रुकने यमानी के पास की दुआ",
  "between_yamani_aswad": "रुकने यमानी और हजरे अस्वद के बीच की दुआ (रब्बना आतीना)",
  "Between Rukn-e-Yamani and Hajr-e-Aswad": "रुकने यमानी और हजरे अस्वद के बीच की दुआ (रब्बना आतीना)",
  "zamzam": "ज़मज़म का पानी पीते वक़्त की दुआ",
  "Du’a for drinking Zam Zam": "ज़मज़म का पानी पीते वक़्त की दुआ",
  "saee_opening": "सफ़ा की तरफ़ जाते वक़्त की आयत",
  "proceed_safaa": "सफ़ा की तरफ़ जाते वक़्त की आयत",
  "Proceed to Safaa - opening verse": "सफ़ा की तरफ़ जाते वक़्त की आयत",
  "safa": "सफ़ा पहाड़ पर काबा की तरफ़ रुख़ करके दुआ",
  "Facing the Ka’bah from Safa": "सफ़ा पहाड़ पर काबा की तरफ़ रुख़ करके दुआ",
  "safa_marwa_main": "सफ़ा और मरवा के बीच पढ़ने की दुआ",
  "To be recited between Safa and Marwa": "सफ़ा और मरवा के बीच पढ़ने की दुआ",
  "saee_rabbana": "दोनों जहानों की भलाई के लिए दुआ (रब्बना)",
  "Rabbanaa - goodness in both worlds": "दोनों जहानों की भलाई के लिए दुआ (रब्बना)",
  "saee_rabbigfir": "रब्बिगफ़िर वरहम दुआ",
  "saee_rabbighfir": "रब्बिगफ़िर वरहम दुआ",
  "Rabbigfir warham": "रब्बिगफ़िर वरहम दुआ",
  "saee_hudaa": "हिदायत, तक़वा और पाकदामनी की दुआ",
  "saee_guidance": "हिदायत, तक़वा और पाकदामनी की दुआ",
  "Guidance, piety, chastity and sufficiency": "हिदायत, तक़वा और पाकदामनी की दुआ",
  "saee_zikr": "अल्लाह के ज़िक्र और शुक्र के लिए दुआ",
  "saee_help_remember": "अल्लाह के ज़िक्र और शुक्र के लिए दुआ",
  "Help me remember You": "अल्लाह के ज़िक्र और शुक्र के लिए दुआ",
  "green_lights": "सई में हरी लाइटों के बीच की दुआ",
  "Between the green lights in Sa’ee": "सई में हरी लाइटों के बीच की दुआ",
  "forgiveness": "गुनाहों की माफ़ी (मग़फ़िरत) की दुआ",
  "Du’a for forgiveness": "गुनाहों की माफ़ी (मग़फ़िरत) की दुआ",
  "parents": "माता-पिता (वालिदैन) के लिए दुआ",
  "Du’a for parents": "माता-पिता (वालिदैन) के लिए दुआ",
  "family_children": "परिवार और औलाद के लिए दुआ",
  "Du’a for family and children": "परिवार और औलाद के लिए दुआ",
  "family_children_prayer": "परिवार और बच्चों के लिए दूसरी दुआ",
  "family_children_2": "परिवार और बच्चों के लिए दूसरी दुआ",
  "Another du’a for family and children": "परिवार और बच्चों के लिए दूसरी दुआ",
  "stress_difficulty": "परेशानी और मुश्किल के वक़्त की दुआ",
  "stressed_difficulty": "परेशानी और मुश्किल के वक़्त की दुआ",
  "When feeling stressed or facing difficulty": "परेशानी और मुश्किल के वक़्त की दुआ",
  "iman": "ईमान की मज़बूती के लिए दुआ",
  "strengthening_imaan": "ईमान की मज़बूती के लिए दुआ",
  "For strengthening Imaan": "ईमान की मज़बूती के लिए दुआ",
  "death_on_iman": "ईमान पर मौत के लिए दुआ",
  "death_on_imaan": "ईमान पर मौत के लिए दुआ",
  "Du’a for death on Imaan": "ईमान पर मौत के लिए दुआ",
  "deceased": "जनाज़ा और क़ब्र की ज़ियारत पर दुआ",
  "deceased_janazah": "जनाज़ा और क़ब्र की ज़ियारत पर दुआ",
  "Du’a for deceased at Janazah or while visiting graves": "जनाज़ा और क़ब्र की ज़ियारत पर दुआ",
  "home_provision": "घर में सुकून और रोज़ी में बरकत की दुआ",
  "peace_provision": "घर में सुकून और रोज़ी में बरकत की दुआ",
  "For peace at home and increase in provision": "घर में सुकून और रोज़ी में बरकत की दुआ",
  "sustenance": "रिज़्क़ में इज़ाफ़े के लिए दुआ",
  "increase_sustenance": "रिज़्क़ में इज़ाफ़े के लिए दुआ",
  "For increase in sustenance": "रिज़्क़ में इज़ाफ़े के लिए दुआ",
  "pain_ache": "दर्द या तकलीफ़ के वक़्त की दुआ",
  "For pain / ache": "दर्द या तकलीफ़ के वक़्त की दुआ",
  "madinah_border": "मदीना मुनव्वरा की सरहद / दरवाज़े पर दुआ",
  "entrance_gate_madeenah": "मदीना मुनव्वरा की सरहद / दरवाज़े पर दुआ",
  "At the entrance gate / border of Madeenah": "मदीना मुनव्वरा की सरहद / दरवाज़े पर दुआ",
  "madinah_city": "मदीना शरीफ़ में दाख़िल होने के बाद दुआ",
  "after_entering_madeenah": "मदीना शरीफ़ में दाख़िल होने के बाद दुआ",
  "After entering the city of Madeenah": "मदीना शरीफ़ में दाख़िल होने के बाद दुआ",
  "madinah_haram": "मदीना के हरम में दाख़िल होते वक़्त दुआ",
  "going_into_haram_madeenah": "मदीना के हरम में दाख़िल होते वक़्त दुआ",
  "While going into the Haram of Madeenah": "मदीना के हरम में दाख़िल होते वक़्त दुआ",
  "masjid_nabawi": "मस्जिदे नबवी में दाख़िल होते वक़्त दुआ",
  "While entering Masjid Nabawi": "मस्जिदे नबवी में दाख़िल होते वक़्त दुआ",
  "salaam_prophet": "रसूलुल्लाह ﷺ पर सलाम पढ़ने की दुआ",
  "Giving Salaam to the Prophet ﷺ": "रसूलुल्लाह ﷺ पर सलाम पढ़ने की दुआ",
  "salaam_prophet_additional": "अतिरिक्त सलाम और शहादत",
  "Additional Salaam / testimony": "अतिरिक्त सलाम और शहादत",
  "salaam_on_behalf": "दूसरों की तरफ़ से नबी ﷺ को सलाम पहुँचाने की दुआ",
  "Giving Salaam to the Prophet on behalf of others": "दूसरों की तरफ़ से नबी ﷺ को सलाम पहुँचाने की दुआ",
  "salaam_abu_bakr": "हज़रत अबू बकर सिद्दीक़ (रज़ि.) पर सलाम",
  "Giving Salaam upon Abu Bakr Siddiq": "हज़रत अबू बकर सिद्दीक़ (रज़ि.) पर सलाम",
  "salaam_umar": "हज़रत उमर फ़ारूक़ (रज़ि.) पर सलाम",
  "Giving Salaam upon Umar Faruq": "हज़रत उमर फ़ारूक़ (रज़ि.) पर सलाम",
  "other_graves": "जन्नतुल बक़ी / अन्य क़ब्रों की ज़ियारत पर सलाम",
  "While visiting other graves": "जन्नतुल बक़ी / अन्य क़ब्रों की ज़ियारत पर सलाम"
};

// Helper function to safely get Gujarati title for any Dua
export function getDuaTitleGu(d: Dua | { id?: string; title?: string } | undefined | null): string {
  if (!d) return "";
  return DUA_TITLES_GU[d.id || ""] || DUA_TITLES_GU[d.title || ""] || "";
}

// Helper function to safely get Hindi title for any Dua
export function getDuaTitleHi(d: Dua | { id?: string; title?: string } | undefined | null): string {
  if (!d) return "";
  return DUA_TITLES_HI[d.id || ""] || DUA_TITLES_HI[d.title || ""] || "";
}

// ============================================================
// GUJARATI PRONUNCIATION (ગુજરાતી ઉચ્ચારણ) DICTIONARY
// Converts Arabic/Latin transliteration into exact, clear Gujarati pronunciation
// Covers all 49 Duas in the Umrah Companion dataset
// ============================================================
export const DUA_TRANSLITERATION_GU: Record<string, string> = {
  leaving_home: "બિસ્મિલ્લાહિ તવક્કલ્તુ 'અલલ્લાહ, લા હવ્લ વલા કુવ્વત ઇલ્લા બિલ્લાહ.",
  riding_vehicle: "સુબ્હાનલ્લઝી સખ્ખર લના હાઝા વમા કુન્ના લહૂ મુકરિનીન. વઇન્ના ઇલા રબ્બિના લમુન્કલિબૂન.",
  intention_umrah: "અલ્લાહુમ્મ ઇન્ની ઉરીદુલ ઉમરત ફયસ્સિરહા લી વતકબ્બલહા મિન્ની.",
  talbiyah: "લબ્બૈક અલ્લાહુમ્મ લબ્બૈક. લબ્બૈક લા શરીક લક લબ્બૈક. ઇન્નલ-હમ્દ વન્નિ'મત લક વલ-મુલ્ક. લા શરીક લક.",
  frequent_dua: "અલ્લાહુમ્મ ઇન્ની અસ્અલુક રિઝાક વલ-જન્નહ, વ અઊઝુ બિક મિન સખતિક વન્નાર.",
  enter_masjid_haram: "બિસ્મિલ્લાહિ, વસ્સલાતુ વસ્સલામુ 'અલા રસૂલિલ્લાહ. અલ્લાહુમ્મગ્ફિર લી ઝુનૂબી વફ્તહ લી અબવાબ રહ્મતિક.",
  sighting_kaaba: "લા ઇલાહ ઇલ્લલ્લાહુ વલ્લાહુ અકબર. અલ્લાહુમ્મ અન્તસ્સલામ વ મિન્કસ્સલામ, ફહય્યિના રબ્બના બિસ્સલામ.",
  kaaba_additional: "અલ્લાહુમ્મ ઝિદ હાઝલ-બૈત તશરીફંવ વ તઅઝીમંવ વ તકરીમંવ વ મહાબહ, વ ઝિદ મન શર્રફહૂ વ કર્રમહૂ મિમ્મન હજ્જહૂ અવિ'તમરહૂ તશરીફંવ વ તકરીમંવ વ તઅઝીમંવ વ બિર્રા.",
  tawaf_intention: "અલ્લાહુમ્મ ઇન્ની ઉરીદુ અન અતૂફ બિ-બૈતિકલ-હરામિ ફયસ્સિરહુ લી વ તકબ્બલહુ મિન્ની.",
  hajr_aswad: "બિસ્મિલ્લાહિ, અલ્લાહુ અકબર, વ લિલ્લાહિલ હમ્દ.",
  after_istilam: "સુબ્હાનલ્લાહિ, વલ હમ્દુ લિલ્લાહિ, વ લા ઇલાહ ઇલ્લલ્લાહુ વલ્લાહુ અકબર, વ લા હવ્લ વ લા કુવ્વત ઇલ્લા બિલ્લાહિલ 'અલિય્યિલ 'અઝીમ.",
  istilam_salawat: "અસ્સલાતુ વસ્સલામુ 'અલા રસૂલિલ્લાહ. અલ્લાહુમ્મ ઈમાનામ બિક વ તસ્દીકમ બિ કિતાબિક વ વફાઅમ્ બિ 'અહ્દિક વત્તિબાઅલ્ લિ સુન્નતિ નબિય્યિક મુહમ્મદિન સલ્લલ્લાહુ 'અલૈહિ વ સલ્લમ.",
  tawaf_house_protection: "અલ્લાહુમ્મ ઇન્ન હાઝલ-બૈત બૈતુક, વલ-હરમ હરમુક, વલ-અમ્ન અમ્નુક, વલ-'અબ્દ 'અબ્દુક, વ અના 'અબ્દુક વબ્નુ 'અબ્દિક, વ હાઝા મકામુલ-'આઇઝિ બિક મિનન્નાર. ફ અજિરની મિનન્નાર.",
  tawaf_atiq: "અલ્લાહુમ્મ યા રબ્બલ-બૈતિલ-'અતીક, અ'તિક રિકાબના વ રિકાબ આબાઇના વ ઉમ્મહાતિના મિનન્નાર. યા ઝલ-જૂદિ વલ-કરમિ વલ-ફઝ્લિ વલ-મન્નિ વલ-'અતાઇ વલ-ઇહસાન. અલ્લાહુમ્મ અહ્સિન 'આકિબતના ફિલ-ઉમૂરિ કુલ્લિહા વ અજિરના મિન ખિઝ્યિદ્-દુન્યા વ 'અઝાબિલ-આખિરહ.",
  rukn_iraqi: "અલ્લાહુમ્મ ઇન્ની અઊઝુ બિક મિનશ્શક્કિ વશ્શિર્કિ વન્નિફાકિ વશ્શિકાકિ વ સૂઇલ-અખ્લાકે વ સૂઇલ-મુન્કલબિ ફિલ-અહ્લિ વલ-માલિ વલ-વલદ.",
  mizab_rahmah: "અલ્લાહુમ્મ અઝિલ્લના તહ્ત ઝિલ્લિ 'અર્શિક યવ્મ લા ઝિલ્લ ઇલ્લા ઝિલ્લુક, વ લા બાકિય ઇલ્લા વજ્હુક. વસ્કિના મિન હવ્ઝિ નબિય્યિના મુહમ્મદિન સલ્લલ્લાહુ 'અલૈહિ વ સલ્લમ શર્બતન હનીઅતમ મરીઅતલ લા નઝ્મઉ બ'દહા અબદા. બિરહ્મતિક યા અર્હમર-રાહિમીન.",
  rukn_shami: "અલ્લાહુમ્મજ્'અલ્હા 'ઉમ્રતમ મબરૂરહ, વ સ'યમ મશ્કૂરા, વ ઝમ્બમ મગ્ફૂરા, વ તિજારતલ લન તબૂર. યા 'આલિમ મા ફિસ્સુદૂર, અખ્રિજની યા અલ્લાહુ મિનઝ્ઝુલુમાતિ ઇલન્-નૂર.",
  rukn_yamani: "અલ્લાહુમ્મ ઇન્ની અસ્અલુકલ-'અફ્વ વલ-'આફિયત ફિદ્દીનિ વદ્દુન્યા વલ-આખિરહ.",
  between_yamani_aswad: "રબ્બના આતિના ફિદ્દુન્યા હસનતંવ વ ફિલ-આખિરતિ હસનતંવ વ કિના 'અઝાબન્નાર. વ અદ્ખિલ્નલ-જન્નત મ'અલ-અબ્રાર. યા 'અઝીઝુ યા ગફ્ફાર, યા રબ્બલ-'આલમીન.",
  zamzam: "બિસ્મિલ્લાહ વલ-હમ્દુ લિલ્લાહ. વસ્સલાતુ વસ્સલામુ 'અલા રસૂલિલ્લાહ. અલ્લાહુમ્મ ઇન્ની અસ્અલુક 'ઇલ્મન નાફિ'અંવ, વ રિઝ્કંવ વાસિ'અંવ, વ 'અમલન સાલિહંવ, વ શિફાઅમ મિન કુલ્લિ દા'.",
  saee_opening: "અબ્દઉ બિમા બદઅલ્લાહુ બિહિ. ઇન્નસ્-સફા વલ-મર્વત મિન શ'આઇરિલ્લાહ. ફમન હજ્જલ-બૈત અવિ'તમર ફલા જુનાહ 'અલૈહિ અંય્યત્તવ્વફ બિહિમા. વ મન તતવ્વ'અ ખૈરન ફઇન્નલ્લાહ શાકિરુન 'અલીમ.",
  safa: "અલ્લાહુ અકબર, અલ્લાહુ અકબર, અલ્લાહુ અકબર વ લિલ્લાહિલ-હમ્દ. લા ઇલાહ ઇલ્લલ્લાહુ વહ્દહૂ લા શરીક લહ, લહુલ-મુલ્કુ વ લહુલ-હમ્દ, યુહ્યી વ યુમીત, વ હુવ હય્યુલ લા યમૂત. બિયદિહિલ-ખૈર, વ હુવ 'અલા કુલ્લિ શયઇન કદીર. અલ્લાહુમ્મ સલ્લિ 'અલા મુહમ્મદ વ આલિ મુહમ્મદ.",
  safa_marwa_main: "લા ઇલાહ ઇલ્લલ્લાહુ વહ્દહૂ લા શરીક લહ, લહુલ-મુલ્કુ વ લહુલ-હમ્દ, યુહ્યી વ યુમીત, વ હુવ હય્યુલ લા યમૂત. બિયદિહિલ-ખૈર, વ હુવ 'અલા કુલ્લિ શયઇન કદીર. લા ઇલાહ ઇલ્લલ્લાહુ વહ્દહૂ, અન્જઝ વ'દહ, વ નસર 'અબ્દહ, વ હઝમલ-અહઝાબ વહ્દહ.",
  saee_rabbana: "રબ્બના આતિના ફિદ્દુન્યા હસનતંવ વ ફિલ-આખિરતિ હસનતંવ વ કિના 'અઝાબન્નાર.",
  saee_rabbigfir: "રબ્બિગ્ફિર વરહમ્, વ'ફુ વ તકર્રમ્, વ તજાવઝ 'અમ્મા ત'લમ. ઇન્નક ત'લમુ મા લા ન'લમ. ઇન્નક અન્તલ-અ'અઝ્ઝુલ-અક્રમ.",
  saee_hudaa: "અલ્લાહુમ્મ ઇન્ની અસ્અલુકલ-હુદા વત્તુકા વલ-'અફાફ વલ-ગિના.",
  saee_zikr: "અલ્લાહુમ્મ અ'ઇન્ની 'અલા ઝિક્રિક વ શુક્રિક વ હુસ્નિ 'ઇબાદતિક.",
  green_lights: "રબ્બિગ્ફિર વરહમ્, અન્તલ-અ'અઝ્ઝુલ-અક્રમ.",
  forgiveness: "રબ્બના ઝલમ્ના અન્ફુસના વ ઇલ્લમ તગ્ફિર લના વ તરહમ્ના લનકૂનન્ન મિનલ-ખાસિરીન.",
  parents: "રબ્બનગ્ફિર લના વ લિવાલિદૈના. રબ્બિરહમ્હુમા કમા રબ્બયાની સગીરા.",
  family_children: "રબ્બના હબ લના મિન અઝ્વાજિના વ ઝુર્રિય્યાતિના કુર્રત અ'યુનિંવ વજ્'અલ્ના લિલ-મુત્તકીન ઇમામા.",
  family_children_prayer: "રબ્બિજ્'અલ્ની મુકીમસ્સલાતિ વ મિન ઝુર્રિય્યતી. રબ્બના વ તકબ્બલ દુ'આ. રબ્બનગ્ફિર લી વ લિવાલિદય્ય વ લિલ-મુ'મિનીન યવ્મ યકૂમુલ-હિસાબ.",
  stress_difficulty: "લા ઇલાહ ઇલ્લલ્લાહુલ-'અઝીમુલ-હલીમ. લા ઇલાહ ઇલ્લલ્લાહુ રબ્બુલ-'અર્શિલ-'અઝીમ. લા ઇલાહ ઇલ્લલ્લાહુ રબ્બુસ્સમાવાતિ વ રબ્બુલ-અર્ઝિ વ રબ્બુલ-'અર્શિલ-કરીમ.",
  iman: "રબ્બના લા તુઝિગ કુયૂબના બ'દ ઇઝ હદૈતના વ હબ લના મિલ લદુન્ક રહ્મતન ઇન્નક અન્તલ-વહ્હાબ.",
  death_on_iman: "ફાતિરસ્-સમાવાતિ વલ-અર્ઝ. અન્ત વલિય્યી ફિદ્દુન્યા વલ-આખિરહ. તવફ્ફની મુસ્લિમંવ વ અલ્હિકની બિસ્સાલિહીન.",
  deceased: "અલ્લાહુમ્મગ્ફિર લિહય્યિના વ મય્યિતિના, વ શાહિદિના વ ગાઇબિના, વ સગીરિના વ કબીરિના, વ ઝકરિના વ ઉન્સાના. અલ્લાહુમ્મ મન અહ્યૈતહૂ મિન્ના ફ અહ્યિહી 'અલલ-ઇસ્લામ, વ મન તવફ્ફૈતહૂ મિન્ના ફ તવફ્ફહૂ 'અલલ-ઈમાન.",
  home_provision: "અલ્લાહુમ્મગ્ફિર લી ઝમ્બી, વ વસ્સિ' લી ફી દારી, વ બારિક લી ફી રિઝ્કી.",
  sustenance: "સુબ્હાનલ્લાહિ વ બિહમ્દિહિ, સુબ્હાનલ્લાહિલ-'અઝીમ. અસ્તગ્ફિરુલ્લાહ.",
  pain_ache: "બિસ્મિલ્લાહિર-રહ્માનિર-રહીમ. અઊઝુ બિ'ઇઝ્ઝતિલ્લાહિ વ કુદરતિહી મિન શર્રિ મા અજિદુ વ ઉહાઝિરુ.",
  madinah_border: "અલ્લાહુમ્મ હાઝા હરમું નબિય્યિક, ફજ્'અલ્હુ લી વિકાયતમ મિનન્નાર, વ અમાનમ મિનલ-'અઝાબ, વ સૂઇલ-હિસાબ.",
  madinah_city: "બિસ્મિલ્લાહિ મા શાઅલ્લાહ, લા કુવ્વત ઇલ્લા બિલ્લાહ. રબ્બિ અદ્ખિલ્ની મુદ્ખલ સિદ્કિંવ વ અખ્રિજ્ની મુખ્રજ સિદ્કિંવ વજ્'અલ લી મિલ લદુન્ક સુલ્તાનન નસીરા. અલ્લાહુમ્મફ્તહ લી અબવાબ રહ્મતિક, વર્ઝુકની ફી ઝિયારતિ નબિય્યિક મા રઝક્તહૂ અવ્લિયાઅક વ અહ્લ તા'અતિક, વગ્ફિર લી વરહમ્ની યા ખૈર મસ્ઊલ.",
  madinah_haram: "અલ્લાહુમ્મ હાઝા હરમું હર્રમ્તહૂ 'અલા લિસાતિ નબિય્યિક વ રસૂલિક સલ્લલ્લાહુ 'અલૈહિ વ સલ્લમ, ફજ્'અલ્હુ લી વિકાયતમ મિનન્નાર વ અમાનમ મિનલ-'અઝાબ, વ બારિક લી ફીહિ કમા બારક્ત ફી હરમિ બૈતિકલ-હરામ, વ હર્રિમ વજ્હી વ લહ્મી વ દમી વ 'ઇઝામી 'અલન્નાર યવ્મ તબ્'અસુ 'ઇબાદક, વર્ઝુકની મિમ બરકાતિ મા રઝક્ત અવ્લિયાઅક વ અહ્લ તા'અતિક, વ વફ્ફિકની ફીહિ લિ-હુસ્નિલ-અદબિ વ ફિ'લિલ-ખૈરિ વ તર્કિશ્શર્ર.",
  masjid_nabawi: "બિસ્મિલ્લાહિ, વસ્સલાતુ વસ્સલામુ 'અલા રસૂલિલ્લાહ. અલ્લાહુમ્મગ્ફિર લી ઝુનૂબી વફ્તહ લી અબવાબ રહ્મતિક.",
  salaam_prophet: "અસ્સલાતુ અસ્સલામુ 'અલૈક અય્યુહન્-નબિય્યુ વ રહ્મતુલ્લાહિ વ બરકાતુહ. અસ્સલાતુ અસ્સલામુ 'અલૈક યા રસૂલલ્લાહ. અસ્સલાતુ અસ્સલામુ 'અલૈક યા નબિય્યલ્લાહ. અસ્સલાતુ અસ્સલામુ 'અલૈક યા હબીબલ્લાહ. અસ્સલાતુ અસ્સલામુ 'અલૈક યા રહ્મતલ લિલ-'આલમીન. અસ્સલાતુ અસ્સલામુ 'અલૈક યા શફી'અલ-મુઝ્નિબીન. અસ્સલાતુ અસ્સલામુ 'અલૈક યા સય્યિદલ-અમ્બિયાઇ વલ-મુર્સલીન, વ રહ્મતુલ્લાહિ વ બરકાતુહ.",
  salaam_prophet_additional: "અશ્હદુ અન્નક બલ્લગ્તર-રિસાલાહ, વ અદ્દૈતલ-અમાનાહ, વ નસહ્તલ-ઉમ્માહ, વ કશફ્તલ-ગુમ્માહ, વ જાહદ્ત ફિલ્લાહિ હક્ક જિહાદિહી, વ 'અબત્ત રબ્બક હત્તા અતાકલ-યકીન. અસ્સલામુ 'અલૈક વ 'અલા આલિ બૈતિક વ અઝ્વાજિક વ ઝુર્રિય્યતિક વ અસ્હાબિક અજ્મ'ઈન. અસ્સલામુ 'અલૈક વ 'અલા સાઇરિલ-અમ્બિયાઇ વલ-મુર્સલીન વ જમી'ઇ 'ઇબાદિલ્લાહિસ્-સાલિહીન. જઝાકલ્લાહુ યા રસૂલલ્લાહિ અફ્ઝલ મા જઝા નબિય્યંવ વ રસૂલન 'અન ઉમ્મતિહ. અશ્હદુ અલ લા ઇલાહ ઇલ્લલ્લાહુ વહ્દહૂ લા શરીક લહ, વ અશ્હદુ અન્નક 'અબ્દુહૂ વ રસૂલુહ, વ અશ્હદુ અન્નક કદ બલ્લગ્તર-રિસાલાહ વ અદ્દૈતલ-અમાનાહ વ નસહ્તલ-ઉમ્માહ.",
  salaam_on_behalf: "અસ્સલામુ 'અલૈક યા રસૂલલ્લાહિ મિન (વ્યક્તિનું નામ બોલો).",
  salaam_abu_bakr: "અસ્સલામુ 'અલૈક યા અબા બક્ર, અસ્સલામુ 'અલૈક યા ખલીફત રસૂલિલ્લાહ, અસ્સલામુ 'અલૈક યા સાહિબ રસૂલિલ્લાહિ ફિલ-ગાર, વ રહ્મતુલ્લાહિ વ બરકાતુહ. જઝાકલ્લાહુ 'અન્ના ખૈરલ-જઝા'.",
  salaam_umar: "અસ્સલામુ 'અલૈક યા અમીરલ-મુ'મિનીન 'ઉમરલ-ફારૂક, વ રહ્મતુલ્લાહિ વ બરકાતુહ. જઝાકલ્લાહુ 'અન્ના ખૈરલ-જઝા'.",
  other_graves: "અસ્સલામુ 'અલૈકુમ યા અહ્લલ-કુબૂરિ મિનલ-મુસ્લિમીન વલ-મુ'મિનીન. અન્તુમ લના સલફુંવ વ નહ્નુ લકુમ તબ'. વ ઇન્ના ઇન શાઅલ્લાહુ બિકુમ લાહિકૂન. યગ્ફિરુલ્લાહુ લના વ લકુમ, વ યરહ્મુલ્લાહુ વ ઇય્યાકુમ."
};

// Helper function to safely get Gujarati pronunciation (ઉચ્ચારણ) for any Dua
export function getDuaTransliterationGu(d: Dua | { id?: string; transliteration_gu?: string } | undefined | null): string {
  if (!d) return "";
  if (d.transliteration_gu) return d.transliteration_gu;
  return DUA_TRANSLITERATION_GU[d.id || ""] || "";
}

// Ensure all DUAS objects have transliteration_gu attached
DUAS.forEach((d) => {
  d.transliteration_gu = DUA_TRANSLITERATION_GU[d.id] || "";
});


