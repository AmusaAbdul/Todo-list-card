"use client"
import { useTheme } from "../context/ThemeContext";


const Header = () => {

      const { darkMode, setDarkMode } = useTheme();


  return (
    <div className="flex items-center justify-between p-3 gap-1">
        <h1 className="text-xl font-bold">TODO</h1>
      <button onClick={() => setDarkMode(!darkMode)}> {darkMode ? "🌙" : "☀️"}</button>
    </div>
  )
}

export default Header
