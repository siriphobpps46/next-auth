"use client";

import { useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function UnauthorizedPage() {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const showToast = (severity: 'success' | 'error' | 'warn' | 'info', summary: string, detail: string) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const handleNavigation = (path: string, message: string) => {
    showToast('info', 'ข้อมูล', message);
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-pink-100 p-4">
      <Toast ref={toast} position="top-right" />
      
      <div className="w-full max-w-md">
        {/* Error Icon and Header */}
        <div className="text-center mb-8">
          <div className="bg-red-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-red-200">
            <i className="pi pi-exclamation-triangle text-5xl text-red-600"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">ไม่มีสิทธิ์เข้าถึง</h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            ขออภัย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้
            กรุณาติดต่อผู้ดูแลระบบหากคุณคิดว่านี่เป็นข้อผิดพลาด
          </p>
        </div>

        {/* Action Buttons */}
        <Card className="shadow-2xl border-0 bg-white">
          <div className="p-6 md:p-8">
            <div className="space-y-4">
              <Button
                label="กลับไปหน้าแรก"
                icon="pi pi-home"
                className="w-full p-3 text-lg btn-hover"
                severity="info"
                onClick={() => handleNavigation("/", "กำลังนำทางไปยังหน้าแรก...")}
              />
              
              <Button
                label="กลับไปแดชบอร์ด"
                icon="pi pi-arrow-left"
                className="w-full p-3 text-lg btn-hover"
                severity="secondary"
                outlined
                onClick={() => handleNavigation("/dashboard", "กำลังนำทางไปยังแดชบอร์ด...")}
              />
              
              <Button
                label="เข้าสู่ระบบใหม่"
                icon="pi pi-sign-in"
                className="w-full p-3 text-lg btn-hover"
                severity="info"
                outlined
                onClick={() => handleNavigation("/login", "กำลังนำทางไปยังหน้าเข้าสู่ระบบ...")}
              />
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-3">
                  หากต้องการความช่วยเหลือ กรุณาติดต่อ:
                </p>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-blue-800 font-medium">
                    <i className="pi pi-envelope mr-2"></i>
                    support@example.com
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    หรือโทร: 02-123-4567
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800">
                <i className="pi pi-info-circle mr-2"></i>
                <strong>คำแนะนำ:</strong> หากคุณเชื่อว่าควรมีสิทธิ์เข้าถึงหน้านี้ 
                กรุณาติดต่อผู้ดูแลระบบเพื่อตรวจสอบสิทธิ์ของคุณ
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
  