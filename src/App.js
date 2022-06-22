import React, { useEffect } from "react";
import Announce from "./components/Head/Announce/index";
import Navbar from "./components/Navbar/Head/index";
import NavigationBar from "./components/Navbar/Bar";
import Story from "./components/Additional/Story/index";
import HeroSlider from "./components/Additional/HeroSlider/index";
import CookieAppear from "./components/Additional/Cookie/index";
import CampaignMain from "./components/Additional/Campaign/index";
import CampaignDetailed from "./components/Additional/CampaignDetailed/index";
import BlogLanding from "./components/Blog/Landing/index";
import SocialMediaLanding from "./components/SocialMedia/Landing/index";
import Footer from "./components/Footer/index";
import Bucket from "./components/Additional/Bucket/index";
import Wishlist from "./components/Additional/Wishlist/index";

//import Slider from "react-slick";

const publicLinks = {
  main: "/",
  login: "/daxil-ol",
  register: "/qeydiyyat",
  forgotPassword: "/sifremi-unutdum",
  product: "/mehsul",
  about: "/haqqimizda",
  blog: "/blog",
  campaign: "/kampaniya",
  profil: "/profil",
};
export { publicLinks };

function App() {
 
  return (
    <div>
      <Announce />
      <Bucket />
      <Wishlist />
      <Navbar />
      <div className="dropdown-overlay"></div>
      <NavigationBar />
      <Story />
      <HeroSlider />
      <CookieAppear />
      <CampaignMain />
      <CampaignDetailed />
      {/* <BlogLanding /> */}
      <SocialMediaLanding />
      <Footer />
    </div>
  );
}
export default App;
