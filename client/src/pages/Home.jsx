import Navbar from "../nav-foot/Navbar";
import Footer from "../nav-foot/Footer";
import Hero from "../components/Hero";
import Services from "../components/Service";
import AboutUs from "../components/AboutUs";
import Box from "../components/Box";
import TestimonialsSection from "../components/Testimonials";
import FAQ from "../components/FAQSection";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <Box />
      <TestimonialsSection />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;