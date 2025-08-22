"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { useRouter } from "next/navigation";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface User {
  username: string;
  role: string;
  name: string;
  email: string;
  status: string;
  lastLogin: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const res = await fetch("/api/auth/verify");
      if (res.ok) {
        const data = await res.json();
        if (data.user.role === "admin") {
          setUser(data.user);
          loadMockUsers();
        } else {
          router.push("/unauthorized");
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadMockUsers = () => {
    // Mock data for demonstration
    const mockUsers: User[] = [
      {
        username: "admin",
        role: "admin",
        name: "Administrator",
        email: "admin@example.com",
        status: "active",
        lastLogin: "2024-01-15 10:30:00"
      },
      {
        username: "user",
        role: "user",
        name: "Regular User",
        email: "user@example.com",
        status: "active",
        lastLogin: "2024-01-14 15:45:00"
      },
      {
        username: "manager",
        role: "user",
        name: "Manager User",
        email: "manager@example.com",
        status: "inactive",
        lastLogin: "2024-01-10 09:20:00"
      }
    ];
    setUsers(mockUsers);
  };

  const getStatusSeverity = (status: string) => {
    return status === "active" ? "success" : "danger";
  };

  const getRoleSeverity = (role: string) => {
    return role === "admin" ? "danger" : "info";
  };

  const actionTemplate = (rowData: User) => {
    return (
      <div className="flex space-x-2">
        <Button
          icon="pi pi-pencil"
          size="small"
          severity="secondary"
          tooltip="แก้ไข"
        />
        <Button
          icon="pi pi-trash"
          size="small"
          severity="danger"
          tooltip="ลบ"
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ProgressSpinner />
          <p className="mt-4 text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar 
                icon="pi pi-shield" 
                size="large" 
                className="bg-red-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  แผงควบคุมผู้ดูแลระบบ
                </h1>
                <p className="text-gray-600">
                  ยินดีต้อนรับ, {user.name} - คุณมีสิทธิ์ในการจัดการระบบ
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                label="กลับไปแดชบอร์ด"
                icon="pi pi-arrow-left"
                severity="secondary"
                onClick={() => router.push("/dashboard")}
              />
              <Button
                label="ออกจากระบบ"
                icon="pi pi-sign-out"
                severity="danger"
                onClick={() => router.push("/dashboard")}
              />
            </div>
          </div>
        </div>

        {message && (
          <Message 
            severity="success" 
            text={message} 
            className="mb-6"
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-users text-3xl text-blue-500 mb-2"></i>
              <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
              <p className="text-gray-600">ผู้ใช้ทั้งหมด</p>
            </div>
          </Card>
          
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-shield text-3xl text-red-500 mb-2"></i>
              <h3 className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.role === "admin").length}
              </h3>
              <p className="text-gray-600">ผู้ดูแลระบบ</p>
            </div>
          </Card>
          
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-user text-3xl text-green-500 mb-2"></i>
              <h3 className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.role === "user").length}
              </h3>
              <p className="text-gray-600">ผู้ใช้ทั่วไป</p>
            </div>
          </Card>
          
          <Card className="shadow-sm">
            <div className="text-center">
              <i className="pi pi-check-circle text-3xl text-green-500 mb-2"></i>
              <h3 className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.status === "active").length}
              </h3>
              <p className="text-gray-600">ผู้ใช้ที่ใช้งาน</p>
            </div>
          </Card>
        </div>

        {/* Users Management */}
        <Card className="shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">จัดการผู้ใช้</h3>
            <Button
              label="เพิ่มผู้ใช้ใหม่"
              icon="pi pi-plus"
              severity="success"
            />
          </div>
          
          <DataTable 
            value={users} 
            paginator 
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            className="p-datatable-sm"
            emptyMessage="ไม่พบข้อมูลผู้ใช้"
          >
            <Column field="username" header="ชื่อผู้ใช้" sortable />
            <Column field="name" header="ชื่อ" sortable />
            <Column field="email" header="อีเมล" sortable />
            <Column 
              field="role" 
              header="บทบาท" 
              sortable
              body={(rowData) => (
                <Tag 
                  value={rowData.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้ทั่วไป"}
                  severity={getRoleSeverity(rowData.role)}
                />
              )}
            />
            <Column 
              field="status" 
              header="สถานะ" 
              sortable
              body={(rowData) => (
                <Tag 
                  value={rowData.status === "active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                  severity={getStatusSeverity(rowData.status)}
                />
              )}
            />
            <Column field="lastLogin" header="เข้าสู่ระบบล่าสุด" sortable />
            <Column header="การดำเนินการ" body={actionTemplate} />
          </DataTable>
        </Card>

        {/* System Info */}
        <div className="mt-6">
          <Card className="shadow-sm">
            <h3 className="text-lg font-semibold mb-4">ข้อมูลระบบ</h3>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">การตั้งค่าระบบ</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• เวอร์ชัน: 1.0.0</li>
                  <li>• สถานะ: ใช้งานปกติ</li>
                  <li>• อัปเดตล่าสุด: 2024-01-15</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">การบำรุงรักษา</h4>
                <p className="text-sm text-gray-600">
                  ระบบจะมีการบำรุงรักษาเป็นประจำทุกสัปดาห์
                  กรุณาตรวจสอบประกาศล่วงหน้าก่อนการบำรุงรักษา
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
  