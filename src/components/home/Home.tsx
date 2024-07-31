import { SectionOne } from "./SectionOne"
import SectionThree from "./SectionThree"
import SectionTwo from "./SectionTwo"
import SectionFour from "./SectionFour"
import { Navbar } from "../common/Navbar"
import Footer from "../common/Footer"
export const Home = () => {

  return (
    <div>
      <Navbar />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <Footer/>
    </div>
  )
}
