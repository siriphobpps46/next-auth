"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/navigation";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนเส้นทาง...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError(data.message || "การเข้าสู่ระบบล้มเหลว");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <i className="pi pi-user-circle text-6xl text-blue-500 mb-4"></i>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-gray-600">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <Message 
              severity="error" 
              text={error} 
              className="w-full"
            />
          )}
          
          {success && (
            <Message 
              severity="success" 
              text={success} 
              className="w-full"
            />
          )}

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              ชื่อผู้ใช้
            </label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="กรอกชื่อผู้ใช้"
              className="w-full"
              disabled={loading}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
            />
          </div>

          <Button
            type="submit"
            label={loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            icon={loading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
            className="w-full"
            disabled={loading}
            loading={loading}
          />
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">ข้อมูลทดสอบ:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Admin:</strong> username: admin, password: 123</p>
            <p><strong>User:</strong> username: user, password: 123</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
