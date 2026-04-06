"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User, UserStatus } from "../../types";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
// import { z } from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { updateUser } from "../../actions/user.action";

// const formSchema = z.object({
//     name: z.string().optional(),
//     email: z.string().email().optional(),
//     image: z.string().url().optional(),
//     status: z.nativeEnum(UserStatus).optional(),
// });

export default function MyProfile({ user }: { user: User }) {
    const form = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            image: user.image ?? undefined,
            status: user.status as UserStatus,
        },
        // validators: {
        //     onSubmit: formSchema,
        // },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Updating Profile...");
            const serverData: Partial<{ name: string; image: string }> = {};
            if (value.name !== undefined) serverData.name = value.name;
            if (value.image !== undefined) serverData.image = value.image;

            try {
                const { data, error } = await updateUser(user.id, serverData);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success(data.message || "Profile updated successfully", {
                    id: toastId,
                });
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-5">My Profile</h2>
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1 rounded-2xl">
                    <CardContent className="flex flex-col items-center justify-center gap-4 p-6 h-full">
                        <div className="relative h-50 w-50 overflow-hidden rounded-full">
                            <Image
                                src={
                                    user.image ||
                                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                }
                                alt={user.name || user.email}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-semibold">
                                {user.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Badge>{user.role}</Badge>
                            {user.emailVerified && (
                                <Badge variant="outline">Verified</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 rounded-2xl">
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-5">
                        <form
                            id="update-user-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                form.handleSubmit();
                            }}
                            className="space-y-5"
                        >
                            <FieldGroup className="name">
                                <form.Field name="name">
                                    {(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched &&
                                            !field.state.meta.isValid;

                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel
                                                    htmlFor={field.name}
                                                >
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
                                                />

                                                {isInvalid && (
                                                    <FieldError
                                                        errors={
                                                            field.state.meta
                                                                .errors
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        );
                                    }}
                                </form.Field>
                            </FieldGroup>
                            <form.Field name="email">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Email
                                            </FieldLabel>

                                            <Input
                                                type="email"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                readOnly
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
                            <form.Field name="image">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Image
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
                            <form.Field name="status">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Status
                                            </FieldLabel>

                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target
                                                            .value as UserStatus,
                                                    )
                                                }
                                                readOnly
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
                        </form>

                        <Button
                            form="update-user-form"
                            className="w-full cursor-pointer"
                        >
                            Update Profile
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
