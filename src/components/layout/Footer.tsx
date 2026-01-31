import Link from "next/link";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/l.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="shadow-xl border-t-2 pb-5">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1: Brand Info */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 mb-2"
                        >
                            <div className="relative w-10 h-10">
                                <Image
                                    src={logo}
                                    alt="PharmaTrust Logo"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 40px, 40px"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                PharmaTrust
                            </h2>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your trusted partner in health and wellness. We
                            provide genuine medicines, expert advice, and fast
                            delivery to your doorstep.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink
                                href="#"
                                icon={<Facebook size={20} />}
                            />
                            <SocialLink href="#" icon={<Twitter size={20} />} />
                            <SocialLink
                                href="#"
                                icon={<Instagram size={20} />}
                            />
                            <SocialLink
                                href="#"
                                icon={<Linkedin size={20} />}
                            />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/medicines">Medicines</FooterLink>
                            <FooterLink href="/dashboard">Dashboard</FooterLink>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">
                            Popular Categories
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/category/pain-relief">
                                Pain Relief
                            </FooterLink>
                            <FooterLink href="/category/vitamins">
                                Vitamins & Supplements
                            </FooterLink>
                            <FooterLink href="/category/antibiotics">
                                Antibiotics
                            </FooterLink>
                            <FooterLink href="/category/skin-care">
                                Skin Care
                            </FooterLink>
                            <FooterLink href="/category/baby-care">
                                Baby & Child
                            </FooterLink>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">
                            Contact Us
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>
                                    H-352, Amirabad, Nalchity, Jhalakathi, Barisal - 8200
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+880 1764 447574</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>syedmohiuddinmeshal24@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                <p>© {currentYear} PharmaTrust. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link
                        href="/privacy"
                        className="hover:text-white transition-colors"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms"
                        className="hover:text-white transition-colors"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        href="/cookies"
                        className="hover:text-white transition-colors"
                    >
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 inline-flex items-center gap-1"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300"
        >
            {icon}
        </Link>
    );
}
