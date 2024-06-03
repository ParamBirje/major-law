// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Navbar from "./components/navbar";
import Chat from "./components/chat";

function App() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-10">
      <Navbar />

      <section id="hero">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
          Let&apos;s rethink <br />
          legal work.
        </h1>
        <p className="w-2/4 text-muted-foreground text-lg mt-8">
          A.I powered legal assistant that provides a centralized, easily accessible knowledge base
          for all your legal paperwork and public sources.
        </p>
      </section>

      <Chat />
    </main>
  );
}

export default App;
