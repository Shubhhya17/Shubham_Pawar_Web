import Navbar from "@/components/Navbar"
import ScrollTop from "@/components/ScrollTop"
import About from "@/components/About"
import Certificates from "@/components/Certificates"
import Skills from "@/components/Skills"
import Social from "@/components/Social"
import Career from "@/components/Career"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import ChatBot from "@/components/ChatBot"
import Home from "@/components/Landing"

export default function Page() {
  return (
    <>
      <Navbar />
      <ScrollTop />
      <Home />
      <About />
      <Certificates />
      <Skills />
      <Social />
      <Career />
      <Projects />
      <Contact />
      <Footer />
      <ChatBot />
    </>
  )
}