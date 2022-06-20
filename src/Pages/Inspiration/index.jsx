import Announce from '../../components/Head/Announce/index';
import Navbar from '../../components/Navbar/Head/index';
import NavigationBar from '../../components/Navbar/Bar';
import CookieAppear from '../../components/Additional/Cookie/index'
import Footer from '../../components/Footer/index';
import InpirationComp from '../../components/Inspiration/index';
import Bucket from '../../components/Additional/Bucket/index';
import Wishlist from '../../components/Additional/Wishlist';
export default function Inspiration() {
    return(
        <>
        <Announce/>
        <Bucket/>
        <Wishlist />
        <Navbar/>
        <div className="dropdown-overlay"></div>
        <NavigationBar/>
        <InpirationComp/>
        <CookieAppear/>
        <Footer/>
        </>
    );
}