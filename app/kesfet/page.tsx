"use client";

import { useState } from "react";
import { mekanlar } from "../../data/mekanlar";
import Link from "next/link";

export default function KesfetSayfasi() {
  const [seciliFiltreler, setSeciliFiltreler] = useState<string[]>([]);
  const [yapayZekaSorgusu, setYapayZekaSorgusu] = useState("");
  const [yapayZekaSonuclari, setYapayZekaSonuclari] = useState<number[] | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [modalAcik, setModalAcik] = useState(false);

  // --- MANTIK KATMANI ---
  const filtreyiGuncelle = (filtreKodu: string) => {
    if (yapayZekaSonuclari !== null) {
      setYapayZekaSonuclari(null);
      setYapayZekaSorgusu("");
    }
    if (seciliFiltreler.includes(filtreKodu)) {
      setSeciliFiltreler(seciliFiltreler.filter((f) => f !== filtreKodu));
    } else {
      setSeciliFiltreler([...seciliFiltreler, filtreKodu]);
    }
  };

  const yapayZekaIleAra = async () => {
    if (!yapayZekaSorgusu.trim()) return;
    setYukleniyor(true);
    setYapayZekaSonuclari(null); 
    setSeciliFiltreler([]); 
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kullaniciMesaji: yapayZekaSorgusu, mekanlarListesi: mekanlar })
      });
      const data = await response.json();
      if (data.onerilenIdler && data.onerilenIdler !== "0") {
        const idler = data.onerilenIdler.split(',').map((id: string) => parseInt(id.trim()));
        setYapayZekaSonuclari(idler);
      } else {
        setYapayZekaSonuclari([]);
      }
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setYukleniyor(false);
    }
  };

  let gosterilecekMekanlar = [];
  if (yapayZekaSonuclari !== null) {
    gosterilecekMekanlar = mekanlar.filter(m => yapayZekaSonuclari.includes(m.id));
  } else {
    gosterilecekMekanlar = mekanlar.filter((mekan) => {
      return seciliFiltreler.every((filtre) => mekan.ozellikler[filtre as keyof typeof mekan.ozellikler] === true);
    });
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Arka Plan Glow Efektleri */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-tighter cursor-pointer">
              Mekan<span className="text-indigo-400">Bul</span>
            </h1>
          </Link>
          <div className="flex gap-6 items-center">
            <span 
              onClick={() => setModalAcik(true)} 
              className="text-sm font-medium hover:text-indigo-400 transition-colors cursor-pointer hidden md:block"
            >
              Nasıl Çalışır?
            </span>
            <button className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-400 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5">
              Mekan Öner
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Sol Panel: Filtreler */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md sticky top-28 max-h-[80vh] overflow-y-auto custom-scrollbar shadow-2xl text-slate-200">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h2 className="text-lg font-bold tracking-tight text-white">Kriterler</h2>
                {(seciliFiltreler.length > 0 || yapayZekaSonuclari !== null) && (
                  <button onClick={() => { setSeciliFiltreler([]); setYapayZekaSonuclari(null); setYapayZekaSorgusu(""); }} className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Temizle</button>
                )}
              </div>
              <div className="space-y-8">
                {[
                  { title: "Atmosfer", items: [["sessizOrtam", "🤫 Sessiz Ortam"], ["canliMuzik", "🎸 Canlı Müzik"], ["cocukOyunAlani", "🎡 Çocuk Alanı"], ["evcilHayvan", "🐾 Pati Dostu"]] },
                  { title: "Hizmetler", items: [["kahve", "☕ Nitelikli Kahve"], ["alkol", "🍷 Alkol Servisi"], ["nargile", "💨 Nargile"]] },
                  { title: "Teknik", items: [["wifi", "📶 Hızlı WiFi"], ["priz", "🔌 Masada Priz"]] },
                  { title: "Erişim", items: [["acikAlan", "☀️ Açık Alan"], ["kapaliAlan", "🏠 Kapalı Alan"], ["engelliErisimi", "♿ Engelsiz"], ["otopark", "🚗 Otopark"]] }
                ].map((group) => (
                  <div key={group.title} className="pb-2">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">{group.title}</h3>
                    <div className="space-y-3">
                      {group.items.map(([id, label]) => (
                        <label key={id} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={seciliFiltreler.includes(id)} 
                            onChange={() => filtreyiGuncelle(id)} 
                            className="peer appearance-none w-5 h-5 rounded-md border border-white/10 checked:bg-indigo-500 checked:border-indigo-500 transition-all cursor-pointer" 
                          />
                          <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Sağ Panel */}
          <div className="lg:col-span-9 space-y-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-[1.8rem] flex items-center p-2 pl-6 shadow-2xl">
                <span className="text-xl mr-4 opacity-70">✨</span>
                <input 
                  type="text" 
                  placeholder="Yapay zekaya nasıl bir yer aradığınızı anlatın..." 
                  className="bg-transparent border-none focus:ring-0 w-full text-white placeholder-slate-500 font-medium py-3" 
                  value={yapayZekaSorgusu} 
                  onChange={(e) => setYapayZekaSorgusu(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && yapayZekaIleAra()} 
                />
                <button 
                  onClick={yapayZekaIleAra} 
                  disabled={yukleniyor} 
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-3.5 rounded-2xl font-bold transition-all min-w-[140px] flex justify-center items-center shadow-lg shadow-indigo-500/20"
                >
                  {yukleniyor ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Mekan Bul"}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {gosterilecekMekanlar.map((mekan) => (
                <div key={mekan.id} className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-xl">
                  <div className="h-64 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center z-0">
                      <span className="text-4xl opacity-20 text-slate-200">📍</span>
                    </div>
                    <img 
                      src={mekan.gorsel} 
                      alt={mekan.isim} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 relative z-10" 
                      onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = "https://picsum.photos/id/1060/1200/800"; }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90 z-20"></div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors tracking-tight text-white">{mekan.isim}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">{mekan.aciklama}</p>
                    <div className="mt-auto">
                      <Link href={`/kesfet/${mekan.id}`} className="w-full">
                        <button className="w-full py-4 bg-white/5 hover:bg-indigo-600 text-white border border-white/10 rounded-[1.2rem] text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95">Mekanı İncele</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* NASIL ÇALIŞIR MODAL */}
      {modalAcik && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="absolute inset-0" onClick={() => setModalAcik(false)}></div>
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setModalAcik(false)} 
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-black mb-8 text-white tracking-tight">Nasıl Çalışır? ✨</h2>
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">1</div>
                <p><strong className="text-white">Kriterlerini Belirle:</strong> Sol paneldeki filtreleri kullanarak aradığın mekanın özelliklerini seçebilirsin.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">2</div>
                <p><strong className="text-white">Yapay Zekaya Danış:</strong> Arama çubuğuna doğal cümleler yazarak sana özel akıllı öneriler alabilirsin.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">3</div>
                <p><strong className="text-white">Mekanı Keşfet:</strong> Beğendiğin bir mekana tıklayarak tüm detaylarını inceleyebilirsin.</p>
              </div>
            </div>
            <button 
              onClick={() => setModalAcik(false)}
              className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
            >
              Anladım, Başlayalım!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}