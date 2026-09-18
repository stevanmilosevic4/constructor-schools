import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Logo } from './Brand'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/sessions', label: 'Sessions' },
  { to: '/academics', label: 'Academics' },
  { to: '/constructor', label: 'Why Constructor' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/counselling', label: 'Talk to us' },
]

export default function Nav() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  if (!user) return null
  const initials = user.name.trim().slice(0, 1).toUpperCase()

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <NavLink to="/" className="brand">
          <Logo size={24} />
          <small className="hide-sm">Schools</small>
        </NavLink>

        <div className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-user">
          <NavLink to="/profile" className="nav-profile" title="Profile, progress & certificate">
            <div className="avatar">{initials}</div>
            <div className="hide-sm">
              <div className="nav-name">{user.name}</div>
              <div className="nav-role">{user.role === 'counselor' ? 'Counselor' : `Student · ${user.school}`}</div>
            </div>
          </NavLink>
          <button className="icon-btn" title="Sign out" onClick={() => { logout(); nav('/login') }}>⎋</button>
          <button className="icon-btn mobile-toggle" onClick={() => setOpen((o) => !o)} title="Menu">{open ? '✕' : '≡'}</button>
        </div>
      </div>
    </nav>
  )
}
