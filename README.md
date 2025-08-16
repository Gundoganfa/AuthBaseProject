# AuthBase Project

Modern ve güvenli authentication sistemi için Clerk tabanlı Node.js projesi.

## 🚀 Özellikler

- ✅ **Clerk Authentication** - Enterprise-grade auth sistemi
- ✅ **Google OAuth** - Sosyal login desteği
- ✅ **Email/Password** - Geleneksel giriş yöntemi
- ✅ **Protected Routes** - Middleware ile korumalı sayfalar
- ✅ **TypeScript** - Tam tip güvenliği
- ✅ **Next.js 14** - App Router ile modern React
- ✅ **Tailwind CSS** - Modern ve responsive tasarım
- ✅ **Jest Testing** - Kapsamlı test coverage
- ✅ **API Routes** - RESTful API endpoints

## 🏗️ Mimari

```
AuthBaseProject/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Protected dashboard
│   │   ├── api/            # API routes
│   │   └── globals.css     # Global styles
│   ├── __tests__/          # Test files
│   └── middleware.ts       # Clerk middleware
├── docs/                   # Documentation
├── package.json
└── README.md
```

## 🛠️ Kurulum

### 1. Dependencies Yükleme

```bash
npm install
```

### 2. Environment Variables

`.env.local` dosyası oluşturun (env.example'dan kopyalayın):

```bash
cp env.example .env.local
```

Sonra `.env.local` dosyasını gerçek Clerk key'lerinizle güncelleyin:

```env
# Clerk Configuration (Gerçek key'lerinizi buraya yazın)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_real_publishable_key
CLERK_SECRET_KEY=sk_test_your_real_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**NOT:** `.env.local` dosyası `.gitignore`'da olduğu için Git'e gönderilmez.

### 3. Clerk Setup

1. [Clerk Dashboard](https://dashboard.clerk.com)'a gidin
2. Yeni bir uygulama oluşturun
3. Environment variables'ları kopyalayın
4. Google OAuth provider'ını aktif edin

### 4. Development Server

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacak.

## 🧪 Testing

### Test Çalıştırma

```bash
# Tüm testleri çalıştır
npm test

# Watch mode
npm run test:watch

# Coverage raporu
npm run test:coverage
```

### Test Coverage

- ✅ **Page Tests** - Ana sayfa testleri
- ✅ **Auth Tests** - Giriş/kayıt sayfa testleri
- ✅ **Dashboard Tests** - Dashboard sayfa testleri
- ✅ **API Tests** - API endpoint testleri

## 📁 Proje Yapısı

### Pages

- **`/`** - Ana sayfa (public)
- **`/auth/sign-in`** - Giriş sayfası
- **`/auth/sign-up`** - Kayıt sayfası
- **`/dashboard`** - Korumalı dashboard

### API Endpoints

- **`GET /api/user`** - Kullanıcı bilgilerini getir
- **`PUT /api/user`** - Kullanıcı bilgilerini güncelle
- **`GET /api/public`** - Public API endpoint

### Middleware

- **Route Protection** - Korumalı sayfalar için auth kontrolü
- **Public Routes** - Auth gerektirmeyen sayfalar
- **Redirect Logic** - Giriş yapmamış kullanıcıları yönlendirme

## 🔐 Authentication Flow

### 1. İlk Ziyaret
- Kullanıcı korumalı sayfaya erişmeye çalışır
- Middleware auth kontrolü yapar
- Giriş yapmamışsa login sayfasına yönlendirir

### 2. Login İşlemi
- Google OAuth veya email/password ile giriş
- Clerk JWT token oluşturur
- Cookie'ye kaydedilir ve dashboard'a yönlendirilir

### 3. Protected Access
- Middleware her request'te token kontrolü yapar
- Geçerli token varsa erişime izin verir
- Geçersiz token varsa login sayfasına yönlendirir

## 🎨 Styling

Proje Tailwind CSS kullanır:

```bash
# Tailwind konfigürasyonu
tailwind.config.js

# Global styles
src/app/globals.css
```

## 🚀 Deployment

### Vercel (Önerilen)

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com)'de yeni proje oluşturun
3. Environment variables'ları ekleyin
4. Deploy edin

### Environment Variables (Production)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📚 Dokümantasyon

Detaylı dokümantasyon için [docs/](./docs/) klasörüne bakın:

- [Authentication Flow](./docs/auth-flow.md) - Auth akışı detayları
- [API Documentation](./docs/api.md) - API endpoint'leri
- [Testing Guide](./docs/testing.md) - Test yazma rehberi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje Apache 2.0 lisansı altında lisanslanmıştır.

## 🆘 Destek

Sorunlarınız için:
- [GitHub Issues](https://github.com/your-username/authbase-project/issues)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
