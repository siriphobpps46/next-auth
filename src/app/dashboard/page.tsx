"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
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
        showToast('success', 'สำเร็จ', 'ออกจากระบบสำเร็จ');
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      showToast('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการออกจากระบบ');
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="pi pi-spin pi-spinner text-4xl text-white"></i>
          </div>
          <p className="text-slate-600 text-lg">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <Toast ref={toast} position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar 
                icon="pi pi-user" 
                size="xlarge" 
                className="bg-blue-600 shadow-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  ยินดีต้อนรับ, {user.name}!
                </h1>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === "admin" 
                      ? "bg-red-100 text-red-800 border border-red-200" 
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    {user.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้ทั่วไป"}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600">@{user.username}</span>
                </div>
              </div>
            </div>
            <Button
              label="ออกจากระบบ"
              icon="pi pi-sign-out"
              severity="secondary"
              outlined
              onClick={handleLogout}
              loading={logoutLoading}
              className="btn-hover w-full lg:w-auto"
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Welcome Card */}
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-home text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-800">หน้าแรก</h3>
              <p className="text-slate-600 leading-relaxed">
                นี่คือแดชบอร์ดหลักของคุณ คุณสามารถเข้าถึงฟีเจอร์ต่างๆ ได้จากที่นี่
              </p>
            </div>
          </Card>

          {/* User Info Card */}
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-user text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-800">ข้อมูลผู้ใช้</h3>
              <div className="text-left space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">ชื่อผู้ใช้:</span>
                  <span className="font-medium text-slate-800">{user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">บทบาท:</span>
                  <span className="font-medium text-slate-800">{user.role}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">ชื่อ:</span>
                  <span className="font-medium text-slate-800">{user.name}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions Card */}
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-cog text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-800">การดำเนินการ</h3>
              <div className="space-y-3">
                <Button
                  label="ไปยังหน้า Admin"
                  icon="pi pi-shield"
                  className="w-full btn-hover"
                  severity="info"
                  onClick={() => router.push("/admin")}
                  disabled={user.role !== "admin"}
                />
                <Button
                  label="แก้ไขโปรไฟล์"
                  icon="pi pi-pencil"
                  className="w-full btn-hover"
                  severity="secondary"
                  outlined
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mb-8">
          <Card className="shadow-lg border-0 bg-white">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-800">ข้อมูลเพิ่มเติม</h3>
              <Divider />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-4 text-lg">สิทธิ์การเข้าถึง</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">เข้าถึงแดชบอร์ด</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">ดูข้อมูลส่วนตัว</span>
                    </li>
                    {user.role === "admin" && (
                      <>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-slate-600">เข้าถึงหน้า Admin</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-slate-600">จัดการผู้ใช้</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-4 text-lg">การใช้งาน</h4>
                  <p className="text-slate-600 leading-relaxed">
                    คุณสามารถใช้ฟีเจอร์ต่างๆ ในระบบได้ตามสิทธิ์ที่ได้รับ
                    หากมีคำถามหรือต้องการความช่วยเหลือ กรุณาติดต่อผู้ดูแลระบบ
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <i className="pi pi-info-circle mr-2"></i>
                      ระบบจะบันทึกการเข้าสู่ระบบและกิจกรรมต่างๆ อัตโนมัติ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <Card className="shadow-lg border-0 bg-white">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">การดำเนินการด่วน</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  label="กลับหน้าหลัก"
                  icon="pi pi-home"
                  severity="secondary"
                  outlined
                  onClick={() => router.push("/")}
                  className="btn-hover"
                />
                <Button
                  label="รีเฟรชหน้า"
                  icon="pi pi-refresh"
                  severity="info"
                  outlined
                  onClick={() => window.location.reload()}
                  className="btn-hover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
  