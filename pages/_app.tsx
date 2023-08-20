import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { extendTheme, ChakraProvider, Box } from "@chakra-ui/react";
import Head from "next/head";
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { metamaskWallet, walletConnect,  coinbaseWallet, } from "@thirdweb-dev/react";

const MAINNET_RPC_URL = 'https://evm.cronos.org/';
const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x25',
      token: 'CRO',
      label: 'Cronos Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata: {
    name: 'Moonshine',
    icon: 'https://t4.ftcdn.net/jpg/02/67/95/59/360_F_267955919_HrrS4myeUeSoCIa0u4a0EYuNL0sViS5p.jpg',
    description: 'Hidden Brewery'
  }
});

const activeChain = "CronosBeta";

const backgroundImageUrl = "https://t4.ftcdn.net/jpg/02/67/95/59/360_F_267955919_HrrS4myeUeSoCIa0u4a0EYuNL0sViS5p.jpg"; // Replace with the actual background image URL

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: `url(${backgroundImageUrl}) no-repeat fixed center center`, // Set the background image URL here
        backgroundSize: "cover",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedWallets={[walletConnect(), metamaskWallet(), coinbaseWallet()]}
      activeChain={{
        chainId: 25,
        rpc: ["https://node.croswap.com/rpc", "https://evm.cronos.org/", "https://rpc.vvs.finance/", "https://rpc.crodex.app/"],
        nativeCurrency: {
          decimals: 18,
          name: "Cronos",
          symbol: "CRO",
        },
        shortName: "CRO",
        slug: "Cronos",
        testnet: false,
        chain: "Cronos Mainnet",
        name: "Cronos Mainnet",
      }}
    >
      <ChakraProvider theme={theme}>
        <Head>
          {/* Add your custom text here */}
          <title>Hidden Distillery</title>
        </Head>
        {/* No Box component with hovered background */}
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
