import { useEffect, useState } from 'react'

function ProductsSection() {
  const [products, setProducts] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/products`).then(r => r.json()).then(setProducts).catch(() => setProducts([]))
  }, [])

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Product Apps</h2>
      <p className="text-gray-600 mt-1">List of apps your company offers.</p>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-3 bg-white p-6 rounded-lg border border-dashed border-gray-300 text-gray-600">
            No products yet. Use the form to add your apps.
          </div>
        ) : (
          products.map((p, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="h-10 w-10 rounded-md bg-blue-600/10 text-blue-700 flex items-center justify-center font-semibold mb-3">{p.name?.[0] || 'A'}</div>
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              {p.short_description && <p className="text-gray-600 mt-1 text-sm">{p.short_description}</p>}
              {p.website && <a className="text-blue-600 text-sm mt-2 inline-block" href={p.website} target="_blank">Visit</a>}
            </div>
          ))
        )}
      </div>
      <ProductForm onCreated={() => fetch(`${baseUrl}/api/products`).then(r => r.json()).then(setProducts)} />
    </section>
  )
}

function ProductForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', short_description: '', website: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${baseUrl}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setForm({ name: '', short_description: '', website: '' })
      onCreated?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800">Add Product App</h4>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <input className="border rounded-md p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="border rounded-md p-2" placeholder="Short Description" value={form.short_description} onChange={e => setForm({ ...form, short_description: e.target.value })} />
        <input className="border rounded-md p-2" placeholder="Website URL" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
      </div>
      <button disabled={loading} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60">{loading ? 'Adding...' : 'Add Product'}</button>
    </form>
  )
}

export default ProductsSection
