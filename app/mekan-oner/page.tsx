"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MekanEklePage() {
  const router = useRouter();
  const [yukleniyor, setYukleniyor] = useState(false);

  // Form Verileri
  const [formData, setFormData] = useState({
    isim: "",
    aciklama: "",
    gorsel: "",
    adres: "",
    telefon: "",
  });

  // Özellikler (Mevcut filtrelerinle birebir uyumlu)
  const [ozellikler, setOzellikler] = useState({
    sessizOrtam: false,
    wifi: false,
    priz: false,
    acikAlan: false,
    canliMuzik: false,
    cocukOyunAlani: false,
    evcilHayvan: false,
    kahve: false,
    alkol: false,
    nargile: false,
    engelliErisimi: false,
    otopark: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setYukleniyor(true);
    
    // ŞİMDİLİK: Konsola yazdırıyoruz. Bir sonraki adımda Supabase'e gidecek.
    console.log("Kaydedilecek Veri:", { ...formData, ozellikler });
    
    setTimeout(() => {
      alert("Mekan başarıyla sisteme eklendi! Onay bekliyor.");
      setYukleniyor(false);
      router.push("/kesfet");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-12 px-6 relative overflow-hidden">
      {/* Glow Efekti */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/kesfet" className="text-indigo-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
          <span>←</span> Keşfet Sayfasına Dön
        </Link>

        <header className="mt-8 mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter">Mekan Kaydı Oluştur 🏢</h1>
          <p className="text-slate-400 text-lg mt-3">Platforma yeni bir değer katın. Bilgileri eksiksiz doldurmaya özen gösterin.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
          {/* Sol Kolon: Temel Bilgiler */}
          <div className="space-y-6 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
            <h3 className="text-indigo-400 font-bold uppercase text-xs tracking-widest">Temel Bilgiler</h3>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 ml-1">İşletme Adı</label>
              <input required type="text" placeholder="Örn: Zeyiflaz Akustik Kafe" className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" onChange={(e) => setFormData({...formData, isim: e.target.value})} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 ml-1">Açıklama</label>
              <textarea required placeholder="Mekanın atmosferinden bahsedin..." className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, aciklama: e.target.value})} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 ml-1">Görsel URL</label>
              <input required type="text" placeholder="https://images.pexels.com/..." className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, gorsel: e.target.value})} />
            </div>
          </div>

          {/* Sağ Kolon: Özellikler ve Gönder */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl flex-grow">
              <h3 className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-6">Mekan Olanakları</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(ozellikler).map((key) => (
                  <label key={key} className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-2xl border border-white/5 cursor-pointer hover:bg-indigo-500/10 transition-all group">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-slate-800 checked:bg-indigo-500 cursor-pointer" 
                      onChange={(e) => setOzellikler({...ozellikler, [key]: e.target.checked})} />
                    <span className="text-sm capitalize text-slate-400 group-hover:text-white">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>

            <button disabled={yukleniyor} type="submit" className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95 flex justify-center items-center">
              {yukleniyor ? "Kaydediliyor..." : "Mekanı Yayınla"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}