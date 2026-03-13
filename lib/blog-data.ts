export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  author: string
  readingTime: string
  category: string
  tags: string[]
  content: BlogSection[]
}

export interface BlogSection {
  type: "h2" | "h3" | "p" | "list" | "tip"
  text?: string
  items?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ic-cephe-boya-nasil-yapilir",
    title: "Ic Cephe Boya Nasil Yapilir? (Adim Adim Rehber)",
    metaDescription: "Ic cephe boyama islemini adim adim ogrenin. Duvar hazirligi, boya secimi, rulo teknigi ve profesyonel ipuclari ile evinizi kendiniz boyayin.",
    excerpt: "Evinizin ic mekanlarini boyamak istiyorsunuz ama nereden baslayacaginizi bilmiyorsunuz. Bu rehberde, duvar hazirligindan son kata kadar tum adimlari detayli sekilde anlatiyoruz.",
    publishedAt: "2026-02-15",
    updatedAt: "2026-02-20",
    author: "Boyaplus Uzman Ekibi",
    readingTime: "8 dk",
    category: "Rehber",
    tags: ["ic cephe boya", "boyama teknikleri", "duvar boyama", "ev boyama"],
    content: [
      { type: "h2", text: "Boyamaya Baslamadan Once: Hazirlik Asamasi" },
      { type: "p", text: "Basarili bir boyama isleminin yuzde 80'i hazirlik asamasindadir. Duvarin temiz, puruzsuz ve astarlanmis olmasi, boyanin hem gorunumunu hem de dayanakliligi dogrudan etkiler. Hazirlik yapmadan uygulanan boya, kisa surede kabarmaya, dokulmeye ve lekelenmeye baslar." },
      { type: "h3", text: "Gerekli Malzemeler" },
      { type: "list", items: [
        "Premium ic cephe boyasi (mekan buyuklugune gore hesaplanmis miktar)",
        "Astar (ilk kez boyanan veya lekeli duvarlar icin sart)",
        "Rulo (kisa tuylu: puruzsuz yuzeyler, uzun tuylu: puruzlu yuzeyler)",
        "Firca (koselere ve kesim cizgileri icin 5-7 cm eninde)",
        "Boya tavasi, maskeleme bandi, zemin ortusunu ve zimpara kagidi"
      ]},
      { type: "h2", text: "Adim 1: Duvari Hazirlama" },
      { type: "p", text: "Duvar yuzeyindeki toz, kir ve yagli lekeleri temizleyin. Nemli bir bezle silin ve kurumasini bekleyin. Catlaklari ve delikleri macun ile doldurun, kuruduktan sonra 120 kum zimparayla duzlestin. Eski boyanin kabaran kisimlarini spatula ile kaziyip cikartirsaniz yeni boya cok daha iyi tutunacaktir." },
      { type: "h3", text: "Astar Uygulama" },
      { type: "p", text: "Astar, boyanin duvara esit sekilde nufuz etmesini saglar ve renk gecislerinde homojen bir gorunum elde etmenize yardimci olur. Ozellikle ilk kez boyanan alcipan duvarlar, lekeli yuzeyler ve koyu renkten acik renge gecislerde astar kullanimi zorunludur. Astari rulo ile ince bir tabaka halinde uygulayip en az 4 saat kurumasini bekleyin." },
      { type: "h2", text: "Adim 2: Boya Secimi ve Hazirlik" },
      { type: "p", text: "Mekanin kullanim amacina gore boya cesidi secin. Oturma odalari ve yatak odalari icin mat veya ipek mat boyalar estetik bir gorunum sunar. Mutfak ve banyo gibi nem orani yuksek mekanlar icinse yari parlak veya saten boyalar tercih edilmelidir. Boya kutusunu acmadan once iyice carpin ve gerekirse uretici onerilerine gore sulandir." },
      { type: "tip", text: "Profesyonel ipucu: Boyanizi almadan once mutlaka kucuk bir numune ile duvarda test edin. Renk, kurudugunda yastan farkli gorunur." },
      { type: "h2", text: "Adim 3: Boyama Islemi" },
      { type: "p", text: "Once maskeleme bandiyla pencere cerceveleri, priz kapaklari ve tavan-duvar birlesim noktalarini maskeleyin. Firca ile koseleri ve kenarlari boyayin (bu isleme 'kesim' denir). Ardindan rulo ile genis yuzeyler icin 'W' hareketi yaparak boyayin. Her seferinde tavandan tabana dogru calisin ve yas kenarlar uzerinden devam edin." },
      { type: "h3", text: "Kac Kat Boya Uygulanmali?" },
      { type: "p", text: "Cogu durumda 2 kat boya yeterlidir. Ancak koyu renkten acik renge gecislerde 3 kat gerekebilir. Her kat arasinda boyanin tamamen kurumasini bekleyin (genellikle 4-6 saat). Ikinci kati birinciye dik yonde uygulamak daha esit bir kaplama saglar." },
      { type: "h2", text: "Adim 4: Son Dokunuslar" },
      { type: "p", text: "Son kat kuruduktan sonra maskeleme bantlarini dikkatlice cikartin. Bandi 45 derecelik aciyla yavaca cekerek temiz kesim cizgileri elde edin. Firca ve rulolari hemen su ile yikayip kurumaya birakin. Oda havalandirmasini acik tutarak boyanin tam kurumasini saglayin." },
      { type: "tip", text: "Boyaplus premium ic cephe boyalari, yuksek ortu gucu sayesinde cogu yuzey icin 2 kat uygulama yeterli olmaktadir. Detayli bilgi icin urun sayfamizi inceleyebilirsiniz." },
    ]
  },
  {
    slug: "tek-kat-boya-yeterli-mi",
    title: "Tek Kat Boya Gercekten Yeterli mi?",
    metaDescription: "Tek kat boya ne zaman yeterlidir, ne zaman yetersiz kalir? Boya katlarinin onemi, dogru uygulama teknikleri ve tasarruf ipuclari.",
    excerpt: "Tek kat boya ile maliyet ve zamandan tasarruf etmek cazip gorunse de, her durumda yeterli olmayabilir. Hangi durumlarda tek kat yeterli, hangi durumlarda kesinlikle iki kat gerekli?",
    publishedAt: "2026-02-16",
    updatedAt: "2026-02-20",
    author: "Boyaplus Uzman Ekibi",
    readingTime: "6 dk",
    category: "Bilgilendirme",
    tags: ["tek kat boya", "boya katlari", "boya kalitesi", "tasarruf"],
    content: [
      { type: "h2", text: "Tek Kat Boyanin Avantajlari ve Sinirliliklari" },
      { type: "p", text: "Tek kat boya uygulamasi zaman ve malzeme acisindan tasarruf saglar. Ancak her yuzeyde ve her renk gecisinde ayni sonucu vermez. Boyanin ortu gucu, mevcut duvar rengi, yuzeyin durumu ve kullanilan urunun kalitesi, tek katin yeterli olup olmayacagini belirleyen temel faktorlerdir." },
      { type: "h2", text: "Tek Kat Boyanin Yeterli Oldugu Durumlar" },
      { type: "list", items: [
        "Ayni renk uzerine tazeleme boyasi yapiliyorsa",
        "Acik renkten ayni tonda acik renge geciliyorsa",
        "Duvar yuzeyinin temiz, puruzsuz ve iyi astarlanmis olmasi durumunda",
        "Yuksek ortu gucune sahip premium boya kullanildiginda"
      ]},
      { type: "h2", text: "Iki Kat Boyanin Sart Oldugu Durumlar" },
      { type: "list", items: [
        "Koyu renkten acik renge geciste (bazen 3 kat bile gerekebilir)",
        "Ilk kez boyanan alcipan veya sivali yuzeyler",
        "Lekeli, sigara dumanina maruz kalmis veya nemli duvarlar",
        "Canli ve doygun renkler (kirmizi, turuncu, koyu mavi gibi)"
      ]},
      { type: "h2", text: "Ortu Gucu Nedir ve Neden Onemlidir?" },
      { type: "p", text: "Ortu gucu, boyanin alt yuzey rengini gizleme kapasitesidir. Yuksek ortu gucune sahip boyalar, daha az kat ile daha homojen bir gorunum elde etmenizi saglar. Ucuz boyalar genellikle dusuk ortu gucune sahiptir ve sonucta daha fazla kat gerektirir, bu da toplam maliyeti arttirir." },
      { type: "tip", text: "Boyaplus premium boyalari, yuksek pigment yogunlugu sayesinde ustun ortu gucu sunar. Bir cok uygulamada 2 kat ile mukemmel sonuc alinir." },
      { type: "h2", text: "Dogru Uygulama Teknigi: Kat Sayisindan Daha Onemli" },
      { type: "p", text: "Kat sayisi kadar uygulama teknigi de onemlidir. Cok kalin bir tek kat surer, dokulme ve akma sorunlariyla karsilasabilirsiniz. Bunun yerine ince ve esit iki kat surmek her zaman daha iyi sonuc verir. Rulo ile 'W' hareketi yaparak boyayin ve her kati farkli yonde uygulayin." },
      { type: "h3", text: "Sonuc: Kaliteli Boya ile Dogru Teknik" },
      { type: "p", text: "Ozet olarak, kaliteli bir boya ile dogru teknik kullandiginizda cogu durumda 2 kat yeterlidir. Tek kat sadece tazeleme boyasi ve ideal yuzeylerde onerilebilir. Uzun omurlu ve profesyonel bir sonuc icin asla tek kattan fazlasindan odun vermeyin." },
    ]
  },
  {
    slug: "duvar-boyamadan-once-yapilmasi-gerekenler",
    title: "Duvar Boyamadan Once Yapilmasi Gerekenler",
    metaDescription: "Duvar boyamadan once yapilmasi gereken hazirlik adimlari. Duvar temizligi, macunlama, astarlama ve maskeleme teknikleri ile profesyonel sonuclar elde edin.",
    excerpt: "Boyama isleminin en onemli asamasi hazirlik surrecidir. Duvarinizi boyamadan once yapmaniz gereken tum adimlari bu rehberde bulabilirsiniz.",
    publishedAt: "2026-02-17",
    updatedAt: "2026-02-20",
    author: "Boyaplus Uzman Ekibi",
    readingTime: "7 dk",
    category: "Rehber",
    tags: ["duvar hazirligi", "boya oncesi", "macunlama", "astarlama"],
    content: [
      { type: "h2", text: "Neden Hazirlik Bu Kadar Onemli?" },
      { type: "p", text: "Profesyonel boyacilar, toplam islem suresinin yarisini hazirlik asamasina ayirir. Bunun nedeni basittir: en kaliteli boya bile hazirlanmamis bir yuzeyde dogru performans gosteremez. Hazirliksiz uygulanan boya katinda kabarciklar, pullanma, lekelenme ve erken solma gibi sorunlar yasanir." },
      { type: "h2", text: "1. Esya ve Zemini Koruma Altina Alin" },
      { type: "p", text: "Odadaki mobilyalari ortaya toplayin ve ustlerini plastik ortu ile kapatin. Zemini gazeteler veya ozel zemin ortusuyle koruyun. Priz ve anahtar kapaklarini cikartin. Bu basit adimlar, boyama sonrasi temizlik islemini buyuk olcude azaltir." },
      { type: "h2", text: "2. Duvari Temizleyin" },
      { type: "p", text: "Duvardaki toz, orumcek agi, yag lekeleri ve kalem izlerini temizleyin. Hafif kirler icin nemli bir bez yeterlidir. Agir yag lekeleri icin az miktarda bulasik deterjani karisimli su kullanin. Kuflenmis bolgeler icin ozel kuf temizleyici uygulayip beklettikten sonra silin. Temizledikten sonra duvar tamamen kuruyuncaya kadar bekleyin." },
      { type: "h2", text: "3. Yuzey Tamirlerini Yapin" },
      { type: "h3", text: "Catlaklari ve Delikleri Onarma" },
      { type: "p", text: "Ince catlaklari hazir macun ile doldurun. Derin catlaklari once genistetin, ardindan katmanlar halinde macunlayin. Civi delikleri icin kucuk miktar macun yeterlidir. Her macunlama isleminden sonra tamamen kurumasini bekleyin ve 120-150 kum zimparayla duzlestin." },
      { type: "h3", text: "Kabaran ve Dokulen Boya" },
      { type: "p", text: "Eski boyanin kabaran, catlayan veya dokulen kisimlarini spatula ile kaziyarak cikartin. Kenarlarini zimparayla yumusatin. Bu islem yapmak yeni boyanin tutunmasini ve yuzey duzgunlugunu saglar." },
      { type: "h2", text: "4. Astar Uygulayin" },
      { type: "p", text: "Astar, boyanin duvara esit sekilde yapismasini saglar ve renk homojenligini arttirir. Ozellikle su durumlarda astar sart: yeni sivali veya alcipan duvarlar, koyu renkten acik renge gecis, lekeli yuzeyler ve ilk kez boyanan yuzeyler. Astari ince bir tabaka halinde rulo ile uygulayin." },
      { type: "h2", text: "5. Maskeleme Bandi Uygulayin" },
      { type: "p", text: "Pencere cerceveleri, kapi kasalari, tavan-duvar birlesim cizgisi ve suskalar gibi boyanmasini istemediginiz yuzeyler icin kaliteli maskeleme bandi kullanin. Bandi duz bir cizgi halinde yapistirin ve bastirarak yakin temas saglayin. Boya altina sizan bant, tum isi berbat edebilir, bu yuzden kaliteli bant secimi kritiktir." },
      { type: "tip", text: "Boyaplus olarak, boyama oncesi hazirlik konusunda uzman destegi sunuyoruz. Dogru urun secimi ve teknik destek icin bizimle iletisime gecebilirsiniz." },
    ]
  },
  {
    slug: "beyaz-boya-tonlari-arasindaki-farklar",
    title: "Beyaz Boya Tonlari ve Aralarindaki Farklar",
    metaDescription: "Beyaz boya tonlari arasindaki farklari kesfet. Soguk beyaz, sicak beyaz, kirik beyaz ve daha fazlasi. Mekaniniza uygun beyaz tonu nasil secersiniz?",
    excerpt: "Beyaz sadece beyaz degildir. Onlarca farkli beyaz tonu vardir ve dogru secim mekaninizin atmosferini tamamen degistirebilir. Peki hangi beyaz tonu size uygun?",
    publishedAt: "2026-02-18",
    updatedAt: "2026-02-20",
    author: "Boyaplus Uzman Ekibi",
    readingTime: "5 dk",
    category: "Bilgilendirme",
    tags: ["beyaz boya", "boya tonlari", "renk secimi", "ic mekan"],
    content: [
      { type: "h2", text: "Beyaz Neden En Populer Renktir?" },
      { type: "p", text: "Beyaz, mekanlari daha genis ve aydinlik gostermesiyle bilinen en populer ic cephe boya rengidir. Ancak 'beyaz boya' derken aslinda cok genis bir renk yelpazesinden bahsediyoruz. Boya kataloglarinda onlarca farkli beyaz tonu bulunur ve dogru secim mekaninizin tum havasini degistirir." },
      { type: "h2", text: "Temel Beyaz Tonu Cesitleri" },
      { type: "h3", text: "Saf Beyaz (Pure White)" },
      { type: "p", text: "Hicbir alt tonu olmayan saf beyazdir. Modern ve minimalist mekanlarda tercih edilir. Ancak buyuk yuzeyler icin bazen cok sert gorunebilir, ozellikle dogal isik alan odalarda. Genellikle tavan boyasi olarak veya vurgu amacli kullanilir." },
      { type: "h3", text: "Sicak Beyaz (Warm White)" },
      { type: "p", text: "Sari veya krem alt tonlarina sahiptir. Mekana sicak, davetkar bir atmosfer katar. Oturma odalari, yatak odalari ve ahsap mobilyali mekanlar icin idealdir. Dogal isik alan odalarda daha da etkileyici gorunur." },
      { type: "h3", text: "Soguk Beyaz (Cool White)" },
      { type: "p", text: "Mavi veya gri alt tonlarina sahiptir. Temiz, ferah ve modern bir gorunum sunar. Banyolar, mutfaklar ve ofis gibi islevsel mekanlarda cok tercih edilir. Yapay aydinlatma ile birlestiginde profesyonel bir hava yaratir." },
      { type: "h3", text: "Kirik Beyaz (Off-White)" },
      { type: "p", text: "Hafif bej, gri veya krem karisimli beyazdir. Yumusak ve zarif bir gorunum saglar. Klasik ve gecis stili mekanlarda cok sevilen bu ton, duvarlar ve tavanlar arasinda hafif bir kontrast olusturur." },
      { type: "h2", text: "Dogru Beyaz Tonu Nasil Secilir?" },
      { type: "list", items: [
        "Odanin dogal isik durumunu degerlendirin: kuzey bakan odalar soguk tonlardan kacinmali",
        "Mobilyalarinizla uyumu kontrol edin: ahsap mobilyalar sicak beyazlarla uyumludur",
        "Numuneyi duvara surarak farkli saatlerde inceleyin: isik acilarinda ton degisir",
        "Tavan ve duvar icin farkli beyaz tonlari kullanmayi deneyin: derinlik katar",
        "Buyuk bir karton uzerine numune boyasi surep duvara dayanarak test edin"
      ]},
      { type: "tip", text: "Boyaplus beyaz boya serisinde farkli sicaklik ve tonlarda secenekler sunuyoruz. Numune kartlarimizla mekaninizda test etmenizi oneriyoruz." },
    ]
  },
  {
    slug: "kaliteli-boya-nasil-anlasilir",
    title: "Usta Gozuyle Kaliteli Boya Nasil Anlasilir?",
    metaDescription: "Kaliteli boyanin ozelliklerini ogrenin. Ortu gucu, kivam, koku, dayaniklilik ve ambalaj kalitesi ile boyanin kalitesini nasil anlayabilirsiniz?",
    excerpt: "Marketten aldiginiz boyanin kaliteli oldugundan nasil emin olabilirsiniz? Uzman boyacilarin yillar icinde edindigi deneyimlerden derledigimiz pratik ipuclari.",
    publishedAt: "2026-02-19",
    updatedAt: "2026-02-20",
    author: "Boyaplus Uzman Ekibi",
    readingTime: "6 dk",
    category: "Uzman Gorusu",
    tags: ["boya kalitesi", "boya secimi", "profesyonel ipuclari", "boya alirken"],
    content: [
      { type: "h2", text: "Kaliteli Boyanin Temel Ozellikleri" },
      { type: "p", text: "Boya marketi raflarinda onlarca farkli marka ve fiyat araligi karsiniza cikar. En pahali urun her zaman en iyi olmayabilir, en ucuzu ise cogu zaman beklentiyi karsilamaz. Kaliteli boyanin belli baslisikriterleri vardir ve bunlari bilmek sizi hem gereksiz harcamalardan hem de kotu sonuclardan korur." },
      { type: "h2", text: "1. Ortu Gucu ve Pigment Yogunlugu" },
      { type: "p", text: "Kaliteli bir boyanin en onemli ozelligi yuksek ortu gucudur. Boyanin icindeki pigment orani ne kadar yuksekse, ortu gucu de o kadar iyidir. Pratik test: Boya numunesini siyah bir kartonun uzerine surun. Kaliteli boya tek katta bile siyahi buyuk olcude gizler. Dusuk kaliteli boyada siyah yuzey acikcikca gorunmeye devam eder." },
      { type: "h2", text: "2. Kivam ve Akis Ozelligi" },
      { type: "p", text: "Kaliteli boya karistirildiginda puruzsuz, kremsi bir kivama sahiptir. Rulo veya fircaya kolayca alinir ve duvara sururken akmaz. Cok sulu veya cok koyu kivamli boyalar dikkatli olmaniz gereken isaret. Kaliteli boyalar kutudan ciktigi gibi kullanilabilir, fazla sulandirmaya gerek duymaz." },
      { type: "h2", text: "3. Koku ve Kimyasal Icerik" },
      { type: "p", text: "Modern kaliteli boyalar dusuk VOC (Ucucu Organik Bilesik) degerine sahiptir. Bu hem saglik hem de cevre acisindian onemlidir. Asiri keskin kokusu olan boyalar yuksek kimyasal icerige isaret edebilir. Su bazli boyalar, solvent bazlilara gore genellikle daha dusuk VOC degerine sahiptir." },
      { type: "h2", text: "4. Yilanabilirlik ve Dayaniklilik" },
      { type: "p", text: "Kaliteli bir boya kuruduktan sonra silinebilir olmalidir. Ozellikle cocuklu evlerde ve mutfaklarda bu ozellik cok onemlidir. Test icin: kurumus boya uzerine nemli bir bezle silin. Kaliteli boyada renk acikmaz ve iz kalmaz. Dusuk kaliteli boyada renk hemen cikmaya baslar." },
      { type: "h2", text: "5. Ambalaj ve Uretici Bilgileri" },
      { type: "list", items: [
        "Uretim tarihi ve son kullanma tarihi acikca yazili olmali",
        "Uygulama talimatlari detayli ve anlasilir olmali",
        "TSE veya uluslararasi kalite belgesi bulunmali",
        "Sulandirma orani, kuruma suresi ve kaplama alani bilgisi yer almali",
        "Renk kodu ve seri numarasi ile ayni tonu tekrar alabilme imkani olmali"
      ]},
      { type: "tip", text: "Boyaplus boyalari, yuksek pigment yogunlugu, dusuk VOC degerleri ve uluslararasi kalite standartlarina uygunlugu ile profesyonellerin tercihi olmaya devam ediyor." },
    ]
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(p => p.slug)
}
