import "@/styles/globals.css";

export default function Handcrafted({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout( 
    <Component {...pageProps} />
  )
}
