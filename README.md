# ระบบจัดการผู้ใช้ - User Management System

ระบบจัดการผู้ใช้ที่มีประสิทธิภาพ พร้อมระบบความปลอดภัยและการจัดการสิทธิ์ที่ครบครัน สร้างด้วย Next.js 15, TypeScript, PrimeReact และ Tailwind CSS

## ✨ คุณสมบัติหลัก

- 🔐 **ระบบความปลอดภัย**: การยืนยันตัวตนด้วย JWT Token
- 👥 **จัดการผู้ใช้แบบ CRUD**: เพิ่ม แก้ไข ลบ และดูข้อมูลผู้ใช้
- 📊 **แดชบอร์ด**: แสดงข้อมูลสำคัญและสถิติการใช้งาน
- 🎨 **UI ที่สวยงาม**: ใช้ธีมสี Navy Blue และ White พร้อม Font Kanit
- 📱 **Responsive Design**: รองรับทุกขนาดหน้าจอ
- 🔒 **ระบบสิทธิ์**: แยกสิทธิ์ระหว่าง Admin และ User
- 🔔 **Toast Notifications**: การแจ้งเตือนที่ทันสมัยและสวยงาม
- 🎯 **Sakai Theme**: ใช้ PrimeReact Sakai theme สำหรับการจัดการข้อมูล

## 🎨 ธีมการออกแบบ

### สีหลัก
- **Navy Blue**: `#1e3a8a` (Primary)
- **White**: `#ffffff` (Background)
- **Slate**: `#1e293b` (Text)
- **Blue Accent**: `#3b82f6` (Interactive elements)

### Typography
- **Font Family**: Kanit (รองรับภาษาไทยและภาษาอังกฤษ)
- **Font Weights**: 300, 400, 500, 600, 700
- **Font Loading**: Optimized with preload และ display swap

### Components
- **Cards**: Shadow และ Border radius ที่สวยงาม
- **Buttons**: Hover effects และ Transitions
- **Icons**: PrimeIcons ที่สอดคล้องกับธีม
- **Toast**: การแจ้งเตือนที่ทันสมัยและ responsive
- **DataTable**: ตารางข้อมูลที่สวยงามพร้อมฟีเจอร์ครบครัน
- **Dialog**: Modal forms สำหรับการจัดการข้อมูล

## 🚀 การติดตั้ง

1. **Clone โปรเจค**
```bash
git clone <repository-url>
cd next-auth
```

2. **ติดตั้ง Dependencies**
```bash
npm install
```

3. **รันโปรเจค**
```bash
npm run dev
```

4. **เปิดเบราว์เซอร์**
```
http://localhost:3000
```

## 🔑 ข้อมูลทดสอบ

### ผู้ดูแลระบบ (Admin)
- **Username**: `admin`
- **Password**: `123`
- **สิทธิ์**: เข้าถึงทุกฟีเจอร์ รวมถึงหน้า Admin และ User Management CRUD

### ผู้ใช้ทั่วไป (User)
- **Username**: `user`
- **Password**: `123`
- **สิทธิ์**: เข้าถึงแดชบอร์ดและฟีเจอร์พื้นฐาน

## 📁 โครงสร้างโปรเจค

```
src/
├── app/
│   ├── admin/          # หน้า Admin (สำหรับผู้ดูแลระบบ)
│   │   ├── components/ # Components สำหรับ User Management
│   │   │   ├── UserForm.tsx        # ฟอร์มเพิ่ม/แก้ไขผู้ใช้
│   │   │   ├── UserTable.tsx       # ตารางแสดงข้อมูลผู้ใช้
│   │   │   └── DeleteConfirmation.tsx # ยืนยันการลบผู้ใช้
│   │   └── page.tsx    # หน้า Admin หลัก
│   ├── api/            # API Routes
│   │   └── auth/       # Authentication APIs
│   ├── dashboard/      # หน้าแดชบอร์ด
│   ├── login/          # หน้าเข้าสู่ระบบ
│   ├── unauthorized/   # หน้าไม่มีสิทธิ์เข้าถึง
│   ├── globals.css     # Global Styles
│   ├── layout.tsx      # Root Layout
│   └── page.tsx        # หน้าแรก
├── lib/
│   └── auth.ts         # Authentication Logic
└── tailwind.config.js  # Tailwind Configuration
```

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: PrimeReact 10 (Sakai Theme)
- **Styling**: Tailwind CSS 4
- **Icons**: PrimeIcons
- **Authentication**: JWT Token
- **Font**: Kanit (Google Fonts)
- **Notifications**: PrimeReact Toast
- **Data Management**: PrimeReact DataTable, Dialog, Dropdown

## 📱 Responsive Design

ระบบรองรับการแสดงผลบนอุปกรณ์ทุกขนาด:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🎯 ฟีเจอร์ที่ปรับปรุง

### UI/UX Improvements
- ✅ ใช้ธีมสี Navy Blue และ White
- ✅ เปลี่ยน Font เป็น Kanit (รองรับภาษาไทย)
- ✅ เพิ่ม Hover effects และ Transitions
- ✅ ปรับปรุง Card designs และ Shadows
- ✅ เพิ่ม Responsive breakpoints
- ✅ ปรับปรุง Color scheme และ Typography

