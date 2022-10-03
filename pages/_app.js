import '../styles/globals.css'
import {
  RecoilRoot
} from 'recoil';
import { UserAuthContextProvider } from '../context/UserAuthContext';
import Notification from '../components/Notification';
import ScrollToTop from './../components/scrollToTop/index';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <UserAuthContextProvider>
        <Component {...pageProps} />
         <ScrollToTop />
        <Notification/>
      </UserAuthContextProvider>
      
    </RecoilRoot>
  )
}

export default MyApp
