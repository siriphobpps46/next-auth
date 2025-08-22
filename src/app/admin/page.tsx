"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/navigation";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import DeleteConfirmation from "./components/DeleteConfirmation";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
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
          showToast('success', 'ยินดีต้อนรับ', `ยินดีต้อนรับ, ${data.user.name}! คุณมีสิทธิ์ในการจัดการระบบ`);
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
        id: "1",
        username: "admin",
        name: "Administrator",
        email: "admin@example.com",
        role: "admin",
        status: "active",
        lastLogin: "2024-01-15 10:30:00",
        createdAt: "2024-01-01 00:00:00"
      },
      {
        id: "2",
        username: "user",
        name: "Regular User",
        email: "user@example.com",
        role: "user",
        status: "active",
        lastLogin: "2024-01-14 15:45:00",
        createdAt: "2024-01-02 00:00:00"
      },
      {
        id: "3",
        username: "manager",
        name: "Manager User",
        email: "manager@example.com",
        role: "manager",
        status: "active",
        lastLogin: "2024-01-13 09:20:00",
        createdAt: "2024-01-03 00:00:00"
      },
      {
        id: "4",
        username: "testuser",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        status: "inactive",
        lastLogin: "2024-01-10 14:30:00",
        createdAt: "2024-01-04 00:00:00"
      },
      {
        id: "5",
        username: "support",
        name: "Support Staff",
        email: "support@example.com",
        role: "user",
        status: "suspended",
        lastLogin: "2024-01-08 11:15:00",
        createdAt: "2024-01-05 00:00:00"
      }
    ];
    setUsers(mockUsers);
  };

  const handleCreateUser = () => {
    setFormMode('create');
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: User) => {
    setFormMode('edit');
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    // จำลองการลบ
    setTimeout(() => {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setDeletingUserId(null);
      showToast('success', 'สำเร็จ', 'ลบผู้ใช้สำเร็จ');
    }, 1000);
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
    showToast('success', 'สำเร็จ', 'อัปเดตสถานะผู้ใช้สำเร็จ');
  };

  const handleSaveUser = (userData: User) => {
    if (formMode === 'create') {
      // เพิ่มผู้ใช้ใหม่
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleString('th-TH'),
        lastLogin: '-'
      };
      setUsers(prev => [newUser, ...prev]);
      showToast('success', 'สำเร็จ', 'เพิ่มผู้ใช้ใหม่สำเร็จ');
    } else {
      // อัปเดตผู้ใช้
      setUsers(prev => prev.map(u => 
        u.id === editingUser?.id ? { ...u, ...userData } : u
      ));
      showToast('success', 'สำเร็จ', 'อัปเดตผู้ใช้สำเร็จ');
    }
    setShowUserForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ProgressSpinner style={{ width: '2rem', height: '2rem' }} />
          </div>
          <p className="text-slate-600 text-lg">กำลังตรวจสอบสิทธิ์...</p>
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
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar 
                icon="pi pi-shield" 
                size="xlarge" 
                className="bg-red-600 shadow-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  แผงควบคุมผู้ดูแลระบบ
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded-full text-sm font-medium">
                    ผู้ดูแลระบบ
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600">ยินดีต้อนรับ, {user.name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
              <Button
                label="กลับไปแดชบอร์ด"
                icon="pi pi-arrow-left"
                severity="secondary"
                outlined
                onClick={() => router.push("/dashboard")}
                className="btn-hover w-full sm:w-auto"
              />
              <Button
                label="ออกจากระบบ"
                icon="pi pi-sign-out"
                severity="danger"
                outlined
                onClick={() => router.push("/dashboard")}
                className="btn-hover w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-users text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{users.length}</h3>
              <p className="text-slate-600">ผู้ใช้ทั้งหมด</p>
            </div>
          </Card>
          
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-shield text-2xl text-red-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {users.filter(u => u.role === "admin").length}
              </h3>
              <p className="text-slate-600">ผู้ดูแลระบบ</p>
            </div>
          </Card>
          
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-user text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {users.filter(u => u.role === "user").length}
              </h3>
              <p className="text-slate-600">ผู้ใช้ทั่วไป</p>
            </div>
          </Card>
          
          <Card className="shadow-lg border-0 bg-white card-hover">
            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="pi pi-check-circle text-2xl text-emerald-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {users.filter(u => u.status === "active").length}
              </h3>
              <p className="text-slate-600">ผู้ใช้ที่ใช้งาน</p>
            </div>
          </Card>
        </div>

        {/* User Management */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">จัดการผู้ใช้</h3>
              <Button
                label="เพิ่มผู้ใช้ใหม่"
                icon="pi pi-plus"
                severity="success"
                className="btn-hover w-full sm:w-auto"
                onClick={handleCreateUser}
              />
            </div>
            
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onStatusChange={handleStatusChange}
            />
          </div>
        </Card>

        {/* System Info */}
        <div className="mb-8">
          <Card className="shadow-lg border-0 bg-white">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-800">ข้อมูลระบบ</h3>
              <Divider />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-4 text-lg">การตั้งค่าระบบ</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">เวอร์ชัน:</span>
                      <span className="font-medium text-slate-800">2.0.0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">สถานะ:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">ใช้งานปกติ</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">อัปเดตล่าสุด:</span>
                      <span className="font-medium text-slate-800">2024-01-15</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-4 text-lg">ฟีเจอร์ใหม่</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center space-x-2">
                      <i className="pi pi-check-circle text-green-500"></i>
                      <span>ระบบจัดการผู้ใช้แบบ CRUD</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="pi pi-check-circle text-green-500"></i>
                      <span>การค้นหาและกรองข้อมูล</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="pi pi-check-circle text-green-500"></i>
                      <span>การจัดการสถานะผู้ใช้</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="pi pi-check-circle text-green-500"></i>
                      <span>การยืนยันการลบข้อมูล</span>
                    </li>
                  </ul>
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
                  label="ส่งรายงาน"
                  icon="pi pi-file-pdf"
                  severity="info"
                  outlined
                  className="btn-hover"
                  onClick={() => showToast('info', 'ข้อมูล', 'กำลังสร้างรายงาน...')}
                />
                <Button
                  label="สำรองข้อมูล"
                  icon="pi pi-download"
                  severity="success"
                  outlined
                  className="btn-hover"
                  onClick={() => showToast('success', 'สำเร็จ', 'เริ่มต้นการสำรองข้อมูล...')}
                />
                <Button
                  label="รีเฟรชข้อมูล"
                  icon="pi pi-refresh"
                  severity="secondary"
                  outlined
                  onClick={() => {
                    loadMockUsers();
                    showToast('info', 'ข้อมูล', 'กำลังรีเฟรชข้อมูล...');
                  }}
                  className="btn-hover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* User Form Dialog */}
      <UserForm
        visible={showUserForm}
        onHide={() => setShowUserForm(false)}
        user={editingUser}
        onSave={handleSaveUser}
        mode={formMode}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation onConfirm={() => {
        if (deletingUserId) {
          handleDeleteUser(deletingUserId);
        }
      }} />
    </div>
  );
}
  