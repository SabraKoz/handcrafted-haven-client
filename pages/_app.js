import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes"

export default function Handcrafted({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout( 
    <Theme accentColor="violet" grayColor="mauve">
      <Component {...pageProps} />
    </Theme>
  )
}
