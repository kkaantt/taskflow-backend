# Taskflow - Görev ve Proje Yönetim Sistemi API

Bu proje, Node.js ve Express.js kullanılarak geliştirilmiş RESTful tabanlı bir Görev ve Proje Yönetim Sistemi API'sidir. Şirket içi çalışanların ve görevlerin takibini, yönetimini ve CRUD operasyonlarını gerçekleştirmeyi sağlar.

## 🚀 Projenin Amacı ve Özellikleri
- Görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme (CRUD) operasyonları
- Modüler routing yapısı
- Gelen HTTP isteklerini (Method, Endpoint, Zaman Damgası) konsola kaydeden temel Logger middleware'i
- JSON tabanlı veri yönetimi

---

## 🛠️ Kurulum ve Çalıştırma Adımları

Projeyi kendi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Repoyu Klonlayın veya İndirin:**
   Proje klasörünü bilgisayarınıza indirin ve terminalde proje dizinine gidin.

2. **Bağımlılıkları Yükleyin:**
   Proje için gerekli olan Express paketinin kurulu olduğundan emin olun. Terminalde şu komutu çalıştırın:
   ```bash
   npm install
   ```

3. **Sunucuyu Başlatın:**
   Projeyi ayağa kaldırmak için şu komutu çalıştırın:
   ```bash
   node server.js
   ```
   *Başarılı çalıştırıldığında terminalde şu mesajı görürsünüz:* 
   `Sunucu http://localhost:3000 adresinde çalışıyor.`

---

## 📌 API Endpoints (Uç Noktaları)

### Görevler (Tasks)
- **Tüm Görevleri Listele:** `GET /tasks`
- **Görev Detayı Getir:** `GET /tasks/:id`
- **Yeni Görev Ekle:** `POST /tasks` *(Body içerisinde title ve assignee zorunludur)*
- **Görev Güncelle:** `PUT /tasks/:id`
- **Görev Sil:** `DELETE /tasks/:id`

### Çalışanlar (Employees)
- **Tüm Çalışanları Listele:** `GET /employees`

---

## 🧪 Test Süreci
Projedeki tüm CRUD endpoint'leri **Postman** üzerinden test edilmiştir. İstek atarken `http://localhost:3000/tasks` adresi kullanılmaktadır.