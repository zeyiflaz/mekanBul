"use client";

import { useParams, useRouter } from "next/navigation";
import { mekanlar } from "../../../data/mekanlar"; 
import Link from "next/link";

export default function MekanDetaySayfasi() {
  const params = useParams();
  const router = useRouter();
  
  const mekan = mekanlar.find((m) => m.id === Number(params.id));

  if (!mekan) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white font-bold">Mekan bulunamadı!</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-20">
      <div className="h-[55vh] relative w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <span className="text-6xl opacity-10">📍</span>
        </div>
        <img 
            src={mekan.gorsel} 
            alt={mekan.isim} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover relative z-10" 
            onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000"; }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent z-20"></div>
        <button onClick={() => router.back()} className="absolute top-10 left-10 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 z-50 shadow-2xl">← Geri Dön</button>
      </div>

      <main className="max-w-5xl mx-auto px-6 -mt-32 relative z-30">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">{mekan.isim}</h1>
            <div className="flex flex-wrap gap-3">
              {mekan.ozellikler.sessizOrtam && <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest">Sessiz Ortam</span>}
              {mekan.ozellikler.wifi && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest">Hızlı WiFi</span>}
            </div>
          </div>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-16 border-l-4 border-indigo-500 pl-8 italic">"{mekan.aciklama}"</p>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 border-b border-white/5 pb-4">İletişim & Konum</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">📍</div>
                    <div><span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Açık Adres</span><p className="text-white text-lg font-medium leading-snug">{mekan.iletisim.adres}</p></div>
                </div>
                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">📞</div>
                    <div><span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Telefon Numarası</span><p className="text-white text-lg font-medium">{mekan.iletisim.telefon}</p></div>
                </div>
              </div>
            </div>
            <div className="space-y-10">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 border-b border-white/5 pb-4">Mekan Olanakları</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(mekan.ozellikler).map(([key, value]) => (
                  <div key={key} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${value ? 'bg-indigo-500/10 border-indigo-500/30 text-white shadow-lg' : 'bg-white/5 border-white/5 opacity-30'}`}><span className="text-[11px] font-bold capitalize tracking-tight">{key.replace(/([A-Z])/g, ' $1').trim()}</span><div className="ml-auto text-lg">{value ? '✅' : '❌'}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}