import appIcon from '../assets/logo.svg'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={appIcon} alt="" />
      <nav className="flex items-center gap-5">
        <a href="#" className="text-sm font-medium text-zinc-300">
          Events
        </a>
        <a href="#" className="text-sm font-medium">
          Participants
        </a>
      </nav>
    </header>
  )
}
