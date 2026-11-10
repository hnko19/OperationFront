import { useState, useMemo, useCallback } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Swal from "sweetalert2";

import { useUsers } from "../../Hooks/UserHook/useUsers";
import { useResetUserPassword } from "../../Hooks/AuthHooks/useResetPassword";

import type { IUser } from "../../Interface/IUser";

import CrudBtn from "../../Components/Buttons/CrudBtn";
import UserModel from "../../Components/Popup/UserModel";
import PageTitle from "../../Components/Text/PageTitle";
import MultiDataTable from "../../Components/Tables/MultiDataTable";

const columnHelper = createColumnHelper<IUser>();

export default function UsersPage() {
  const { data: users = [], isLoading } = useUsers();

  const { mutateAsync: resetPassword, isPending: isResetting } =
    useResetUserPassword();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  // Add User
  const openAddModal = useCallback(() => {
    setSelectedUser(null);
    setModalMode("add");
    setIsModalOpen(true);
  }, []);

  // Edit User
  const handleEdit = useCallback((user: IUser) => {
    setSelectedUser(user);
    setModalMode("edit");
    setIsModalOpen(true);
  }, []);

  // Close Modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  // Reset Password
  const confirmReset = useCallback(
    async (user: IUser) => {
      if (isResetting) return;

      const result = await Swal.fire({
        title: "Reset Password?",
        text: `Are you sure you want to reset the password for ${user.fullName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reset Password",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (!result.isConfirmed) return;

      try {
        Swal.fire({
          title: "Please wait...",
          text: "Resetting user password...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => Swal.showLoading(),
        });

        const response = await resetPassword({
          userId: user.id,
          password: "123456",
        });

        if (!response) {
          throw new Error("Password reset failed.");
        }

        await Swal.fire({
          title: "Success!",
          text: `Password for ${user.fullName} has been reset successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Reset Password Error:", error);

        await Swal.fire({
          title: "Error!",
          text:
            error instanceof Error
              ? error.message
              : "Failed to reset user password.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    [resetPassword, isResetting],
  );

  // Table Columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "#",
        cell: (info) => info.row.index + 1,
      }),

      columnHelper.accessor("fullName", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("userName", {
        header: "User Name",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("roles", {
        header: "Role",
        cell: (info) => info.getValue(),
      }),

      columnHelper.display({
        id: "actions",
        header: () => <i className="fa fa-cogs"></i>,

        cell: (info) => {
          const user = info.row.original;

          return (
            <div className="flex justify-center gap-x-2">
              <CrudBtn
                title="edit user info"
                text=""
                btnType="edit"
                fun={() => handleEdit(user)}
              />

              <CrudBtn
                title="reset user password"
                text=""
                btnType="reset"
                fun={() => confirmReset(user)}
              />
            </div>
          );
        },

        enableSorting: false,
      }),
    ],
    [handleEdit, confirmReset],
  );

  return (
    <>
      <UserModel
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        initialData={selectedUser ?? undefined}
      />

      <div className="flex justify-between items-center">
        <CrudBtn text="Add User" btnType="create" fun={openAddModal} />

        <PageTitle text="Users" />
      </div>

      <MultiDataTable data={users} columns={columns} isLoading={isLoading} />
    </>
  );
}
