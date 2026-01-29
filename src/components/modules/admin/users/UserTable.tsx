"use client";

import { useState } from "react";
import { Role, User, UserStatus } from "../../../../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { Button } from "../../../ui/button";
import { Eye, Trash, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../../../ui/dialog";
import Image from "next/image";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
import { updateUser } from "../../../../actions/user.action";

const roleStyles: Record<string, string> = {
    ADMIN: "text-purple-600 border-purple-500",
    SELLER: "text-blue-600 border-blue-500",
    CUSTOMER: "text-gray-600 border-gray-500",
};

export default function UserTable({ users }: { users: User[] }) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleView = (user: User) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const handleDelete = (user: User) => {
        console.log(user);
        toast.info("User delete hasn't implemented yet!");
    };

    const handleUpdateUser = async (
        id: string,
        {
            status,
            role,
        }: {
            status?: UserStatus;
            role?: Role;
        },
    ) => {
        const toastId = toast.loading("Updating User Status...");
        const serverData: Partial<{
            status: UserStatus;
            role: Role;
        }> = {};

        if (status !== undefined) {
            serverData.status = status;
        }

        if (role !== undefined) {
            serverData.role = role;
        }

        try {
            const { data, error } = await updateUser(id as string, serverData);

            if (error) {
                toast.error(error.message, { id: toastId });
                return;
            }

            toast.success(data?.message ?? "User updated", {
                id: toastId,
            });
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong, please try again.", {
                id: toastId,
            });
        }
    };

    return (
        <>
            {users.length === 0 ? (
                <div className="h-24 text-center text-muted-foreground">
                    No users found
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow className="">
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Extras</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Image
                                            src={
                                                user.image ||
                                                "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                            }
                                            alt={user.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.role as string}
                                            onValueChange={async (value) => {
                                                handleUpdateUser(user.id, {
                                                    role: value as Role,
                                                });
                                            }}
                                        >
                                            <SelectTrigger
                                                className={`w-full max-w-32 cursor-pointer font-medium ${
                                                    roleStyles[user.role]
                                                }`}
                                            >
                                                <SelectValue placeholder="Role" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem
                                                        value="ADMIN"
                                                        className="cursor-pointer text-purple-600 focus:text-purple-600"
                                                    >
                                                        Admin
                                                    </SelectItem>

                                                    <SelectItem
                                                        value="SELLER"
                                                        className="cursor-pointer text-blue-600 focus:text-blue-600"
                                                    >
                                                        Seller
                                                    </SelectItem>

                                                    <SelectItem
                                                        value="CUSTOMER"
                                                        className="cursor-pointer text-gray-600 focus:text-gray -600"
                                                    >
                                                        Customer
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.status}
                                            onValueChange={(value) => {
                                                handleUpdateUser(user.id, {
                                                    status: value as UserStatus,
                                                });
                                            }}
                                        >
                                            <SelectTrigger
                                                className={`w-full max-w-30 cursor-pointer font-medium ${
                                                    user.status === "ACTIVE"
                                                        ? "text-green-600 border-green-500"
                                                        : "text-red-600 border-red-500"
                                                }`}
                                            >
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem
                                                        value="ACTIVE"
                                                        className="cursor-pointer text-green-600 focus:text-green-600"
                                                    >
                                                        Active
                                                    </SelectItem>

                                                    <SelectItem
                                                        value="BANNED"
                                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                                    >
                                                        Banned
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="flex users-center justify-center w-fit gap-2">
                                        <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                            onClick={() => handleView(user)}
                                        >
                                            <Eye className="group-hover:text-green-600" />
                                        </Button>
                                        {/* <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                        >
                                            <Edit className="group-hover:text-blue-600" />
                                        </Button> */}
                                        <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                            onClick={() => handleDelete(user)}
                                        >
                                            <Trash className="group-hover:text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* View Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md w-full p-0 overflow-hidden rounded-2xl border bg-background shadow-xl outline-none">
                    {selectedUser && (
                        <>
                            <div className="relative border-b px-6 pt-6 pb-4">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative">
                                        <div className="relative h-24 w-24 rounded-full border-2 border-background ring-2 ring-blue-500/20">
                                            <Image
                                                src={
                                                    selectedUser.image ||
                                                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                                }
                                                alt={selectedUser.name}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        {selectedUser.emailVerified && (
                                            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                                                <CheckCircle className="h-5 w-5 text-blue-500" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center space-y-1">
                                        <DialogTitle className="text-lg font-semibold tracking-tight">
                                            {selectedUser.name}
                                        </DialogTitle>

                                        <p className="text-xs text-muted-foreground">
                                            {selectedUser.email}
                                        </p>

                                        <div className="mt-1 inline-flex items-center gap-2">
                                            <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5 text-xs font-medium capitalize dark:text-white text-black">
                                                {selectedUser.role}
                                            </span>

                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    selectedUser.status
                                                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                                                        : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        selectedUser.status
                                                            ? "bg-emerald-500"
                                                            : "bg-rose-500"
                                                    }`}
                                                />
                                                {selectedUser.status
                                                    ? "Active"
                                                    : "Banned"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details section */}
                            {/* <div className="px-6 py-5 space-y-4 text-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Name
                                        </p>
                                        <p className="font-medium capitalize">
                                            {selectedUser.name}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Role
                                        </p>
                                        <p className="font-medium capitalize">
                                            {selectedUser.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Email
                                        </p>
                                        <p
                                            className="max-w-45 truncate text-sm font-medium"
                                            title={selectedUser.email}
                                        >
                                            {selectedUser.email}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground">
                                            {selectedUser.emailVerified
                                                ? "Verified email"
                                                : "Not verified"}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Account Status
                                        </p>
                                        <span
                                            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                selectedUser.status
                                                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                                                    : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
                                            }`}
                                        >
                                            {selectedUser.status
                                                ? "Active"
                                                : "Banned"}
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
