"use client";

import { Edit, Eye, Trash } from "lucide-react";
import { Medicine } from "../../../../types";
import { Button } from "../../../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Field, FieldError, FieldLabel } from "../../../ui/field";
import { Input } from "../../../ui/input";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Textarea } from "../../../ui/textarea";
import {
    deleteMedicine,
    updateMedicine,
} from "../../../../actions/medicine.action";

const medicineSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z
        .string()
        .min(3, "Description must be at least 3 characters long"),
    price: z.number().min(1, "Price must be at least 1"),
    stock: z.number().min(1, "Stock must be at least 1"),
    manufacturer: z
        .string()
        .min(2, "Manufacturer must be at least 2 characters long"),
    imageUrl: z.url().min(3, "Image URL must be a valid URL"),
});

export default function MedicineTable({
    medicines,
}: {
    medicines: Medicine[];
}) {
    const [open, setOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
        null,
    );

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            manufacturer: "",
            imageUrl: "",
        },
        validators: {
            onSubmit: medicineSchema,
        },
        onSubmit: async ({ value }) => {
            if (!selectedMedicine) return;
            const toastId = toast.loading("Updating Medicine...");

            try {
                const { data, error } = await updateMedicine(
                    selectedMedicine.id,
                    {
                        name: value.name,
                        description: value.description,
                        price: value.price,
                        stock: value.stock,
                        manufacturer: value.manufacturer,
                        imageUrl: value.imageUrl,
                    },
                );

                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success(data?.message ?? "Medicine updated", {
                    id: toastId,
                });
                setOpen(false);
                setSelectedMedicine(null);
                form.reset();
            } catch (err) {
                console.log(err);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

    const handleOpenEdit = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        form.setFieldValue("name", medicine.name);
        form.setFieldValue("description", medicine.description);
        form.setFieldValue("price", medicine.price);
        form.setFieldValue("stock", medicine.stock);
        form.setFieldValue("manufacturer", medicine.manufacturer);
        form.setFieldValue("imageUrl", medicine.imageUrl);

        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Medicine Deleting...");
        try {
            const { data, error } = await deleteMedicine(id);
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
            {medicines.length === 0 ? (
                    <div
                        className="h-24 text-center text-muted-foreground"
                    >
                        No medicines found
                    </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="border-r">Sl</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Extras</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medicines.map((medicine, index) => (
                                <TableRow key={medicine.id}>
                                    <TableCell className="border-r">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{medicine.name}</TableCell>
                                    <TableCell>{medicine.price}</TableCell>
                                    <TableCell>{medicine.stock}</TableCell>
                                    <TableCell>
                                        {medicine.category?.name ?? "—"}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-center w-fit gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="group cursor-pointer"
                                        >
                                            <Eye className="group-hover:text-green-600" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="group cursor-pointer"
                                            onClick={() =>
                                                handleOpenEdit(medicine)
                                            }
                                        >
                                            <Edit className="group-hover:text-blue-600" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="group cursor-pointer"
                                            onClick={() =>
                                                handleDelete(medicine.id)
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

            <Dialog
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                    if (!v) {
                        setSelectedMedicine(null);
                        form.reset();
                    }
                }}
            >
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Update Medicine</DialogTitle>
                    </DialogHeader>

                    <form
                        id="update-medicine-form"
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

                        <form.Field name="description">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Description
                                        </FieldLabel>
                                        <Textarea
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

                        <div className="flex items-center justify-around gap-5">
                            <form.Field name="price">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Price
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? 0}
                                                onChange={(e) => {
                                                    const v = e.target.value;
                                                    field.handleChange(
                                                        v === ""
                                                            ? 0
                                                            : Number(v),
                                                    );
                                                }}
                                                onBlur={field.handleBlur}
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            <form.Field name="stock">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Stock
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? 0}
                                                onChange={(e) => {
                                                    const v = e.target.value;
                                                    field.handleChange(
                                                        v === ""
                                                            ? 0
                                                            : Number(v),
                                                    );
                                                }}
                                                onBlur={field.handleBlur}
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </div>

                        <form.Field name="manufacturer">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Manufacturer
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

                        <form.Field name="imageUrl">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Image Url
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
                                            placeholder="https://example.com/image.png"
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
                                Update Medicine
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
