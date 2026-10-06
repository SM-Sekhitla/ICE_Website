import { Hero } from "@/components/hero/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Capabilities } from "@/components/sections/Capabilities";
import { IceFilter } from "@/components/sections/IceFilter";
import { Vision } from "@/components/sections/Vision";
import { CallToAction } from "@/components/sections/CallToAction";
import {
  Analytics,
  Engineering,
  Collaboration,
  People,
} from "@/components/sections/BrandStory";
export function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Capabilities />
      <Analytics />
      <Engineering />
      <IceFilter />
      <Collaboration />
      <Vision />
      <People />
      <CallToAction />
    </>
  );
}
