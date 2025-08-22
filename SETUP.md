# 🚀 คู่มือการตั้งค่าและใช้งาน

คู่มือการติดตั้งและใช้งานระบบจัดการผู้ใช้ที่ปรับปรุงใหม่

## 📋 ความต้องการของระบบ

### Software Requirements
- **Node.js**: เวอร์ชัน 18.0.0 หรือสูงกว่า
- **npm**: เวอร์ชัน 9.0.0 หรือสูงกว่า
- **Git**: สำหรับ clone โปรเจค

### Hardware Requirements
- **RAM**: ขั้นต่ำ 4GB (แนะนำ 8GB)
- **Storage**: ขั้นต่ำ 2GB
- **CPU**: ขั้นต่ำ 2 cores

## 🛠️ การติดตั้ง

### 1. Clone โปรเจค
```bash
git clone <repository-url>
cd next-auth
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตรวจสอบการติดตั้ง
```bash
npm run lint
```

### 4. รันโปรเจค
```bash
npm run dev
```

### 5. เปิดเบราว์เซอร์
```
http://localhost:3000
```

## 🎨 การปรับแต่งธีม

### เปลี่ยนสีหลัก
แก้ไขไฟล์ `src/app/globals.css`:

```css
:root {
  --primary: #1e3a8a;        /* Navy Blue */
  --primary-light: #3b82f6;  /* Blue */
  --primary-dark: #1e40af;   /* Dark Blue */
  --background: #ffffff;     /* White */
  --foreground: #1e293b;    /* Slate */
}
```

### เปลี่ยน Font
แก้ไขไฟล์ `src/app/layout.tsx`:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

### เปลี่ยน Theme ของ PrimeReact
แก้ไขไฟล์ `src/app/layout.tsx`:

```typescript
// เปลี่ยนจาก
import "primereact/resources/themes/lara-light-blue/theme.css";

// เป็น
import "primereact/resources/themes/lara-light-indigo/theme.css";
```

## 🔐 การตั้งค่าระบบความปลอดภัย

### JWT Secret
สร้างไฟล์ `.env.local`:

```env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### Cookie Settings
แก้ไขไฟล์ `src/lib/auth.ts`:

```typescript
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
```

## 📱 การทดสอบ Responsive Design

### 1. Chrome DevTools
- กด F12 หรือ Right-click > Inspect
- คลิกไอคอน Device Toggle (📱)
- เลือกขนาดหน้าจอที่ต้องการทดสอบ

### 2. Breakpoints ที่ใช้
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 3. การทดสอบบนอุปกรณ์จริง
- ใช้ Browser Stack หรือ LambdaTest
- ทดสอบบนมือถือและแท็บเล็ตจริง
- ตรวจสอบ Touch interactions

## 🎯 การปรับปรุง Performance

### 1. Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

### 2. Code Splitting
```typescript
// Lazy load components
const AdminPage = dynamic(() => import('./admin/page'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

### 3. Bundle Analysis
```bash
npm run build
npm run analyze
```

## 🔧 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

#### 1. Font ไม่แสดงผล
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

#### 2. Tailwind CSS ไม่ทำงาน
```bash
# รัน Tailwind build
npm run build:css
```

#### 3. PrimeReact Components ไม่แสดง
```bash
# ตรวจสอบ import statements
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

#### 4. TypeScript Errors
```bash
# ตรวจสอบ types
npm install @types/react @types/node
```

## 📊 การ Monitor และ Debug

### 1. Console Logging
```typescript
console.log('Debug info:', { user, timestamp: Date.now() });
```

### 2. Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
}
```

### 3. Performance Monitoring
```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🚀 การ Deploy

### 1. Vercel (แนะนำ)
```bash
npm run build
vercel --prod
```

### 2. Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### 3. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 4. Traditional Hosting
```bash
npm run build
# Upload .next folder to your server
```

## 📝 การพัฒนาต่อ

### 1. เพิ่มหน้าใหม่
```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">หน้าใหม่</h1>
      </div>
    </div>
  );
}
```

### 2. เพิ่ม API Route
```typescript
// src/app/api/new-endpoint/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}
```

### 3. เพิ่ม Component ใหม่
```typescript
// src/components/NewComponent.tsx
interface NewComponentProps {
  title: string;
  children: React.ReactNode;
}

export default function NewComponent({ title, children }: NewComponentProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}
```

## 🧪 การทดสอบ

### 1. Unit Tests
```bash
npm test
```

### 2. E2E Tests
```bash
npm run test:e2e
```

### 3. Visual Regression Tests
```bash
npm run test:visual
```

## 📚 ทรัพยากรเพิ่มเติม

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [PrimeReact Documentation](https://primereact.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Tools
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [PrimeReact Community](https://discord.gg/primereact)
- [Tailwind CSS Discord](https://discord.gg/7NF8GNe)

---

## 🆘 ต้องการความช่วยเหลือ?

หากมีคำถามหรือต้องการความช่วยเหลือ:

1. **ตรวจสอบ Documentation** ก่อน
2. **ค้นหาใน Issues** ของโปรเจค
3. **สร้าง Issue ใหม่** พร้อมรายละเอียดปัญหา
4. **ติดต่อทีมพัฒนา** ผ่านช่องทางที่กำหนด

---

⭐ **โปรเจคนี้สร้างด้วย ❤️ และ Next.js** ⭐
