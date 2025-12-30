import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/Testimonials";
import FeaturesGrid from "@/components/home/features-grid";
import OutcomeTracker from "@/components/home/outcome-tracker";

export default function Home() {
  return (
    <div>
        <Hero/>
        <HowItWorks/>
        <FeaturesGrid/>
        <OutcomeTracker/>
        <Testimonials/>
    </div>
  );
}
