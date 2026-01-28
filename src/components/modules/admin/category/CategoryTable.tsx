"use client";

import { Edit, Trash } from "lucide-react";
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
import {
    deleteCategory,
    updateCategory,
} from "../../../../actions/category.action";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Field, FieldError, FieldLabel } from "../../../ui/field";
import z from "zod";
import { useForm } from "@tanstack/react-form";

interface CategoryComponentProps {
    categories: Category[];
}

const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
});

export default function CategoryTable({ categories }: CategoryComponentProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );

    const form = useForm({
        defaultValues: {
            name: "",
        },
        validators: {
            onSubmit: categorySchema,
        },
        onSubmit: async ({ value }) => {
            if (!selectedCategory) return;
            const toastId = toast.loading("Updating Category...");

            try {
                const { data, error } = await updateCategory(
                    selectedCategory.id,
                    value.name,
                );

                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success(data?.message ?? "Category updated", {
                    id: toastId,
                });
                setOpen(false);
                setSelectedCategory(null);
                form.reset();
            } catch (err) {
                console.log(err);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

    const handleOpenEdit = (category: Category) => {
        setSelectedCategory(category);
        form.setFieldValue("name", category.name);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Category Deleting...");
        try {
            const { data, error } = await deleteCategory(id);
            if (error) {
                toast.error(error.message, { id: toastId });
                return;
            }

            toast.success(data.message, { id: toastId });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again.", {
                id: toastId,
            });
        }
    };

    return (
        <>
            {categories.length === 0 ? (
                <div className="h-24 text-center text-muted-foreground">
                    No categories found
                </div>
            ) : (
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
                                    <TableCell>
                                        {category.medicines.length}
                                    </TableCell>
                                    <TableCell className="flex users-center justify-center w-fit gap-2">
                                        {/* <Button
                                        size={`sm`}
                                        variant="outline"
                                        className="cursor-pointer group"
                                        // onClick={() => handleView(user)}
                                    >
                                        <Eye className="group-hover:text-green-600" />
                                    </Button> */}
                                        <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                            onClick={() =>
                                                handleOpenEdit(category)
                                            }
                                        >
                                            <Edit className="group-hover:text-blue-600" />
                                        </Button>
                                        <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                    </DialogHeader>

                    <form
                        id="update-category-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-4 py-4"
                    >
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Name
                                        </FieldLabel>

                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                        />

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <DialogFooter>
                            <Button
                                type="submit"
                                className="w-full cursor-pointer"
                            >
                                Update Category
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
