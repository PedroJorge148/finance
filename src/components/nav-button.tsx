import Link from 'next/link'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface NavButtonProps {
  href: string
  label: string
  isActive: boolean
}

export function NavButton({ href, label, isActive }: NavButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        'w-full justify-between border-none font-normal text-white outline-none hover:bg-white/20 focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto',
        isActive ? 'bg-white/10 text-white' : 'bg-transparent',
      )}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}
