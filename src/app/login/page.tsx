"use client";

import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const showToast = (severity: 'success' | 'error' | 'warn' | 'info', summary: string, detail: string) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast('success', 'สำเร็จ', 'เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนเส้นทาง...');
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        showToast('error', 'ข้อผิดพลาด', data.message || 'การเข้าสู่ระบบล้มเหลว');
      }
    } catch (error) {
      showToast('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <Toast ref={toast} position="top-right" />
      
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="pi pi-shield text-4xl text-white"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-slate-600">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-0 bg-white">
          <div className="p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                  ชื่อผู้ใช้
                </label>
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="กรอกชื่อผู้ใช้"
                  className="w-full p-3 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  รหัสผ่าน
                </label>
                <Password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  className="w-full"
                  disabled={loading}
                  onKeyPress={handleKeyPress}
                  toggleMask
                  feedback={false}
                  inputClassName="w-full p-3 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                label={loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
                className="w-full p-3 text-lg btn-hover"
                disabled={loading}
                loading={loading}
              />
            </form>

            {/* Test Credentials */}
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-3 text-center">ข้อมูลทดสอบ:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">Admin</p>
                  <p className="text-blue-700"><span className="font-mono">admin</span> / <span className="font-mono">123</span></p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800 mb-1">User</p>
                  <p className="text-blue-700"><span className="font-mono">user</span> / <span className="font-mono">123</span></p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Button
                label="กลับหน้าหลัก"
                icon="pi pi-home"
                severity="secondary"
                outlined
                onClick={() => router.push("/")}
                className="btn-hover"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
