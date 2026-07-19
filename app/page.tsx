import HeroScrub from "./components/HeroScrub";
import Manifesto from "./components/Manifesto";
import WaterRipple from "./components/WaterRipple";
import SelectedWork from "./components/SelectedWork";
import Services from "./components/Services";

export default function Home() {
  return (
    <main>
      <HeroScrub />
      <Manifesto />
      <WaterRipple />
      <SelectedWork />
      <Services />
    </main>
  );
}
