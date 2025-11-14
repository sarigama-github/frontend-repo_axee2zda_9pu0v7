import { useEffect, useState } from 'react'

function DocumentsSection() {
  const [docs, setDocs] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/documents`).then(r => r.json()).then(setDocs).catch(() => setDocs([]))
  }, [])

  return (
    <section id="documents" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Intelligent Documents</h2>
      <p className="text-gray-600 mt-1">Store documents and get AI summaries instantly.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {docs.length === 0 ? (
          <div className="col-span-2 bg-white p-6 rounded-lg border border-dashed border-gray-300 text-gray-600">
            No documents yet. Add a new one below.
          </div>
        ) : (
          docs.map((d, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{d.title}</h3>
              <p className="text-gray-600 mt-2 whitespace-pre-line line-clamp-5">{d.content}</p>
              {d.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {d.tags.map((t, idx) => <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">{t}</span>)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <DocumentForm onCreated={() => fetch(`${baseUrl}/api/documents`).then(r => r.json()).then(setDocs)} />
    </section>
  )
}

function DocumentForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ title: '', content: '', tags: '' })
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { title: form.title, content: form.content, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] }
      await fetch(`${baseUrl}/api/documents`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setForm({ title: '', content: '', tags: '' })
      onCreated?.()
      // naive AI summary (client-side heuristic for demo)
      const sentences = payload.content.split(/(?<=[.!?])\s+/).slice(0,2)
      setSummary(sentences.join(' '))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800">Add Document</h4>
      <div className="grid gap-4 mt-4">
        <input className="border rounded-md p-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <textarea className="border rounded-md p-2 h-32" placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        <input className="border rounded-md p-2" placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
      </div>
      <button disabled={loading} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60">{loading ? 'Saving...' : 'Save Document'}</button>
      {summary && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-800">
          <span className="font-semibold">AI summary:</span> {summary}
        </div>
      )}
    </form>
  )
}

export default DocumentsSection
