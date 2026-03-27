"use client";

import { useRef, useState } from "react";
import { KeyRound, Key } from "lucide-react";
import Modal from "../comman/ui/modal"; // shared modal
import { useModal } from "@/context/model-context";
import { useChangePassword } from "./profile-api-section";

// ── Field Input ──────────────────────────────────────────────────────────────
function FieldInput({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200"
      style={{
        background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: focused
          ? "1px solid rgba(255,255,255,0.22)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: focused ? "0 0 0 3px rgba(255,255,255,0.04)" : "none",
      }}
    >
      <Icon
        size={16}
        style={{
          color: focused ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
          flexShrink: 0,
        }}
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/25"
        style={{
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Sora', sans-serif",
        }}
      />
    </div>
  );
}


type FormState = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  closeChangePasswordModal: () => void;
  isOpen: boolean;
};


export default function ChangePasswordModal({ closeChangePasswordModal: closeChangePasswordModal, isOpen }: Props) {
  const changePasswordMutation= useChangePassword();
  const submitLockRef = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [form, setForm] = useState<FormState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const { openModal } = useModal()

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitLockRef.current || isPending || changePasswordMutation.isPending) {
      return;
    }


    // check empty
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    // check new passwords match
    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    submitLockRef.current = true;
    setIsPending(true);

    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      closeChangePasswordModal();
      openModal("passwordChangedSuccess");
    } catch {
      closeChangePasswordModal();
      openModal("passwordChangedError");
    } finally {
      submitLockRef.current = false;
      setIsPending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeChangePasswordModal}
      title="Change Password"
      subtitle="Account"
      width="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <FieldInput
          icon={KeyRound}
          placeholder="Old Password"
          type="password"
          value={form.oldPassword}
          onChange={(v) => handleChange("oldPassword", v)}
        />

        <FieldInput
          icon={Key}
          placeholder="New Password"
          type="password"
          value={form.newPassword}
          onChange={(v) => handleChange("newPassword", v)}
        />

        <FieldInput
          icon={Key}
          placeholder="Confirm Password"
          type="text"
          value={form.confirmPassword}
          onChange={(v) => handleChange("confirmPassword", v)}
        />

        <div className="flex gap-3 mt-3">
          {/* Cancel */}
          <button
            type="button"
            onClick={closeChangePasswordModal}
            className="flex-1 rounded-2xl py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Sora', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-2xl py-3 text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: isPending ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: isPending ? "none" : "0 8px 24px -8px rgba(0,0,0,0.4)",
              fontFamily: "'Sora', sans-serif",
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isPending) {
                e.currentTarget.style.background = "rgba(255,255,255,0.17)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isPending) {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              }
            }}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}