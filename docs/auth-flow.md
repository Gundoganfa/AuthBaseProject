
## 🔄 **Server-Client Auth Flow**

### **1. İlk Ziyaret (Unauthenticated User)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │  Middleware │    │   Server    │    │   Clerk     │
│  (Browser)  │    │  (Next.js)  │    │  (API)      │    │  (External) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. GET /dashboard │                   │                   │
       │──────────────────▶│                   │                   │
       │                   │ 2. Check Auth     │                   │
       │                   │ (No token found)  │                   │
       │                   │──────────────────▶│                   │
       │                   │                   │ 3. Redirect to    │
       │                   │                   │    /auth/sign-in  │
       │                   │                   │◀──────────────────│
       │ 4. 302 Redirect   │                   │                   │
       │    /auth/sign-in  │                   │                   │
       │◀──────────────────│                   │                   │
       │                   │                   │                   │
       │ 5. GET /auth/sign-in                  │                   │
       │──────────────────▶│                   │                   │
       │                   │ 6. Render SignIn  │                   │
       │                   │    Component      │                   │
       │                   │──────────────────▶│                   │
       │ 7. Show Login     │                   │                   │
       │    Form           │                   │                   │
       │◀──────────────────│                   │                   │
```

### **2. Login İşlemi (Google OAuth)**

**Adım Adım Açıklama:**

1. **Kullanıcı Google Login Butonuna Tıklar**
   - Client-side'da Clerk'ın SignIn component'i Google OAuth URL'ini oluşturur

2. **Clerk Google OAuth URL'ine Yönlendirir**
   - Clerk, Google OAuth provider'ı için gerekli parametreleri hazırlar
   - `client_id`, `redirect_uri`, `scope`, `state` parametreleri eklenir

3. **Kullanıcı Google'da Giriş Yapar**
   - Google OAuth sayfası açılır
   - Kullanıcı Google hesabı ile giriş yapar
   - Google, kullanıcının izinlerini sorar

4. **Google Auth Callback**
   - Google, Clerk'ın callback URL'ine authorization code gönderir
   - Bu code geçici ve tek kullanımlıktır

5. **Clerk Callback'i İşler**
   - Clerk authorization code'u alır
   - Google'a bu code'u access token için takas eder
   - Google'dan kullanıcı bilgilerini alır

6. **User Session Oluşturulur**
   - Clerk kullanıcıyı veritabanında oluşturur/günceller
   - JWT token oluşturulur
   - Session bilgileri kaydedilir

7. **Token Cookie'ye Kaydedilir**
   - JWT token `__session` cookie'sine kaydedilir
   - HttpOnly, Secure, SameSite ayarları ile korunur

8. **Dashboard'a Yönlendirme**
   - Kullanıcı başarıyla giriş yapmış olarak dashboard'a yönlendirilir
   - Middleware artık token'ı tanır ve erişime izin verir

### **3. Protected Route Access (Authenticated User)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │  Middleware │    │   Server    │    │   Clerk     │
│  (Browser)  │    │  (Next.js)  │    │  (API)      │    │  (External) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. GET /dashboard │                   │                   │
       │    (with cookie)  │                   │                   │
       │──────────────────▶│                   │                   │
       │                   │ 2. Extract JWT    │                   │
       │                   │    from Cookie    │                   │
       │                   │──────────────────▶│                   │
       │                   │                   │ 3. Verify Token   │
       │                   │                   │    & Get User     │
       │                   │                   │──────────────────▶│
       │                   │                   │ 4. Return User    │
       │                   │                   │    Data           │
       │                   │                   │◀──────────────────│
       │                   │ 5. Auth Success   │                   │
       │                   │    → Allow Access │                   │
       │                   │──────────────────▶│                   │
       │                   │ 6. Render         │                   │
       │                   │    Dashboard      │                   │
       │                   │──────────────────▶│                   │
       │ 7. Show Dashboard │                   │                   │
       │    Content        │                   │                   │
       │◀──────────────────│                   │                   │
```

### **4. API Call (Authenticated Request)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │  Middleware │    │   Server    │    │   Clerk     │
│  (Browser)  │    │  (Next.js)  │    │  (API)      │    │  (External) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. POST /api/user │                   │                   │
       │    (with token)   │                   │                   │
       │──────────────────▶│                   │                   │
       │                   │ 2. Check Auth     │                   │
       │                   │    Middleware     │                   │
       │                   │──────────────────▶│                   │
       │                   │                   │ 3. Verify Token   │
       │                   │                   │    & Get User ID  │
       │                   │                   │──────────────────▶│
       │                   │                   │ 4. Return User ID │
       │                   │                   │◀──────────────────│
       │                   │ 5. Auth Success   │                   │
       │                   │    → Call API     │                   │
       │                   │──────────────────▶│                   │
       │                   │ 6. Process API    │                   │
       │                   │    Request        │                   │
       │                   │──────────────────▶│                   │
       │                   │ 7. Return Data    │                   │
       │                   │◀──────────────────│                   │
       │ 8. API Response   │                   │                   │
       │◀──────────────────│                   │                   │
