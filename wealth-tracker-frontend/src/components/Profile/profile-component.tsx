import ProfileNameSection from "./profile-name-section";
import ProfilePersonalDetailsSection from "./profile-personal-details-section";
import ProfileSubSectoinsTemplate from "./profile-subsections-template";

type ProfileSubsectionDateType = {
    heading : string,
    attribute1: {
        key: string;
        value: string;
    };
    attribute2: {
        key: string;
        value: string;
    };
    attribute3: {
        key: string;
        value: string; // or Date if you prefer
    };
};

const personalDetails: ProfileSubsectionDateType = {
    heading: "Personal Details",
    attribute1: { key: "First Name", value: "Naman" },
    attribute2: { key: "Last Name", value: "Khurana" },
    attribute3: { key: "Phone", value: "N/A" }
};

const securityDetails: ProfileSubsectionDateType = {
    heading: "Security",
    attribute1: { key: "Email", value: "naman@email.com" },
    attribute2: { key: "Last Login", value: "2nd July 2025" },
    attribute3: { key: "2FA Status", value: "Coming Soon" }
};

const financialPreferences: ProfileSubsectionDateType = {
    heading: "Financial Preferences",
    attribute1: { key: "Default Currency", value: "₹ INR" },
    attribute2: { key: "Budget Reset Day", value: "1st of Month" },
    attribute3: { key: "Category View", value: "All" }
};

const subscriptionInfo: ProfileSubsectionDateType = {
    heading: "Subscription Info",
    attribute1: { key: "Current Plan", value: "Free" },
    attribute2: { key: "Renewal Date", value: "N/A" },
    attribute3: { key: "Billing History", value: "None" }
};





export default function ProfileComponent(){
    return(
        <main className="flex flex-col gap-3 pt-5">
            <div className="text-2xl font-semibold text-white">Profile</div>
            <ProfileNameSection/> 
            <section className="grid grid-cols-2 gap-4">
                <ProfileSubSectoinsTemplate {...personalDetails}/>
                <ProfileSubSectoinsTemplate {...securityDetails}/>
                <ProfileSubSectoinsTemplate {...financialPreferences}/>
                <ProfileSubSectoinsTemplate {...subscriptionInfo}/>

            </section>   
        </main>
    )
}