function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white" />
      <div className="max-w-6xl mx-auto px-4 py-20 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb  -4">New</div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">Dokumen Pintar</h1>
            <p className="mt-4 text-lg text-gray-600">An AI-powered platform for intelligent document management and a beautiful company profile that showcases your product apps.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#documents" className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700">Try AI Documents</a>
              <a href="#products" className="bg-gray-900 text-white px-5 py-2.5 rounded-md hover:bg-black">View Products</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 h-52 w-52 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-indigo-200/50 blur-3xl" />
            <div className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200/50" />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">Smart previews and AI summaries for your documents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
