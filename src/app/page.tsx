"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouter } from "next/navigation";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <i className="pi pi-shield text-3xl text-blue-600"></i>
              <h1 className="text-2xl font-bold text-gray-900">ระบบจัดการผู้ใช้</h1>
            </div>
            <div className="flex space-x-3">
              <Button
                label="เข้าสู่ระบบ"
                icon="pi pi-sign-in"
                severity="info"
                onClick={() => router.push("/login")}
              />
              <Button
                label="แดชบอร์ด"
                icon="pi pi-home"
                severity="secondary"
                onClick={() => router.push("/dashboard")}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ยินดีต้อนรับสู่
            <span className="text-blue-600"> ระบบจัดการผู้ใช้</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            ระบบที่ออกแบบมาเพื่อการจัดการผู้ใช้ที่มีประสิทธิภาพ 
            พร้อมระบบความปลอดภัยและการจัดการสิทธิ์ที่ครบครัน
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="เริ่มต้นใช้งาน"
              icon="pi pi-rocket"
              size="large"
              severity="info"
              onClick={() => router.push("/login")}
              className="text-lg px-8 py-3"
            />
            <Button
              label="เรียนรู้เพิ่มเติม"
              icon="pi pi-info-circle"
              size="large"
              severity="secondary"
              outlined
              className="text-lg px-8 py-3"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <i className="pi pi-shield text-5xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-3">ระบบความปลอดภัย</h3>
              <p className="text-gray-600">
                ระบบการยืนยันตัวตนที่ปลอดภัยด้วย JWT Token 
                และการจัดการสิทธิ์ที่ละเอียด
              </p>
            </div>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <i className="pi pi-users text-5xl text-green-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-3">จัดการผู้ใช้</h3>
              <p className="text-gray-600">
                จัดการข้อมูลผู้ใช้ การกำหนดบทบาท และการติดตามการใช้งาน
                ในระบบอย่างครบครัน
              </p>
            </div>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <i className="pi pi-chart-line text-5xl text-purple-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-3">แดชบอร์ด</h3>
              <p className="text-gray-600">
                แดชบอร์ดที่แสดงข้อมูลสำคัญและสถิติการใช้งาน
                ในรูปแบบที่เข้าใจง่าย
              </p>
            </div>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="shadow-lg">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">วิธีการใช้งาน</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">เข้าสู่ระบบ</h4>
                <p className="text-gray-600">
                  ใช้ข้อมูลทดสอบเพื่อเข้าสู่ระบบ
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">เข้าถึงแดชบอร์ด</h4>
                <p className="text-gray-600">
                  ดูข้อมูลและจัดการระบบผ่านแดชบอร์ด
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">จัดการผู้ใช้</h4>
                <p className="text-gray-600">
                  จัดการผู้ใช้และสิทธิ์การเข้าถึง (สำหรับ Admin)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Test Credentials */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">ข้อมูลทดสอบ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">ผู้ดูแลระบบ</h4>
                  <p><strong>Username:</strong> admin</p>
                  <p><strong>Password:</strong> 123</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">ผู้ใช้ทั่วไป</h4>
                  <p><strong>Username:</strong> user</p>
                  <p><strong>Password:</strong> 123</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 ระบบจัดการผู้ใช้. สร้างด้วย Next.js และ PrimeReact
          </p>
        </div>
      </footer>
    </div>
  );
}
