import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import SpeakersSection from "@/components/sections/SpeakersSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { ClientScripts } from "./client";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ClientScripts />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <SpeakersSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
