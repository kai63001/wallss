import "@/styles/globals.sass";
import { ApolloProvider } from "@apollo/react-hooks";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { withApollo } from "../util/apollo";
import Navbar from "@/components/Navbar"
import { lightTheme, darkTheme, GlobalStyles } from "../util/ThemeConfig" 
function MyApp({ Component, pageProps }) {
  
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
    console.log("theme")
  };
  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar theme={toggleTheme}/>
      <button onClick={toggleTheme}>Switch Theme</button>
      <Component/>
    </ThemeProvider>
  );
}

export default withApollo({ ssr: true })(MyApp);
