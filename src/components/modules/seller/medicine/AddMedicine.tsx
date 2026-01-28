"use client";

import { useState } from "react";
import { Button } from "../../../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Input } from "../../../ui/input";
import { Field, FieldError, FieldLabel } from "../../../ui/field";
import { toast } from "sonner";
import { Category, User } from "../../../../types";
import { Textarea } from "../../../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
import { createMedicine } from "../../../../actions/medicine.action";

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
    categoryId: z
        .string({ message: "categoryId is required" })
        .min(3, "Category ID must be at least 3 characters long"),
    sellerId: z.string({ message: "sellerId is required" }),
});

export default function AddMedicine({
    categories,
    user,
}: {
    categories: Category[];
    user: User;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            manufacturer: "",
            imageUrl: "",
            categoryId: "",
            sellerId: user.id,
        },
        validators: {
            onSubmit: medicineSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Medicine...");
            const serverData = {
                name: value.name,
                description: value.description,
                price: value.price,
                stock: value.stock,
                manufacturer: value.manufacturer,
                imageUrl: value.imageUrl,
                categoryId: value.categoryId,
                sellerId: user.id,
            };
            try {
                const { data, error } = await createMedicine(serverData);

                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success(data?.message ?? "Medicine created", {
                    id: toastId,
                });
                setIsOpen(false);
                form.reset();
            } catch (err) {
                console.log(err);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="cursor-pointer"
            >
                Add Medicine
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Add New Medicine</DialogTitle>
                    </DialogHeader>

                    <form
                        id="add-category-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-4 py-4"
                    >
                        <form.Field name="categoryId">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Category
                                        </FieldLabel>

                                        <Select
                                            value={field.state.value}
                                            onValueChange={(value) =>
                                                field.handleChange(value)
                                            }
                                        >
                                            <SelectTrigger id={field.name}>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {categories.map((c) => (
                                                    <SelectItem
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

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
                                Add Medicine
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
