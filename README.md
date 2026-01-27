GDH Backend Case Study

Bu proje, GDH Teknoloji teknik değerlendirme süreci kapsamında hazırlanmış bir backend case çalışmasıdır.

Çalışmanın temel amacı; çalışma zamanında (runtime) davranışı değişebilen, buna rağmen okunabilirliğini, yönetilebilirliğini ve genişletilebilirliğini kaybetmeyen bir backend mimarisi tasarlamak ve uygulamaktır.

Proje, bir AI sohbet arayüzünü besleyen basit bir API üzerinden; feature flag yaklaşımı, tasarım desenleri ve type-safe ORM kullanımı ile esnek bir backend mimarisi oluşturmayı hedefler.

Kullanılan Teknolojiler

Node.js

TypeScript

Express

PostgreSQL

Drizzle ORM

Server-Sent Events (SSE)

Docker

Mimari Yaklaşım

Bu projede amaç, yalnızca çalışan bir API yazmak değil; değişen iş kurallarına minimum maliyetle adapte olabilen bir yapı kurmaktır.

Bu doğrultuda aşağıdaki prensipler benimsenmiştir:

Katmanlar arası sorumlulukların net ayrılması

İş kurallarının framework bağımlılıklarından izole edilmesi

Davranış değişimlerinin kodun geneline yayılmadan yönetilebilmesi

Kullanılan Tasarım Desenleri
Feature Flag

Uygulama davranışlarının runtime’da değiştirilebilmesi için kullanılmıştır.

Örnek kullanım alanları:

Pagination limitinin değiştirilmesi

Streaming / JSON response seçimi

AI Tool davranışının açılıp kapatılması

Bu sayede kod değişikliği veya redeploy gerektirmeden sistem davranışı kontrol edilebilir.

Strategy Pattern

Feature flag’lere bağlı olarak değişen davranışlar ayrı stratejiler halinde ele alınmıştır.

Örnek:

JSON response stratejisi

Server-Sent Events (SSE) streaming stratejisi

Service katmanı yalnızca hangi stratejinin kullanılacağına karar verir, stratejinin nasıl çalıştığıyla ilgilenmez.

Repository Pattern

Veritabanı erişimi repository katmanında soyutlanmıştır.

Service katmanı SQL veya ORM detaylarını bilmez

Veritabanı değişiklikleri iş kurallarını etkilemez

Okunabilirlik ve test edilebilirlik artar

Dependency Injection

Service ve repository bağımlılıkları merkezi bir container üzerinden yönetilmektedir.

Bu yaklaşım:

Bağımlılıkların açıkça görülmesini

Alternatif implementasyonların kolayca eklenmesini

Kodun daha test edilebilir olmasını

sağlar.

Singleton Pattern

Veritabanı bağlantısı ve feature flag yönetimi tek bir instance üzerinden sağlanmaktadır.

Uygulama genelinde tek bir DB bağlantı havuzu kullanılır

Konfigürasyon dağınıklığı önlenir

Kaynak yönetimi kontrol altına alınır

Veritabanı Tasarımı

Veritabanı şeması Drizzle ORM kullanılarak schema-first yaklaşımıyla tanımlanmıştır.

Tablolar TypeScript tarafında tanımlanır

Type-safe sorgular oluşturulur

Veri bütünlüğü DB seviyesinde garanti altına alınır

messages tablosu, chats tablosuna foreign key ile bağlıdır.
Bu sayede geçersiz chatId ile mesaj eklenmesi engellenir.

Feature Flag Yapısı (Runtime Davranış Kontrolü)

Uygulama, redeploy gerektirmeden runtime’da davranış değiştirebilen bir feature flag yapısına sahiptir.

Kullanılan flag’ler:

paginationLimit
Sohbet listesinde dönecek maksimum kayıt sayısını belirler (10–100 arası).

streamingEnabled
AI completion endpoint’inin JSON response mu yoksa SSE streaming response mu üreteceğini belirler.

chatHistoryEnabled
Sohbet geçmişinin tamamının mı yoksa yalnızca son 10 mesajın mı döneceğini kontrol eder.

aiToolsEnabled
AI yanıtı oluşturulurken mock AI araçlarının (ör. hava durumu) kullanılıp kullanılmayacağını belirler.

Runtime Flag Güncelleme
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

AI completion endpoint’i, feature flag durumuna göre iki farklı şekilde çalışır:

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

Streaming modunda yanıt parça parça iletilir ve [DONE] sinyali ile sonlandırılır.

Middleware Akışı

İstekler, route bazlı olarak aşağıdaki middleware zincirinden geçmektedir:

Firebase App Check (Mock)

JWT Authentication (Mock)

Client Detection (Web / Mobile / Desktop)

Structured Logging

API Endpoint’leri

GET /api/chats
Kullanıcının sohbetlerini listeler.

GET /api/chats/:chatId/history
Feature flag durumuna göre sohbet geçmişini döner.

POST /api/chats/:chatId/completion
Feature flag’e göre JSON veya SSE streaming response üretir.

Kurulum ve Çalıştırma

Öncelikle Docker servislerinin çalıştığından emin olun.

docker compose up -d
npm install
npx drizzle-kit push
npm run dev

Seed (Demo Verisi)

Projeyi ilk kez çalıştıranlar için örnek veriler sağlanmıştır.

psql -h localhost -p 55432 -U gdh -d gdh_case -f seed/seed.sql

Test Ortamı (Postman)

Postman environment değişkenleri:

baseUrl: http://localhost:3000

token: test

appCheck: test

clientType: web

Not

Bu proje, yalnızca teknik gereksinimleri karşılamayı değil; esnek, okunabilir ve genişletilebilir bir backend mimarisinin pratikte nasıl uygulanabileceğini göstermeyi amaçlamaktadır.
