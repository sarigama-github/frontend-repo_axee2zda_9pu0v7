import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CompanySection from './components/CompanySection'
import ProductsSection from './components/ProductsSection'
import DocumentsSection from './components/DocumentsSection'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <CompanySection />
      <ProductsSection />
      <DocumentsSection />
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dokumen Pintar. All rights reserved.</p>
          <a href="/test" className="text-blue-600">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
