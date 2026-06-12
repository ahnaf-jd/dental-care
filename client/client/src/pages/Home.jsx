import Navbar from "../nav-foot/Navbar";
import Footer from "../nav-foot/Footer";
import Hero from "../components/Hero";
import Services from "../components/Service";
import AboutUs from "../components/AboutUs";
import Box from "../components/Box";
import TestimonialsSection from "../components/Testimonials";
import FAQ from "../components/FAQSection";
import DentalL from "../components/DentalHero";
import BlogSection from "../components/BlogSection";
import Contact from "../components/ContactSection";
import Appointment from "../components/AppointmentBanner";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <Box />
      <TestimonialsSection />
      <Appointment />
      <FAQ />
      <BlogSection />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;