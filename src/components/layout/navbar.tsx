// "use client";

// import { Menu, ShoppingCart } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Accordion } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//     Sheet,
//     SheetContent,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";
// import { User } from "@/types";
// import Image, { StaticImageData } from "next/image";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import Logout from "../modules/authentication/logout";
// import l from "../../../public/logo.png";
// import mlogo from "../../../public/l.png";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { logout } from "../../store/slice/userSlice";

// interface MenuItem {
//     title: string;
//     url: string;
//     description?: string;
//     icon?: React.ReactNode;
//     items?: MenuItem[];
// }

// interface Navbar1Props {
//     user: User | null;
//     className?: string;
//     logo?: {
//         url: string;
//         src: StaticImageData;
//         msrc: StaticImageData;
//         alt: string;
//         className?: string;
//     };
//     menu?: MenuItem[];
//     auth?: {
//         login: {
//             title: string;
//             url: string;
//         };
//         signup: {
//             title: string;
//             url: string;
//         };
//     };
// }

// const Navbar = ({
//     user,
//     logo = {
//         url: "/",
//         src: l,
//         msrc: mlogo,
//         alt: "logo",
//     },
//     menu = [
//         { title: "Home", url: "/" },
//         {
//             title: "Medicines",
//             url: "/medicines",
//         },
//         {
//             title: "Dashboard",
//             url: `/dashboard/customer-dashboard`,
//         },
//     ],
//     auth = {
//         login: { title: "Login", url: "/login" },
//         signup: { title: "Register", url: "/register" },
//     },
//     className,
// }: Navbar1Props) => {
//     const dispatch = useDispatch();
//     const cart = useSelector((state: RootState) => state.cart.items);
//     const totalCart = cart.reduce((acc, item) => acc + item.quantity, 0);
//     const router = useRouter();
//     const handleLogout = async () => {
//         const toastId = toast.loading("Logging out...");
//         try {
//             await authClient.signOut();
//             dispatch(logout());
//             toast.success("Logged out successfully", { id: toastId });

//             router.refresh();
//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to logout", { id: toastId });
//         }
//     };

