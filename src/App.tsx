import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Nav from './components/Nav'
import { Logo, Ribbon } from './components/Brand'
import { LINKS, SITE } from './data/config'

import Login from './pages/Login'
import Home from './pages/Home'
import Sessions from './pages/Sessions'
import SessionDetail from './pages/SessionDetail'
import Academics from './pages/Academics'
import Program from './pages/Program'
import Constructor from './pages/Constructor'
import Rewards from './pages/Rewards'
import Challenges from './pages/Challenges'
import Counselling from './pages/Counselling'
import Profile from './pages/Profile'
import Certificate from './pages/Certificate'

function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

function BackBar() {
  const { user } = useAuth()
  const loc = useLocation()
  const nav = useNavigate()
  if (!user) return null
  const top = ['/login', '/', '/sessions', '/academics', '/constructor', '/rewards', '/challenges', '/counselling', '/profile']
  if (top.includes(loc.pathname)) return null
  return (
    <div className="wrap">
      <div className="backbar">
        <button className="backbtn" onClick={() => nav(-1)}>← Back</button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Ribbon />
      <div className="wrap">
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Logo size={16} /> <span>· {SITE.tagline}</span></span>
        <span>
          <a href={LINKS.site} target="_blank" rel="noreferrer">constructor.university</a> · <a href={LINKS.apply} target="_blank" rel="noreferrer">Apply</a> · <a href={LINKS.meetUs} target="_blank" rel="noreferrer">Meet us virtually</a>
        </span>
        <span>© {new Date().getFullYear()} Constructor University Bremen · Constructing the future</span>
      </div>
    </footer>
  )
}

export default function App() {
  const { user } = useAuth()
  return (
    <div className="app">
      <ScrollToTop />
      <Nav />
      <main className="app-main" style={!user ? { padding: 0 } : undefined}>
        <BackBar />
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/" element={<Protected><Home /></Protected>} />
          <Route path="/sessions" element={<Protected><Sessions /></Protected>} />
          <Route path="/sessions/:id" element={<Protected><SessionDetail /></Protected>} />
          <Route path="/academics" element={<Protected><Academics /></Protected>} />
          <Route path="/academics/:school" element={<Protected><Academics /></Protected>} />
          <Route path="/academics/:school/:slug" element={<Protected><Program /></Protected>} />
          <Route path="/constructor" element={<Protected><Constructor /></Protected>} />
          <Route path="/rewards" element={<Protected><Rewards /></Protected>} />
          <Route path="/challenges" element={<Protected><Challenges /></Protected>} />
          <Route path="/counselling" element={<Protected><Counselling /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/certificate/:school" element={<Protected><Certificate /></Protected>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  )
}

function NotFound() {
  return (
    <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ display: 'inline-block' }}><Logo size={26} /></div>
      <h1 className="page-title" style={{ marginTop: 20 }}>Not on the map</h1>
      <p className="page-sub" style={{ margin: '12px auto 0' }}>This page does not exist. Head back to the sessions.</p>
    </div>
  )
}
