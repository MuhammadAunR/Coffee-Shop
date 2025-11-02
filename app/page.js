import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Guest from "@/components/Guest";
import ImageCarousel from "@/components/ImageCarousel";
import Navbar from "@/components/Navbar";
import OurMenu from "@/components/OurMenu";

export default function Home() {
  return (
    <>
      <main className="2xl:w-[1521px] mx-auto">
        <section id="home" className="hero-section min-h-screen relative">
          <ImageCarousel />
          <Navbar />
        </section>
        <section id="menu" className="section-3 min-h-screen relative bg-olivine">
          <OurMenu />
        </section>
        <section id="aboutUs" className="section-2 min-h-screen bg-tea-green">
          <AboutUs />
        </section>
        <section className="section-4">
          <Gallery />
        </section>
        <section id="" className="section-5 min-h-screen bg-tea-green">
          <Guest />
        </section>
        <section id="contactUs" className="section-6 min-h-screen">
          <ContactUs />
        </section>
        <section className="section-7 min-h-[60vh] bg-black/85">
          <Footer />
        </section>
      </main>
    </>
  );
}
