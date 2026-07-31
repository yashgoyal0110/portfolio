import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

/**
 * Both routes are code-split: visitors to the freelance page never download the
 * 3D hero bundle, and vice-versa.
 */
const App = lazy(() => import('./App'))
const FreelanceProjects = lazy(() => import('./pages/FreelanceProjects'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
        <Routes>
          <Route path="/" element={<App />} />
          {/* Unlisted: reachable by direct link only, never linked from the UI. */}
          <Route path="/freelancing/projects" element={<FreelanceProjects />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
