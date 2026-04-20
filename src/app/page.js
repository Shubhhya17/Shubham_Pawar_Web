import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Skills from "@/components/Skills";
import Social from "@/components/Social";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import Home from "@/components/Landing";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import TerminalModal from "@/components/TerminalModal";
import AOSInit from "@/components/AOSInit";

export default function Page() {
  return (
    <>
      <AOSInit />
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Skills />
      <Social />
      <Experience />
      <Certificates />
      <Testimonials />
      <StatsSection />
      <Contact />
      <Footer />
      <ChatBot />
      <TerminalModal />
    </>
  );
}
