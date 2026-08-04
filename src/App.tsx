import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { useVisitorPing } from '@/hooks/useVisitorPing'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { RecruiterMode } from '@/components/RecruiterMode'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { OpenSource } from '@/components/sections/OpenSource'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'

function App() {
  const [recruiterOpen, setRecruiterOpen] = useState(false)
  useVisitorPing()

  return (
    <div className="relative">
  <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(91,108,255,0.18),transparent_70%)]" />

      <Nav onOpenRecruiter={() => setRecruiterOpen(true)} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />

      <RecruiterMode open={recruiterOpen} onClose={() => setRecruiterOpen(false)} />
      <Analytics
        beforeSend={(event) => (new URL(event.url).pathname === '/' ? event : null)}
      />
    </div>
  )
}

export default App
