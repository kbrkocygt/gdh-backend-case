# GDH Backend Case Study

Bu proje, GDH Teknoloji teknik değerlendirme süreci kapsamında hazırlanmış bir backend case çalışmasıdır.

Çalışmanın temel amacı; **çalışma zamanında (runtime) davranışı değişebilen**, buna rağmen **okunabilirliğini, yönetilebilirliğini ve genişletilebilirliğini kaybetmeyen** bir backend mimarisi tasarlamak ve uygulamaktır.

Proje, bir AI sohbet arayüzünü besleyen basit bir API üzerinden; **feature flag yaklaşımı**, **tasarım desenleri** ve **type-safe ORM kullanımı** ile esnek bir backend mimarisi oluşturmayı hedefler.

---

## Kullanılan Teknolojiler

- Node.js
- TypeScript
- Express
- PostgreSQL
- Drizzle ORM
- Docker

---

## Mimari Yaklaşım

Bu projede amaç, yalnızca çalışan bir API yazmak değil; **değişen iş kurallarına minimum maliyetle adapte olabilen** bir yapı kurmaktır.

Bu doğrultuda aşağıdaki prensipler benimsenmiştir:

- Katmanlar arası sorumlulukların net ayrılması
- İş kurallarının framework bağımlılıklarından izole edilmesi
- Davranış değişimlerinin kodun geneline yayılmadan yönetilebilmesi

---

## Kullanılan Tasarım Desenleri

### Feature Flag

Uygulama davranışlarının runtime’da değiştirilebilmesi için kullanılmıştır.  
Örneğin:

- Pagination limitinin değiştirilmesi
- Streaming / JSON response seçimi
- AI Tool davranışının açılıp kapatılması

Bu sayede kod değişikliği yapmadan sistem davranışı kontrol edilebilir.

---

### Strategy Pattern

Feature flag’lere bağlı olarak değişen davranışlar ayrı stratejiler halinde ele alınmıştır.

Örnek:

- JSON response stratejisi
- Server-Sent Events (SSE) streaming stratejisi

Service katmanı yalnızca **hangi stratejinin kullanılacağına karar verir**, stratejinin nasıl çalıştığıyla ilgilenmez.

---

### Repository Pattern

Veritabanı erişimi repository katmanında soyutlanmıştır.

- Service katmanı SQL veya ORM detaylarını bilmez
- Veritabanı değişiklikleri iş kurallarını etkilemez
- Test edilebilirlik ve okunabilirlik artar

---

### Dependency Injection

Service ve repository bağımlılıkları merkezi bir container üzerinden yönetilmektedir.

Bu yaklaşım:

- Bağımlılıkların açıkça görülmesini
- Alternatif implementasyonların kolayca eklenmesini
- Kodun daha test edilebilir olmasını sağlar

---

### Singleton Pattern

Veritabanı bağlantısı ve ORM yapılandırması tek bir instance üzerinden yönetilmektedir.

- Uygulama genelinde tek bir DB bağlantı havuzu kullanılır
- Konfigürasyon dağınıklığı önlenir
- Kaynak yönetimi kontrol altına alınır

---

## Veritabanı Tasarımı

Veritabanı şeması Drizzle ORM kullanılarak **schema-first** yaklaşımıyla tanımlanmıştır.

- Tablolar TypeScript tarafında tanımlanır
- Type-safe sorgular oluşturulur
- Veri bütünlüğü DB seviyesinde garanti altına alınır

`messages` tablosu, `chats` tablosuna **foreign key** ile bağlıdır.  
Bu sayede:

- Geçersiz chatId ile mesaj eklenemez
- Veri tutarlılığı korunur

---

## Proje Yapısı

- **Controller katmanı** yalnızca HTTP isteklerini karşılar
- **Service katmanı** iş kurallarını ve karar mekanizmalarını içerir
- **Strategy katmanı** değişken davranışları yönetir
- **Repository katmanı** veritabanı erişimini izole eder
- **Config ve DB katmanları** altyapı detaylarını merkezi olarak yönetir

Bu yapı sayesinde yeni bir davranış eklemek veya mevcut bir davranışı değiştirmek için sistemin tamamına müdahale etmek gerekmez.

Örnek API Endpoint’leri

•GET /api/chats -> Tüm sohbetleri listeler.
•GET /api/chats/:chatId/history -> Belirli bir sohbetin mesaj geçmişini getirir.
•POST /api/chats/:chatId/completion ->Feature flag durumuna göre JSON veya streaming response üretir.

## Kurulum ve Çalıştırma

Öncelikle Docker servislerinin çalıştığından emin olun.

```bash
docker compose up -d
npm install
npx drizzle-kit push
npm run dev


```
