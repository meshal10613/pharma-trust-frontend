"use client";

import { Edit, Eye, Trash } from "lucide-react";
import { Category } from "../../../../types";
import { Button } from "../../../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { toast } from "sonner";
import { deleteCategory } from "../../../../actions/category.action";
import { useRouter } from "next/navigation";

interface CategoryComponentProps {
    categories: Category[];
}

export default function CategoryTable({ categories }: CategoryComponentProps) {
	const router = useRouter();

	const handleDelete = async(id: string) => {
		const toastId = toast.loading("Category Deleting...");
            try {
                const {data, error } = await deleteCategory(id);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success(data.message, { id: toastId });
                router.refresh();
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
	}

    return (
        <>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="border-r">Sl</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Medicines</TableHead>
                            <TableHead>Extras</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category: Category, index) => (
                            <TableRow key={category.id}>
                                <TableCell className="border-r">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.medicines.length}</TableCell>
                                <TableCell className="flex users-center justify-center w-fit gap-2">
                                    <Button
                                        size={`sm`}
                                        variant="outline"
                                        className="cursor-pointer group"
                                        // onClick={() => handleView(user)}
                                    >
                                        <Eye className="group-hover:text-green-600" />
                                    </Button>
                                    <Button
                                        size={`sm`}
                                        variant="outline"
                                        className="cursor-pointer group"
                                    >
                                        <Edit className="group-hover:text-blue-600" />
                                    </Button>
                                    <Button
                                        size={`sm`}
                                        variant="outline"
                                        className="cursor-pointer group"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <Trash className="group-hover:text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
