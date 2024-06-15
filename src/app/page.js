import Protected from "@components/components/ProtectedPage";
import { SelectDemo } from "@components/components/landingPage/DropDownSection";
import HeroSection from "@components/components/landingPage/HeroSection";
import Response from "@components/components/landingPage/Response";
import Image from "next/image";

export default function Home() {
  return (
    <Protected>
      <section className=" pb-16">
        <HeroSection />
        <SelectDemo />
        {/* <Response /> */}
      </section>
    </Protected>
  );
}
