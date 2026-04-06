import { getUser } from "../../actions/user.action";
import Footer from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/navbar";
import { User } from "../../types";

export default async function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data } = await getUser();
    const user: User = data?.user;

    return (
        <div>
            <Navbar user={user} />
            <div className="min-h-[calc(100vh-434px)]">{children}</div>
            <Footer />
        </div>
    );
}
