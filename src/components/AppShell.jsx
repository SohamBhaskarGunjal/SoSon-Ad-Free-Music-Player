import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import MusicPlayer from './MusicPlayer'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/playlists', label: 'Playlists' },
  { to: '/artists', label: 'Artists' },
  { to: '/favorites', label: 'Favorites' },
]

const AppShell = ({ playerProps }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="top-nav glass-card">
        <div className="logo-block">
          <strong>SoSon</strong>
          <span>Sound Without Limits.</span>
        </div>
        <button type="button" className="mobile-toggle" onClick={() => setMobileOpen((value) => !value)}>
          ☰
        </button>
        <nav className={mobileOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <MusicPlayer {...playerProps} />
    </div>
  )
}

export default AppShell
