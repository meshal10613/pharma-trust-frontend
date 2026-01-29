import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../../../components/ui/card";
import { userService } from "../../../../../services/user.service";
import { Badge } from "../../../../../components/ui/badge";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { User } from "../../../../../types";

export default async function MyProfile() {
    const { data, error } = await userService.getMyProfile();
    if (error) return <h1>{error.message}</h1>;
    if (!data) return <h1>Loading...</h1>;
    const user: User = data.data;

    return (
        <>
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
                                    alt={user.name}
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
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Input defaultValue={user.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input value={user.email} disabled />
                            </div>

                            <div className="grid gap-2">
                                <Label>Image</Label>
                                <Input value={user.image ?? ""} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Phone</Label>
                                <Input
                                    defaultValue={user.phone ?? ""}
                                    placeholder="Add phone"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Input value={user.status} disabled />
                            </div>

                            <Button className="w-full cursor-pointer">
                                Update Profile
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* <h2 className="text-2xl font-semibold mb-5">Update Password</h2> */}
        </>
    );
}
