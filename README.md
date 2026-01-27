Feature Flag Yapısı (Runtime Davranış Kontrolü)

Bu projede feature flag yapısı, uygulamanın yeniden başlatılmasına gerek kalmadan runtime’da davranış değiştirebilmesi amacıyla kullanılmıştır.

Feature flag’ler merkezi bir yapı üzerinden yönetilmekte ve ilgili servis katmanlarında karar mekanizması olarak kullanılmaktadır.

Kullanılan flag’ler:

paginationLimit
Sohbet listesinde dönecek maksimum kayıt sayısını belirler (10–100 arası).

streamingEnabled
AI completion endpoint’inin JSON response mı yoksa SSE streaming response mu üreteceğini belirler.

chatHistoryEnabled
Sohbet geçmişinin tamamının mı yoksa yalnızca son 10 mesajın mı döneceğini kontrol eder.

aiToolsEnabled
AI yanıtı oluşturulurken mock AI araçlarının (ör. hava durumu) kullanılıp kullanılmayacağını belirler.

Feature flag’ler aşağıdaki endpoint üzerinden runtime’da güncellenebilir:
curl -X PATCH http://localhost:3000/api/flags \
 -H "x-app-check: test" \
 -H "Authorization: Bearer test" \
 -H "x-client-type: web" \
 -H "Content-Type: application/json" \
 -d '{
"streamingEnabled": false,
"paginationLimit": 25
}'
Bu işlem sonrası uygulama davranışı anında değişmektedir.

AI Completion Davranışı

AI completion endpoint’i, feature flag durumuna göre iki farklı şekilde çalışmaktadır:

JSON response

Server-Sent Events (SSE) streaming response

JSON Response Örneği
curl -X POST http://localhost:3000/api/chats/1/completion \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer test" \
 -d '{"prompt":"Merhaba"}'
SSE Streaming Response Örneği
curl -N -X POST http://localhost:3000/api/chats/1/completion \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer test" \
 -d '{"prompt":"Merhaba"}'
Streaming modunda yanıt, parça parça iletilmekte ve bağlantı [DONE] sinyali ile sonlandırılmaktadır.
Middleware Akışı

Uygulamadaki tüm istekler, route bazlı olarak aşağıdaki middleware zincirinden geçmektedir:

Firebase App Check (Mock)

JWT Authentication (Mock)

Client Detection (Web / Mobile / Desktop)

Structured Logging

Bu yapı sayesinde güvenlik, istemci bilgisi ve loglama uygulama genelinde tutarlı şekilde yönetilmektedir.

Test Ortamı (Postman)

Postman ile test edebilmek için aşağıdaki environment değişkenleri kullanılabilir:

baseUrl: http://localhost:3000

token: test

appCheck: test

clientType: web

📌 Not

Bu proje, yalnızca teknik gereksinimleri karşılamayı değil; esnek, okunabilir ve genişletilebilir bir mimari yaklaşımın pratikte nasıl uygulanabileceğini göstermeyi amaçlamaktadır.
