import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";

import { Subscription, User, UserSettings } from "@/type/commman";
import { useModal } from "@/context/model-context";
    type prop = {
        user: User;
        subscription: Subscription;
        userSettings: UserSettings;
    }
export default function ProfileNameSection({ user, subscription, userSettings }: prop) {

    const { openModal } = useModal()

    return (
        <main>
            <section className="flex justify-between p-5 bg-black/30 rounded-lg items-center">
                <section className=" h-full flex flex-row gap-5 justify-start items-center">
                    <section className="w-20  h-20 rounded-full flex justify-center items-center shadow-md bg-white/20">
                        <div className="text-white text-5xl font-semibold ">{user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}</div>
                    </section>
                    <section className="flex flex-col gap-2 px-1">
                        <h1 className="text-3xl font-bold text-white ">{((capitalize(user?.firstName ?? " ")) ) + " " +  capitalize((user?.lastName ?? ""))}</h1>
                        <div className="text-white/30 text-s text-white/80 pb-1">{user?.email ?? "N/A"}</div>
                        <div className="inline-block self-start px-3 py-1 bg-blue-600/20 text-blue-600 rounded-full text-xs font-medium">
                            {subscription?.active ? "Premium" : 'Free'} Plan
                        </div>
                        
                    </section>
                </section>
                <section className="flex gap-2 items-center">

                    <Button variant="secondary" className="text-xs text-white font-normal h-6 bg-white/20" onClick={() => openModal("editProfile")}>Edit Profile</Button>
                    <Button variant="secondary" className="text-xs text-white font-normal bg-white/20 h-6" onClick={() => openModal("changePassword")}>Change Password</Button>
                    <Button className="bg-blue-600 h-6 text-xs font-normal" onClick={() => openModal("upgradePlan")}>Upgrade Plan</Button>
                </section>
            </section>
        </main>
    )
}   