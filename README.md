# Uçuş Rezervasyon Sistemi
Proje Hakkında
Bu proje, kullanıcıların uçuş araması yapmalarını, filtrelemelerini ve rezervasyon yapmalarını sağlayan bir uçuş rezervasyon sistemi uygulamasıdır. 
Kullanıcılar, belirli kriterlere göre uçuşları arayabilir, uçuş detaylarını görebilir ve rezervasyon işlemlerini gerçekleştirebilir.

# Kullanılan Teknolojiler
 
### Frontend (Web)
React: Kullanıcı arayüzü oluşturmak için kullanıldı.
Redux: Global durum yönetimi için kullanıldı.
Material-UI: UI bileşenleri ve stil yönetimi için kullanıldı.
Framer Motion: Animasyon ve geçiş efektleri için kullanıldı.
Axios: Backend API’lerine HTTP istekleri yapmak için kullanıldı


### Backend (Sunucu)

Nginx: Gateway olarak kullanılmıştır.
Node.js: Backend için çalışma zamanı ortamı olarak kullanıldı.
NestJS: API geliştirme ve yönetimi için kullanıldı.
Passport.js & JWT: Kimlik doğrulama ve güvenli erişim için kullanıldı.
MongoDB: Veri depolama için kullanıldı.
Mongoose: MongoDB ile veri modelleme için kullanıldı.
Docker: Servislerin konteynerleştirilmesi ve dağıtımı için kullanıldı

## Özellikler
Kullanıcı kimlik doğrulama (JWT ile).
Uçuş arama ve listeleme.
Uçuş filtreleme ve sıralama (havayolu, durak sayısı, fiyat vb.).
Uçuş rezervasyonu.
Kullanıcı uçuşlarının yönetimi.

## Gereksinimler
Bu projeyi çalıştırmadan önce aşağıdaki gereksinimlerin karşılandığından emin olun:

Docker: Uygulamayı Docker konteynerlerinde çalıştırmak için gereklidir.
Docker Compose: Birden fazla servisi aynı anda çalıştırmak için kullanılır.
Node.js: Uygulama geliştirme ortamı için gerekli olabilir (Docker kullanmayacaksanız).

## Kurulum ve Çalıştırma

### Docker ile Çalıştırma
Bu proje, Docker ile konteynerleştirilmiştir, bu yüzden Docker kullanarak kolayca çalıştırabilirsiniz.

1-Proje Depozunu Klonlayın:

git clone https://github.com/kullaniciadi/proje-adi.git
cd proje-adi

2-Docker Compose ile Servisleri Başlatın:
Docker Compose, uygulamanın tüm servislerini tek bir komutla başlatmanızı sağlar.

docker-compose up -d

3-Uygulamaya Erişin:
Web:    Uygulama varsayılan olarak http://localhost:3000 adresinde çalışacaktır.
Server: Uygulama varsayılan olarak http://localhost:5000 adresinde çalışacaktır.


### Manuel Kurulum ve Çalıştırma
Docker kullanmak istemiyorsanız, Node.js ile manuel olarak da çalıştırabilirsiniz.

1-Proje Depozunu Klonlayın:

git clone https://github.com/kullaniciadi/proje-adi.git
cd proje-adi

2-Bağımlılıkları Yükleyin:
Her servis için bağımlılıkları yükleyin.

cd auth-service && npm install
cd ../user-service && npm install
cd ../flight-service && npm install
cd ../web && npm install

3-Servisleri Başlatın:
Her bir servisi ayrı ayrı başlatın.

npm start

4-Uygulamaya Erişin:
Web:    Uygulama varsayılan olarak http://localhost:3000 adresinde çalışacaktır.
Server: Uygulama varsayılan olarak http://localhost:5000 adresinde çalışacaktır.