# สร้าง project Next.js (เลือก App Router)
- npx create-next-app@latest next-auth
- cd next-auth

# ติดตั้ง jwt decoder (ใช้เช็ค role)
- npm install jose

next-auth/
 ├── app/
 │   ├── admin/
 │   │   └── page.tsx
 │   ├── dashboard/
 │   │   └── page.tsx
 │   ├── login/
 │   │   └── page.tsx
 │   ├── unauthorized/
 │   │   └── page.tsx
 │   └── layout.tsx
 ├── lib/
 │   └── auth.ts
 ├── middleware.ts
 ├── package.json
 └── tsconfig.json

# การทดสอบ
- รัน npm run dev
- เปิด /login
- ล็อกอินด้วย admin / 123 → เข้า /admin ได้
- ล็อกอินด้วย user / 123 → เข้า /admin ไม่ได้ → redirect /unauthorized
