// Comprehensive Trilingual Umrah Guide Data
// Complete Sunnah steps with Arabic, Gujarati, Hindi, English, Duas, and Rules

export interface GuideStep {
  id: number;
  label_en: string;
  label_gu: string;
  label_hi: string;
  arabicName: string;
  icon: string;
  shortDesc_en: string;
  shortDesc_gu: string;
  shortDesc_hi: string;
  detailedSteps_en: string[];
  detailedSteps_gu: string[];
  detailedSteps_hi: string[];
  sunnahTips_en: string[];
  sunnahTips_gu: string[];
  sunnahTips_hi: string[];
  prohibitions_en?: string[];
  prohibitions_gu?: string[];
  prohibitions_hi?: string[];
  keyDua?: {
    arabic: string;
    pronunciation_gu: string;
    translation_gu: string;
    pronunciation_hi: string;
    translation_hi: string;
    translation_en: string;
    reference?: string;
  };
  hasCounter?: "tawaf" | "sai";
  duaId?: string;
  duaGroup?: string;
  duaLabel_en?: string;
  duaLabel_gu?: string;
  pdfPageRef?: string;
}

export const UMRAH_GUIDE_STEPS: GuideStep[] = [
  // ── Step 0: Ihram & Niyyah ──
  {
    id: 0,
    label_en: "1. Ihram & Intention (Niyyah)",
    label_gu: "૧. ઇહરામ અને નિયત (મિકાત પર)",
    label_hi: "1. एहराम और नीयत (मीक़ात पर)",
    arabicName: "الإِحْرَام وَالنِّيَّة",
    icon: "🤍",
    shortDesc_en: "Cleanse body, put on Ihram garments before Miqat, pray 2 rak'ahs, make intention, and recite Talbiyah.",
    shortDesc_gu: "મિકાત પહોંચતા પહેલાં ગુસલ કરવું, ઇહરામના કપડાં પહેરવા, ૨ રકાત નમાઝ પઢવી અને ઉમરાહની નિયત કરવી.",
    shortDesc_hi: "मीक़ात पार करने से पहले ग़ुस्ल करें, एहराम पहनें, 2 रकात नफ़्ल पढ़ें और उमरा की नीयत करें।",
    detailedSteps_en: [
      "Perform full body Ghusl (bath) and trim nails/hair as necessary before entering Ihram.",
      "Men put on two seamless white sheets (Izar and Rida). Women wear simple, modest Islamic clothing covering whole body except face and hands.",
      "Apply perfume only to the body (not on the Ihram cloth) before making intention.",
      "Pray 2 rak'ahs Sunnat-ul-Ihram before crossing the Miqat boundary.",
      "Make verbal intention (Niyyah) for Umrah and immediately begin reciting the Talbiyah aloud.",
    ],
    detailedSteps_gu: [
      "મિકાત ઓળંગતા પહેલાં શરીરનું ગુસલ (સ્નાન) કરો અને નખ તથા અનિચ્છનીય વાળ સાફ કરો.",
      "પુરુષો ૨ બિન-સીવેલી સફેદ ચાદરો (ઇઝાર અને રિદા) પહેરે. સ્ત્રીઓ ચહેરો અને હાથ સિવાય આખું શરીર ઢંકાય તેવા સાદા ઢીલા કપડાં પહેરે.",
      "ઇહરામની નિયત કરતા પહેલાં ફક્ત શરીર પર અત્તર/ખુશબૂ લગાવી શકાય (ઇહરામના કાપડ પર નહિ).",
      "મિકાતની સરહદ પહોંચતા પહેલાં ૨ રકાત નફલ નમાઝ (સુન્નતુલ ઇહરામ) પઢો.",
      "ઉમરાહની નિયત પઢો અને તરત જ મોટેથી તલ્બિયાહ પઢવાનું શરૂ કરો.",
    ],
    detailedSteps_hi: [
      "मीक़ात की हद पार करने से पहले ग़ुस्ल करें और नाख़ून वगैरह साफ़ करें।",
      "मर्द दो बिना सिले सफ़ेद कपड़े पहनें। औरतें चेहरे और हथेलियों के अलावा पूरा बदन ढांकने वाला सादा लिबास पहनें।",
      "नीयत करने से पहले सिर्फ़ जिस्म पर ख़ुशबू लगा सकते हैं (एहराम के कपड़े पर नहीं)।",
      "मीक़ात से पहले 2 रकात नमाज़ एहराम की सुन्नत के तौर पर पढ़ें।",
      "उमरा की नीयत की दुआ पढ़ें और फ़ौरन बा-आवाज़ बुलंद तल्बिया पढ़ना शुरू करें।",
    ],
    sunnahTips_en: [
      "Keep Ihram sheets clean and fragrance-free after Niyyah.",
      "Men must keep their heads and feet arches uncovered (use simple slippers).",
      "Recite Talbiyah continuously during travel until reaching Masjid al-Haram.",
    ],
    sunnahTips_gu: [
      "નિયત કર્યા પછી સુગંધ વગરનો સાબુ વાપરવો.",
      "પુરુષોએ માથું ખુલ્લું રાખવું અને પગની પિંડી ખુલ્લી રહે તેવી સાદી ચંપલ પહેરવી.",
      "સફર દરમ્યાન મક્કાહ પહોંચી તવાફ શરૂ થાય ત્યાં સુધી સતત તલ્બિયાહ પઢતા રહો.",
    ],
    sunnahTips_hi: [
      "नीयत के बाद बिना ख़ुशबू वाला साबुन इस्तेमाल करें।",
      "मर्द सर खुला रखें और ऐसी चप्पल पहनें जिसमें पैर का उभरा हिस्सा खुला रहे।",
      "सफ़र के दौरान मक्का मुकर्रमा तक मुसलसल तल्बिया पढ़ते रहें।",
    ],
    prohibitions_en: [
      "No perfume or scented soaps.",
      "No cutting hair, trimming nails, or shaving.",
      "No covering the head or face for men.",
      "No gloves or face veils (Niqab) touching the face for women.",
      "No arguing, anger, hunting, or intimacy.",
    ],
    prohibitions_gu: [
      "કોઈપણ પ્રકારની ખુશબૂ કે સુગંધી સાબુ વાપરવાની મનાઈ છે.",
      "શરીરનો કોઈ વાળ કે નખ કાપવાની સખત મનાઈ છે.",
      "પુરુષો માટે માથું કે ચહેરો ઢાંકવાની મનાઈ છે.",
      "કોઈપણ પ્રકારનો ઝઘડો, ગુસ્સો કે અશ્લીલ વાત કરવાની મનાઈ છે.",
    ],
    prohibitions_hi: [
      "ख़ुशबू या ख़ुशबूदार साबुन लगाना मना है।",
      "बाल या नाख़ून काटना मना है।",
      "मर्दों के लिए सर या चेहरा ढांकना मना है।",
      "लड़ाई-झगड़ा, ग़ुस्सा या ग़लत बातों से बचना लाज़िमी है।",
    ],
    keyDua: {
      arabic: "اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي",
      pronunciation_gu: "અલ્લાહુમ્મા ઇન્ની ઉરીદુલ ઉમરતા ફ-યસ્સિરહા લી વ તકબ્બલહા મિન્ની.",
      translation_gu: "હે અલ્લાહ! હું ઉમરાહનો ઈરાદો કરું છું, તું આ ઉમરાહ મારા માટે સરળ કરી દે અને તેને મારી તરફથી કબૂલ ફરમાવ.",
      pronunciation_hi: "अल्लाहुम्मा इन्नी उरीदुल उमराता फ-यस्सिरहा ली व तक़ब्बलहा मिन्नी।",
      translation_hi: "ऐ अल्लाह! मैं उमरा का इरादा करता हूँ, तू इसे मेरे लिए आसान फ़रमा और मेरी तरफ़ से क़ुबूल फ़रमा।",
      translation_en: "O Allah, I intend to perform Umrah, so make it easy for me and accept it from me.",
      reference: "Sunnah of Ihram (Dua #3)",
    },
    duaId: "intention_umrah",
    duaGroup: "Umrah",
    duaLabel_en: "View Intention Dua (Dua #3)",
    duaLabel_gu: "ઉમરાહ નિયત દુઆ જુઓ (Dua #3)",
    pdfPageRef: "Book Page 3",
  },

  // ── Step 1: Talbiyah ──
  {
    id: 1,
    label_en: "2. The Talbiyah (Pilgrim's Anthem)",
    label_gu: "૨. તલ્બિયાહ (લબ્બૈક અલ્લાહુમ્મા લબ્બૈક)",
    label_hi: "2. तल्बिया (लब्बैक अल्लाहुम्मा लब्बैक)",
    arabicName: "التَّلْبِيَة",
    icon: "🌙",
    shortDesc_en: "Recite the Talbiyah continuously with devotion from Miqat until beginning the Tawaf in Makkah.",
    shortDesc_gu: "મિકાતથી શરૂ કરીને મક્કાહ પહોંચી કા'બા શરીફનો તવાફ શરૂ થાય ત્યાં સુધી એકાગ્રતાથી તલ્બિયાહ પઢવું.",
    shortDesc_hi: "मीक़ात से लेकर मक्का पहुँचकर तवाफ़ शुरू करने तक कसरत से तल्बिया पढ़ते रहें।",
    detailedSteps_en: [
      "Recite the Talbiyah after every prayer, when ascending hills, boarding transport, and meeting other pilgrims.",
      "Men recite loudly and proudly with conviction.",
      "Women recite softly so only those next to them can hear.",
      "Stop reciting Talbiyah precisely when you kiss, touch, or salute Hajar al-Aswad at the start of Tawaf.",
    ],
    detailedSteps_gu: [
      "દરેક નમાઝ પછી, સવારીમાં બેસતી વખતે અને ચઢાણ ચઢતી વખતે તલ્બિયાહનું પુનરાવર્તન કરો.",
      "પુરુષોએ ઊંચા અવાજે અને ઉત્સાહ સાથે પઢવું.",
      "સ્ત્રીઓએ ધીમા અવાજે પઢવું જેથી પાસે ઉભેલા સિવાય અવાજ ન જાય.",
      "કા'બા શરીફ પાસે પહોંચીને હજરે અસ્વદથી તવાફ શરૂ થાય તે ક્ષણે તલ્બિયાહ પઢવાનું બંધ કરવું.",
    ],
    detailedSteps_hi: [
      "हर नमाज़ के बाद, सवारी पर बैठते वक़्त और बुलंदी पर चढ़ते वक़्त कसरत से तल्बिया पढ़ें।",
      "मर्द बुलंद आवाज़ में पढ़ें।",
      "औरतें धीमी आवाज़ में पढ़ें ताकि ग़ैर-मेहरम तक आवाज़ न जाए।",
      "हजरे अस्वद के सामने पहुँचकर तवाफ़ शुरू करते ही तल्बिया पढ़ना बंद कर दें।",
    ],
    sunnahTips_en: [
      "Reciting it in unison or deeply reflecting on its meaning brings immense tranquility.",
      "Follow the Talbiyah with Salawat on the Prophet ﷺ and asking Allah for Paradise and protection from Hellfire.",
    ],
    sunnahTips_gu: [
      "તલ્બિયાહના શબ્દોનો અર્થ સમજીને દિલથી પોકારવાથી મનમાં અસીમ શાંતિ મળે છે.",
      "તલ્બિયાહ પછી નબી કરીમ ﷺ પર દુરૂદ શરીફ અને જન્નતની દુઆ કરવી મુસ્તહબ છે.",
    ],
    sunnahTips_hi: [
      "तल्बिया के मानी समझकर पढ़ने से दिल को अज़ीम सुकून मिलता है।",
      "तल्बिया के बाद हुज़ूर ﷺ पर दुरूद शरीफ़ और जन्नत की दुआ मांगना सुन्नत है।",
    ],
    keyDua: {
      arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
      pronunciation_gu: "લબ્બૈક અલ્લાહુમ્મા લબ્બૈક, લબ્બૈક લા શરી-ક લક લબ્બૈક, ઇન્નલ હમ્-દ વન્નિત્મ-ત લક વલ મુલ્ક, લા શરી-ક લક.",
      translation_gu: "હું હાજર છું હે અલ્લાહ હું હાજર છું! તારો કોઈ ભાગીદાર નથી, હું હાજર છું! નિઃશંક તમામ વખાણ, નેઅમતો અને બાદશાહી ફક્ત તારી જ છે, તારો કોઈ ભાગીદાર નથી.",
      pronunciation_hi: "लब्बैक अल्लाहुम्मा लब्बैक, लब्बैक ला शरी-क ल-क लब्बैक, इन्नल हम्दा वन-निअमता ल-क वल मुल्क, ला शरी-क लक।",
      translation_hi: "हाज़िर हूँ ऐ अल्लाह मैं हाज़िर हूँ! तेरा कोई शरीक नहीं, मैं हाज़िर हूँ! बेशक सब तारीफ़, सब नेअमतें और बादशाही तेरी ही है, तेरा कोई साझी नहीं।",
      translation_en: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace, and sovereignty belong to You. You have no partner.",
      reference: "Sahih Bukhari & Muslim (Dua #4)",
    },
    duaId: "talbiyah",
    duaGroup: "Umrah",
    duaLabel_en: "View Full Talbiyah (Dua #4)",
    duaLabel_gu: "સંપૂર્ણ તલ્બિયાહ જુઓ (Dua #4)",
    pdfPageRef: "Book Page 3",
  },

  // ── Step 2: Entering Haram & Sighting Ka'bah ──
  {
    id: 2,
    label_en: "3. Entering Masjid al-Haram & Ka'bah Sighting",
    label_gu: "૩. મસ્જિદુલ હરામમાં પ્રવેશ અને કા'બા દીદાર",
    label_hi: "3. मस्जिदुल हराम में दाख़िला और काबा का दीदार",
    arabicName: "دُخُولُ المَسْجِدِ الحَرَام وَرُؤْيَةُ الكَعْبَة",
    icon: "🕌",
    shortDesc_en: "Enter with right foot reciting entrance dua, look at the Holy Ka'bah with awe, and make sincere heartfelt duas.",
    shortDesc_gu: "જમણો પગ આગળ મૂકીને પ્રવેશ દુઆ પઢવી, કા'બા શરીફ પર પ્રથમ નજર પડતી વખતે રોકાઈને મનની તમામ દુઆઓ માગવી.",
    shortDesc_hi: "दायां पैर आगे रखकर मस्जिद की दुआ पढ़ें, काबा पर पहली नज़र पड़ते ही ठहरकर दिल खोलकर दुआ मांगें।",
    detailedSteps_en: [
      "Enter Masjid al-Haram with humility, putting your right foot forward first.",
      "Recite the Sunnah Masjid entrance dua: 'Allahummaf-tah li abwaba rahmatik'.",
      "When your eyes first witness the Holy Ka'bah, pause, recite Takbir (Allahu Akbar) and Tahlil (La ilaha illallah).",
      "Raise your hands and make sincere personal supplications — prayers at the first sight of the Ka'bah are answered by Allah!",
      "Recite the beautiful Sunnah dua for the honor and dignity of the Sacred House.",
    ],
    detailedSteps_gu: [
      "નમ્રતાપૂર્વક જમણો પગ પહેલાં મૂકીને મસ્જિદુલ હરામમાં પ્રવેશ કરો.",
      "મસ્જિદમાં પ્રવેશવાની સુન્નત દુઆ પઢો: 'અલ્લાહુમ્મફ-તહ લી અબવાબા રહ્-મતીક'.",
      "કા'બા શરીફ પર જ્યારે પ્રથમ નજર પડે ત્યારે એક તરફ ઊભા રહીને અલ્લાહુ અકબર અને લા ઇલાહા ઇલ્લલ્લાહ કહો.",
      "બંને હાથ ઊંચા કરીને મનની તમામ મુરાદો માગો — કા'બા શરીફ પર પ્રથમ નજર પડતી વખતની દુઆ મકબૂલ થાય છે!",
      "કા'બા શરીફની અઝમત અને શાનમાં વધારા માટેની સુન્નત દુઆ પઢો.",
    ],
    detailedSteps_hi: [
      "इंकिसारी के साथ दायां पैर पहले रखकर मस्जिद-उल-हराम में दाख़िल हों।",
      "मस्जिद में दाख़िले की दुआ पढ़ें: 'अल्लाहुम्मफ़-तह ली अबवाबा रहमतिक'।",
      "जब काबा शरीफ़ पर पहली नज़र पड़े तो एक तरफ़ खड़े होकर अल्लाहू अकबर और ला इलाहा इल्लल्लाह कहें।",
      "हाथ उठाकर दिल से दुआएं मांगें — काबा शरीफ़ पर पहली नज़र की दुआ क़ुबूल होती है!",
      "काबा शरीफ़ की इज़्ज़त और शान में इज़ाफ़े की मसनून दुआ पढ़ें।",
    ],
    sunnahTips_en: [
      "Do not push or rush. Move gently towards the Mataf area.",
      "Keep shoes in a bag with you or place them in marked shoe shelves with the zone number noted.",
    ],
    sunnahTips_gu: [
      "કોઈને ધક્કો માર્યા વગર શાંતિથી મતાફ (તવાફ ફ્લોર) તરફ આગળ વધો.",
      "તમારા ચંપલ થેલીમાં સાથે રાખો અથવા શૂ-રેકનો નંબર યાદ રાખીને મૂકો.",
    ],
    sunnahTips_hi: [
      "किसी को तकलीफ़ दिए बग़ैर इत्मीनान से मताफ़ की तरफ़ बढ़ें।",
      "अपने जूते थैली में साथ रखें या शू-रैक का नंबर नोट करके रखें।",
    ],
    keyDua: {
      arabic: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا",
      pronunciation_gu: "અલ્લાહુમ્મા ઝિદ હાઝલ બય્-ત તશરીફંવ વ તઅઝીમંવ વ તકરીમંવ વ મહાબહ, વ ઝિદ મન શર્રફહૂ વ અઝ્ઝમહૂ મિમ્મન હજ્જહૂ અવિઅ-તમરહૂ તશરીફંવ વ તકરીમંવ વ તઅઝીમંવ વ બિર્રા.",
      translation_gu: "હે અલ્લાહ! આ પવિત્ર ઘરની શાન, મોભો, મહાનતા અને ગૌરવમાં વધારો કર, અને જે કોઈ હજ કે ઉમરાહ કરીને આ ઘરની ઇજ્જત કરે તેની ઇજ્જત, મોભો અને નેકીમાં વધારો કર.",
      pronunciation_hi: "अल्लाहुम्मा ज़िद हाज़ल बय-ता तशरीफ़ंव व तअज़ीमंव व तकरीमंव व महाबह, व ज़िद मन शर्रफ़हू व अज़्ज़महू मिम्मन हज्जहू अविच-तमरहू तशरीफ़ंव व तकरीमंव व तअज़ीमंव व बिर्रा।",
      translation_hi: "ऐ अल्लाह! इस घर की बुज़ुर्गी, बड़ाई, इज़्ज़ત और हैबत में इज़ाफ़ा फ़रमा, और जो लोग इसका हज या उमरा करके इसकी ताज़ीम करें उनकी इज़्ज़त और नेकी में बरकत दे।",
      translation_en: "O Allah, increase this House in honor, esteem, respect, and awe; and increase those who honor and revere it, among those who perform Hajj or Umrah, in honor, dignity, and piety.",
      reference: "Sunan al-Bayhaqi (Dua #8)",
    },
    duaId: "kaaba_sighting",
    duaGroup: "Makkah",
    duaLabel_en: "Ka'bah Sighting Dua (Dua #8)",
    duaLabel_gu: "કા'બા દીદારની દુઆ જુઓ (Dua #8)",
    pdfPageRef: "Book Page 5",
  },

  // ── Step 3: Tawaf ──
  {
    id: 3,
    label_en: "4. Tawaf (7 Circuits around the Ka'bah)",
    label_gu: "૪. તવાફ (કા'બા શરીફની આસપાસ ૭ ચક્કર)",
    label_hi: "4. तवाफ़ (काबा शरीफ़ के 7 फेरे)",
    arabicName: "الطَّوَافُ حَوْلَ الكَعْبَة",
    icon: "🕋",
    shortDesc_en: "Perform 7 anti-clockwise circuits starting from Hajar al-Aswad, keeping the Ka'bah on your left.",
    shortDesc_gu: "હજરે અસ્વદથી શરૂ કરીને કા'બા શરીફને ડાબી બાજુ રાખી ઘડિયાળની વિરુદ્ધ દિશામાં ૭ ચક્કર પૂરા કરવા.",
    shortDesc_hi: "हजरे अस्वद से शुरू करके काबा को बाईं तरफ़ रखते हुए 7 फेरे मुकम्मल करें।",
    detailedSteps_en: [
      "Idtiba' (Men only): Uncover the right shoulder by passing the upper Ihram sheet under the right armpit and over the left shoulder.",
      "Start at Hajar al-Aswad line (marked by green light on the Haram wall).",
      "Face Hajar al-Aswad, raise both hands like in Salah, and say: 'Bismillahi Allahu Akbar' (Istilam).",
      "Raml (Men only): Walk briskly with short steps and puffed-out chest during the first 3 circuits. Walk normally for the remaining 4 circuits.",
      "Recite any Quran, Dhikr, or sincere Duas throughout the Tawaf.",
      "Between Rukn al-Yamani and Hajar al-Aswad, always recite the Sunnah Rabbana Atina Dua.",
      "Each circuit finishes at Hajar al-Aswad. Perform Istilam at the completion of each circuit (7 times total).",
      "Cover both shoulders immediately after finishing the 7th circuit.",
    ],
    detailedSteps_gu: [
      "ઇઝતિબા (ફક્ત પુરુષો માટે): જમણી બગલ નીચેથી ચાદર કાઢી ડાબા ખભા પર નાખી જમણો ખભો ખુલ્લો રાખો.",
      "હજરે અસ્વદની સીધી લાઈન પર આવો (જે હરમની દીવાલ પર લીલી લાઈટથી દર્શાવેલ છે).",
      "હજરે અસ્વદ સામે બંને હાથ ઊંચા કરી 'બિસ્મિલ્લાહિ અલ્લાહુ અકબર' કહી ઇસ્તિલામ કરો.",
      "રમલ (ફક્ત પુરુષો માટે): પ્રથમ ૩ ચક્કરમાં નાના ડગલા ભરી ખભા હલાવીને ઝડપથી ચાલો. બાકીના ૪ ચક્કર સામાન્ય ગતિએ ચાલો.",
      "તવાફ દરમ્યાન કોઈપણ કુરાનની આયતો, ઝિક્ર અને મનની દુઆઓ પઢી શકાય છે.",
      "રુકને યામાનીથી હજરે અસ્વદ વચ્ચે હંમેશાં સુન્નત 'રબ્બના આતિના...' દુઆ પઢો.",
      "દરેક ચક્કર હજરે અસ્વદ પર પૂર્ણ થાય છે, ત્યાં ફરીથી ઇસ્તિલામ કરો (કુલ ૭ ઇસ્તિલામ).",
      "૭મું ચક્કર પૂરું થતાં જ જમણો ખભો ચાદરથી ઢાંકી દો.",
    ],
    detailedSteps_hi: [
      "इज़्तिबा (सिर्फ़ मर्द): दायां कंधा खोलकर चादर दाहिनी बगल के नीचे से निकाल कर बाएं कंधे पर डालें।",
      "हजरे अस्वद की सीध में आएं (जो दीवार पर हरी बत्ती से पहचानी जाती है)।",
      "हजरे अस्वद की तरफ़ हाथ उठाकर 'बिस्मिल्लाहि अल्लाहु अकबर' कहें (इस्तिलाम)।",
      "रमल (सिर्फ़ मर्द): पहले 3 फेरों में सीना तानकर छोटे क़दमों से तेज़ चलें। बाक़ी 4 फेरों में मामूल के मुताबिक़ चलें।",
      "तवाफ़ के दौरान जो दुआ याद हो, ज़िक्र या क़ुरआन पढ़ते रहें।",
      "रुकने यामानी और हजरे अस्वद के दरमियान मसनून दुआ 'रब्बना आतिना...' पढ़ें।",
      "हर फेरा हजरे अस्वद पर ख़त्म होता है, वहाँ फिर से इस्तिलाम करें (कुल 7 मर्तबा)।",
      "सातवां फेरा पूरा होते ही दोनों कंधे चादर से ढांक लें।",
    ],
    sunnahTips_en: [
      "Wudhu is compulsory for Tawaf.",
      "Do not push other pilgrims to touch Hajar al-Aswad or Rukn Yamani; waving hands (Istilam from distance) earns the full Sunnah reward!",
      "Touch Rukn Yamani with right hand without kissing if easily accessible; if crowded, simply walk past without waving.",
    ],
    sunnahTips_gu: [
      "તવાફ માટે વુઝૂ હોવું શરત (ફર્ઝ/વાજિબ) છે.",
      "હજરે અસ્વદ કે રુકને યામાનીને અડવા માટે કોઈને ધક્કો ન મારો; દૂરથી હાથનો ઈશારો (ઇસ્તિલામ) કરવાથી પણ સંપૂર્ણ સવાબ મળે છે.",
      "જો ભીડ હોય તો રુકને યામાની સામે હાથનો ઈશારો ન કરવો, ફક્ત આગળ વધવું.",
    ],
    sunnahTips_hi: [
      "तवाफ़ के लिए बा-वुज़ू होना ज़रूरी है।",
      "हजरे अस्वद को चूमने के लिए धक्का-मुक्की न करें; दूर से हाथ का इशारा (इस्तिलाम) करना पूरी सुन्नत का सवाब देता है।",
      "रुकने यामानी पर आसानी हो तो दायां हाथ लगाएं, बोसा न लें और दूर से इशारा न करें।",
    ],
    keyDua: {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ، وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
      pronunciation_gu: "રબ્બના આતિના ફિદ્દુન્યા હસનતંવ વફિલ આખિરતિ હસનતંવ વકિના અઝાબન્નનાર, વ અદખિલનલ જન્નતા મઅલ અબરાર, યા અઝીઝુ યા ગફ્ફાર, યા રબ્બલ આલમીન.",
      translation_gu: "હે અમારા પાલનહાર! અમને દુનિયામાં પણ ભલાઈ આપ અને આખિરતમાં પણ ભલાઈ આપ અને અમને દોઝખની આગથી બચાવ, અને અમને નેક લોકો સાથે જન્નતમાં દાખલ કર, હે જબરદસ્ત, હે અત્યંત માફ કરનાર, હે તમામ આલમોના પાલનહાર!",
      pronunciation_hi: "रब्बना आतिना फ़िद्-दुनिया ह-स-नतंव वफ़िल आख़िरति ह-स-नतंव वक़िना अज़ाबन्-नार, व अदख़िलनल जन्नता मअल अबरार, या अज़ीज़ु या ग़फ़्फ़ार, या रब्बल आलमीन।",
      translation_hi: "ऐ हमारे परवरदिगार! हमें दुनिया में भी भलाई अता फ़रमा और आख़िरत में भी भलाई दे और हमें आग के अज़ाब से बचा, और हमें नेक लोगों के साथ जन्नत में दाख़िल कर, ऐ इज़्ज़त वाले, ऐ बख़्शने वाले!",
      translation_en: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire, and admit us into Paradise with the righteous, O Almighty, O Forgiver, O Lord of the worlds.",
      reference: "Surah Al-Baqarah (2:201) & Sunnah Tawaf Dua (Dua #14)",
    },
    hasCounter: "tawaf",
    duaId: "tawaf_sunnah",
    duaGroup: "Tawaf",
    duaLabel_en: "View All 11 Tawaf Duas (Duas #9–#19)",
    duaLabel_gu: "તવાફની તમામ ૧૧ દુઆઓ જુઓ (Dua #9–#19)",
    pdfPageRef: "Book Pages 5–9",
  },

  // ── Step 4: 2 Rak'ahs at Maqam Ibrahim ──
  {
    id: 4,
    label_en: "5. 2 Rak'ahs at Maqam Ibrahim",
    label_gu: "૫. મકામે ઇબ્રાહીમ પર ૨ રકાત નમાઝ",
    label_hi: "5. मक़ामे इब्राहिम पर 2 रकात नमाज़",
    arabicName: "صَلَاةُ رَكْعَتَيْ الطَّوَاف",
    icon: "🙏",
    shortDesc_en: "Pray 2 rak'ahs behind Maqam Ibrahim (or anywhere in the Haram), reciting Surah Al-Kafirun and Surah Al-Ikhlas.",
    shortDesc_gu: "તવાફ પૂર્ણ કર્યા પછી મકામે ઇબ્રાહીમની પાછળ ૨ રકાત વાજિબ તવાફ નમાઝ પઢવી.",
    shortDesc_hi: "तवाफ़ के बाद मक़ामे इब्राहिम के पीछे (या मस्जिद में कहीं भी) 2 रकात वाजिबुत्तवाफ़ नमाज़ अदा करें।",
    detailedSteps_en: [
      "Proceed towards Maqam Ibrahim reciting the verse: 'Wattakhidhu min maqami Ibrahima musalla'.",
      "Pray 2 rak'ahs behind Maqam Ibrahim if space permits without blocking pilgrims. Otherwise, pray anywhere in Masjid al-Haram.",
      "Recite Surah Al-Kafirun in the 1st rak'ah (after Surah Al-Fatihah).",
      "Recite Surah Al-Ikhlas in the 2nd rak'ah (after Surah Al-Fatihah).",
      "Make sincere Dua after completing the Salah.",
    ],
    detailedSteps_gu: [
      "મકામે ઇબ્રાહીમ તરફ આગળ વધતાં કુરાનની આ આયત પઢો: 'વત્તખિઝૂ મિમ્મકામિ ઇબ્રાહીમા મુસલ્લા'.",
      "જો જગ્યા હોય તો મકામે ઇબ્રાહીમની પાછળ, અન્યથા હરમમાં ગમે ત્યાં ઊભા રહી ૨ રકાત નમાઝ પઢો.",
      "૧લી રકાતમાં સુરહ ફાતિહા પછી સુરહ અલ-કાફિરૂન (قُلْ يَا أَيُّهَا الْكَافِرُونَ) પઢો.",
      "૨જી રકાતમાં સુરહ ફાતિહા પછી સુરહ અલ-ઇખ્લાસ (قُلْ هُوَ اللَّهُ أَحَدٌ) પઢો.",
      "નમાઝ પૂરી કરીને હાથ ઊંચા કરી ખૂબ દુઆ કરો.",
    ],
    detailedSteps_hi: [
      "मक़ामे इब्राहिम की तरफ़ जाते हुए यह आयत पढ़ें: 'वत्तख़िज़ू मिम-मक़ामि इब्राहीमा मुसल्ला'।",
      "मक़ामे इब्राहिम के पीछे या रश होने पर हरम में जहाँ जगह मिले 2 रकात नमाज़ पढ़ें।",
      "पहली रकात में सूरह फ़ातिहा के बाद सूरह अल-काफ़िरून पढ़ें।",
      "दूसरी रकात में सूरह फ़ातिहा के बाद सूरह अल-इख़्लास पढ़ें।",
      "सलाम फेरने के बाद आजिज़ी से दिल खोलकर दुआ मांगें।",
    ],
    sunnahTips_en: [
      "Do not stand directly in the flow of Tawaf circuits if it blocks other people.",
      "If it is a disliked prayer time (Makruh times: after Asr until Maghrib, or during sunrise), scholars allow performing the Tawaf prayer immediately or delaying until sunset.",
    ],
    sunnahTips_gu: [
      "તવાફ કરી રહેલા લોકોના રસ્તામાં નમાઝ ન પઢવી જેથી કોઈને અડચણ ન થાય.",
      "આ નમાઝ વાજિબ છે અને અલ્લાહની ખૂબ નિકટ લાવે છે.",
    ],
    sunnahTips_hi: [
      "तवाफ़ करने वालों का रास्ता रोककर नमाज़ न पढ़ें।",
      "यह 2 रकात नमाज़ वाजिबुत्तवाफ़ है।",
    ],
    keyDua: {
      arabic: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
      pronunciation_gu: "વત્તખિઝૂ મિમ્મકામિ ઇબ્રાહીમા મુસલ્લા.",
      translation_gu: "અને મકામે ઇબ્રાહીમને નમાઝ પઢવાની જગ્યા બનાવો.",
      pronunciation_hi: "वत्तख़िज़ू मिम-मक़ामि इब्राहीमा मुसल्ला।",
      translation_hi: "और मक़ामे इब्राहिम को नमाज़ की जगह बनाओ।",
      translation_en: "And take the Maqam of Ibrahim as a place of prayer.",
      reference: "Surah Al-Baqarah (2:125)",
    },
    pdfPageRef: "Book Page 9",
  },

  // ── Step 5: Zamzam ──
  {
    id: 5,
    label_en: "6. Drinking Zamzam Water",
    label_gu: "૬. આબે ઝમઝમ ધરાઈને પીવું",
    label_hi: "6. आबे ज़मज़म सेर होकर पीना",
    arabicName: "الشُّرْبُ مِنْ مَاءِ زَمْزَم",
    icon: "💧",
    shortDesc_en: "Drink blessed Zamzam water while standing, facing the Qiblah, making supplication for knowledge and health.",
    shortDesc_gu: "કિબ્લાહ તરફ મુખ કરી, ઊભા રહીને, ધરાઈને ઝમઝમ પીવું અને ઇલ્મ તથા શિફાની દુઆ કરવી.",
    shortDesc_hi: "क़िबला रुख़ खड़े होकर सेर होकर ज़मज़म पिएं और इल्म व शिफ़ा की मसनून दुआ मांगें।",
    detailedSteps_en: [
      "Walk to any Zamzam drinking station or dispenser in the Mataf or ground floors.",
      "Stand, face the Holy Ka'bah (Qiblah), and say: 'Bismillah'.",
      "Drink with your right hand in three pauses/breaths until satisfied.",
      "Make dua while drinking — the Prophet ﷺ said: 'The water of Zamzam is for whatever intention it is drank for.'",
      "Pour a little water over your head and face as Sunnah.",
    ],
    detailedSteps_gu: [
      "મતાફ અથવા ગ્રાઉન્ડ ફ્લોર પર રહેલા ઝમઝમ સ્ટેશન તરફ જાઓ.",
      "ઊભા રહીને કા'બા શરીફ તરફ મોં કરો અને 'બિસ્મિલ્લાહ' કહો.",
      "જમણા હાથે ૩ ઘૂંટમાં ધરાઈને ઝમઝમ પીવો.",
      "પીતી વખતે દુઆ કરો — હદીસ શરીફમાં છે કે ઝમઝમ જે નિયતથી પીવામાં આવે તે નિયત પૂરી થાય છે.",
      "માથા અને ચહેરા પર થોડું ઝમઝમનું પાણી લગાવવું સુન્નત છે.",
    ],
    detailedSteps_hi: [
      "मताफ़ या गैलरी में लगे आबे ज़मज़म के नल की तरफ़ जाएं।",
      "क़िबला रुख़ खड़े होकर 'बिस्मिल्लाह' कहें।",
      "दाहिने हाथ से 3 घूंट में पेट भरकर पानी पिएं।",
      "पीते वक़्त दुआ मांगें — हदीस में है कि 'ज़मज़म का पानी जिस नीयत से पिया जाए वो पूरी होती है'।",
      "थोड़ा सा पानी सर और चेहरे पर डालना मसनून है।",
    ],
    sunnahTips_en: [
      "Containers labeled 'Not Cold' (غير مبرد) are available if you prefer room temperature water.",
      "Say 'Alhamdulillah' after drinking.",
    ],
    sunnahTips_gu: [
      "જો શરદી હોય તો 'Not Cold' (સામાન્ય તાપમાન) લખેલું ઝમઝમ પણ ઉપલબ્ધ હોય છે.",
      "પીધા પછી 'અલ્હમ્દુલિલ્લાહ' કહો.",
    ],
    sunnahTips_hi: [
      "अगर ठंडा पानी माफ़िक़ न हो तो 'Not Cold' वाले कंटेनर से पिएं।",
      "पीने के बाद 'अल्हम्दुलिल्लाह' कहें।",
    ],
    keyDua: {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
      pronunciation_gu: "અલ્લાહુમ્મા ઇન્ની અસ્અલુક ઇલ્મન નાફિઅંવ વ રિઝ્કંવ વાસિઅંવ વ શિફાઅમ્ મિન કુલ્લી દાઅ.",
      translation_gu: "હે અલ્લાહ! હું તારી પાસેથી નફાકારક ઇલ્મ, પુષ્કળ રોઝી અને દરેક બીમારીથી શિફા માંગું છું.",
      pronunciation_hi: "अल्लाहुम्मा इन्नी अस-अलुका इल्मन नाफ़िअंव व रिज़्क़ंव वासिअंव व शिफ़ा-अम मिन कुल्ली दाअ।",
      translation_hi: "ऐ अल्लाह! मैं तुझसे नफ़ा बख़्श इल्म, कुशादा रिज़्क़ और हर बीमारी से शिफ़ा मांगता हूँ।",
      translation_en: "O Allah, I ask You for beneficial knowledge, abundant sustenance, and cure from every ailment.",
      reference: "Mustadrak al-Hakim & Sunan al-Daraqutni (Dua #20)",
    },
    duaId: "zamzam",
    duaGroup: "Makkah",
    duaLabel_en: "Zamzam Drinking Dua (Dua #20)",
    duaLabel_gu: "ઝમઝમ પીવાની દુઆ જુઓ (Dua #20)",
    pdfPageRef: "Book Page 9",
  },

  // ── Step 6: Sa'i between Safa and Marwah ──
  {
    id: 6,
    label_en: "7. Sa'i (7 Laps between Safa & Marwah)",
    label_gu: "૭. સઈ (સફા અને મરવાહ વચ્ચે ૭ ફેરા)",
    label_hi: "7. सई (सफ़ा और मरवा के 7 चक्कर)",
    arabicName: "السَّعْيُ بَيْنَ الصَّفَا وَالمَرْوَة",
    icon: "🏃",
    shortDesc_en: "Walk 7 laps between Mount Safa and Mount Marwah (Safa to Marwah = 1 lap, finishing lap 7 at Marwah).",
    shortDesc_gu: "સફા પહાડથી શરૂ કરીને મરવાહ પહાડ સુધી ૭ ફેરા કરવા (સફા થી મરવાહ = ૧ ફેરો, ૭મો ફેરો મરવાહ પર પૂર્ણ થાય).",
    shortDesc_hi: "सफ़ा पहाड़ से शुरू करके मरवा तक 7 चक्कर लगाएं (सफ़ा से मरवा = 1 चक्कर, सातवां चक्कर मरवा पर ख़त्म होगा)।",
    detailedSteps_en: [
      "Ascend Mount Safa. When approaching it, recite: 'Innas-Safa wal-Marwata min sha'a'irillah... Abda'u bima bada'allahu bih'.",
      "Face the Ka'bah from Safa, raise hands, make Takbir (Allahu Akbar 3 times), and make personal duas.",
      "Walk calmly from Safa towards Marwah.",
      "Green Lights (Milayn Akhdarayn): Men should jog/run briskly between the fluorescent green lights. Women walk at normal pace.",
      "Arriving at Marwah completes Lap 1! Face the Ka'bah on Marwah and make Duas just like on Safa.",
      "Walk from Marwah back to Safa (Lap 2). Repeat until all 7 laps are completed.",
      "The 7th lap finishes at Mount Marwah.",
    ],
    detailedSteps_gu: [
      "સફા પહાડ પર ચઢો. સફા પાસે પહોંચતી વખતે આયત પઢો: 'ઇન્નસ સફા વલ મર્વતા મિન શઆ-ઇરિલ્લાહ... અબ્દઉ બિમા બદઅલ્લાહુ બિહ'.",
      "સફા પહાડ પર કા'બા તરફ મુખ કરી હાથ ઉઠાવો, ૩ વખત તકબીર (અલ્લાહુ અકબર) કહો અને લાંબી દુઆ કરો.",
      "સફાથી મરવાહ તરફ શાંતિપૂર્વક ચાલવાનું શરૂ કરો.",
      "લીલી લાઈટ્સ (મૈલૈન અખ્ઝરૈન): છત પર લીલા રંગની લાઈટો આવે ત્યાં પુરુષોએ ઝડપથી દોડવું. સ્ત્રીઓએ સામાન્ય ગતિએ ચાલવું.",
      "મરવાહ પહાડ પર પહોંચતાં ૧ ફેરો પૂરો થાય છે! મરવાહ પર પણ કા'બા તરફ મોં રાખી દુઆ કરો.",
      "મરવાહથી પાછા સફા જાઓ (ફેરો ૨). આ રીતે ૭ ફેરા પૂરા કરો.",
      "૭મો ફેરો મરવાહ પહાડ પર પૂર્ણ થાય છે.",
    ],
    detailedSteps_hi: [
      "सफ़ा पहाड़ की तरफ़ बढ़ें और यह आयत पढ़ें: 'इन्नस-सफ़ा वल-मर्वता मिन शआइरिल्लाह... अब्दउ बिमा बदअल्लाहु बिह'।",
      "सफ़ा पर चढ़कर क़िबला रुख़ हाथ उठाएं, 3 बार अल्लाहू अकबर कहें और दिल से दुआ करें।",
      "सफ़ा से मरवा की तरफ़ चलना शुरू करें।",
      "हरी बत्तियों के बीच (मर्द सिर्फ़) थोड़ा तेज़ दौड़ें। औरतें मामूल की रफ़्तार से चलें।",
      "मरवा पहुँचते ही 1 चक्कर पूरा हुआ! वहाँ भी क़िबला रुख़ होकर दुआ मांगें।",
      "मरवा से सफ़ा वापस आएं (चक्कर 2)। इस तरह 7 चक्कर मुकम्मल करें।",
      "सातवां चक्कर मरवा पर ख़त्म होगा।",
    ],
    sunnahTips_en: [
      "Wudhu is Sunnah for Sa'i (not strictly invalidating if broken, but highly recommended).",
      "Wheelchair services are available on designated lanes if elderly or fatigued.",
      "Total distance of Sa'i is approximately 2.8 km (around 400m per lap).",
    ],
    sunnahTips_gu: [
      "સઈ માટે વુઝૂ હોવું સુન્નત અને મુસ્તહબ છે.",
      "વૃદ્ધો કે અશક્ત લોકો માટે વ્હીલચેરની અલગ લેન ઉપલબ્ધ હોય છે.",
      "સઈના ૭ ફેરાનું કુલ અંતર આશરે ૨.૮ કિલોમીટર થાય છે.",
    ],
    sunnahTips_hi: [
      "सई के लिए बा-वुज़ू होना सुन्नत है।",
      "बुज़ुर्गों और कमज़ोरों के लिए व्हीलचेयर का अलग रास्ता बना है।",
      "सई की कुल दूरी तक़रीबन 2.8 किलोमीटर (हर चक्कर क़रीब 400 मीटर) होती है।",
    ],
    keyDua: {
      arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا، وَمَن تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ. أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ",
      pronunciation_gu: "ઇન્નસ સફા વલ મર્વતા મિન શઆ-ઇરિલ્લાહ, ફમન હજ્જલ બય્-ત અવિઅ-તમર ફલા જુનાહા અલયહિ અંય્યત્તવ્વફ બિહિમા, વ મન તતવ્વઅ ખયરન ફઇન્નલ્લાહા શાકિરુન અલીમ. અબ્દઉ બિમા બદઅલ્લાહુ બિહ.",
      translation_gu: "ખરેખર સફા અને મરવાહ અલ્લાહની નિશાનીઓમાંથી છે. તેથી જે કોઈ આ ઘરની હજ કે ઉમરાહ કરે તેના માટે બંને વચ્ચે ચક્કર લગાવવામાં કોઈ વાંધો નથી, અને જે ખુશીથી નેકી કરે તો અલ્લાહ કદરદાન અને સર્વજ્ઞ છે. હું ત્યાંથી શરૂ કરું છું જ્યાંથી અલ્લાહે શરૂ કર્યું.",
      pronunciation_hi: "इन्नस-सफ़ा वल-मर्वता मिन शआइरिल्लाह... अब्दउ बिमा बदअल्लाहु बिह।",
      translation_hi: "बेशक सफ़ा और मरवा अल्लाह की निशानियों में से हैं। इसलिए जो इस घर का हज या उमरा करे उस पर दोनों के चक्कर लगाने में कोई गुनाह नहीं। मैं उसी से शुरुआत करता हूँ जिससे अल्लाह ने फ़रमाया।",
      translation_en: "Indeed, as-Safa and al-Marwah are among the symbols of Allah. So whoever performs Hajj to the House or Umrah - there is no blame upon him for walking between them. And whoever volunteers good - then indeed, Allah is appreciative and Knowing. I begin with that which Allah began with.",
      reference: "Surah Al-Baqarah (2:158) & Sahih Muslim (Dua #21)",
    },
    hasCounter: "sai",
    duaId: "proceed_safaa",
    duaGroup: "Sa’ee",
    duaLabel_en: "View All 8 Sa'ee Duas (Duas #21–#28)",
    duaLabel_gu: "સઈની તમામ ૮ દુઆઓ જુઓ (Dua #21–#28)",
    pdfPageRef: "Book Pages 10–12",
  },

  // ── Step 7: Halq or Taqsir (Exit Ihram) ──
  {
    id: 7,
    label_en: "8. Halq / Taqsir (Hair Shaving / Trimming) — Umrah Complete!",
    label_gu: "૮. હલક અથવા તકસીર (વાળ કપાવા) — ઉમરાહ સંપન્ન!",
    label_hi: "8. हलक़ या तक़सीर (बाल मुंडवाना / कटवाना) — उमरा मुकम्मल!",
    arabicName: "الحَلْقُ أَوِ التَّقْصِير",
    icon: "✂️",
    shortDesc_en: "Men shave or trim hair evenly (Halq shaving earns 3x blessings). Women trim one fingertip length. You now exit Ihram completely!",
    shortDesc_gu: "પુરુષો માથું મુંડાવે (હલક - ૩ ગણો સવાબ) અથવા વાળ ટૂંકા કરાવે. સ્ત્રીઓ ફક્ત આંગળીના વેઢા જેટલા વાળ કાપે. ઉમરાહ પૂર્ણ થાય છે!",
    shortDesc_hi: "मर्द सर मुंडवाएं (हलक़ - 3 गुना सवाब) या बाल छोटे कराएं। औरतें उंगली के पोर बराबर बाल काटें। उमरा मुकम्मल हुआ!",
    detailedSteps_en: [
      "Men: Halq (shaving the entire head with a razor) is strongly preferred. The Prophet ﷺ prayed for those who shave their heads three times, and for those who trim only once.",
      "Men alternative: Taqsir (cutting at least 1 inch of hair from all over the head evenly).",
      "Women: Must only trim a fingertip's length (about 1 inch / 2.5 cm) from the end of their ponytail or braid in privacy.",
      "Authorized barber shops are located right outside the Marwah exit doors and Clock Tower mall.",
      "Congratulations! With Halq/Taqsir, your Umrah is complete! All Ihram restrictions are immediately lifted. Say Alhamdulillah!",
    ],
    detailedSteps_gu: [
      "પુરુષો માટે: હલક (માથું સંપૂર્ણ મુંડાવવું) સૌથી ઉત્તમ છે. નબી કરીમ ﷺ એ માથું મુંડાવનાર માટે ૩ વાર અને વાળ કતરાવનાર માટે ૧ વાર દુઆ કરી.",
      "પુરુષો માટે વિકલ્પ: તકસીર (સમગ્ર માથામાંથી ઓછામાં ઓછો ૧ ઇંચ વાળ બધી બાજુથી સરખો કાપવો).",
      "સ્ત્રીઓ માટે: ફક્ત આંગળીના એક વેઢા જેટલા (આશરે ૧ ઇંચ) વાળ છેડેથી એકાંતમાં કાપવા.",
      "મરવાહ એક્ઝિટ દરવાજાની બહાર અને ક્લોક ટાવર નીચે સરકાર માન્ય બાર્બર શોપ્સ ઉપલબ્ધ છે.",
      "મુબારક! વાળ કપાવવાની સાથે જ તમારો ઉમરાહ સંપન્ન થયો! ઇહરામની તમામ પાબંદીઓ હવે સમાપ્ત થાય છે. અલ્હમ્દુલિલ્લાહ કહો!",
    ],
    detailedSteps_hi: [
      "मर्दों के लिए: हलक़ (उस्तरे से पूरा सर मुंडवाना) अफ़ज़ल है। नबी करीम ﷺ ने सर मुंडवाने वालों के लिए 3 मर्तबा और बाल कतरवाने वालों के लिए 1 मर्तबा मग़फ़िरत की दुआ फ़रमाई।",
      "मर्दों के लिए दूसरा तरीक़ा: तक़सीर (पूरे सर से कम से कम 1 इंच बाल चारों तरफ़ से बराबर कटवाना)।",
      "औरतों के लिए: सिर्फ़ अपनी उंगली के एक पोर (तक़रीबन 1 इंच) बराबर बाल किसी पर्दे वाली जगह पर कटवाना।",
      "मरवा से बाहर निकलते ही और क्लॉक टॉवर में बा-क़ायदा हज्जामों की दुकानें मौजूद हैं।",
      "मुबारक हो! बाल कटवाने के साथ ही आपका उमरा मुकम्मल हुआ! एहराम की तमाम पाबंदियां ख़त्म हो गईं। अल्हम्दुलिल्लाह कहें!",
    ],
    sunnahTips_en: [
      "Ensure barbers use a brand new disposable blade for safety.",
      "Give charity (Sadaqah) and make Shukr to Allah for granting you the honor of completing Umrah.",
    ],
    sunnahTips_gu: [
      "હજામત કરાવતી વખતે વાળંદ નવી બ્લેડ વાપરે તેની ખાતરી કરો.",
      "ઉમરાહ સંપન્ન થયા પછી અલ્લાહનો શુક્ર અદા કરો અને ગરીબોને સદકો આપો.",
    ],
    sunnahTips_hi: [
      "हज्जाम से नया ब्लेड इस्तेमाल करवाएं।",
      "उमरा पूरा होने पर अल्लाह का शुक्र अदा करें और सदक़ा दें।",
    ],
    keyDua: {
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ، رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      pronunciation_gu: "અલ્હમ્દુ લિલ્લાહિલ્લઝી બિ-નિઅમતિહી તતિમ્મુસ-સાલેહાત, રબ્બના તકબ્બલ મિન્ના ઇન્નક અન્તસ-સમીઉલ અલીમ.",
      translation_gu: "તમામ પ્રશંસા અલ્લાહ માટે છે જેની નેઅમતોથી સારા કાર્યો પૂર્ણ થાય છે. હે અમારા રબ! અમારી આ ઈબાદત કબૂલ કર, ખરેખર તું જ સાંભળનાર અને જાણનાર છે.",
      pronunciation_hi: "अल्हम्दु लिल्लाहिल्लज़ी बि-निअमतिही ततिम्मुस-सालेहात, रब्बना तक़ब्बल मिन्ना इन्नक अन्तस-समीउल अलीम।",
      translation_hi: "तमाम तारीफ़ें अल्लाह के लिए हैं जिसकी नेअमत से नेक काम मुकम्मल होते हैं। ऐ हमारे रब! हमारी यह इबादत क़ुबूल फ़रमा, बेशक तू ही सुनने वाला जानने वाला है।",
      translation_en: "All praise is for Allah, by Whose grace good deeds are completed. Our Lord, accept from us, indeed You are the All-Hearing, All-Knowing.",
      reference: "Sunan Ibn Majah & Surah Al-Baqarah (2:127)",
    },
    duaId: "forgiveness",
    duaGroup: "Any time",
    duaLabel_en: "View Duas for Gratitude & Forgiveness (Duas #29–#39)",
    duaLabel_gu: "શુક્ર અને મગફિરતની દુઆઓ જુઓ (Dua #29–#39)",
    pdfPageRef: "Book Pages 12–15",
  },
];
