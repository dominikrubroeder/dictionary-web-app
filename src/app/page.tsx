export default function Home() {
  return (
    <main className="">
      <section className="flex gap-4 justify-between">
          <div className="grid gap-2">
              <h1 className="text-6xl font-bold">keyboard</h1>
              <small className="text-purple-400">phonetic</small>
          </div>
          <button className="bg-purple-100 flex items-center justify-center p-4 rounded-full w-20 h-20 text-purple-600">P</button>
      </section>
    </main>
  )
}
