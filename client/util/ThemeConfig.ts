import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#f7f7f7",
  text: "#363537",
  navbar: "white",
  toggleBorder: "#FFF",
  background: "#222222dd",
  input: "#f0f0f0dd",
  button: "#222222dd"
};

export const darkTheme = {
  body: "#212121",
  text: "#FAFAFA",
  navbar: '#181818',
  toggleBorder: "#6B8096",
  background: "#222222dd",
  input: "#202020",
  button: "black"
};

export const GlobalStyles = createGlobalStyle`
  html,body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  .dark-btn {
    background-color: ${({ theme }) => theme.button};
  }

  .inputColor {
    background: ${({ theme }) => theme.input};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  .inboxColor {
    background: ${({ theme }) => theme.navbar};
    transition: all 0.50s linear;
  }
  span {
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  .main-btn-outBack2 {
    background-color: ${({ theme }) => theme.body};
    transition: all 0.50s linear;
    color: ${({ theme }) => theme.text};
  }

  .dark-btn-moon {
    color: ${({ theme }) => theme.body};
    transition: all 0.50s linear;
    background-color: ${({ theme }) => theme.text};
  }

  .box {
    transition: all 0.50s linear;
    background-color: ${({ theme }) => theme.navbar};
  }

  .navbar {
    transition: all 0.50s linear;
    background-color: ${({ theme }) => theme.navbar};
    
  }

 .navbar .logo{
        grid-column: span 1;
        font-size: 30px;
    transition: all 0.50s linear;
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
    transition: all 0.50s linear;
    background-color: ${({ theme }) => theme.navbar};
  }

`;
