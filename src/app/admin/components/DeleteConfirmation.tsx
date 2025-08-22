"use client";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface DeleteConfirmationProps {
  onConfirm: () => void;
}

export default function DeleteConfirmation({ onConfirm }: DeleteConfirmationProps) {
  const toast = useRef<Toast>(null);

  const showDeleteConfirmation = () => {
    confirmDialog({
      message: 'คุณต้องการลบผู้ใช้นี้หรือไม่? การดำเนินการนี้ไม่สามารถยกเลิกได้',
      header: 'ยืนยันการลบ',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        onConfirm();
        toast.current?.show({
          severity: 'success',
          summary: 'สำเร็จ',
          detail: 'ลบผู้ใช้สำเร็จ',
          life: 3000,
        });
      },
      reject: () => {
        toast.current?.show({
          severity: 'info',
          summary: 'ยกเลิก',
          detail: 'ยกเลิกการลบผู้ใช้',
          life: 3000,
        });
      }
    });
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />
      <button
        onClick={showDeleteConfirmation}
        className="p-button p-button-danger p-button-sm"
        style={{ display: 'none' }}
        id="delete-confirm-trigger"
      />
    </>
  );
}

// Helper function to trigger delete confirmation
export const confirmDelete = () => {
  const trigger = document.getElementById('delete-confirm-trigger');
  if (trigger) {
    trigger.click();
  }
};
