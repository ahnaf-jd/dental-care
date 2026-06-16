import Navbar from "../nav-foot/Navbar";
import Footer from "../nav-foot/Footer";
import Hero from "../components/Hero";
import Services from "../components/Service";
import AboutUs from "../components/AboutUs";
import Box from "../components/Box";
import TestimonialsSection from "../components/Testimonials";
import FAQ from "../components/FAQSection";
import BlogSection from "../components/BlogSection";
import Contact from "../components/ContactSection";
import Appointment from "../components/AppointmentBanner";
import Gallery from "../components/Gallery";
import ScrollToTopButton from "../styles/ScrollToTopButton";
import { SiteContentProvider } from "../context/SiteContentContext";


function Home() {
  return (
    <SiteContentProvider>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <AboutUs />
      <Box />
      <TestimonialsSection />
      <Gallery />
      <div style={{ height: "60px", background: "#ffffff" }}></div>
      <FAQ />
      <div id="blog">
        <BlogSection />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </SiteContentProvider>
  );
}

export default Home;