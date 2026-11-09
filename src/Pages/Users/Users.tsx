import { useState, useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import { useUsers } from "../../Hooks/UserHook/useUsers";
import type { IUser } from "../../Interface/IUser";
import CrudBtn from "../../Components/Buttons/CrudBtn";
import UserModel from "../../Components/Popup/UserModel";
import PageTitle from "../../Components/Text/PageTitle";
import MultiDataTable from "../../Components/Tables/MultiDataTable";

const columnHelper = createColumnHelper<IUser>();

export default function UsersPage() {
  const { data: users = [], isLoading } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const openAddModal = () => {
    setSelectedUser(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleReset = (user: IUser) => {
    console.log(user.id);
  };
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
                fun={() => {
                  handleReset(user);
                }}
              />
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [],
  );

  return (
    <>
      <UserModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        mode={modalMode}
        initialData={selectedUser ?? undefined}
      />

      <div className="flex justify-between items-center">
        <CrudBtn text="Add User" btnType="create" fun={() => openAddModal()} />

        <PageTitle text="Users" />
      </div>

      <MultiDataTable data={users} columns={columns} isLoading={isLoading} />
    </>
  );
}
