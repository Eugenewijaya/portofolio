import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
