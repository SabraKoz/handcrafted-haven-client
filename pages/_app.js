import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes"

export default function Handcrafted({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return ( 
    <Theme
      accentColor="teal" 
      grayColor="olive"
      panelBackground="transparent"
      style={{ backgroundColor: "#f5e8d5", minHeight: "100vh", margin: "-8px" }}
    >
      {getLayout(<Component {...pageProps} />)}
    </Theme>
  )
}
