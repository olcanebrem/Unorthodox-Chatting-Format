📁 Proje: Unorthodox Chat UI Engine

🧠 Genel Tanım:
Bu proje, React tabanlı özel bir mesajlaşma arayüzü geliştiriyor. Astro ile entegre (Island-based). Mobil uyumlu olacak. Appwrite üzerinden live ops çalışacak. Konsept: "Unorthodox Chat Formatting".

📚 Kavramlar:
- Hot: En güncel yazılan mesaj alanı (InputHot.tsx).
- Horizon: Kullanıcı yazışmalarının buluştuğu çizgi (HorizonLayer.tsx).
- Dual View: Mesaj balonuna tıklanınca karşılıklı sıralı görünüm açılır (DualView.tsx).
- Topic: Gün içinde sık geçen keyword’lerin renkle vurgulanması (TopicHighlight.tsx).
- Swipe left → Reply, Swipe right → Forward, Swipe down on Horizon → balonu hot yapar.

🧩 Dizin Yapısı:
/src
  ├── components/
  │   ├── Chat/ → ChatContainer, MessageBubble, InputHot, HorizonLayer, etc.
  ├── lib/ → appwrite.ts, realtime.ts
  ├── hooks/ → useHotFlow, useHorizonPosition, useReplyLogic
  ├── context/ → ChatContext.tsx
  ├── types/ → chat.ts (Message, BubbleType, ReplyChain etc.)
  ├── pages/ → index.tsx (Astro island)
  ├── styles/ → chat.css, tailwind.config.ts

🛠️ Tech Stack:
- React (Astro Islands)
- TailwindCSS (mobil öncelikli)
- Appwrite (Realtime, DB)
- React Context + Custom Hooks
- react-swipeable veya benzeri swipe logic için

🎯 Geliştirme Talimatı:
- Her mesaj bir bubble. Input alanı yeni hot başlatır. Idle olunca yeni bubble açılır.
- Hot balonları açıkken yazı baloncuk içinde görülür.
- Kullanıcılar yukarı/aşağı swipe ile geçmiş gezinebilir.
- Reply yapınca horizon'a dönülür, referans çizgileri oluşur.
- Her bileşen bağımsız. Tailwind ile responsive. Minimum UI latency.

📦 Feature Segmentasyonu
🔸 Core Mechanics
hot: Aktif yazım alanı (real-time görünen mesaj)

horizon: Chat ekranında iki kullanıcının kesiştiği çizgi

bubble lifecycle: Yazım tamamlanınca balonun kapanması

🔹 Etkileşimler
swipe-reply: Sola kaydırarak reply başlatma

swipe-forward: Sağa kaydırarak mesaj yönlendirme

swipe-to-hot: Horizon’daki balonu seçip kendi hot’un yapma

🔶 Görsel UI Davranışları
dual-view: Balona tıklandığında karşılıklı detay görünüm

reply-connector: Balonlar arasında çizgi ilişkisi

topic: Aynı gün sık tekrar eden kelimelerin vurgulanması

🔺 UX ve Logic Detaylar
dynamic-horizon: Chat hızı/yoğunluğuna göre horizon pozisyonu

topic-analysis: Kelime bazlı analiz (Appwrite function ile tetiklenebilir)

swipe-scroll: Horizon altında yukarı swipe reply yapar, altında geçmişe gider

🧷 Cursor için Talimatlar
Her hot state bir presence alanıdır. Kullanıcının aktif yazım içeriği olarak tanımlanır.

Appwrite Realtime ile bubble içeriği, konumu ve aktifliği sync edilir.

Her reply yapılan mesaj için replyId alanı tutulur ve çizgisel bağ yapılır.

Swipe gesture’lar cihaz boyutuna göre yorumlanır.

Mobile/desktop ayrımı için bileşenlerde media-query logic’e dikkat et.

✨ Ekstra Tüyolar
Framer Motion ile hot balonun genişleyerek çıkması → UX'te yoğunluk hissi sağlar.

Appwrite Functions ile server-side topic analizi yapılabilir (günde bir trigger).

Appwrite Realtime ile hem mesajlar hem presence ID’ler (hot bubble) sync edilir.

IntersectionObserver ile horizon’a en yakın balon tespiti yapılır.

