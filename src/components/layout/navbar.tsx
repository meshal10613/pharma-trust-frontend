"use client";

import { LayoutDashboard, LogOut, Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { User } from "@/types";
import Image, { StaticImageData } from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Logout from "../modules/authentication/logout";
import l from "../../../public/logo.png";
import mlogo from "../../../public/l.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/slice/userSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    user: User | null;
    className?: string;
    logo?: {
        url: string;
        src: StaticImageData;
        msrc: StaticImageData;
        alt: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    user,
    logo = {
        url: "/",
        src: l,
        msrc: mlogo,
        alt: "logo",
    },
    menu = [
        { title: "Home", url: "/" },
        { title: "Medicines", url: "/medicines" },
        // { title: "Dashboard", url: `/dashboard/customer-dashboard` },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
    className,
}: Navbar1Props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalCart = cart.reduce((acc, item) => acc + item.quantity, 0);
    const router = useRouter();

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut();
            dispatch(logout());
            toast.success("Logged out successfully", { id: toastId });
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout", { id: toastId });
        }
    };

    return (
        <header
            className={cn(
                // Sticky positioning
                "sticky top-0 z-50",
                // Glassmorphism — works in both light and dark mode
                "bg-white/70 dark:bg-zinc-900/70",
                "backdrop-blur-md backdrop-saturate-150",
                // Bottom border as a subtle separator
                "border-b border-white/40 dark:border-white/10",
                // Subtle shadow
                "shadow-sm shadow-black/5 dark:shadow-black/30",
                className,
            )}
        >
            <div className="container mx-auto px-4 lg:px-6 py-3">
                {/* ── Desktop ── */}
                <nav className="hidden items-center justify-between lg:flex">
                    {/* Left: logo + links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href={logo.url}
                            className="relative flex items-center w-32 h-9 shrink-0"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                className="object-contain"
                            />
                        </Link>

                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center gap-1">
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right: cart + theme + auth */}
                    <div className="flex items-center gap-2">
                        {user && totalCart > 0 && (
                            <Link
                                href="/cart"
                                className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalCart > 0 && (
                                    <span className="absolute -right-1 -top-1 bg-primary text-white dark:text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-semibold leading-none">
                                        {totalCart}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* <ModeToggle /> */}

                        {user ? (
                            <div className="flex items-center gap-2 ml-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <span className="rounded-full ring-2 ring-transparent hover:ring-[#FF5100]/30 transition-all duration-200 focus:outline-none focus:ring-[#FF5100]/40 cursor-pointer">
                                            <Avatar className="h-8 w-8 relative">
                                                <AvatarImage
                                                    src={
                                                        user?.image ||
                                                        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                                    }
                                                    alt={user.name}
                                                    className="rounded-full object-cover"
                                                />
                                            </Avatar>
                                        </span>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        className="w-52 mt-1"
                                    >
                                        {/* User info */}
                                        <div className="px-3 py-2.5">
                                            <p className="text-sm font-semibold text-zinc-900 truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-zinc-500 truncate mt-0.5">
                                                {user.email}
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem>
                                            <Link
                                                href={`/dashboard/customer-dashboard`}
                                                className="flex items-center gap-2.5 cursor-pointer"
                                            >
                                                <LayoutDashboard className="w-4 h-4 text-zinc-500" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="flex items-center cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 ml-1">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    <Link href={auth.login.url}>
                                        {auth.login.title}
                                    </Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href={auth.signup.url}>
                                        {auth.signup.title}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </nav>

                {/* ── Mobile ── */}
                <div className="flex items-center justify-between lg:hidden">
                    {/* Logo (icon version) */}
                    <Link href={logo.url} className="relative w-9 h-9 shrink-0">
                        <Image
                            src={logo.msrc}
                            alt={logo.alt}
                            fill
                            className="object-contain"
                        />
                    </Link>

                    {/* Right cluster */}
                    <div className="flex items-center gap-2">
                        {user && (
                            <Link
                                href="/cart"
                                className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalCart > 0 && (
                                    <span className="absolute -right-1 -top-1 bg-primary text-white dark:text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-semibold leading-none">
                                        {totalCart}
                                    </span>
                                )}
                            </Link>
                        )}

                        <ModeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10"
                                >
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                className="
                                    overflow-y-auto
                                    bg-white/80 dark:bg-zinc-900/80
                                    backdrop-blur-xl backdrop-saturate-150
                                    border-l border-black/10 dark:border-white/10
                                "
                            >
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link
                                            href={logo.url}
                                            className="flex items-center gap-2"
                                        >
                                            <Image
                                                src={logo.src}
                                                alt={logo.alt}
                                                width={110}
                                                height={36}
                                                className="object-contain h-8 w-auto"
                                            />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-1 px-4 py-6">
                                    {menu.map((item) =>
                                        renderMobileMenuItem(item),
                                    )}
                                </div>

                                <SheetFooter className="px-4">
                                    {user ? (
                                        <div className="flex flex-col gap-3 w-full">
                                            <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                                                <div className="relative w-9 h-9 ring-2 ring-black/10 dark:ring-white/20 rounded-full shrink-0">
                                                    <Image
                                                        src={
                                                            user.image ||
                                                            "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                                        }
                                                        alt={
                                                            user.name || "User"
                                                        }
                                                        fill
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-foreground truncate">
                                                    {user.name}
                                                </span>
                                            </div>
                                            <Logout />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3 w-full">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10"
                                            >
                                                <Link href={auth.login.url}>
                                                    {auth.login.title}
                                                </Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={auth.signup.url}>
                                                    {auth.signup.title}
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        {user && (
                            <div className="relative w-8 h-8 ring-2 ring-white/60 dark:ring-white/20 rounded-full">
                                <Image
                                    src={
                                        user.image ||
                                        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                    }
                                    alt={user.name || "User"}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const renderMenuItem = (item: MenuItem) => (
    <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
            href={item.url}
            className="
                inline-flex h-9 items-center justify-center rounded-md px-4 py-2
                text-sm font-medium text-foreground/80
                transition-colors
                hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10
                focus:outline-none focus:bg-black/5 dark:focus:bg-white/10
            "
        >
            {item.title}
        </NavigationMenuLink>
    </NavigationMenuItem>
);

const renderMobileMenuItem = (item: MenuItem) => (
    <Link
        key={item.title}
        href={item.url}
        className="
            flex items-center px-3 py-2.5 rounded-lg
            text-sm font-medium text-foreground/80
            hover:text-foreground hover:bg-black/5 dark:hover:bg-white/8
            transition-colors
        "
    >
        {item.title}
    </Link>
);

export { Navbar };
