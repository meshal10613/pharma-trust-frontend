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
import { authClient } from "@/lib/auth-client";
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
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in...");

            try {
                const { data, error } = await authClient.signIn.email(value);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                console.log(data);
                toast.success("Login successful", { id: toastId });
                router.refresh();
                router.push("/");
            } catch (error) {
                console.error(error);
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
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup className="">
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
                        form="login-form"
                        type="submit"
                        className="w-full cursor-pointer bg-[#2B93C4] hover:bg-[#2B93C4]"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => handleGoogleLogin()}
                        variant="outline"
                        type="button"
                        className="w-full cursor-pointer"
                    >
                        <FcGoogle /> Sign in with Google
                    </Button>
                    <FieldDescription className="text-center">
                        Already have an account?{" "}
                        <Link href="/register">Register</Link>
                    </FieldDescription>
                </CardFooter>
            </Card>
        </>
    );
}
