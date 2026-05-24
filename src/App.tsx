import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import GaragePage from './pages/GaragePage'
import WinnersPage from './pages/WinnersPage'

function App(): JSX.Element {
  return (
    <div className="app">
      <header className="app__header">
        <span className="app__logo">Async Race</span>
        <nav className="app__nav" aria-label="Main navigation">
          <NavLink to="/garage">Garage</NavLink>
          <NavLink to="/winners">Winners</NavLink>
        </nav>
      </header>

      <main className="app__content">
        <Routes>
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="*" element={<Navigate to="/garage" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
