"use client"

import { LogOut, User, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogout } from "../earnings/earnings-api-fetcher"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
export default function Navbar() {
  const { user} = useAuth();
  const logoutMutation = useLogout();
  const router = useRouter()
  return (
    <header className="flex h-full items-center justify-between border-b border-border bg-black px-6">

      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-foreground text-white">Wealth Tracker</h1>
      </div>

      {/* Right Section - Profile & Logout */}
      <div className="flex items-center gap-3">
        {/* Logout Button */}
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => logoutMutation.mutate()}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2  text-white hover:text-black">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="">{user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}</AvatarFallback>

              </Avatar>
              <span className="text-sm  hidden sm:inline-block ">Profile</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => { router.push('/profile') }}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => logoutMutation.mutate()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
