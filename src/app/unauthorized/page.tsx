"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouter } from "next/navigation";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <Card className="w-full max-w-md shadow-2xl text-center">
        <div className="mb-6">
          <i className="pi pi-exclamation-triangle text-8xl text-red-500 mb-4"></i>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ไม่มีสิทธิ์เข้าถึง
          </h1>
          <p className="text-gray-600 mb-6">
            ขออภัย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้
            กรุณาติดต่อผู้ดูแลระบบหากคุณคิดว่านี่เป็นข้อผิดพลาด
          </p>
        </div>

        <div className="space-y-3">
          <Button
            label="กลับไปหน้าแรก"
            icon="pi pi-home"
            className="w-full"
            severity="info"
            onClick={() => router.push("/")}
          />
          
          <Button
            label="กลับไปแดชบอร์ด"
            icon="pi pi-arrow-left"
            className="w-full"
            severity="secondary"
            onClick={() => router.push("/dashboard")}
          />
          
          <Button
            label="เข้าสู่ระบบใหม่"
            icon="pi pi-sign-in"
            className="w-full"
            severity="info"
            onClick={() => router.push("/login")}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            หากต้องการความช่วยเหลือ กรุณาติดต่อ:
          </p>
          <p className="text-sm text-blue-600 font-medium">
            support@example.com
          </p>
        </div>
      </Card>
    </div>
  );
}
  