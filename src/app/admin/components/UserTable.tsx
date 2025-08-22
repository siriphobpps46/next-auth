"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { Tooltip } from "primereact/tooltip";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onStatusChange: (userId: string, status: string) => void;
}

const roleOptions = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'ผู้ดูแลระบบ', value: 'admin' },
  { label: 'ผู้ใช้ทั่วไป', value: 'user' },
  { label: 'ผู้จัดการ', value: 'manager' }
];

const statusOptions = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'ใช้งาน', value: 'active' },
  { label: 'ไม่ใช้งาน', value: 'inactive' },
  { label: 'ระงับการใช้งาน', value: 'suspended' }
];

export default function UserTable({ users, onEdit, onDelete, onStatusChange }: UserTableProps) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'suspended': return 'danger';
      default: return 'info';
    }
  };

  const getRoleSeverity = (role: string) => {
    switch (role) {
      case 'admin': return 'danger';
      case 'manager': return 'warning';
      case 'user': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งาน';
      case 'inactive': return 'ไม่ใช้งาน';
      case 'suspended': return 'ระงับการใช้งาน';
      default: return status;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'ผู้ดูแลระบบ';
      case 'manager': return 'ผู้จัดการ';
      case 'user': return 'ผู้ใช้ทั่วไป';
      default: return role;
    }
  };

  const actionTemplate = (rowData: User) => {
    return (
      <div className="flex space-x-2">
        <Tooltip target=".edit-btn" content="แก้ไขผู้ใช้" />
        <Button
          icon="pi pi-pencil"
          size="small"
          severity="secondary"
          className="edit-btn btn-hover"
          onClick={() => onEdit(rowData)}
        />
        
        <Tooltip target=".delete-btn" content="ลบผู้ใช้" />
        <Button
          icon="pi pi-trash"
          size="small"
          severity="danger"
          className="delete-btn btn-hover"
          onClick={() => onDelete(rowData.id)}
        />
      </div>
    );
  };

  const statusTemplate = (rowData: User) => {
    return (
      <Dropdown
        value={rowData.status}
        options={statusOptions.filter(opt => opt.value !== '')}
        onChange={(e) => onStatusChange(rowData.id, e.value)}
        className="w-full"
        disabled={rowData.role === 'admin'} // ไม่ให้เปลี่ยนสถานะ admin
      />
    );
  };

  const roleTemplate = (rowData: User) => {
    return (
      <Tag 
        value={getRoleLabel(rowData.role)}
        severity={getRoleSeverity(rowData.role)}
      />
    );
  };

  const statusTagTemplate = (rowData: User) => {
    return (
      <Tag 
        value={getStatusLabel(rowData.status)}
        severity={getStatusSeverity(rowData.status)}
      />
    );
  };

  const avatarTemplate = (rowData: User) => {
    return (
      <Avatar 
        icon="pi pi-user" 
        size="normal" 
        className={`${
          rowData.role === 'admin' ? 'bg-red-500' : 
          rowData.role === 'manager' ? 'bg-orange-500' : 'bg-blue-500'
        }`}
      />
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <h3 className="text-xl font-semibold text-slate-800">จัดการผู้ใช้</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="ค้นหาทั้งหมด..."
              className="w-full sm:w-auto"
            />
          </span>
          
          <Dropdown
            value={filters.role.value}
            options={roleOptions}
            onChange={(e) => setFilters({ ...filters, role: { value: e.value, matchMode: FilterMatchMode.EQUALS } })}
            placeholder="บทบาท"
            className="w-full sm:w-auto"
            showClear
          />
          
          <Dropdown
            value={filters.status.value}
            options={statusOptions}
            onChange={(e) => setFilters({ ...filters, status: { value: e.value, matchMode: FilterMatchMode.EQUALS } })}
            placeholder="สถานะ"
            className="w-full sm:w-auto"
            showClear
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={users}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={['username', 'name', 'email', 'role', 'status']}
        header={renderHeader()}
        emptyMessage="ไม่พบข้อมูลผู้ใช้"
        stripedRows
        showGridlines={false}
        responsiveLayout="scroll"
        className="p-datatable-sm"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} รายการ"
      >
        <Column field="avatar" header="" body={avatarTemplate} style={{ width: '60px' }} />
        <Column field="username" header="ชื่อผู้ใช้" sortable filter filterPlaceholder="ค้นหาชื่อผู้ใช้" style={{ minWidth: '120px' }} />
        <Column field="name" header="ชื่อ" sortable filter filterPlaceholder="ค้นหาชื่อ" style={{ minWidth: '150px' }} />
        <Column field="email" header="อีเมล" sortable filter filterPlaceholder="ค้นหาอีเมล" style={{ minWidth: '200px' }} />
        <Column field="role" header="บทบาท" sortable body={roleTemplate} style={{ minWidth: '120px' }} />
        <Column field="status" header="สถานะ" sortable body={statusTagTemplate} style={{ minWidth: '100px' }} />
        <Column field="lastLogin" header="เข้าสู่ระบบล่าสุด" sortable style={{ minWidth: '180px' }} />
        <Column field="createdAt" header="วันที่สร้าง" sortable style={{ minWidth: '150px' }} />
        <Column header="การดำเนินการ" body={actionTemplate} style={{ minWidth: '120px' }} />
      </DataTable>
    </div>
  );
}