### Responsive Enhancements
- ✅ Mobile-first design approach
- ✅ Flexible grid layouts
- ✅ Responsive typography
- ✅ Touch-friendly buttons
- ✅ Optimized spacing for mobile

### Visual Enhancements
- ✅ Custom scrollbar styling
- ✅ Smooth transitions และ animations
- ✅ Better visual hierarchy
- ✅ Improved icon placement
- ✅ Enhanced color contrast

### Notification System
- ✅ เปลี่ยนจาก Message เป็น Toast notifications
- ✅ Toast ที่สวยงามและ responsive
- ✅ หลายระดับความรุนแรง (success, error, warning, info)
- ✅ Auto-dismiss หลังจาก 3 วินาที
- ✅ Position ที่เหมาะสม (top-right)

### Font Implementation
- ✅ Font Kanit ในทุกส่วนของโปรเจค
- ✅ Optimized font loading
- ✅ Fallback fonts ที่เหมาะสม
- ✅ CSS variables สำหรับ font family
- ✅ Tailwind CSS integration

### User Management CRUD
- ✅ **Create**: เพิ่มผู้ใช้ใหม่พร้อมฟอร์มที่ครบถ้วน
- ✅ **Read**: แสดงข้อมูลผู้ใช้ในตารางที่สวยงาม
- ✅ **Update**: แก้ไขข้อมูลผู้ใช้แบบ inline
- ✅ **Delete**: ลบผู้ใช้พร้อมการยืนยัน
- ✅ **Search & Filter**: ค้นหาและกรองข้อมูลตามบทบาท/สถานะ
- ✅ **Status Management**: เปลี่ยนสถานะผู้ใช้แบบ real-time
- ✅ **Role-based Access**: จำกัดการเข้าถึงตามบทบาท

### Sakai Theme Integration
- ✅ ใช้ PrimeReact Sakai theme
- ✅ ปรับแต่ง Dialog และ DataTable styling
- ✅ Enhanced form components
- ✅ Improved table interactions
- ✅ Better visual feedback

## 🔧 การปรับแต่ง

### เปลี่ยนธีมสี
แก้ไขไฟล์ `src/app/globals.css` ในส่วน CSS Variables:

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
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
  preload: true,
});
```

### เปลี่ยน Theme ของ PrimeReact
แก้ไขไฟล์ `src/app/layout.tsx`:

```typescript
// เปลี่ยนจาก
import "primereact/resources/themes/saga-blue/theme.css";

// เป็น
import "primereact/resources/themes/lara-light-indigo/theme.css";
```

### การปรับแต่ง Toast
แก้ไขไฟล์ `src/app/globals.css`:

```css
.p-toast .p-toast-message {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.p-toast .p-toast-message-success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}
```

### การปรับแต่ง DataTable
แก้ไขไฟล์ `src/app/globals.css`:

```css
.p-datatable .p-datatable-header {
  background: var(--accent);
  border-radius: 12px 12px 0 0;
  padding: 1.5rem;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background: var(--accent);
  transform: scale(1.01);
}
```

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)
- **Bundle Size**: Optimized with Next.js 15
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Font Loading**: Optimized with preload และ display swap
- **Component Lazy Loading**: Components โหลดเมื่อจำเป็น

## 🚀 Deployment

### Vercel (แนะนำ)
```bash
npm run build
vercel --prod
```

### Docker
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

### 2. เพิ่ม Toast Notification
```typescript
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

const toast = useRef<Toast>(null);

const showToast = (severity: 'success' | 'error' | 'warn' | 'info', summary: string, detail: string) => {
  toast.current?.show({
    severity,
    summary,
    detail,
    life: 3000,
  });
};

// ใช้งาน
showToast('success', 'สำเร็จ', 'ดำเนินการเสร็จสิ้น');
```

### 3. เพิ่ม User Management Component
```typescript
// src/app/admin/components/NewUserComponent.tsx
interface NewUserComponentProps {
  title: string;
  children: React.ReactNode;
}

export default function NewUserComponent({ title, children }: NewUserComponentProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}
```

### 4. เพิ่มฟีเจอร์ใหม่ใน User Management
```typescript
// เพิ่มฟีเจอร์ Bulk Actions
const handleBulkDelete = (selectedUsers: User[]) => {
  // ลบผู้ใช้หลายคนพร้อมกัน
};

// เพิ่มฟีเจอร์ Export Data
const handleExportData = (format: 'csv' | 'excel' | 'pdf') => {
  // ส่งออกข้อมูลในรูปแบบต่างๆ
};

// เพิ่มฟีเจอร์ Import Data
const handleImportData = (file: File) => {
  // นำเข้าข้อมูลจากไฟล์
};
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

### 4. User Management Tests
```bash
# ทดสอบการเพิ่มผู้ใช้
npm run test:user-create

# ทดสอบการแก้ไขผู้ใช้
npm run test:user-update

# ทดสอบการลบผู้ใช้
npm run test:user-delete

# ทดสอบการค้นหาและกรอง
npm run test:user-search
```

## 📚 ทรัพยากรเพิ่มเติม

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [PrimeReact Documentation](https://primereact.org/)
- [PrimeReact Sakai Theme](https://primereact.org/sakai-react/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Tools
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PrimeReact Theme Builder](https://primereact.org/theme-builder/)

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
