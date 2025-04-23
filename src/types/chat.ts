// Mesajın temel yapısı
export interface Message {
  id: string; // Benzersiz mesaj ID'si (Appwrite'tan gelebilir)
  senderId: string; // Gönderen kullanıcı ID'si
  text: string; // Mesaj içeriği
  timestamp: Date; // Mesaj gönderim zamanı
  replyTo?: string; // Yanıtlanan mesajın ID'si (isteğe bağlı)
  forwardedFrom?: string; // İletilen mesajın orijinal gönderen ID'si (isteğe bağlı)
  topicKeywords?: string[]; // Mesaj içindeki vurgulanan anahtar kelimeler
}

// Mesaj balonunun türü (standart, hot, vb.)
export type BubbleType = 'standard' | 'hot' | 'reply-preview';

// Bir mesaj balonunu temsil eder
export interface Bubble {
  id: string; // Balonun ID'si (mesaj ID'si ile aynı olabilir)
  message: Message;
  type: BubbleType;
  position: { x: number; y: number }; // Ekranda pozisyonu (Horizon için önemli olabilir)
}

// Yanıt zinciri yapısı (DualView için)
export interface ReplyChain {
  originalMessage: Message;
  replies: Message[];
}

// 'Hot' state'i için bilgiler
export interface HotState {
  isActive: boolean;
  currentText: string;
  bubbleId?: string; // İlişkili balon ID'si
}

// 'Horizon' konumu ve durumu
export interface HorizonState {
  positionY: number; // Horizon çizgisinin Y eksenindeki konumu
  visibleBubbles: Bubble[]; // Horizon üzerinde görünen balonlar
}

// 'Topic' vurgulama bilgisi
export interface TopicHighlight {
  keyword: string;
  color: string; // Vurgulama rengi
}

// Kullanıcı bilgileri (gerektiğinde genişletilebilir)
export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
}

// Genel Chat state'i (Context için)
export interface ChatState {
  messages: Message[];
  bubbles: Bubble[];
  hotState: HotState;
  horizonState: HorizonState;
  currentUser: User | null;
  activeDualView?: ReplyChain; // Aktif DualView varsa
  highlightedTopics?: TopicHighlight[]; // Aktif konular
}