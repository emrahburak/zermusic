import { Services } from "@/sections/services";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      {/* <Hero /> — added by subtask 05, rendered above Services */}
      <Services />
      <Contact />
    </>
  );
}