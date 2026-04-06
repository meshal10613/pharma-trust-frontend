import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
	return redirect("/admin-dashboard/dashboard");
}