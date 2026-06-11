import Navbar from "../nav-foot/Navbar";
import Footer from "../nav-foot/Footer";
import Hero from "../components/Hero";
import Services from "../components/Service";
import AboutUs from "../components/AboutUs";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <Footer />
    </>
  );
}

export default Home;