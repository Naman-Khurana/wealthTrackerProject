"use client"

import Link from "next/link";
import { AnimatedBackground } from "../../../components/motion-primitives/animated-background";
import { usePathname } from "next/navigation";

export default function Menu() {

  const pathname = usePathname();

  const menuFields = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Expenses", route: "/expenses" },
    { name: "Earnings", route: "/earnings" },
    { name: "Profile", route: "/profile" },
  ];

  const activeRoute =
    menuFields.find((field) => pathname.startsWith(field.route))?.route ??
    menuFields[0].route;

  return (
    <div className="rounded-[8px] p-[2px] dark:bg-zinc-800 flex flex-col gap-2">
      <AnimatedBackground
        key={activeRoute}
        defaultValue={activeRoute}
        className="rounded-lg bg-white"
        transition={{
          ease: "easeInOut",
          duration: 0.2,
        }}
      >
        {menuFields.map((field) => {
          const isActive = activeRoute === field.route;

          return (
            <Link
              key={field.route}
              href={field.route}
              data-id={field.route}
              className={`inline-flex w-28 items-center justify-center text-center transition-transform active:scale-[0.98]
      ${isActive ? "text-black" : "text-white dark:text-zinc-50"}`}
            >
              {field.name}
            </Link>
          );
        })}
      </AnimatedBackground>
    </div>
  );
}