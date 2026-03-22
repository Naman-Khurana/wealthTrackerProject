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
    <main className="w-full h-full ">
      <div className="h-[5%]"></div>
      <div className="rounded-[8px]  h-[95%] w-full flex flex-col gap-2 items-center py-[5%]">
        <AnimatedBackground
          key={activeRoute}
          defaultValue={activeRoute}
          className="rounded-2xl bg-white p-[2px]"
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
                className={`inline-flex w-35 h-10 items-center justify-center text-center transition-transform active:scale-[0.98]
      ${isActive ? "text-black" : "text-white dark:text-zinc-50"}`}
              >
                {field.name}
              </Link>
            );
          })}
        </AnimatedBackground>
      </div>
    </main>
  );
}