//     return (
//         <section className={cn("py-4", className)}>
//             <div className="container mx-auto px-4 lg:px-0">
//                 <nav className="hidden items-center justify-between lg:flex">
//                     <div className="flex items-center gap-6">
//                         <Link
//                             href={logo.url}
//                             className="flex items-center gap-2 relative w-35 h-10"
//                         >
//                             <Image src={logo.src} alt={logo.alt} fill />
//                         </Link>
//                         <div className="flex items-center">
//                             <NavigationMenu>
//                                 <NavigationMenuList>
//                                     {menu.map((item) => renderMenuItem(item))}
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </div>
//                     </div>
//                     <div className="flex gap-2">
//                         {user && (
//                             <Link
//                                 href={`/cart`}
//                                 className="relative mr-2 flex items-center justify-center"
//                             >
//                                 <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
//                                 <span className="absolute -right-2 -top-1 bg-primary text-white dark:text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                                     {totalCart}
//                                 </span>
//                             </Link>
//                         )}
//                         <ModeToggle />
//                         {user ? (
//                             <div className="flex gap-2">
//                                 <Button
//                                     onClick={handleLogout}
//                                     variant={`outline`}
//                                     size={`default`}
//                                     className="cursor-pointer"
//                                 >
//                                     Logout
//                                 </Button>
//                                 <div className="relative w-10 h-10">
//                                     <Image
//                                         src={
//                                             user.image ||
//                                             `https://img.daisyui.com/images/profile/demo/spiderperson@192.webp`
//                                         }
//                                         alt={user.name}
//                                         fill
//                                         className="rounded-full object-cover"
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <>
//                                 <Button
//                                     asChild
//                                     variant="outline"
//                                     size="default"
//                                 >
//                                     <Link href={auth.login.url}>
//                                         {auth.login.title}
//                                     </Link>
//                                 </Button>
//                                 <Button asChild size="default">
//                                     <Link href={auth.signup.url}>
//                                         {auth.signup.title}
//                                     </Link>
//                                 </Button>
//                             </>
//                         )}
//                     </div>
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className="block lg:hidden">
//                     <div className="flex items-center justify-between">
//                         {/* Logo */}
//                         <Link
//                             href={logo.url}
//                             className="flex items-center gap-2 relative w-10 h-10"
//                         >
//                             <Image src={logo.msrc} alt={logo.alt} fill />
//                         </Link>
//                         <div className="flex items-center gap-3">
//                             {user && (
//                                 <Link
//                                     href={`/cart`}
//                                     className="relative mr-2 flex items-center justify-center"
//                                 >
//                                     <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
//                                     <span className="absolute -right-2 -top-1 bg-primary text-white dark:text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                                         {totalCart}
//                                     </span>
//                                 </Link>
//                             )}
//                             <ModeToggle />
//                             <Sheet>
//                                 <SheetTrigger
//                                     asChild
//                                     className="cursor-pointer"
//                                 >
//                                     <Button variant="outline" size="icon">
//                                         <Menu className="size-4" />
//                                     </Button>
//                                 </SheetTrigger>
//                                 <SheetContent className="overflow-y-auto">
//                                     <SheetHeader>
//                                         <SheetTitle>
//                                             <a
//                                                 href={logo.url}
//                                                 className="flex items-center gap-2"
//                                             >
//                                                 <Image
//                                                     src={logo.src}
//                                                     className="max-h-8"
//                                                     alt={logo.alt}
//                                                     width={100}
//                                                     height={100}
//                                                 />
//                                             </a>
//                                         </SheetTitle>
//                                     </SheetHeader>
//                                     <div className="flex flex-col gap-6 p-4">
//                                         <Accordion
//                                             type="single"
//                                             collapsible
//                                             className="flex w-full flex-col gap-4"
//                                         >
//                                             {menu.map((item) =>
//                                                 renderMobileMenuItem(item),
//                                             )}
//                                         </Accordion>
//                                     </div>
//                                     <SheetFooter>
//                                         {user ? (
//                                             <Logout />
//                                         ) : (
//                                             <div className="flex flex-col gap-3">
//                                                 <Button
//                                                     asChild
//                                                     variant="outline"
//                                                 >
//                                                     <a href={auth.login.url}>
//                                                         {auth.login.title}
//                                                     </a>
//                                                 </Button>
//                                                 <Button asChild>
//                                                     <a href={auth.signup.url}>
//                                                         {auth.signup.title}
//                                                     </a>
//                                                 </Button>
//                                             </div>
//                                         )}
//                                     </SheetFooter>
//                                 </SheetContent>
//                             </Sheet>
//                             {user && (
//                                 <div className="relative w-8 h-8">
//                                     <Image
//                                         src={
//                                             user.image ||
//                                             `https://img.daisyui.com/images/profile/demo/spiderperson@192.webp`
//                                         }
//                                         alt={user.name || "User"}
//                                         fill
//                                         className="rounded-full object-cover"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const renderMenuItem = (item: MenuItem) => {
//     return (
//         <NavigationMenuItem key={item.title}>
//             <NavigationMenuLink
//                 href={item.url}
//                 className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//             >
//                 {item.title}
//             </NavigationMenuLink>
//         </NavigationMenuItem>
//     );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//     return (
//         <Link
//             key={item.title}
//             href={item.url}
//             className="text-md font-semibold"
//         >
//             {item.title}
//         </Link>
//     );
// };

// export { Navbar };

"use client";

import { Menu, ShoppingCart } from "lucide-react";
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
        { title: "Dashboard", url: `/dashboard/customer-dashboard` },
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

                        {user ? (
                            <div className="flex items-center gap-2 ml-1">
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    Logout
                                </Button>
                                <div className="relative w-8 h-8 ring-2 ring-white/60 dark:ring-white/20 rounded-full">
                                    <Image
                                        src={
                                            user.image ||
                                            "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                        }
                                        alt={user.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
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
                    <Link
                        href={logo.url}
                        className="relative w-9 h-9 shrink-0"
                    >
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
