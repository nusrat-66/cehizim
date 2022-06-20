import Announce from '../../components/Head/Announce/index';
import Navbar from '../../components/Navbar/Head/index';
import NavigationBar from '../../components/Navbar/Bar';
import CookieAppear from '../../components/Additional/Cookie/index'
import Footer from '../../components/Footer/index';
 

import Bucket from '../../components/Additional/Bucket/index';
import Wishlist from '../../components/Additional/Wishlist';
export default function Inspiration() {
    return(
        <>
        <Announce/>
        <Bucket />
        <Wishlist />
        <Navbar/>
        <div className="dropdown-overlay"></div>
        <NavigationBar/>


      <div className='dv-wrapper cntner'>
       <img className='errorImage' src='https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1' alt='error'/>
       </div>
 

        <CookieAppear/>
         <Footer/>
        </>
    );
}