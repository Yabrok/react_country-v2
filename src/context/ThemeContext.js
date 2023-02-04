import { createContext } from "react";
import { useState } from "react"

export const ThemeContext = createContext()


export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  localStorage.setItem('theme', theme)
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

