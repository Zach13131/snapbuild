import { useEffect, useState } from "react";
import { Audiences } from "./components/Audiences";
import { Compare } from "./components/Compare";
import { Contact } from "./components/Contact";
import { CookieBanner } from "./components/CookieBanner";
import { Cta } from "./components/Cta";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Implementation } from "./components/Implementation";
import { Logos } from "./components/Logos";
import { Playground } from "./components/Playground";
import { Pricing } from "./components/Pricing";
import { Process } from "./components/Process";
import { Roadmap } from "./components/Roadmap";
import { Security } from "./components/Security";
import { Testimonials } from "./components/Testimonials";
import { UseCases } from "./components/UseCases";
import { useLandingScroll } from "./landingHash";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useLandingScroll();

  return (
    <>
      <Header onMenuOpenChange={setMenuOpen} />
      <main>
        <Hero />
        <Logos />
        <Process />
        <UseCases />
        <DesktopPlayground />
        <Audiences />
        <Compare />
        <Security />
        <Implementation />
        <Roadmap />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
        <Cta />
      </main>
      <Footer />
      <CookieBanner menuOpen={menuOpen} />
    </>
  );
}

function DesktopPlayground() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 800px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 800px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!desktop) return null;
  return <Playground />;
}
