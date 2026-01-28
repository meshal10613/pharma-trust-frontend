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
import { createCategory } from "../../../../actions/category.action";

const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
});

export default function AddCategory() {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
        },
        validators: {
            onSubmit: categorySchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Category Creating...");
            try {
                const { error } = await createCategory(value.name);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                toast.success("Category created successful", { id: toastId });
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            } finally {
                setIsOpen(false);
                form.reset();
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
                Add Category
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
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
                                Add Category
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
