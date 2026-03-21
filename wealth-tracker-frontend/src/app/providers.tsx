"use client";

import { AuthProvider } from "@/context/auth-context";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { ModalProvider } from "@/context/model-context";
import ModalRenderer from "@/components/global/modal-renderer";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <AuthProvider>
                <ModalProvider>
                    {children}
                    <ModalRenderer />

                </ModalProvider>

            </AuthProvider>
        </ReactQueryProvider>
    );
}