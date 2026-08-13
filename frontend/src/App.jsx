import ResumeUpload from "./components/upload/ResumeUpload";


function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold tracking-tight">
              ResumeIQ
            </p>

            <p className="mt-1 text-sm text-slate-500">
              AI-powered resume analysis
            </p>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-16">
          <ResumeUpload />
        </section>
      </div>
    </main>
  );
}

export default App;