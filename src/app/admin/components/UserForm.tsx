"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface User {
  id?: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserFormProps {
  visible: boolean;
  onHide: () => void;
  user?: User | null;
  onSave: (user: User) => void;
  mode: 'create' | 'edit';
}

const roleOptions = [
  { label: 'ผู้ดูแลระบบ', value: 'admin' },
  { label: 'ผู้ใช้ทั่วไป', value: 'user' },
  { label: 'ผู้จัดการ', value: 'manager' }
];

const statusOptions = [
  { label: 'ใช้งาน', value: 'active' },
  { label: 'ไม่ใช้งาน', value: 'inactive' },
  { label: 'ระงับการใช้งาน', value: 'suspended' }
];

export default function UserForm({ visible, onHide, user, onSave, mode }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        ...user,
        password: '' // ไม่แสดงรหัสผ่านเดิม
      });
    } else {
      setFormData({
        username: '',
        password: '',
        name: '',
        email: '',
        role: 'user',
        status: 'active'
      });
    }
  }, [user, mode]);

  const showToast = (severity: 'success' | 'error' | 'warn' | 'info', summary: string, detail: string) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้');
      return false;
    }
    if (mode === 'create' && !formData.password?.trim()) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณากรอกรหัสผ่าน');
      return false;
    }
    if (!formData.name.trim()) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณากรอกชื่อ');
      return false;
    }
    if (!formData.email.trim()) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณากรอกอีเมล');
      return false;
    }
    if (!formData.role) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณาเลือกบทบาท');
      return false;
    }
    if (!formData.status) {
      showToast('error', 'ข้อผิดพลาด', 'กรุณาเลือกสถานะ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // จำลองการส่งข้อมูล
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      showToast('success', 'สำเร็จ', mode === 'create' ? 'เพิ่มผู้ใช้สำเร็จ' : 'อัปเดตผู้ใช้สำเร็จ');
      onHide();
    } catch (error) {
      showToast('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const footer = (
    <div className="flex justify-end space-x-2">
      <Button
        label="ยกเลิก"
        icon="pi pi-times"
        severity="secondary"
        outlined
        onClick={onHide}
        disabled={loading}
      />
      <Button
        label={loading ? "กำลังบันทึก..." : (mode === 'create' ? 'เพิ่มผู้ใช้' : 'อัปเดต')}
        icon={loading ? "pi pi-spin pi-spinner" : (mode === 'create' ? "pi pi-plus" : "pi pi-check")}
        onClick={handleSubmit}
        loading={loading}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} position="top-right" />
      
      <Dialog
        header={mode === 'create' ? 'เพิ่มผู้ใช้ใหม่' : 'แก้ไขผู้ใช้'}
        visible={visible}
        onHide={onHide}
        footer={footer}
        style={{ width: '600px' }}
        modal
        className="p-fluid"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                ชื่อผู้ใช้ *
              </label>
              <InputText
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                รหัสผ่าน {mode === 'create' ? '*' : '(เว้นว่างถ้าไม่เปลี่ยน)'}
              </label>
              <Password
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={mode === 'create' ? 'กรอกรหัสผ่าน' : 'กรอกรหัสผ่านใหม่'}
                disabled={loading}
                toggleMask
                feedback={false}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                ชื่อ *
              </label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="กรอกชื่อ"
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                อีเมล *
              </label>
              <InputText
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="กรอกอีเมล"
                disabled={loading}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-slate-700">
                บทบาท *
              </label>
              <Dropdown
                id="role"
                value={formData.role}
                options={roleOptions}
                onChange={(e) => handleInputChange('role', e.value)}
                placeholder="เลือกบทบาท"
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                สถานะ *
              </label>
              <Dropdown
                id="status"
                value={formData.status}
                options={statusOptions}
                onChange={(e) => handleInputChange('status', e.value)}
                placeholder="เลือกสถานะ"
                disabled={loading}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
