import DarkModeToggle from '@/components/header/DarkModeToggle'
import Brand from '@/components/header/Brand'

export default function Header() {
  return (
      <div className="z-10 flex items-center justify-between w-full pt-6 pb-3 pl-4 pr-6 font-mono text-sm border-b border-b-violet-700">
        <Brand />
        <DarkModeToggle />
      </div>
    )
}