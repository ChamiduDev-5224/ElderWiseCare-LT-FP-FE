import { SectionOne } from "./SectionOne"
import SectionThree from "./SectionThree"
import SectionTwo from "./SectionTwo"
import SectionFour from "./SectionFour"
import { Navbar } from "../common/Navbar"
export const Home = () => {

  return (
    <div>
      <Navbar />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </div>
  )
}
