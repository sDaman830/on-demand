import NavBar from "@components/components/BasicLayout/NavBar";
import Protected from "@components/components/ProtectedPage";
import HeroSection from "@components/components/landingPage/HeroSection";
import Response from "@components/components/landingPage/Response";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <section className="pb-16 h-screen bg-[#2234ae]/10">
      <NavBar />

      <HeroSection />
    </section>
  );
}
