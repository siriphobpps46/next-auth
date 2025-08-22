"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/navigation";
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
          className="btn-hover"
          onClick={() => showToast('info', 'ข้อมูล', `กำลังแก้ไขผู้ใช้: ${rowData.name}`)}
        />
        <Button
          icon="pi pi-trash"
          size="small"
          severity="danger"
          tooltip="ลบ"
          className="btn-hover"
          onClick={() => showToast('warn', 'คำเตือน', `คุณต้องการลบผู้ใช้: ${rowData.name}?`)}
        />
      </div>
    );
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

        {/* Users Management */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">จัดการผู้ใช้</h3>
              <Button
                label="เพิ่มผู้ใช้ใหม่"
                icon="pi pi-plus"
                severity="success"
                className="btn-hover w-full sm:w-auto"
                onClick={() => showToast('info', 'ข้อมูล', 'กำลังเพิ่มผู้ใช้ใหม่...')}
              />
            </div>
            
            <div className="overflow-x-auto">
              <DataTable 
                value={users} 
                paginator 
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                className="p-datatable-sm"
                emptyMessage="ไม่พบข้อมูลผู้ใช้"
                stripedRows
                showGridlines={false}
                responsiveLayout="scroll"
              >
                <Column field="username" header="ชื่อผู้ใช้" sortable className="min-w-[120px]" />
                <Column field="name" header="ชื่อ" sortable className="min-w-[150px]" />
                <Column field="email" header="อีเมล" sortable className="min-w-[200px]" />
                <Column 
                  field="role" 
                  header="บทบาท" 
                  sortable
                  className="min-w-[120px]"
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
                  className="min-w-[100px]"
                  body={(rowData) => (
                    <Tag 
                      value={rowData.status === "active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                      severity={getStatusSeverity(rowData.status)}
                    />
                  )}
                />
                <Column field="lastLogin" header="เข้าสู่ระบบล่าสุด" sortable className="min-w-[180px]" />
                <Column header="การดำเนินการ" body={actionTemplate} className="min-w-[120px]" />
              </DataTable>
            </div>
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
                      <span className="font-medium text-slate-800">1.0.0</span>
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
                  <h4 className="font-semibold text-slate-700 mb-4 text-lg">การบำรุงรักษา</h4>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    ระบบจะมีการบำรุงรักษาเป็นประจำทุกสัปดาห์
                    กรุณาตรวจสอบประกาศล่วงหน้าก่อนการบำรุงรักษา
                  </p>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <i className="pi pi-exclamation-triangle mr-2"></i>
                      การบำรุงรักษาถัดไป: วันอาทิตย์ที่ 21 มกราคม 2024 เวลา 02:00-04:00 น.
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
                    window.location.reload();
                    showToast('info', 'ข้อมูล', 'กำลังรีเฟรชข้อมูล...');
                  }}
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
  