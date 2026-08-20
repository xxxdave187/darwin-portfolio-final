import { useCallback, useState } from "react";
import KatanaLoader from "./components/KatanaLoader";
import SakuraCanvas from "./components/SakuraCanvas";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const finishLoading = useCallback(() => setLoaded(true), []);

  return (
    <div className="min-h-screen bg-[#070707] text-[#e8e2d5]">
      {!loaded && <KatanaLoader onDone={finishLoading} />}
      {loaded && <SakuraCanvas />}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
