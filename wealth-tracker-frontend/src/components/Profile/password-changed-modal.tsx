"use client";

import { ShieldCheck } from "lucide-react";
import Modal from "../comman/ui/modal";
import { useRouter } from "next/navigation";

type Props = {
    closePasswordChangedModal: () => void;
    isOpen: boolean;
    title: string;
    message: string;
    variant?: "success" | "error";
};

export default function PasswordChangedModal({
    closePasswordChangedModal,
    isOpen,
    title,
    message,
    variant = "success",
}: Props) {
    const router = useRouter();

    const handleOk = () => {
        closePasswordChangedModal();

        if (variant === "success") {
            router.push("/login");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closePasswordChangedModal}
            title={title}
            subtitle="Profile"
            width="max-w-sm"
        >
            <div className="flex flex-col items-center gap-6 py-2">

                <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl"
                    style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <ShieldCheck
                        size={28}
                        style={{
                            color:
                                variant === "error"
                                    ? "rgba(255,120,120,0.8)"
                                    : "rgba(255,255,255,0.75)",
                        }}
                    />
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-base font-semibold text-white">
                        {title}
                    </p>
                    <p className="text-sm text-white/40">
                        {message}
                    </p>
                </div>

                <div className="w-full" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                <button
                    type="button"
                    onClick={handleOk}
                    className="w-full rounded-2xl py-3 text-sm font-semibold text-white"
                    style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.18)",
                    }}
                >
                    OK
                </button>
            </div>
        </Modal>
    );
}