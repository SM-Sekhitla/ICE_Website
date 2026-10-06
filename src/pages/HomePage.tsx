import { Hero } from "@/components/hero/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Capabilities } from "@/components/sections/Capabilities";
import { IceFilter } from "@/components/sections/IceFilter";
import {
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
      <Engineering />
      <IceFilter />
      <Collaboration />
      <People />
    </>
  );
}
