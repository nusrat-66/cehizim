import Announce from '../../components/Head/Announce/index';
import Navbar from '../../components/Navbar/Head/index';
import NavigationBar from '../../components/Navbar/Bar';
import CookieAppear from '../../components/Additional/Cookie/index'
import Footer from '../../components/Footer/index';
import AboutHeadComp from '../../components/About/Head/index'
import AboutMissionComp from '../../components/About/Mission/index'
import AboutInformationComp from '../../components/About/Information/index'
import SocialMediaLanding from '../../components/SocialMedia/Landing/index'

import Bucket from '../../components/Additional/Bucket/index';
import Wishlist from '../../components/Additional/Wishlist';
import Endirim from '../../components/endirimler';
export default function Endirimler() {
    return(
        <>
        <Announce/>
        <Bucket />
        <Wishlist />
        <Navbar/>
        <div className="dropdown-overlay"></div>
        <NavigationBar/>


        <Endirim/>
    




        <CookieAppear/>
         <Footer/>
        </>
    );
}