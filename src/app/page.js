import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import GetStartedSteps from "@/components/home/GetStartedSteps";
import Hero from "@/components/home/Hero";



export default function Home() {
  return (
    <div className="relative">
     <Hero></Hero>
     <GetStartedSteps></GetStartedSteps>
<Features></Features>
<FAQ></FAQ>
<CTA></CTA>

    </div>
  );
}
