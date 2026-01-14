-- Chats (sohbetler)
INSERT INTO chats (title) VALUES
('Genel Sohbet'),
('Teknik Destek'),
('Proje Planlama'),
('Backend Tartışmaları'),
('Random');

-- Messages (mesajlar)
INSERT INTO messages (chat_id, content) VALUES
(1, 'Merhaba!'),
(1, 'Nasılsın?'),

(2, 'Uygulamaya giriş yapamıyorum'),
(2, 'Cache temizlemeyi denedin mi?'),

(3, 'Sprint planı hazır mı?'),
(3, 'Deadline cuma'),

(4, 'Feature flag yaklaşımı doğru mu?'),
(4, 'Strategy pattern burada mantıklı'),

(5, 'Bugün hava çok güzel'),
(5, 'AI cevapları eğlenceli');