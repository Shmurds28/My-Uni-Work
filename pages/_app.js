import '../styles/globals.css'
import {
  RecoilRoot
} from 'recoil';
import { UserAuthContextProvider } from '../context/UserAuthContext';
import Notification from '../components/Notification';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <UserAuthContextProvider>
        <Component {...pageProps} />
        <Notification/>
      </UserAuthContextProvider>
      
    </RecoilRoot>
  )
}

export default MyApp
