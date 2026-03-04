// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// API Anahtarını alıyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kullaniciMesaji, mekanlarListesi } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Gemini'a vereceğimiz komut (Prompt Engineering)
    const prompt = `
      Sen profesyonel bir mekan bulma asistanısın. 
      Kullanıcının isteği: "${kullaniciMesaji}"
      
      Elimizdeki mekanlar (JSON formatında): 
      ${JSON.stringify(mekanlarListesi)}
      
      GÖREVİN: Kullanıcının isteğini analiz et ve yukarıdaki mekanlar listesinden bu isteğe en uygun olan mekanları seç.
      YANIT FORMATI: Sadece uygun olan mekanların "id" numaralarını virgülle ayrılmış şekilde yaz. Başka hiçbir kelime, cümle veya açıklama yazma.
      Örnek Yanıt: 1,3,4
      Eğer hiç uygun mekan yoksa sadece 0 yaz.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ onerilenIdler: text.trim() });
    
  } catch (error) {
    console.error("Gemini API Hatası:", error);
    return NextResponse.json({ error: "Yapay zeka yanıt veremedi." }, { status: 500 });
  }
}