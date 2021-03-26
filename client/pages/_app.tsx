import "@/styles/globals.sass";
import { ApolloProvider } from "@apollo/react-hooks";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { withApollo } from "../util/apollo";
import Navbar from "@/components/Navbar"
import { lightTheme, darkTheme, GlobalStyles } from "../util/ThemeConfig" 
function MyApp({ Component, pageProps }) {
  
  let dataTheme = typeof window !== "undefined"?localStorage.getItem("theme"):"light"
  
  const [theme, setTheme] = useState(dataTheme);
  console.log(dataTheme)

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme == "light"? "dark": "light");
      console.log('setTheme')
    }
    console.log(theme)
 
  };
  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar theme={toggleTheme}/>
      <Component/>
    </ThemeProvider>
  );
}

export default withApollo({ ssr: true })(MyApp);
