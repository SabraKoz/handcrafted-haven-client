import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes"

export default function Handcrafted({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return ( 
    <Theme appearance="dark" accentColor="sky" grayColor="mauve">
      {getLayout(<Component {...pageProps} />)}
    </Theme>
  )
}
