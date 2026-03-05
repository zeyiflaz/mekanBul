# 📍 MekanBul - Akıllı ve Kapsayıcı Mekan Rehberi

MekanBul, günlük hayatta farklı beklentilere sahip bireylerin veya grupların (örneğin; çocuklu bir anne ile sessiz ortam arayan bir arkadaşının) ortaklaşa keyif alabileceği mekanları bulmasını sağlayan **yapay zeka destekli** bir web platformudur.

Bu proje, bir **TÜBİTAK 2209** çalışması olarak geliştirilmiştir.

## ✨ Öne Çıkan Özellikler

* **🤖 Yapay Zeka Destekli Arama:** Klasik filtrelerin ötesinde, doğal dil işleme (Google Gemini API) kullanarak kullanıcı cümlelerinden mekan önerisi yapar.
* **♿ Maksimum Erişilebilirlik:** Tekerlekli sandalye uygunluğu, görme engelli dostu alanlar gibi kriterleri önceliklendirir.
* **👨‍👩‍👧‍👦 Her Kesime Hitap:** Ailelerden öğrencilere, evcil hayvan sahiplerinden uzaktan çalışan profesyonellere kadar geniş bir kullanıcı yelpazesine uygun filtreleme sunar.
* **⚡ Modern Teknoloji Yığını:** Next.js 16+, TypeScript ve Tailwind CSS kullanılarak yüksek performanslı ve mobil uyumlu bir deneyim sağlar.

## 🚀 Kullanılan Teknolojiler

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
* **Yapay Zeka:** Google Gemini 1.5 Flash API
* **Durum Yönetimi:** React Hooks (useState)
* **Yayınlama:** Vercel

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için:

1. Depoyu klonlayın:
   ```bash
   git clone [https://github.com/kullanici-adiniz/mekanbul.git](https://github.com/kullanici-adiniz/mekanbul.git)
2. Gerekli paketleri yükleyin:

    npm install

3. 
    .env.local dosyasını oluşturun ve API anahtarınızı ekleyin:GEMINI_API_KEY=your_api_key_here
4. 
    Geliştirici modunda başlatın:
    npm run dev    