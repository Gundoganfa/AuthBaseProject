#!/bin/bash

# AuthBase Project Test Routine
# Bu script projenin tüm testlerini çalıştırır ve rapor oluşturur

echo "🚀 AuthBase Project Test Routine Başlatılıyor..."
echo "================================================"

# 1. Dependencies kontrolü
echo "📦 Dependencies kontrol ediliyor..."
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules bulunamadı. Dependencies yükleniyor..."
    npm install
else
    echo "✅ Dependencies mevcut"
fi

# 2. TypeScript type check
echo "🔍 TypeScript type check yapılıyor..."
npm run type-check
if [ $? -eq 0 ]; then
    echo "✅ TypeScript type check başarılı"
else
    echo "❌ TypeScript type check başarısız"
    exit 1
fi

# 3. Linting
echo "🧹 ESLint kontrolü yapılıyor..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ ESLint kontrolü başarılı"
else
    echo "❌ ESLint kontrolü başarısız"
    exit 1
fi

# 4. Unit tests
echo "🧪 Unit testler çalıştırılıyor..."
npm test
if [ $? -eq 0 ]; then
    echo "✅ Unit testler başarılı"
else
    echo "❌ Unit testler başarısız"
    exit 1
fi

# 5. Test coverage
echo "📊 Test coverage raporu oluşturuluyor..."
npm run test:coverage
if [ $? -eq 0 ]; then
    echo "✅ Test coverage raporu oluşturuldu"
else
    echo "❌ Test coverage raporu oluşturulamadı"
    exit 1
fi

# 6. Build test
echo "🏗️ Production build test ediliyor..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Production build başarılı"
else
    echo "❌ Production build başarısız"
    exit 1
fi

echo "================================================"
echo "🎉 Tüm testler başarıyla tamamlandı!"
echo "📁 Coverage raporu: coverage/lcov-report/index.html"
echo "📁 Build dosyaları: .next/ klasöründe"
echo "================================================"

# Test sonuçlarını özetle
echo "📋 Test Özeti:"
echo "- ✅ Dependencies kontrolü"
echo "- ✅ TypeScript type check"
echo "- ✅ ESLint kontrolü"
echo "- ✅ Unit testler"
echo "- ✅ Test coverage"
echo "- ✅ Production build"

echo ""
echo "🚀 Proje production'a hazır!"
