import '../styles/globals.css'
import {
  RecoilRoot
} from 'recoil';
import { UserAuthContextProvider } from '../context/UserAuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <UserAuthContextProvider>
        <Component {...pageProps} />
      </UserAuthContextProvider>
      
    </RecoilRoot>
  )
}

export default MyApp
