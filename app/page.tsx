import { Hero } from "@/components/home/Hero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MeetYourCoach } from "@/components/home/MeetYourCoach";
import { Testimonials } from "@/components/home/Testimonials";
import { Shorts } from "@/components/home/Shorts";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <FeaturedProducts />
      <HowItWorks />
      <MeetYourCoach />
      <Testimonials />
      <Shorts />
      <FinalCta />
    </>
  );
}
