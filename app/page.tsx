// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed flex flex-col items-center justify-center p-6 text-center relative">
      
      {/* Arka planı biraz karartıp yazıları okunaklı yapan şık katman */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Uygulama Adı */}
        <div className="mb-8">
          <span className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg">
            Mekan<span className="text-indigo-400">Bul</span>
          </span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-100 mb-6 max-w-4xl leading-tight drop-shadow-md">
          Farklı Beklentiler, Mükemmel Eşleşme. <br />
          Herkes İçin İdeal Mekanı Keşfedin.
        </h1>

        {/* Alt Açıklama - PROFESYONEL VE KAPSAYICI YAZI */}
        <p className="text-lg text-gray-300 max-w-2xl mb-10 font-medium leading-relaxed">
          Çalışmak için odaklanabileceğiniz sessiz bir köşe, ailenizle rahat edebileceğiniz güvenli bir alan veya arkadaş grubunuzun tüm farklı dinamiklerini aynı anda karşılayacak o ortak nokta... Gelişmiş altyapımızla aradığınız atmosferi saniyeler içinde bulun.
        </p>

        {/* Keşfet Butonu */}
        <Link 
          href="/kesfet" 
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(99,102,241,0.5)]"
        >
          Mekanları Keşfet
        </Link>
      </div>
    </div>
  );
}