import { SelectDemo } from "@components/components/landingPage/DropDownSection";
import HeroSection from "@components/components/landingPage/HeroSection";
import Response from "@components/components/landingPage/Response";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <SelectDemo />
      {/* <Response /> */}
    </section>
  );
}
