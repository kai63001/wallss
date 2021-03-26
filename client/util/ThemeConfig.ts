import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#f7f7f7",
  text: "#363537",
  navbar: "white",
  toggleBorder: "#FFF",
  background: "#222222dd",
};

export const darkTheme = {
  body: "#0a0a0a",
  text: "#FAFAFA",
  navbar: "black",
  toggleBorder: "#6B8096",
  background: "#222222dd",
};

export const GlobalStyles = createGlobalStyle`
  html,body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  span {
    color: ${({ theme }) => theme.text};

  }

  .main-btn-outBack2 {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  .dark-btn-moon {
    color: ${({ theme }) => theme.body};
    background-color: ${({ theme }) => theme.text};
  }

  .box {
    background-color: ${({ theme }) => theme.navbar};
  }

  .navbar {
    background-color: ${({ theme }) => theme.navbar};
    
  }

 .navbar .logo{
        grid-column: span 1;
        font-size: 30px;
        margin-top: -5px;
        background: ${({ theme }) => theme.text};
        background: -webkit-linear-gradient(to right, ${({ theme }) =>
          theme.text} 65%, #EF1C83 75%, rgba(251,94,58,1) 100%);
        background: -moz-linear-gradient(to right, ${({ theme }) =>
          theme.text} 65%, #EF1C83 75%, rgba(251,94,58,1) 100%);
        background: linear-gradient(to right, ${({ theme }) =>
          theme.text} 65%, #EF1C83 75%, rgba(251,94,58,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
  }

  footer {
    background-color: ${({ theme }) => theme.navbar};
  }

`;
