import '../styles/globals.css'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import {ThemeProvider} from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      desiredChainId = {ChainId.Goerli}
      chainRpc={{
        [ChainId.Goerli]:'https://goerli.infura.io/v3/b8a8281063f14eeb9118f4f5efefa5b7'
      }}
    >
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
      
      </ThirdwebProvider>
    )
}

export default MyApp