```

## 🔧 **Teknik Detaylar**

### **Cookie Management:**
```typescript
// Clerk otomatik cookie yönetimi yapar
// __session cookie'si JWT token'ı içerir
// HttpOnly, Secure, SameSite ayarları otomatik
```

### **Token Verification:**
```typescript
// Middleware'de her request'te:
const { userId } = getAuth(req);
// Clerk JWT'yi verify eder ve user ID'yi döner
```

### **Session Management:**
```typescript
// Clerk session'ları otomatik yönetir
// Token expiration, refresh, logout işlemleri
```

## 🎯 **Önemli Noktalar:**

✅ **Server-side auth** - Middleware server'da çalışır
✅ **Client-side state** - React hooks ile user state
✅ **Automatic redirects** - Middleware otomatik yönlendirir
✅ **Secure cookies** - JWT HttpOnly cookie'de saklanır
✅ **Token refresh** - Clerk otomatik token yeniler

*********
*********

# Authentication Flow Dokümantasyonu

Bu dokümantasyon AuthBaseProject'te kullanılan authentication flow'unu detaylandırır.

## �� Server-Client Auth Flow

### Genel Bakış

Clerk tabanlı authentication sistemi 4 ana aşamadan oluşur:

1. **İlk Ziyaret** - Kullanıcı henüz giriş yapmamış
2. **Login İşlemi** - Google OAuth veya email/password ile giriş
3. **Protected Route Access** - Giriş yapmış kullanıcı korumalı sayfalara erişim
4. **API Call** - Authenticated API istekleri

### 1. İlk Ziyaret (Unauthenticated User)

Kullanıcı henüz giriş yapmamış ve korumalı bir sayfaya erişmeye çalışıyor.

**Flow:**
1. Client `/dashboard` sayfasına istek gönderir
2. Middleware auth kontrolü yapar (token bulunamaz)
3. Server kullanıcıyı `/auth/sign-in` sayfasına yönlendirir
4. Client login sayfasını görüntüler

**Teknik Detaylar:**
- Middleware `getAuth(req)` ile token kontrolü yapar
- Token yoksa `redirectToSignIn()` çağrılır
- 302 redirect ile login sayfasına yönlendirme

### 2. Login İşlemi (Google OAuth)

Kullanıcı Google hesabı ile giriş yapmaya çalışıyor.

**Flow:**
1. Kullanıcı "Google ile Giriş" butonuna tıklar
2. Clerk Google OAuth URL'ine yönlendirir
3. Kullanıcı Google'da giriş yapar
4. Google auth callback ile Clerk'a döner
5. Clerk user session oluşturur ve JWT token döner
6. Token cookie'ye kaydedilir ve dashboard'a yönlendirilir

**Teknik Detaylar:**
- Clerk OAuth provider'ları otomatik yönetir
- JWT token `__session` cookie'sinde saklanır
- Token HttpOnly, Secure, SameSite ayarları ile korunur

### 3. Protected Route Access (Authenticated User)

Giriş yapmış kullanıcı korumalı sayfalara erişiyor.

**Flow:**
1. Client korumalı sayfaya istek gönderir (cookie ile)
2. Middleware JWT token'ı cookie'den çıkarır
3. Clerk token'ı verify eder ve user data döner
4. Auth başarılı olursa sayfa render edilir

**Teknik Detaylar:**
- Middleware her request'te token verification yapar
- Clerk JWT'yi verify eder ve user ID döner
- Auth başarılı olursa `userId` request objesine eklenir

### 4. API Call (Authenticated Request)

Client-side'dan authenticated API istekleri.

**Flow:**
1. Client API endpoint'ine istek gönderir
2. Middleware auth kontrolü yapar
3. Token verify edilir ve user ID alınır
4. API handler çalıştırılır
5. Response döner

**Teknik Detaylar:**
- API route'larda `getAuth(req)` ile user bilgisi alınır
- Middleware otomatik olarak auth kontrolü yapar
- Unauthorized istekler 401 döner

## �� Middleware Konfigürasyonu

```typescript
// middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes (auth gerektirmeyen)
  publicRoutes: [
    '/',
    '/auth/sign-in',
    '/auth/sign-up',
    '/api/public'
  ],
  
  // Ignored routes (middleware çalışmasın)
  ignoredRoutes: [
    '/api/webhooks/clerk'
  ],
  
  // Custom auth logic
  afterAuth(auth, req) {
    // Custom redirect logic
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});
```

## 🛡️ Güvenlik Özellikleri

### Cookie Security
- **HttpOnly**: JavaScript erişimi engellenir
- **Secure**: Sadece HTTPS üzerinden
- **SameSite**: CSRF saldırılarına karşı koruma

### Token Management
- **JWT**: Stateless authentication
- **Automatic Refresh**: Clerk otomatik token yeniler
- **Session Invalidation**: Logout ile token geçersiz kılınır

### Rate Limiting
- **API Protection**: Brute force saldırılarına karşı
- **Login Attempts**: Başarısız giriş denemeleri sınırlanır

## 📊 Performance Optimizasyonları

### Caching
- **User Data**: Clerk user data cache'lenir
- **Token Verification**: Middleware'de optimize edilmiş

### Lazy Loading
- **Auth Components**: Sadece gerektiğinde yüklenir
- **Protected Routes**: Code splitting ile optimize edilir

## 🐛 Debugging

### Common Issues
1. **Token Expired**: Otomatik refresh çalışmıyor
2. **CORS Issues**: API calls'da CORS hatası
3. **Redirect Loop**: Middleware yanlış konfigüre edilmiş

### Debug Tools
- **Clerk Dashboard**: User sessions ve events
- **Browser DevTools**: Cookie ve network requests
- **Server Logs**: Middleware ve API logs

## �� Kaynaklar

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Middleware](https://nextjs.org/docs/middleware)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

