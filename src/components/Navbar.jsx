import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">DP</div>
          <span className="font-semibold text-gray-800">Dokumen Pintar</span>
        </a>
        <nav className={`md:flex items-center gap-6 ${open ? 'block' : 'hidden'} md:block`}>
          <a href="#company" className="text-gray-600 hover:text-gray-900">Company</a>
          <a href="#products" className="text-gray-600 hover:text-gray-900">Products</a>
          <a href="#documents" className="text-gray-600 hover:text-gray-900">Documents</a>
          <a href="/test" className="text-gray-600 hover:text-gray-900">System Test</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Toggle Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar
