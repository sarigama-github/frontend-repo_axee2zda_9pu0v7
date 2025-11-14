import { useEffect, useState } from 'react'

function CompanySection() {
  const [company, setCompany] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/company`).then(r => r.json()).then(setCompany).catch(() => setCompany([]))
  }, [])

  return (
    <section id="company" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
      <p className="text-gray-600 mt-1">High-level overview of your brand and mission.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {company.length === 0 ? (
          <div className="col-span-2 bg-white p-6 rounded-lg border border-dashed border-gray-300 text-gray-600">
            No profile yet. Use the form to add your company details.
          </div>
        ) : (
          company.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">{c.name}</h3>
              {c.tagline && <p className="text-blue-700 font-medium mt-1">{c.tagline}</p>}
              {c.description && <p className="text-gray-600 mt-2">{c.description}</p>}
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
                {c.mission && <p><span className="font-semibold text-gray-800">Mission:</span> {c.mission}</p>}
                {c.vision && <p><span className="font-semibold text-gray-800">Vision:</span> {c.vision}</p>}
                {c.email && <p><span className="font-semibold text-gray-800">Email:</span> {c.email}</p>}
                {c.phone && <p><span className="font-semibold text-gray-800">Phone:</span> {c.phone}</p>}
                {c.website && <p className="truncate"><span className="font-semibold text-gray-800">Website:</span> <a className="text-blue-600" href={c.website} target="_blank">{c.website}</a></p>}
              </div>
            </div>
          ))
        )}
      </div>
      <CompanyForm onCreated={() => fetch(`${baseUrl}/api/company`).then(r => r.json()).then(setCompany)} />
    </section>
  )
}

function CompanyForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', tagline: '', description: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${baseUrl}/api/company`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setForm({ name: '', tagline: '', description: '' })
      onCreated?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800">Add Company Info</h4>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <input className="border rounded-md p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="border rounded-md p-2" placeholder="Tagline" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
        <input className="border rounded-md p-2 md:col-span-3" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      </div>
      <button disabled={loading} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60">{loading ? 'Saving...' : 'Save Company'}</button>
    </form>
  )
}

export default CompanySection
