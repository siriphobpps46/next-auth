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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <i className="pi pi-shield text-3xl text-white"></i>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">ระบบจัดการผู้ใช้</h1>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Button
                label="เข้าสู่ระบบ"
                icon="pi pi-sign-in"
                severity="info"
                onClick={() => router.push("/login")}
                className="w-full sm:w-auto btn-hover"
              />
              <Button
                label="แดชบอร์ด"
                icon="pi pi-home"
                severity="secondary"
                outlined
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto btn-hover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 md:mb-20">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              ยินดีต้อนรับสู่
              <span className="text-blue-600 block md:inline"> ระบบจัดการผู้ใช้</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              ระบบที่ออกแบบมาเพื่อการจัดการผู้ใช้ที่มีประสิทธิภาพ 
              พร้อมระบบความปลอดภัยและการจัดการสิทธิ์ที่ครบครัน
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="เริ่มต้นใช้งาน"
              icon="pi pi-rocket"
              size="large"
              severity="info"
              onClick={() => router.push("/login")}
              className="text-lg px-8 py-3 btn-hover"
            />
            <Button
              label="เรียนรู้เพิ่มเติม"
              icon="pi pi-info-circle"
              size="large"
              severity="secondary"
              outlined
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="text-lg px-8 py-3 btn-hover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover border-0 bg-white">
            <div className="p-6 md:p-8">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="pi pi-shield text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-slate-800">ระบบความปลอดภัย</h3>
              <p className="text-slate-600 leading-relaxed">
                ระบบการยืนยันตัวตนที่ปลอดภัยด้วย JWT Token 
                และการจัดการสิทธิ์ที่ละเอียด
              </p>
            </div>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover border-0 bg-white">
            <div className="p-6 md:p-8">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="pi pi-users text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-slate-800">จัดการผู้ใช้</h3>
              <p className="text-slate-600 leading-relaxed">
                จัดการข้อมูลผู้ใช้ การกำหนดบทบาท และการติดตามการใช้งาน
                ในระบบอย่างครบครัน
              </p>
            </div>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover border-0 bg-white md:col-span-2 lg:col-span-1">
            <div className="p-6 md:p-8">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="pi pi-chart-line text-4xl text-purple-600"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-slate-800">แดชบอร์ด</h3>
              <p className="text-slate-600 leading-relaxed">
                แดชบอร์ดที่แสดงข้อมูลสำคัญและสถิติการใช้งาน
                ในรูปแบบที่เข้าใจง่าย
              </p>
            </div>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="shadow-xl border-0 bg-white mb-16 md:mb-20">
          <div className="p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-800">วิธีการใช้งาน</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">เข้าสู่ระบบ</h4>
                <p className="text-slate-600 leading-relaxed">
                  ใช้ข้อมูลทดสอบเพื่อเข้าสู่ระบบ
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-green-600">2</span>
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">เข้าถึงแดชบอร์ด</h4>
                <p className="text-slate-600 leading-relaxed">
                  ดูข้อมูลและจัดการระบบผ่านแดชบอร์ด
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">จัดการผู้ใช้</h4>
                <p className="text-slate-600 leading-relaxed">
                  จัดการผู้ใช้และสิทธิ์การเข้าถึง (สำหรับ Admin)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Test Credentials */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-800">ข้อมูลทดสอบ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 text-lg">ผู้ดูแลระบบ</h4>
                  <div className="space-y-2 text-left">
                    <p className="flex justify-between"><strong>Username:</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">admin</span></p>
                    <p className="flex justify-between"><strong>Password:</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">123</span></p>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 text-lg">ผู้ใช้ทั่วไป</h4>
                  <div className="space-y-2 text-left">
                    <p className="flex justify-between"><strong>Username:</strong> <span className="font-mono bg-green-100 px-2 py-1 rounded">user</span></p>
                    <p className="flex justify-between"><strong>Password:</strong> <span className="font-mono bg-green-100 px-2 py-1 rounded">123</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className="pi pi-shield text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">ระบบจัดการผู้ใช้</h3>
            <p className="text-slate-300">ระบบที่ออกแบบมาเพื่อการจัดการผู้ใช้ที่มีประสิทธิภาพ</p>
          </div>
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400">
              © 2024 ระบบจัดการผู้ใช้. สร้างด้วย Next.js และ PrimeReact
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
