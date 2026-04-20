import Navbar from "@/components/Navbar"
import ScrollTop from "@/components/ScrollTop"
import About from "@/components/About"
import Certificates from "@/components/Certificates"
import Skills from "@/components/Skills"
import Social from "@/components/Social"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import ChatBot from "@/components/ChatBot"
import Home from "@/components/Landing"
import AOSInit from "@/components/AOSInit"

export default function Page() {
  return (
    <>
      <AOSInit />
      <Navbar />
      <ScrollTop />
      <Home />
      <About />
      <Certificates />
      <Skills />
      <Social />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ChatBot />
    </>
  )
}