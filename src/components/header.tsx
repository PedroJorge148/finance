import { Loader2 } from 'lucide-react'
import { Filters } from '@/components/filters'
import { HeaderLogo } from '@/components/header-logo'
import { Navigation } from '@/components/navigation'
import { WelcomeMsg } from '@/components/welcome-msg'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14">
      <div className="mx-auto max-w-screen-2xl space-y-2">
        <div className="mb-14 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  )
}
