"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { useRouter } from "next/navigation";
import { Message } from "primereact/message";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface User {
  username: string;
  role: string;
  name: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth/verify");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setMessage("ออกจากระบบสำเร็จ");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการออกจากระบบ");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar 
                icon="pi pi-user" 
                size="large" 
                className="bg-blue-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  ยินดีต้อนรับ, {user.name}!
                </h1>
                <p className="text-gray-600">
                  บทบาท: {user.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้ทั่วไป"}
                </p>
              </div>
            </div>
            <Button
              label="ออกจากระบบ"
              icon="pi pi-sign-out"
              severity="secondary"
              onClick={handleLogout}
              loading={logoutLoading}
            />
          </div>
        </div>

        {message && (
          <Message 
            severity="success" 
            text={message} 
            className="mb-6"
          />
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-home text-4xl text-blue-500 mb-4"></i>
              <h3 className="text-lg font-semibold mb-2">หน้าแรก</h3>
              <p className="text-gray-600">
                นี่คือแดชบอร์ดหลักของคุณ คุณสามารถเข้าถึงฟีเจอร์ต่างๆ ได้จากที่นี่
              </p>
            </div>
          </Card>

          {/* User Info Card */}
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-user text-4xl text-green-500 mb-4"></i>
              <h3 className="text-lg font-semibold mb-2">ข้อมูลผู้ใช้</h3>
              <div className="text-left space-y-2">
                <p><strong>ชื่อผู้ใช้:</strong> {user.username}</p>
                <p><strong>บทบาท:</strong> {user.role}</p>
                <p><strong>ชื่อ:</strong> {user.name}</p>
              </div>
            </div>
          </Card>

          {/* Actions Card */}
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-cog text-4xl text-purple-500 mb-4"></i>
              <h3 className="text-lg font-semibold mb-2">การดำเนินการ</h3>
              <div className="space-y-2">
                <Button
                  label="ไปยังหน้า Admin"
                  icon="pi pi-shield"
                  className="w-full"
                  severity="info"
                  onClick={() => router.push("/admin")}
                  disabled={user.role !== "admin"}
                />
                <Button
                  label="แก้ไขโปรไฟล์"
                  icon="pi pi-pencil"
                  className="w-full"
                  severity="secondary"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          <Card className="shadow-sm">
            <h3 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h3>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">สิทธิ์การเข้าถึง</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• เข้าถึงแดชบอร์ด</li>
                  <li>• ดูข้อมูลส่วนตัว</li>
                  {user.role === "admin" && (
                    <>
                      <li>• เข้าถึงหน้า Admin</li>
                      <li>• จัดการผู้ใช้</li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">การใช้งาน</h4>
                <p className="text-sm text-gray-600">
                  คุณสามารถใช้ฟีเจอร์ต่างๆ ในระบบได้ตามสิทธิ์ที่ได้รับ
                  หากมีคำถามหรือต้องการความช่วยเหลือ กรุณาติดต่อผู้ดูแลระบบ
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
  