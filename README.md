# ระบบจัดการผู้ใช้ (User Management System)

ระบบจัดการผู้ใช้ที่สร้างด้วย Next.js 15 และ PrimeReact พร้อมระบบความปลอดภัยและการจัดการสิทธิ์ที่ครบครัน

## ✨ คุณสมบัติหลัก

- 🔐 **ระบบการยืนยันตัวตน** - JWT Token-based authentication
- 👥 **จัดการผู้ใช้** - เพิ่ม แก้ไข ลบ และจัดการสิทธิ์ผู้ใช้
- 🛡️ **ระบบสิทธิ์** - แยกบทบาทระหว่าง Admin และ User
- 📊 **แดชบอร์ด** - แสดงข้อมูลและสถิติการใช้งาน
- 🎨 **UI สวยงาม** - ใช้ PrimeReact components
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ

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
- **Username:** `admin`
- **Password:** `123`
- **สิทธิ์:** เข้าถึงทุกฟีเจอร์ รวมถึงหน้า Admin

### ผู้ใช้ทั่วไป (User)
- **Username:** `user`
- **Password:** `123`
- **สิทธิ์:** เข้าถึงแดชบอร์ดและฟีเจอร์พื้นฐาน

## 📁 โครงสร้างโปรเจค

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts      # API เข้าสู่ระบบ
│   │       ├── logout/route.ts     # API ออกจากระบบ
│   │       └── verify/route.ts     # API ตรวจสอบ Token
│   ├── admin/
│   │   └── page.tsx               # หน้า Admin (Admin Only)
│   ├── dashboard/
│   │   └── page.tsx               # หน้าแดชบอร์ด
│   ├── login/
│   │   └── page.tsx               # หน้าเข้าสู่ระบบ
│   ├── unauthorized/
│   │   └── page.tsx               # หน้าไม่มีสิทธิ์เข้าถึง
│   ├── layout.tsx                 # Layout หลัก
│   └── page.tsx                   # หน้าแรก
└── lib/
    └── auth.ts                    # ฟังก์ชัน JWT
```

## 🔧 เทคโนโลยีที่ใช้

- **Frontend:** Next.js 15, React 19, TypeScript
- **UI Components:** PrimeReact, PrimeIcons
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
- **Backend:** Next.js API Routes

## 📱 หน้าต่างๆ ในระบบ

### 1. หน้าแรก (/)
- แสดงข้อมูลทั่วไปของระบบ
- ปุ่มนำทางไปยังหน้าเข้าสู่ระบบและแดชบอร์ด
- แสดงข้อมูลทดสอบสำหรับการเข้าสู่ระบบ

### 2. หน้าเข้าสู่ระบบ (/login)
- ฟอร์มเข้าสู่ระบบที่สวยงาม
- การตรวจสอบข้อมูลที่กรอก
- แสดงข้อความแจ้งเตือนและสถานะการโหลด

### 3. แดชบอร์ด (/dashboard)
- แสดงข้อมูลผู้ใช้ที่เข้าสู่ระบบ
- แสดงสิทธิ์และบทบาท
- ปุ่มนำทางไปยังหน้า Admin (สำหรับ Admin เท่านั้น)
- ปุ่มออกจากระบบ

### 4. หน้า Admin (/admin)
- **เฉพาะ Admin เท่านั้น**
- แสดงสถิติผู้ใช้ในระบบ
- ตารางจัดการผู้ใช้พร้อมฟีเจอร์เพิ่ม แก้ไข ลบ
- ข้อมูลระบบและการบำรุงรักษา

### 5. หน้าไม่มีสิทธิ์ (/unauthorized)
- แสดงเมื่อผู้ใช้ไม่มีสิทธิ์เข้าถึงหน้าใดหน้าหนึ่ง
- ปุ่มนำทางกลับไปยังหน้าต่างๆ

## 🔐 ระบบความปลอดภัย

- **JWT Token:** ใช้สำหรับการยืนยันตัวตน
- **HTTP-Only Cookies:** เก็บ Token อย่างปลอดภัย
- **Role-based Access Control:** แยกสิทธิ์ตามบทบาท
- **Secure Routes:** ตรวจสอบสิทธิ์ก่อนเข้าถึงหน้า Admin

## 🎨 การปรับแต่ง UI

ระบบใช้ PrimeReact components ที่สามารถปรับแต่งได้ง่าย:

- **Themes:** เปลี่ยนธีมได้จาก `lara-light-blue` เป็นธีมอื่นๆ
- **Components:** ใช้ PrimeReact components เช่น Card, Button, DataTable
- **Icons:** ใช้ PrimeIcons สำหรับไอคอนต่างๆ
- **Responsive:** รองรับทุกขนาดหน้าจอด้วย Tailwind CSS

## 🚀 การ Deploy

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

### เพิ่มฟีเจอร์ใหม่
1. สร้าง API route ใหม่ใน `src/app/api/`
2. สร้างหน้าใหม่ใน `src/app/`
3. เพิ่มการตรวจสอบสิทธิ์ตามความเหมาะสม

### เพิ่ม Component ใหม่
1. สร้าง component ใน `src/components/`
2. ใช้ PrimeReact components เป็นพื้นฐาน
3. ปรับแต่งด้วย Tailwind CSS

## 🤝 การสนับสนุน

หากมีคำถามหรือต้องการความช่วยเหลือ:

- 📧 Email: support@example.com
- 📖 Documentation: [Link to docs]
- 🐛 Issues: [GitHub Issues]

## 📄 License

MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

---

**สร้างด้วย ❤️ โดย Next.js และ PrimeReact**
