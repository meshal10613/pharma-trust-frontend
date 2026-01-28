"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "@tanstack/react-form";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { authClient } from "../../../lib/auth-client";

const formSchema = z.object({
    name: z.string().min(1, "This field is required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Registering...");

            try {
                const { data, error } = await authClient.signUp.email(value);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                console.log(data);

                toast.success("Registration successful", { id: toastId });
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000",
        });
    };

    return (
        <>
            <Button
                variant="ghost"
                asChild
                className="w-fit flex items-center gap-2 justify-start mb-4"
            >
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
            </Button>
            <Card {...props}>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="register-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup className="">
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
                            <form.Field name="password">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Password
                                            </FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showPassword &&
                                                        isFocused
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onFocus={() =>
                                                        setIsFocused(true)
                                                    }
                                                    onBlur={() =>
                                                        setIsFocused(false)
                                                    }
                                                    className="pr-10"
                                                />
                                                {isFocused && (
                                                    <button
                                                        type="button"
                                                        onMouseDown={(e) =>
                                                            e.preventDefault()
                                                        }
                                                        onClick={() =>
                                                            setShowPassword(
                                                                () =>
                                                                    !showPassword,
                                                            )
                                                        }
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                        aria-label={
                                                            showPassword
                                                                ? "Hide password"
                                                                : "Show password"
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 cursor-pointer" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 cursor-pointer" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>

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
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center w-full gap-3">
                    <Button
                        form="register-form"
                        type="submit"
                        className="w-full cursor-pointer"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => handleGoogleLogin()}
                        variant="outline"
                        type="button"
                        className="w-full cursor-pointer"
                    >
                        <FcGoogle /> Sign up with Google
                    </Button>
                    <FieldDescription className="text-center">
                        Already have an account?{" "}
                        <Link href="/login">Login</Link>
                    </FieldDescription>
                </CardFooter>
            </Card>
        </>
    );
}
