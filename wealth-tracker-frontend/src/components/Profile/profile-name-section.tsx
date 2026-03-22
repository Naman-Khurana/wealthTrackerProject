import { Button } from "@/components/ui/button";

import { Subscription, User, UserSettings } from "@/type/commman";
type prop = {
    user: User;
    subscription: Subscription;
    userSettings: UserSettings;
}
export default function ProfileNameSection({ user, subscription, userSettings }: prop) {

    return (
        <main>
            <section className="flex justify-between p-5 bg-black/30 rounded-lg items-center">
                <section className="w-[20%] h-full flex flex-row gap-5 justify-start items-center">
                    <section className="w-20  h-20 rounded-full flex justify-center items-center shadow-md bg-white/20">
                        <div className="text-white text-5xl font-semibold ">{user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}</div>
                    </section>
                    <section className="flex flex-col gap-2">
                        <h1 className="text-white">{(user?.firstName ?? " ") + (user?.lastName ?? "")}</h1>
                        <div className="text-white/30 text-xs">{user?.email ?? "N/A"}</div>
                        <div className="text-blue-300 text-sm">{subscription?.active ? "Premium" : 'Free'}</div>
                    </section>
                </section>
                <section className="flex gap-2 items-center">

                    <Button variant="secondary" className="text-xs text-white font-normal h-6 bg-white/20">Edit Profile</Button>
                    <Button variant="secondary" className="text-xs text-white font-normal bg-white/20 h-6">Change Password</Button>
                    <Button className="bg-blue-600 h-6 text-xs font-normal">Upgrade Plan</Button>
                </section>
            </section>
        </main>
    )
}   