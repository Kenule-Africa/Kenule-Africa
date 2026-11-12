import ThreeShaderCanvas from "@/components/3d/ThreeShaderCanvas";
import OraviaHeader from "@/components/nav/OraviaHeader";
import OraviaHeroSection from "@/components/sections/OraviaHeroSection";
import OraviaLifecycleSection from "@/components/sections/OraviaLifecycleSection";
import OraviaBentoFeatures from "@/components/sections/OraviaBentoFeatures";
import LegitLabIntro from "@/components/sections/LegitLabIntro";
import OraviaTestimonialsSection from "@/components/sections/OraviaTestimonialsSection";
import OraviaPartnersSection from "@/components/sections/OraviaPartnersSection";
import OraviaVenturesSection from "@/components/sections/OraviaVenturesSection";
import OraviaCommunitySection from "@/components/sections/OraviaCommunitySection";
import OraviaContactSection from "@/components/sections/OraviaContactSection";
import OraviaFooter from "@/components/sections/OraviaFooter";
import TomorrowPromoModal from "@/components/sections/TomorrowPromoModal";

export default function Home() {
  return (
    <main className="w-full relative bg-[#FAFAFA] min-h-screen">
      {/* Fixed Technical Grid & 3D Africa Matrix Background */}
      <div className="fixed inset-0 z-0 technical-grid pointer-events-none"></div>
      <ThreeShaderCanvas />

      {/* Global Navigation */}
      <OraviaHeader />
      <TomorrowPromoModal />

      {/* Content Wrapper */}
      <div className="z-10 flex flex-col w-full relative">
        <OraviaHeroSection />
        <OraviaLifecycleSection />
        <OraviaBentoFeatures />
        <LegitLabIntro />
        <OraviaTestimonialsSection />
        <OraviaPartnersSection />
        <OraviaVenturesSection />
        <OraviaCommunitySection />
        <OraviaContactSection />
        <OraviaFooter />
      </div>
    </main>
  );
}
