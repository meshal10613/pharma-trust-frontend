import Link from "next/link";
import { Button } from "../components/ui/button";

export default function AppPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 min-h-screen">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href={`/`}>
                <Button className="cursor-pointer">Return Home</Button>
            </Link>
        </div>
    );
}
