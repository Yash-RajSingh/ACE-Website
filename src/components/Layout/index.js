import * as React from "react"
import PropTypes from "prop-types"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import { ThemeProvider } from "styled-components"
import { GlobalStyle, lightTheme, darkTheme } from "./themes/GlobalStyles"
import { Container } from "./components/container"
import MoveTop from "../move-to-top/MoveTop"
import { ThemeContext } from "../../context/ThemeContext"

const Layout = ({ children, navbar }) => {
  const themeContext = React.useContext(ThemeContext)

  React.useEffect(() => {
    let theme = localStorage.getItem("theme")
    if (theme) {
      if (theme === "dark") {
        themeContext?.setIsDarkTheme(true)
      } else {
        themeContext?.setIsDarkTheme(false)
      }
    }
  }, [themeContext])

  return (
    <ThemeProvider theme={!themeContext?.isDarkTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Navbar
        sliderInfo={navbar && navbar[0]?.primary?.navbar_slider_info.richText}
        itemList={navbar && navbar[1]?.items}
        socialList={navbar && navbar[2]?.items}
        img={
          navbar && !themeContext?.isDarkTheme
            ? navbar[0]?.primary?.navbar_logo
            : navbar[0]?.primary?.navbar_logo_dark
        }
        isDarkTheme={themeContext?.isDarkTheme}
        setIsDarkTheme={themeContext?.setIsDarkTheme}
      />
      <Container>{children}</Container>
      <MoveTop />
      <Footer
        itemList={navbar && navbar[1]?.items}
        footerList={navbar && navbar[3]?.items}
        isDarkTheme={themeContext?.isDarkTheme}
      />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
