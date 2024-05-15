'use client'

import { useUser } from '@clerk/nextjs'

export function WelcomeMsg() {
  const { user, isLoaded } = useUser()

  return (
    <div>
      <h2 className="text-2xl font-medium text-white lg:text-4xl">
        Welcome Back{isLoaded ? ', ' : ' '} {user?.firstName} 💰
      </h2>
      <p className="text-sm text-[#89B6FD] lg:text-base">
        This is your Financial Overview Report
      </p>
    </div>
  )
}
